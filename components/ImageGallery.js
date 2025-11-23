'use client';
import { useState } from 'react';

export default function ImageGallery({ images, place }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          Photos of {place}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.urls.small}
                alt={image.alt_description || `Image of ${place}`}
                className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-opacity-5 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || `Image of ${place}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {selectedImage.user?.name && (
              <div className="text-white text-sm mt-2 text-center">
                Photo by {selectedImage.user.name} on Unsplash
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}