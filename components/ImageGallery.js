'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Camera, User, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ImageGallery({ images, place }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <Camera className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">
              Vantage <span className="text-emerald-500 not-italic">Points</span>
            </h3>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest hidden sm:block">
            {images.length} Captures found
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {images.map((image, index) => (
            <motion.div
              layoutId={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={image.id}
            >
              <Card 
                className="group relative aspect-4/3 cursor-pointer overflow-hidden border-2 border-slate-100 dark:border-none bg-slate-50 dark:bg-slate-800 shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-0 h-full">
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description || `Image of ${place}`}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-xs font-bold uppercase tracking-widest">Expand</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center z-100 p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              layoutId={selectedImage.id}
              className="relative w-full max-w-[95vw] 2xl:max-w-7xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-16 right-0 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </Button>

              <div className="w-full bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-slate-100 dark:border-white/5">
                <div className="aspect-video sm:aspect-auto">
                  <img
                    src={selectedImage.urls.full || selectedImage.urls.regular}
                    alt={selectedImage.alt_description || `Image of ${place}`}
                    className="w-full max-h-[70vh] object-contain mx-auto"
                  />
                </div>
                
                <div className="p-6 md:p-10 bg-slate-50/80 dark:bg-slate-950/50 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <User className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1">Photographer</p>
                      <p className="text-slate-900 dark:text-white font-black italic tracking-tight">{selectedImage.user?.name || 'Anonymous'}</p>
                    </div>
                  </div>
                  
                    <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold h-12 px-6">
                      Download HD
                    </Button>
                    <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-6">
                      View Source
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}