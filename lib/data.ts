export const categories = ["All", "UI/UX", "Frontend", "Fullstack", "Design"];

export interface Project {
  slug: string;
  title: string;
  caseNumber: string;
  readTime: string;
  hook: string;
  category: string;
  tags: string[];
  desc: string;
  longDescription: string;
  role: string;
  client: string;
  year: string;
  linkText: string;
  linkHref: string;
  liveUrl?: string;
  image: string;
  detailImage?: string;
  carouselImages?: string[];
  showcaseImages: string[];
  processFlow: string[];
}

export const projects: Project[] = [
  {
    slug: "cui-unity-parallax-docs",
    caseNumber: "01",
    readTime: "7 min Read",
    title: "CUI Unity : Parallax & Docs",
    hook: "Bringing enterprise components alive through smooth parallax storytelling and interactive code docs",
    category: "Frontend",
    tags: ["React", "Parallax", "Documentation", "Tailwind"],
    desc: "Bringing CUI Unity to life. Built an interactive parallax landing page and a comprehensive component documentation site with complete code snippets.",
    longDescription: "Following the completion of the CUI Unity design system for PT. Pertamina Geothermal Energy Tbk, the next technical phase was implementing it into a living codebase. This frontend project comprised two core parts: an interactive presentation landing page featuring smooth Parallax animations, and a well-structured Web Documentation portal detailing each CUI component alongside full code snippets for corporate developer adoption.",
    role: "Frontend Developer",
    client: "PT. Pertamina Geothermal Energy Tbk",
    year: "2024",
    linkText: "Live Demo",
    linkHref: "https://cui-unity.mypge.id/",
    liveUrl: "https://cui-unity.mypge.id/",
    image: "/projects/backgroundcui.png",
    carouselImages: ["/projects/backgroundcui.png", "/projects/tablet-bg.jpg"],
    showcaseImages: ["/projects/backgroundcui.png", "/projects/tablet-bg.jpg"],
    processFlow: [
      "Next.js/React project scaffolding with Tailwind CSS.",
      "Parallax scroll animations implementation using Framer Motion.",
      "Markdown/MDX structure setup for web documentation pages.",
      "Component page finalization with interactive code blocks."
    ]
  },
  {
    slug: "stela-pustekinfo-redesign",
    caseNumber: "02",
    readTime: "6 min Read",
    title: "STELA PUSTEKINFO : Portal Redesign",
    hook: "Modernizing a rigid governance data platform into a high-fidelity interactive experience",
    category: "UI/UX",
    tags: ["Redesign", "Interactive", "Government", "UX Audit"],
    desc: "UI/UX redesign of the STELA portal for Secretariat General of DPR RI, delivered as an intuitive and interactive high-fidelity prototype.",
    longDescription: "This project focused on evaluating and overhauling the user interface and user experience (UI/UX) of the STELA platform utilized by PUSTEKINFO Setjen DPR RI. The central challenge was modernizing a rigid government information system into an intuitive, responsive, and accessible dashboard. Users can quickly access records, track official correspondence, and monitor operational analytics. The final deliverable was an interactive high-fidelity prototype tested through usability evaluations.",
    role: "UI/UX Designer",
    client: "PUSTEKINFO Setjen DPR RI",
    year: "2024",
    linkText: "View Prototype",
    linkHref: "https://www.figma.com/design/39nEH9dyhGcTO6Ky0zwGId/Re-Design-Stela?node-id=0-1&t=FiMK1BKHd1iSIXHy-1",
    liveUrl: "https://www.figma.com/design/39nEH9dyhGcTO6Ky0zwGId/Re-Design-Stela?node-id=0-1&t=FiMK1BKHd1iSIXHy-1",
    image: "/projects/stela-hero.png",
    showcaseImages: ["/projects/stela-hero.png", "/projects/stela-laptop.png"],
    processFlow: [
      "Comprehensive UX audit of the legacy STELA system.",
      "Wireframing and new Information Architecture design.",
      "Visual design exploration matching professional & trusted government standards.",
      "High-Fidelity Prototype assembly for usability testing."
    ]
  },
  {
    slug: "cui-unity-design-system",
    caseNumber: "03",
    readTime: "8 min Read",
    title: "CUI Unity : Design System",
    hook: "Enterprise design system standardization across multi-platform web & mobile ecosystem",
    category: "UI/UX",
    tags: ["Design System", "Figma", "Prototyping", "Tokens"],
    desc: "UI/UX design system standardization for web and mobile. Built from scratch covering prototyping, color tokens, and atomic master components in Figma.",
    longDescription: "CUI (Consistency User Interface) Unity is an ambitious project to establish unified design standards across the digital ecosystem of PT. Pertamina Geothermal Energy Tbk. The primary goal was to ensure all internal and external product architectures, across Web and Mobile platforms, share a coherent, scalable, and consistent visual language. I built the entire foundation from the ground up—from typography and color tokens to hundreds of interconnected atomic components in Figma, streamlining developer handoff.",
    role: "UI/UX Designer",
    client: "PT. Pertamina Geothermal Energy Tbk",
    year: "2024",
    linkText: "View Figma",
    linkHref: "https://www.figma.com/design/4vQoqN6Ivov9TsBc0RQTJ3/Project-Standarisasi-Web--Copy-?node-id=2578-44021&t=FiMK1BKHd1iSIXHy-1",
    liveUrl: "https://www.figma.com/design/4vQoqN6Ivov9TsBc0RQTJ3/Project-Standarisasi-Web--Copy-?node-id=2578-44021&t=FiMK1BKHd1iSIXHy-1",
    image: "/projects/cui-tablet.png",
    showcaseImages: ["/projects/cui-fig-backup.png", "/projects/cui-fig2.png"],
    processFlow: [
      "Standard component requirements research across corporate ecosystem.",
      "Design Tokens formulation (Colors, Typography, Spacing).",
      "Master Components & Variants construction.",
      "Interactive Documentation & Prototyping."
    ]
  },
  {
    slug: "zura-management-web",
    caseNumber: "04",
    readTime: "5 min Read",
    title: "Zura : Agile Project Management",
    hook: "Modern agile project management and issue tracking web platform with interactive Kanban boards",
    category: "Fullstack",
    tags: ["Fullstack", "React", "Node.js", "Kanban Board", "Tailwind CSS"],
    desc: "Fast and intuitive agile project management platform featuring interactive drag-and-drop Kanban boards, sprint workflows, and fullstack issue tracking.",
    longDescription: "Zura is a modern fullstack agile project management and issue tracking web application inspired by Jira. Built to deliver a fast and responsive team workflow, it features interactive Kanban boards with drag-and-drop task progression, backlog and sprint management, customizable work item statuses, and detailed activity tracking. Engineered with a robust backend architecture, React frontend, Tailwind CSS, TanStack Query, and Zustand.",
    role: "Fullstack Developer",
    client: "Personal Project",
    year: "2026",
    linkText: "Live Demo",
    linkHref: "https://zura-management-web-ju9p-one.vercel.app/",
    liveUrl: "https://zura-management-web-ju9p-one.vercel.app/",
    image: "/projects/kanbanboard.png",
    carouselImages: ["/projects/kanbanboard.png", "/projects/zira-report.png"],
    showcaseImages: ["/projects/kanbanboard.png", "/projects/zira-report.png"],
    processFlow: [
      "Information architecture and Jira-inspired component blueprinting.",
      "Backend database schema design and RESTful API endpoints.",
      "Kanban board drag-and-drop implementation using @dnd-kit.",
      "State management and issue cache sync using Zustand and TanStack Query.",
      "Fullstack integration, responsive UI, and cloud deployment on Vercel."
    ]
  },
  {
    slug: "kinka-laundry-logo",
    caseNumber: "05",
    readTime: "4 min Read",
    title: "Kinka Laundry : Brand Identity",
    hook: "Clean retail brand strategy, distinctive logomark, and comprehensive 3D outdoor signboard guidelines",
    category: "Design",
    tags: ["Logo Design", "Mockup", "Branding", "Vector"],
    desc: "Professional logo design and brand identity for a laundry retail business, complete with 3D mockups and signboard banners.",
    longDescription: "Visual branding is pivotal for retail competitiveness. For this laundry business, the client sought a brand identity that communicates cleanliness, modern reliability, and budget friendliness. In addition to crafting the core logomark, I developed the brand guidelines and physical mockups—including storefront signboards and promotional banners—giving the client a complete picture of their new visual identity.",
    role: "Brand Identity Designer",
    client: "Kinka Laundry",
    year: "2026",
    linkText: "View Brand Details",
    linkHref: "#laundry",
    liveUrl: "#laundry",
    image: "/projects/kinka-outlet.jpg",
    detailImage: "/projects/kinka-outlet1.jpg",
    showcaseImages: ["/projects/kinka-logo1.jpg", "/projects/kinka-item.jpg"],
    processFlow: [
      "Competitive analysis of local laundry market.",
      "Initial logomark sketches and typography exploration.",
      "Color palette selection and digital vectoring.",
      "3D mockup rendering for outdoor signage and merchandise."
    ]
  }
];
