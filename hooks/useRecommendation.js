import { useState } from 'react';

export default function useRecommendation() {
  const [recommendation, setRecommendation] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRecommendation = async (place) => {
    setLoading(true);
    setError('');
    setRecommendation('');
    setImages([]);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ place }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
      setImages(data.images || []);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getRecommendation,
    recommendation,
    images,
    loading,
    error,
  };
}