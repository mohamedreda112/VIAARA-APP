import yasserImg from "@/assets/Team/Yasser-ElFassi.jpeg";
import abdaulluhImg from "@/assets/Team/Abdaulluh-Essam.jpeg";
import ahmedImg from "@/assets/Team/Ahmed-Ali.jpeg";
import amrImg from "@/assets/Team/Amr-Hossam.jpeg";
import mohamedImg from "@/assets/Team/mohamed-reda.jpeg";
import abdelrahmanImg from "@/assets/Team/abdelrahman-tarek.jpeg";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  socials: { github: string; linkedin: string };
  glow: string;
  isFounder?: boolean;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Yasser ElFassi",
    role: "CEO & FOUNDER",
    bio: "Leading VIAARA's business strategy, partnership growth, and digital transformation initiatives across international markets.",
    // TODO: Replace with real profile links when available
    socials: { github: "javascript:void(0)", linkedin: "javascript:void(0)" },
    glow: "var(--cyan)",
    isFounder: true,
    image: yasserImg,
  },
  {
    name: "Abdaulluh Essam",
    role: "CTO & FOUNDER",
    bio: "Directing technology strategy, architecting high-performance systems, and establishing engineering standards for global products.",
    // TODO: Replace with real profile links when available
    socials: { github: "javascript:void(0)", linkedin: "javascript:void(0)" },
    glow: "var(--cyan)",
    isFounder: true,
    image: abdaulluhImg,
  },
  {
    name: "Ahmed Ali",
    role: "BACKEND ENGINEER",
    bio: "Designing scalable microservices, database schemas, and robust API endpoints for high-traffic enterprise backends.",
    // TODO: Replace with real profile links when available
    socials: { github: "javascript:void(0)", linkedin: "javascript:void(0)" },
    glow: "var(--cyan)",
    image: ahmedImg,
  },
  {
    name: "Amr Hossam",
    role: "MOBILE ENGINEER",
    bio: "Building responsive, offline-first mobile applications for iOS and Android using modern cross-platform frameworks.",
    // TODO: Replace with real profile links when available
    socials: { github: "javascript:void(0)", linkedin: "javascript:void(0)" },
    glow: "var(--lime)",
    image: amrImg,
  },
  {
    name: "Mohamed Reda",
    role: "FRONTEND DEVELOPER",
    bio: "Developing highly interactive, pixel-perfect user interfaces with optimized rendering and state management.",
    // TODO: Replace with real profile links when available
    socials: { github: "javascript:void(0)", linkedin: "javascript:void(0)" },
    glow: "var(--lime)",
    image: mohamedImg,
  },
  {
    name: "Abdelrahman Tarek",
    role: "UI/UX DESIGNER",
    bio: "Creating clean design systems, user journeys, and intuitive interfaces that balance aesthetics with seamless usability.",
    // TODO: Replace with real profile links when available
    socials: { github: "javascript:void(0)", linkedin: "javascript:void(0)" },
    glow: "var(--lime)",
    image: abdelrahmanImg,
  },
];
