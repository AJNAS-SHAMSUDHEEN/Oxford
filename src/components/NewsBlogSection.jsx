import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { BLOGS_DATA } from '../data/siteData';

export default function NewsBlogSection({ onSelectBlog }) {
  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden bg-[#073326] text-white"
      style={{
        backgroundImage:
          'url(https://mediumpurple-eagle-702053.hostingersite.com/wp-content/uploads/2025/12/patern.png)',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="absolute inset-0 bg-[#073326]/94 pointer-events-none" />

      {/* Ambient Liquid Blobs for dark refraction */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#ffaa0d]/15 filter blur-[100px] pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#0e674d]/40 filter blur-[100px] pointer-events-none liquid-blob-2" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header with Title and Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-dark text-[#ffaa0d] text-xs font-bold uppercase tracking-widest mb-3 border border-white/20">
              <BookOpen size={13} />
              <span>Stories & Travel Inspiration</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#ffaa0d] tracking-tight leading-tight"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Explore Latest News
            </h2>
          </div>

          <button
            onClick={() => onSelectBlog(BLOGS_DATA[0])}
            className="self-start md:self-end px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ffaa0d] to-[#c59a4b] text-gray-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>View All Stories</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Blog Cards Grid with Liquid Glass */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS_DATA.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group liquid-glass liquid-glass-card rounded-3xl overflow-hidden shadow-2xl text-gray-900 flex flex-col justify-between border border-white/80"
            >
              {/* Image banner with Date badge */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Date floating badge */}
                <div className="absolute top-4 left-4 liquid-glass px-3.5 py-2.5 rounded-2xl shadow-xl text-center min-w-[62px] border border-white/80">
                  <span className="block text-xl font-black text-[#0e674d] leading-none">01</span>
                  <span className="block text-[10px] uppercase font-bold text-gray-600 mt-0.5">DEC</span>
                </div>

                <div className="absolute bottom-4 right-4 liquid-glass-dark text-[#ffaa0d] text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-[#ffaa0d]/30">
                  {blog.category}
                </div>
              </div>

              {/* Text info */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <User size={13} className="text-[#c59a4b]" />
                    <span>info@oxfordadventuretourism.com</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#0e674d] font-bold leading-snug mb-3 group-hover:text-[#c59a4b] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                  <button
                    onClick={() => onSelectBlog(blog)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#0e674d] group-hover:text-[#c59a4b] transition-colors cursor-pointer"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <span className="text-xs text-gray-500 font-medium">4 min read</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
