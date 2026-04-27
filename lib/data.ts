export const PROFILE = {
  name: "ZHEE PHYSCO",
  nameShort: "ZHEE",
  role: "Full-Stack Developer",
  roleAlt: "& Creative Engineer",
  location: "Sumatera Barat - Indonesia",
  locationCode: "ID",
  email: "physcolhuud@gmail.com",
  available: true,
  availableText: "Available for work",
  bio: "Saya adalah developer yang terobsesi dengan craft — setiap baris kode yang saya tulis harus bekerja dengan sempurna dan terasa luar biasa bagi yang menggunakannya.",
  bioEn: "Based in Pekanbaru, I craft full-stack digital products with obsessive attention to detail — from pixel-perfect interfaces to scalable backend architecture. I don't just build what works. I build what lasts.",
  year: new Date().getFullYear(),
  heroImage: "/assets/images/profile/profile-main",
  portraitImage: "/assets/images/profile/profile-portrait",
} as const;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Xyuss507/Xyuss" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lhuud-physco-a47416406/" },
  { label: "Email", href: `mailto:${PROFILE.email}` },
] as const;

export const STATS = [
  { value: 4, suffix: "+", label: "Tahun Experience" },
  { value: 30, suffix: "+", label: "Projects Selesai" },
  { value: 15, suffix: "", label: "Klien Puas" },
  { value: 100, suffix: "%", label: "Commitment" },
] as const;

export const PROJECTS = [
  {
    id: "01",
    slug: "xyuss-design-system",
    title: "Xyuss Design System",
    category: "UI/UX DESIGN SYSTEM",
    year: "2025",
    visual: { from: "#F5F2ED", to: "#E8E5E0", label: "DESIGN SYSTEM" },
    image: "/assets/images/projects/xyuss-design-system",
    description:
      "A comprehensive UI/UX design system with reusable components, perfectly crafted tokens, and extensive documentation for building scalable digital products.",
    tech: ["Figma", "React", "Storybook", "Tailwind"],
  },
  {
    id: "02",
    slug: "aura-boutique-commerce",
    title: "Aura Minimalist Commerce",
    category: "FULL-STACK COMMERCE",
    year: "2025",
    visual: { from: "#F5F2ED", to: "#E8E5E0", label: "E-COMMERCE" },
    image: "/assets/images/projects/aura-minimalist-commerce",
    description:
      "Platform belanja online butik dengan desain ultra-minimalis. Dilengkapi integrasi payment gateway tanpa hambatan, manajemen keranjang real-time, dan dashboard admin intuitif.",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
  },
  {
    id: "03",
    slug: "nexus-wealth-analytics",
    title: "Nexus Wealth Analytics",
    category: "FULL-STACK SAAS",
    year: "2024",
    visual: { from: "#F5F2ED", to: "#E8E5E0", label: "FINTECH" },
    image: "/assets/images/projects/nexus-wealth-analytics",
    description:
      "Dashboard analitik finansial modern dengan visualisasi data real-time, manajemen portofolio interaktif, dan sistem autentikasi perbankan yang aman.",
    tech: ["React", "Node.js", "Prisma", "Chart.js"],
  },
  {
    id: "04",
    slug: "ethera-nft-gallery",
    title: "Ethera NFT Gallery",
    category: "WEB3 & FRONTEND",
    year: "2024",
    visual: { from: "#F5F2ED", to: "#E8E5E0", label: "WEB3" },
    image: "/assets/images/projects/ethera-nft-gallery",
    description:
      "Galeri pameran seni digital Web3 dengan integrasi smart contract, dompet kripto, dan penjelajahan galeri virtual yang mulus bergaya museum.",
    tech: ["Next.js", "Ethers.js", "Framer Motion", "Tailwind"],
  },
] as const;

export const SERVICES = [
  {
    num: "01",
    title: "Web Development",
    desc: "Aplikasi web dari ground up - performant, scalable, maintainable. Dari MVP hingga enterprise-grade product yang siap scale.",
    deliverables: ["Web App", "API Design", "Database", "Deployment"],
  },
  {
    num: "02",
    title: "UI/UX Engineering",
    desc: "Desain yang hidup. Animasi natural, interaksi intuitif, dan setiap pixel diperhatikan. Kolaborasi langsung dengan desainer atau dari Figma ke code.",
    deliverables: ["React Components", "Animation", "Responsive", "Design System"],
  },
  {
    num: "03",
    title: "Mobile Development",
    desc: "Aplikasi mobile cross-platform yang terasa native. Performa smooth, UX konsisten, dan fitur yang relevan untuk pengguna mobile.",
    deliverables: ["iOS + Android", "React Native", "Push Notifications", "Offline Support"],
  },
  {
    num: "04",
    title: "Backend & API",
    desc: "Arsitektur sistem yang solid. REST, GraphQL, microservices, database design. Foundation yang kuat untuk produk yang bisa grow.",
    deliverables: ["REST API", "Database Design", "Authentication", "Performance"],
  },
  {
    num: "05",
    title: "Tech Consulting",
    desc: "Audit teknis, code review, arsitektur recommendation. Bantu tim membuat keputusan teknologi yang tepat di awal sebelum costly.",
    deliverables: ["Tech Audit", "Architecture Review", "Stack Advisory", "Team Support"],
  },
] as const;

export const SKILLS_MARQUEE = [
  "Next.js",
  "TypeScript",
  "React",
  "GSAP",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind",
] as const;
