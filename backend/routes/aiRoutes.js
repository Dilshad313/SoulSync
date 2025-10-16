const express = require('express');
const { auth } = require('../middleware/auth');
const AIChatHistory = require('../models/AIChat');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const AssessmentResult = require('../models/Assessment');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const JournalEntry = require('../models/Journal');
const Course = require('../models/Course');
const TestReview = require('../models/TestReview');

const router = express.Router();

// Initialize Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST api/ai/chat
// @desc    Send message to AI chatbot
// @access  Private
router.post('/chat', auth, async (req, res) => {  
  const { message, botType = 'neha', sessionId } = req.body;
  try {
    // Validate bot type
    if (!['neha', 'gemini'].includes(botType)) {
      return res.status(400).json({ message: 'Invalid bot type' });
    }

    // Create new session ID if not provided
    const currentSessionId = sessionId || `session_${Date.now()}_${req.user.id}`;

    // Get user context for conversation
    const [assessments, appointments] = await Promise.all([
      AssessmentResult.find({ userId: req.user.id }).sort({ completedAt: -1 }).limit(5),
      Appointment.find({ 
        $or: [{ patientId: req.user.id }, { doctorId: req.user.id }] 
      }).sort({ createdAt: -1 }).limit(5)
    ]);

    // Build context for the AI
    const context = {
      user: {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role
      },
      recentAssessments: assessments.map(a => ({
        type: a.assessmentType,
        score: a.totalScore,
        severity: a.severity,
        completedAt: a.completedAt
      })),
      recentAppointments: appointments.map(a => ({
        date: a.appointmentDate,
        doctor: a.doctorId,
        status: a.status
      }))
    };

    const systemPrompt = botType === 'neha' 
      ? `You are Neha, an empathetic and supportive AI assistant for mental health. Your role is to listen, provide emotional support, and be a compassionate companion. Be understanding, encouraging, and offer comfort when needed. You can suggest journaling, deep breathing, or other self-care techniques. If the user is in crisis, gently suggest speaking with a professional. For non-crisis situations, be supportive and acknowledge their feelings.` 
      : `You are Gemini, an informative AI assistant for the MindSync platform. Your role is to provide helpful information about appointments, prescriptions, courses, assessments, and other platform features. Answer questions about mental health resources, platform navigation, and user account details. Provide factual information and direct users to appropriate resources.`;

   // Fetch chat history for the session
const chatHistory = await AIChatHistory.findOne({ sessionId: currentSessionId });
const history = chatHistory
  ? chatHistory.conversation.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }))
  : [];



    // Get AI response from Gemini
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `${systemPrompt}

User context: ${JSON.stringify(context)}
`,
    });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: botType === 'neha' ? 0.8 : 0.6,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const aiResponse = response.text();

    // Save conversation to history
    let conversationRecord = await AIChatHistory.findOne({ 
      userId: req.user.id, 
      sessionId: currentSessionId 
    });

    if (conversationRecord) {
      conversationRecord.conversation.push(
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'assistant', content: aiResponse, timestamp: new Date() }
      );
    } else {
      conversationRecord = new AIChatHistory({
        userId: req.user.id,
        botType,
        sessionId: currentSessionId,
        conversation: [
          { role: 'user', content: message, timestamp: new Date() },
          { role: 'assistant', content: aiResponse, timestamp: new Date() }
        ]
      });
    }

    await conversationRecord.save();

    res.json({
      response: aiResponse,
      sessionId: currentSessionId,
      botType
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    
    // Return a helpful message if API key is invalid or not configured
    if (error.message.includes('401') || error.message.includes('api_key')) {
      const fallbackResponse = botType === 'neha' 
        ? "I'm here to listen. Could you tell me more about how you're feeling? Remember, I'm an AI companion and you might want to speak with a mental health professional for more personalized support."
        : "I'm here to help. Could you ask me about appointments, prescriptions, courses, or other platform features?";
      
      res.status(200).json({
        response: fallbackResponse,
        sessionId: sessionId || `session_${Date.now()}_${req.user.id}`,
        botType
      });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

// @route   POST api/ai/journal-review
// @desc    Generate AI review for a journal entry
// @access  Private
router.post('/journal-review', auth, async (req, res) => {
  const { journalId } = req.body;

  if (!journalId) {
    return res.status(400).json({ message: 'Journal ID is required.' });
  }

  try {
    const journalEntry = await JournalEntry.findById(journalId);

    if (!journalEntry) {
      return res.status(404).json({ message: 'Journal entry not found.' });
    }

    if (!journalEntry.userId.equals(req.user.id)) {
      return res.status(403).json({ message: 'You are not authorized to review this journal entry.' });
    }

    // Prepare prompt for Gemini
    const prompt = `
      As an empathetic AI assistant, please review the following journal entry.
      Provide a supportive and constructive review, and then list 2-3 actionable recommendations.
      Format your response as a JSON object with two keys: "review" (a string) and "recommendations" (an array of strings).

      Journal Title: "${journalEntry.title}"
      Journal Content: "${journalEntry.content}"
      User's Mood: "${journalEntry.mood || 'not specified'}"
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const aiResponseText = result.response.text();

    // Clean and parse the JSON response from Gemini
    const cleanedJsonString = aiResponseText.replace(/```json|```/g, '').trim();
    const aiData = JSON.parse(cleanedJsonString);

    // Update the journal entry with the AI review
    journalEntry.aiReview = aiData.review;
    journalEntry.aiRecommendations = aiData.recommendations;
    journalEntry.aiReviewGeneratedAt = new Date();
    await journalEntry.save();

    res.json({
      review: journalEntry.aiReview,
      recommendations: journalEntry.aiRecommendations
    });
  } catch (error) {
    console.error('Error generating journal review:', error);
    res.status(500).json({ message: 'Error generating review.', error: error.message });
  }
});

// @route   GET api/ai/conversations
// @desc    Get user's AI conversation history
// @access  Private
router.get('/conversations', auth, async (req, res) => {
  try {
    const { botType, sessionId } = req.query;

    let query = { userId: req.user.id };

    if (botType) {
      query.botType = botType;
    }

    if (sessionId) {
      query.sessionId = sessionId;
    }

    const conversations = await AIChatHistory.find(query)
      .sort({ lastAccessed: -1 })
      .limit(50); // Limit to last 50 conversations

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/ai/suggestions
// @desc    Get personalized suggestions based on user data
// @access  Private
router.get('/suggestions', auth, async (req, res) => {
  try {
    // Get user's recent activity
    const [assessments, appointments, prescriptions, courses] = await Promise.all([
      AssessmentResult.find({ userId: req.user.id }).sort({ completedAt: -1 }).limit(5),
      Appointment.find({ 
        patientId: req.user.id,
        status: { $in: ['completed', 'confirmed'] }
      }).sort({ createdAt: -1 }).limit(5),
      Prescription.find({ patientId: req.user.id }).sort({ issuedDate: -1 }).limit(5),
      Course.find({ 
        _id: { $in: await getEnrolledCourseIds(req.user.id) } 
      }).sort({ createdAt: -1 }).limit(5)
    ]);

    // Generate personalized suggestions
    const suggestions = [];

    // Based on assessment results
    if (assessments.length > 0) {
      const latestAssessment = assessments[0];
      if (latestAssessment.severity === 'severe' || latestAssessment.severity === 'moderate') {
        suggestions.push({
          type: 'professional',
          title: 'Professional Support Recommended',
          message: `Based on your ${latestAssessment.assessmentName}, we recommend scheduling an appointment with a mental health professional.`,
          action: '/appointments/book'
        });
      }

      // Suggest courses based on assessment
      const relevantCourses = await Course.find({
        category: getCourseCategoryForAssessment(latestAssessment.assessmentType),
        isPublished: true,
        adminApprovalStatus: 'approved'
      }).limit(3);

      relevantCourses.forEach(course => {
        suggestions.push({
          type: 'course',
          title: course.title,
          message: course.description,
          action: `/courses/${course._id}`
        });
      });
    }

    // Based on appointment history
    if (appointments.length === 0) {
      suggestions.push({
        type: 'appointment',
        title: 'First Appointment',
        message: 'Consider booking your first appointment with a mental health professional.',
        action: '/appointments'
      });
    }

    // Based on prescription history
    if (prescriptions.length > 0) {
      const recentPrescription = prescriptions[0];
      if (recentPrescription.refillsRemaining > 0) {
        suggestions.push({
          type: 'refill',
          title: 'Prescription Refill',
          message: `You have ${recentPrescription.refillsRemaining} refills remaining for ${recentPrescription.medications[0].name}`,
          action: '/prescriptions'
        });
      }
    }

    res.json({ suggestions });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST api/ai/test-review
// @desc    Submit MCQ answers, get Gemini review, store in DB
// @access  Private
router.post('/test-review', auth, async (req, res) => {
  const { answers } = req.body;
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ message: 'Answers required.' });
  }
  try {
    // Prepare prompt for Gemini
    const prompt = `A user submitted the following mental health MCQ answers: ${JSON.stringify(answers)}. Please provide a short, supportive review and feedback.`;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const review = result.response.text();
    // Store review in DB
    const testReview = new TestReview({
      userId: req.user.id,
      answers,
      review
    });
    await testReview.save();
    res.json({ review });
  } catch (err) {
    res.status(500).json({ message: 'Error generating review.' });
  }
});

// @route   GET api/ai/my-reviews
// @desc    Get user's past MCQ reviews
// @access  Private
router.get('/my-reviews', auth, async (req, res) => {
  try {
    const reviews = await TestReview.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews.' });
  }
});

// Helper function to get enrolled course IDs
async function getEnrolledCourseIds(userId) {
  // This would require an Enrollment model - would be implemented in a real app
  return []; // Placeholder
}

// Helper function to map assessment to course category
function getCourseCategoryForAssessment(assessmentType) {
  switch(assessmentType) {
    case 'PHQ-9':
      return 'depression';
    case 'GAD-7':
      return 'anxiety';
    case 'DASS-21':
      return 'stress';
    default:
      return 'general-wellness';
  }
}

module.exports = router;