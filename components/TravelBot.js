'use client';
import { useState } from 'react';
import useRecommendation from '@/hooks/useRecommendation';
import ImageGallery from '@/components/ImageGallery';

export default function TravelBot() {
  const [place, setPlace] = useState('');
  const { getRecommendation, recommendation, images, loading, error } = useRecommendation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!place.trim()) return;
    await getRecommendation(place);
  };

  const formatRecommendation = (text) => {
    if (!text) return null;

    
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
    
      if (!trimmedLine) return null;

      
      if (trimmedLine.startsWith('### **') && trimmedLine.endsWith('**')) {
        const cleanText = trimmedLine.replace('### **', '').replace('**', '');
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3 first:mt-0 border-l-4 border-blue-500 pl-3">
            {cleanText}
          </h3>
        );
      }

      
      if (trimmedLine.startsWith('### ')) {
        const cleanText = trimmedLine.replace('### ', '');
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3 first:mt-0 border-l-4 border-blue-500 pl-3">
            {cleanText}
          </h3>
        );
      }

      
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const cleanText = trimmedLine.replace(/\*\*/g, '');
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3 first:mt-0 border-l-4 border-blue-500 pl-3">
            {cleanText}
          </h3>
        );
      }

      
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        const content = trimmedLine.substring(2).trim();
        
        
        if (content.includes('**')) {
          const parts = content.split('**');
          return (
            <li key={index} className="flex items-start mb-2">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span className="text-gray-700">
                {parts.map((part, partIndex) => 
                  partIndex % 2 === 1 ? (
                    <strong key={partIndex} className="text-gray-900">{part}</strong>
                  ) : (
                    part
                  )
                )}
              </span>
            </li>
          );
        }

        return (
          <li key={index} className="flex items-start mb-2">
            <span className="text-blue-500 mr-2 mt-1">•</span>
            <span className="text-gray-700">{content}</span>
          </li>
        );
      }

      
      return (
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {trimmedLine}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Travel Recommendation Bot
          </h1>
          <p className="text-lg text-gray-600">
            What city or country do you want to visit?
          </p>
        </div>

        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Enter a city or country..."
              className="flex-1 px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !place.trim()}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md font-medium"
            >
              {loading ? 'Getting Recommendations...' : 'Get Recommendation'}
            </button>
          </div>
        </form>

        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        
        {recommendation && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-blue-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Travel Guide: {place}
              </h2>
            </div>
            
            <div className="space-y-2">
              {formatRecommendation(recommendation)}
            </div>

            
            <ImageGallery images={images} place={place} />

            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                AI-powered recommendations • Refresh for more details
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mt-4"></div>
              </div>
              {/* Image gallery skeleton */}
              <div className="mt-8">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}