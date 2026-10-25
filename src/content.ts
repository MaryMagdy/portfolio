// Everything a visitor reads lives here, so updating the portfolio is editing
// data, not markup.
//
// TODO(mary): check with Abdelaal that the document-control project can be
// public. Company repos are private, so they are described, not linked.

export const profile = {
  name: "Mary Magdy Geady",
  role: "Full-stack developer",
  location: "Cairo, Egypt",
  statement:
    "9+ years turning paper processes and plant data into software that holds up: React and Angular in front, ASP.NET Core and Node behind, PostgreSQL and SQL Server underneath.",
  email: "marry.magdy92@gmail.com",
  linkedin: "https://www.linkedin.com/in/mary-magdy-55666b77",
  github: "https://github.com/MaryMagdy",
  cv: "/Mary_Magdy_Geady_CV.pdf",
  lookingFor: "Open to full-stack roles",
};

/** Rotated under the name on the cover, one at a time. */
export const roles = [
  "Full-stack developer",
  "React and Angular engineer",
  "ASP.NET Core and Node.js developer",
  "Workflow platform builder",
];

export const notes: string[] = [
  "I started by replacing paper. At a sugar factory I turned approval forms, truck tickets and budget sign-offs into digital workflows. Most of my work since has been a bigger version of that job.",
  "Today I build enterprise software for the oil and gas sector: workflow platforms, report builders, integrations with engineering simulators, and document control for industrial plants.",
  "I care most about the parts a demo never shows: permissions that are actually enforced, data one customer can never see of another's, and rules a client can change without waiting for a release.",
  "I work comfortably in Arabic and English, and I've shipped bilingual right-to-left interfaces and five-language platforms.",
  "I write things down. My projects carry architecture decision records, API contracts and a testing strategy, so the next person knows why the system is the way it is.",
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 9, suffix: "+", label: "years building software" },
  { value: 200, suffix: "+", label: "commits leading Workflow Wizard" },
  { value: 5, suffix: "", label: "languages in one workflow platform" },
  { value: 36, suffix: "", label: "tests guarding one help desk's data" },
];

export type Tech = "React" | "Angular" | ".NET" | "Node.js" | "Python" | "SharePoint";

export const techFilters: Tech[] = ["React", "Angular", ".NET", "Node.js", "Python", "SharePoint"];

export type Project = {
  title: string;
  client: string;
  description: string;
  stack: string;
  tech: Tech[];
  status: "In progress" | "Delivered" | "Public" | "Personal";
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Document control platform",
    client: "Oil and gas",
    description: "Configurable tag grammar, folder-based classification and database-enforced access for plant documents.",
    stack: "NestJS, Next.js, PostgreSQL",
    tech: ["Node.js", "React"],
    status: "In progress",
  },
  {
    title: "Workflow Wizard",
    client: "EGPC",
    description: "Multi-company workflow platform in five languages, with form templates, task types and notifications.",
    stack: "React, TanStack Query, PostgREST",
    tech: ["React"],
    status: "Delivered",
  },
  {
    title: "Workflow Builder",
    client: "OnSpec",
    description: "Drop-in React component with a canvas builder and a step-by-step builder that write one schema.",
    stack: "React, TypeScript",
    tech: ["React"],
    status: "Delivered",
  },
  {
    title: "Daily Report System",
    client: "EGPC",
    description: "Arabic and English report builder for refineries, with Excel import and export, deployed offline.",
    stack: "React, Node.js, SQL Server",
    tech: ["React", "Node.js"],
    status: "Delivered",
  },
  {
    title: "iCAM",
    client: "ADNOC",
    description: "Web app that drives Aspen HYSYS through COM Interop for separator calculations and multi-year scenarios.",
    stack: "C#, ASP.NET Core, COM Interop",
    tech: [".NET"],
    status: "Delivered",
  },
  {
    title: "Integration Platform",
    client: "Oil and gas",
    description: "API gateway with JWT and API-key auth in front of a multi-database service for SQL Server warehouses.",
    stack: "Django, Docker, Jenkins",
    tech: ["Python"],
    status: "Delivered",
  },
  {
    title: "Document Management System",
    client: "OnSpec",
    description: "Secure upload and download with role-based access, built on Clean Architecture.",
    stack: "React, Express, PostgreSQL",
    tech: ["React", "Node.js"],
    status: "Delivered",
  },
  {
    title: "Refinery KPI tools",
    client: "Oil and gas",
    description: "Scripts that clean KPI spreadsheets, generate limits and prepare SQL for loading.",
    stack: "Python, SQL",
    tech: ["Python"],
    status: "Delivered",
  },
  {
    title: "SyncPulse",
    client: "Independent",
    description: "Runs daily stand-ups from GitHub activity, Google Meet and Google Calendar.",
    stack: "Angular, Google APIs, GitHub API",
    tech: ["Angular"],
    status: "Delivered",
  },
  {
    title: "Support Ticket System",
    client: "Open source",
    description: "Help desk with strict customer data isolation, backed by 36 tests.",
    stack: "ASP.NET Core 8, Angular 17",
    tech: [".NET", "Angular"],
    status: "Public",
    href: "https://github.com/MaryMagdy/support-ticket-management-system",
  },
  {
    title: "Job Outreach Tracker",
    client: "Personal",
    description: "Tracks applications, scores a CV against a job and rewrites it with an LLM.",
    stack: "Next.js 15, Supabase, Hono",
    tech: ["React", "Node.js"],
    status: "Personal",
  },
  {
    title: "Number Systems Converter",
    client: "Open source",
    description: "Converts between binary, octal, decimal and hexadecimal, with a client and an API.",
    stack: "React 19, Vite, Express, Tailwind CSS",
    tech: ["React", "Node.js"],
    status: "Public",
    href: "https://github.com/MaryMagdy/number-systems-converter",
  },
  {
    title: ".NET interview guide generator",
    client: "Personal",
    description: "Generates bilingual Word study guides on .NET internals, async and runtime behaviour.",
    stack: "Python, python-docx",
    tech: ["Python"],
    status: "Personal",
  },
  {
    title: "Factory workflow suite",
    client: "Nile Sugar",
    description: "Budget, HSE, change request and truck delivery approvals moved off paper, with live dashboards.",
    stack: "SharePoint, SPFx, Power BI",
    tech: ["SharePoint"],
    status: "Delivered",
  },
  {
    title: "Business systems",
    client: "MAS Company",
    description: "Inventory, supplier, customer, point-of-sale and HR applications.",
    stack: "C#, ASP.NET MVC, SQL Server",
    tech: [".NET"],
    status: "Delivered",
  },
];

export type Revision = {
  rev: string;
  dates: string;
  title: string;
  org: string;
  description: string;
};

export const revisions: Revision[] = [
  {
    rev: "C",
    dates: "2021 to now",
    title: "Full-stack software developer",
    org: "OnSpec, oil and gas enterprise software",
    description:
      "Design and build REST APIs in ASP.NET Core and Node, and full-stack apps in Angular and React for workflow automation and reporting. Lead design decisions for new services, integrate GitHub, Google APIs and Aspen HYSYS, and tune PostgreSQL and SQL Server in production.",
  },
  {
    rev: "B",
    dates: "2017 to 2021",
    title: "SharePoint developer",
    org: "Nile Sugar Company",
    description:
      "Moved paper approvals into digital workflows: truck delivery tracking with live production dashboards, multi-stage budget and HSE approvals, change requests, warehouse and farm automation, and fuel tracking with automated alerts.",
  },
  {
    rev: "A",
    dates: "2014 to 2017",
    title: "Software developer",
    org: "MAS Company",
    description:
      "Built and maintained inventory, supplier, customer, point-of-sale and HR systems in C#, ASP.NET MVC, C++ and SQL Server.",
  },
  {
    rev: "0",
    dates: "2013",
    title: "Bachelor of Computer Science",
    org: "Helwan University",
    description: "Where it started.",
  },
];

export type BomGroup = { use: string; items: string[] };

export const bom: BomGroup[] = [
  {
    use: "Every day",
    items: ["TypeScript", "React", "Angular", "C#", "ASP.NET Core", "Node.js", "PostgreSQL", "SQL Server"],
  },
  {
    use: "Regularly",
    items: ["NestJS", "Next.js", "Express", "EF Core", "TanStack Query", "PostgREST", "Tailwind CSS", "Docker", "GitHub Actions"],
  },
  {
    use: "When the job needs it",
    items: ["Django", "Python", "Jenkins", "SharePoint and SPFx", "COM Interop", "Power BI", "VB.NET"],
  },
  {
    use: "How I work",
    items: ["System design", "Clean Architecture", "Role-based access", "i18n and RTL", "Test-driven development", "Architecture decision records"],
  },
];

export type Pillar = { key: "front" | "back" | "delivery"; title: string; body: string; tools: string[] };

export const pillars: Pillar[] = [
  {
    key: "front",
    title: "Interfaces people use every day",
    body: "Data-heavy screens for engineers and operators: report builders, workflow designers and dashboards, in Arabic and English.",
    tools: ["React", "Angular", "TypeScript", "TanStack Query", "Tailwind CSS", "RTL and i18n"],
  },
  {
    key: "back",
    title: "APIs and data that hold up",
    body: "REST APIs and services over PostgreSQL and SQL Server, tuned in production and designed so the next feature does not need a rewrite.",
    tools: ["ASP.NET Core", "Node.js", "NestJS", "PostgreSQL", "SQL Server", "PostgREST"],
  },
  {
    key: "delivery",
    title: "Access, workflows and delivery",
    body: "Role-based access that is actually enforced, workflows clients configure themselves, and releases that reach sites with no internet connection.",
    tools: ["RBAC", "Clean Architecture", "Microservices", "Docker", "GitHub Actions", "Jenkins"],
  },
];

export type Depth = 3 | 2 | 1;
export const depthLabel: Record<Depth, string> = { 3: "Daily", 2: "Regular", 1: "When needed" };

export type SkillGroup = { key: string; label: string; skills: { name: string; depth: Depth }[] };

export const skillGroups: SkillGroup[] = [
  {
    key: "front",
    label: "Front end",
    skills: [
      { name: "TypeScript", depth: 3 },
      { name: "React", depth: 3 },
      { name: "Angular", depth: 3 },
      { name: "Next.js", depth: 2 },
      { name: "TanStack Query", depth: 2 },
      { name: "Tailwind CSS and shadcn/ui", depth: 2 },
      { name: "i18n and right-to-left layouts", depth: 2 },
      { name: "jQuery", depth: 1 },
    ],
  },
  {
    key: "back",
    label: "Back end",
    skills: [
      { name: "C# and ASP.NET Core", depth: 3 },
      { name: "Node.js", depth: 3 },
      { name: "NestJS", depth: 2 },
      { name: "Express", depth: 2 },
      { name: "Entity Framework Core and LINQ", depth: 2 },
      { name: "PostgREST", depth: 2 },
      { name: "Django", depth: 1 },
      { name: "COM Interop and VB.NET", depth: 1 },
    ],
  },
  {
    key: "data",
    label: "Data",
    skills: [
      { name: "PostgreSQL", depth: 3 },
      { name: "SQL Server", depth: 3 },
      { name: "Query optimisation", depth: 2 },
      { name: "Stored procedures", depth: 2 },
      { name: "Database design", depth: 2 },
      { name: "Power BI", depth: 1 },
    ],
  },
  {
    key: "delivery",
    label: "Architecture and delivery",
    skills: [
      { name: "Clean Architecture and SOLID", depth: 3 },
      { name: "Role-based access (JWT, OAuth)", depth: 3 },
      { name: "Microservices", depth: 2 },
      { name: "Docker", depth: 2 },
      { name: "GitHub Actions", depth: 2 },
      { name: "Test-driven development", depth: 2 },
      { name: "Jenkins", depth: 1 },
      { name: "SharePoint and SPFx", depth: 1 },
    ],
  },
];

export const facts = [
  { key: "location", label: "Based in", value: "Cairo, Egypt" },
  { key: "open", label: "Open to", value: "Full-stack roles" },
  { key: "languages", label: "Works in", value: "Arabic and English" },
];
