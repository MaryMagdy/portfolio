// Everything a visitor reads lives here, so updating the portfolio is editing
// data, not markup.
//
// TODO(mary): check with Abdelaal how much of the document-control project
// can be public. Company repos are private, so they are described, not linked.

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

export type Featured = {
  title: string;
  context: string;
  role: string;
  stack: string[];
  problem: string;
  decision: string;
  result: string;
  hardPart: string;
  link?: { label: string; href: string };
};

export const featured: Featured[] = [
  {
    title: "Document control for industrial plants",
    context: "Oil and gas, product in progress, 2026",
    role: "Tag grammar, hierarchy and search",
    stack: ["NestJS", "Next.js", "PostgreSQL", "MinIO", "Docker"],
    problem:
      "Plant documents are found by equipment tag, and every client writes tags differently, so a single hardcoded format would fit only one of them.",
    decision:
      "Tag formats are data: a grammar engine reads each client's rules, so a new format is configuration rather than a code change. Access rules are enforced by the database itself, not left to the application to remember.",
    result:
      "One codebase that serves different clients, tested in CI against two deliberately different client setups, and deployable to sites with no internet connection.",
    hardPart:
      "Making the folder a document is filed in also be its classification, so moving it updates everything that depends on it, while its issued number never changes.",
  },
  {
    title: "Workflow Wizard",
    context: "EGPC, 2025",
    role: "Lead developer, 200+ commits",
    stack: ["React 18", "TypeScript", "Vite", "TanStack Query", "PostgREST"],
    problem:
      "Companies across EGPC run approvals with different steps, forms and people, and their users work in different languages.",
    decision:
      "Workflows, form templates and notifications are configured, not coded. The React front end talks to PostgREST, and role-based access decides who sees and acts on each task.",
    result:
      "Admins design, publish and run workflows with form, file and manual-approval tasks, tracked in real time, in English, Arabic, French, German and Spanish.",
    hardPart:
      "Keeping five languages, including right-to-left Arabic, correct in a UI whose labels, steps and forms are themselves configured at runtime.",
  },
  {
    title: "Workflow Builder",
    context: "Reusable component, 2026",
    role: "Sole author",
    stack: ["React", "TypeScript", "useReducer and Context", "JSON Schema"],
    problem:
      "Several apps needed admins to build approval workflows themselves, each app in its own visual style.",
    decision:
      "A theme-agnostic React component with two builders, a drag-and-drop canvas and a step-by-step form, that both write the same JSON workflow schema.",
    result:
      "Scope targeting, a trigger criteria engine and approval steps in one drop-in component. A saved workflow reopens in the builder it was made in, with its layout intact.",
    hardPart:
      "Keeping two very different editors at exact feature parity, so neither can produce a workflow the other can't open.",
  },
  {
    title: "Daily Report System",
    context: "EGPC refineries, 2025 to 2026",
    role: "Front end and API contributor",
    stack: ["React 18", "TypeScript", "shadcn/ui", "Node.js", "SQL Server"],
    problem:
      "Every refinery reports different daily figures, and the system had to run on a network with no internet access.",
    decision:
      "Admins build each refinery's report from reusable blocks, rows and columns with drag and drop, instead of developers coding a form per refinery. A Node.js and TypeScript API handles JWT sign-in and roles.",
    result:
      "Refineries submit structured daily reports in Arabic or English, with Excel import and export, deployed offline.",
    hardPart:
      "Right-to-left Arabic and left-to-right English sharing one dense data-entry grid without either one breaking.",
  },
  {
    title: "Support Ticket Management System",
    context: "Open source, 2026",
    role: "Sole author",
    stack: ["ASP.NET Core 8", "Angular 17", "EF Core", "JWT"],
    problem:
      "A help desk where admins, agents and customers share one system, but a customer must never see another customer's tickets.",
    decision:
      "Data isolation is enforced in the API, then proven with integration tests that try to cross the boundary and must be refused.",
    result:
      "Ticket workflow, comment and activity timeline, time tracking and an analytics dashboard, with 36 passing tests (24 unit, 12 integration).",
    hardPart:
      "Writing the tests that attack the isolation rules, not just the ones that confirm the happy path.",
    link: { label: "View the code on GitHub", href: "https://github.com/MaryMagdy/support-ticket-management-system" },
  },
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
