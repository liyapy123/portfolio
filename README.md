# 🌟 Liya Py — Personal Portfolio Website

A modern, editorial, responsive single-page portfolio designed for **Liya Py**, a first-year B.Tech Computer Science Engineering (Artificial Intelligence) student at **Thejus Engineering College, Thrissur, Kerala**.

Crafted to match the high-fashion editorial aesthetic of modern digital creative portfolios: warm cream tones, bold condensed typography, playful sticker accents, smooth inertial scrolling, 3D interactive card tilts, and custom micro-interactions.

---

## 🎨 Visual Identity & Design System

| Element | Specification | Value / Hex Code |
| :--- | :--- | :--- |
| **Primary Background** | Warm Cream | `#FFF6EC` / Dark Mode: `#150918` |
| **Primary Typography** | Deep Plum | `#3B1F3F` / Dark Mode: `#FFF6EC` |
| **Primary Accent** | Hot Pink | `#FF4F9A` (used for headline word highlights, badges & progress) |
| **Secondary Accent** | Vibrant Tangerine | `#FF8A3D` (used for starbursts, cards & stickers) |
| **Headline Font** | Barlow Condensed | `font-weight: 800`, Uppercase, tracking-tight |
| **Body Font** | Manrope / DM Sans | Clean, modern sans-serif |
| **Personal Script** | Caveat | Handwritten notes like *"Hey, I'm Liya!"* |
| **Corner Radius** | Rounded Pill & Cards | `24px` to `32px` |
| **Side Sticker** | Rotated Text | `CURIOUS MINDS BUILD COOL THINGS` |

---

## ⚡ Tech Stack & Architecture

- **React 18** with **Vite 6** for instant HMR and performance.
- **Tailwind CSS 3** with custom theme tokens, dark mode classes, and keyframe animations.
- **Lenis Smooth Scroll** for smooth inertial page scrolling.
- **GSAP ScrollTrigger** synchronized with Lenis ticker for scroll effects.
- **Framer Motion** for spring physics, staggered entrances, 3D card tilt, and timeline animations.
- **Canvas-Confetti** for celebratory particle burst when submitting the contact form.

---

## 📁 Project Structure

```text
├── .bin/
│   └── nodejs/            # Bundled Node.js 20 LTS runtime
├── dist/                  # Production-ready static build output
├── public/
│   ├── images/            # Custom personal photos & project assets
│   │   └── README.txt     # Instructions for image assets
│   └── Liya_Py_Resume.pdf # Place your resume PDF here
├── src/
│   ├── components/
│   │   ├── About.jsx          # Bio, College info, fun facts, animated counters
│   │   ├── Achievements.jsx   # Horizontal scroll cards for certs & ideathons
│   │   ├── Contact.jsx        # Headline, reactive form + confetti, copy email
│   │   ├── CustomCursor.jsx   # Small dot + trailing spring ring cursor
│   │   ├── Decorations.jsx    # Hand-drawn arrow, Starburst sticker, spinning badge
│   │   ├── Footer.jsx         # Minimal footer, live Kerala IST clock, back-to-top
│   │   ├── Hero.jsx           # Condensed headline, 4 tilted cards, CTA buttons
│   │   ├── Icons.jsx          # Pixel-perfect GitHub, LinkedIn, Instagram SVGs
│   │   ├── Journey.jsx        # Vertical timeline with scroll progress line
│   │   ├── Navbar.jsx         # Floating pill navbar, dark mode toggle, mobile menu
│   │   ├── Projects.jsx       # 3D interactive tilt project cards + modal drawer
│   │   ├── ScrollProgressBar.jsx # Top hot pink scroll progress bar
│   │   └── Skills.jsx         # Infinite marquee strip, category tabs, spotlight
│   ├── data.js                # SINGLE DATA SOURCE for all text, links & photos
│   ├── App.jsx                # Main application wrapper with Lenis & theme
│   ├── index.css              # Custom scrollbars, marquee animations, font setups
│   └── main.jsx               # React DOM root entry
├── index.html             # Google Fonts, OpenGraph SEO tags, SVG sticker favicon
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Color palettes, border radii, shadows & keyframes
├── vite.config.js         # Vite configuration
├── start.bat              # 1-click launcher for Windows
└── build.bat              # 1-click production builder
```

---

## 🚀 How to Run the Website

### Option 1: One-Click Quick Launch
Double-click `start.bat` in this folder. It will launch the development server and show:
```
Local: http://localhost:3000/
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: Command Line
Open terminal in `C:\Ai workshop` and run:
```powershell
$env:PATH = "C:\Ai workshop\.bin\nodejs;" + $env:PATH
npm run dev
```

---

## ✏️ How to Customize Your Information

Everything is centralized in **`src/data.js`**:

### 1. Replace Your Photo in the Hero Card
1. Drop your portrait photo into `public/images/liya.jpg`.
2. Open `src/data.js` and locate `hero.cards`.
3. In card `id: 2` (where `isProfile: true`), change:
   ```javascript
   image: "/images/liya.jpg"
   ```

### 2. Replace Your Resume
1. Put your PDF in `public/Liya_Py_Resume.pdf`.
2. Open `src/data.js` and update:
   ```javascript
   resumeUrl: "/Liya_Py_Resume.pdf"
   ```

### 3. Update Social Links & Contact Details
In `src/data.js`, modify:
```javascript
email: "liya.py.cse@gmail.com",
phone: "+91 98765 43210",
socials: [
  { name: "GitHub", url: "https://github.com/your-username", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/your-profile", icon: "Linkedin" },
  { name: "Instagram", url: "https://instagram.com/your-handle", icon: "Instagram" }
]
```

### 4. Edit or Add Projects
In `src/data.js`, the `projects` array contains your project titles, descriptions, metrics, tags, and links:
```javascript
{
  id: "attend-ai",
  title: "AttendAI — Smart Classroom Attendance",
  category: "AI & Computer Vision",
  badge: "Featured AI Project",
  shortDescription: "...",
  image: "...",
  tags: ["Python", "OpenCV", "Face Recognition", "React"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://..."
}
```

---

## 📦 How to Build for Production

Run:
```powershell
npm run build
```
The optimized HTML, CSS, and JS bundle will be generated in `dist/`, ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

