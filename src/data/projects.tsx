import {
  Home,
  MonitorPlay,
  Heart,
  Bot,
  Globe,
  Store,
} from "lucide-react";
import type { ProjectData } from "@/components/ProjectModal";

import imgPharoXon from "@/assets/Smart home app.png";
import imgStrova from "@/assets/Strova.png";
import imgTamanina from "@/assets/Tamanina.png";
import imgAI from "@/assets/AI personal assistant.png";
import imgCorbits from "@/assets/Corbits.png";
import imgNoqta from "@/assets/Noqta.png";

export type ProjectCategory = "All" | "Mobile Application" | "Corporate Website" | "Desktop Application";
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "All", "Mobile Application", "Corporate Website", "Desktop Application",
];

/* ─── Full project data ─── */
export const projects: ProjectData[] = [
  {
    title: "PharoXon",
    type: "Mobile Application",
    category: "Smart Home Platform",
    year: "2026",
    desc: "A smart home management platform that enables users to monitor and control connected devices, manage home automation, and access real-time environmental insights through an intuitive mobile experience.",
    longDesc:
      "PharoXon is a comprehensive smart home management platform designed for modern households. It empowers users to monitor and control their connected devices securely and effortlessly. By centralizing home automation, real-time environmental insights, and intelligent scheduling, PharoXon provides a unified and highly intuitive mobile experience.",
    keyFeatures: [
      "Real-time monitoring of connected IoT devices",
      "Customizable automation rules and scheduling",
      "Live environmental and climate insights",
      "Secure role-based user access controls"
    ],
    tech: ["Flutter", "Firebase", "REST APIs"],
    accentColor: "rgba(63,207,213,0.25)",
    accentColorSolid: "#3FCFD5",
    icon: Home,
    mockup: <img src={imgPharoXon} alt="PharoXon" className="w-full h-full object-cover" />,
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "Strova",
    type: "Mobile Application",
    category: "Media Streaming Platform",
    year: "2025",
    desc: "A modern streaming platform providing live TV channels, movies, and entertainment content with a responsive user experience and content discovery features.",
    longDesc:
      "Strova is a state-of-the-art media streaming ecosystem that delivers high-quality live TV, on-demand movies, and exclusive entertainment directly to mobile devices. It boasts a highly responsive interface with advanced content discovery, personalized recommendations, and smooth adaptive bitrate streaming.",
    keyFeatures: [
      "Adaptive bitrate live TV and VOD streaming",
      "Personalized content recommendation engine",
      "Advanced search and intuitive content discovery",
      "Cross-device progress syncing and watchlists"
    ],
    tech: ["Flutter", "Firebase", "Streaming APIs"],
    accentColor: "rgba(168,208,58,0.25)",
    accentColorSolid: "#A8D03A",
    icon: MonitorPlay,
    mockup: <img src={imgStrova} alt="Strova" className="w-full h-full object-cover" />,
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "Tamanina",
    type: "Mobile Application",
    category: "Islamic & Lifestyle Platform",
    year: "2025",
    desc: "A mobile platform designed to provide users with religious content, reminders, daily activities, and community-focused digital services through a clean and accessible interface.",
    longDesc:
      "Tamanina serves as a comprehensive lifestyle companion for Islamic daily practices. By offering curated religious content, accurate prayer reminders, and community-driven services within a distraction-free, accessible design, Tamanina seamlessly integrates digital convenience with spiritual fulfillment.",
    keyFeatures: [
      "Accurate prayer time calculations and notifications",
      "Curated library of spiritual content and daily activities",
      "Distraction-free, accessibility-first user interface",
      "Community engagement features and localized events"
    ],
    tech: ["Flutter", "Firebase", "API Integrations"],
    accentColor: "rgba(63,207,213,0.25)",
    accentColorSolid: "#3FCFD5",
    icon: Heart,
    mockup: <img src={imgTamanina} alt="Tamanina" className="w-full h-full object-cover" />,
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "AI Personal Assistant",
    type: "Mobile Application",
    category: "Productivity & AI",
    year: "2026",
    desc: "An AI-powered personal productivity assistant helping users manage tasks, schedules, reminders, and workflows through intelligent automation and conversational interactions.",
    longDesc:
      "This AI Personal Assistant transforms daily productivity by acting as an intelligent partner for managing tasks, dynamic schedules, and complex workflows. Through natural language interactions, users can automate routine reminders, delegate scheduling, and receive context-aware suggestions directly from their mobile device.",
    keyFeatures: [
      "Natural language processing for conversational commands",
      "Intelligent task categorization and priority sorting",
      "Automated schedule optimization and reminders",
      "Context-aware workflow suggestions"
    ],
    tech: ["Flutter", "AI APIs", "Firebase"],
    accentColor: "rgba(168,208,58,0.25)",
    accentColorSolid: "#A8D03A",
    icon: Bot,
    mockup: <img src={imgAI} alt="AI Personal Assistant" className="w-full h-full object-cover" />,
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "Corbits",
    type: "Corporate Website",
    category: "Software Solutions Company",
    year: "2026",
    desc: "A modern corporate website built for a software development company, showcasing services, projects, client engagement, and business capabilities through a premium digital experience.",
    longDesc:
      "The Corbits corporate website is designed to be a premium digital storefront for an elite software solutions provider. Leveraging a modern tech stack, the site offers blazingly fast performance while beautifully showcasing the company's service portfolio, case studies, and business capabilities through smooth animations and responsive layouts.",
    keyFeatures: [
      "High-performance static generation with Next.js",
      "Premium, fully responsive UI with smooth scroll animations",
      "Dynamic project portfolio and case study showcases",
      "Optimized client engagement and contact flows"
    ],
    tech: ["React", "Next.js", "Tailwind CSS"],
    accentColor: "rgba(63,207,213,0.25)",
    accentColorSolid: "#3FCFD5",
    icon: Globe,
    mockup: <img src={imgCorbits} alt="Corbits" className="w-full h-full object-cover" />,
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
  {
    title: "NOQTA",
    type: "Desktop Application",
    category: "POS & Business Management System",
    year: "2024",
    desc: "A complete point-of-sale and business management platform designed to streamline inventory, customers, sales operations, reporting, and day-to-day retail workflows.",
    longDesc:
      "NOQTA is an all-in-one desktop POS system tailored for retail environments. It integrates fast checkout processes with robust backend management, giving businesses granular control over their inventory, customer relationships, and daily sales operations. With extensive reporting features, NOQTA empowers owners to make data-driven decisions seamlessly.",
    keyFeatures: [
      "Rapid checkout and reliable offline-first sales processing",
      "Comprehensive multi-location inventory management",
      "Detailed financial reporting and analytics dashboards",
      "Integrated customer relationship and loyalty tracking"
    ],
    tech: ["Desktop Application", "Database Systems"],
    accentColor: "rgba(168,208,58,0.25)",
    accentColorSolid: "#A8D03A",
    icon: Store,
    mockup: <img src={imgNoqta} alt="NOQTA" className="w-full h-full object-cover" />,
    liveUrl: "https://viaara.tech",
    githubUrl: "https://github.com",
  },
];
