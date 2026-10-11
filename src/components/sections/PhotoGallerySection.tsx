import React, { useState } from 'react';
import { BookOpen, Calendar, Maximize2, Sparkles, ImagePlus } from 'lucide-react';
import { PhotoLightbox } from '../PhotoLightbox';
import { giftContent } from '../../data/giftContent';

interface PhotoGallerySectionProps {
  onNext: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ onNext }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-gold-300 bg-gold-500/10 border border-gold-500/30 mb-3 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Раздел 03
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 gold-gradient-text tracking-wide mb-3">
          {giftContent.gallery.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-serif">
          {giftContent.gallery.sectionSubtitle}
        </p>
      </div>

      {/* Grid of Photos with 3D Tilt Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full mb-12">
        {giftContent.gallery.photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group relative rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-gold-500/25 cursor-pointer select-none transition-all duration-300"
          >
            {/* Image Thumbnail Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-midnight-950">
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Top Date Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-midnight-900/80 backdrop-blur-md text-gold-300 border border-gold-500/30 shadow-md">
                <Calendar className="w-3 h-3" />
                <span>{photo.date}</span>
              </div>

              {/* Expand Icon Hint */}
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-midnight-900/80 backdrop-blur-md text-slate-300 group-hover:text-gold-300 border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Photo Info Content */}
            <div className="p-4 sm:p-5">
              <h3 className="text-lg font-serif font-semibold text-slate-100 group-hover:text-gold-200 transition-colors mb-1.5 line-clamp-1">
                {photo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/90 font-serif line-clamp-2 leading-relaxed">
                {photo.description}
              </p>
            </div>

            {/* Bottom Glow Border Accent */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent group-hover:via-gold-400 transition-all" />
          </div>
        ))}
      </div>

      {/* Helpful Hint on Custom Photos */}
      <div className="flex items-center gap-2 text-xs text-gold-400/80 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-8 text-center max-w-lg">
        <ImagePlus className="w-4 h-4 shrink-0 text-gold-400" />
        <span>Вы сможете легко добавить свои семейные фотографии в папку <code>public/photos/</code> и указать их в <code>giftContent.ts</code>!</span>
      </div>

      {/* Next Step Button */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg gold-gradient-btn inline-flex items-center justify-center gap-3 cursor-pointer group"
        >
          <BookOpen className="w-5 h-5 text-midnight-950 group-hover:rotate-6 transition-transform" />
          <span>Перейти к книге воспоминаний 📖</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <PhotoLightbox
          photos={giftContent.gallery.photos}
          initialIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}

    </section>
  );
};
