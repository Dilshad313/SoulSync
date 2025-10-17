import React, { useState } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Badge from '../../components/UI/Badge';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: '📚' },
    { id: 'articles', label: 'Articles', icon: '📄' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'podcasts', label: 'Podcasts', icon: '🎧' },
    { id: 'exercises', label: 'Exercises', icon: '🧘' },
    { id: 'worksheets', label: 'Worksheets', icon: '📝' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Understanding Anxiety: A Complete Guide',
      description: 'Learn about anxiety disorders, symptoms, and evidence-based coping strategies.',
      category: 'articles',
      duration: '10 min read',
      difficulty: 'Beginner',
      tags: ['Anxiety', 'Mental Health', 'Coping'],
      rating: 4.8,
      views: 1234
    },
    {
      id: 2,
      title: 'Mindfulness Meditation for Beginners',
      description: 'Step-by-step guide to starting a mindfulness practice.',
      category: 'videos',
      duration: '15 min',
      difficulty: 'Beginner',
      tags: ['Mindfulness', 'Meditation', 'Stress Relief'],
      rating: 4.9,
      views: 2156
    },
    {
      id: 3,
      title: 'Cognitive Behavioral Therapy Techniques',
      description: 'Practical CBT exercises you can do at home.',
      category: 'exercises',
      duration: '20 min',
      difficulty: 'Intermediate',
      tags: ['CBT', 'Therapy', 'Self-Help'],
      rating: 4.7,
      views: 987
    },
    {
      id: 4,
      title: 'Sleep Hygiene: Better Sleep Tonight',
      description: 'Science-backed tips for improving your sleep quality.',
      category: 'articles',
      duration: '8 min read',
      difficulty: 'Beginner',
      tags: ['Sleep', 'Wellness', 'Health'],
      rating: 4.6,
      views: 1543
    },
    {
      id: 5,
      title: 'Breathing Exercises for Panic Attacks',
      description: 'Quick techniques to manage panic and anxiety in the moment.',
      category: 'exercises',
      duration: '5 min',
      difficulty: 'Beginner',
      tags: ['Anxiety', 'Panic', 'Breathing'],
      rating: 4.9,
      views: 3421
    },
    {
      id: 6,
      title: 'The Science of Happiness Podcast',
      description: 'Exploring the psychology of well-being and positive emotions.',
      category: 'podcasts',
      duration: '45 min',
      difficulty: 'All Levels',
      tags: ['Happiness', 'Psychology', 'Well-being'],
      rating: 4.8,
      views: 876
    },
    {
      id: 7,
      title: 'Depression Self-Assessment Worksheet',
      description: 'Track your mood and identify patterns with this structured worksheet.',
      category: 'worksheets',
      duration: '15 min',
      difficulty: 'Beginner',
      tags: ['Depression', 'Self-Assessment', 'Tracking'],
      rating: 4.5,
      views: 654
    },
    {
      id: 8,
      title: 'Building Resilience in Difficult Times',
      description: 'Strategies for developing mental toughness and adaptability.',
      category: 'videos',
      duration: '25 min',
      difficulty: 'Intermediate',
      tags: ['Resilience', 'Coping', 'Growth'],
      rating: 4.7,
      views: 1098
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📚';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Resource Library 📚
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Curated mental health resources to support your wellness journey
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent>
            <Input
              placeholder="Search resources by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={(props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            />
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all
                ${selectedCategory === category.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }
              `}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>

        {/* Featured Resource */}
        <Card className="mb-6 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-800">
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                ⭐
              </div>
              <div className="flex-1">
                <Badge variant="primary" size="sm" className="mb-2">Featured</Badge>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Mental Health First Aid Guide
                </h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Essential guide for recognizing and responding to mental health crises. Learn how to support yourself and others.
                </p>
                <Button variant="primary" size="sm">
                  Start Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} hover>
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{getCategoryIcon(resource.category)}</div>
                    <Badge variant={getDifficultyColor(resource.difficulty)} size="sm">
                      {resource.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {resource.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {resource.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      {resource.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {resource.views}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="default" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" fullWidth>
                      View Resource
                    </Button>
                    <Button variant="ghost" size="sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <svg className="w-20 h-20 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No resources found
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search or category filter
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Need Help Finding Resources?
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                  Our AI chatbot can recommend personalized resources based on your needs.
                </p>
                <Button variant="outline" size="sm">
                  Ask AI for Recommendations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
