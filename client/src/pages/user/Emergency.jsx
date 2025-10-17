import React from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const Emergency = () => {
  const crisisLines = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 free and confidential support',
      availability: '24/7'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text',
      availability: '24/7'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Treatment referral and information',
      availability: '24/7'
    },
    {
      name: 'Veterans Crisis Line',
      phone: '1-800-273-8255 (Press 1)',
      description: 'Support for veterans and their families',
      availability: '24/7'
    }
  ];

  const quickActions = [
    {
      title: 'Breathing Exercise',
      description: '5-minute guided breathing to calm anxiety',
      icon: '🫁',
      action: 'Start Exercise'
    },
    {
      title: 'Grounding Technique',
      description: '5-4-3-2-1 method to reduce panic',
      icon: '🧘',
      action: 'Begin Grounding'
    },
    {
      title: 'Crisis Chat',
      description: 'Talk to our AI for immediate support',
      icon: '💬',
      action: 'Start Chat'
    },
    {
      title: 'Safety Plan',
      description: 'Access your personalized safety plan',
      icon: '🛡️',
      action: 'View Plan'
    }
  ];

  const warningSignsChecklist = [
    'Thoughts of harming yourself or others',
    'Feeling hopeless or having no reason to live',
    'Feeling trapped or in unbearable pain',
    'Being a burden to others',
    'Increased use of alcohol or drugs',
    'Withdrawing from friends and activities',
    'Sleeping too much or too little',
    'Acting anxious or agitated',
    'Showing rage or talking about revenge',
    'Displaying extreme mood swings'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Banner */}
        <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-900 dark:text-red-300 mb-2">
                If you're in immediate danger, call 911
              </h2>
              <p className="text-red-700 dark:text-red-400 mb-4">
                This page provides crisis resources. If you're experiencing a mental health emergency, please reach out for help immediately.
              </p>
              <div className="flex gap-3">
                <Button variant="danger" size="lg">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 988 Now
                </Button>
                <Button variant="outline">
                  Text Crisis Line
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Immediate Support</CardTitle>
            <CardDescription>Quick techniques to help you right now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{action.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {action.description}
                      </p>
                      <Button variant="outline" size="sm">
                        {action.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crisis Hotlines */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Crisis Hotlines</CardTitle>
            <CardDescription>Free, confidential support available 24/7</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crisisLines.map((line, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                        {line.name}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {line.phone}
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mb-1">
                        {line.description}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-500">
                        Available: {line.availability}
                      </p>
                    </div>
                    <Button variant="primary" size="sm">
                      Call Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Signs */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Warning Signs</CardTitle>
            <CardDescription>When to seek immediate help</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Seek immediate help if you or someone you know is experiencing:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {warningSignsChecklist.map((sign, index) => (
                <div key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{sign}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Planning */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create a Safety Plan</CardTitle>
            <CardDescription>Prepare for difficult moments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              A safety plan helps you identify warning signs and coping strategies for when you're in crisis.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">1. Warning Signs</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Identify thoughts, images, moods, or behaviors that indicate a crisis</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">2. Coping Strategies</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Activities you can do on your own to distract or calm yourself</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">3. Support Contacts</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">People you can reach out to for support</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">4. Professional Help</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Mental health professionals and emergency contacts</p>
              </div>
            </div>
            <Button variant="primary" className="mt-4">
              Create My Safety Plan
            </Button>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>More ways to get help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="#" className="block p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">Find a Therapist Near You</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Connect with licensed mental health professionals</p>
              </a>
              <a href="#" className="block p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">Support Groups</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Join peer support communities</p>
              </a>
              <a href="#" className="block p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">Mental Health Education</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Learn about mental health conditions and treatments</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
