import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input, { TextArea, Select } from '../../components/UI/Input';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: ''
  });
  const [sentimentAnalysis, setSentimentAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      // API call would go here
      // Mock data
      setEntries([
        {
          id: 1,
          title: 'A Productive Day',
          content: 'Today was amazing! I completed all my tasks and felt really accomplished. The meditation session in the morning helped me stay focused throughout the day.',
          mood: 'Happy',
          sentiment: 'positive',
          date: '2024-10-17',
          aiInsights: 'Your entry shows positive emotions and productivity. Keep maintaining this routine!'
        },
        {
          id: 2,
          title: 'Feeling Overwhelmed',
          content: 'Work has been stressful lately. I feel like I have too much on my plate and not enough time to handle everything. Need to find better ways to manage my stress.',
          mood: 'Anxious',
          sentiment: 'negative',
          date: '2024-10-16',
          aiInsights: 'Detected signs of stress. Consider practicing breathing exercises and breaking tasks into smaller steps.'
        },
        {
          id: 3,
          title: 'Quiet Weekend',
          content: 'Spent the weekend reading and relaxing. It was nice to have some downtime, though I felt a bit lonely at times.',
          mood: 'Calm',
          sentiment: 'neutral',
          date: '2024-10-15',
          aiInsights: 'Balance between relaxation and social connection is important. Consider reaching out to friends.'
        }
      ]);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use mock API service
      const data = await api.createJournalEntry(newEntry);
      
      // Add new entry to list
      setEntries([data, ...entries]);
      
      // Reset form
      setNewEntry({ title: '', content: '', mood: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating entry:', error);
      alert('Failed to create entry');
    }

    setLoading(false);
  };

  const analyzeSentiment = async () => {
    setAnalyzing(true);
    
    try {
      // Get last 7 days of entries
      const recentEntries = entries.slice(0, 7);
      
      // Use mock API service
      const data = await api.analyzeSentiment(recentEntries);
      setSentimentAnalysis(data);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      alert('Failed to analyze sentiment');
    }

    setAnalyzing(false);
  };

  const moodOptions = [
    { value: 'happy', label: '😊 Happy' },
    { value: 'calm', label: '😌 Calm' },
    { value: 'anxious', label: '😰 Anxious' },
    { value: 'sad', label: '😢 Sad' },
    { value: 'angry', label: '😠 Angry' },
    { value: 'excited', label: '🤩 Excited' },
    { value: 'tired', label: '😴 Tired' }
  ];

  const getMoodColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'danger';
      case 'neutral': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              AI-Powered Journal
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Track your thoughts and emotions with AI-driven insights
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            icon={(props) => (
              <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          >
            New Entry
          </Button>
        </div>

        {/* AI Sentiment Analysis Card */}
        <Card className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  7-Day Sentiment Analysis
                </CardTitle>
                <CardDescription>AI-powered insights from your recent entries</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={analyzeSentiment}
                loading={analyzing}
                disabled={analyzing || entries.length === 0}
              >
                {sentimentAnalysis ? 'Refresh Analysis' : 'Analyze Now'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {sentimentAnalysis ? (
              <div className="space-y-6">
                {/* Mood Distribution */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Mood Distribution</h4>
                  <div className="flex gap-2 h-8 rounded-lg overflow-hidden">
                    <div
                      className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${sentimentAnalysis.moodDistribution.positive}%` }}
                    >
                      {sentimentAnalysis.moodDistribution.positive}%
                    </div>
                    <div
                      className="bg-yellow-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${sentimentAnalysis.moodDistribution.neutral}%` }}
                    >
                      {sentimentAnalysis.moodDistribution.neutral}%
                    </div>
                    <div
                      className="bg-red-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${sentimentAnalysis.moodDistribution.negative}%` }}
                    >
                      {sentimentAnalysis.moodDistribution.negative}%
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <span>Positive</span>
                    <span>Neutral</span>
                    <span>Negative</span>
                  </div>
                </div>

                {/* Insights */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Insights</h4>
                  <ul className="space-y-2">
                    {sentimentAnalysis.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">AI Recommendations</h4>
                  <ul className="space-y-2">
                    {sentimentAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-purple-300 dark:text-purple-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Click "Analyze Now" to get AI-powered insights from your recent journal entries
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <Card key={entry.id} hover>
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {entry.title}
                        </h3>
                        <Badge variant={getMoodColor(entry.sentiment)} size="sm">
                          {entry.mood}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{entry.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    {entry.content}
                  </p>

                  {entry.aiInsights && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">AI Insight</p>
                          <p className="text-sm text-blue-700 dark:text-blue-400">{entry.aiInsights}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent>
                <div className="text-center py-12">
                  <svg className="w-20 h-20 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No journal entries yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Start your wellness journey by creating your first journal entry
                  </p>
                  <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Create First Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* New Entry Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="New Journal Entry"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              type="text"
              placeholder="Give your entry a title..."
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              required
            />

            <Select
              label="How are you feeling?"
              value={newEntry.mood}
              onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
              options={moodOptions}
              required
            />

            <TextArea
              label="Your Thoughts"
              placeholder="Write about your day, feelings, or anything on your mind..."
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              rows={8}
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              >
                Save Entry
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Journal;
