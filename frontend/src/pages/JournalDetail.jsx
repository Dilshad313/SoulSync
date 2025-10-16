import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import NotificationService from '../utils/notifications';

const JournalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await api.get(`/journals/${id}`);
        setEntry(res.data);
      } catch (err) {
        NotificationService.error('Failed to load journal entry');
        navigate('/journal');
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!entry) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{entry.title}</h1>
          <p className="text-gray-600">{new Date(entry.createdAt).toLocaleString()}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-800">{entry.content}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {entry.tags && entry.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">{tag}</span>
            ))}
          </div>

          {entry.aiReview && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Review</h3>
              <p className="text-gray-700 whitespace-pre-line">{entry.aiReview}</p>
              {entry.aiRecommendations && entry.aiRecommendations.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-medium text-gray-900 mb-1">Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {entry.aiRecommendations.map((rec, i) => (
                      <li key={i} className="text-gray-700">{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-8">
            <button onClick={() => navigate('/journal')} className="text-blue-600 hover:text-blue-800 font-medium">← Back to Journal</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalDetail;
