import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigate } from './CustomRouter';

const getAssetUrl = (path) => {
  if (!path) return '';
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return path.startsWith('/') ? `${cleanBase}${path}` : `${cleanBase}/${path}`;
};

const projectMetadata = {
  "1": { title: "EDUGENIUS", category: "Full-Stack Development", year: "2025", count: 1, liveUrl: "https://edu-genius-b28b.onrender.com", githubUrl: "https://github.com/himanshi1109/edu-Genius" },
  "2": { title: "VIBENOW", category: "Full-Stack Development", year: "2024", count: 1, liveUrl: "/project/2", githubUrl: "https://github.com/himanshi1109/moodGo" },
  "12": { title: "HRMS PORTAL", category: "Full-Stack Development", year: "2026", count: 1, liveUrl: "https://hrms-5wnb.onrender.com", githubUrl: "https://github.com/himanshi1109/HRMS" },
  "3": { title: "POKEGAME", category: "Game Quiz App", year: "2024", count: 1, liveUrl: "https://pokemon-game-self.vercel.app/", githubUrl: "https://github.com/himanshi1109/pokemonGame" },
  "4": { title: "GEN COOK AI", category: "AI Powered Web App", year: "2024", count: 1, liveUrl: "https://himanshi1109.github.io/Gen-CookAI/", githubUrl: "https://github.com/himanshi1109/Gen-CookAI" },
  "5": { title: "GORILLA", category: "Frontend Design UI Clone", year: "2024", count: 1, liveUrl: "https://gorilla-science-tawny.vercel.app/", githubUrl: "https://github.com/himanshi1109/Gorilla-Science" },
  "6": { title: "JOYSPOON", category: "Frontend Design UI Clone", year: "2024", count: 1, liveUrl: "https://joyspoon.vercel.app/", githubUrl: "https://github.com/himanshi1109/Joyspoon" },
  "7": { title: "SOULBOUND", category: "Frontend Design UI Clone", year: "2024", count: 1, liveUrl: "https://himanshi1109.github.io/Soulbound/", githubUrl: "https://github.com/himanshi1109/Soulbound" },
  "8": { title: "KIWI", category: "Frontend Design UI Clone", year: "2024", count: 1, liveUrl: "https://go-kiwii.vercel.app/", githubUrl: "https://github.com/himanshi1109/Go-kiwii" },
  "9": { title: "PEREGRINE", category: "Frontend Design UI Clone", year: "2024", count: 1, liveUrl: "https://peregrine-clothing.vercel.app/", githubUrl: "https://github.com/himanshi1109/Peregrine-Clothing" },
  "10": { title: "HULU", category: "Frontend Design UI Clone", year: "2024", count: 1, liveUrl: "https://himanshi1109.github.io/hulu/", githubUrl: "https://github.com/himanshi1109/Hulu-app" },
  "11": { title: "HISAAB-KITAAB", category: "Frontend Design UI Clone", year: "2024", count: 1, liveUrl: "https://hisaab-kitaab-nine.vercel.app/", githubUrl: "https://github.com/himanshi1109/hisaab-kitaab" }
};

export default function ProjectDetail({ projectId }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const project = projectMetadata[projectId];

  // Track Mouse Movement for Custom Cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate loading transition like the original site
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center text-white">
        <div>
          <h1 className="text-[2rem] font-black uppercase text-white mb-4">Project not found</h1>
          <a 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            href="/"
            className="text-[12px] font-medium tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors no-underline cursor-pointer"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Pre-generate image paths list
  const images = [];
  for (let i = 1; i <= project.count; i++) {
    const suffix = ["5", "6", "7", "8"].includes(projectId) ? "?v=2" : "";
    const ext = projectId === "12" ? ".jpg" : ".png";
    images.push(getAssetUrl(`/project-images/${projectId}/${i}${ext}${suffix}`));
  }

  return (
    <>
      {/* Custom Cursor Follower */}
      <div 
        className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white/80 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 ease-out ${
          isHovered ? 'w-10 h-10 bg-white' : 'w-4 h-4'
        }`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      <div className="min-h-screen bg-black text-white selection:bg-green-400/30 selection:text-white">
        
        {/* Fixed Header */}
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-14 lg:px-20 py-4 bg-black/80 backdrop-blur-2xl border-b border-[#1f1f1f]"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <button 
            onClick={() => navigate('/')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 bg-transparent border-none text-[12px] md:text-[13px] font-medium tracking-[0.1em] uppercase cursor-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>
          
          <div className="text-center">
            <span className="text-[12px] md:text-[13px] font-bold tracking-[0.08em] uppercase text-white">
              {project.title}
            </span>
          </div>

          <div className="flex gap-2.5 items-center">
            {project.liveUrl && project.liveUrl.startsWith('http') && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-white text-black font-extrabold font-syne text-[9px] md:text-[10px] rounded-full px-3.5 py-1.5 flex items-center gap-1 hover:bg-neutral-200 transition-colors uppercase tracking-wider cursor-none shadow-md"
              >
                Live Link
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold font-syne text-[9px] md:text-[10px] rounded-full px-3.5 py-1.5 flex items-center gap-1 hover:bg-white/20 transition-colors uppercase tracking-wider cursor-none shadow-md"
              >
                GitHub
              </a>
            )}
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="pt-[60px]">
          {loading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <p className="text-white/20 text-[13px] tracking-[0.1em] uppercase font-medium">Loading</p>
            </div>
          ) : (
            <div className="w-full">
              {images.map((imgSrc, index) => (
                <motion.div 
                  key={imgSrc}
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <img 
                    src={imgSrc} 
                    alt={`${project.title} — Image ${index + 1}`} 
                    className="w-full h-auto block" 
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
