// Everything a visitor reads lives here, so updating the portfolio is editing
// data, not markup.
//
// TODO(mary): the problem / decision / hard-part lines for iCAM and Workflow
// Wizard are drafted from the CV bullets, not from you. Correct them, and
// check with Abdelaal how much of the document-control project can be public.

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

export const notes: string[] = [
  "I started by replacing paper. At a sugar factory I turned approval forms, truck tickets and budget sign-offs into digital workflows. Most of my work since has been a bigger version of that job.",
  "Today I build enterprise software for the oil and gas sector: workflow platforms, report builders, integrations with engineering simulators, and document control for industrial plants.",
  "I care most about the parts a demo never shows: permissions that are actually enforced, data one customer can never see of another's, and rules a client can change without waiting for a release.",
  "I work comfortably in Arabic and English, and I've shipped bilingual right-to-left interfaces and five-language platforms.",
  "I write things down. My projects carry architecture decision records, API contracts and a testing strategy, so the next person knows why the system is the way it is.",
];

export type Featured = {
  title: string;
  context: string;
  year?: string;
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
    context: "Oil and gas, product in progress",
    year: "2026",
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
    title: "iCAM",
    context: "ADNOC",
    stack: ["C#", "ASP.NET Core", "COM Interop", "Aspen HYSYS"],
    problem:
      "Separator vessel calculations lived inside Aspen HYSYS, a desktop process simulator, which made multi-year scenario planning slow and manual.",
    decision:
      "Drive HYSYS directly from a web application through COM Interop, so the simulator stays the source of truth while engineers work in the browser.",
    result:
      "A mission-critical web app that runs real-time separator calculations and plans scenarios across multiple years.",
    hardPart:
      "COM Interop with a desktop simulator was never designed for a web server's concurrency, so every call has to be managed carefully.",
  },
  {
    title: "Workflow Wizard",
    context: "EGPC",
    stack: ["React 18", "TypeScript", "Vite", "TanStack Query", "PostgREST"],
    problem:
      "Several companies needed one workflow platform, each with its own steps, people and language.",
    decision:
      "Workflows are configured, not coded. PostgREST exposes the database directly as the API, and role-based access decides who sees and acts on each task.",
    result:
      "A multi-company platform in five languages, with dynamic configuration and task assignment.",
    hardPart:
      "Keeping five languages correct in a UI whose labels, steps and forms are themselves configured at runtime.",
  },
  {
    title: "Support Ticket Management System",
    context: "Open source",
    year: "2026",
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

export type RegisterEntry = {
  title: string;
  client: string;
  description: string;
  stack: string;
  status: "In progress" | "Delivered" | "Public" | "Personal";
  href?: string;
};

export const register: RegisterEntry[] = [
  {
    title: "Document control platform",
    client: "Oil and gas",
    description: "Configurable tag grammar, folder-based classification and database-enforced access.",
    stack: "NestJS, Next.js, PostgreSQL",
    status: "In progress",
  },
  {
    title: "iCAM",
    client: "ADNOC",
    description: "Aspen HYSYS through COM Interop for separator calculations and scenario planning.",
    stack: "C#, ASP.NET Core",
    status: "Delivered",
  },
  {
    title: "Workflow Wizard",
    client: "EGPC",
    description: "Multi-company, five-language workflow platform with role-based access.",
    stack: "React, TanStack Query, PostgREST",
    status: "Delivered",
  },
  {
    title: "Daily Report System",
    client: "EGPC",
    description: "Arabic and English drag-and-drop report builder for an offline site.",
    stack: "React, Node.js, TypeScript",
    status: "Delivered",
  },
  {
    title: "Integration Platform",
    client: "Oil and gas",
    description: "API gateway plus a service moving 1M+ records every 5 seconds across SQL Server warehouses.",
    stack: "Django, Docker, Jenkins",
    status: "Delivered",
  },
  {
    title: "SyncPulse",
    client: "Independent",
    description: "Runs daily stand-ups from GitHub activity, Google Meet and Calendar.",
    stack: "Angular, Google APIs, GitHub API",
    status: "Delivered",
  },
  {
    title: "Support Ticket System",
    client: "Open source",
    description: "Help desk with strict customer data isolation, backed by 36 tests.",
    stack: "ASP.NET Core 8, Angular 17",
    status: "Public",
    href: "https://github.com/MaryMagdy/support-ticket-management-system",
  },
  {
    title: "Job Outreach Tracker",
    client: "Personal",
    description: "Tracks applications, scores a CV against a job and rewrites it with an LLM.",
    stack: "Next.js 15, Supabase, Hono",
    status: "Personal",
  },
  {
    title: "Factory workflow suite",
    client: "Nile Sugar",
    description: "Budget, HSE, change request and truck delivery approvals moved off paper.",
    stack: "SharePoint, SPFx, Power BI",
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
    items: ["Django", "Jenkins", "SharePoint and SPFx", "COM Interop", "Power BI", "VB.NET"],
  },
  {
    use: "How I work",
    items: ["System design", "Clean Architecture", "Role-based access", "i18n and RTL", "Test-driven development", "Architecture decision records"],
  },
];
