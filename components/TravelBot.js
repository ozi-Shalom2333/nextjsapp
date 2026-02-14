'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Compass, MapPin, Sparkles, Loader2, ArrowRight, Share2, Printer } from 'lucide-react';
import useRecommendation from '@/hooks/useRecommendation';
import ImageGallery from '@/components/ImageGallery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/mode-toggle';

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
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            key={index} 
            className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 first:mt-0 flex items-center gap-3 border-l-4 border-emerald-500 pl-4 py-1"
          >
            {cleanText}
          </motion.h3>
        );
      }

      if (trimmedLine.startsWith('### ')) {
        const cleanText = trimmedLine.replace('### ', '');
        return (
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            key={index} 
            className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 first:mt-0 flex items-center gap-3 border-l-4 border-emerald-500 pl-4 py-1"
          >
            {cleanText}
          </motion.h3>
        );
      }

      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const cleanText = trimmedLine.replace(/\*\*/g, '');
        return (
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            key={index} 
            className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 first:mt-0 flex items-center gap-3 border-l-4 border-emerald-500 pl-4 py-1"
          >
            {cleanText}
          </motion.h3>
        );
      }

      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        const content = trimmedLine.substring(2).trim();
        const parts = content.split('**');
        return (
          <motion.li 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            key={index} 
            className="flex items-start mb-4 group"
          >
            <span className="text-emerald-500 mr-4 mt-1.5 shrink-0">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {parts.map((part, partIndex) => 
                partIndex % 2 === 1 ? (
                  <strong key={partIndex} className="text-slate-900 dark:text-white font-semibold">{part}</strong>
                ) : (
                  part
                )
              )}
            </span>
          </motion.li>
        );
      }

      return (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          key={index} 
          className="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed text-lg"
        >
          {trimmedLine}
        </motion.p>
      );
    });
  };


  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4 transition-colors duration-500">
      <div className="max-w-4xl lg:max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="mb-12">
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-600 rounded-lg">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                NomadAI
              </span>
            </div>
            
            <ModeToggle />
          </motion.nav>
        </header>

        <main>
          <div className="max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge variant="outline" className="mb-6 py-1.5 px-4 rounded-full text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-bold uppercase tracking-wider text-[10px]">
                AI-Powered Travel Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Where to next?
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
                Discover your perfect trip with NomadAI. tailored itineraries for every style of traveler.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="e.g. Kyoto, Japan"
                    className="px-6 py-6 text-lg rounded-full border-slate-200 dark:border-slate-800 transition-all bg-white dark:bg-slate-950 shadow-sm focus:ring-2 focus:ring-emerald-500/20"
                    disabled={loading}
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !place.trim()}
                  className="py-6 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-lg font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all w-full sm:w-auto"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 px-6 py-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            {recommendation && (
              <motion.div
                key="recommendation"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
              >
                <Card className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-none shadow-2xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden transition-all duration-500">
                  <CardHeader className="p-8 md:p-14 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-1 bg-emerald-500 rounded-full" />
                          <span className="text-emerald-500 font-bold uppercase tracking-[0.2em] text-xs">Nomad Verified Guide</span>
                        </div>
                        <CardTitle className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                          {place.toUpperCase()}
                        </CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl">
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 md:p-14 pt-0">
                    <div className="max-w-none">
                      {formatRecommendation(recommendation)}
                    </div>
                    
                    <div className="mt-20">
                      <ImageGallery images={images} place={place} />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-white/5 p-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
                      <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
                      Live Recommendations
                    </div>
                    <p className="text-slate-500 text-xs font-medium">Generated based on world-class travel data • NomadAI v2.0</p>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-8 md:p-14 rounded-[2.5rem] shadow-2xl">
                  <div className="space-y-10">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-48 rounded-full" />
                        <Skeleton className="h-12 w-64 rounded-xl" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-10 w-10 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="aspect-4/3 rounded-2xl" />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-20 text-center border-t border-slate-100 dark:border-slate-800 pt-12">
          <p className="text-slate-400 text-sm font-medium">Built for the curious traveler • &copy; 2026 NomadAI</p>
        </footer>
      </div>
    </div>
  );
}