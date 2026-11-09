import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, X, ArrowUpRight, Code, Layers, Camera, MessageSquare, CloudRain, CheckCircle, Send } from 'lucide-react';
import { Github } from './Icons';
import { personalData } from '../data';
import { Starburst } from './Decorations';

/**
 * Interactive Live Simulator for each Project
 */
const ProjectSimulator = ({ projectId }) => {
  // Simulator states
  const [scanState, setScanState] = useState('idle'); // idle, scanning, verified
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Namaskaram! I'm CampusBuddy AI for Thejus College. Ask me about exams, bus timings, or KTU rules!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Thrissur');

  // AttendAI Face Scan Simulation
  const handleTriggerScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('verified');
      setTimeout(() => setScanState('idle'), 4000);
    }, 1800);
  };

  // CampusBuddy Chatbot Simulation
  const predefinedAnswers = {
    "bus": "Route #4 leaves Thrissur Swaraj Round at 7:45 AM, passing Poonkunnam (7:55 AM) & Wadakkanchery (8:15 AM) to reach Thejus campus at 8:40 AM.",
    "ktu": "KTU requires at least 75% attendance in each registered subject to be eligible for university end-semester examinations.",
    "internals": "First internal assessments for B.Tech Semester 2 are scheduled tentatively across 50 marks per theory course.",
    "iedc": "Thejus IEDC (Innovation and Entrepreneurship Development Centre) conducts regular ideathons, startup mentoring, and hackathons."
  };

  const handleSendChat = (text) => {
    const q = text || chatInput;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const lower = q.toLowerCase();
      let reply = "I'm checking the Thejus CSE (AI) repository... Feel free to check with your faculty advisor or college office for specific circulars!";
      if (lower.includes('bus') || lower.includes('route') || lower.includes('timing')) reply = predefinedAnswers.bus;
      else if (lower.includes('ktu') || lower.includes('attendance') || lower.includes('percent')) reply = predefinedAnswers.ktu;
      else if (lower.includes('internal') || lower.includes('exam')) reply = predefinedAnswers.internals;
      else if (lower.includes('iedc') || lower.includes('club') || lower.includes('hackathon')) reply = predefinedAnswers.iedc;

      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 500);
  };

  // AuraCast Kerala Weather Data
  const districtWeather = {
    "Thrissur": { temp: "30°C", condition: "Warm & Tropical Breeze", humidity: "76%", rain: "15%", alert: "Normal" },
    "Kochi": { temp: "31°C", condition: "Coastal Humidity", humidity: "82%", rain: "25%", alert: "Normal" },
    "Kozhikode": { temp: "29°C", condition: "Scattered Clouds", humidity: "78%", rain: "20%", alert: "Normal" },
    "Wayanad": { temp: "22°C", condition: "Misty Mountain Showers", humidity: "88%", rain: "65%", alert: "Yellow Alert" }
  };

  if (projectId === 'attend-ai') {
    return (
      <div className="p-4 rounded-2xl bg-plum/5 dark:bg-black/40 border border-plum/10 dark:border-cream-100/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-accent flex items-center gap-1.5">
            <Camera className="w-4 h-4" />
            <span>Interactive Simulator: Vision Check-in</span>
          </span>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">OpenCV Pipeline Ready</span>
        </div>

        {/* Viewfinder display */}
        <div className="relative aspect-video w-full rounded-xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
          {scanState === 'scanning' && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-pink-accent shadow-[0_0_15px_#FF4F9A] z-10"
            />
          )}

          {scanState === 'verified' ? (
            <div className="text-center space-y-1.5">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
              <div className="text-emerald-300 font-bold text-sm">Face Verified: Liya Py (Roll #42)</div>
              <div className="text-white/60 text-xs">KTU ID: THE24CS042 • Attendance Logged at 09:05 AM</div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-24 h-28 border-2 border-dashed border-pink-accent/60 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-xs text-white/70">
                {scanState === 'scanning' ? "Detecting facial landmarks & embeddings..." : "Position student face within frame"}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleTriggerScan}
          disabled={scanState === 'scanning'}
          className="mt-3 w-full py-2.5 rounded-xl bg-pink-accent hover:bg-pink-hover text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
        >
          {scanState === 'scanning' ? "Scanning Frames..." : "Simulate Classroom Verification"}
        </button>
      </div>
    );
  }

  if (projectId === 'thejus-campus-ai') {
    return (
      <div className="p-4 rounded-2xl bg-plum/5 dark:bg-black/40 border border-plum/10 dark:border-cream-100/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-accent flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span>Interactive Chatbot Simulator</span>
          </span>
          <span className="text-[11px] font-semibold text-pink-accent">Thejus AI Assistant</span>
        </div>

        {/* Chat History Box */}
        <div className="h-44 overflow-y-auto space-y-2 p-3 bg-white dark:bg-plum-dark/80 rounded-xl border border-plum/10 dark:border-cream-100/10 text-xs">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                msg.sender === 'bot'
                  ? 'bg-cream-100 dark:bg-plum/90 text-plum dark:text-cream-100 self-start'
                  : 'bg-pink-accent text-white ml-auto text-right'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Prompt suggestions */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["Bus timings", "KTU attendance", "Internals"].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendChat(prompt)}
              className="px-2.5 py-1 rounded-full bg-cream-200 dark:bg-plum text-plum dark:text-cream-100 text-[10px] font-bold hover:bg-pink-accent hover:text-white transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat input */}
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Ask anything about college..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-plum-dark text-xs border border-plum/10 dark:border-cream-100/10 focus:outline-none focus:ring-1 focus:ring-pink-accent"
          />
          <button
            onClick={() => handleSendChat()}
            className="p-2 rounded-xl bg-pink-accent text-white cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  if (projectId === 'auracast-kerala') {
    const data = districtWeather[selectedDistrict];
    return (
      <div className="p-4 rounded-2xl bg-plum/5 dark:bg-black/40 border border-plum/10 dark:border-cream-100/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-accent flex items-center gap-1.5">
            <CloudRain className="w-4 h-4" />
            <span>Interactive Weather Dashboard</span>
          </span>
          <span className="text-[11px] font-semibold text-plum/60 dark:text-cream-100/60">Live Kerala Sensor Grid</span>
        </div>

        {/* District selection pills */}
        <div className="flex gap-1.5 mb-3">
          {Object.keys(districtWeather).map((dist) => (
            <button
              key={dist}
              onClick={() => setSelectedDistrict(dist)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedDistrict === dist
                  ? 'bg-orange-accent text-white'
                  : 'bg-white dark:bg-plum text-plum dark:text-cream-100'
              }`}
            >
              {dist}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-plum-dark border border-plum/10 dark:border-cream-100/10 flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-plum dark:text-cream-100 font-headline">
              {data.temp}
            </div>
            <div className="text-xs font-medium text-plum/70 dark:text-cream-100/70">{data.condition}</div>
          </div>
          <div className="text-right text-xs space-y-1">
            <div>Humidity: <span className="font-bold">{data.humidity}</span></div>
            <div>Rain Index: <span className="font-bold">{data.rain}</span></div>
            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              data.alert === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
            }`}>
              {data.alert}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

/**
 * 3D Interactive Tilt Card Component
 */
const ProjectCard = ({ project, onSelect }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles (subtle & premium)
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;
    
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className="group relative bg-white dark:bg-plum/70 rounded-[28px] border border-plum/10 dark:border-cream-100/10 shadow-sticker hover:shadow-sticker-hover p-4 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div>
        {/* Project Image Container */}
        <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-plum/5 dark:bg-cream-100/5 mb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badge */}
          <div className="absolute top-3 left-3 bg-plum/90 dark:bg-cream-100/90 text-cream-100 dark:text-plum text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
            {project.badge}
          </div>

          {/* Category Tag */}
          <div className="absolute top-3 right-3 bg-orange-accent text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
            {project.category}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight group-hover:text-pink-accent dark:group-hover:text-pink-accent transition-colors leading-none mb-2">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-plum/75 dark:text-cream-100/75 leading-relaxed line-clamp-2 mb-4">
          {project.shortDescription}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-cream-100 dark:bg-plum-dark text-plum/80 dark:text-cream-100/80 text-[11px] font-semibold border border-plum/5 dark:border-cream-100/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-plum/10 dark:border-cream-100/10 flex items-center justify-between">
        <span className="text-xs font-bold text-pink-accent group-hover:underline flex items-center gap-1">
          <span>Read case study & test demo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="p-2 rounded-full text-plum dark:text-cream-100 hover:bg-plum/10 dark:hover:bg-cream-100/10 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="p-2 rounded-full text-plum dark:text-cream-100 hover:bg-plum/10 dark:hover:bg-cream-100/10 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { projects } = personalData;
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'AI & Computer Vision', 'NLP & Web', 'Web Application', 'Frontend & Animation'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-cream-50 dark:bg-plum/40 transition-colors duration-300">
      
      {/* Background Starburst */}
      <div className="absolute top-10 right-8 opacity-25 dark:opacity-10 pointer-events-none">
        <Starburst className="w-20 h-20 text-pink-accent" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-pink-accent"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-pink-accent">
                Portfolio Showcase
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-headline text-4xl sm:text-6xl md:text-7xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight leading-[0.95]"
            >
              SELECTED <span className="text-pink-accent">PROJECTS</span>
            </motion.h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-plum/70 dark:text-cream-100/70 font-medium">
            Handcrafted with Python, Computer Vision, and modern web frameworks. Click any card to explore architecture, algorithms, and interactive simulators.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum shadow-sm'
                  : 'bg-white dark:bg-plum/60 text-plum/70 dark:text-cream-100/70 hover:bg-plum/10 dark:hover:bg-cream-100/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* Case Study Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-plum/70 dark:bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-plum-dark rounded-[32px] p-6 sm:p-8 border border-plum/10 dark:border-cream-100/15 shadow-2xl text-plum dark:text-cream-100"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-cream-100 dark:bg-plum text-plum dark:text-cream-100 hover:bg-pink-accent hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Content */}
                <div className="mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-pink-accent">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-headline text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-plum/5">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Interactive Simulator Section */}
                <div className="mb-6">
                  <ProjectSimulator projectId={selectedProject.id} />
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-plum/85 dark:text-cream-100/85">
                  <h4 className="font-bold text-base text-plum dark:text-cream-100 uppercase tracking-wider">
                    Project Overview
                  </h4>
                  <p>{selectedProject.fullDescription}</p>

                  {selectedProject.metrics && (
                    <div className="p-3.5 rounded-2xl bg-orange-accent/15 border border-orange-accent/20 text-plum dark:text-cream-100 font-semibold text-xs sm:text-sm">
                      ⚡ Key Metric: {selectedProject.metrics}
                    </div>
                  )}

                  <h4 className="font-bold text-base text-plum dark:text-cream-100 uppercase tracking-wider pt-2">
                    Technologies & Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-cream-100 dark:bg-plum text-plum dark:text-cream-100 text-xs font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-plum/10 dark:border-cream-100/10 flex flex-wrap gap-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum font-bold text-xs flex items-center gap-2 hover:bg-pink-accent dark:hover:bg-pink-accent dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code on GitHub</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-pink-accent text-white font-bold text-xs flex items-center gap-2 hover:bg-pink-hover transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
