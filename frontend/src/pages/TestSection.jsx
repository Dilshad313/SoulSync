import React, { useState, useEffect } from 'react';
import api from '../services/api';

const questions = [
  {
    id: 1,
    question: 'How often have you felt down, depressed, or hopeless in the last 2 weeks?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    id: 2,
    question: 'How often have you had little interest or pleasure in doing things?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    id: 3,
    question: 'How often have you felt nervous, anxious, or on edge?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    id: 4,
    question: 'How often have you been unable to stop or control worrying?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  },
  {
    id: 5,
    question: 'How often have you felt tired or had little energy?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
  }
];

const TestSection = () => {
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    // Fetch user's past reviews on mount
    api.get('/ai/my-reviews').then(res => {
      setMyReviews(res.data.reviews || []);
    });
  }, []);

  const handleChange = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send answers to backend to get Gemini review and store in DB
      const res = await api.post('/ai/test-review', { answers });
      setReview(res.data.review);
      setShowReview(true);
    } catch (err) {
      setReview('Error generating review.');
      setShowReview(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Mental Health MCQ Test</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map(q => (
          <div key={q.id} className="mb-4">
            <div className="font-medium text-gray-800 mb-2">{q.question}</div>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map(opt => (
                <label key={opt} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                    className="mr-2"
                    required
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Finish & Get Review'}
        </button>
      </form>
      {showReview && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg shadow text-center">
          <h3 className="text-lg font-bold text-blue-700 mb-2">Your Gemini Review</h3>
          <p className="text-gray-800">{review}</p>
        </div>
      )}
      {/* My Review History Section */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-indigo-700 mb-4 text-center">My Past Reviews</h3>
        {myReviews.length === 0 ? (
          <p className="text-gray-500 text-center">No previous reviews found.</p>
        ) : (
          <ul className="space-y-4">
            {myReviews.map((r, idx) => (
              <li key={r._id || idx} className="bg-gray-50 p-4 rounded-lg shadow">
                <div className="text-sm text-gray-600 mb-2">{new Date(r.createdAt).toLocaleString()}</div>
                <div className="font-medium text-gray-800 mb-1">Review:</div>
                <div className="text-gray-700 mb-2">{r.review}</div>
                <div className="font-medium text-gray-800 mb-1">Answers:</div>
                <div className="text-xs text-gray-600">{JSON.stringify(r.answers)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestSection;
