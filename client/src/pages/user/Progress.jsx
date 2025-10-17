import React, { useState } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

const Progress = () => {
  const [timeRange, setTimeRange] = useState('30days');

  const stats = {
    journalEntries: 24,
    chatSessions: 15,
    assessmentsCompleted: 3,
    appointmentsAttended: 2,
    consecutiveDays: 7,
    totalMinutes: 420
  };

  const moodData = [
    { date: '2024-10-11', mood: 'Happy', score: 8 },
    { date: '2024-10-12', mood: 'Calm', score: 7 },
    { date: '2024-10-13', mood: 'Anxious', score: 4 },
    { date: '2024-10-14', mood: 'Calm', score: 7 },
    { date: '2024-10-15', mood: 'Happy', score: 8 },
    { date: '2024-10-16', mood: 'Sad', score: 5 },
    { date: '2024-10-17', mood: 'Happy', score: 9 }
  ];

  const achievements = [
    { id: 1, title: '7-Day Streak', description: 'Journaled for 7 consecutive days', icon: '🔥', unlocked: true },
    { id: 2, title: 'First Assessment', description: 'Completed your first mental health assessment', icon: '📊', unlocked: true },
    { id: 3, title: 'Chatbot Friend', description: 'Had 10 conversations with AI Buddy', icon: '🤖', unlocked: true },
    { id: 4, title: 'Self-Care Champion', description: 'Completed 5 wellness activities', icon: '⭐', unlocked: false },
    { id: 5, title: '30-Day Journey', description: 'Used SoulSync for 30 days', icon: '🎯', unlocked: false },
    { id: 6, title: 'Progress Master', description: 'Tracked progress for 60 days', icon: '🏆', unlocked: false }
  ];

  const milestones = [
    { date: '2024-10-17', title: 'Completed GAD-7 Assessment', type: 'assessment', score: 'Mild Anxiety' },
    { date: '2024-10-15', title: 'First Video Consultation', type: 'appointment', doctor: 'Dr. Sarah Johnson' },
    { date: '2024-10-10', title: 'Started Journal Practice', type: 'journal', entries: 1 },
    { date: '2024-10-05', title: 'Joined SoulSync', type: 'account', status: 'Welcome!' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Progress Tracking 📈
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor your mental wellness journey
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === '7days' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('7days')}
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === '30days' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('30days')}
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('all')}
            >
              All Time
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">📝</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.journalEntries}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Journal Entries</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.chatSessions}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Chat Sessions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.assessmentsCompleted}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Assessments</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">🏥</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.appointmentsAttended}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Appointments</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">🔥</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.consecutiveDays}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalMinutes}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Total Minutes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mood Trend</CardTitle>
              <CardDescription>Your emotional patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400 w-24">{entry.date}</span>
                    <div className="flex-1">
                      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full flex items-center px-3 text-sm font-medium text-white ${
                            entry.score >= 7 ? 'bg-green-500' :
                            entry.score >= 5 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${(entry.score / 10) * 100}%` }}
                        >
                          {entry.mood}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white w-8">{entry.score}/10</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your wellness milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.unlocked
                        ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestones Timeline */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Journey</CardTitle>
            <CardDescription>Key milestones in your mental health journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      milestone.type === 'assessment' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      milestone.type === 'appointment' ? 'bg-green-100 dark:bg-green-900/30' :
                      milestone.type === 'journal' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-teal-100 dark:bg-teal-900/30'
                    }`}>
                      {milestone.type === 'assessment' && '📊'}
                      {milestone.type === 'appointment' && '🏥'}
                      {milestone.type === 'journal' && '📝'}
                      {milestone.type === 'account' && '🎉'}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-700"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{milestone.date}</p>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{milestone.title}</h4>
                    {milestone.score && <Badge variant="info" size="sm" className="mt-1">{milestone.score}</Badge>}
                    {milestone.doctor && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">with {milestone.doctor}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Data */}
        <Card className="mt-6">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Export Your Data</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Download your progress report as PDF</p>
              </div>
              <Button variant="outline">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
