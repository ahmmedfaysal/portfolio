"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  User, 
  Code, 
  Mail, 
  ArrowUpRight, 
  Sparkles, 
  Terminal, 
  BrainCircuit, 
  Database, 
  Cpu, 
  Layers,
  GraduationCap,
  Award,
  Milestone,
  Trophy,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';

// --- Custom SVGs for platforms not in Lucide ---
const ScholarIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const GitHubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SiCodeforces = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5z" />
  </svg>
);

const SiCodechef = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 10.963l-4.542.868L12 0l-7.458 11.83L0 10.964V12.5h1.22l2.366 11.5h16.828l2.366-11.5H24v-1.537zM12 4.093l4.57 7.243-4.57.873-4.57-.873L12 4.093zM18.847 22H5.153l-1.92-9.332L12 14.347l8.767-1.68L18.847 22z" />
    </svg>
);

const SiWhatsapp = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
      icon: <Database size={40} className="text-[#FAFAF8]" />,
      link: '#'
    },
    {
      title: 'Enterprise Agentic Orchestrator',
      description: 'Designed a sophisticated multi-agent orchestration framework utilizing LangGraph and Anthropic Claude 3.5. Enables autonomous execution of complex, multi-step financial data analytics and reporting.',
      tags: ['LangGraph', 'Next.js', 'Claude 3.5', 'TypeScript'],
      icon: <BrainCircuit size={40} className="text-[#FAFAF8]" />,
      link: '#'
    },
    {
      title: 'LLM Distributed Finetuning',
      description: 'Developed a robust distributed training pipeline for fine-tuning open-source foundational models (Llama-3, Mistral) on highly specific proprietary datasets using QLoRA techniques.',
      tags: ['HuggingFace', 'Ray', 'CUDA', 'Python'],
      icon: <Layers size={40} className="text-[#FAFAF8]" />,
      link: '#'
    }
  ];

  const experience = [
    {
      role: 'Junior AI Engineer',
      company: 'Softvence Agency - Delta',
      date: '2026 — Present',
      description: 'Spearheading Applied AI and Generative AI initiatives. Architected production-grade RAG pipelines and enterprise agentic systems. Reduced model inference costs by 35% via quantization, caching, and strategic API routing.'
    },
    {
      role: 'Undergraduate Teaching Assistant',
      company: 'Bangladesh University of Business and Technology',
      date: '2025 — 2026',
      description: 'Conducted university laboratory sessions for foundational and advanced engineering courses, including Object Oriented Programming (C++), Introduction to Java, Digital Logic Design, and Machine Learning. .'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science and Engineering',
      institution: 'Bangladesh University of Business and Technology',
      date: '2022 — 2026',
      result: 'CGPA: 3.96 / 4.00',
      description: 'Graduated with a core focus on Machine Learning, Data Structures, and Algorithms',
      achievements: [
        'Dean\'s Honor List 2025',
        '1st Runner Up at Senior Coding Contest', 
        'Champion in IoT project Showcase'
      ]
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

  const extracurriculars = [
    {
      platform: 'ICPC (International Collegiate Programming Contest)',
      role: 'Team Lead',
      rating: 'Regional Finalist',
      description: 'Led a 3-person team to the Regional Finals in 2023. Responsible for desiging every solve perfectly under tight time constraint.',
      icon: <Trophy size={24} className="text-[#0F766E]" />
    },
    {
      platform: 'Codeforces',
      role: 'Competitive Programmer',
      rating: 'Max Rating: 1237 (Pupil)',
      description: 'Regularly participate in Div 2 and Div 3 contests. Solved over 900 algorithmic problems focusing on dynamic programming, graph theory, and advanced data structures.',
      icon: <SiCodeforces size={24} className="text-[#1f8acb]" /> 
    },
    {
      platform: 'CodeChef',
      role: 'Competitive Programmer',
      rating: '2 Star',
      description: 'Achieved 2-star rating through consistent performance in long challenges and cook-offs.',
      icon: <SiCodechef size={24} className="text-[#5B4638]" /> 
    }
  ];

  return (
    <div className="relative w-full min-h-screen selection:bg-[#D6EDE8] selection:text-[#111111]">
      {/* CSS Injection for custom fonts and animations */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Importing high-quality fallbacks as Söhne and Signifier are premium fonts */
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        
        body {
          background-color: #FAFAF8;
          color: #111111;
          font-family: 'Söhne', 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        
        .font-heading { font-family: 'Signifier', 'Newsreader', serif; }
        .font-mono { font-family: 'Söhne Mono', 'IBM Plex Mono', monospace; }

        .glass-panel {
          background: rgba(243, 242, 238, 0.4); /* Based on #F3F2EE Surface */
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(229, 231, 235, 0.6); /* Based on #E5E7EB Border */
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
        }

        /* Refined Apple Glass Dock */
        .glass-dock {
          background: rgba(243, 242, 238, 0.65); /* Surface */
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(229, 231, 235, 0.8); /* Border */
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(255, 255, 255, 0.4) inset;
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
        
        /* Persistent Background Gradient for all pages */
        .ambient-bg {
           position: fixed;
           top: 0; left: 0; width: 100%; height: 100%;
           z-index: -1;
           overflow: hidden;
           pointer-events: none;
        }
      `}} />

      {/* Global Grain Texture Overlay & Ambient Background*/}
      <div className="noise"></div>
      
      {/* Moved Orbs to fixed background so they persist subtly across all sections */}
      <div className="ambient-bg">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#0F766E] rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.08] animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#D6EDE8] rounded-full mix-blend-multiply filter blur-[150px] opacity-[0.40] animate-blob animation-delay-4000"></div>
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-32 relative z-10">
        
        {/* --- Section: Hero --- */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center relative pt-20">
          <div className="relative z-10 mt-10">
            
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading leading-[1.05] tracking-tight text-[#111111] mb-6">
                Faysal Ahmmed<br/>
              </h1>
              {/* Applied AI Engineer in Box */}
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#0F766E]/30 bg-[#F3F2EE]/50 backdrop-blur-md mb-8 shadow-sm">
                <span className="text-xl md:text-2xl font-heading text-[#0F766E] tracking-wide font-medium italic">
                  Applied AI Engineer
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="max-w-2xl text-lg md:text-xl text-[#5F6368] font-light leading-relaxed mb-12">
                I specialize in architecting advanced LLM applications, fine-tuning foundation models, and designing scalable, production-ready machine learning pipelines that actually reason.
              </p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => scrollTo('projects')} 
                  className="px-8 py-4 bg-[#111111] text-[#FAFAF8] rounded-full font-medium hover:bg-[#115E59] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-[#0F766E]/20"
                >
                  View Work <ArrowUpRight size={18} />
                </button>
                
                {/* Social/Contact Links - Cleaned up */}
                <div className="flex gap-3 ml-2">
                  <a href="https://github.com/ahmmedfaysal" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="relative group p-3.5 rounded-full border border-[#E5E7EB] bg-[#F3F2EE]/40 backdrop-blur-sm hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-[#FAFAF8] transition-all text-[#5F6368]">
                    <GitHubIcon size={20} />
                    <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111111]/90 backdrop-blur-md text-[#FAFAF8] text-[12px] font-medium tracking-wide px-3.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">
                      GitHub
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111]/90 rotate-45"></div>
                    </span>
                  </a>
                  <a href="https://www.linkedin.com/in/faysal-ahmmed-65b68b240" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="relative group p-3.5 rounded-full border border-[#E5E7EB] bg-[#F3F2EE]/40 backdrop-blur-sm hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-[#FAFAF8] transition-all text-[#5F6368]">
                    <LinkedInIcon size={20} />
                    <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111111]/90 backdrop-blur-md text-[#FAFAF8] text-[12px] font-medium tracking-wide px-3.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">
                      LinkedIn
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111]/90 rotate-45"></div>
                    </span>
                  </a>
                  <a href="https://scholar.google.com/citations?user=K6V0gzsAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" className="relative group p-3.5 rounded-full border border-[#E5E7EB] bg-[#F3F2EE]/40 backdrop-blur-sm hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-[#FAFAF8] transition-all text-[#5F6368]">
                    <ScholarIcon size={20} />
                    <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111111]/90 backdrop-blur-md text-[#FAFAF8] text-[12px] font-medium tracking-wide px-3.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">
                      Google Scholar
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111]/90 rotate-45"></div>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- Section: About & Stack --- */}
        <section id="about" className="py-24 md:py-32 scroll-mt-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-heading mb-12 text-[#111111]">Philosophy & Stack</h2>
          </Reveal>
          
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="glass-panel p-8 md:p-12 rounded-[2rem] flex flex-col justify-center">
                <p className="text-lg md:text-xl text-[#5F6368] leading-relaxed font-light mb-6">
                  As an Applied AI Engineer, my focus extends beyond simply training models in a notebook. I care deeply about the end-to-end lifecycle: from curating high quality datasets and optimizing inference latency, to ensuring systems are safe, compliant, and robustly integrated into production.
                </p>
                <p className="text-lg text-[#5F6368] leading-relaxed font-light">
                  I believe intelligent systems must be steerable, interpretable, and built with careful attention to both their capabilities and engineering constraints. A great model demands a flawless architectural implementation.
                </p>
              </div>
            </Reveal>
            
            {/* Redesigned Core Technologies - Full Width */}
            <Reveal delay={0.2}>
              <div className="glass-panel p-8 md:p-12 rounded-[2rem] bg-[#F3F2EE]/60 relative overflow-hidden">
                {/* Subtle side accent */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0F766E]/80"></div>
                
                <div className="flex items-center gap-3 mb-8 ml-2">
                  <Terminal size={28} className="text-[#0F766E]" />
                  <h3 className="text-3xl font-heading text-[#111111]">Technical Expertise</h3>
                </div>
                
                {/* Categorized Stack for better layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-2">
                    <div>
                        <h4 className="text-sm font-mono text-[#5F6368] uppercase tracking-wider mb-4 border-b border-[#E5E7EB] pb-2">AI / ML / Data</h4>
                        <div className="flex flex-wrap gap-2.5">
                        {['PyTorch', 'Transformers', 'LangGraph', 'PEFT / LoRA', 'LangChain', 'Pinecone', 'HuggingFace', 'Python'].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-[#111111] text-[#FAFAF8] rounded-xl text-sm font-mono shadow-md hover:bg-[#0F766E] hover:-translate-y-0.5 transition-all cursor-default">
                            {tech}
                            </span>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-mono text-[#5F6368] uppercase tracking-wider mb-4 border-b border-[#E5E7EB] pb-2">Engineering / DevOps</h4>
                        <div className="flex flex-wrap gap-2.5">
                        {['Golang', 'Docker', 'FastAPI', 'AWS', 'GCP', 'Git / CI-CD'].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-[#111111] text-[#FAFAF8] rounded-xl text-sm font-mono shadow-md hover:bg-[#0F766E] hover:-translate-y-0.5 transition-all cursor-default">
                            {tech}
                            </span>
                        ))}
                        </div>
                    </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- Section: Selected Work --- */}
        <section id="projects" className="py-24 md:py-32 scroll-mt-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-4xl md:text-5xl font-heading text-[#111111]">Selected Work</h2>
              <p className="text-[#5F6368] font-mono text-sm max-w-sm">
                Showcasing production-grade implementations and high-impact architectural designs.
              </p>
            </div>
          </Reveal>
          
          <div className="flex flex-col gap-8">
            {projects.map((proj, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                {/* Bold, Dark, Highly Contrasty Project Card */}
                <div className="group relative bg-[#111111] rounded-[2rem] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-transparent hover:shadow-[#0F766E]/20 border border-[#5F6368]/30 hover:border-[#0F766E]/50">
                  
                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0F766E] rounded-full filter blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Icon Area */}
                  <div className="flex-shrink-0 p-6 bg-[#FAFAF8]/10 rounded-2xl border border-[#FAFAF8]/5 group-hover:scale-105 group-hover:bg-[#0F766E]/20 transition-all duration-500 z-10">
                    {proj.icon}
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-grow z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl md:text-3xl font-heading text-[#FAFAF8]">{proj.title}</h3>
                    </div>
                    <p className="text-[#E5E7EB] font-light leading-relaxed mb-8 max-w-2xl text-lg">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-[#FAFAF8] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Link */}
                  <a href={proj.link} aria-label={`View ${proj.title}`} className="mt-4 md:mt-0 md:ml-auto p-4 bg-[#FAFAF8] text-[#111111] rounded-full hover:bg-[#0F766E] hover:text-[#FAFAF8] transition-colors z-10 flex-shrink-0">
                    <ArrowUpRight size={24} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- Section: The Journey (Exp, Edu, Cert, Extra Curricular) --- */}
        <div id="journey" className="scroll-mt-12">
          
          {/* Sub-Section: Experience */}
          <section className="py-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                {/* Resized Icon to match font size approx */}
                <Milestone className="w-10 h-10 text-[#0F766E]" />
                <h2 className="text-4xl md:text-5xl font-heading text-[#111111]">Experience</h2>
              </div>
            </Reveal>
            
            <div className="max-w-4xl border-l-2 border-[#0F766E]/30 ml-4 md:ml-5 space-y-16 pb-4">
              {experience.map((exp, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="relative pl-10 md:pl-16">
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#FAFAF8] border-[4px] border-[#0F766E] shadow-md"></span>
          
                    {/* Role Name On Top */}
                    <h3 className="text-2xl font-semibold tracking-tight text-[#111111] mb-1.5">
                      {exp.role}
                    </h3>
          
                  {/* Company Name and Period Side-by-Side (Big Tech Standard) */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
                    <span className="text-[#0F766E] font-heading italic text-xl font-medium">
                      {exp.company}
                    </span>
                    <span className="text-[#5F6368] font-light">•</span>
                    <span className="inline-block px-3 py-1 bg-[#F3F2EE]/60 border border-[#E5E7EB] rounded text-sm font-mono text-[#5F6368] shadow-sm">
                      {exp.date}
                    </span>
              </div>
          
          <p className="text-[#5F6368] leading-relaxed font-light text-lg">
            {exp.description}
          </p>
        </div>
      </Reveal>
    ))}
  </div>
          </section>

          {/* Sub-Section: Education */}
          <section className="py-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                 {/* Resized Icon */}
                <GraduationCap className="w-10 h-10 text-[#0F766E]" />
                <h2 className="text-4xl md:text-5xl font-heading text-[#111111]">Education</h2>
              </div>
            </Reveal>
            
            <div className="max-w-4xl border-l-2 border-[#0F766E]/30 ml-4 md:ml-5 space-y-16 pb-4">
              {education.map((edu, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="relative pl-10 md:pl-16">
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#FAFAF8] border-[4px] border-[#0F766E] shadow-md"></span>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                      <h3 className="text-2xl font-medium text-[#111111]">{edu.degree}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                      <span className="text-xl text-[#0F766E] font-heading italic font-medium">
                        {edu.institution}
                      </span>
                      <span className="text-[#5F6368] font-light">•</span>
                      <span className="inline-block px-3 py-1 bg-[#F3F2EE]/60 border border-[#E5E7EB] rounded text-sm font-mono text-[#5F6368] shadow-sm">
                        {edu.date}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-5 items-center">
                      {/* Highlighted Result Badge */}
                      <span className="inline-block px-3 py-1 bg-[#D6EDE8] text-[#0F766E] border border-[#0F766E]/20 rounded font-mono text-sm font-bold shadow-sm">
                        {edu.result}
                      </span>
                    </div>
                    
                    <p className="text-[#5F6368] leading-relaxed font-light text-lg mb-4">{edu.description}</p>
                    <div className="mb-6 bg-[#F3F2EE]/30 border border-[#E5E7EB]/60 rounded-2xl p-5 backdrop-blur-sm">
  <p className="text-[#5F6368] font-light leading-relaxed text-lg">
    <strong className="font-medium text-[#0F766E]">Thesis: </strong>Developed an audio source separation model utilizing a hybrid Vision Transformer (ViTs) and U-Net architecture from mixed audio input.
  </p>
</div>
                    {/* Added Achievements Bullet Points */}
                    {edu.achievements && edu.achievements.length > 0 && (
                        <ul className="space-y-2 mt-4">
                            {edu.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <CheckCircle2 size={18} className="text-[#0F766E] mt-1 flex-shrink-0" />
                                    <span className="text-[#5F6368] font-light text-lg">{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Sub-Section: Certifications */}
          <section className="py-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                {/* Resized Icon */}
                <Award className="w-10 h-10 text-[#0F766E]" />
                <h2 className="text-4xl md:text-5xl font-heading text-[#111111]">Certifications</h2>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="group relative p-6 md:p-8 rounded-[1.5rem] bg-[#F3F2EE]/40 border border-[#E5E7EB] hover:border-[#0F766E]/50 transition-colors duration-300 overflow-hidden shadow-sm hover:shadow-md h-full flex flex-col">
                    {/* Left Accent Line on Hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0F766E] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-medium text-[#111111] pr-4">{cert.title}</h3>
                      <Award size={24} className="text-[#E5E7EB] group-hover:text-[#0F766E] transition-colors flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E5E7EB]/50">
                      <span className="text-[#5F6368] font-heading italic text-lg">{cert.issuer}</span>
                      <span className="text-xs font-mono bg-[#F3F2EE]/50 px-2.5 py-1 rounded text-[#5F6368]">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Sub-Section: Extracurricular Activities */}
          <section className="py-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                 {/* Resized Icon */}
                <Trophy className="w-10 h-10 text-[#0F766E]" />
                <h2 className="text-4xl md:text-5xl font-heading text-[#111111]">Competitive Programming</h2>
              </div>
            </Reveal>
            
            <div className="max-w-4xl border-l-2 border-[#0F766E]/30 ml-4 md:ml-5 space-y-16 pb-4">
              {extracurriculars.map((extra, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="relative pl-10 md:pl-16">
                    {/* High Contrast Timeline Dot */}
                    <span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#FAFAF8] border-[4px] border-[#0F766E] shadow-md"></span>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        {extra.icon}
                        <h3 className="text-2xl font-medium text-[#111111]">{extra.platform}</h3>
                      </div>
                    </div>
                    <div className="text-xl text-[#0F766E] font-heading italic mb-4">{extra.role}</div>
                    
                    <div className="flex flex-wrap gap-4 mb-5 items-center">
                      <span className="inline-block px-3 py-1 bg-[#111111] text-[#FAFAF8] border border-[#5F6368] rounded font-mono text-sm shadow-sm">
                        {extra.rating}
                      </span>
                    </div>
                    
                    <p className="text-[#5F6368] leading-relaxed font-light text-lg">{extra.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        {/* --- Section: Contact (European Standard format) --- */}
        <section id="contact" className="py-32 mb-20 flex flex-col scroll-mt-12">
          <Reveal>
            <div className="glass-panel p-10 md:p-16 rounded-[2.5rem] bg-[#F3F2EE]/70 shadow-lg border border-[#E5E7EB]/80 relative overflow-hidden">
                {/* Decorative background element inside contact card */}
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#0F766E]/10 rounded-full blur-[80px]"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
                    
                    {/* Left Column: Heading and Text */}
                    <div>
                        <h2 className="text-5xl md:text-6xl font-heading mb-6 text-[#111111] tracking-tight">Let's build<br/>together.</h2>
                        <p className="text-lg md:text-xl text-[#5F6368] font-light leading-relaxed mb-8 max-w-md">
                        Currently open for new opportunities. Whether you have a challenging AI problem, a collaboration idea, or just want to connect.
                        </p>
                    </div>

                    {/* Right Column: CTA Button & Abstract visual */}
                    <div className="flex flex-col items-start lg:items-end justify-center h-full gap-4">
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-[#5F6368] group">
                                <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#0F766E] transition-colors">
                                    <Mail size={18} className="text-[#5F6368] group-hover:text-[#0F766E]" />
                                </div>
                                <a href="mailto:ahmmedfaysal106@gmail.com" className="font-mono text-[15px] hover:text-[#0F766E] transition-colors">ahmmedfaysal106@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-4 text-[#5F6368] group">
                                <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#0F766E] transition-colors">
                                    <Phone size={18} className="text-[#5F6368] group-hover:text-[#0F766E]" />
                                </div>
                                <a href="tel:+8801813113512" className="font-mono text-[15px] hover:text-[#0F766E] transition-colors">+880 1813-113512</a>
                            </div>
                            <div className="flex items-center gap-4 text-[#5F6368] group">
                                <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#0F766E] transition-colors">
                                    <MapPin size={18} className="text-[#5F6368] group-hover:text-[#0F766E]" />
                                </div>
                                <span className="font-mono text-[15px] text-[#5F6368]">Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
          </Reveal>
        </section>
        
        {/* Footer */}
        <footer className="text-center pb-24 text-sm font-mono text-[#5F6368]">
          <p>© {new Date().getFullYear()} Faysal Ahmmed. Designed for impact.</p>
        </footer>

      </main>

      {/* --- Apple Glass Navigation Dock --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-dock px-3 py-2.5 rounded-full flex items-center justify-center gap-2 sm:gap-3 mx-auto w-fit">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'about', icon: User, label: 'About' },
            { id: 'projects', icon: Code, label: 'Work' },
            { id: 'journey', icon: Layers, label: 'Journey' }, 
            { id: 'contact', icon: Mail, label: 'Contact' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={item.label}
                className={`relative group flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none ${
                  isActive 
                    ? 'bg-[#FAFAF8]/60 shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-110' // Smooth active state
                    : 'bg-transparent hover:bg-white/40 hover:scale-105'
                }`}
              >
                <div className="relative flex items-center justify-center w-full h-full">
                    <Icon 
                    size={isActive ? 24 : 22} 
                    className={`transition-colors duration-400 ${isActive ? 'text-[#0F766E]' : 'text-[#5F6368] group-hover:text-[#111111]'}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                    />
                    
                    {/* Active Indicator Dot (Apple Style) */}
                    {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0F766E]"></span>
                    )}
                </div>

                {/* Minimalist Tooltip matching Apple styling */}
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111111]/90 backdrop-blur-md text-[#FAFAF8] text-[12px] font-medium tracking-wide px-3.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl">
                  {item.label}
                  {/* Tooltip little triangle pointer */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111]/90 rotate-45"></div>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}