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
    tech: ["Python", "Django", "HTML", "CSS", "Bootstrap"],
    features: [
      "User authentication (login, register, logout)",
      "Profile management with image upload",
      "Create, edit, and delete blog posts",
      "Dynamic home page and post detail views",
      "Media file handling with Django settings"
    ],
    liveUrl: "#",
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
    tagline: "A clean, fast and intuitive way to stay organized.",
    description:
      "A backend-driven task management system built with Django. It provides secure task creation, editing, deletion and user authentication. Users can invite each other and work together on the boards they created. The API can be integrated with any frontend framework in the future.",
    image:
      taskmanagerImage,
    tech: ["Python", "Django", "SQLite", "REST Framework", "HTML", "CSS"],
    features: [
      "Full CRUD operations for tasks",
      "User registration & login system",
      "REST API endpoints for all actions",
      "Secure backend validation",
      "User invitations to collaborate on boards"
    ],
    liveUrl: "#",
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
    tagline: "High-end gaming gear store built with Django & React",
    description:
      "A full-stack e-commerce application featuring product search, filtering, sorting, cart system with live totals, dynamic product pages and a modern glass-UI design with Tailwind. Built with Django REST backend and React frontend. Site has products that I have interest on and thinking about purchasing in the future.",
    image:
      gearstoreImage,
    tech: ["React", "Tailwind", "Django REST Framework", "PostgreSQL"],
    features: [
      "Interactive product filters & sorting",
      "Cart system with live total calculations",
      "Dynamic product pages with images & descriptions",
      "Responsive UI with modern gradients and glass effects"
    ],
    liveUrl: "#",
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
    tech: ["React", "Django", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Interactive hero selection with 45 characters",
      "Real-time team composition analysis",
      "Synergy and counter detection",
      "User authentication and team saving",
      "Community voting and comments",
      "Web Socket integration for live updates"
    ],
    liveUrl: "https://rivalsteambuilder.blurryshady.me",
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