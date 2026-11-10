/**
 * ===================================================================
 *  PORTFOLIO DATA CONFIGURATION — LIYA PY
 * ===================================================================
 *  Edit this single file to update your personal details, college info,
 *  bio, photos, projects, skills, timeline, achievements, and social links.
 * 
 *  HOW TO REPLACE IMAGES:
 *  1. Put your image files in the `public/images/` folder (e.g. `public/images/liya.jpg`).
 *  2. Update the corresponding `photo` or `image` paths below to `/images/your-file.jpg`.
 *  
 *  HOW TO REPLACE RESUME:
 *  1. Put your resume PDF in the `public/` folder (e.g. `public/Liya_Py_Resume.pdf`).
 *  2. Update `resumeUrl: '/Liya_Py_Resume.pdf'` below.
 * ===================================================================
 */

export const personalData = {
  name: "Liya Py",
  nickname: "Liya",
  tagline: "First-Year B.Tech CSE (Artificial Intelligence) Student",
  college: "Thejus Engineering College",
  location: "Thrissur, Kerala, India",
  email: "liya.py.cse@gmail.com",
  phone: "+91 98765 43210", // replace with your phone if needed
  resumeUrl: "/resume.html", // Styled printable resume (or change to your PDF)
  availableForWork: true,
  statusText: "Open for mini-projects, hackathons & student internships",
  
  // Hero section headlines
  hero: {
    badge: "B.Tech CSE (AI) • Class of 2028",
    headlinePart1: "AI curious.",
    headlineAccent: "Always building.", // Highlighted in hot pink!
    subtext: "I'm Liya, a first-year Computer Science Engineering (AI) student at Thejus Engineering College, Thrissur. Turning curious ideas into smart, beautiful, and purposeful projects.",
    primaryCta: "Let's connect",
    secondaryCta: "See my work",
    rotatedText: "CURIOUS MINDS BUILD COOL THINGS",
    handwrittenNote: "Hey, I'm Liya!",
    
    // The 4 tilted polaroid / hero cards (center card is Liya's photo)
    cards: [
      {
        id: 1,
        title: "Cozy Coding Setup",
        caption: "Chai, code & daylight ☕",
        rotation: -4,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
        alt: "Aesthetic daylight desk setup with laptop and coffee"
      },
      {
        id: 2,
        isProfile: true, // Liya's main photo card
        title: "Liya Py",
        caption: "B.Tech CSE (AI) @ Thejus ✨",
        rotation: 2.5,
        image: "/images/liya.jpg", // Liya's uploaded portrait
        alt: "Liya Py - 1st Year B.Tech CSE (AI) Student"
      },
      {
        id: 3,
        title: "3D Robots & AI",
        caption: "Future is here 🤖✨",
        rotation: -2,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=80",
        alt: "Futuristic humanoid robot sitting and reading"
      },
      {
        id: 4,
        title: "Kerala Campus Vibe",
        caption: "Vellarakkad, Thrissur 🌴",
        rotation: 4,
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=700&q=80",
        alt: "Lush green college campus pathway surrounded by tropical trees"
      }
    ]
  },

  // About Section
  about: {
    title: "ABOUT ME",
    headline: "Engineering intelligence, powered by rhythm & curiosity.",
    bio1: "Hello! My name is Liya Py. I am a first-year B.Tech student in Computer Science and Engineering with a specialization in Artificial Intelligence at Thejus Engineering College, Thrissur.",
    bio2: "I completed my Plus One (+1) and Plus Two (+2) at NSS HSS Mullurkara with distinction in the Computer Science stream. My journey into tech began with curiosity about how computers can learn, adapt, and solve everyday problems.",
    bio3: "Beyond code, equations, and logic, one of my greatest creative skills is Dance! I am thrilled to have secured 1st Prize in Oppana (ഒപ്പന) with our team at youth cultural festivals. Performing Oppana taught me synchronization, discipline, and artistic expression — the exact same rhythm and harmony I strive to bring into every software and AI project I create.",
    
    // School & College details
    school: "NSS HSS Mullurkara",
    schoolCourse: "Plus One & Plus Two (Computer Science)",
    danceAchievement: "1st Prize Winner in Oppana (Traditional Malabar Dance Form)",
    
    // Fun facts rendered as interactive sticker cards
    stickers: [
      { icon: "💃", label: "Dance & Passion", value: "1st Prize in Oppana (ഒപ്പന) 🏆" },
      { icon: "🏫", label: "Schooling", value: "NSS HSS Mullurkara (+1 & +2)" },
      { icon: "🎓", label: "B.Tech College", value: "Thejus Engineering College, Thrissur" },
      { icon: "🤖", label: "Degree Focus", value: "CSE (Artificial Intelligence)" },
      { icon: "✨", label: "Philosophy", value: "Rhythm in dance, logic in code" },
      { icon: "☕", label: "Energy", value: "Chai-powered Kerala builder" }
    ],

    // Stats counter
    stats: [
      { label: "Projects Completed", value: 6, suffix: "+" },
      { label: "Core Technologies", value: 10, suffix: "+" },
      { label: "Code Commits", value: 180, suffix: "+" },
      { label: "Current Semester", value: 2, suffix: "nd" }
    ]
  },

  // Skills Section
  skills: {
    title: "MY TOOLKIT",
    subtitle: "Technologies, tools, and paradigms I tinker with every day.",
    
    // Infinite marquee strip items
    marquee: [
      "Python 🐍",
      "Artificial Intelligence 🤖",
      "Machine Learning 📊",
      "React.js ⚛️",
      "Tailwind CSS 🎨",
      "JavaScript (ES6+) ⚡",
      "C Programming 💻",
      "Java Basics ☕",
      "Git & GitHub 🐙",
      "HTML5 & CSS3 🌐",
      "NumPy & Pandas 📈",
      "OpenCV Basics 👁️",
      "Figma 📐",
      "Prompt Engineering 💬"
    ],

    // Categorized skills with proficiency details
    categories: [
      {
        name: "Languages",
        items: [
          { name: "Python", level: "Proficient", icon: "Code2", desc: "Data structures, scripting, OOP, AI libraries" },
          { name: "C Language", level: "Academic Core", icon: "Binary", desc: "Pointers, memory layout, system fundamentals" },
          { name: "JavaScript", level: "Intermediate", icon: "FileCode", desc: "Modern ES6+, DOM manipulation, Async/Await" },
          { name: "Java", level: "Foundational", icon: "Coffee", desc: "Core OOP concepts, classes, basic algorithms" }
        ]
      },
      {
        name: "AI & Data Science",
        items: [
          { name: "Machine Learning Basics", level: "Active Learning", icon: "Cpu", desc: "Regression, classification, scikit-learn models" },
          { name: "NumPy & Pandas", level: "Intermediate", icon: "Table2", desc: "Data wrangling, matrix manipulation, statistics" },
          { name: "OpenCV (Computer Vision)", level: "Familiar", icon: "Eye", desc: "Image filtering, contour detection, webcam feeds" },
          { name: "Gemini / OpenAI APIs", level: "Intermediate", icon: "Sparkles", desc: "Prompt design, embeddings, LLM agent integration" }
        ]
      },
      {
        name: "Web & Design",
        items: [
          { name: "React.js", level: "Intermediate", icon: "Layers", desc: "Hooks, state management, reusable components" },
          { name: "Tailwind CSS", level: "Proficient", icon: "Palette", desc: "Responsive layouts, utility-first UI, micro-animations" },
          { name: "HTML5 & CSS3", level: "Proficient", icon: "Globe", desc: "Semantic markup, Flexbox, CSS Grid, accessibility" },
          { name: "Figma UI/UX", level: "Familiar", icon: "PenTool", desc: "Wireframing, typography scales, design prototypes" }
        ]
      },
      {
        name: "Tools & Workflow",
        items: [
          { name: "Git & GitHub", level: "Proficient", icon: "GitBranch", desc: "Version control, branching, PRs, collaborative repos" },
          { name: "VS Code", level: "Daily Driver", icon: "Terminal", desc: "Extensions, integrated debugging, live server" },
          { name: "Linux / Bash Basics", level: "Familiar", icon: "TerminalSquare", desc: "Command line navigation, scripting, package tools" },
          { name: "Vite", level: "Intermediate", icon: "Zap", desc: "Lightning fast frontend bundler & dev workflow" }
        ]
      }
    ],

    // "Currently Learning" spotlight card
    currentlyLearning: {
      headline: "Currently Diving Deep Into:",
      topics: [
        { title: "Deep Learning & Neural Networks", desc: "Understanding backpropagation and multi-layer perceptrons with PyTorch." },
        { title: "Full-Stack AI Integrations", desc: "Connecting modern React frontends to Python FastAPI/Flask backends." },
        { title: "Competitive Programming in C/Python", desc: "Sharpening algorithmic thinking for tech hackathons and contests." }
      ]
    }
  },

  // Projects Section
  projects: [
    {
      id: "attend-ai",
      title: "AttendAI — Smart Classroom Attendance",
      category: "AI & Computer Vision",
      badge: "Featured AI Project",
      shortDescription: "An automated student attendance system using face recognition and QR verification to eliminate proxy attendance in college lecture halls.",
      fullDescription: "Built specifically to solve manual roll-call inefficiencies in college classrooms. Features a computer vision pipeline that recognizes registered students in real-time webcam frames, records timestamps into a database, and generates weekly percentage attendance reports with automated warning triggers for students below 75%.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "OpenCV", "Face Recognition", "Tkinter / React", "SQLite"],
      githubUrl: "https://github.com/liyapy/attend-ai",
      liveUrl: "#",
      featured: true,
      metrics: "96% face detection accuracy under normal classroom lighting"
    },
    {
      id: "thejus-campus-ai",
      title: "CampusBuddy AI — Thejus Student Assistant",
      category: "NLP & Web",
      badge: "Campus Favorite",
      shortDescription: "An AI-powered conversational chatbot trained on campus FAQs, KTU syllabus rules, department details, and college bus routes.",
      fullDescription: "A conversational assistant designed for first-year freshers at Thejus Engineering College. It answers questions about internal exams, KTU credit requirements, bus timings from Thrissur town, and club activities using intelligent prompt engineering and a friendly conversational tone.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Gemini API", "Tailwind CSS", "Node.js", "KTU Syllabus"],
      githubUrl: "https://github.com/liyapy/campusbuddy-thejus",
      liveUrl: "#",
      featured: true,
      metrics: "Instant answer response in <1.2 seconds"
    },
    {
      id: "auracast-kerala",
      title: "AuraCast — Kerala District Weather & Alerts",
      category: "Web Application",
      badge: "API Project",
      shortDescription: "Clean, responsive weather dashboard with live Kerala monsoon precipitation tracking and district weather warnings.",
      fullDescription: "A customized weather web application tailored for Kerala's 14 districts. Features live temperature, humidity, monsoon precipitation index, animated sky conditions, and emergency weather alert warnings using OpenWeatherMap API and browser geolocation.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "OpenWeather API", "Tailwind CSS", "Framer Motion", "Vite"],
      githubUrl: "https://github.com/liyapy/auracast-kerala",
      liveUrl: "#",
      featured: false,
      metrics: "Live data across all 14 Kerala districts"
    },
    {
      id: "personal-portfolio-v1",
      title: "Liya's Editorial Portfolio (This Site)",
      category: "Frontend & Animation",
      badge: "Design & Interaction",
      shortDescription: "An expressive, editorial-inspired portfolio featuring warm cream aesthetic, smooth Lenis scrolling, and playful sticker interactions.",
      fullDescription: "Designed with a warm editorial vibe inspired by modern indie digital magazines. Packed with micro-interactions, smooth scrolling via Lenis, interactive 3D perspective cards, dynamic dark mode, and mobile-first responsiveness.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Vite", "Tailwind CSS", "GSAP", "Lenis", "Framer Motion"],
      githubUrl: "https://github.com/liyapy/liya-portfolio",
      liveUrl: "#",
      featured: false,
      metrics: "100/100 responsive UX & smooth 60fps animations"
    }
  ],

  // Journey / Timeline Section
  journey: [
    {
      period: "2022 – 2024",
      milestone: "Higher Secondary (+1 & +2) & Oppana 1st Prize",
      institution: "NSS HSS Mullurkara, Thrissur",
      description: "Completed Plus One and Plus Two with distinction in the Computer Science stream. Discovered my early love for coding and algorithms, while proudly leading our team to win 1st Prize in Oppana (ഒപ്പന) at the youth cultural festival.",
      tag: "School & Dance Champion"
    },
    {
      period: "Autumn 2024",
      milestone: "Joined B.Tech CSE (Artificial Intelligence)",
      institution: "Thejus Engineering College, Thrissur (KTU)",
      description: "Stepped onto campus in Vellarakkad, Thrissur. Enrolled in the specialized AI division under Computer Science, diving into foundational engineering mathematics, C programming, and algorithmic concepts.",
      tag: "College Journey Begins"
    },
    {
      period: "Late 2024 – Present",
      milestone: "First-Year Milestones & Community Building",
      institution: "Thejus IEDC, Coding Clubs & Self-Learning",
      description: "Participated in internal ideathons, completed foundational certifications in Python and Web development, and started building hands-on mini-projects like AttendAI and CampusBuddy.",
      tag: "Active Builder"
    },
    {
      period: "Future Goals (2025 & Beyond)",
      milestone: "Deeper Into Machine Learning & Hackathons",
      institution: "Future Vision",
      description: "Aiming to participate in state & national hackathons (Smart India Hackathon), publish student research in computer vision, and contribute to impactful open-source AI libraries.",
      tag: "What's Ahead"
    }
  ],

  // Achievements & Certifications (Horizontal scroll)
  achievements: [
    {
      id: 0,
      title: "1st Prize in Oppana (Youth Kalolsavam)",
      issuer: "Youth Cultural Festival • NSS HSS Mullurkara",
      date: "2023 – 2024",
      badge: "1st Prize Winner 🏆",
      description: "Secured First Place in the traditional Oppana dance competition, showcasing synchronized clapping rhythm, stage elegance, and celebratory Malabar choreography."
    },
    {
      id: 1,
      title: "Python for Data Science & AI",
      issuer: "Cognitive Class / Coursera",
      date: "2024",
      badge: "Certification",
      description: "Comprehensive coverage of Python syntax, NumPy array computations, Pandas dataframes, and foundational statistical libraries."
    },
    {
      id: 2,
      title: "IEDC College Ideathon Participant",
      issuer: "Thejus Engineering College IEDC Cell",
      date: "2024",
      badge: "Hackathon",
      description: "Pitched an AI-assisted crop disease identifier concept tailored for local Kerala agriculture during the campus ideation meet."
    },
    {
      id: 3,
      title: "Responsive Web Design Certification",
      issuer: "freeCodeCamp",
      date: "2024",
      badge: "Web Dev",
      description: "Mastered responsive layouts, modern CSS Grid/Flexbox architectures, and web accessibility standards."
    },
    {
      id: 4,
      title: "HackerRank Problem Solving (Python)",
      issuer: "HackerRank",
      date: "2024",
      badge: "Skill Badge",
      description: "Consistently practicing algorithms, string manipulation, data structures, and conditional logic."
    }
  ],

  // Social Links
  socials: [
    { name: "GitHub", url: "https://github.com/liyapy", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/liyapy", icon: "Linkedin" },
    { name: "Instagram", url: "https://instagram.com/liya.py_", icon: "Instagram" },
    { name: "Email", url: "mailto:liya.py.cse@gmail.com", icon: "Mail" }
  ]
};

