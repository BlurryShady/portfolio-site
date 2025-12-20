import rivalsImage from '../assets/projects/rivals-team-builder.png';
import blogImage from '../assets/projects/Blog.png';
import taskmanagerImage from '../assets/projects/Task-Manager.png';
import gearstoreImage from '../assets/projects/Gear-Store.png';

export const projects = [
  {
    id: 1,
    name: "Blog Project",
    slug: "blogproject",
    tagline: "A personal blog platform to share app ideas and development insights.",
    description:
      "A full-featured Django-based blog application designed to manage posts, user profiles and images. It includes authentication, CRUD operations and a clean responsive layout serving as a foundation for future app announcements and idea sharing. Focused on backend functionality with potential for frontend enhancements.",
    image:
      blogImage,
    tech: ["Python", "Django", "HTML", "CSS", "Cloudinary", "Brevo (Anymail)", "Render", "WhiteNoise"],
    features: [
      "Secure user authentication (register, login, logout, password reset via email)",
      "Profile management with avatar upload (stored on Cloudinary)",
      "Create, edit, and delete blog posts with categories and SEO-friendly URLs",
      "Responsive custom UI with light/dark “theme” toggle",
      "Email integration using Brevo + Anymail for password recovery",
      "Static files served via WhiteNoise and uptime monitored with UptimeRobot",
    ],
    liveUrl: "https://blog.blurryshady.dev",
    status: "live",
    position: { x: "left", y: "top" },
    theme: {
      primary: "#FF3366",
      secondary: "#00FFFF",
      style: "dual-tone",
      border: "rounded",
      glow: true
    }
  },
  {
    id: 2,
    name: "Task Manager",
    slug: "taskmanager",
    tagline: "A collaborative task manager with real-time boards, secure authentication and email verification.",
    description:
      "A production-ready task management system built with Django. It features secure authentication with email verification, collaborative workspaces, board-based task organization and a RESTful API designed for future frontend integrations. The application is deployed using modern DevOps practices, including environment-based configuration, background email delivery and uptime monitoring.",
    image:
      taskmanagerImage,
    tech: ["Python", "Django", "SQLite", "REST Framework", "HTML", "CSS", "Gunicorn", "Render", "Brevo (SMTP + API fallback)", "UptimeRobot",],
    features: [
      "Secure user authentication with email verification",
      "Workspace-based collaboration system",
      "Board & task management with full CRUD support",
      "Role-aware permissions and backend validation",
      "RESTful API architecture ready for frontend integration",
      "Production deployment with uptime monitoring and email delivery",
    ],
    liveUrl: "https://tasks.blurryshady.dev",
    status: "live",
    position: { x: "center", y: "top" },
    theme: {
      primary: "#2B2B2B",
      secondary: "#E8E6E3",
      style: "sharp",
      border: "angular",
      glow: false
    }
  },
  {
    id: 3,
    name: "Gear Store E-commerce",
    slug: "gearstore",
    tagline: "A personal full-stack e-commerce playground showcasing real-world Django & React integration.",
    description:
      "A full-stack e-commerce application featuring product browsing, filtering, sorting, dynamic product pages and a real-time cart system with live totals. Built with a Django REST backend and a React frontend. The project focuses on clean architecture, API-driven design and a modern glass-UI aesthetic using Tailwind CSS. This store represents a personal gear wishlist and serves as a hands-on playground for building and deploying production-style full-stack applications.",
    image:
      gearstoreImage,
    tech: ["React", "Tailwind", "Django REST Framework", "PostgreSQL", "Render", "Netlify"],
    features: [
      "Interactive product browsing with filtering & sorting",
      "Cart system with live total calculations",
      "Order creation flow connected to Django admin",
      "Responsive UI with modern gradients and glass effects",
      "REST API driven architecture",
      "Deployed full-stack setup (React frontend + Django API)",
    ],
    liveUrl: "https://store.blurryshady.dev",
    status: "live",
    position: { x: "right", y: "top" },
    theme: {
      primary: "#00FF88",
      secondary: "#FF00FF",
      style: "neon-pulse",
      border: "rounded",
      glow: true,
      animated: true
    }
  },
  {
    id: 4,
    name: "Marvel Rivals Team Builder",
    slug: "rivalsteambuilder",
    tagline: "Strategic team composition builder for Marvel Rivals",
    description:
      "Full-stack web application featuring hero selection, team analysis, synergy detection and community team sharing. Built with React frontend and Django REST backend. Has Web Socket integration for real-time updates.",
    image: rivalsImage,
    tech: ["React", "Django", "PostgreSQL", "Tailwind CSS", "Cloudinary", "Web Sockets", "Render", "Cloudflare Pages"],
    features: [
      "Interactive hero selection with full roster",
      "Real-time team composition analysis",
      "Synergy and counter detection",
      "User authentication and team saving",
      "Community voting and comments",
      "Web Socket integration for live updates",
      "RESTful API architecture",
      "Real-time updates via WebSockets",
      "Secure authentication and permissions",
    ],
    liveUrl: "https://rivals.blurryshady.dev",
    status: "live",
    position: { x: "left", y: "middle" },
    theme: {
      primary: "#D4AF37",
      secondary: "#C5A028",
      style: "gold-shimmer",
      border: "elegant",
      glow: true,
      shimmer: true
    }
  }
];