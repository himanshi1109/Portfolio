import React, { useState, useEffect } from 'react';
import Home from './Home';
import ProjectDetail from './ProjectDetail';

// Global navigation helper that components can import
export const navigate = (to) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const target = to.startsWith('/') ? `${cleanBase}${to}` : `${cleanBase}/${to}`;
  window.history.pushState({}, '', target);
  window.dispatchEvent(new Event('popstate'));
};

export default function CustomRouter() {
  const [path, setPath] = useState(() => {
    let p = window.location.pathname;
    if (p.toLowerCase().startsWith('/portfolio')) {
      p = p.substring('/portfolio'.length);
    }
    return p;
  });

  useEffect(() => {
    const handlePopState = () => {
      let p = window.location.pathname;
      if (p.toLowerCase().startsWith('/portfolio')) {
        p = p.substring('/portfolio'.length);
      }
      setPath(p);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple route matcher
  if (path === '/' || path === '' || path.startsWith('/#')) {
    return <Home />;
  }

  const projectMatch = path.match(/^\/project\/([a-zA-Z0-9_-]+)$/);
  if (projectMatch) {
    const projectId = projectMatch[1];
    return <ProjectDetail projectId={projectId} />;
  }

  // Fallback / 404
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-black mb-4">404</h1>
        <p className="text-white/40 mb-6 uppercase tracking-widest text-xs">Page Not Found</p>
        <button 
          onClick={() => navigate('/')} 
          className="text-xs uppercase tracking-widest text-white hover:text-white/60 transition-colors border border-white/20 rounded-[10px] px-4 py-2"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
