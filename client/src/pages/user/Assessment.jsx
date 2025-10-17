import React, { useState } from 'react';
import api from '../../services/api';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

const Assessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const assessments = [
    {
      id: 'phq9',
      name: 'PHQ-9',
      fullName: 'Patient Health Questionnaire',
      description: 'Assess depression severity',
      duration: '5 minutes',
      questions: [
        'Little interest or pleasure in doing things',
        'Feeling down, depressed, or hopeless',
        'Trouble falling or staying asleep, or sleeping too much',
        'Feeling tired or having little energy',
        'Poor appetite or overeating',
        'Feeling bad about yourself or that you are a failure',
        'Trouble concentrating on things',
        'Moving or speaking slowly, or being fidgety or restless',
        'Thoughts that you would be better off dead or hurting yourself'
      ],
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'gad7',
      name: 'GAD-7',
      fullName: 'Generalized Anxiety Disorder',
      description: 'Measure anxiety symptoms',
      duration: '5 minutes',
      questions: [
        'Feeling nervous, anxious, or on edge',
        'Not being able to stop or control worrying',
        'Worrying too much about different things',
        'Trouble relaxing',
        'Being so restless that it is hard to sit still',
        'Becoming easily annoyed or irritable',
        'Feeling afraid, as if something awful might happen'
      ],
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'stress',
      name: 'Stress Assessment',
      fullName: 'Perceived Stress Scale',
      description: 'Evaluate your stress levels',
      duration: '5 minutes',
      questions: [
        'Been upset because of something that happened unexpectedly',
        'Felt that you were unable to control important things in your life',
        'Felt nervous and stressed',
        'Felt confident about your ability to handle personal problems',
        'Felt that things were going your way',
        'Found that you could not cope with all the things you had to do',
        'Been able to control irritations in your life',
        'Felt that you were on top of things',
        'Been angered because of things outside of your control',
        'Felt difficulties were piling up so high you could not overcome them'
      ],
      options: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Almost never' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Fairly often' },
        { value: 4, label: 'Very often' }
      ]
    }
  ];

  const handleStartAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const handleAnswer = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    });
  };

  const handleNext = () => {
    if (currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Use mock API service
      const data = await api.analyzeAssessment(selectedAssessment.id, answers);
      setResults(data);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to analyze assessment');
    }

    setLoading(false);
  };

  const handleRetake = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  if (results) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl mb-2">Assessment Complete</CardTitle>
                <CardDescription>Here are your results and personalized recommendations</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {/* Score */}
              <div className="text-center mb-8 p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Your Score</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  {results.score} / {results.maxScore}
                </p>
                <Badge variant={results.color} size="lg">
                  {results.severity} Symptoms
                </Badge>
              </div>

              {/* AI Recommendations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI-Powered Recommendations
                </h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Resources */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recommended Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.resources.map((resource, index) => (
                    <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <Badge variant="primary" size="sm">{resource.type}</Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{resource.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" onClick={() => window.location.href = '/user/find-care'}>
                  Find a Doctor
                </Button>
                <Button variant="outline" onClick={handleRetake}>
                  Take Another Assessment
                </Button>
                <Button variant="ghost" onClick={() => window.location.href = '/user/dashboard'}>
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedAssessment) {
    const progress = ((currentQuestion + 1) / selectedAssessment.questions.length) * 100;
    const isLastQuestion = currentQuestion === selectedAssessment.questions.length - 1;
    const hasAnswered = answers[currentQuestion] !== undefined;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Question {currentQuestion + 1} of {selectedAssessment.questions.length}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {progress.toFixed(0)}% Complete
              </span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {selectedAssessment.questions[currentQuestion]}
              </CardTitle>
              <CardDescription>
                Over the last 2 weeks, how often have you been bothered by this?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedAssessment.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion, option.value)}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left transition-all
                      ${answers[currentQuestion] === option.value
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {option.label}
                      </span>
                      {answers[currentQuestion] === option.value && (
                        <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <div className="flex-1" />
                {isLastQuestion ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!hasAnswered || loading}
                    loading={loading}
                  >
                    Submit Assessment
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!hasAnswered}
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Mental Health Assessments
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Take standardized assessments to better understand your mental health
          </p>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} hover>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <CardTitle>{assessment.name}</CardTitle>
                <CardDescription className="mb-2">{assessment.fullName}</CardDescription>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {assessment.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {assessment.duration}
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleStartAssessment(assessment)}
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  About These Assessments
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                  These standardized assessments are widely used by mental health professionals to screen for various conditions. 
                  Your responses will be analyzed by our AI to provide personalized insights and recommendations. 
                  Please note that these assessments are screening tools and not diagnostic instruments. 
                  For a proper diagnosis, please consult with a qualified mental health professional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
