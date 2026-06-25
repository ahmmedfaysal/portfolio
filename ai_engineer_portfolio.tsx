import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles, 
  Terminal, 
  BrainCircuit, 
  Database, 
  Cpu, 
  Layers 
} from 'lucide-react';

// --- Custom Hooks ---

// Hook for scroll-triggered reveal animations
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible];
};

// Hook for updating the active nav item based on scroll position
const useScrollSpy = (sectionIds, offset = 300) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      // Reverse array to find the deepest section we've scrolled into
      for (const section of [...sectionIds].reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

// --- Components ---

// Smooth reveal wrapper
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '50px' });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {children}
    </div>
  );
};

// The Main Portfolio App
export default function Portfolio() {
  const sectionIds = ['home', 'about', 'projects', 'experience', 'contact'];
  const activeSection = useScrollSpy(sectionIds);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mock Data
  const projects = [
    {
      title: 'NeuralSearch Engine',
      description: 'Built a highly scalable semantic search engine using Qdrant and custom dense retrievers, decreasing latency by 40% and increasing MRR.',
      tags: ['PyTorch', 'Qdrant', 'FastAPI', 'AWS'],
      icon: <Database size={48} className="text-stone-400" />,
      link: '#'
    },
    {
      title: 'Enterprise Agentic Platform',
      description: 'Designed a multi-agent orchestration framework utilizing LangGraph and Anthropic Claude 3.5 for complex financial data analytics.',
      tags: ['LangGraph', 'Next.js', 'Claude 3.5', 'TypeScript'],
      icon: <BrainCircuit size={48} className="text-stone-400" />,
      link: '#'
    },
    {
      title: 'LLM Finetuning Suite',
      description: 'Developed a distributed training pipeline for fine-tuning open-source LLMs (Llama-3, Mistral) on custom proprietary datasets using QLoRA.',
      tags: ['HuggingFace', 'Ray', 'CUDA', 'Python'],
      icon: <Layers size={48} className="text-stone-400" />,
      link: '#'
    },
    {
      title: 'Vision-Language Diagnostician',
      description: 'An experimental multimodal architecture integrating radiology images with clinical text to assist in preliminary medical reporting.',
      tags: ['Computer Vision', 'Transformers', 'React'],
      icon: <Cpu size={48} className="text-stone-400" />,
      link: '#'
    }
  ];

  const experience = [
    {
      role: 'Senior AI Engineer',
      company: 'Anthrosphere AI',
      date: '2024 — Present',
      description: 'Leading the Generative AI initiatives. Architected and deployed production RAG pipelines serving 100k+ MAU. Reduced inference costs by 35% through model quantization and caching strategies.'
    },
    {
      role: 'Machine Learning Engineer',
      company: 'DataFlow Inc.',
      date: '2021 — 2024',
      description: 'Built scalable recommendation engines and deployed computer vision models to edge devices. Collaborated with data engineering teams to establish MLOps best practices.'
    },
    {
      role: 'Software Engineer',
      company: 'Creative Syntax',
      date: '2019 — 2021',
      description: 'Full-stack development using React and Node.js. Transitioned into machine learning by developing automated NLP categorizers for client content.'
    }
  ];

  return (
    <div className="relative w-full min-h-screen selection:bg-[#E0DCD0] selection:text-[#1C1B19]">
      {/* --- Injected CSS for Fonts & Aesthetics --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Outfit:wght@300;400;500;600&display=swap');
        
        body {
          background-color: #F4F1EA;
          color: #1C1B19;
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        
        .font-serif { font-family: 'Newsreader', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
        }

        .glass-dock {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }

        .noise {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}} />

      {/* Grainy Texture Overlay */}
      <div className="noise"></div>

      {/* --- Main Content --- */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pb-32">
        
        {/* Section: Hero */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center relative pt-20">
          {/* Ambient Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-[#E8E3D5] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-[#EFECE3] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-300 bg-white/40 backdrop-blur-md mb-8 shadow-sm">
                <Sparkles size={14} className="text-stone-600" />
                <span className="text-xs font-mono text-stone-600 uppercase tracking-wider font-medium">AI Engineer & Researcher</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.1] tracking-tight text-stone-900 mb-8">
                Building systems <br className="hidden md:block"/>
                <span className="italic text-stone-500 font-light">that reason.</span>
              </h1>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="max-w-2xl text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-12">
                I specialize in architecting advanced LLM applications, fine-tuning foundation models, and designing scalable machine learning pipelines for real-world impact.
              </p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => scrollTo('projects')} 
                  className="px-7 py-3.5 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-stone-900/20"
                >
                  View Work <ArrowUpRight size={18} />
                </button>
                <a href="#" className="p-3.5 rounded-full border border-stone-300 bg-white/30 backdrop-blur-sm hover:bg-white/60 transition-colors text-stone-700 hover:text-stone-900">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3.5 rounded-full border border-stone-300 bg-white/30 backdrop-blur-sm hover:bg-white/60 transition-colors text-stone-700 hover:text-stone-900">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-3.5 rounded-full border border-stone-300 bg-white/30 backdrop-blur-sm hover:bg-white/60 transition-colors text-stone-700 hover:text-stone-900">
                  <Twitter size={20} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section: About & Stack */}
        <section id="about" className="py-24 md:py-32 scroll-mt-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-stone-900">Philosophy & Stack</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.1} className="md:col-span-2">
              <div className="glass-panel p-8 md:p-12 rounded-[2rem] h-full flex flex-col justify-center">
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-light mb-6">
                  As an AI Engineer, my focus extends beyond simply training models. I care deeply about the <strong className="text-stone-900 font-medium">end-to-end lifecycle</strong>: from curating high-quality datasets and optimizing inference latency, to ensuring systems are aligned, safe, and robustly integrated into modern web stacks.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed font-light">
                  I believe intelligent systems should be steerable, interpretable, and built with careful attention to both their capabilities and their constraints. A great model needs a great interface.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2} className="md:col-span-1">
              <div className="glass-panel p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <Terminal size={24} className="text-stone-800" />
                  <h3 className="text-2xl font-serif text-stone-900">Core Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['Python', 'PyTorch', 'Transformers', 'LangChain', 'Next.js', 'TypeScript', 'AWS', 'Docker', 'Vector DBs'].map((tech) => (
                    <span key={tech} className="px-3.5 py-1.5 bg-white/50 border border-white/60 rounded-lg text-sm font-mono text-stone-700 shadow-sm transition-colors hover:bg-white/80 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section: Projects */}
        <section id="projects" className="py-24 md:py-32 scroll-mt-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mb-16 text-stone-900">Selected Work</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((proj, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group glass-panel rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-stone-900/5 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  {/* Visual Graphic Area */}
                  <div className="h-64 bg-[#EAE6D9] relative overflow-hidden p-8 flex items-center justify-center border-b border-white/40">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-400 via-transparent to-transparent mix-blend-multiply"></div>
                    <div className="w-24 h-24 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-out z-10">
                      {proj.icon}
                    </div>
                  </div>
                  {/* Content Area */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-serif text-stone-900">{proj.title}</h3>
                      <a href={proj.link} className="p-2.5 bg-stone-200/50 rounded-full hover:bg-stone-900 hover:text-white transition-colors text-stone-600">
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                    <p className="text-stone-600 mb-8 font-light leading-relaxed flex-grow">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {proj.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-stone-500 bg-stone-200/40 px-2.5 py-1 rounded border border-stone-300/30 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Section: Experience */}
        <section id="experience" className="py-24 md:py-32 scroll-mt-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mb-16 text-stone-900">Experience</h2>
          </Reveal>
          
          <div className="max-w-3xl border-l-2 border-stone-300 ml-4 md:ml-6 space-y-16 pb-8">
            {experience.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="relative pl-10 md:pl-16">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#F4F1EA] border-[3px] border-stone-400 shadow-sm"></span>
                  
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                    <h3 className="text-2xl font-medium text-stone-900">{exp.role}</h3>
                    <span className="text-stone-500 font-serif italic text-lg">{exp.company}</span>
                  </div>
                  <p className="text-sm font-mono text-stone-500 mb-5 tracking-wide">{exp.date}</p>
                  <p className="text-stone-600 leading-relaxed font-light text-lg">{exp.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Section: Contact */}
        <section id="contact" className="py-32 mb-20 text-center flex flex-col items-center scroll-mt-12">
          <Reveal>
            <div className="inline-flex items-center justify-center p-4 bg-white/40 rounded-full mb-8 border border-white/60 shadow-sm">
              <Mail size={32} className="text-stone-400" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 text-stone-900 tracking-tight">Let's build together.</h2>
            <p className="text-xl text-stone-600 mb-12 max-w-lg mx-auto font-light leading-relaxed">
              Currently open for new opportunities. Whether you have a challenging AI problem or just want to connect, my inbox is open.
            </p>
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-stone-900/20 text-lg">
               Send a Message
            </a>
          </Reveal>
        </section>
        
        {/* Footer */}
        <footer className="text-center pb-24 text-sm font-mono text-stone-500">
          <p>© {new Date().getFullYear()} AI Engineer. Designed with absolute minimalism.</p>
        </footer>

      </main>

      {/* --- Apple Glass Navigation Dock --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-dock px-2 py-2 rounded-[2rem] flex items-center justify-center gap-1 sm:gap-2 mx-auto w-fit">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'about', icon: User, label: 'About' },
            { id: 'projects', icon: Code, label: 'Work' },
            { id: 'experience', icon: Briefcase, label: 'Experience' },
            { id: 'contact', icon: Mail, label: 'Contact' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={item.label}
                className={`relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-400 ease-out focus:outline-none ${
                  isActive 
                    ? 'bg-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.05)] scale-110' 
                    : 'hover:bg-white/50 hover:scale-110'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`transition-colors duration-300 ${isActive ? 'text-stone-900' : 'text-stone-500 group-hover:text-stone-800'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-900/90 backdrop-blur-sm text-white text-[11px] font-mono tracking-wide px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}