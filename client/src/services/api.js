// Mock API service for frontend testing
// Replace with actual API calls when backend is ready

const MOCK_DELAY = 500; // Simulate network delay

// Mock user database
const MOCK_USERS = {
  'user@demo.com': {
    id: 'user1',
    email: 'user@demo.com',
    password: 'password123',
    name: 'John Doe',
    role: 'user',
    phone: '+1 (555) 123-4567'
  },
  'doctor@demo.com': {
    id: 'doctor1',
    email: 'doctor@demo.com',
    password: 'password123',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    specialization: 'Clinical Psychologist',
    phone: '+1 (555) 234-5678'
  },
  'hospital@demo.com': {
    id: 'hospital1',
    email: 'hospital@demo.com',
    password: 'password123',
    name: 'Serenity Wellness Center',
    role: 'hospital',
    phone: '+1 (555) 345-6789'
  },
  'admin@demo.com': {
    id: 'admin1',
    email: 'admin@demo.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
    phone: '+1 (555) 456-7890'
  }
};

// Simulate API delay
const delay = (ms = MOCK_DELAY) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const api = {
  // Authentication
  login: async (email, password) => {
    await delay();
    
    const user = MOCK_USERS[email];
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      token: `mock-token-${user.id}-${Date.now()}`,
      user: userWithoutPassword
    };
  },

  register: async (userData) => {
    await delay();
    
    // Check if user already exists
    if (MOCK_USERS[userData.email]) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      role: userData.role || 'user'
    };
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      token: `mock-token-${newUser.id}-${Date.now()}`,
      user: userWithoutPassword
    };
  },

  // Journal
  createJournalEntry: async (entry) => {
    await delay();
    return {
      id: Date.now(),
      ...entry,
      date: new Date().toISOString().split('T')[0],
      aiInsights: 'AI analysis will be generated here based on your entry content.',
      sentiment: entry.mood.toLowerCase().includes('happy') || entry.mood.toLowerCase().includes('calm') ? 'positive' : 
                 entry.mood.toLowerCase().includes('sad') || entry.mood.toLowerCase().includes('anxious') ? 'negative' : 'neutral'
    };
  },

  analyzeSentiment: async (entries) => {
    await delay(1000);
    
    const positiveCount = entries.filter(e => e.sentiment === 'positive').length;
    const negativeCount = entries.filter(e => e.sentiment === 'negative').length;
    const neutralCount = entries.filter(e => e.sentiment === 'neutral').length;
    const total = entries.length || 1;
    
    return {
      overallMood: positiveCount > negativeCount ? 'Positive' : negativeCount > positiveCount ? 'Needs Attention' : 'Balanced',
      trend: positiveCount > negativeCount ? 'improving' : 'stable',
      insights: [
        'Your mood has been relatively stable over the past week',
        'You show good emotional awareness in your entries',
        'Consider maintaining your current self-care routine'
      ],
      recommendations: [
        'Continue your journaling practice',
        'Try incorporating mindfulness exercises',
        'Maintain regular sleep schedule'
      ],
      moodDistribution: {
        positive: Math.round((positiveCount / total) * 100),
        neutral: Math.round((neutralCount / total) * 100),
        negative: Math.round((negativeCount / total) * 100)
      }
    };
  },

  // Chatbot
  sendChatMessage: async (message, history) => {
    await delay(800);
    
    const msg = message.toLowerCase();
    
    // Simple response logic
    if (msg.includes('anxious') || msg.includes('anxiety')) {
      return 'I understand you\'re feeling anxious. Anxiety is a common experience. Have you tried any breathing exercises? I can guide you through a simple technique if you\'d like.';
    } else if (msg.includes('sad') || msg.includes('depressed')) {
      return 'I\'m sorry you\'re feeling this way. It\'s important to acknowledge these feelings. Would you like to talk about what might be contributing to how you\'re feeling?';
    } else if (msg.includes('stress')) {
      return 'Stress can be overwhelming. Let\'s try to identify what\'s causing the most stress. What\'s the main thing on your mind right now?';
    } else if (msg.includes('help') || msg.includes('support')) {
      return 'I\'m here to support you. You can talk to me about anything on your mind, or I can help you find professional resources. What would be most helpful for you right now?';
    } else if (msg.includes('thank')) {
      return 'You\'re very welcome! Remember, taking care of your mental health is important. I\'m here whenever you need to talk.';
    } else {
      return 'Thank you for sharing that with me. I\'m here to listen and support you. Can you tell me more about what you\'re experiencing?';
    }
  },

  // Assessments
  analyzeAssessment: async (assessmentId, answers) => {
    await delay(1000);
    
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = Object.keys(answers).length * 3; // Assuming max value is 3
    const percentage = (totalScore / maxScore) * 100;
    
    let severity, color, recommendations;
    
    if (percentage < 25) {
      severity = 'Minimal';
      color = 'success';
      recommendations = [
        'Your results indicate minimal symptoms',
        'Continue your current wellness practices',
        'Maintain healthy lifestyle habits'
      ];
    } else if (percentage < 50) {
      severity = 'Mild';
      color = 'warning';
      recommendations = [
        'Consider stress management techniques',
        'Try mindfulness or meditation',
        'Reach out for social support if needed'
      ];
    } else if (percentage < 75) {
      severity = 'Moderate';
      color = 'danger';
      recommendations = [
        'We recommend consulting a mental health professional',
        'Consider booking an appointment',
        'Practice self-care activities regularly'
      ];
    } else {
      severity = 'Severe';
      color = 'danger';
      recommendations = [
        'Please seek professional help immediately',
        'Contact a mental health professional',
        'If in crisis, call emergency services'
      ];
    }
    
    return {
      score: totalScore,
      maxScore: maxScore,
      percentage: percentage.toFixed(1),
      severity: severity,
      color: color,
      recommendations: recommendations,
      resources: [
        { title: 'Understanding Your Results', type: 'article' },
        { title: 'Coping Strategies', type: 'video' },
        { title: 'When to Seek Help', type: 'article' }
      ]
    };
  },

  // Appointments
  bookAppointment: async (appointmentData) => {
    await delay();
    return {
      id: Date.now(),
      ...appointmentData,
      status: 'pending'
    };
  },

  // Doctor availability
  updateAvailability: async (availability) => {
    await delay();
    return { success: true, availability };
  },

  // Complete session
  completeSession: async (appointmentId, notes) => {
    await delay();
    return { success: true, notes };
  }
};

export default api;
