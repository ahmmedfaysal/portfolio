import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  User, 
  Code, 
  Mail, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Sparkles, 
  Terminal, 
  BrainCircuit, 
  Database, 
  Cpu, 
  Layers,
  GraduationCap,
  Award,
  Milestone
} from 'lucide-react';

// --- Custom SVGs for platforms not in Lucide ---
const ScholarIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const GmailIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

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
      
      for (const section of [...sectionIds].reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

// Smooth reveal wrapper component
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

export default function Portfolio() {
  // Navigation sections mapped to IDs
  const sectionIds = ['home', 'about', 'projects', 'journey', 'contact'];
  const activeSection = useScrollSpy(sectionIds);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: 'NeuralSearch Architecture',
      description: 'Engineered a highly scalable semantic search engine using Qdrant and custom dense retrievers. Decreased search latency by 40% while significantly increasing Mean Reciprocal Rank (MRR) for complex queries.',
      tags: ['PyTorch', 'Qdrant', 'FastAPI', 'AWS'],
      icon: <Database size={40} className="text-[#f4f1e8]" />,
      link: '#'
    },
    {
      title: 'Enterprise Agentic Orchestrator',
      description: 'Designed a sophisticated multi-agent orchestration framework utilizing LangGraph and Anthropic Claude 3.5. Enables autonomous execution of complex, multi-step financial data analytics and reporting.',
      tags: ['LangGraph', 'Next.js', 'Claude 3.5', 'TypeScript'],
      icon: <BrainCircuit size={40} className="text-[#f4f1e8]" />,
      link: '#'
    },
    {
      title: 'LLM Distributed Finetuning',
      description: 'Developed a robust distributed training pipeline for fine-tuning open-source foundational models (Llama-3, Mistral) on highly specific proprietary datasets using QLoRA techniques.',
      tags: ['HuggingFace', 'Ray', 'CUDA', 'Python'],
      icon: <Layers size={40} className="text-[#f4f1e8]" />,
      link: '#'
    }
  ];

  const experience = [
    {
      role: 'Applied AI Engineer',
      company: 'Tech Innovators Inc.',
      date: '2023 — Present',
      description: 'Spearheading Applied AI and Generative AI initiatives. Architected production-grade RAG pipelines and enterprise agentic systems. Reduced model inference costs by 35% via quantization, caching, and strategic API routing.'
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'University of Technology',
      date: '2021 — 2023',
      result: 'CGPA: 3.92 / 4.00',
      description: 'Specialized in Machine Learning and Natural Language Processing. Master\'s Thesis focused on parameter-efficient fine-tuning methods for low-resource languages.'
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'Global Engineering Institute',
      date: '2017 — 2021',
      result: 'CGPA: 3.85 / 4.00',
      description: 'Graduated with Honors. Led the University AI & Robotics club, developing predictive models for autonomous navigation.'
    }
  ];

  const certifications = [
    {
      title: 'AWS Certified Machine Learning – Specialty',
      issuer: 'Amazon Web Services',
      date: '2023'
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI',
      date: '2022'
    },
    {
      title: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2022'
    },
    {
      title: 'Natural Language Processing Specialization',
      issuer: 'DeepLearning.AI',
      date: '2021'
    }
  ];

  return (
    <div className="relative w-full min-h-screen selection:bg-[#9b4819] selection:text-[#f4f1e8]">
      {/* CSS Injection for custom fonts and animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Outfit:wght@300;400;500;600&display=swap');
        
        body {
          background-color: #f4f1e8;
          color: #1C1B19;
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        
        .font-serif { font-family: 'Newsreader', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
        }

        .glass-dock {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 12px 40px rgba(155, 72, 25, 0.1);
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 12s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        .noise {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}} />

      {/* Global Grain Texture Overlay */}
      <div className="noise"></div>

      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-32">
        
        {/* --- Section: Hero --- */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center relative pt-20">
          {/* Bold Contasty Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-[#9b4819] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-[#d97c45] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 mt-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9b4819]/30 bg-white/50 backdrop-blur-md mb-8 shadow-sm">
                <Sparkles size={14} className="text-[#9b4819]" />
                <span className="text-xs font-mono text-[#9b4819] uppercase tracking-wider font-semibold">
                  Portfolio 2026
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif leading-[1.05] tracking-tight text-stone-900 mb-6">
                Faysal Ahmmed<br/>
              </h1>
              <h2 className="text-3xl md:text-5xl font-serif text-[#9b4819] italic font-light mb-8">
                Applied AI Engineer.
              </h2>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="max-w-2xl text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-12">
                I specialize in architecting advanced LLM applications, fine-tuning foundation models, and designing scalable, production-ready machine learning pipelines that actually reason.
              </p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => scrollTo('projects')} 
                  className="px-8 py-4 bg-stone-900 text-[#f4f1e8] rounded-full font-medium hover:bg-[#9b4819] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-[#9b4819]/20"
                >
                  View Work <ArrowUpRight size={18} />
                </button>
                
                {/* Social/Contact Links */}
                <div className="flex gap-3 ml-2">
                  <a href="#" aria-label="GitHub" className="p-3.5 rounded-full border border-stone-300 bg-white/40 backdrop-blur-sm hover:bg-[#9b4819] hover:border-[#9b4819] hover:text-[#f4f1e8] transition-all text-stone-700">
                    <Github size={20} />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="p-3.5 rounded-full border border-stone-300 bg-white/40 backdrop-blur-sm hover:bg-[#9b4819] hover:border-[#9b4819] hover:text-[#f4f1e8] transition-all text-stone-700">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" aria-label="Google Scholar" className="p-3.5 rounded-full border border-stone-300 bg-white/40 backdrop-blur-sm hover:bg-[#9b4819] hover:border-[#9b4819] hover:text-[#f4f1e8] transition-all text-stone-700">
                    <ScholarIcon size={20} />
                  </a>
                  <a href="mailto:example@gmail.com" aria-label="Email" className="p-3.5 rounded-full border border-stone-300 bg-white/40 backdrop-blur-sm hover:bg-[#9b4819] hover:border-[#9b4819] hover:text-[#f4f1e8] transition-all text-stone-700">
                    <GmailIcon size={20} />
                  </a>
                  <a href="#" aria-label="WhatsApp" className="p-3.5 rounded-full border border-stone-300 bg-white/40 backdrop-blur-sm hover:bg-[#9b4819] hover:border-[#9b4819] hover:text-[#f4f1e8] transition-all text-stone-700">
                    <WhatsAppIcon size={20} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- Section: About & Stack --- */}
        <section id="about" className="py-24 md:py-32 scroll-mt-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-stone-900">Philosophy & Stack</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Reveal delay={0.1} className="md:col-span-3">
              <div className="glass-panel p-8 md:p-12 rounded-[2rem] h-full flex flex-col justify-center">
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-light mb-6">
                  As an Applied AI Engineer, my focus extends beyond simply training models in a notebook. I care deeply about the <strong className="text-[#9b4819] font-medium">end-to-end lifecycle</strong>: from curating high-quality datasets and optimizing inference latency, to ensuring systems are aligned, safe, and robustly integrated into modern stacks.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed font-light">
                  I believe intelligent systems should be steerable, interpretable, and built with careful attention to both their capabilities and their constraints. A great model demands a flawless architectural implementation.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2} className="md:col-span-2">
              <div className="glass-panel p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-center bg-white/60">
                <div className="flex items-center gap-3 mb-8">
                  <Terminal size={24} className="text-[#9b4819]" />
                  <h3 className="text-2xl font-serif text-stone-900">Core Technologies</h3>
                </div>
                {/* Highly Contrasty Stack Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {['Python', 'PyTorch', 'Transformers', 'LangChain', 'Next.js', 'TypeScript', 'AWS', 'Docker', 'Qdrant', 'FastAPI'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-stone-900 text-[#f4f1e8] rounded-xl text-sm font-mono shadow-md hover:bg-[#9b4819] hover:-translate-y-0.5 transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- Section: Selected Work --- */}
        <section id="projects" className="py-24 md:py-32 scroll-mt-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Selected Work</h2>
              <p className="text-stone-500 font-mono text-sm max-w-sm">
                Showcasing production-grade implementations and high-impact architectural designs.
              </p>
            </div>
          </Reveal>
          
          <div className="flex flex-col gap-8">
            {projects.map((proj, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                {/* Bold, Dark, Highly Contrasty Project Card */}
                <div className="group relative bg-[#1C1B19] rounded-[2rem] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-transparent hover:shadow-[#9b4819]/20 border border-stone-800 hover:border-[#9b4819]/50">
                  
                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#9b4819] rounded-full filter blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Icon Area */}
                  <div className="flex-shrink-0 p-6 bg-[#2A2826] rounded-2xl border border-white/5 group-hover:scale-105 group-hover:bg-[#9b4819]/20 transition-all duration-500 z-10">
                    {proj.icon}
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-grow z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#9b4819] font-mono font-medium text-sm">0{idx + 1}</span>
                      <h3 className="text-2xl md:text-3xl font-serif text-[#f4f1e8]">{proj.title}</h3>
                    </div>
                    <p className="text-stone-400 font-light leading-relaxed mb-8 max-w-2xl text-lg">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-stone-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Link */}
                  <a href={proj.link} aria-label={`View ${proj.title}`} className="mt-4 md:mt-0 md:ml-auto p-4 bg-[#f4f1e8] text-[#1C1B19] rounded-full hover:bg-[#9b4819] hover:text-[#f4f1e8] transition-colors z-10 flex-shrink-0">
                    <ArrowUpRight size={24} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- Section: The Journey (Exp, Edu, Cert) --- */}
        <div id="journey" className="scroll-mt-12">
          
          {/* Sub-Section: Experience */}
          <section className="py-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <Milestone size={32} className="text-[#9b4819]" />
                <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Experience</h2>
              </div>
            </Reveal>
            
            <div className="max-w-4xl border-l-2 border-[#9b4819]/30 ml-4 md:ml-6 space-y-16 pb-4">
              {experience.map((exp, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="relative pl-10 md:pl-16">
                    {/* High Contrast Timeline Dot */}
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#f4f1e8] border-[4px] border-[#9b4819] shadow-md"></span>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                      <h3 className="text-2xl font-medium text-stone-900">{exp.role}</h3>
                      <span className="text-[#9b4819] font-serif italic text-xl">{exp.company}</span>
                    </div>
                    <p className="inline-block px-3 py-1 bg-white/60 border border-stone-200 rounded text-sm font-mono text-stone-600 mb-6 shadow-sm">
                      {exp.date}
                    </p>
                    <p className="text-stone-700 leading-relaxed font-light text-lg">{exp.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Sub-Section: Education */}
          <section className="py-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <GraduationCap size={32} className="text-[#9b4819]" />
                <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Education</h2>
              </div>
            </Reveal>
            
            <div className="max-w-4xl border-l-2 border-[#9b4819]/30 ml-4 md:ml-6 space-y-16 pb-4">
              {education.map((edu, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="relative pl-10 md:pl-16">
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#f4f1e8] border-[4px] border-[#9b4819] shadow-md"></span>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                      <h3 className="text-2xl font-medium text-stone-900">{edu.degree}</h3>
                    </div>
                    <div className="text-xl text-[#9b4819] font-serif italic mb-4">{edu.institution}</div>
                    
                    <div className="flex flex-wrap gap-4 mb-5 items-center">
                      <span className="inline-block px-3 py-1 bg-white/60 border border-stone-200 rounded text-sm font-mono text-stone-600 shadow-sm">
                        {edu.date}
                      </span>
                      {/* Highlighted Result Badge */}
                      <span className="inline-block px-3 py-1 bg-[#9b4819]/10 text-[#9b4819] border border-[#9b4819]/20 rounded font-mono text-sm font-bold shadow-sm">
                        {edu.result}
                      </span>
                    </div>
                    
                    <p className="text-stone-700 leading-relaxed font-light text-lg">{edu.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Sub-Section: Certifications */}
          <section className="py-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <Award size={32} className="text-[#9b4819]" />
                <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Certifications</h2>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="group relative p-6 md:p-8 rounded-[1.5rem] bg-white/40 border border-stone-200 hover:border-[#9b4819]/50 transition-colors duration-300 overflow-hidden shadow-sm hover:shadow-md">
                    {/* Left Accent Line on Hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9b4819] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-medium text-stone-900 pr-4">{cert.title}</h3>
                      <Award size={24} className="text-stone-300 group-hover:text-[#9b4819] transition-colors flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-stone-500 font-serif italic text-lg">{cert.issuer}</span>
                      <span className="text-xs font-mono bg-stone-200/50 px-2.5 py-1 rounded text-stone-600">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        {/* --- Section: Contact --- */}
        <section id="contact" className="py-32 mb-20 text-center flex flex-col items-center scroll-mt-12">
          <Reveal>
            <div className="inline-flex items-center justify-center p-5 bg-[#1C1B19] rounded-full mb-8 shadow-xl shadow-[#9b4819]/10">
              <Mail size={32} className="text-[#f4f1e8]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 text-stone-900 tracking-tight">Let's build together.</h2>
            <p className="text-xl text-stone-600 mb-12 max-w-lg mx-auto font-light leading-relaxed">
              Currently open for new opportunities. Whether you have a challenging AI problem or just want to connect, my inbox is open.
            </p>
            <a href="mailto:example@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-[#9b4819] text-[#f4f1e8] rounded-full font-medium hover:bg-[#803912] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#9b4819]/20 text-lg">
               Send a Message
            </a>
          </Reveal>
        </section>
        
        {/* Footer */}
        <footer className="text-center pb-24 text-sm font-mono text-stone-500">
          <p>© {new Date().getFullYear()} Faysal Ahmmed. Designed for impact.</p>
        </footer>

      </main>

      {/* --- Apple Glass Navigation Dock --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-dock px-2 py-2 rounded-[2rem] flex items-center justify-center gap-1 sm:gap-2 mx-auto w-fit">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'about', icon: User, label: 'About' },
            { id: 'projects', icon: Code, label: 'Work' },
            { id: 'journey', icon: Layers, label: 'Journey' }, // Covers Exp, Edu, Certs
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
                    ? 'bg-[#1C1B19] shadow-lg scale-110' 
                    : 'hover:bg-white/60 hover:scale-110'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`transition-colors duration-300 ${isActive ? 'text-[#f4f1e8]' : 'text-stone-600 group-hover:text-[#9b4819]'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Minimalist Tooltip */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1C1B19] backdrop-blur-sm text-[#f4f1e8] text-[11px] font-mono tracking-wide px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
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