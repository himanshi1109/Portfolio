import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { navigate } from './CustomRouter';

const getAssetUrl = (path) => {
  if (!path) return '';
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return path.startsWith('/') ? `${cleanBase}${path}` : `${cleanBase}/${path}`;
};

const projectsData = [
  { id: "1", title: "EduGenius", image: "/project-images/1/1.png", liveUrl: "https://edu-genius-b28b.onrender.com", githubUrl: "https://github.com/himanshi1109/edu-Genius" },
  { id: "2", title: "VibeNow", image: "/project-images/2/1.png?v=3", liveUrl: "/project/2", githubUrl: "https://github.com/himanshi1109/moodGo" },
  { id: "3", title: "PokeGame", image: "/project-images/3/1.png", liveUrl: "https://pokemon-game-self.vercel.app/", githubUrl: "https://github.com/himanshi1109/pokemonGame" },
  { id: "4", title: "Gen Cook AI", image: "/project-images/4/1.png?v=3", liveUrl: "https://himanshi1109.github.io/Gen-CookAI/", githubUrl: "https://github.com/himanshi1109/Gen-CookAI" },
  { id: "11", title: "Hisaab-Kitaab", image: "/project-images/11/1.png", liveUrl: "https://hisaab-kitaab-nine.vercel.app/", githubUrl: "https://github.com/himanshi1109/hisaab-kitaab" },
  { id: "5", title: "Gorilla", image: "/project-images/5/1.png?v=3", liveUrl: "https://gorilla-science-tawny.vercel.app/", githubUrl: "https://github.com/himanshi1109/Gorilla-Science" },
  { id: "6", title: "Joyspoon", image: "/project-images/6/1.png?v=2", liveUrl: "https://joyspoon.vercel.app/", githubUrl: "https://github.com/himanshi1109/Joyspoon" },
  { id: "7", title: "Soulbound", image: "/project-images/7/1.png?v=2", liveUrl: "https://himanshi1109.github.io/Soulbound/", githubUrl: "https://github.com/himanshi1109/Soulbound" },
  { id: "8", title: "Kiwi", image: "/project-images/8/1.png?v=2", liveUrl: "https://go-kiwii.vercel.app/", githubUrl: "https://github.com/himanshi1109/Go-kiwii" },
  { id: "9", title: "Peregrine", image: "/project-images/9/1.png", liveUrl: "https://peregrine-clothing.vercel.app/", githubUrl: "https://github.com/himanshi1109/Peregrine-Clothing" },
  { id: "10", title: "Hulu", image: "/project-images/10/1.png", liveUrl: "https://himanshi1109.github.io/hulu/", githubUrl: "https://github.com/himanshi1109/Hulu-app" }
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/himanshi-khatrii",
    external: true,
    icon: (
      <svg width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    label: "GitHub",
    href: "https://github.com/himanshi1109",
    external: true,
    icon: (
      <svg width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    )
  }
];

const getBadgeDetails = (id) => {
  switch (id) {
    case "1":
    case "2":
      return { label: "Full Stack", bg: "bg-[#ff5a00]/10 text-[#ff5a00] border border-[#ff5a00]/30 backdrop-blur-sm" };
    case "4":
      return { label: "AI Powered", bg: "bg-purple-500/10 text-purple-400 border border-purple-500/30 backdrop-blur-sm" };
    case "3":
      return { label: "Game Quiz App", bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm" };
    case "11":
      return { label: "Expense Tracker", bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm" };
    default:
      return { label: "UI Clone", bg: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm" }; // cool ice blue theme badge
  }
};

function MarqueeStrip() {
  const items = ["Full Stack", "UI Clone", "AI Powered", "Game Dev", "Open Source"];
  
  return (
    <div className="w-full overflow-hidden py-4 border-t border-b border-white/[0.04] bg-neutral-950/20 mb-12 md:mb-16 select-none">
      <div className="animate-marquee">
        <div className="flex items-center gap-16 pr-16">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="font-syne font-extrabold uppercase tracking-[0.2em] text-xs md:text-sm text-white/30">
                {item}
              </span>
              <span className="text-[#ff5a00] text-base font-bold">•</span>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-16 pr-16" aria-hidden="true">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="font-syne font-extrabold uppercase tracking-[0.2em] text-xs md:text-sm text-white/30">
                {item}
              </span>
              <span className="text-[#ff5a00] text-base font-bold">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, isHero, setIsHovered }) {
  const badge = getBadgeDetails(project.id);
  const detailUrl = `/project/${project.id}`;
  const liveUrl = project.liveUrl || detailUrl;
  const githubUrl = project.githubUrl || "https://github.com/himanshi1109";
 
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="w-full"
    >
      <div 
        onClick={(e) => { e.preventDefault(); navigate(detailUrl); }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[2/1] rounded-[18px] overflow-hidden group cursor-none bg-neutral-900 transition-bouncy hover:-translate-y-[6px] border border-white/[0.04] shadow-[0_15px_35px_-12px_rgba(0,0,0,0.9)]"
      >
        {/* Screenshot cover background image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            alt={project.title} 
            className="w-full h-full object-cover transition-bouncy scale-100 group-hover:scale-[1.06]"
            src={getAssetUrl(project.image)}
            loading="lazy"
          />
        </div>
 
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 z-10 pointer-events-none" />
 
        {/* Tag badge top-right */}
        <div 
          className={`absolute top-[14px] right-[14px] z-20 px-3.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-extrabold tracking-[0.08em] uppercase font-syne shadow-md ${badge.bg}`}
        >
          {badge.label}
        </div>
 
        {/* Bottom content area with slide-up reveal */}
        <div className="absolute bottom-6 left-6 right-6 z-20 transition-bouncy translate-y-3 group-hover:translate-y-0 flex flex-col gap-3">
          <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold uppercase tracking-wide font-syne leading-tight drop-shadow-md">
            {project.title}
          </h3>
          
          {/* Action Buttons (appear on hover with slide-up fade) */}
          <div className="flex gap-2.5 items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto delay-75">
            {/* Live Link Button */}
            <a 
              href={liveUrl}
              target={liveUrl.startsWith('http') ? "_blank" : undefined}
              rel={liveUrl.startsWith('http') ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                e.stopPropagation();
                if (!liveUrl.startsWith('http')) {
                  e.preventDefault();
                  navigate(liveUrl);
                }
              }}
              className="bg-white text-black font-extrabold font-syne text-[10px] md:text-xs rounded-full px-4.5 py-2 flex items-center gap-1.5 hover:bg-neutral-200 transition-colors uppercase tracking-wider cursor-none shadow-md"
            >
              Live Link
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
 
            {/* GitHub Button */}
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold font-syne text-[10px] md:text-xs rounded-full px-4.5 py-2 flex items-center gap-1.5 hover:bg-white/20 transition-colors uppercase tracking-wider cursor-none shadow-md"
            >
              GitHub
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll Ref for Portrait Banner
  const portraitSectionRef = useRef(null);

  // Portrait Banner scroll-linked animation
  const { scrollYProgress: portraitScroll } = useScroll({
    target: portraitSectionRef,
    offset: ["start end", "end start"]
  });
  const portraitScale = useTransform(portraitScroll, [0, 0.5, 1], [1.06, 1, 1]);
  const portraitOpacity = useTransform(portraitScroll, [0, 0.2, 1], [0.5, 1, 1]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  // Track Mouse Movement for Custom Cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth scroll handler for nav anchor links
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Custom Cursor Follower */}
      <div 
        className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white/80 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 ease-out ${
          isHovered ? 'w-10 h-10 bg-white' : 'w-4 h-4'
        }`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Navigation Bar (Identical height classes & transitions) */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 md:px-12 lg:px-16 transition-all duration-500 ease-out h-18 bg-black py-6 md:py-8 lg:py-10 max-w-screen mx-auto"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-[13px] md:text-[14px] font-bold tracking-[0.15em] uppercase text-white no-underline transition-opacity duration-300 hover:opacity-60 py-2 cursor-none"
        >
          Himanshi Khatri
        </a>
        <div className="hidden md:flex items-center gap-10 md:gap-14">
          <a 
            href="#work" 
            onClick={(e) => handleAnchorClick(e, 'work')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-[12px] font-medium tracking-[0.15em] uppercase text-white/50 no-underline transition-colors duration-300 hover:text-white py-2 cursor-none"
          >
            Work
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleAnchorClick(e, 'about')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-[12px] font-medium tracking-[0.15em] uppercase text-white/50 no-underline transition-colors duration-300 hover:text-white py-2 cursor-none"
          >
            About
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-[12px] font-medium tracking-[0.15em] uppercase text-white/50 no-underline transition-colors duration-300 hover:text-white py-2 cursor-none"
          >
            Contact
          </a>
        </div>
        <button 
          onClick={(e) => handleAnchorClick(e, 'contact')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-full bg-transparent text-white text-[11px] md:text-[12px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-transparent cursor-none"
        >
          Get in Touch
        </button>
      </motion.nav>

      {/* Main Container */}
      <main className="bg-black text-white w-full overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative z-20 min-h-[100svh] bg-black flex flex-col items-center justify-center overflow-hidden px-4 mb-24 md:mb-32">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full pointer-events-none" 
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
          />

          {/* Hero Content stacked in standard flex flow matching the original design layout */}
          <div className="text-center flex flex-col items-center w-full max-w-[1400px] mt-6 md:mt-8 lg:mt-10">
            <div className="overflow-hidden mb-1 md:mb-2">
              <motion.span 
                className="block text-[0.65rem] md:text-[0.85rem] lg:text-[0.95rem] font-light tracking-[0.3em] md:tracking-[0.35em] uppercase text-white/35"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              >
                INTRODUCING
              </motion.span>
            </div>

            <div className="overflow-hidden mb-3 md:mb-5">
              <motion.h1 
                className="text-[clamp(2.5rem,11.5vw,224px)] font-black leading-[0.88] tracking-[-0.04em] uppercase text-white"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              >
                HIMANSHI
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8 md:mb-14">
              <motion.h1 
                className="text-[clamp(2.5rem,11.5vw,224px)] font-black leading-[0.88] tracking-[-0.04em] uppercase text-white"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
              >
                KHATRI
              </motion.h1>
            </div>
          </div>

          {/* Scroll Down Line Indicator */}
          <motion.div 
            className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-[8px] md:text-[9px] font-medium tracking-[0.3em] uppercase text-white/20">Scroll</span>
            <motion.div 
              className="w-[1px] h-[25px] md:h-[35px] bg-gradient-to-b from-white/25 to-transparent" 
              style={{ originY: 0 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </section>

        {/* Hero Portrait Banner Section (Scroll Linked Animation) */}
        <section ref={portraitSectionRef} className="relative z-10 -mt-[10vh] md:-mt-[20vh] w-full">
          <motion.div 
            className="w-full relative overflow-hidden max-w-none"
            style={{ scale: portraitScale, opacity: portraitOpacity }}
          >
            <img 
              alt="Himanshi Khatri — Creative Portrait" 
              className="w-full h-auto aspect-[1024/505] object-cover block max-w-none" 
              src={getAssetUrl("/images/portrait.png?v=2")}
            />
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 15%, transparent 85%, #000 100%), linear-gradient(to right, #000 0%, transparent 10%, transparent 90%, #000 100%)' }} 
            />
          </motion.div>
        </section>

        {/* Work Section */}
        <section className="relative z-[5] pt-12 pb-24 md:pt-16 md:pb-32 bg-black" id="work">
          {/* Horizontally scrolling marquee strip */}
          <MarqueeStrip />

          <div className="w-full px-5 md:px-14 lg:px-20">
            
            {/* Featured Projects Block */}
            <div className="flex flex-col gap-4 mb-10 md:mb-14">
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <h2 className="font-syne text-[clamp(2.5rem,7vw,6rem)] font-black uppercase tracking-[-0.03em] leading-none text-white">
                  My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffaa00]">Work</span>
                </h2>
                <span className="font-syne px-3 py-1.5 rounded-full text-xs md:text-sm font-extrabold tracking-wider bg-white/5 border border-white/10 text-white/70">
                  5 Featured
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.18em] uppercase text-white/30 font-syne">
                <span>↑ Featured Projects</span>
                <span>·</span>
                <span>Creative Showcase</span>
              </div>
            </div>

            {/* Grid of Featured Projects (2-column layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
              {projectsData.slice(0, 5).map((project, idx) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={idx} 
                  isHero={true}
                  setIsHovered={setIsHovered} 
                />
              ))}
            </div>

            {/* Elegant Divider between Sections */}
            <div className="w-full h-[1px] bg-white/[0.06] my-16 md:my-24" />

            {/* UI Clones Section Heading */}
            <div className="flex flex-col gap-4 mb-10 md:mb-14">
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <h3 className="font-syne text-[clamp(2.2rem,6vw,4.5rem)] font-black uppercase tracking-[-0.03em] leading-none text-white">
                  UI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#63b8ff]">Clones</span>
                </h3>
                <span className="font-syne px-3 py-1.5 rounded-full text-xs md:text-sm font-extrabold tracking-wider bg-cyan-950/20 border border-cyan-500/20 text-cyan-400">
                  6 Clones
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.18em] uppercase text-cyan-500/40 font-syne">
                <span>↓ Recreated Interfaces</span>
                <span>·</span>
                <span>Pixel Perfect Clones</span>
              </div>
            </div>

            {/* Grid of UI Clone Projects (3-column layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {projectsData.slice(5, 11).map((project, idx) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={idx} 
                  isHero={false}
                  setIsHovered={setIsHovered} 
                />
              ))}
            </div>

          </div>
        </section>

        {/* About Section */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-10 bg-black" id="about">
          <div className="w-full px-5 md:px-14 lg:px-20">
            
            {/* Header details */}
            <motion.div 
              className="text-center mb-12 md:mb-16 pt-4"
              initial={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="block text-[9px] md:text-[11px] font-medium tracking-[0.35em] uppercase text-white/200 mb-8 mt-12 md:mt-24"
                initial={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              >
                Get to know me
              </motion.span>
              <motion.h2 
                className="text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.92] font-black uppercase tracking-[-0.03em] py-4 my-8 md:my-12"
                initial={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              >
                MORE ABOUT<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/50">HIMANSHI</span>
              </motion.h2>
              <motion.div 
                className="w-[50px] h-[2px] bg-gradient-to-r from-white/40 to-transparent mx-auto mt-8"
                initial={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              />
            </motion.div>

            {/* Images and text layout */}
            <div className="flex flex-col gap-12 lg:gap-16 items-center">
              
              {/* Images side-by-side */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
                <motion.div 
                  className="relative rounded-[10px] overflow-hidden bg-[#0a0a0a] border border-[#1f1f1f] aspect-[1414/2000]"
                  initial={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                >
                  <img 
                    alt="Professional CV Resume — Himanshi Khatri" 
                    className="w-full h-full object-contain"
                    src={getAssetUrl("/images/Professional-CV-Resume.png")}
                    loading="lazy"
                  />
                </motion.div>
                <motion.div 
                  className="relative rounded-[10px] overflow-hidden bg-[#0a0a0a] border border-[#1f1f1f] aspect-[1414/2000]"
                  initial={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <img 
                    alt="Himanshi Khatri — Professional Portrait" 
                    className="w-full h-full object-cover"
                    src={getAssetUrl("/images/professional-image.png")}
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Descriptions */}
              <motion.div 
                className="w-full max-w-[900px] flex flex-col items-center text-center mt-4 md:mt-8"
                initial={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="w-[30px] h-[3px] bg-white/20 rounded-full mb-8" />
                <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-white/90 font-semibold mb-6 tracking-[-0.01em]">
                  A Full Stack Developer passionate about building scalable, user-focused web applications using modern technologies and clean design principles.
                </p>
                <p className="text-[clamp(0.85rem,1.05vw,0.95rem)] leading-[1.95] text-white/30 font-normal">
                  Driven by curiosity and continuous learning, I enjoy transforming ideas into seamless digital experiences through MERN Stack development, AI integration, and problem-solving.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="pt-6 pb-6 md:pt-10 md:pb-8 bg-black" id="contact">
          <div className="w-full px-5 md:px-14 lg:px-20">
            
            <motion.div 
              className="text-center mb-[40px] md:mb-[70px]"
              initial={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            >
              <h2 className="text-[clamp(2.2rem,8vw,6.5rem)] font-black leading-[0.9] uppercase tracking-[-0.03em] py-6 mb-8 md:mb-12">
                LET'S WORK TOGETHER
              </h2>
            </motion.div>

            {/* Social icons links */}
            <div 
              className="flex items-center justify-center gap-8 md:gap-14 mb-10 md:mb-16"
            >
              {socialLinks.map((link, idx) => (
                <motion.a 
                  key={link.label}
                  href={link.href} 
                  target={link.external ? "_blank" : undefined} 
                  rel={link.external ? "noopener noreferrer" : undefined} 
                  aria-label={link.label}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group flex items-center gap-3 text-[clamp(1rem,1.8vw,1.4rem)] font-medium tracking-wide text-white/70 no-underline transition-colors duration-300 hover:text-white cursor-none"
                  initial={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.06 * idx, ease: [0.25, 1, 0.5, 1] }}
                  whileHover={{ y: -2 }}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {link.icon}
                  </span>
                  <span className="hidden md:inline uppercase">{link.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Email list */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-5 md:gap-8 mb-[40px] md:mb-[60px]"
              initial={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <a 
                href="mailto:himanshikhatri1109@gmail.com" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="text-[clamp(1rem,1.8vw,1.4rem)] font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300 no-underline cursor-none"
              >
                himanshikhatri1109@gmail.com
              </a>
              <span className="hidden md:inline text-white/20">•</span>
              <a 
                href="tel:+918103333472" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="text-[clamp(1.1rem,2vw,1.5rem)] font-semibold tracking-wider text-white/90 hover:text-white transition-colors duration-300 no-underline cursor-none"
              >
                +91 81033 33472
              </a>
            </motion.div>

            <div className="h-8" />

            {/* Footer Copyright details */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 pb-4 border-t border-[#1f1f1f] gap-3 md:gap-0">
              <span className="text-[9px] md:text-[10px] font-medium tracking-[0.15em] uppercase text-white/20">
                ©2026 Himanshi Khatri
              </span>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="text-[9px] md:text-[10px] font-medium tracking-[0.15em] uppercase text-white/20 no-underline transition-colors duration-300 hover:text-white cursor-none"
              >
                Back to Top ↑
              </a>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}
