// Clean, structured tutorial generator with rich per-technology sections

export interface TutorialSection {
  id: string
  title: string
  content: string
  syntax: string
  usage: string
  codeExample: string
}

export interface Tutorial {
  title: string
  description: string
  icon: string
  sections: TutorialSection[]
}

type LanguageType =
  | 'styling'
  | 'markup'
  | 'framework'
  | 'scripting'
  | 'backend'
  | 'database'
  | 'ml'
  | 'devops'
  | 'blockchain'
  | 'game'
  | 'security'
  | 'mobile'
  | 'general'

type SectionSpec = {
  title: string
  description: string
  syntax: string
  usage: string
  code: string
}

// Public API used across tutorial pages
export function generateComprehensiveTutorial(
  languageId: string,
  languageName: string,
  icon: string,
  description: string
): Tutorial {
  const type = detectLanguageType(languageId)
  const specs = getSpecsFor(languageId, type, languageName)
  const sections = buildSections(languageName, specs)

  return {
    title: `Master ${languageName}`,
    description: description || `Complete ${languageName} tutorial from basics to a mini project`,
    icon,
    sections,
  }
}

function detectLanguageType(languageId: string): LanguageType {
  const id = languageId.toLowerCase()
  if (/(css|tailwind)/.test(id)) return 'styling'
  if (/(html)/.test(id)) return 'markup'
  if (/(react-native|flutter|swift|kotlin)/.test(id)) return 'mobile'
  if (/(react|next|vue|angular)/.test(id)) return 'framework'
  if (/(javascript|typescript)/.test(id) && !/(nodejs|node|backend)/.test(id)) return 'scripting'
  if (/(unity|unreal|godot|game)/.test(id)) return 'game'
  if (/(nodejs|python-backend|java-backend|go-backend|rust-backend|php|ruby|rails|^java$|^go$|rust)/.test(id)) return 'backend'
  if (/(sql|postgres|postgresql|mongodb|redis|firebase|database)/.test(id)) return 'database'
  if (/(tensorflow|pytorch|scikit|sklearn|ai-ml|ml)/.test(id)) return 'ml'
  if (/(docker|kubernetes|terraform|aws|github-actions|devops)/.test(id)) return 'devops'
  if (/(solidity|web3|ethereum|blockchain)/.test(id)) return 'blockchain'
  if (/(penetration|network-security|cryptography|security)/.test(id)) return 'security'
  if (/(python|^r$|pandas)/.test(id)) return 'scripting'
  return 'general'
}

function buildSections(languageName: string, specs: SectionSpec[]): TutorialSection[] {
  return specs.map((spec, index) => {
    const id = String(index + 1)
    const isIntro = index === 0
    const content = isIntro
      ? introContent(languageName, spec)
      : sectionContent(languageName, spec)

    return {
      id,
      title: spec.title,
      content,
      syntax: spec.syntax,
      usage: spec.usage,
      codeExample: spec.code,
    }
  })
}

function introContent(languageName: string, spec: SectionSpec): string {
  return `# Welcome to ${languageName}\n\n## What is ${languageName}?\n${spec.description}\n\n## Why Learn ${languageName}?\n- Build real apps with modern patterns\n- Improve performance, accessibility, and DX\n- Stand out with production-ready skills\n\n## How This Tutorial Works\n- Start with foundations, then move to intermediate and advanced topics\n- Each lesson includes best practices, pitfalls, and a small exercise\n- Finish with a mini project to solidify concepts\n\n## Outcomes\n- Confidence to ship ${languageName} apps\n- Ability to debug, profile, and harden features\n- Reusable patterns for teams and production\n\n## Getting Ready\n- Install the tooling and clone a starter\n- Keep docs and devtools open while you practice\n- Commit progress after each milestone\n`
}

function sectionContent(languageName: string, spec: SectionSpec): string {
  // Show the actual educational content from the spec description
  // Remove generic redundant templates
  return `# ${spec.title}\n\n${spec.description}\n\n## Syntax\n\`\`\`\n${spec.syntax}\n\`\`\`\n\n## Example\n\`\`\`\n${spec.code}\n\`\`\`\n\n## Usage\n${spec.usage}`
}

function getSpecsFor(languageId: string, type: LanguageType, languageName: string): SectionSpec[] {
  const id = languageId.toLowerCase()
  switch (type) {
    case 'styling':
      return stylingSpecs(languageName)
    case 'markup':
      return htmlSpecs()
    case 'framework':
      if (id.includes('next')) return nextSpecs(languageName)
      if (id.includes('vue')) return vueSpecs(languageName)
      return frameworkSpecs(languageName)
    case 'scripting':
      return scriptingSpecs(languageName)
    case 'backend':
      if (id.includes('node')) return nodeBackendSpecs(languageName)
      if (id.includes('java')) return javaBackendSpecs(languageName)
      if (id.includes('go')) return goBackendSpecs(languageName)
      if (id.includes('rust')) return rustBackendSpecs(languageName)
      if (id.includes('php')) return phpBackendSpecs(languageName)
      if (id.includes('ruby') || id.includes('rails')) return rubyBackendSpecs(languageName)
      return backendSpecs(languageName)
    case 'database':
      return databaseSpecs(languageName)
    case 'ml':
      return mlSpecs(languageName)
    case 'devops':
      return devopsSpecs(languageName)
    case 'blockchain':
      return blockchainSpecs(languageName)
    case 'game':
      return gameSpecs(languageName)
    case 'security':
      return securitySpecs(languageName)
    case 'mobile':
      if (id.includes('react-native') || id.includes('reactnative')) return reactNativeSpecs(languageName)
      if (id.includes('flutter')) return flutterSpecs(languageName)
      if (id.includes('swift')) return swiftSpecs(languageName)
      if (id.includes('kotlin')) return kotlinSpecs(languageName)
      return reactNativeSpecs(languageName)
    default:
      return generalSpecs(languageName)
  }
}

// Styling (CSS/Tailwind)
function stylingSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} controls layout, color, and motion for the web. Learn responsive, accessible styling with tokens, utilities, and components.`, syntax: 'Selectors, properties, values', usage: 'Style and layout web pages', code: 'body { font-family: system-ui; margin: 0; }' },
    { title: 'Selectors and Specificity', description: 'Combine element, class, id, attribute, and state selectors with predictable specificity.', syntax: 'element | .class | #id | [attr]', usage: 'Target elements safely', code: '.card[data-active="true"] { border-color: #2563eb; }' },
    { title: 'Box Model and Spacing', description: 'Master content, padding, border, and margin. Normalize with box-sizing.', syntax: 'box-sizing, margin, padding, border', usage: 'Control layout blocks', code: '* { box-sizing: border-box; }' },
    { title: 'Flexbox', description: 'One-dimensional layout for toolbars, cards, nav bars, and split panes.', syntax: 'display: flex; gap; justify-content; align-items', usage: 'Align items', code: '.toolbar { display: flex; gap: 12px; }' },
    { title: 'Grid', description: 'Two-dimensional layout for dashboards, galleries, and complex pages.', syntax: 'display: grid; grid-template-areas', usage: 'Compose pages', code: '.dashboard { display: grid; grid-template-columns: 240px 1fr; }' },
    { title: 'Typography and Color', description: 'Set font stacks, sizes, weights, and accessible contrast.', syntax: 'font-family, font-size, color', usage: 'Readable text', code: 'h1 { font-size: 2.25rem; color: #0f172a; }' },
    { title: 'Sizing and Units', description: 'Use rem for type, px for borders, % and clamp() for fluid layouts.', syntax: 'rem, px, %, clamp()', usage: 'Responsive sizing', code: '.hero { padding: clamp(24px, 5vw, 64px); }' },
    { title: 'Positioning and Z-Index', description: 'Place overlays, tooltips, and sticky headers safely.', syntax: 'position, z-index, stacking', usage: 'Layer UI', code: '.header { position: sticky; top: 0; z-index: 50; }' },
    { title: 'Responsive Design', description: 'Mobile-first breakpoints, container queries, and logical properties.', syntax: '@media (min-width: ...)', usage: 'Adapt layouts', code: '@media (min-width: 768px) { .card { display: grid; grid-template-columns: 1fr 1fr; } }' },
    { title: 'Pseudo Classes and Elements', description: 'Use :hover/:focus-visible and ::before/::after for interaction and decoration.', syntax: ':hover, :focus-visible, ::before', usage: 'Interactive polish', code: 'button::after { content: ""; position: absolute; inset: 0; }' },
    { title: 'Variables and Theming', description: 'Design tokens with custom properties for light/dark themes.', syntax: ':root { --primary: ... }', usage: 'Consistent theming', code: ':root { --primary: #2563eb; } .btn { background: var(--primary); }' },
    { title: 'Transitions and Animation', description: 'Smooth feedback with transitions and keyframes while respecting prefers-reduced-motion.', syntax: 'transition, @keyframes', usage: 'Motion design', code: '.btn { transition: transform 150ms ease; }' },
    { title: 'Effects and Glassmorphism', description: 'Layer depth with shadows, filters, and backdrops carefully.', syntax: 'box-shadow, filter, backdrop-filter', usage: 'Depth cues', code: '.glass { backdrop-filter: blur(12px); }' },
    { title: 'Forms and Inputs', description: 'Style inputs, labels, states, and errors accessibly.', syntax: 'input, label, focus-visible', usage: 'Usable forms', code: 'input:focus-visible { outline: 2px solid #2563eb; }' },
    { title: 'Components and Utilities', description: 'Build buttons, badges, alerts, and utility classes for speed.', syntax: 'component + utility classes', usage: 'Reusable UI', code: '.badge { display: inline-flex; gap: 6px; }' },
    { title: 'Architecture and Layers', description: 'Organize reset/base/components/utilities with cascade layers.', syntax: '@layer reset, base, components', usage: 'Maintainable CSS', code: '@layer base { body { content-visibility: auto; } }' },
    { title: 'Accessibility', description: 'Focus outlines, contrast, reduced motion, and readable spacing.', syntax: ':focus-visible, prefers-reduced-motion', usage: 'Inclusive UI', code: '@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms; } }' },
    { title: 'Debugging', description: 'Use devtools, overlays, and outline helpers to debug layout.', syntax: 'outline helpers', usage: 'Faster fixes', code: '* { outline: 1px dashed rgba(37,99,235,0.25); outline-offset: -1px; }' },
    { title: 'Performance', description: 'Minify CSS, remove unused rules, and use content-visibility.', syntax: 'purge, minify, content-visibility', usage: 'Ship fast', code: '/* purgecss --css styles.css --content index.html */' },
    { title: 'Mini Project', description: 'Build a responsive landing page with hero, features, pricing, and CTA.', syntax: 'layout + components', usage: 'Apply everything', code: '.layout { max-width: 960px; margin: 0 auto; }' },
  ]
}

// HTML
function htmlSpecs(): SectionSpec[] {
  return [
    { title: 'HTML HOME', description: 'HTML defines structure with semantic tags. Learn documents, forms, media, and accessibility basics.', syntax: 'doctype, html, head, body', usage: 'Create documents', code: '<!DOCTYPE html>\n<html lang="en">...</html>' },
    { title: 'Document Structure', description: 'Head for metadata, body for content. Keep lang, charset, viewport set.', syntax: '<head>, <body>', usage: 'Page skeleton', code: '<head><title>Site</title></head>' },
    { title: 'Text and Semantics', description: 'Headings, paragraphs, lists, inline semantics for meaning and SEO.', syntax: '<h1>-<h6>, <p>, <strong>', usage: 'Readable content', code: '<h1>Hello</h1><p>Welcome</p>' },
    { title: 'Links and Navigation', description: 'Anchor tags, nav landmarks, and skip links.', syntax: '<a href="">, <nav>', usage: 'Site navigation', code: '<nav><a href="#about">About</a></nav>' },
    { title: 'Media', description: 'Images, video, audio with alt text and responsive sizing.', syntax: '<img>, <video>', usage: 'Rich content', code: '<img src="hero.jpg" alt="Hero" loading="lazy" />' },
    { title: 'Forms', description: 'Labels, inputs, selects, validation, and error states.', syntax: '<form>, <label>, required', usage: 'Collect data', code: '<label>Email<input type="email" required /></label>' },
    { title: 'Tables', description: 'thead/tbody, scope, captions for accessible data.', syntax: '<table>, <th scope="col">', usage: 'Tabular data', code: '<table><thead><tr><th scope="col">Name</th></tr></thead></table>' },
    { title: 'Semantic Layout', description: 'header, main, section, article, aside, footer for meaningful structure.', syntax: '<header>, <main>', usage: 'Page layout', code: '<main><section>Content</section></main>' },
    { title: 'Metadata and SEO', description: 'Titles, descriptions, canonical links, and social cards.', syntax: '<meta name="description">', usage: 'Search optimization', code: '<meta name="description" content="Learn HTML" />' },
    { title: 'Accessibility', description: 'ARIA labels, roles, keyboard focus, skip links.', syntax: 'aria-label, role', usage: 'Inclusive pages', code: '<button aria-label="Close">×</button>' },
    { title: 'Performance', description: 'Defer scripts, preload critical assets, lazy-load media.', syntax: 'defer, preload, loading="lazy"', usage: 'Faster pages', code: '<script src="app.js" defer></script>' },
    { title: 'Mini Project', description: 'Semantic multi-section page with nav, hero, and form.', syntax: 'semantic tags + form', usage: 'Apply HTML skills', code: '<section id="contact"><form>...</form></section>' },
  ]
}

// Generic Framework (React-like)
function frameworkSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} builds UI with components, routing, and data fetching. Learn components, state, effects, routing, and deployment.`, syntax: 'components, props, state', usage: 'Create web apps', code: 'function App(){ return <h1>Hello</h1> }' },
    { title: 'Components and JSX', description: 'Pure components returning JSX/TSX.', syntax: 'function Component() { return <div/> }', usage: 'Reusable UI blocks', code: 'const Card = ({ title }) => <article>{title}</article>' },
    { title: 'Props and State', description: 'Pass data via props and manage local state.', syntax: 'props, useState', usage: 'Dynamic UI', code: 'const [count, setCount] = useState(0)' },
    { title: 'Effects and Data', description: 'Fetch data and sync side effects.', syntax: 'useEffect, data fetching', usage: 'Load remote data', code: 'useEffect(() => { fetch("/api").then(r=>r.json()).then(setData) }, [])' },
    { title: 'Routing', description: 'Create pages and nested layouts with file-based routing.', syntax: 'pages or app router', usage: 'Multi-page apps', code: 'export default function Page(){ return <h1>Home</h1> }' },
    { title: 'Forms and Validation', description: 'Controlled inputs, validation, and submission.', syntax: 'onChange, onSubmit', usage: 'Reliable forms', code: '<form onSubmit={handleSubmit}><input value={email} /></form>' },
    { title: 'Styling Options', description: 'CSS Modules, Tailwind, or styled-components.', syntax: 'className, css-in-js', usage: 'Component styling', code: '<button className="btn">Save</button>' },
    { title: 'State Management', description: 'Context, reducers, and query caches.', syntax: 'context, reducers', usage: 'Shared state', code: 'const UserContext = createContext(null)' },
    { title: 'Performance', description: 'Code-split, memoize, and defer heavy work.', syntax: 'lazy, memo, suspense', usage: 'Smooth UX', code: 'const Chart = React.lazy(() => import("./Chart"))' },
    { title: 'Accessibility', description: 'Semantic elements, aria attributes, focus traps.', syntax: 'aria-label, focus management', usage: 'Inclusive UI', code: '<button aria-expanded="false">Menu</button>' },
    { title: 'Testing', description: 'Test components with RTL/Vitest or Jest.', syntax: 'render, screen, expect', usage: 'Prevent regressions', code: 'render(<Button>Save</Button>)' },
    { title: 'Mini Project', description: 'Dashboard page with cards, list, and form.', syntax: 'components + routing', usage: 'Apply framework skills', code: '<DashboardPage />' },
  ]
}

// Next.js (40+ focused topics for App Router)
function nextSpecs(languageName: string): SectionSpec[] {
  const topics: SectionSpec[] = [
    { title: `${languageName} HOME`, description: `${languageName} combines React, file-system routing, and server-first rendering. Master the App Router, data fetching, caching, and deployment.`, syntax: 'app router, server/client components', usage: 'Build production web apps', code: 'export default function Page(){ return <h1>Welcome</h1> }' },
    { title: 'Project Setup', description: 'Create app router project, TypeScript, ESLint, Tailwind.', syntax: 'npx create-next-app', usage: 'Start quickly', code: 'npx create-next-app@latest my-app' },
    { title: 'App Directory and Routing', description: 'File-system routing with app/; folders become routes.', syntax: 'app/page.tsx, app/blog/page.tsx', usage: 'Define routes', code: 'export default function Page(){ return <main>Home</main> }' },
    { title: 'Layouts and Templates', description: 'Persistent chrome with layout.tsx and optional templates.', syntax: 'layout.tsx', usage: 'Shared UI', code: 'export default function RootLayout({ children }){ return <html><body>{children}</body></html> }' },
    { title: 'Server Components', description: 'Default rendering mode; fetch data without client JS.', syntax: 'async function Page()', usage: 'Fast defaults', code: 'export default async function Page(){ const data = await fetch(api).then(r=>r.json()); return <pre>{JSON.stringify(data)}</pre> }' },
    { title: 'Client Components', description: 'Opt into client with "use client" for state/effects.', syntax: '"use client"', usage: 'Interactive UI', code: '"use client"\nexport function Counter(){ const [n,setN]=useState(0); return <button onClick={()=>setN(n+1)}>{n}</button>; }' },
    { title: 'Route Groups', description: 'Group routes without affecting URL.', syntax: '(marketing)/page.tsx', usage: 'Organize routes', code: 'app/(marketing)/page.tsx' },
    { title: 'Dynamic Routes', description: 'Capture params with [slug] and generateStaticParams.', syntax: 'app/blog/[slug]/page.tsx', usage: 'Param pages', code: 'export function generateStaticParams(){ return [{ slug: "hello" }] }' },
    { title: 'Catch-All and Optional Segments', description: 'Use [...slug] and [[...slug]] for flexible paths.', syntax: '[...slug]', usage: 'Nested segments', code: 'export default function Page({ params }){ return <div>{params.slug?.join("/")}</div> }' },
    { title: 'Parallel Routes', description: 'Render multiple segments in parallel slots.', syntax: '(@slot)/page.tsx', usage: 'Complex UIs', code: 'app/(dashboard)/@metrics/page.tsx' },
    { title: 'Intercepting Routes', description: 'Intercept navigation for modals/sheets.', syntax: '(..)segment', usage: 'Modal routes', code: 'app/feed/(..)profile/page.tsx' },
    { title: 'Loading and Error UI', description: 'Use loading.tsx and error.tsx for skeletons and boundaries.', syntax: 'loading.tsx, error.tsx', usage: 'Better UX', code: 'export default function Loading(){ return <p>Loading...</p> }' },
    { title: 'Not Found Handling', description: 'Customize 404 with not-found.tsx.', syntax: 'not-found.tsx', usage: 'Error UX', code: 'export default function NotFound(){ return <h1>Not Found</h1> }' },
    { title: 'Metadata', description: 'Set titles, descriptions, and Open Graph via metadata export.', syntax: 'export const metadata', usage: 'SEO', code: 'export const metadata = { title: "Home", description: "Landing" }' },
    { title: 'Link and Navigation', description: 'Use next/link, useRouter, and prefetching.', syntax: '<Link href="/about">', usage: 'Navigate fast', code: 'import Link from "next/link"' },
    { title: 'Images and Fonts', description: 'Optimize with next/image and next/font.', syntax: '<Image>, localFont()', usage: 'Fast assets', code: 'import Image from "next/image"; <Image src="/hero.png" alt="" width={800} height={600} />' },
    { title: 'Data Fetching (Fetch API)', description: 'Use fetch with caching and revalidation options.', syntax: 'fetch(url, { cache, next })', usage: 'Load data', code: 'await fetch(api, { next: { revalidate: 60 } })' },
    { title: 'Data Fetching (Server Actions)', description: 'Mutate on the server with form actions.', syntax: '"use server"', usage: 'Secure mutations', code: '"use server"\nexport async function save(formData){ /* db write */ }' },
    { title: 'Data Fetching (Route Handlers)', description: 'Create API endpoints in app/api/*.', syntax: 'app/api/route.ts', usage: 'APIs', code: 'export async function GET(){ return Response.json({ ok: true }) }' },
    { title: 'Revalidation and Cache', description: 'ISR, cache: no-store, revalidate paths.', syntax: 'revalidatePath, cache modes', usage: 'Fresh data', code: 'import { revalidatePath } from "next/cache"' },
    { title: 'Mutations and Forms', description: 'Progressive enhancement with forms and server actions.', syntax: '<form action={action}>', usage: 'Submit securely', code: '<form action={createPost}><input name="title" /><button>Save</button></form>' },
    { title: 'Streaming and Suspense', description: 'Stream data to the client with suspense boundaries.', syntax: '<Suspense>', usage: 'Fast time-to-first-byte', code: '<Suspense fallback={<p>Loading</p>}><Comments /></Suspense>' },
    { title: 'Middleware', description: 'Edge middleware for auth, redirects, rewrites.', syntax: 'middleware.ts', usage: 'Request control', code: 'export function middleware(req){ return NextResponse.next() }' },
    { title: 'Edge and Runtime', description: 'Choose nodejs or edge runtimes per route.', syntax: 'export const runtime', usage: 'Performance/runtime', code: 'export const runtime = "edge"' },
    { title: 'Env and Secrets', description: 'Load env vars, public vs server-only, type safety.', syntax: 'process.env, NEXT_PUBLIC_', usage: 'Config', code: 'const key = process.env.API_KEY' },
    { title: 'Authentication', description: 'Protect routes with middleware or libraries (NextAuth/Auth.js).', syntax: 'middleware, cookies', usage: 'Secure pages', code: 'cookies().get("session")' },
    { title: 'Authorization', description: 'Role-based UI and server checks.', syntax: 'guards in server actions', usage: 'Least privilege', code: 'if(!user?.role){ throw new Error("unauthorized") }' },
    { title: 'State Management', description: 'Server first; use client state sparingly with context or Zustand.', syntax: 'context, Zustand', usage: 'Shared client state', code: 'const useStore = create(set => ({ count: 0 }))' },
    { title: 'Styling Strategies', description: 'CSS Modules, Tailwind, CSS-in-JS, and design tokens.', syntax: 'module.css, tailwind', usage: 'Consistent UI', code: 'import styles from "./page.module.css"' },
    { title: 'Internationalization', description: 'Route-based locales, metadata localization.', syntax: 'i18n config', usage: 'Localized UX', code: 'export const metadata = { title: { default: "Home", template: "%s | Site" } }' },
    { title: 'Accessibility', description: 'Semantic HTML, focus management, skip links.', syntax: 'aria, landmarks', usage: 'Inclusive UX', code: '<a href="#main" className="sr-only">Skip to content</a>' },
    { title: 'Testing', description: 'Component tests with RTL, integration with Playwright.', syntax: 'vitest/jest + playwright', usage: 'Confidence', code: 'import { render } from "@testing-library/react"' },
    { title: 'Performance and Profiling', description: 'Analyze with Lighthouse and React profiler; tune caching.', syntax: 'profile, cache, headers', usage: 'Fast pages', code: 'export const dynamic = "force-dynamic"' },
    { title: 'Observability', description: 'Logging, metrics, tracing with Next instrumentation.', syntax: 'instrumentation.ts', usage: 'Operate safely', code: 'export async function register() { /* tracing init */ }' },
    { title: 'Security and Headers', description: 'CSP, SRI, HTTPS, secure cookies.', syntax: 'next.config headers()', usage: 'Harden app', code: 'async headers(){ return [{ source: "/(.*)", headers: [{ key: "Content-Security-Policy", value: "default-src \'self\'" }] }] }' },
    { title: 'File Uploads', description: 'Handle uploads via route handlers and edge limits.', syntax: 'FormData, blobs', usage: 'Receive files', code: 'const data = await req.formData();' },
    { title: 'Image Optimization', description: 'Remote patterns, loaders, and caching for images.', syntax: 'next.config images', usage: 'Fast media', code: 'images: { remotePatterns: [{ hostname: "images.example.com" }] }' },
    { title: 'Fonts and Icons', description: 'Use next/font and icon sets for performance.', syntax: 'localFont, GoogleFont', usage: 'Consistent type', code: 'const Inter = localFont({ src: "./Inter.woff2" })' },
    { title: 'Analytics', description: 'Integrate privacy-friendly analytics.', syntax: 'layout scripts', usage: 'Measure usage', code: '<Script src="https://analytics" />' },
    { title: 'Deploy and Preview', description: 'Vercel deploys, preview branches, environment promotion.', syntax: 'vercel --prod', usage: 'Ship safely', code: 'vercel --prod' },
    { title: 'CI/CD', description: 'Automate lint, type-check, and build.', syntax: 'github actions', usage: 'Quality gates', code: 'name: CI\non: [push]\njobs: { build: { runs-on: ubuntu-latest } }' },
    { title: 'Troubleshooting', description: 'Common build/runtime errors, cache busting, and dependency fixes.', syntax: 'log, clear cache', usage: 'Stability', code: '// next build --debug' },
  ]
  return topics
}

// Vue 3 (40+ topics)
function vueSpecs(languageName: string): SectionSpec[] {
  const topics: SectionSpec[] = [
    { title: `${languageName} HOME`, description: `${languageName} uses the Composition API for reactive UIs. Learn templates, reactivity, routing, state, testing, and deployment.`, syntax: 'Composition API, SFCs', usage: 'Build SPAs/MPAs', code: '<template><h1>Hello</h1></template>' },
    { title: 'Project Setup', description: 'Create Vite-based Vue project with TypeScript and ESLint.', syntax: 'npm create vue@latest', usage: 'Start quickly', code: 'npm create vue@latest my-app' },
    { title: 'Single File Components', description: 'Organize template, script, and style in .vue files.', syntax: '<template><script setup>', usage: 'Component structure', code: '<template><div>{{ msg }}</div></template>' },
    { title: 'Template Syntax', description: 'Interpolations, directives, and safe rendering.', syntax: '{{ }} v-if v-for', usage: 'Render data', code: '<p>{{ user.name }}</p>' },
    { title: 'Reactivity Fundamentals', description: 'refs, reactive, shallowRef, readonly.', syntax: 'ref(), reactive()', usage: 'Track state', code: 'const count = ref(0)' },
    { title: 'Computed Properties', description: 'Derived state with caching.', syntax: 'computed()', usage: 'Avoid recalculation', code: 'const doubled = computed(() => count.value * 2)' },
    { title: 'Watchers', description: 'Watch state and run side effects.', syntax: 'watch, watchEffect', usage: 'React to changes', code: 'watch(count, (n) => console.log(n))' },
    { title: 'Lifecycle Hooks', description: 'onMounted, onUnmounted, onUpdated.', syntax: 'onMounted()', usage: 'Resource management', code: 'onMounted(() => fetchData())' },
    { title: 'Props and Emits', description: 'Define props with types and emit events.', syntax: 'defineProps, defineEmits', usage: 'Parent-child data flow', code: 'const props = defineProps<{ title: string }>()' },
    { title: 'Slots and Composition', description: 'Default, named, scoped slots.', syntax: '<slot>', usage: 'Flexible children', code: '<slot name="actions"></slot>' },
    { title: 'Forms and v-model', description: 'Two-way binding with modifiers.', syntax: 'v-model.trim', usage: 'Form handling', code: '<input v-model="email" />' },
    { title: 'Directives', description: 'Built-ins (v-if, v-for) and custom directives.', syntax: 'v-if, v-for, custom', usage: 'DOM control', code: 'app.directive("focus", { mounted(el){ el.focus() } })' },
    { title: 'Conditional and List Rendering', description: 'v-if vs v-show, keying lists.', syntax: 'v-if, v-show, :key', usage: 'Efficient rendering', code: '<li v-for="item in items" :key="item.id">{{ item.name }}</li>' },
    { title: 'Transitions and Animations', description: 'Use <Transition> and <TransitionGroup>.', syntax: '<Transition>', usage: 'Motion', code: '<Transition name="fade"><div v-if="open">Panel</div></Transition>' },
    { title: 'Provide/Inject', description: 'Share data down the tree without prop drilling.', syntax: 'provide, inject', usage: 'Dependency sharing', code: 'provide("theme", themeRef)' },
    { title: 'Composables', description: 'Reusable logic with composition functions.', syntax: 'useX composables', usage: 'Share logic', code: 'export function useCounter(){ const n=ref(0); return { n, inc: ()=>n.value++ } }' },
    { title: 'Routing Basics', description: 'vue-router setup, routes array, router-view.', syntax: 'createRouter, createWebHistory', usage: 'Navigation', code: 'const router = createRouter({ history: createWebHistory(), routes })' },
    { title: 'Dynamic and Nested Routes', description: 'Params, children, guards.', syntax: ':id, children, beforeEnter', usage: 'Deep routing', code: '{ path: "/users/:id", component: User }' },
    { title: 'Navigation Guards', description: 'Global, per-route, in-component guards.', syntax: 'beforeEach, beforeEnter', usage: 'Auth and checks', code: 'router.beforeEach((to,from,next)=>{ next() })' },
    { title: 'State Management with Pinia', description: 'Define stores, actions, getters.', syntax: 'defineStore', usage: 'Global state', code: 'export const useUser = defineStore("user", { state: ()=>({ user: null }) })' },
    { title: 'Async Data Fetching', description: 'Fetch in setup with suspensible requests.', syntax: 'fetch + suspense', usage: 'Remote data', code: 'const data = await $fetch("/api/users")' },
    { title: 'Error Handling', description: 'Handle errors with error boundaries and try/catch.', syntax: 'errorCaptured', usage: 'Resilience', code: 'onErrorCaptured((err)=>console.error(err))' },
    { title: 'Performance Tips', description: 'v-memo, lazy components, keep-alive, and devtools profiling.', syntax: '<KeepAlive>, defineAsyncComponent', usage: 'Smooth UX', code: '<KeepAlive><RouterView /></KeepAlive>' },
    { title: 'SSR and Hydration Basics', description: 'Intro to server rendering concepts.', syntax: 'createSSRApp', usage: 'SEO and speed', code: 'const app = createSSRApp(App)' },
    { title: 'Testing Components', description: 'Vitest + Vue Test Utils.', syntax: 'mount, expect', usage: 'Quality', code: 'const wrapper = mount(Component); expect(wrapper.text()).toContain("Hello")' },
    { title: 'TypeScript with Vue', description: 'Props typing, emits typing, and tooling.', syntax: 'defineProps<{ }>', usage: 'Type safety', code: 'const props = defineProps<{ id: string }>()' },
    { title: 'Accessibility', description: 'ARIA, focus traps, and keyboard navigation.', syntax: 'aria-*', usage: 'Inclusive UI', code: '<button aria-expanded="false">Menu</button>' },
    { title: 'Internationalization', description: 'vue-i18n basics for translations and locales.', syntax: 't("key")', usage: 'Localized UX', code: '{{ t("welcome") }}' },
    { title: 'Env and Configuration', description: 'Vite env files, public vs private vars.', syntax: 'import.meta.env', usage: 'Config', code: 'const api = import.meta.env.VITE_API_URL' },
    { title: 'HTTP Clients', description: 'Use fetch/axios with interceptors.', syntax: 'axios.create', usage: 'API integration', code: 'const api = axios.create({ baseURL: "/api" })' },
    { title: 'Forms and Validation', description: 'Custom validators, vee-validate/zod integration.', syntax: 'schema validation', usage: 'Data quality', code: 'const schema = z.object({ email: z.string().email() })' },
    { title: 'File Uploads', description: 'Handle file inputs and progress.', syntax: '<input type="file">', usage: 'Send files', code: 'const form = new FormData(); form.append("file", file)' },
    { title: 'Caching and Suspense', description: 'Cache responses and use suspense for UX.', syntax: 'suspense + cache', usage: 'Fewer spinners', code: '<Suspense><DataView/></Suspense>' },
    { title: 'Animations with Motion/GSAP', description: 'Animate enter/leave with libraries.', syntax: 'motion variants', usage: 'Delightful UI', code: '<Motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" />' },
    { title: 'Deployments', description: 'Build and deploy to Netlify/Vercel.', syntax: 'npm run build', usage: 'Ship app', code: 'npm run build && npm run preview' },
    { title: 'CI/CD', description: 'Automate lint, type-check, and tests.', syntax: 'github actions', usage: 'Quality gates', code: 'name: CI\non: [push]' },
    { title: 'Security Basics', description: 'Sanitize HTML, escape output, and handle auth tokens.', syntax: 'escape, cookies', usage: 'Safe apps', code: 'const sanitized = DOMPurify.sanitize(input)' },
    { title: 'Observability', description: 'Logging and error reporting with Sentry or similar.', syntax: 'captureException', usage: 'Monitor', code: 'Sentry.captureException(err)' },
    { title: 'PWA Essentials', description: 'Service worker, manifest, offline cache.', syntax: 'registerSW', usage: 'Offline UX', code: 'if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js") }' },
    { title: 'Troubleshooting', description: 'Common template/reactivity mistakes and fixes.', syntax: 'devtools inspect', usage: 'Faster fixes', code: '// check reactive refs and unwrap when needed' },
  ]
  return topics
}

// Scripting (JavaScript/TypeScript) - COMPREHENSIVE W3Schools-style (116 lessons)
function scriptingSpecs(languageName: string): SectionSpec[] {
  const isJS = languageName.toLowerCase().includes('javascript')
  const isTS = languageName.toLowerCase().includes('typescript')

  const lessons: SectionSpec[] = [
    // INTRODUCTION (5 lessons)
    { title: `${languageName} HOME`, description: `${languageName} is the programming language of the Web. ${languageName} can update and change both HTML and CSS. ${languageName} can calculate, manipulate and validate data.`, syntax: 'script tag or .${isTS ? "ts" : "js"} files', usage: 'Create interactive web pages', code: isTS ? 'const message: string = "Hello World";\nconsole.log(message);' : 'const message = "Hello World";\nconsole.log(message);' },
    { title: `${languageName} Introduction`, description: `This page contains examples of what ${languageName} can do. ${languageName} can change HTML content, attribute values, styles (CSS), and can hide/show HTML elements.`, syntax: 'JavaScript statements', usage: 'Make web pages interactive', code: 'document.getElementById("demo").innerHTML = "Hello JavaScript";' },
    { title: `${languageName} Where To`, description: `${languageName} can be placed in the <body> or <head> section of an HTML page, or in external files. External scripts are practical when the same code is used in many different web pages.`, syntax: '<script> tag or <script src="">', usage: 'Include JavaScript in HTML', code: '<script src="myScript.js"></script>' },
    { title: `${languageName} Output`, description: `${languageName} can display data in different ways: innerHTML, document.write(), window.alert(), console.log(). Using innerHTML requires getElementById or querySelector to access an element.`, syntax: 'console.log(), innerHTML, alert()', usage: 'Display output', code: 'console.log("Hello World");\nalert("This is an alert");\ndocument.getElementById("demo").innerHTML = "Hello";' },
    { title: `${languageName} Statements`, description: `A JavaScript program is a list of programming statements. Statements are composed of values, operators, expressions, keywords, and comments. Statements are separated by semicolons.`, syntax: 'let x = 5; console.log(x);', usage: 'Write instructions', code: 'let x, y, z;\nx = 5;\ny = 6;\nz = x + y;\nconsole.log(z);' },

    // BASICS (25 lessons)
    { title: `${languageName} Syntax`, description: `JavaScript syntax is the set of rules for how programs are constructed. Values can be fixed (literals) or variable. Variables are containers for storing data values. Use let, const, or var to declare variables.`, syntax: 'let name = "John";', usage: 'Understand code structure', code: 'let x = 5;\nlet y = "Hello";\nconst PI = 3.14;' },
    { title: `${languageName} Comments`, description: `Code after double slashes // or between /* and */ is treated as a comment and will be ignored. Comments can explain code and make it more readable. Comments can also prevent execution when testing code.`, syntax: '// single line or /* multi line */', usage: 'Document your code', code: '// This is a single line comment\n/* This is\na multi-line\ncomment */\nlet x = 5; // Declaring a variable' },
    { title: `${languageName} Variables`, description: `Variables are containers for storing data. JavaScript has 3 ways to declare a variable: var, let, const. Always use const if the value should not be changed. Use let if you can't use const. Only use var if you must support old browsers.`, syntax: 'let x = 5; const y = 10;', usage: 'Store and manage data', code: isTS ? 'let name: string = "John";\nconst age: number = 30;\nlet isStudent: boolean = true;' : 'let name = "John";\nconst age = 30;\nlet isStudent = true;' },
    { title: `${languageName} Let`, description: `The let keyword was introduced in ES6 (2015). Variables defined with let cannot be redeclared. Variables defined with let must be declared before use. Variables defined with let have block scope.`, syntax: 'let x = 5;', usage: 'Declare block-scoped variables', code: 'let x = 10;\n{\n  let x = 2;\n  console.log(x); // 2\n}\nconsole.log(x); // 10' },
    { title: `${languageName} Const`, description: `The const keyword was introduced in ES6 (2015). Variables defined with const cannot be redeclared. Variables defined with const cannot be reassigned. Variables defined with const have block scope. Always use const when you declare a new Array, Object, Function, or RegExp.`, syntax: 'const PI = 3.14;', usage: 'Declare constants', code: 'const PI = 3.14159;\nconst person = {name: "John", age: 30};\nconst cars = ["Tesla", "Volvo", "BMW"];' },
    { title: `${languageName} Operators`, description: `JavaScript operators are used to perform operations on variables and values. Arithmetic operators (+, -, *, /, %, ++, --), assignment operators (=, +=, -=), comparison operators (==, ===, !=, !==, >, <), logical operators (&&, ||, !), and more.`, syntax: 'x = 5 + 2;', usage: 'Perform operations', code: 'let x = 10;\nlet y = 5;\nlet sum = x + y; // 15\nlet product = x * y; // 50\nlet isGreater = x > y; // true' },
    { title: `${languageName} Arithmetic`, description: `Arithmetic operators perform arithmetic on numbers (literals or variables). Operators include + (addition), - (subtraction), * (multiplication), / (division), % (modulus), ++ (increment), -- (decrement), ** (exponentiation).`, syntax: 'let x = 5 + 3;', usage: 'Perform math operations', code: 'let a = 10;\nlet b = 3;\nconsole.log(a + b); // 13\nconsole.log(a - b); // 7\nconsole.log(a * b); // 30\nconsole.log(a / b); // 3.333\nconsole.log(a % b); // 1\nconsole.log(a ** b); // 1000' },
    { title: `${languageName} Assignment`, description: `Assignment operators assign values to JavaScript variables. = assigns, += adds and assigns, -= subtracts and assigns, *= multiplies and assigns, /= divides and assigns, %= takes modulus and assigns.`, syntax: 'x += 5; // same as x = x + 5', usage: 'Assign values efficiently', code: 'let x = 10;\nx += 5; // x is now 15\nx -= 3; // x is now 12\nx *= 2; // x is now 24\nx /= 4; // x is now 6' },
    { title: `${languageName} Data Types`, description: `JavaScript has 8 data types: String, Number, Bigint, Boolean, Undefined, Null, Symbol, Object. The Object type includes Object, Array, Date. You can use typeof operator to find the data type.`, syntax: 'typeof "John" // Returns "string"', usage: 'Understand data types', code: isTS ? 'let str: string = "Hello";\nlet num: number = 42;\nlet bool: boolean = true;\nlet arr: number[] = [1, 2, 3];\nlet obj: {name: string} = {name: "John"};' : 'let str = "Hello";\nlet num = 42;\nlet bool = true;\nlet arr = [1, 2, 3];\nlet obj = {name: "John"};' },
    { title: `${languageName} Functions`, description: `A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes it (calls it). Functions can take parameters and return values.`, syntax: 'function name(params) { code }', usage: 'Reuse code blocks', code: 'function greet(name) {\n  return "Hello " + name;\n}\nconsole.log(greet("John")); // "Hello John"' },
    { title: `${languageName} Objects`, description: `JavaScript objects are containers for named values called properties. Objects are written with curly braces {}. Properties are written as name:value pairs, separated by commas. You can access properties using dot notation or bracket notation.`, syntax: 'const person = {name: "John", age: 30};', usage: 'Group related data', code: 'const car = {\n  brand: "Tesla",\n  model: "Model 3",\n  year: 2023,\n  drive: function() {\n    return "Driving...";\n  }\n};\nconsole.log(car.brand); // "Tesla"' },
    { title: `${languageName} Events`, description: `HTML events are "things" that happen to HTML elements. JavaScript can "react" to these events. Common events: onclick, onchange, onmouseover, onmouseout, onkeydown, onload. Use addEventListener to handle events.`, syntax: 'element.addEventListener("click", function)', usage: 'Respond to user actions', code: 'document.getElementById("myBtn").addEventListener("click", function() {\n  alert("Button clicked!");\n});' },
    { title: `${languageName} Strings`, description: `A JavaScript string is zero or more characters written inside quotes. You can use single or double quotes. Strings can be created as primitives or objects using new String(). Template literals use backticks and \${} for expressions.`, syntax: 'let text = "Hello World";', usage: 'Work with text', code: 'let name = "John";\nlet greeting = `Hello ${name}`;\nlet length = greeting.length;\nlet upper = greeting.toUpperCase();' },
    { title: `${languageName} String Methods`, description: `String methods help you work with strings. Common methods: length, slice(), substring(), substr(), replace(), toUpperCase(), toLowerCase(), concat(), trim(), padStart(), padEnd(), charAt(), charCodeAt(), split().`, syntax: 'str.toUpperCase()', usage: 'Manipulate strings', code: 'let text = "Hello World";\nconsole.log(text.length); // 11\nconsole.log(text.toUpperCase()); // "HELLO WORLD"\nconsole.log(text.slice(0, 5)); // "Hello"\nconsole.log(text.replace("World", "JS")); // "Hello JS"' },
    { title: `${languageName} String Search`, description: `JavaScript search methods: indexOf(), lastIndexOf(), search(), match(), matchAll(), includes(), startsWith(), endsWith(). These methods help you search for values in strings.`, syntax: 'str.indexOf("e")', usage: 'Find text in strings', code: 'let text = "Hello World";\nconsole.log(text.indexOf("World")); // 6\nconsole.log(text.includes("Hello")); // true\nconsole.log(text.startsWith("He")); // true\nconsole.log(text.endsWith("ld")); // true' },
    { title: `${languageName} Template Literals`, description: `Template Literals use back-ticks (\`\`) rather than quotes to define a string. With template literals, you can use both single and double quotes inside a string. Template literals allow multiline strings and string interpolation with \${}.`, syntax: '`Hello ${name}`', usage: 'Create dynamic strings', code: 'let name = "John";\nlet age = 30;\nlet text = `My name is ${name} and I am ${age} years old.`;\nlet multiline = `This is\na multiline\nstring`;' },
    { title: `${languageName} Numbers`, description: `JavaScript has only one type of number. Numbers can be written with or without decimals. Extra large or extra small numbers can be written with scientific (exponent) notation. JavaScript numbers are always 64-bit floating point.`, syntax: 'let x = 3.14;', usage: 'Work with numeric values', code: 'let x = 3.14;\nlet y = 3;\nlet z = 123e5; // 12300000\nlet w = 123e-5; // 0.00123' },
    { title: `${languageName} Number Methods`, description: `Number methods help you work with numbers. Common methods: toString(), toExponential(), toFixed(), toPrecision(), valueOf(). Global methods: Number(), parseFloat(), parseInt(). Number properties: MAX_VALUE, MIN_VALUE, POSITIVE_INFINITY, NaN.`, syntax: 'num.toFixed(2)', usage: 'Format and convert numbers', code: 'let num = 9.656;\nconsole.log(num.toFixed(2)); // "9.66"\nconsole.log(num.toString()); // "9.656"\nconsole.log(Number("10")); // 10\nconsole.log(parseInt("10.5")); // 10' },
    { title: `${languageName} Arrays`, description: `An array is a special variable that can hold more than one value. Arrays are written with square brackets []. Array elements are accessed using index numbers (starting from 0). Arrays are objects and can contain different data types.`, syntax: 'const arr = ["a", "b", "c"];', usage: 'Store multiple values', code: isTS ? 'const fruits: string[] = ["Apple", "Banana", "Orange"];\nconsole.log(fruits[0]); // "Apple"\nfruits.push("Mango");\nconsole.log(fruits.length); // 4' : 'const fruits = ["Apple", "Banana", "Orange"];\nconsole.log(fruits[0]); // "Apple"\nfruits.push("Mango");\nconsole.log(fruits.length); // 4' },
    { title: `${languageName} Array Methods`, description: `Array methods help you work with arrays. Common methods: push(), pop(), shift(), unshift(), concat(), slice(), splice(), toString(), join(). These methods either modify the original array or return a new array.`, syntax: 'arr.push("item")', usage: 'Manipulate arrays', code: 'const arr = [1, 2, 3];\narr.push(4); // [1, 2, 3, 4]\narr.pop(); // [1, 2, 3]\narr.shift(); // [2, 3]\narr.unshift(1); // [1, 2, 3]' },
    { title: `${languageName} Array Sort`, description: `The sort() method sorts an array alphabetically. reverse() reverses the elements. To sort numbers correctly, use a compare function. sort((a,b) => a - b) for ascending, sort((a,b) => b - a) for descending.`, syntax: 'arr.sort((a,b) => a - b)', usage: 'Order array elements', code: 'const numbers = [40, 100, 1, 5, 25];\nnumbers.sort((a,b) => a - b); // [1, 5, 25, 40, 100]\nconst fruits = ["Banana", "Orange", "Apple"];\nfruits.sort(); // ["Apple", "Banana", "Orange"]' },
    { title: `${languageName} Array Iteration`, description: `Array iteration methods operate on every array element: forEach() executes a function for each element, map() creates a new array from calling a function for every element, filter() creates a new array with elements that pass a test, reduce() reduces array to a single value, find() returns first element that passes a test, every() checks if all elements pass a test, some() checks if any element passes a test.`, syntax: 'arr.map(x => x * 2)', usage: 'Process array elements', code: 'const nums = [1, 2, 3, 4];\nconst doubled = nums.map(x => x * 2); // [2, 4, 6, 8]\nconst evens = nums.filter(x => x % 2 === 0); // [2, 4]\nconst sum = nums.reduce((acc, x) => acc + x, 0); // 10' },
    { title: `${languageName} Array Const`, description: `Arrays declared with const cannot be reassigned, but the elements can be changed. You can change an element, add an element, or remove an element. Const does not define a constant array, it defines a constant reference to an array.`, syntax: 'const arr = [1, 2, 3];', usage: 'Understand const with arrays', code: 'const cars = ["Tesla", "Volvo"];\ncars[0] = "BMW"; // OK\ncars.push("Audi"); // OK\n// cars = ["Toyota"]; // ERROR - cannot reassign' },
    { title: `${languageName} Dates`, description: `JavaScript Date objects represent a single moment in time. Date objects are created with new Date(). Dates can be created with: new Date(), new Date(year, month), new Date(milliseconds), new Date(date string).`, syntax: 'new Date()', usage: 'Work with dates and times', code: 'const now = new Date();\nconst birthday = new Date("2000-01-15");\nconst specific = new Date(2023, 0, 1); // Jan 1, 2023' },
    { title: `${languageName} Date Formats`, description: `JavaScript supports ISO 8601 date format (YYYY-MM-DD). Short dates use MM/DD/YYYY. Long dates use MMM DD YYYY. Dates can be input and output in different formats. ISO 8601 is the international standard.`, syntax: 'YYYY-MM-DD', usage: 'Format dates properly', code: 'const d1 = new Date("2023-03-25");\nconst d2 = new Date("03/25/2023");\nconst d3 = new Date("Mar 25 2023");' },
    { title: `${languageName} Date Get Methods`, description: `Date get methods return date values: getFullYear(), getMonth() (0-11), getDate() (1-31), getDay() (0-6), getHours(), getMinutes(), getSeconds(), getMilliseconds(), getTime() (milliseconds since Jan 1, 1970).`, syntax: 'date.getFullYear()', usage: 'Extract date components', code: 'const d = new Date();\nconst year = d.getFullYear();\nconst month = d.getMonth();\nconst day = d.getDate();\nconsole.log(`${year}-${month + 1}-${day}`);' },
    { title: `${languageName} Date Set Methods`, description: `Date set methods set date values: setFullYear(), setMonth(), setDate(), setHours(), setMinutes(), setSeconds(), setMilliseconds(), setTime(). All set methods modify the existing date object.`, syntax: 'date.setFullYear(2024)', usage: 'Modify dates', code: 'const d = new Date();\nd.setFullYear(2024);\nd.setMonth(11); // December\nd.setDate(25); // Christmas' },
    { title: `${languageName} Math`, description: `The Math object allows you to perform mathematical tasks. Math is not a constructor. All properties/methods of Math can be called by using Math as an object, without creating it.`, syntax: 'Math.PI, Math.round()', usage: 'Perform math operations', code: 'console.log(Math.PI); // 3.14159...\nconsole.log(Math.round(4.7)); // 5\nconsole.log(Math.pow(2, 3)); // 8\nconsole.log(Math.sqrt(16)); // 4' },
    { title: `${languageName} Random`, description: `Math.random() returns a random number between 0 (inclusive) and 1 (exclusive). To get random integers, use Math.floor(Math.random() * max). To get random integers between min and max, use Math.floor(Math.random() * (max - min + 1)) + min.`, syntax: 'Math.random()', usage: 'Generate random numbers', code: 'const random = Math.random(); // 0 to 0.999...\nconst dice = Math.floor(Math.random() * 6) + 1; // 1 to 6\nconst range = Math.floor(Math.random() * 100); // 0 to 99' },
    { title: `${languageName} Booleans`, description: `A JavaScript Boolean represents one of two values: true or false. Booleans are often used in conditional testing. Everything with a "value" is true, everything without a "value" is false (0, "", undefined, null, NaN, false).`, syntax: 'let x = true;', usage: 'Handle true/false values', code: 'let isActive = true;\nlet isEmpty = false;\nlet x = 10;\nconsole.log(x > 5); // true\nconsole.log(Boolean("")); // false\nconsole.log(Boolean("Hello")); // true' },

    // CONTROL FLOW (15 lessons)
    { title: `${languageName} Comparisons`, description: `Comparison operators compare two values and return a boolean. Operators: == (equal to), === (equal value and type), != (not equal), !== (not equal value or type), > (greater than), < (less than), >= (greater or equal), <= (less or equal).`, syntax: 'x === y', usage: 'Compare values', code: 'console.log(5 == "5"); // true (loose equality)\nconsole.log(5 === "5"); // false (strict equality)\nconsole.log(10 > 5); // true\nconsole.log(10 !== 5); // true' },
    { title: `${languageName} If Else`, description: `Use if to specify a block of code to be executed if a condition is true. Use else to specify a block of code to be executed if the condition is false. Use else if to specify a new condition if the first condition is false.`, syntax: 'if (condition) {} else {}', usage: 'Make decisions', code: 'let age = 18;\nif (age >= 18) {\n  console.log("Adult");\n} else if (age >= 13) {\n  console.log("Teenager");\n} else {\n  console.log("Child");\n}' },
    { title: `${languageName} Switch`, description: `The switch statement executes different actions based on different conditions. Use break to prevent the code from running into the next case. The default keyword specifies code to run if no case matches.`, syntax: 'switch(expression) { case x: ... }', usage: 'Handle multiple conditions', code: 'let day = 2;\nswitch(day) {\n  case 1: console.log("Monday"); break;\n  case 2: console.log("Tuesday"); break;\n  default: console.log("Other day");\n}' },
    { title: `${languageName} Loop For`, description: `Loops can execute a block of code a number of times. The for loop is often used when you know how many times you want to loop. Syntax: for (initialization; condition; increment) { code }`, syntax: 'for (let i = 0; i < 5; i++) {}', usage: 'Repeat code blocks', code: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n// Output: 0 1 2 3 4' },
    { title: `${languageName} Loop For In`, description: `The for...in loop iterates over the properties of an object. It should be used for objects, not arrays. For each property, the code block is executed.`, syntax: 'for (key in object) {}', usage: 'Iterate object properties', code: 'const person = {name: "John", age: 30, city: "NYC"};\nfor (let key in person) {\n  console.log(key + ": " + person[key]);\n}' },
    { title: `${languageName} Loop For Of`, description: `The for...of loop iterates over iterable objects (Arrays, Strings, Maps, Sets). It gives you direct access to values rather than indexes.`, syntax: 'for (value of iterable) {}', usage: 'Iterate array values', code: 'const fruits = ["Apple", "Banana", "Orange"];\nfor (let fruit of fruits) {\n  console.log(fruit);\n}\n// Output: Apple Banana Orange' },
    { title: `${languageName} Loop While`, description: `The while loop loops through a block of code as long as a specified condition is true. The do...while loop is a variant that executes the code block once before checking the condition.`, syntax: 'while (condition) {}', usage: 'Loop with conditions', code: 'let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}\n\nlet j = 0;\ndo {\n  console.log(j);\n  j++;\n} while (j < 3);' },
    { title: `${languageName} Break`, description: `The break statement "jumps out" of a loop. The continue statement "jumps over" one iteration in the loop. Break can also be used to jump out of a switch statement.`, syntax: 'break; continue;', usage: 'Control loop execution', code: 'for (let i = 0; i < 10; i++) {\n  if (i === 5) break; // stop at 5\n  if (i === 3) continue; // skip 3\n  console.log(i);\n}\n// Output: 0 1 2 4' },
    { title: `${languageName} Iterables`, description: `Iterables are objects that can be iterated over with for...of. Examples: String, Array, TypedArray, Map, Set. Objects are not iterables by default but can be made iterable by implementing the Symbol.iterator method.`, syntax: 'for (x of iterable) {}', usage: 'Work with iterable objects', code: 'const str = "Hello";\nfor (let char of str) {\n  console.log(char);\n}\n\nconst set = new Set([1, 2, 3]);\nfor (let num of set) {\n  console.log(num);\n}' },
    { title: `${languageName} Sets`, description: `A Set is a collection of unique values. Each value can only occur once in a Set. You can create a Set using new Set(). Common methods: add(), delete(), has(), clear(), forEach(). Use size property for the number of elements.`, syntax: 'new Set([values])', usage: 'Store unique values', code: 'const mySet = new Set([1, 2, 3, 3]);\nconsole.log(mySet.size); // 3\nmySet.add(4);\nmySet.delete(2);\nconsole.log(mySet.has(3)); // true' },
    { title: `${languageName} Maps`, description: `A Map holds key-value pairs where keys can be any datatype. A Map remembers the original insertion order of keys. Common methods: set(), get(), delete(), has(), clear(), forEach(). Use size property for the number of elements.`, syntax: 'new Map()', usage: 'Store key-value pairs', code: 'const map = new Map();\nmap.set("name", "John");\nmap.set(1, "one");\nconsole.log(map.get("name")); // "John"\nconsole.log(map.size); // 2' },
    { title: `${languageName} Typeof`, description: `The typeof operator returns the type of a variable or expression. Possible return values: "string", "number", "boolean", "undefined", "function", "object", "symbol", "bigint". Arrays and null return "object".`, syntax: 'typeof variable', usage: 'Check variable types', code: 'console.log(typeof "John"); // "string"\nconsole.log(typeof 42); // "number"\nconsole.log(typeof true); // "boolean"\nconsole.log(typeof {}); // "object"\nconsole.log(typeof []); // "object"' },
    { title: `${languageName} Type Conversion`, description: `JavaScript variables can be converted to a new variable and another data type by using a JavaScript function or automatically by JavaScript itself. Methods: String(), Number(), Boolean(). Unary + operator can also convert to number.`, syntax: 'Number("3.14")', usage: 'Convert between types', code: 'let num = String(123); // "123"\nlet str = Number("456"); // 456\nlet bool = Boolean(1); // true\nlet auto = "5" * "2"; // 10 (automatic conversion)' },
    { title: `${languageName} Bitwise`, description: `JavaScript bitwise operators work on 32-bit numbers. Any numeric operand is converted to a 32-bit number. Operators: & (AND), | (OR), ~ (NOT), ^ (XOR), << (left shift), >> (right shift), >>> (unsigned right shift).`, syntax: 'x & y', usage: 'Perform bitwise operations', code: 'console.log(5 & 1); // 1 (101 & 001 = 001)\nconsole.log(5 | 1); // 5 (101 | 001 = 101)\nconsole.log(5 ^ 1); // 4 (101 ^ 001 = 100)\nconsole.log(5 << 1); // 10 (1010)' },
    { title: `${languageName} RegExp`, description: `A regular expression is a sequence of characters that forms a search pattern. The pattern can be used for text search and text replace operations. Syntax: /pattern/modifiers. Common methods: test(), exec(), match(), replace(), search().`, syntax: '/pattern/flags', usage: 'Search and validate text', code: 'const pattern = /hello/i; // i = case-insensitive\nconsole.log(pattern.test("Hello World")); // true\nconst email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconsole.log(email.test("user@example.com")); // true' },

    // ADVANCED TOPICS (30 lessons)
    { title: `${languageName} Errors`, description: `The try statement lets you test a block of code for errors. The catch statement lets you handle the error. The throw statement lets you create custom errors. The finally statement executes code after try/catch regardless of the result.`, syntax: 'try {} catch(err) {} finally {}', usage: 'Handle errors gracefully', code: 'try {\n  let x = y + 1; // y is not defined\n} catch(err) {\n  console.log("Error: " + err.message);\n} finally {\n  console.log("Done");\n}' },
    { title: `${languageName} Scope`, description: `Scope determines the accessibility of variables. Block scope (let, const) limits variables to the block {}. Function scope (var) limits variables to the function. Global scope makes variables accessible everywhere.`, syntax: 'let (block), var (function)', usage: 'Understand variable accessibility', code: 'let globalVar = "global";\nfunction test() {\n  let functionVar = "function";\n  if (true) {\n    let blockVar = "block";\n    console.log(blockVar); // OK\n  }\n  // console.log(blockVar); // Error\n}' },
    { title: `${languageName} Hoisting`, description: `Hoisting is JavaScript\'s default behavior of moving declarations to the top. Variables declared with var are hoisted and initialized with undefined. Variables declared with let and const are hoisted but not initialized. Functions are fully hoisted.`, syntax: 'Function and var declarations', usage: 'Understand declaration behavior', code: 'console.log(x); // undefined (hoisted)\nvar x = 5;\n\n// Functions are fully hoisted\ngreet(); // Works!\nfunction greet() {\n  console.log("Hello");\n}\n\n// let/const are not initialized when hoisted\n// console.log(y); // Error\nlet y = 10;' },
    { title: `${languageName} Strict Mode`, description: `"use strict"; defines that JavaScript code should be executed in "strict mode". Strict mode makes it easier to write secure JavaScript. It changes silent errors into throw errors and fixes mistakes that make it difficult for JavaScript engines to perform optimizations.`, syntax: '"use strict";', usage: 'Write safer code', code: '"use strict";\n// x = 3.14; // Error: x is not defined\nlet x = 3.14; // Must declare variables\n\nfunction test() {\n  "use strict";\n  // y = 10; // Error in this function only\n}' },
    { title: `${languageName} this Keyword`, description: `The this keyword refers to different objects depending on how it is used. In a method, this refers to the owner object. Alone, this refers to the global object. In a function, this refers to the global object (undefined in strict mode). In an event, this refers to the element that received the event.`, syntax: 'this.property', usage: 'Reference current context', code: 'const person = {\n  name: "John",\n  greet: function() {\n    console.log("Hello " + this.name);\n  }\n};\nperson.greet(); // "Hello John"' },
    { title: `${languageName} Arrow Function`, description: `Arrow functions were introduced in ES6. Arrow functions provide a shorter syntax for writing function expressions. They do not have their own this binding. They are not suited for call, apply and bind methods. They cannot be used as constructors.`, syntax: '() => {}', usage: 'Write concise functions', code: 'const add = (a, b) => a + b;\nconst square = x => x * x;\nconst greet = () => console.log("Hello");\n\nconst nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2);' },
    { title: `${languageName} Classes`, description: `JavaScript classes are templates for JavaScript objects. Use the class keyword to create a class. Always add a constructor() method. Classes have methods and properties. Use extends to create a class inheritance. Use super to call parent constructor.`, syntax: 'class Name { constructor() {} }', usage: 'Create object templates', code: isTS ? 'class Person {\n  name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n  greet() {\n    return `Hello ${this.name}`;\n  }\n}\nconst p = new Person("John");' : 'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hello ${this.name}`;\n  }\n}\nconst p = new Person("John");' },
    { title: `${languageName} Modules`, description: `JavaScript modules allow you to break up your code into separate files. Modules make it easier to maintain code. Modules are imported using import statement and exported using export or export default. Modules work only with HTTP(s) protocol.`, syntax: 'export, import', usage: 'Organize code into files', code: '// math.js\nexport const PI = 3.14;\nexport function add(a, b) {\n  return a + b;\n}\n\n// app.js\nimport { PI, add } from "./math.js";\nconsole.log(add(2, 3));' },
    { title: `${languageName} JSON`, description: `JSON is a format for storing and transporting data. JSON is often used when data is sent from a server to a web page. JSON syntax is derived from JavaScript object notation but is text only. Use JSON.parse() to convert text to object. Use JSON.stringify() to convert object to text.`, syntax: 'JSON.parse(), JSON.stringify()', usage: 'Work with JSON data', code: 'const obj = {name: "John", age: 30};\nconst json = JSON.stringify(obj); // \'{"name":"John","age":30}\'\nconst parsed = JSON.parse(json); // {name: "John", age: 30}' },
    { title: `${languageName} Debugging`, description: `Debugging is the process of finding and fixing errors. Use console.log() to print values. Use debugger; statement to set breakpoints. Use browser developer tools to step through code. Use try...catch to handle runtime errors.`, syntax: 'console.log(), debugger;', usage: 'Find and fix bugs', code: 'function calculateSum(a, b) {\n  console.log("Calculating:", a, b);\n  debugger; // Execution will pause here\n  return a + b;\n}\ncalculateSum(5, 3);' },
    { title: `${languageName} Style Guide`, description: `Coding conventions are style guidelines for programming. Good coding conventions improve code quality, readability, and maintainability. Use meaningful names, consistent spacing, proper indentation, avoid global variables, use === instead of ==, always end statements with semicolon.`, syntax: 'Coding best practices', usage: 'Write clean code', code: '// Good\nconst MAX_USERS = 100;\nfunction getUserName(userId) {\n  return users[userId].name;\n}\n\n// Bad\nconst m = 100;\nfunction g(u) {\n  return users[u].name;\n}' },
    { title: `${languageName} Best Practices`, description: `Best practices for JavaScript: Avoid global variables, always declare local variables, declare variables at the top, initialize variables, never declare numbers, strings, or booleans as objects, use === for comparison, use default parameter values, end switches with defaults, avoid using eval().`, syntax: 'Code quality guidelines', usage: 'Write better code', code: 'function greet(name = "Guest") { // default parameter\n  return `Hello ${name}`;\n}\n\nconst nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2); // functional approach' },
    { title: `${languageName} Mistakes`, description: `Common JavaScript mistakes: accidentally using = instead of ==, expecting loose comparison, confusing addition and concatenation, misunderstanding floats, breaking a return statement, accessing arrays with named indexes, ending definitions with semicolon, misunderstanding block scope.`, syntax: 'Common pitfalls', usage: 'Avoid common errors', code: '// Mistake: loose equality\nif (x == "5") {} // Avoid this\nif (x === "5") {} // Use this\n\n// Mistake: concatenation\nlet x = 10 + 5 + "5"; // "155" not "205"\n\n// Mistake: block scope\nfor (var i = 0; i < 3; i++) {}\nconsole.log(i); // 3 (leaked)\n\nfor (let j = 0; j < 3; j++) {}\n// console.log(j); // Error (block scoped)' },
    { title: `${languageName} Performance`, description: `Tips to improve JavaScript performance: Reduce DOM access, reduce DOM size, avoid unnecessary variables, delay JavaScript loading, avoid using with, reduce loops, use shorter notation, minimize use of global variables, batch DOM changes, use event delegation.`, syntax: 'Optimization techniques', usage: 'Make code faster', code: '// Slow: multiple DOM access\nfor (let i = 0; i < 100; i++) {\n  document.getElementById("demo").innerHTML += i;\n}\n\n// Fast: batch DOM changes\nlet html = "";\nfor (let i = 0; i < 100; i++) {\n  html += i;\n}\ndocument.getElementById("demo").innerHTML = html;' },
    { title: `${languageName} Reserved Words`, description: `In JavaScript you cannot use reserved words as variable names. Reserved words (keywords) are words that are part of the JavaScript language. Examples: break, case, catch, class, const, continue, debugger, default, delete, do, else, export, extends, finally, for, function, if, import, in, instanceof, let, new, return, super, switch, this, throw, try, typeof, var, void, while, with, yield.`, syntax: 'Language keywords', usage: 'Avoid naming conflicts', code: '// Invalid\n// let class = "Math"; // Error\n// let function = 5; // Error\n\n// Valid\nlet className = "Math";\nlet myFunction = 5;' },
    { title: `${languageName} Callback Functions`, description: `A callback is a function passed as an argument to another function. This technique allows a function to call another function. Callbacks are commonly used in asynchronous operations like setTimeout, event handlers, and array methods.`, syntax: 'function(callback) { callback() }', usage: 'Execute code later', code: 'function processData(data, callback) {\n  console.log("Processing...");\n  callback(data);\n}\n\nprocessData("test", (result) => {\n  console.log("Done:", result);\n});' },
    { title: `${languageName} Asynchronous`, description: `Functions running in parallel with other functions are called asynchronous. Examples of asynchronous operations: setTimeout, setInterval, Promises, async/await, fetch API. Asynchronous programming allows you to perform long-running tasks without blocking the main thread.`, syntax: 'setTimeout, async/await', usage: 'Handle delayed operations', code: 'console.log("Start");\nsetTimeout(() => {\n  console.log("Delayed");\n}, 1000);\nconsole.log("End");\n// Output: Start, End, Delayed' },
    { title: `${languageName} Promises`, description: `A Promise is an object representing the eventual completion or failure of an asynchronous operation. Promises have three states: pending, fulfilled, rejected. Use .then() for success, .catch() for errors, .finally() for cleanup.`, syntax: 'new Promise((resolve, reject) => {})', usage: 'Handle async operations', code: 'const promise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve("Success!");\n  }, 1000);\n});\n\npromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));' },
    { title: `${languageName} Async/Await`, description: `Async/await makes asynchronous code look synchronous. The async keyword before a function makes it return a Promise. The await keyword can only be used inside async functions and makes JavaScript wait for a Promise to resolve.`, syntax: 'async function, await', usage: 'Write cleaner async code', code: 'async function fetchData() {\n  try {\n    const response = await fetch("/api/data");\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error("Error:", error);\n  }\n}\n\nfetchData();' },
    { title: `${languageName} Fetch API`, description: `The Fetch API provides a JavaScript interface for accessing and manipulating HTTP requests and responses. fetch() returns a Promise. Use .then() or async/await to handle the response. Response methods: .json(), .text(), .blob(), .formData().`, syntax: 'fetch(url, options)', usage: 'Make HTTP requests', code: 'fetch("https://api.example.com/users")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));\n\n// With async/await\nconst data = await fetch("/api/users").then(r => r.json());' },
    { title: `${languageName} Destructuring`, description: `Destructuring assignment syntax makes it possible to unpack values from arrays or properties from objects into distinct variables. Works with arrays and objects. Supports default values and nested destructuring.`, syntax: 'const {x, y} = obj', usage: 'Extract values easily', code: 'const person = {name: "John", age: 30, city: "NYC"};\nconst {name, age} = person;\n\nconst colors = ["red", "green", "blue"];\nconst [first, second] = colors;\n\nconst {name: userName = "Guest"} = {}; // default value' },
    { title: `${languageName} Spread Operator`, description: `The spread operator (...) expands an iterable into more elements. It can be used to copy arrays, combine arrays, pass array elements as function arguments, copy objects, and merge objects.`, syntax: '...array, ...object', usage: 'Expand and copy collections', code: 'const arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]\n\nconst obj1 = {a: 1, b: 2};\nconst obj2 = {...obj1, c: 3}; // {a:1, b:2, c:3}\n\nMath.max(...arr1); // 3' },
    { title: `${languageName} Rest Parameters`, description: `Rest parameter syntax allows a function to accept an indefinite number of arguments as an array. The rest parameter must be the last parameter in the function definition. It is prefixed with three dots (...).`, syntax: 'function(...args) {}', usage: 'Handle variable arguments', code: 'function sum(...numbers) {\n  return numbers.reduce((acc, num) => acc + num, 0);\n}\n\nconsole.log(sum(1, 2, 3, 4, 5)); // 15' },
    { title: `${languageName} Object Methods`, description: `Object methods for working with objects: Object.keys() returns array of keys, Object.values() returns array of values, Object.entries() returns array of [key, value] pairs, Object.assign() copies properties, Object.freeze() prevents modifications, Object.seal() prevents adding/removing properties.`, syntax: 'Object.keys(obj)', usage: 'Manipulate objects', code: 'const person = {name: "John", age: 30};\nconsole.log(Object.keys(person)); // ["name", "age"]\nconsole.log(Object.values(person)); // ["John", 30]\nconsole.log(Object.entries(person)); // [["name","John"], ["age",30]]' },
    { title: `${languageName} Default Parameters`, description: `Function parameters can have default values. If no argument is provided or undefined is passed, the default value is used. Default parameters allow named parameters to be initialized with default values if no value or undefined is passed.`, syntax: 'function(param = defaultValue) {}', usage: 'Set parameter defaults', code: 'function greet(name = "Guest", greeting = "Hello") {\n  return `${greeting}, ${name}!`;\n}\n\nconsole.log(greet()); // "Hello, Guest!"\nconsole.log(greet("John")); // "Hello, John!"\nconsole.log(greet("John", "Hi")); // "Hi, John!"' },
    { title: `${languageName} Closures`, description: `A closure is a function having access to the parent scope, even after the parent function has closed. JavaScript variables can belong to the local or global scope. Closures make it possible to have private variables.`, syntax: 'Nested function access', usage: 'Create private variables', code: 'function counter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst c = counter();\nc.increment(); // 1\nc.increment(); // 2\nconsole.log(c.getCount()); // 2' },
    { title: `${languageName} Higher Order Functions`, description: `A higher-order function is a function that takes a function as an argument or returns a function. Common examples: map(), filter(), reduce(), forEach(), find(), some(), every(). Higher-order functions enable functional programming patterns.`, syntax: 'function(fn) { fn() }', usage: 'Compose functions', code: 'const numbers = [1, 2, 3, 4, 5];\n\nconst doubled = numbers.map(x => x * 2);\nconst evens = numbers.filter(x => x % 2 === 0);\nconst sum = numbers.reduce((acc, x) => acc + x, 0);\n\nfunction withLogging(fn) {\n  return function(...args) {\n    console.log("Calling function");\n    return fn(...args);\n  };\n}' },
    { title: `${languageName} Symbol`, description: `Symbol is a primitive data type introduced in ES6. Every Symbol value is unique and immutable. Symbols are often used to add unique property keys to objects that won't collide with keys any other code might add. Create symbols with Symbol().`, syntax: 'Symbol(description)', usage: 'Create unique identifiers', code: 'const id = Symbol("id");\nconst user = {\n  name: "John",\n  [id]: 123\n};\n\nconsole.log(user[id]); // 123\nconsole.log(user.id); // undefined' },
    { title: `${languageName} Getters and Setters`, description: `Getters and setters allow you to define Object Accessors (computed properties). A getter is a method that gets the value of a specific property. A setter is a method that sets the value of a specific property. Use get and set keywords.`, syntax: 'get propName() {}, set propName(val) {}', usage: 'Control property access', code: 'const person = {\n  firstName: "John",\n  lastName: "Doe",\n  get fullName() {\n    return `${this.firstName} ${this.lastName}`;\n  },\n  set fullName(value) {\n    const [first, last] = value.split(" ");\n    this.firstName = first;\n    this.lastName = last;\n  }\n};\n\nconsole.log(person.fullName); // "John Doe"\nperson.fullName = "Jane Smith";\nconsole.log(person.firstName); // "Jane"' },
    { title: `${languageName} Proxy`, description: `A Proxy object wraps another object and intercepts operations like property lookup, assignment, enumeration, function invocation, etc. Proxies enable meta-programming in JavaScript. Use new Proxy(target, handler) to create a proxy.`, syntax: 'new Proxy(target, handler)', usage: 'Intercept object operations', code: 'const user = {name: "John", age: 30};\n\nconst proxy = new Proxy(user, {\n  get(target, prop) {\n    console.log(`Getting ${prop}`);\n    return target[prop];\n  },\n  set(target, prop, value) {\n    console.log(`Setting ${prop} to ${value}`);\n    target[prop] = value;\n    return true;\n  }\n});\n\nproxy.name; // "Getting name"' },
    { title: `${languageName} WeakMap and WeakSet`, description: `WeakMap is a collection of key-value pairs where keys must be objects and are held weakly. WeakSet is a collection of objects held weakly. "Weakly held" means if there are no other references to an object stored in WeakMap/WeakSet, it can be garbage collected.`, syntax: 'new WeakMap(), new WeakSet()', usage: 'Store weak references', code: 'const wm = new WeakMap();\nlet obj = {data: "important"};\nwm.set(obj, "metadata");\nconsole.log(wm.get(obj)); // "metadata"\n\nconst ws = new WeakSet();\nws.add(obj);\nconsole.log(ws.has(obj)); // true' },
  ]

  // Add TypeScript-specific lessons if needed
  if (isTS) {
    lessons.push(
      { title: 'TypeScript Basics', description: 'TypeScript is a superset of JavaScript that adds static types. Types help catch errors at compile time. Use type annotations with : to specify types. Common types: string, number, boolean, any, void, null, undefined, never.', syntax: 'let name: string = "John";', usage: 'Add type safety', code: 'let age: number = 30;\nlet isActive: boolean = true;\nlet values: number[] = [1, 2, 3];\nlet tuple: [string, number] = ["John", 30];' },
      { title: 'TypeScript Interfaces', description: 'Interfaces define the structure of objects. They specify what properties an object should have and their types. Interfaces support optional properties with ?, readonly properties, and index signatures.', syntax: 'interface Name { prop: type }', usage: 'Define object shapes', code: 'interface User {\n  id: number;\n  name: string;\n  email?: string;\n  readonly createdAt: Date;\n}\n\nconst user: User = {\n  id: 1,\n  name: "John",\n  createdAt: new Date()\n};' },
      { title: 'TypeScript Types', description: 'Type aliases create custom types. Union types allow multiple types with |. Intersection types combine types with &. Literal types restrict values to specific literals. Use type keyword to define custom types.', syntax: 'type Name = string | number;', usage: 'Create custom types', code: 'type ID = string | number;\ntype Status = "active" | "inactive";\ntype Point = { x: number; y: number };\n\nlet userId: ID = "abc123";\nlet status: Status = "active";' },
      { title: 'TypeScript Generics', description: 'Generics create reusable components that work with multiple types. Use angle brackets <T> to define type parameters. Generics work with functions, interfaces, classes, and type aliases.', syntax: 'function name<T>(param: T): T {}', usage: 'Write type-safe reusable code', code: 'function identity<T>(arg: T): T {\n  return arg;\n}\n\nlet output = identity<string>("Hello");\n\ninterface Box<T> {\n  value: T;\n}\n\nlet box: Box<number> = { value: 123 };' },
      { title: 'TypeScript Advanced Types', description: 'Advanced type features: mapped types transform properties, conditional types (T extends U ? X : Y), utility types (Partial, Required, Readonly, Pick, Omit, Record), template literal types.', syntax: 'Partial<T>, Pick<T, K>', usage: 'Use advanced type features', code: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ntype PartialUser = Partial<User>;\ntype UserName = Pick<User, "id" | "name">;\ntype UserWithoutEmail = Omit<User, "email">;' }
    )
  }

  return lessons
}

// Node.js backend with rich API examples (40 topics)
function nodeBackendSpecs(languageName: string): SectionSpec[] {
  const topics: SectionSpec[] = [
    { title: `${languageName} Backend HOME`, description: `Use ${languageName} to build APIs, services, and jobs with routing, validation, persistence, and observability.`, syntax: 'HTTP handlers, routing', usage: 'Serve data', code: 'import express from "express"; const app = express(); app.get("/health", (_req,res)=>res.json({ok:true}));' },
    { title: 'Project Setup', description: 'Init package, TypeScript, ts-node, nodemon.', syntax: 'npm init -y, tsconfig', usage: 'Bootstrap API', code: 'npm install express zod typescript ts-node -D' },
    { title: 'App Structure', description: 'Feature-based folders for routes, controllers, services.', syntax: 'routes/, controllers/', usage: 'Organization', code: 'src/routes/user.routes.ts' },
    { title: 'Routing Basics', description: 'Express routers for CRUD endpoints.', syntax: 'router.get/post/put/delete', usage: 'Expose resources', code: 'router.get("/users", listUsers)' },
    { title: 'Controllers', description: 'Thin controllers delegating to services.', syntax: '(req,res) handlers', usage: 'Separation of concerns', code: 'export async function createUser(req,res){ const user = await svc.create(req.body); res.status(201).json(user); }' },
    { title: 'Middleware', description: 'JSON parsing, CORS, logging, compression.', syntax: 'app.use()', usage: 'Cross-cutting concerns', code: 'app.use(express.json()); app.use(cors());' },
    { title: 'Validation', description: 'Validate payloads with zod/yup and return 400 on failure.', syntax: 'schema.safeParse', usage: 'Trust boundaries', code: 'const parsed = schema.safeParse(req.body); if(!parsed.success) return res.status(400).json(parsed.error);' },
    { title: 'Error Handling', description: 'Central error middleware with problem+json responses.', syntax: 'app.use((err,req,res,next)=>{})', usage: 'Consistent errors', code: 'res.status(500).json({ message: err.message })' },
    { title: 'Logging', description: 'Structured logs with pino/winston; include correlation ids.', syntax: 'logger.info({ route })', usage: 'Traceability', code: 'logger.info({ route: req.path, user: req.user?.id })' },
    { title: 'Env and Config', description: 'dotenv, config defaults, schema validation.', syntax: 'process.env, zod', usage: 'Safe config', code: 'const Config = z.object({ PORT: z.string() }).parse(process.env);' },
    { title: 'Persistence with ORM', description: 'Use Prisma/TypeORM/Drizzle for DB access.', syntax: 'prisma.user.findMany', usage: 'Store data', code: 'const users = await prisma.user.findMany();' },
    { title: 'Migrations', description: 'Schema migrations and rollback plans.', syntax: 'prisma migrate deploy', usage: 'Evolve schema', code: 'npx prisma migrate dev --name init' },
    { title: 'CRUD Patterns', description: 'Create, list, detail, update, delete with pagination.', syntax: 'limit/offset, cursor', usage: 'Resource ops', code: 'router.get("/posts", paginatedList)' },
    { title: 'Filtering and Sorting', description: 'Query params for filters and sorts; validate.', syntax: 'req.query', usage: 'Flexible APIs', code: 'const { sort="-createdAt" } = req.query;' },
    { title: 'Pagination', description: 'Cursor or offset pagination with metadata.', syntax: 'limit, offset, nextCursor', usage: 'Scalable lists', code: 'return { data, nextCursor }' },
    { title: 'Authentication (Sessions)', description: 'Cookie/session auth with secure flags.', syntax: 'express-session', usage: 'Stateful auth', code: 'app.use(session({ secret, cookie: { httpOnly: true, secure: true } }))' },
    { title: 'Authentication (JWT)', description: 'Stateless auth with JWT access/refresh tokens.', syntax: 'jwt.sign/verify', usage: 'Token auth', code: 'const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "15m" })' },
    { title: 'Authorization', description: 'Role and permission checks in middleware.', syntax: 'req.user.roles', usage: 'Least privilege', code: 'if(!req.user?.roles.includes("admin")) return res.sendStatus(403)' },
    { title: 'Password Security', description: 'Hash with bcrypt/argon2, salts, pepper.', syntax: 'bcrypt.hash', usage: 'Protect credentials', code: 'const hash = await bcrypt.hash(password, 12)' },
    { title: 'API Contracts', description: 'OpenAPI/Swagger docs for endpoints.', syntax: 'swagger-ui-express', usage: 'Discoverability', code: 'app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec))' },
    { title: 'Response Shaping', description: 'DTOs/serializers to control output.', syntax: 'map entity to view', usage: 'Clean contracts', code: 'return { id: user.id, email: user.email }' },
    { title: 'File Uploads', description: 'Handle multipart uploads with limits and scanning.', syntax: 'multer', usage: 'Receive files', code: 'const upload = multer({ limits: { fileSize: 5_000_000 } })' },
    { title: 'Static Assets', description: 'Serve static files with caching headers.', syntax: 'express.static', usage: 'Assets', code: 'app.use("/public", express.static("public", { maxAge: "1d" }))' },
    { title: 'Caching', description: 'In-memory/Redis caching, cache keys, TTL.', syntax: 'redis.get/set', usage: 'Lower latency', code: 'await redis.set("user:1", JSON.stringify(user), { EX: 300 })' },
    { title: 'Rate Limiting', description: 'Protect APIs with token bucket/sliding window.', syntax: 'rate-limit middleware', usage: 'Abuse prevention', code: 'app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }))' },
    { title: 'CORS and Security Headers', description: 'Set CORS policy, Helmet headers.', syntax: 'cors(), helmet()', usage: 'Harden surface', code: 'app.use(helmet()); app.use(cors({ origin: allowed }))' },
    { title: 'Background Jobs', description: 'Queues for email, billing, reports.', syntax: 'bullmq/agenda', usage: 'Async tasks', code: 'queue.add("send-email", { userId })' },
    { title: 'Scheduling', description: 'Cron jobs for maintenance and reports.', syntax: 'node-cron', usage: 'Timed tasks', code: 'cron.schedule("0 2 * * *", nightlyJob)' },
    { title: 'WebSockets/Realtime', description: 'Socket.io or ws for realtime features.', syntax: 'io.on("connection")', usage: 'Live updates', code: 'io.on("connection", socket => { socket.emit("hello") })' },
    { title: 'GraphQL or tRPC', description: 'Alternate API styles for contracts.', syntax: 'graphql schema, tRPC routers', usage: 'Fit to needs', code: '// define schema or router' },
    { title: 'Testing (Unit)', description: 'Test services with Vitest/Jest.', syntax: 'describe/test', usage: 'Correctness', code: 'expect(service.sum(1,1)).toBe(2)' },
    { title: 'Testing (Integration)', description: 'Supertest against HTTP server.', syntax: 'supertest(app)', usage: 'Endpoint coverage', code: 'await request(app).get("/health").expect(200)' },
    { title: 'Testing (E2E)', description: 'Playwright/Cypress for flows.', syntax: 'browser tests', usage: 'User confidence', code: '// run e2e on staging' },
    { title: 'Monitoring and Metrics', description: 'Expose health, readiness, metrics.', syntax: '/health, /ready, /metrics', usage: 'Ops visibility', code: 'app.get("/health", (_req,res)=>res.json({ ok:true }))' },
    { title: 'Tracing', description: 'OpenTelemetry tracing for services.', syntax: 'otel sdk', usage: 'Request visibility', code: '// configure OTEL exporter' },
    { title: 'Performance Tuning', description: 'Profiling, clustering, connection pooling.', syntax: 'node --prof, cluster', usage: 'Handle load', code: 'if(cluster.isPrimary){ /* fork */ }' },
    { title: 'Streaming and SSE', description: 'Use streams for large payloads, Server-Sent Events.', syntax: 'res.write, res.flushHeaders', usage: 'Progressive responses', code: 'res.write("data: hello\\n\\n")' },
    { title: 'Deployments', description: 'Dockerfile, docker-compose, cloud run options.', syntax: 'docker build/run', usage: 'Ship to prod', code: 'FROM node:20-alpine\nCMD ["node","dist/index.js"]' },
    { title: 'CI/CD', description: 'Automate lint, test, build, deploy.', syntax: 'GitHub Actions', usage: 'Quality gates', code: 'name: api-ci\non: [push]' },
    { title: 'Chaos and Resilience', description: 'Timeouts, retries, circuit breakers.', syntax: 'AbortController, backoff', usage: 'Stability', code: 'const controller = new AbortController(); setTimeout(()=>controller.abort(),5000);' },
    { title: 'Documentation and Onboarding', description: 'README, run scripts, env samples.', syntax: 'docs + scripts', usage: 'Team speed', code: 'npm run dev\nnpm run lint' },
  ]
  return topics
}

// Backend generic (non-Node)
function backendSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} Backend HOME`, description: `Use ${languageName} to build APIs, services, and jobs.`, syntax: 'HTTP handlers, routing', usage: 'Serve data', code: 'app.get("/health", (_req,res)=>res.json({ok:true}))' },
    { title: 'Routing and Controllers', description: 'Group endpoints by resource with clear handlers.', syntax: 'GET/POST/PUT/DELETE', usage: 'API surface', code: 'router.post("/users", createUser)' },
    { title: 'Middleware and Parsing', description: 'Handle JSON, CORS, logging, and errors centrally.', syntax: 'app.use()', usage: 'Cross-cutting concerns', code: 'app.use(express.json())' },
    { title: 'Validation', description: 'Validate payloads with schemas; reject bad input.', syntax: 'zod.safeParse, joi', usage: 'Trust boundaries', code: 'schema.parse(req.body)' },
    { title: 'Data Access', description: 'Connect to databases with parameterized queries or ORMs.', syntax: 'SQL/ORM', usage: 'Persist data', code: 'await db.insert({ table: "users", values: { email } })' },
    { title: 'Authentication and Authorization', description: 'Sessions, JWTs, and role-based access.', syntax: 'cookies, headers, roles', usage: 'Secure endpoints', code: 'if(!req.user) return res.status(401).end()' },
    { title: 'Caching and Performance', description: 'Use Redis or in-memory caching for hot paths.', syntax: 'GET/SET with TTL', usage: 'Reduce latency', code: 'await cache.set("user:1", json, 60)' },
    { title: 'Background Jobs', description: 'Queues for email, billing, or heavy work.', syntax: 'workers, queues', usage: 'Async tasks', code: 'queue.add("send-email", payload)' },
    { title: 'Testing', description: 'Test routes and services with supertest or similar.', syntax: 'supertest, mocks', usage: 'Prevent regressions', code: 'await request(app).get("/health").expect(200)' },
    { title: 'Observability', description: 'Log structure, trace requests, and expose metrics.', syntax: 'structured logs, tracing', usage: 'Operate safely', code: 'logger.info({ route: req.path })' },
    { title: 'Deployment', description: 'Containerize, configure env vars, and run migrations.', syntax: 'Dockerfile, env', usage: 'Ship to prod', code: 'FROM node:20-alpine' },
    { title: 'Mini Project', description: 'CRUD API with auth, validation, and persistence.', syntax: 'routes + db', usage: 'Apply backend skills', code: 'app.listen(3000)' },
  ]
}

// Java Backend (Spring Boot)
function javaBackendSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} Backend HOME`, description: 'Java with Spring Boot builds enterprise APIs with strong typing, DI, and rich ecosystem.', syntax: '@RestController, @Service', usage: 'Build REST APIs', code: '@RestController\npublic class HealthController {\n  @GetMapping("/health")\n  public Map<String, Boolean> health() {\n    return Map.of("ok", true);\n  }\n}' },
    { title: 'Project Setup', description: 'Spring Initializr with Web, JPA, and validation.', syntax: 'Spring Initializr, Maven/Gradle', usage: 'Bootstrap app', code: '// Use start.spring.io' },
    { title: 'Controllers and Routes', description: 'Use @RestController with @GetMapping, @PostMapping.', syntax: '@GetMapping, @PostMapping', usage: 'Define endpoints', code: '@PostMapping("/users")\npublic User create(@RequestBody User user) { return service.save(user); }' },
    { title: 'Dependency Injection', description: 'Autowire services and repositories with Spring.', syntax: '@Autowired, @Service', usage: 'Loose coupling', code: '@Autowired\nprivate UserService userService;' },
    { title: 'Data Access (JPA)', description: 'Use Spring Data JPA for database operations.', syntax: 'JpaRepository, @Entity', usage: 'Persist data', code: 'public interface UserRepo extends JpaRepository<User, Long> {}' },
    { title: 'Validation', description: 'Bean Validation with @Valid and constraints.', syntax: '@Valid, @NotNull', usage: 'Input safety', code: '@PostMapping("/users")\npublic User create(@Valid @RequestBody User user) {}' },
    { title: 'Exception Handling', description: '@ControllerAdvice for global error handling.', syntax: '@ControllerAdvice, @ExceptionHandler', usage: 'Centralized errors', code: '@ExceptionHandler(Exception.class)\npublic ResponseEntity<String> handle(Exception e) {}' },
    { title: 'Authentication', description: 'Spring Security for JWT or session auth.', syntax: 'Spring Security, JWT', usage: 'Secure APIs', code: '// Configure HttpSecurity' },
    { title: 'Testing', description: 'JUnit 5 and MockMvc for testing.', syntax: '@SpringBootTest, MockMvc', usage: 'Test endpoints', code: '@Test\npublic void testHealth() { mockMvc.perform(get("/health")).andExpect(status().isOk()); }' },
    { title: 'Configuration', description: 'application.properties or YAML for settings.', syntax: 'application.yml, @Value', usage: 'Configure app', code: '@Value("${app.name}")\nprivate String appName;' },
    { title: 'Caching', description: '@Cacheable for method-level caching.', syntax: '@Cacheable, @EnableCaching', usage: 'Speed up reads', code: '@Cacheable("users")\npublic User findById(Long id) {}' },
    { title: 'Mini Project', description: 'REST API with CRUD, validation, and database.', syntax: 'Spring Boot + JPA', usage: 'Apply Java backend', code: '// Task API' },
  ]
}

// Go Backend
function goBackendSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} HOME`,
      description: 'Go is a statically typed, compiled programming language designed at Google. It is known for its simplicity, efficiency, and excellent support for concurrent programming. Go is perfect for building scalable web servers, APIs, microservices, and cloud-native applications.',
      syntax: 'package main\nimport "fmt"\nfunc main() { }',
      usage: 'Build fast, reliable, and efficient server-side applications',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, Go!")\n}'
    },
    {
      title: 'Introduction',
      description: 'Go (Golang) was created by Robert Griesemer, Rob Pike, and Ken Thompson at Google in 2007. It combines the efficiency of compiled languages with the ease of programming of interpreted languages. Go features garbage collection, built-in concurrency support, and a robust standard library.',
      syntax: 'Simple, C-like syntax',
      usage: 'Understand Go\'s design philosophy and use cases',
      code: '// Go is designed for:\n// - Web servers and APIs\n// - Cloud services\n// - Command-line tools\n// - DevOps and networking\n// - Distributed systems'
    },
    {
      title: 'Get Started',
      description: 'To start with Go, download and install it from golang.org. Set up your GOPATH and create your first Go program. Use "go run" to execute programs and "go build" to compile them.',
      syntax: 'go run filename.go\ngo build filename.go',
      usage: 'Install Go and run your first program',
      code: '// Install: https://golang.org/dl/\n// Verify installation:\n// go version\n\n// Run a program:\n// go run main.go\n\n// Build executable:\n// go build main.go'
    },
    {
      title: 'Syntax',
      description: 'Go syntax is clean and straightforward. Programs start with a package declaration, followed by imports, then declarations. Statements end without semicolons (automatically inserted). Curly braces define blocks. Go uses camelCase for naming.',
      syntax: 'package main\nimport "fmt"\nfunc main() { }',
      usage: 'Write syntactically correct Go code',
      code: 'package main\n\nimport (\n  "fmt"\n  "time"\n)\n\nfunc main() {\n  // This is a comment\n  fmt.Println("Current time:", time.Now())\n}'
    },
    {
      title: 'Variables',
      description: 'Go has multiple ways to declare variables: using var keyword, short declaration (:=), or const for constants. Go is statically typed, but can infer types. Variables must be used or the code won\'t compile.',
      syntax: 'var name type = value\nname := value\nconst PI = 3.14',
      usage: 'Declare and initialize variables',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  // Explicit type\n  var name string = "Alice"\n  \n  // Type inference\n  var age = 25\n  \n  // Short declaration\n  city := "New York"\n  \n  // Constant\n  const Pi = 3.14159\n  \n  fmt.Println(name, age, city, Pi)\n}'
    },
    {
      title: 'Data Types',
      description: 'Go has several data types: bool, string, int (int8, int16, int32, int64), uint, float32, float64, complex64, complex128, byte (uint8), and rune (int32). Use type conversions explicitly as Go doesn\'t allow implicit conversions.',
      syntax: 'var name type\nconverted := type(value)',
      usage: 'Work with different data types',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  var isActive bool = true\n  var count int = 42\n  var price float64 = 19.99\n  var initial rune = \'A\'\n  var message string = "Hello"\n  \n  // Type conversion\n  var x int = 10\n  var y float64 = float64(x)\n  \n  fmt.Println(isActive, count, price, initial, message, y)\n}'
    },
    {
      title: 'Arrays & Slices',
      description: 'Arrays have fixed size, while slices are dynamic. Slices are more common and flexible. Use make() to create slices with capacity. Slices are reference types. Use append() to add elements to slices.',
      syntax: 'var arr [5]int\nslice := []int{1, 2, 3}\nslice = append(slice, 4)',
      usage: 'Store and manipulate collections of data',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  // Array (fixed size)\n  var arr [3]int = [3]int{1, 2, 3}\n  \n  // Slice (dynamic)\n  slice := []string{"Go", "Python", "Java"}\n  slice = append(slice, "Rust")\n  \n  // Make slice with capacity\n  numbers := make([]int, 0, 5)\n  numbers = append(numbers, 10, 20, 30)\n  \n  fmt.Println(arr, slice, numbers)\n  fmt.Println("Length:", len(slice), "Capacity:", cap(numbers))\n}'
    },
    {
      title: 'Maps',
      description: 'Maps are Go\'s built-in hash table/dictionary type. They store key-value pairs. Use make() to create maps or use map literals. Check for key existence with the comma-ok idiom. Delete entries with delete().',
      syntax: 'map[KeyType]ValueType\nm := make(map[string]int)\nvalue, exists := m[key]',
      usage: 'Store and retrieve key-value pairs',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  // Create map\n  ages := make(map[string]int)\n  ages["Alice"] = 25\n  ages["Bob"] = 30\n  \n  // Map literal\n  scores := map[string]int{\n    "Math": 95,\n    "Science": 88,\n  }\n  \n  // Check existence\n  age, exists := ages["Alice"]\n  fmt.Println("Alice:", age, "Exists:", exists)\n  \n  // Delete\n  delete(ages, "Bob")\n  \n  fmt.Println(ages, scores)\n}'
    },
    {
      title: 'Functions',
      description: 'Functions are declared with the func keyword. They can return multiple values. Use named return values for clarity. Functions are first-class citizens and can be passed as arguments. Variadic functions accept variable number of arguments.',
      syntax: 'func name(param type) returnType { }\nfunc name(a, b int) (int, error) { }',
      usage: 'Create reusable code blocks',
      code: 'package main\n\nimport "fmt"\n\nfunc add(a, b int) int {\n  return a + b\n}\n\nfunc divide(a, b float64) (float64, error) {\n  if b == 0 {\n    return 0, fmt.Errorf("division by zero")\n  }\n  return a / b, nil\n}\n\nfunc sum(numbers ...int) int {\n  total := 0\n  for _, n := range numbers {\n    total += n\n  }\n  return total\n}\n\nfunc main() {\n  fmt.Println(add(5, 3))\n  result, _ := divide(10, 2)\n  fmt.Println(result)\n  fmt.Println(sum(1, 2, 3, 4, 5))\n}'
    },
    {
      title: 'Structs',
      description: 'Structs are typed collections of fields. They\'re used to group data together. Define structs with the type keyword. Access fields with dot notation. Structs can be initialized with field names or positionally.',
      syntax: 'type StructName struct { field type }',
      usage: 'Create custom data types',
      code: 'package main\n\nimport "fmt"\n\ntype Person struct {\n  Name string\n  Age  int\n  City string\n}\n\nfunc main() {\n  // Named initialization\n  p1 := Person{\n    Name: "Alice",\n    Age:  25,\n    City: "NYC",\n  }\n  \n  // Positional\n  p2 := Person{"Bob", 30, "LA"}\n  \n  // Access fields\n  fmt.Println(p1.Name, "is", p1.Age, "years old")\n  fmt.Println(p2)\n}'
    },
    {
      title: 'Methods',
      description: 'Methods are functions with a receiver argument. They allow you to define functions on types. Use pointer receivers to modify the receiver or for large structs. Value receivers create a copy.',
      syntax: 'func (receiver Type) methodName() { }',
      usage: 'Add behavior to custom types',
      code: 'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n  Width, Height float64\n}\n\n// Value receiver\nfunc (r Rectangle) Area() float64 {\n  return r.Width * r.Height\n}\n\n// Pointer receiver\nfunc (r *Rectangle) Scale(factor float64) {\n  r.Width *= factor\n  r.Height *= factor\n}\n\nfunc main() {\n  rect := Rectangle{Width: 10, Height: 5}\n  fmt.Println("Area:", rect.Area())\n  \n  rect.Scale(2)\n  fmt.Println("Scaled:", rect)\n}'
    },
    {
      title: 'Interfaces',
      description: 'Interfaces define behavior as a set of method signatures. Types implement interfaces implicitly by implementing their methods. Empty interface (interface{}) can hold any type. Use type assertions to access underlying values.',
      syntax: 'type InterfaceName interface { Method() }',
      usage: 'Define contracts and enable polymorphism',
      code: 'package main\n\nimport "fmt"\n\ntype Shape interface {\n  Area() float64\n}\n\ntype Circle struct {\n  Radius float64\n}\n\nfunc (c Circle) Area() float64 {\n  return 3.14 * c.Radius * c.Radius\n}\n\ntype Rectangle struct {\n  Width, Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n  return r.Width * r.Height\n}\n\nfunc printArea(s Shape) {\n  fmt.Println("Area:", s.Area())\n}\n\nfunc main() {\n  c := Circle{Radius: 5}\n  r := Rectangle{Width: 10, Height: 5}\n  \n  printArea(c)\n  printArea(r)\n}'
    },
    {
      title: 'Pointers',
      description: 'Pointers hold memory addresses. Use & to get the address of a variable and * to dereference a pointer. Go passes arguments by value, use pointers to modify the original value. Go has no pointer arithmetic.',
      syntax: 'var ptr *Type\nptr = &variable\nvalue := *ptr',
      usage: 'Reference and modify values efficiently',
      code: 'package main\n\nimport "fmt"\n\nfunc increment(n *int) {\n  *n = *n + 1\n}\n\nfunc main() {\n  x := 10\n  fmt.Println("Before:", x)\n  \n  // Pass pointer\n  increment(&x)\n  fmt.Println("After:", x)\n  \n  // Pointer variable\n  ptr := &x\n  *ptr = 20\n  fmt.Println("Modified:", x)\n}'
    },
    {
      title: 'Error Handling',
      description: 'Go uses explicit error returns instead of exceptions. Functions return error as the last return value. Always check errors with if err != nil. Create custom errors with errors.New() or fmt.Errorf(). Use panic() only for unrecoverable errors.',
      syntax: 'if err != nil { }\nerrors.New("message")\nfmt.Errorf("error: %v", value)',
      usage: 'Handle errors gracefully',
      code: 'package main\n\nimport (\n  "errors"\n  "fmt"\n)\n\nfunc divide(a, b float64) (float64, error) {\n  if b == 0 {\n    return 0, errors.New("cannot divide by zero")\n  }\n  return a / b, nil\n}\n\nfunc main() {\n  result, err := divide(10, 2)\n  if err != nil {\n    fmt.Println("Error:", err)\n    return\n  }\n  fmt.Println("Result:", result)\n  \n  _, err = divide(10, 0)\n  if err != nil {\n    fmt.Println("Error:", err)\n  }\n}'
    },
    {
      title: 'Goroutines',
      description: 'Goroutines are lightweight threads managed by Go runtime. Launch a goroutine with the "go" keyword. They enable concurrent execution. Use sync.WaitGroup to wait for goroutines to finish. Goroutines communicate via channels.',
      syntax: 'go functionName()\ngo func() { }()',
      usage: 'Execute code concurrently',
      code: 'package main\n\nimport (\n  "fmt"\n  "sync"\n  "time"\n)\n\nfunc worker(id int, wg *sync.WaitGroup) {\n  defer wg.Done()\n  fmt.Printf("Worker %d starting\\n", id)\n  time.Sleep(time.Second)\n  fmt.Printf("Worker %d done\\n", id)\n}\n\nfunc main() {\n  var wg sync.WaitGroup\n  \n  for i := 1; i <= 3; i++ {\n    wg.Add(1)\n    go worker(i, &wg)\n  }\n  \n  wg.Wait()\n  fmt.Println("All workers done")\n}'
    },
    {
      title: 'Channels',
      description: 'Channels are typed conduits for communication between goroutines. Create with make(chan Type). Send with ch <- value and receive with value := <-ch. Channels can be buffered or unbuffered. Close channels when done sending.',
      syntax: 'ch := make(chan Type)\nch <- value\nvalue := <-ch\nclose(ch)',
      usage: 'Synchronize and communicate between goroutines',
      code: 'package main\n\nimport "fmt"\n\nfunc sum(nums []int, ch chan int) {\n  total := 0\n  for _, n := range nums {\n    total += n\n  }\n  ch <- total\n}\n\nfunc main() {\n  nums := []int{1, 2, 3, 4, 5, 6}\n  ch := make(chan int)\n  \n  go sum(nums[:len(nums)/2], ch)\n  go sum(nums[len(nums)/2:], ch)\n  \n  x, y := <-ch, <-ch\n  fmt.Println("Sum:", x+y)\n}'
    },
    {
      title: 'Packages',
      description: 'Packages organize code into reusable modules. Every Go file belongs to a package. Use import to use other packages. Exported identifiers start with a capital letter. The main package is the entry point for executables.',
      syntax: 'package packagename\nimport "path/to/package"',
      usage: 'Organize and reuse code',
      code: '// In file math/calc.go\npackage math\n\n// Exported function (capital letter)\nfunc Add(a, b int) int {\n  return a + b\n}\n\n// unexported function\nfunc subtract(a, b int) int {\n  return a - b\n}\n\n// In main.go\npackage main\n\nimport (\n  "fmt"\n  "myproject/math"\n)\n\nfunc main() {\n  result := math.Add(5, 3)\n  fmt.Println(result)\n}'
    },
    {
      title: 'Modules',
      description: 'Go modules are collections of packages. Use "go mod init" to create a new module. The go.mod file tracks dependencies. Use "go get" to add dependencies. Modules enable versioning and dependency management.',
      syntax: 'go mod init module-name\ngo get package-path',
      usage: 'Manage project dependencies',
      code: '// Initialize module\n// go mod init github.com/username/project\n\n// go.mod file:\nmodule github.com/username/project\n\ngo 1.21\n\nrequire (\n  github.com/gorilla/mux v1.8.0\n  gorm.io/gorm v1.25.0\n)\n\n// Add dependency:\n// go get github.com/gorilla/mux\n\n// Update dependencies:\n// go mod tidy'
    },
    {
      title: 'Web Server Basics',
      description: 'Go\'s net/http package makes it easy to build web servers. Use http.HandleFunc to define routes and handlers. Start server with http.ListenAndServe. Handle JSON with encoding/json. Use http.ResponseWriter and *http.Request for HTTP operations.',
      syntax: 'http.HandleFunc(pattern, handler)\nhttp.ListenAndServe(addr, nil)',
      usage: 'Build web servers and REST APIs',
      code: 'package main\n\nimport (\n  "encoding/json"\n  "net/http"\n  "fmt"\n)\n\ntype Response struct {\n  Message string `json:"message"`\n  Status  string `json:"status"`\n}\n\nfunc homeHandler(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprintf(w, "Welcome to Go Web Server!")\n}\n\nfunc apiHandler(w http.ResponseWriter, r *http.Request) {\n  w.Header().Set("Content-Type", "application/json")\n  response := Response{\n    Message: "API is running",\n    Status:  "success",\n  }\n  json.NewEncoder(w).Encode(response)\n}\n\nfunc main() {\n  http.HandleFunc("/", homeHandler)\n  http.HandleFunc("/api", apiHandler)\n  \n  fmt.Println("Server starting on :8080")\n  http.ListenAndServe(":8080", nil)\n}'
    },
  ]
}

// Rust Backend
function rustBackendSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} HOME`,
      description: 'Rust is a systems programming language focused on safety, speed, and concurrency. It guarantees memory safety without a garbage collector, making it perfect for building high-performance, reliable backend systems, web servers, and system tools.',
      syntax: 'fn main() { }\nlet variable = value;',
      usage: 'Build safe, fast, and concurrent backend applications',
      code: 'fn main() {\n    println!("Hello, Rust!");\n}'
    },
    {
      title: 'Introduction',
      description: 'Rust was created by Mozilla Research with contributions from the open-source community. It prevents common bugs like null pointer dereferences and data races at compile time. Rust is used by companies like Dropbox, Cloudflare, and Discord for performance-critical backend services.',
      syntax: 'Zero-cost abstractions, memory safety',
      usage: 'Understand Rust\'s advantages and use cases',
      code: '// Rust excels at:\n// - Web APIs and microservices\n// - System programming\n// - Command-line tools\n// - Network services\n// - Embedded systems'
    },
    {
      title: 'Installation',
      description: 'Install Rust using rustup, the official installer and version manager. Rustup installs the Rust compiler (rustc), Cargo (package manager), and standard library. Use "cargo new" to create projects and "cargo run" to execute them.',
      syntax: 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh',
      usage: 'Set up Rust development environment',
      code: '// Install: https://rustup.rs/\n// Verify: rustc --version\n\n// Create project:\n// cargo new my_project\n// cd my_project\n\n// Run:\n// cargo run\n\n// Build:\n// cargo build --release'
    },
    {
      title: 'Variables',
      description: 'Variables in Rust are immutable by default. Use "let" to declare variables and "let mut" for mutable ones. Rust uses type inference but you can specify types explicitly. Constants are declared with "const" and must have type annotations.',
      syntax: 'let name = value;\nlet mut count = 0;\nconst MAX: u32 = 100;',
      usage: 'Declare and manage variables',
      code: 'fn main() {\n    // Immutable (default)\n    let x = 5;\n    // x = 6; // Error!\n    \n    // Mutable\n    let mut y = 10;\n    y = 20; // OK\n    \n    // Type annotation\n    let z: i32 = 30;\n    \n    // Constant\n    const MAX_POINTS: u32 = 100_000;\n    \n    // Shadowing\n    let x = x + 1;\n    println!("{}, {}, {}, {}", x, y, z, MAX_POINTS);\n}'
    },
    {
      title: 'Data Types',
      description: 'Rust is statically typed with scalar types (integers, floats, booleans, characters) and compound types (tuples, arrays). Integer types include i8, i16, i32, i64, i128, u8, u16, u32, u64, u128. Floats are f32 and f64.',
      syntax: 'let num: i32 = 42;\nlet tuple: (i32, f64, u8) = (500, 6.4, 1);',
      usage: 'Work with different data types',
      code: 'fn main() {\n    // Integers\n    let decimal = 98_222;\n    let hex = 0xff;\n    let binary = 0b1111_0000;\n    \n    // Float\n    let x = 2.0; // f64\n    let y: f32 = 3.0; // f32\n    \n    // Boolean\n    let is_active: bool = true;\n    \n    // Character\n    let c: char = \'A\';\n    \n    // Tuple\n    let tup: (i32, f64, char) = (500, 6.4, \'x\');\n    let (a, b, c) = tup;\n    \n    println!("{}, {}, {}", a, b, c);\n}'
    },
    {
      title: 'Functions',
      description: 'Functions are declared with "fn" keyword. Parameters must have type annotations. Use "->" to specify return type. The last expression in a function is returned (no semicolon). Use "return" for early returns.',
      syntax: 'fn name(param: Type) -> ReturnType { }',
      usage: 'Create reusable code blocks',
      code: 'fn main() {\n    let result = add(5, 3);\n    println!("Sum: {}", result);\n    \n    let (q, r) = divide(10, 3);\n    println!("Quotient: {}, Remainder: {}", q, r);\n}\n\nfn add(a: i32, b: i32) -> i32 {\n    a + b // No semicolon = return value\n}\n\nfn divide(a: i32, b: i32) -> (i32, i32) {\n    (a / b, a % b)\n}'
    },
    {
      title: 'Ownership',
      description: 'Ownership is Rust\'s most unique feature. Each value has an owner. Only one owner at a time. When owner goes out of scope, value is dropped. Moving ownership transfers it. This prevents memory leaks and data races at compile time.',
      syntax: 'let s1 = String::from("hello");\nlet s2 = s1; // s1 moved',
      usage: 'Manage memory safely without garbage collection',
      code: 'fn main() {\n    // String (heap allocated)\n    let s1 = String::from("hello");\n    let s2 = s1; // s1 moved to s2\n    // println!("{}", s1); // Error! s1 no longer valid\n    println!("{}", s2);\n    \n    // Clone for deep copy\n    let s3 = s2.clone();\n    println!("{}, {}", s2, s3);\n    \n    // Function takes ownership\n    takes_ownership(s2);\n    // println!("{}", s2); // Error!\n}\n\nfn takes_ownership(s: String) {\n    println!("{}", s);\n} // s dropped here'
    },
    {
      title: 'References & Borrowing',
      description: 'References allow you to refer to a value without taking ownership. Use & for immutable references and &mut for mutable references. You can have multiple immutable references OR one mutable reference, but not both simultaneously.',
      syntax: 'let r = &value;\nlet r = &mut value;',
      usage: 'Access data without transferring ownership',
      code: 'fn main() {\n    let mut s = String::from("hello");\n    \n    // Immutable borrow\n    let len = calculate_length(&s);\n    println!("Length of \'{}\' is {}", s, len);\n    \n    // Mutable borrow\n    change(&mut s);\n    println!("{}", s);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}\n\nfn change(s: &mut String) {\n    s.push_str(", world");\n}'
    },
    {
      title: 'Structs',
      description: 'Structs group related data together. Define with "struct" keyword. Create instances with field: value syntax. Access fields with dot notation. Use tuple structs for unnamed fields. Derive traits for common functionality.',
      syntax: 'struct Name { field: Type }\nimpl Name { fn method(&self) { } }',
      usage: 'Create custom data structures',
      code: 'struct User {\n    username: String,\n    email: String,\n    active: bool,\n}\n\nimpl User {\n    fn new(username: String, email: String) -> User {\n        User {\n            username,\n            email,\n            active: true,\n        }\n    }\n    \n    fn deactivate(&mut self) {\n        self.active = false;\n    }\n}\n\nfn main() {\n    let mut user = User::new(\n        String::from("alice"),\n        String::from("alice@example.com")\n    );\n    println!("{}: {}", user.username, user.active);\n    user.deactivate();\n}'
    },
    {
      title: 'Enums',
      description: 'Enums define types with multiple variants. Each variant can hold different types of data. Use enum to model state or different cases. Option<T> (Some/None) and Result<T, E> (Ok/Err) are built-in enums for handling nullable values and errors.',
      syntax: 'enum Name { Variant1, Variant2(Type) }',
      usage: 'Model data with distinct variants',
      code: 'enum Message {\n    Quit,\n    Move { x: i32, y: i32 },\n    Write(String),\n    ChangeColor(i32, i32, i32),\n}\n\nimpl Message {\n    fn call(&self) {\n        match self {\n            Message::Quit => println!("Quit"),\n            Message::Move { x, y } => println!("Move to {}, {}", x, y),\n            Message::Write(text) => println!("Text: {}", text),\n            Message::ChangeColor(r, g, b) => println!("RGB({}, {}, {})", r, g, b),\n        }\n    }\n}\n\nfn main() {\n    let msg = Message::Write(String::from("Hello"));\n    msg.call();\n}'
    },
    {
      title: 'Pattern Matching',
      description: 'Pattern matching with "match" is exhaustive and powerful. Match against literal values, variables, wildcards, and more. Must cover all cases. Use "if let" for single pattern matching. Match is an expression that returns a value.',
      syntax: 'match value { pattern => expression }',
      usage: 'Handle different cases elegantly',
      code: 'fn main() {\n    let number = 7;\n    \n    match number {\n        1 => println!("One"),\n        2 | 3 | 5 | 7 => println!("Prime"),\n        8..=10 => println!("Eight to ten"),\n        _ => println!("Other"),\n    }\n    \n    // Match Option\n    let some_value = Some(5);\n    match some_value {\n        Some(x) if x > 3 => println!("Greater than 3: {}", x),\n        Some(x) => println!("{}", x),\n        None => println!("No value"),\n    }\n    \n    // if let\n    if let Some(x) = some_value {\n        println!("Value: {}", x);\n    }\n}'
    },
    {
      title: 'Error Handling',
      description: 'Rust uses Result<T, E> for recoverable errors and panic! for unrecoverable ones. Use ? operator to propagate errors. Match on Result or use unwrap/expect for quick prototyping. Define custom error types for better error handling.',
      syntax: 'Result<T, E>\nfn function() -> Result<T, Error> { }',
      usage: 'Handle errors safely and explicitly',
      code: 'use std::fs::File;\nuse std::io::{self, Read};\n\nfn read_file(path: &str) -> Result<String, io::Error> {\n    let mut file = File::open(path)?;\n    let mut contents = String::new();\n    file.read_to_string(&mut contents)?;\n    Ok(contents)\n}\n\nfn main() {\n    match read_file("test.txt") {\n        Ok(contents) => println!("{}", contents),\n        Err(e) => println!("Error: {}", e),\n    }\n    \n    // Using if let\n    if let Ok(data) = read_file("config.txt") {\n        println!("Config: {}", data);\n    }\n}'
    },
    {
      title: 'Collections',
      description: 'Rust provides Vec<T> for growable arrays, String for UTF-8 text, and HashMap<K, V> for key-value storage. Vectors use push/pop for adding/removing. Strings are UTF-8 encoded. HashMaps require keys to implement Hash and Eq traits.',
      syntax: 'Vec::new()\nString::from("text")\nHashMap::new()',
      usage: 'Store and manipulate collections of data',
      code: 'use std::collections::HashMap;\n\nfn main() {\n    // Vector\n    let mut v = Vec::new();\n    v.push(1);\n    v.push(2);\n    v.push(3);\n    println!("Vector: {:?}", v);\n    \n    // String\n    let mut s = String::from("Hello");\n    s.push_str(", world!");\n    println!("{}", s);\n    \n    // HashMap\n    let mut scores = HashMap::new();\n    scores.insert(String::from("Blue"), 10);\n    scores.insert(String::from("Red"), 50);\n    \n    if let Some(score) = scores.get("Blue") {\n        println!("Blue score: {}", score);\n    }\n}'
    },
    {
      title: 'Traits',
      description: 'Traits define shared behavior across types, similar to interfaces. Types implement traits using "impl Trait for Type". Standard library provides many traits like Clone, Debug, Display. Use trait bounds to constrain generic types.',
      syntax: 'trait Name { fn method(&self); }\nimpl Name for Type { }',
      usage: 'Define and implement shared behavior',
      code: 'trait Summary {\n    fn summarize(&self) -> String;\n    \n    fn default_summary(&self) -> String {\n        String::from("(Read more...)")\n    }\n}\n\nstruct Article {\n    title: String,\n    content: String,\n}\n\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        format!("{}: {}", self.title, self.content)\n    }\n}\n\nfn main() {\n    let article = Article {\n        title: String::from("Rust Traits"),\n        content: String::from("Traits are powerful!"),\n    };\n    println!("{}", article.summarize());\n}'
    },
    {
      title: 'Generics',
      description: 'Generics enable code reuse by allowing types to be parameters. Use <T> syntax for generic type parameters. Combine with trait bounds to constrain what types are acceptable. Zero runtime cost - monomorphization at compile time.',
      syntax: 'fn name<T>(param: T) { }\nstruct Name<T> { field: T }',
      usage: 'Write flexible, reusable code',
      code: 'fn largest<T: PartialOrd>(list: &[T]) -> &T {\n    let mut largest = &list[0];\n    for item in list {\n        if item > largest {\n            largest = item;\n        }\n    }\n    largest\n}\n\nstruct Point<T> {\n    x: T,\n    y: T,\n}\n\nimpl<T> Point<T> {\n    fn new(x: T, y: T) -> Self {\n        Point { x, y }\n    }\n}\n\nfn main() {\n    let numbers = vec![34, 50, 25, 100, 65];\n    println!("Largest: {}", largest(&numbers));\n    \n    let p = Point::new(5, 10);\n}'
    },
    {
      title: 'Modules',
      description: 'Modules organize code into namespaces. Use "mod" to declare modules. "pub" makes items public. "use" brings items into scope. Modules can be in the same file, separate files, or directories with mod.rs.',
      syntax: 'mod module_name { }\nuse module::item;\npub fn public_function() { }',
      usage: 'Organize and structure code',
      code: '// In lib.rs or main.rs\nmod math {\n    pub fn add(a: i32, b: i32) -> i32 {\n        a + b\n    }\n    \n    fn private_function() {\n        // Not accessible outside\n    }\n}\n\nmod utils {\n    pub mod helpers {\n        pub fn greet(name: &str) {\n            println!("Hello, {}!", name);\n        }\n    }\n}\n\nfn main() {\n    let sum = math::add(5, 3);\n    println!("Sum: {}", sum);\n    \n    use utils::helpers;\n    helpers::greet("Alice");\n}'
    },
    {
      title: 'Cargo',
      description: 'Cargo is Rust\'s build system and package manager. It manages dependencies, compiles packages, runs tests, and publishes crates. Cargo.toml defines project metadata and dependencies. Use cargo build, cargo run, cargo test commands.',
      syntax: 'cargo new project\ncargo build\ncargo run\ncargo test',
      usage: 'Manage Rust projects and dependencies',
      code: '# Create new project\n# cargo new my_project\n# cd my_project\n\n# Cargo.toml:\n[package]\nname = "my_project"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\nserde = { version = "1.0", features = ["derive"] }\ntokio = { version = "1", features = ["full"] }\n\n# Commands:\n# cargo build          # Debug build\n# cargo build --release  # Optimized build\n# cargo run            # Build and run\n# cargo test           # Run tests\n# cargo doc            # Generate docs'
    },
    {
      title: 'Web Development Basics',
      description: 'Rust offers excellent web frameworks like Actix-web, Rocket, and Axum. These provide routing, middleware, JSON handling, and async support. Use Tokio for async runtime. Serde for serialization. Build fast, safe REST APIs and web services.',
      syntax: 'use actix_web::{web, App, HttpServer};\n#[tokio::main]\nasync fn main() { }',
      usage: 'Build web applications and APIs',
      code: 'use actix_web::{get, post, web, App, HttpServer, Responder, HttpResponse};\nuse serde::{Deserialize, Serialize};\n\n#[derive(Serialize, Deserialize)]\nstruct User {\n    id: u32,\n    name: String,\n}\n\n#[get("/")]\nasync fn hello() -> impl Responder {\n    HttpResponse::Ok().body("Hello, Rust!")\n}\n\n#[get("/users/{id}")]\nasync fn get_user(id: web::Path<u32>) -> impl Responder {\n    let user = User {\n        id: *id,\n        name: String::from("Alice"),\n    };\n    web::Json(user)\n}\n\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    HttpServer::new(|| {\n        App::new()\n            .service(hello)\n            .service(get_user)\n    })\n    .bind("127.0.0.1:8080")?\n    .run()\n    .await\n}'
    },
  ]
}

// PHP Backend
function phpBackendSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} Backend HOME`,
      description: 'PHP is a widely-used server-side scripting language perfect for web development. It powers major platforms like WordPress, Laravel, and Symfony. PHP excels at building dynamic websites, REST APIs, and content management systems.',
      syntax: '<?php ... ?>',
      usage: 'Build dynamic web applications and APIs',
      code: '<?php\n// Simple PHP script\necho "Hello, PHP!";\n\n// Variables\n$name = "World";\necho "Hello, $name!";\n?>'
    },
    {
      title: 'Getting Started',
      description: 'Install PHP via your package manager or download from php.net. Use the built-in server for development. PHP files use .php extension and can mix HTML with PHP code using <?php ?> tags.',
      syntax: 'php -S localhost:8000',
      usage: 'Set up PHP development environment',
      code: '<?php\n// index.php\n?>\n<!DOCTYPE html>\n<html>\n<body>\n  <h1><?php echo "Welcome!"; ?></h1>\n  <p>Current time: <?php echo date("Y-m-d H:i:s"); ?></p>\n</body>\n</html>'
    },
    {
      title: 'Routing & Controllers',
      description: 'Modern PHP frameworks like Laravel use routing to map URLs to controller methods. Controllers handle business logic and return responses. Use route parameters for dynamic URLs.',
      syntax: 'Route::get(), Route::post()',
      usage: 'Define application endpoints',
      code: '<?php\n// routes/web.php (Laravel)\nRoute::get(\'/users\', [UserController::class, \'index\']);\nRoute::post(\'/users\', [UserController::class, \'store\']);\nRoute::get(\'/users/{id}\', [UserController::class, \'show\']);\n\n// UserController.php\nclass UserController {\n  public function index() {\n    return User::all();\n  }\n  \n  public function show($id) {\n    return User::findOrFail($id);\n  }\n}'
    },
    {
      title: 'Database with PDO/Eloquent',
      description: 'Use PDO for raw database queries with prepared statements to prevent SQL injection. Eloquent ORM (Laravel) provides an elegant ActiveRecord implementation for working with databases.',
      syntax: 'PDO, Eloquent ORM',
      usage: 'Interact with databases safely',
      code: '<?php\n// PDO\n$pdo = new PDO(\'mysql:host=localhost;dbname=myapp\', \'user\', \'pass\');\n$stmt = $pdo->prepare(\'SELECT * FROM users WHERE id = :id\');\n$stmt->execute([\'id\' => $userId]);\n$user = $stmt->fetch();\n\n// Eloquent (Laravel)\n$users = User::where(\'active\', true)\n  ->orderBy(\'created_at\', \'desc\')\n  ->take(10)\n  ->get();\n  \n$user = User::create([\n  \'name\' => \'Alice\',\n  \'email\' => \'alice@example.com\'\n]);\n?>'
    },
    {
      title: 'Validation & Forms',
      description: 'Validate user input to ensure data integrity and security. Use built-in filter functions or framework validators. Always validate on the server side, never trust client input.',
      syntax: 'filter_var(), validate()',
      usage: 'Ensure data quality and security',
      code: '<?php\n// Built-in validation\n$email = $_POST[\'email\'] ?? \'\';\nif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n  die(\'Invalid email\');\n}\n\n// Laravel validation\n$validated = $request->validate([\n  \'name\' => \'required|max:255\',\n  \'email\' => \'required|email|unique:users\',\n  \'password\' => \'required|min:8|confirmed\'\n]);\n?>'
    },
    {
      title: 'Authentication & Sessions',
      description: 'Use sessions to maintain user state across requests. Implement secure authentication with password hashing using bcrypt. Laravel provides built-in auth scaffolding.',
      syntax: 'session_start(), password_hash()',
      usage: 'Manage user authentication',
      code: '<?php\nsession_start();\n\n// Login\nif (password_verify($password, $user->password)) {\n  $_SESSION[\'user_id\'] = $user->id;\n  $_SESSION[\'username\'] = $user->name;\n}\n\n// Check auth\nif (!isset($_SESSION[\'user_id\'])) {\n  header(\'Location: /login\');\n  exit;\n}\n\n// Laravel Auth\nif (Auth::attempt([\'email\' => $email, \'password\' => $password])) {\n  return redirect(\'/dashboard\');\n}\n?>'
    },
    {
      title: 'RESTful APIs',
      description: 'Build REST APIs that return JSON responses. Use proper HTTP methods (GET, POST, PUT, DELETE) and status codes. Set appropriate headers for JSON content.',
      syntax: 'json_encode(), header()',
      usage: 'Create API endpoints',
      code: '<?php\nheader(\'Content-Type: application/json\');\n\n// GET /api/users\nif ($_SERVER[\'REQUEST_METHOD\'] === \'GET\') {\n  $users = getAllUsers();\n  echo json_encode($users);\n  http_response_code(200);\n}\n\n// POST /api/users\nif ($_SERVER[\'REQUEST_METHOD\'] === \'POST\') {\n  $data = json_decode(file_get_contents(\'php://input\'), true);\n  $user = createUser($data);\n  echo json_encode($user);\n  http_response_code(201);\n}\n?>'
    },
    {
      title: 'Middleware',
      description: 'Middleware processes requests before they reach your application logic. Use for authentication, logging, CORS, and rate limiting. Laravel makes middleware easy to implement.',
      syntax: 'Middleware classes',
      usage: 'Handle cross-cutting concerns',
      code: '<?php\n// Laravel Middleware\nclass CheckAge {\n  public function handle($request, Closure $next) {\n    if ($request->age <= 18) {\n      return redirect(\'home\');\n    }\n    return $next($request);\n  }\n}\n\n// Apply middleware\nRoute::get(\'/profile\', function () {\n  //\n})->middleware(\'auth\', \'verified\');\n?>'
    },
    {
      title: 'Error Handling',
      description: 'Handle errors gracefully with try-catch blocks. Set up custom error handlers and use logging for debugging. Never expose sensitive error details in production.',
      syntax: 'try-catch, set_error_handler()',
      usage: 'Manage application errors',
      code: '<?php\ntry {\n  $result = riskyOperation();\n} catch (Exception $e) {\n  error_log($e->getMessage());\n  http_response_code(500);\n  echo json_encode([\'error\' => \'Something went wrong\']);\n}\n\n// Custom error handler\nset_error_handler(function($errno, $errstr, $errfile, $errline) {\n  error_log("Error [$errno]: $errstr in $errfile:$errline");\n  return true;\n});\n?>'
    },
    {
      title: 'Caching',
      description: 'Improve performance with caching. Use file caching, Redis, or Memcached for storing frequently accessed data. Laravel provides a unified caching API.',
      syntax: 'Cache::get(), Cache::put()',
      usage: 'Speed up application',
      code: '<?php\n// Laravel Cache\n$users = Cache::remember(\'users\', 3600, function () {\n  return User::all();\n});\n\n// Redis\n$redis = new Redis();\n$redis->connect(\'127.0.0.1\', 6379);\n$redis->set(\'user:1\', json_encode($user));\n$redis->expire(\'user:1\', 3600);\n$cached = json_decode($redis->get(\'user:1\'));\n?>'
    },
    {
      title: 'Testing',
      description: 'Write tests using PHPUnit for unit and feature testing. Test your controllers, models, and business logic. Use factories and seeders for test data.',
      syntax: 'PHPUnit, pest',
      usage: 'Ensure code quality',
      code: '<?php\n// PHPUnit test\nclass UserTest extends TestCase {\n  public function test_user_can_be_created() {\n    $user = User::create([\n      \'name\' => \'Test\',\n      \'email\' => \'test@example.com\'\n    ]);\n    \n    $this->assertDatabaseHas(\'users\', [\n      \'email\' => \'test@example.com\'\n    ]);\n  }\n}\n?>'
    },
    {
      title: 'Mini Project',
      description: 'Build a complete REST API for a blog with posts and comments. Include authentication, validation, and database operations. Deploy with proper error handling and caching.',
      syntax: 'Full stack PHP application',
      usage: 'Apply PHP backend skills',
      code: '<?php\n// routes/api.php\nRoute::middleware(\'auth:api\')->group(function () {\n  Route::apiResource(\'posts\', PostController::class);\n  Route::apiResource(\'comments\', CommentController::class);\n});\n\n// PostController\nclass PostController {\n  public function index() {\n    return Post::with(\'author\', \'comments\')->paginate(20);\n  }\n}\n?>'
    }
  ]
}

// Ruby Backend (Ruby on Rails)
function rubyBackendSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} Backend HOME`,
      description: 'Ruby is an elegant, readable programming language. Ruby on Rails is a full-stack web framework that emphasizes convention over configuration. It\'s perfect for rapid development of web applications and APIs.',
      syntax: 'class, def, end',
      usage: 'Build web applications quickly',
      code: '# Hello Ruby\nputs "Hello, Ruby!"\n\n# Variables and methods\nname = "World"\ndef greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet(name)'
    },
    {
      title: 'Rails Setup',
      description: 'Install Ruby via rbenv or RVM. Install Rails gem and create a new Rails app. Rails follows MVC architecture with clear conventions for file organization.',
      syntax: 'rails new app_name',
      usage: 'Start a Rails project',
      code: '# Install Rails\ngem install rails\n\n# Create new app\nrails new myapp --database=postgresql\n\n# Start server\ncd myapp\nrails server\n\n# Generate scaffold\nrails generate scaffold Post title:string body:text\nrails db:migrate'
    },
    {
      title: 'Routes & Controllers',
      description: 'Define routes in config/routes.rb. Controllers handle requests and render responses. Use resourceful routing for RESTful APIs. Rails automatically maps routes to controller actions.',
      syntax: 'resources :posts',
      usage: 'Define application endpoints',
      code: '# config/routes.rb\nRails.application.routes.draw do\n  resources :posts do\n    resources :comments\n  end\n  \n  namespace :api do\n    namespace :v1 do\n      resources :users\n    end\n  end\nend\n\n# app/controllers/posts_controller.rb\nclass PostsController < ApplicationController\n  def index\n    @posts = Post.all\n    render json: @posts\n  end\n  \n  def show\n    @post = Post.find(params[:id])\n    render json: @post\n  end\nend'
    },
    {
      title: 'Models & ActiveRecord',
      description: 'ActiveRecord is Rails\' ORM for database interaction. Define models as Ruby classes. Use migrations to modify database schema. Query the database with intuitive Ruby methods.',
      syntax: 'Model.where(), .find()',
      usage: 'Work with database records',
      code: '# app/models/post.rb\nclass Post < ApplicationRecord\n  belongs_to :user\n  has_many :comments, dependent: :destroy\n  \n  validates :title, presence: true, length: { minimum: 5 }\n  validates :body, presence: true\n  \n  scope :published, -> { where(published: true) }\n  scope :recent, -> { order(created_at: :desc) }\nend\n\n# Query examples\nPost.where(published: true).recent.limit(10)\nPost.find_by(title: "Hello")\nPost.create(title: "New Post", body: "Content")'
    },
    {
      title: 'Validations',
      description: 'Validate model data before saving to database. Use built-in validators or create custom ones. Rails prevents invalid data from being persisted.',
      syntax: 'validates :field, rules',
      usage: 'Ensure data integrity',
      code: '# app/models/user.rb\nclass User < ApplicationRecord\n  validates :email, presence: true, \n                    uniqueness: true,\n                    format: { with: URI::MailTo::EMAIL_REGEXP }\n  validates :username, presence: true,\n                       length: { minimum: 3, maximum: 20 }\n  validates :age, numericality: { greater_than: 0 }\n  \n  # Custom validation\n  validate :email_domain_allowed\n  \n  private\n  \n  def email_domain_allowed\n    unless email.end_with?(\'@example.com\')\n      errors.add(:email, \'must be from example.com\')\n    end\n  end\nend'
    },
    {
      title: 'Authentication',
      description: 'Use Devise gem for full-featured authentication or has_secure_password for simple auth. Implement sessions, password encryption, and user management.',
      syntax: 'has_secure_password',
      usage: 'Secure user authentication',
      code: '# Gemfile\ngem \'bcrypt\'\n\n# app/models/user.rb\nclass User < ApplicationRecord\n  has_secure_password\n  validates :email, presence: true, uniqueness: true\nend\n\n# app/controllers/sessions_controller.rb\nclass SessionsController < ApplicationController\n  def create\n    user = User.find_by(email: params[:email])\n    if user&.authenticate(params[:password])\n      session[:user_id] = user.id\n      render json: { message: \'Logged in\' }, status: :ok\n    else\n      render json: { error: \'Invalid credentials\' }, status: :unauthorized\n    end\n  end\n  \n  def destroy\n    session[:user_id] = nil\n    render json: { message: \'Logged out\' }\n  end\nend'
    },
    {
      title: 'REST APIs',
      description: 'Build JSON APIs with Rails API mode. Use serializers for custom JSON formatting. Implement proper HTTP status codes and error handling.',
      syntax: 'render json:',
      usage: 'Create REST endpoints',
      code: '# app/controllers/api/v1/posts_controller.rb\nmodule Api\n  module V1\n    class PostsController < ApplicationController\n      before_action :set_post, only: [:show, :update, :destroy]\n      \n      def index\n        posts = Post.all\n        render json: posts, status: :ok\n      end\n      \n      def create\n        post = Post.new(post_params)\n        if post.save\n          render json: post, status: :created\n        else\n          render json: { errors: post.errors }, status: :unprocessable_entity\n        end\n      end\n      \n      private\n      \n      def post_params\n        params.require(:post).permit(:title, :body)\n      end\n      \n      def set_post\n        @post = Post.find(params[:id])\n      end\n    end\n  end\nend'
    },
    {
      title: 'Background Jobs',
      description: 'Use ActiveJob for background processing with Sidekiq or Resque. Handle long-running tasks like emails, file processing, and API calls asynchronously.',
      syntax: 'perform_later',
      usage: 'Process tasks asynchronously',
      code: '# app/jobs/email_job.rb\nclass EmailJob < ApplicationJob\n  queue_as :default\n  \n  def perform(user_id)\n    user = User.find(user_id)\n    UserMailer.welcome_email(user).deliver_now\n  end\nend\n\n# Usage\nEmailJob.perform_later(user.id)\n\n# Scheduled job\nEmailJob.set(wait: 1.hour).perform_later(user.id)'
    },
    {
      title: 'Caching',
      description: 'Rails provides multiple caching strategies: page, action, fragment, and low-level caching. Use Redis or Memcached for production caching.',
      syntax: 'Rails.cache',
      usage: 'Improve performance',
      code: '# config/environments/production.rb\nconfig.cache_store = :redis_cache_store, { url: ENV[\'REDIS_URL\'] }\n\n# Low-level caching\nRails.cache.fetch("users/all", expires_in: 12.hours) do\n  User.all.to_a\nend\n\n# Fragment caching (in views)\n<% cache @post do %>\n  <%= render @post %>\n<% end %>\n\n# Model caching\nclass Post < ApplicationRecord\n  after_commit :clear_cache\n  \n  def self.cached_recent\n    Rails.cache.fetch("posts/recent", expires_in: 1.hour) do\n      recent.limit(10).to_a\n    end\n  end\n  \n  private\n  \n  def clear_cache\n    Rails.cache.delete("posts/recent")\n  end\nend'
    },
    {
      title: 'Testing with RSpec',
      description: 'Use RSpec for behavior-driven testing. Test models, controllers, and request specs. FactoryBot provides test data factories.',
      syntax: 'describe, it, expect',
      usage: 'Ensure code quality',
      code: '# spec/models/post_spec.rb\nRSpec.describe Post, type: :model do\n  describe \'validations\' do\n    it { should validate_presence_of(:title) }\n    it { should validate_presence_of(:body) }\n  end\n  \n  describe \'associations\' do\n    it { should belong_to(:user) }\n    it { should have_many(:comments) }\n  end\nend\n\n# spec/requests/posts_spec.rb\nRSpec.describe "Posts API", type: :request do\n  describe "GET /posts" do\n    it "returns all posts" do\n      create_list(:post, 3)\n      get \'/posts\'\n      expect(response).to have_http_status(:ok)\n      expect(JSON.parse(response.body).size).to eq(3)\n    end\n  end\nend'
    },
    {
      title: 'Deployment',
      description: 'Deploy Rails apps to Heroku, AWS, or DigitalOcean. Use Capistrano for automated deployments. Configure environment variables and asset compilation.',
      syntax: 'rails assets:precompile',
      usage: 'Ship to production',
      code: '# Gemfile\ngroup :development do\n  gem \'capistrano\'\n  gem \'capistrano-rails\'\nend\n\n# config/deploy.rb\nset :application, "myapp"\nset :repo_url, "git@github.com:user/myapp.git"\nset :deploy_to, "/var/www/myapp"\n\n# Heroku\n# Procfile\nweb: bundle exec puma -C config/puma.rb\nworker: bundle exec sidekiq\n\n# Deploy\ngit push heroku main\nheroku run rails db:migrate'
    },
    {
      title: 'Mini Project',
      description: 'Build a complete blog API with users, posts, and comments. Include authentication, validations, background jobs for emails, and caching. Write comprehensive tests.',
      syntax: 'Full Rails API',
      usage: 'Apply Ruby on Rails skills',
      code: '# Complete blog API structure\n# Models: User, Post, Comment\n# Authentication with JWT\n# Background jobs for notifications\n# Caching for popular posts\n# RSpec tests for all features\n\n# app/models/user.rb\nclass User < ApplicationRecord\n  has_secure_password\n  has_many :posts, dependent: :destroy\n  has_many :comments, dependent: :destroy\n  validates :email, presence: true, uniqueness: true\nend\n\n# Run migrations\nrails db:migrate\n\n# Start server\nrails server'
    }
  ]
}

// Database
function databaseSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} stores and retrieves structured data reliably.`, syntax: 'DDL, DML', usage: 'Persist data', code: 'CREATE TABLE users(id SERIAL PRIMARY KEY);' },
    { title: 'Modeling', description: 'Design tables/collections with keys and constraints.', syntax: 'PRIMARY KEY, UNIQUE', usage: 'Shape data', code: 'CREATE TABLE posts(id SERIAL PRIMARY KEY, title TEXT);' },
    { title: 'CRUD Operations', description: 'Insert, select, update, and delete records.', syntax: 'INSERT, SELECT, UPDATE, DELETE', usage: 'Work with data', code: 'SELECT id, email FROM users;' },
    { title: 'Joins and Relations', description: 'Relate data with joins or references.', syntax: 'JOIN, FOREIGN KEY', usage: 'Combine datasets', code: 'SELECT * FROM orders JOIN users USING(user_id);' },
    { title: 'Indexes and Performance', description: 'Add indexes for fast lookups; measure with explain.', syntax: 'CREATE INDEX, EXPLAIN', usage: 'Speed queries', code: 'CREATE INDEX idx_users_email ON users(email);' },
    { title: 'Transactions', description: 'Group statements atomically for integrity.', syntax: 'BEGIN, COMMIT, ROLLBACK', usage: 'Consistency', code: 'BEGIN; UPDATE accounts SET balance=balance-10; COMMIT;' },
    { title: 'Migrations', description: 'Version schema changes with repeatable scripts.', syntax: 'migration files', usage: 'Safe evolution', code: '-- add column status TEXT' },
    { title: 'Views and Aggregations', description: 'Summarize data with views and aggregates.', syntax: 'VIEW, GROUP BY, COUNT', usage: 'Analytics', code: 'SELECT status, COUNT(*) FROM tickets GROUP BY status;' },
    { title: 'Security and Access', description: 'Roles, least privilege, and parameterized queries.', syntax: 'GRANT, prepared statements', usage: 'Protect data', code: 'GRANT SELECT ON users TO reader;' },
    { title: 'Backup and Recovery', description: 'Plan backups and test restores.', syntax: 'pg_dump, snapshots', usage: 'Resilience', code: '# pg_dump mydb > backup.sql' },
    { title: 'Scaling', description: 'Partition, cache, and tune queries as data grows.', syntax: 'partitioning, caching', usage: 'Handle load', code: '-- consider read replicas' },
    { title: 'Mini Project', description: 'Design schema and CRUD for a small app with migrations.', syntax: 'schema + queries', usage: 'Apply DB skills', code: 'INSERT INTO tasks(title) VALUES ("Ship")' },
  ]
}

// Machine Learning / AI
function mlSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} powers data prep, modeling, and evaluation.`, syntax: 'arrays, tensors, models', usage: 'Train/evaluate models', code: 'import numpy as np' },
    { title: 'Data Collection', description: 'Load CSV/JSON and handle missing data.', syntax: 'pandas read_csv, dropna', usage: 'Clean datasets', code: 'df = pd.read_csv("data.csv").dropna()' },
    { title: 'Exploration', description: 'Visualize distributions and correlations.', syntax: 'describe(), plot()', usage: 'Find signal', code: 'df.describe()' },
    { title: 'Feature Engineering', description: 'Encode categoricals, scale numbers, and split data.', syntax: 'OneHotEncoder, StandardScaler', usage: 'Prepare inputs', code: 'X_train, X_test = train_test_split(X, y)' },
    { title: 'Model Selection', description: 'Choose baseline models and compare.', syntax: 'LogReg, RandomForest, CNN', usage: 'Fit models', code: 'model.fit(X_train, y_train)' },
    { title: 'Training', description: 'Train with validation and checkpoints.', syntax: 'epochs, learning rate', usage: 'Improve accuracy', code: 'history = model.fit(X_train, y_train, epochs=10)' },
    { title: 'Evaluation', description: 'Accuracy, F1, ROC, RMSE depending on task.', syntax: 'metrics', usage: 'Judge models', code: 'f1_score(y_test, preds)' },
    { title: 'Inference', description: 'Serve predictions and handle drift.', syntax: 'predict(), pipelines', usage: 'Use models', code: 'model.predict(sample)' },
    { title: 'MLOps', description: 'Track experiments, version data, automate training.', syntax: 'MLflow, DVC, pipelines', usage: 'Reliable delivery', code: '# mlflow run .' },
    { title: 'Ethics and Safety', description: 'Mitigate bias, ensure privacy, monitor misuse.', syntax: 'fairness checks, PII handling', usage: 'Responsible AI', code: '# run bias evaluation' },
    { title: 'Deployment', description: 'Package models for APIs/batch jobs.', syntax: 'Docker, FastAPI, TF Serving', usage: 'Ship models', code: 'uvicorn api:app' },
    { title: 'Mini Project', description: 'Train and evaluate a model end-to-end on a small dataset.', syntax: 'prep + train + eval', usage: 'Apply ML skills', code: '# notebook or script run' },
  ]
}

// DevOps
function devopsSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} keeps software delivery fast and reliable.`, syntax: 'Git, CI/CD, containers', usage: 'Ship changes safely', code: 'name: CI\non: [push]' },
    { title: 'Version Control', description: 'Branching, reviews, and trunk-based workflows.', syntax: 'git flow basics', usage: 'Collaborate effectively', code: 'git status' },
    { title: 'CI Pipelines', description: 'Automate builds, tests, and lint on every change.', syntax: 'workflows, jobs, steps', usage: 'Catch regressions early', code: 'uses: actions/checkout@v4' },
    { title: 'Containers', description: 'Build minimal images and run containers locally.', syntax: 'Dockerfile, docker run', usage: 'Consistent envs', code: 'docker build -t app .' },
    { title: 'Infrastructure as Code', description: 'Provision with Terraform/CloudFormation.', syntax: 'terraform apply', usage: 'Repeatable infra', code: 'resource "aws_s3_bucket" "site" {}' },
    { title: 'Observability', description: 'Collect logs, metrics, and traces.', syntax: 'logging, metrics, tracing', usage: 'Understand systems', code: 'logger.info({ route })' },
    { title: 'Security and Secrets', description: 'Manage secrets, scanning, and least privilege.', syntax: 'vault, OIDC, iam', usage: 'Harden delivery', code: 'secrets.AWS_ACCESS_KEY_ID' },
    { title: 'Scaling and Reliability', description: 'Health checks, autoscaling, load balancing.', syntax: 'probes, HPA, LB', usage: 'Stay resilient', code: 'readinessProbe: { httpGet: { path: /health } }' },
    { title: 'Release Management', description: 'Blue/green, canary, and rollback strategies.', syntax: 'traffic splitting', usage: 'Safe deploys', code: '# shift 10% traffic' },
    { title: 'Incident Response', description: 'On-call, runbooks, and postmortems.', syntax: 'SLOs, SLIs', usage: 'Recover quickly', code: '# follow runbook link' },
    { title: 'Cost and Efficiency', description: 'Right-size resources and monitor spend.', syntax: 'budgets, quotas', usage: 'Control costs', code: '# set budgets' },
    { title: 'Mini Project', description: 'Create a CI/CD pipeline deploying a containerized app.', syntax: 'pipeline + container', usage: 'Apply DevOps skills', code: '# see workflow yaml' },
  ]
}

// Security
function securitySpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} Security HOME`, description: 'Security fundamentals for building and operating safe software.', syntax: 'CIA, threat modeling', usage: 'Protect systems', code: '// identify assets and threats' },
    { title: 'Threat Modeling', description: 'Identify assets, actors, and abuse cases.', syntax: 'STRIDE, DREAD', usage: 'Plan defenses', code: '# enumerate threats' },
    { title: 'Authentication and Authorization', description: 'Strong auth flows, MFA, and least-privilege roles.', syntax: 'OIDC, JWT, RBAC', usage: 'Verify and limit access', code: 'if(!user) return 401' },
    { title: 'Input Validation and Output Encoding', description: 'Prevent injection and XSS with validation and encoding.', syntax: 'allow-lists, escape', usage: 'Data safety', code: 'sanitize(input)' },
    { title: 'Secrets and Storage', description: 'Manage secrets safely and encrypt data at rest.', syntax: 'KMS, vault, hashing', usage: 'Protect data', code: 'hash(password)' },
    { title: 'Transport Security', description: 'TLS everywhere; secure headers.', syntax: 'HTTPS, HSTS, CSP', usage: 'Secure channels', code: 'Strict-Transport-Security' },
    { title: 'Logging and Monitoring', description: 'Capture auth events and detect anomalies.', syntax: 'centralized logs, alerts', usage: 'Detect issues', code: 'logger.warn({ userId, action })' },
    { title: 'Security Testing', description: 'Static analysis, dependency scanning, dynamic testing.', syntax: 'SAST, DAST, SCA', usage: 'Find flaws early', code: '# npm audit' },
    { title: 'Hardening', description: 'Least privilege, firewalls, patching.', syntax: 'firewalls, patching', usage: 'Reduce risk', code: '# apply updates' },
    { title: 'Incident Response', description: 'Detection, containment, recovery steps.', syntax: 'IR playbooks', usage: 'Respond effectively', code: '# follow IR plan' },
    { title: 'Compliance and Privacy', description: 'Handle PII, consent, retention.', syntax: 'GDPR/CCPA basics', usage: 'Stay compliant', code: '# data retention rules' },
    { title: 'Mini Project', description: 'Harden a web service with auth, validation, and logging.', syntax: 'controls + testing', usage: 'Apply security skills', code: '# add security middleware' },
  ]
}

// Blockchain
function blockchainSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} enables decentralized apps and smart contracts.`, syntax: 'accounts, transactions', usage: 'Build on-chain logic', code: '// connect to provider' },
    { title: 'Accounts and Keys', description: 'Manage wallets, addresses, and key safety.', syntax: 'private/public keys', usage: 'Identity on-chain', code: '// never expose private keys' },
    { title: 'Transactions and Gas', description: 'Send transactions and estimate gas costs.', syntax: 'nonce, gasPrice', usage: 'Execute safely', code: '// send transaction' },
    { title: 'Smart Contracts', description: 'Author, compile, and deploy contracts.', syntax: 'Solidity/Vyper basics', usage: 'On-chain programs', code: 'function greet() public pure returns(string memory){ return "hi"; }' },
    { title: 'Tokens', description: 'Work with ERC-20/721 standards.', syntax: 'ERC-20, ERC-721', usage: 'Represent value', code: '// totalSupply(), transfer()' },
    { title: 'Oracles and Data', description: 'Bring external data on-chain securely.', syntax: 'oracle patterns', usage: 'Trusted inputs', code: '// price feed example' },
    { title: 'Security', description: 'Avoid reentrancy, overflows, and access bugs.', syntax: 'checks-effects-interactions', usage: 'Safe contracts', code: 'require(msg.sender == owner);' },
    { title: 'Testing', description: 'Test contracts locally with hardhat/foundry.', syntax: 'unit + integration tests', usage: 'Prevent exploits', code: '// write tests for each function' },
    { title: 'Tooling', description: 'Linters, formatters, analyzers.', syntax: 'slither, prettier', usage: 'Code quality', code: '// run slither' },
    { title: 'Deployment', description: 'Deploy to testnets then mainnet.', syntax: 'verify, migrate', usage: 'Ship safely', code: '// npx hardhat deploy --network sepolia' },
    { title: 'Integrating dApps', description: 'Connect contracts to web/mobile clients.', syntax: 'ethers/web3 providers', usage: 'UX for users', code: '// use ethers.js' },
    { title: 'Mini Project', description: 'Launch a token or simple marketplace contract with tests.', syntax: 'contract + client', usage: 'Apply blockchain skills', code: '// deploy and interact' },
  ]
}

// Game Dev
function gameSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} Game HOME`, description: `${languageName} can power 2D/3D gameplay loops and rendering.`, syntax: 'update, render, input', usage: 'Build games', code: '// game loop' },
    { title: 'Game Loop', description: 'Structure update, render, and timing.', syntax: 'requestAnimationFrame', usage: 'Stable gameplay', code: 'function loop(){ update(); render(); requestAnimationFrame(loop); }' },
    { title: 'Input Handling', description: 'Capture keyboard, mouse, or controller input.', syntax: 'event listeners', usage: 'Player controls', code: 'window.addEventListener("keydown", onKey)' },
    { title: 'Physics and Movement', description: 'Position, velocity, and collision basics.', syntax: 'vectors, delta time', usage: 'Realistic motion', code: 'pos += velocity * dt' },
    { title: 'Rendering', description: 'Draw sprites or meshes efficiently.', syntax: 'canvas/webgl', usage: 'Visual output', code: 'ctx.drawImage(sprite, x, y)' },
    { title: 'State Management', description: 'Manage scenes, entities, and lifecycles.', syntax: 'state machines', usage: 'Organized flow', code: 'state = "menu" | "play"' },
    { title: 'UI and HUD', description: 'Display health, score, and inventory.', syntax: 'overlay layers', usage: 'Player feedback', code: '// draw HUD elements' },
    { title: 'Audio', description: 'Play effects and music with proper layering.', syntax: 'audio API', usage: 'Immersive feel', code: '// play sound effect' },
    { title: 'Performance', description: 'Batch draws and avoid expensive allocations.', syntax: 'object pooling', usage: 'Smooth FPS', code: '// pool entities' },
    { title: 'Testing', description: 'Test core logic and collision routines.', syntax: 'unit tests', usage: 'Reduce bugs', code: '// assert collision outcomes' },
    { title: 'Distribution', description: 'Package builds for web/desktop/mobile.', syntax: 'build pipeline', usage: 'Ship game', code: '// export build' },
    { title: 'Mini Project', description: 'Build a small playable level with scoring and restart.', syntax: 'loop + input + render', usage: 'Apply game skills', code: '// final build' },
  ]
}

// React Native (13 lessons)
function reactNativeSpecs(languageName: string): SectionSpec[] {
  return [
    {
      title: `${languageName} HOME`,
      description: 'React Native lets you build native mobile apps using React and JavaScript. Write once, run on iOS and Android with true native performance and components.',
      syntax: 'JSX, React Components, Native APIs',
      usage: 'Cross-platform mobile development',
      code: 'import React from "react";\nimport { View, Text, StyleSheet } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Hello React Native!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: "center", alignItems: "center" },\n  title: { fontSize: 24, fontWeight: "bold" }\n});'
    },
    {
      title: 'Setup & Installation',
      description: 'Install React Native CLI or Expo. Set up development environment with Node, Watchman, Xcode (iOS), and Android Studio.',
      syntax: 'npx react-native init, expo init',
      usage: 'Initialize new projects',
      code: '// Using Expo (recommended for beginners)\nnpx create-expo-app MyApp\ncd MyApp\nnpx expo start\n\n// Using React Native CLI\nnpx react-native init MyApp\ncd MyApp\nnpx react-native run-ios\n// or\nnpx react-native run-android'
    },
    {
      title: 'Core Components (View, Text, Image, ScrollView, TextInput)',
      description: 'Master essential components: View (container), Text (display text), Image (show images), ScrollView (scrollable content), TextInput (user input).',
      syntax: '<View>, <Text>, <Image>, <ScrollView>, <TextInput>',
      usage: 'Build mobile UI',
      code: 'import { View, Text, Image, ScrollView, TextInput } from "react-native";\n\nfunction MyScreen() {\n  const [text, setText] = React.useState("");\n  \n  return (\n    <ScrollView>\n      <View style={{ padding: 20 }}>\n        <Image \n          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}\n          style={{ width: 50, height: 50 }}\n        />\n        <Text style={{ fontSize: 20 }}>Welcome!</Text>\n        <TextInput \n          value={text}\n          onChangeText={setText}\n          placeholder="Enter text"\n          style={{ borderWidth: 1, padding: 10 }}\n        />\n      </View>\n    </ScrollView>\n  );\n}'
    },
    {
      title: 'StyleSheet',
      description: 'Create optimized styles with StyleSheet.create(). Supports flexbox, positioning, colors, typography, and transforms.',
      syntax: 'StyleSheet.create({ key: {...} })',
      usage: 'Style components efficiently',
      code: 'import { StyleSheet, View, Text } from "react-native";\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: "#f5f5f5",\n    padding: 20\n  },\n  card: {\n    backgroundColor: "white",\n    borderRadius: 8,\n    padding: 16,\n    shadowColor: "#000",\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.1,\n    shadowRadius: 4,\n    elevation: 3\n  },\n  title: {\n    fontSize: 18,\n    fontWeight: "600",\n    color: "#333"\n  }\n});\n\nfunction Card() {\n  return (\n    <View style={styles.container}>\n      <View style={styles.card}>\n        <Text style={styles.title}>My Card</Text>\n      </View>\n    </View>\n  );\n}'
    },
    {
      title: 'Flexbox Layout',
      description: 'Use flexbox for responsive layouts. Control direction, justification, alignment, and flex wrapping.',
      syntax: 'flexDirection, justifyContent, alignItems, flex',
      usage: 'Create flexible layouts',
      code: 'import { View, Text, StyleSheet } from "react-native";\n\nconst styles = StyleSheet.create({\n  row: {\n    flexDirection: "row",\n    justifyContent: "space-between",\n    alignItems: "center",\n    padding: 16\n  },\n  column: {\n    flexDirection: "column",\n    flex: 1,\n    gap: 8\n  },\n  box: {\n    flex: 1,\n    height: 100,\n    backgroundColor: "#3b82f6",\n    margin: 4,\n    justifyContent: "center",\n    alignItems: "center"\n  }\n});\n\nfunction FlexExample() {\n  return (\n    <View style={styles.column}>\n      <View style={styles.row}>\n        <View style={styles.box}><Text>1</Text></View>\n        <View style={styles.box}><Text>2</Text></View>\n        <View style={styles.box}><Text>3</Text></View>\n      </View>\n    </View>\n  );\n}'
    },
    {
      title: 'Handling Text Input',
      description: 'Manage controlled inputs with state. Handle keyboard types, validation, and input events.',
      syntax: 'value, onChangeText, keyboardType',
      usage: 'Form inputs and validation',
      code: 'import React, { useState } from "react";\nimport { View, TextInput, Text, Button, StyleSheet } from "react-native";\n\nfunction LoginForm() {\n  const [email, setEmail] = useState("");\n  const [password, setPassword] = useState("");\n  const [error, setError] = useState("");\n\n  const handleSubmit = () => {\n    if (!email || !password) {\n      setError("All fields required");\n      return;\n    }\n    console.log("Login:", { email, password });\n  };\n\n  return (\n    <View style={styles.form}>\n      <TextInput\n        placeholder="Email"\n        value={email}\n        onChangeText={setEmail}\n        keyboardType="email-address"\n        autoCapitalize="none"\n        style={styles.input}\n      />\n      <TextInput\n        placeholder="Password"\n        value={password}\n        onChangeText={setPassword}\n        secureTextEntry\n        style={styles.input}\n      />\n      {error ? <Text style={styles.error}>{error}</Text> : null}\n      <Button title="Login" onPress={handleSubmit} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  form: { padding: 20 },\n  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 4 },\n  error: { color: "red", marginBottom: 10 }\n});'
    },
    {
      title: 'Button & Touchables',
      description: 'Use Button for simple actions, TouchableOpacity for custom buttons, Pressable for advanced interactions.',
      syntax: '<Button>, <TouchableOpacity>, <Pressable>',
      usage: 'Handle user interactions',
      code: 'import { View, Button, TouchableOpacity, Pressable, Text, StyleSheet } from "react-native";\n\nfunction ButtonExamples() {\n  return (\n    <View style={styles.container}>\n      <Button title="Simple Button" onPress={() => alert("Pressed")} />\n      \n      <TouchableOpacity \n        style={styles.customButton}\n        onPress={() => console.log("Custom pressed")}\n        activeOpacity={0.7}\n      >\n        <Text style={styles.buttonText}>Custom Button</Text>\n      </TouchableOpacity>\n      \n      <Pressable\n        style={({ pressed }) => [\n          styles.pressable,\n          pressed && styles.pressed\n        ]}\n        onPress={() => console.log("Pressable")}\n      >\n        <Text>Pressable Button</Text>\n      </Pressable>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { padding: 20, gap: 10 },\n  customButton: { backgroundColor: "#3b82f6", padding: 12, borderRadius: 8 },\n  buttonText: { color: "white", textAlign: "center", fontWeight: "600" },\n  pressable: { backgroundColor: "#e5e7eb", padding: 12, borderRadius: 8 },\n  pressed: { backgroundColor: "#d1d5db" }\n});'
    },
    {
      title: 'Lists (FlatList, SectionList)',
      description: 'Render large lists efficiently with FlatList. Use SectionList for grouped data with headers.',
      syntax: '<FlatList data={} renderItem={} />',
      usage: 'Display scrollable lists',
      code: 'import { FlatList, SectionList, View, Text, StyleSheet } from "react-native";\n\nconst DATA = [\n  { id: "1", title: "First Item" },\n  { id: "2", title: "Second Item" },\n  { id: "3", title: "Third Item" }\n];\n\nconst SECTIONS = [\n  { title: "A", data: ["Apple", "Avocado"] },\n  { title: "B", data: ["Banana", "Blueberry"] }\n];\n\nfunction Lists() {\n  return (\n    <View style={styles.container}>\n      <FlatList\n        data={DATA}\n        renderItem={({ item }) => (\n          <View style={styles.item}>\n            <Text>{item.title}</Text>\n          </View>\n        )}\n        keyExtractor={item => item.id}\n      />\n      \n      <SectionList\n        sections={SECTIONS}\n        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}\n        renderSectionHeader={({ section }) => (\n          <Text style={styles.header}>{section.title}</Text>\n        )}\n        keyExtractor={(item, index) => item + index}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1 },\n  item: { padding: 16, borderBottomWidth: 1, borderColor: "#ddd" },\n  header: { backgroundColor: "#f5f5f5", padding: 8, fontWeight: "bold" }\n});'
    },
    {
      title: 'Networking & Fetch',
      description: 'Fetch data from APIs using fetch() or libraries like axios. Handle loading, errors, and async operations.',
      syntax: 'fetch(url), async/await, useEffect',
      usage: 'Load data from servers',
      code: 'import React, { useState, useEffect } from "react";\nimport { View, Text, FlatList, ActivityIndicator } from "react-native";\n\nfunction UsersList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetchUsers();\n  }, []);\n\n  const fetchUsers = async () => {\n    try {\n      const response = await fetch("https://jsonplaceholder.typicode.com/users");\n      if (!response.ok) throw new Error("Network error");\n      const data = await response.json();\n      setUsers(data);\n    } catch (err) {\n      setError(err.message);\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  if (loading) return <ActivityIndicator size="large" />;\n  if (error) return <Text>Error: {error}</Text>;\n\n  return (\n    <FlatList\n      data={users}\n      renderItem={({ item }) => (\n        <View style={{ padding: 16 }}>\n          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>\n          <Text>{item.email}</Text>\n        </View>\n      )}\n      keyExtractor={item => item.id.toString()}\n    />\n  );\n}'
    },
    {
      title: 'Navigation',
      description: 'Navigate between screens using React Navigation. Stack, Tab, and Drawer navigators for complex apps.',
      syntax: 'NavigationContainer, Stack.Navigator, Tab.Navigator',
      usage: 'Multi-screen apps',
      code: '// Install: npm install @react-navigation/native @react-navigation/stack\nimport React from "react";\nimport { NavigationContainer } from "@react-navigation/native";\nimport { createStackNavigator } from "@react-navigation/stack";\nimport { View, Text, Button } from "react-native";\n\nconst Stack = createStackNavigator();\n\nfunction HomeScreen({ navigation }) {\n  return (\n    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>\n      <Text>Home Screen</Text>\n      <Button\n        title="Go to Details"\n        onPress={() => navigation.navigate("Details", { id: 42 })}\n      />\n    </View>\n  );\n}\n\nfunction DetailsScreen({ route, navigation }) {\n  const { id } = route.params;\n  return (\n    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>\n      <Text>Details Screen - ID: {id}</Text>\n      <Button title="Go Back" onPress={() => navigation.goBack()} />\n    </View>\n  );\n}\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name="Home" component={HomeScreen} />\n        <Stack.Screen name="Details" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}'
    },
    {
      title: 'Platform Specific Code',
      description: 'Write platform-specific code for iOS and Android using Platform API or file extensions (.ios.js, .android.js).',
      syntax: 'Platform.OS, Platform.select({})',
      usage: 'Handle platform differences',
      code: 'import { Platform, StyleSheet, Text } from "react-native";\n\n// Using Platform.OS\nconst isIOS = Platform.OS === "ios";\nconst statusBarHeight = Platform.OS === "ios" ? 44 : 0;\n\n// Using Platform.select\nconst styles = StyleSheet.create({\n  container: {\n    paddingTop: Platform.select({\n      ios: 44,\n      android: 0,\n      default: 0\n    }),\n    ...Platform.select({\n      ios: {\n        shadowColor: "#000",\n        shadowOffset: { width: 0, height: 2 },\n        shadowOpacity: 0.2,\n        shadowRadius: 4\n      },\n      android: {\n        elevation: 4\n      }\n    })\n  },\n  text: {\n    fontFamily: Platform.select({\n      ios: "System",\n      android: "Roboto"\n    })\n  }\n});\n\nfunction PlatformExample() {\n  return <Text style={styles.text}>Platform: {Platform.OS}</Text>;\n}\n\n// File-based separation:\n// Button.ios.js - iOS implementation\n// Button.android.js - Android implementation\n// Import as: import Button from "./Button";'
    },
    {
      title: 'AsyncStorage',
      description: 'Persist data locally with AsyncStorage. Store key-value pairs for settings, cache, and offline data.',
      syntax: 'AsyncStorage.setItem(), getItem(), removeItem()',
      usage: 'Local data persistence',
      code: '// Install: npm install @react-native-async-storage/async-storage\nimport AsyncStorage from "@react-native-async-storage/async-storage";\nimport React, { useState, useEffect } from "react";\nimport { View, Text, Button, TextInput } from "react-native";\n\nfunction StorageExample() {\n  const [name, setName] = useState("");\n  const [saved, setSaved] = useState("");\n\n  useEffect(() => {\n    loadName();\n  }, []);\n\n  const loadName = async () => {\n    try {\n      const value = await AsyncStorage.getItem("@username");\n      if (value !== null) {\n        setSaved(value);\n        setName(value);\n      }\n    } catch (error) {\n      console.log("Error loading:", error);\n    }\n  };\n\n  const saveName = async () => {\n    try {\n      await AsyncStorage.setItem("@username", name);\n      setSaved(name);\n      alert("Saved!");\n    } catch (error) {\n      console.log("Error saving:", error);\n    }\n  };\n\n  const clearName = async () => {\n    try {\n      await AsyncStorage.removeItem("@username");\n      setName("");\n      setSaved("");\n    } catch (error) {\n      console.log("Error clearing:", error);\n    }\n  };\n\n  return (\n    <View style={{ padding: 20 }}>\n      <Text>Saved: {saved}</Text>\n      <TextInput\n        value={name}\n        onChangeText={setName}\n        placeholder="Enter name"\n        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}\n      />\n      <Button title="Save" onPress={saveName} />\n      <Button title="Clear" onPress={clearName} color="red" />\n    </View>\n  );\n}'
    },
    {
      title: 'Building Apps',
      description: 'Build production apps for iOS and Android. Configure app icons, splash screens, signing, and release builds.',
      syntax: 'Build commands, app.json, gradle, Xcode',
      usage: 'Deploy to app stores',
      code: '// Expo Build Process\n// 1. Configure app.json\n{\n  "expo": {\n    "name": "MyApp",\n    "slug": "my-app",\n    "version": "1.0.0",\n    "icon": "./assets/icon.png",\n    "splash": {\n      "image": "./assets/splash.png",\n      "backgroundColor": "#ffffff"\n    },\n    "ios": {\n      "bundleIdentifier": "com.mycompany.myapp",\n      "buildNumber": "1.0.0"\n    },\n    "android": {\n      "package": "com.mycompany.myapp",\n      "versionCode": 1\n    }\n  }\n}\n\n// 2. Build commands\n// For Expo:\neas build --platform ios\neas build --platform android\neas submit --platform ios\neas submit --platform android\n\n// For React Native CLI:\n// iOS:\ncd ios && pod install && cd ..\nnpx react-native run-ios --configuration Release\n\n// Android:\ncd android\n./gradlew assembleRelease\n// APK at: android/app/build/outputs/apk/release/app-release.apk\n\n// 3. Testing on devices\nnpx expo start --tunnel\n// Scan QR code with Expo Go app'
    }
  ]
}

// Flutter
function flutterSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: 'Flutter builds beautiful native apps from a single codebase using Dart. Build for iOS, Android, web, and desktop.', syntax: 'Widget tree, StatelessWidget, StatefulWidget', usage: 'Cross-platform apps', code: 'import "package:flutter/material.dart";\n\nvoid main() => runApp(MyApp());\n\nclass MyApp extends StatelessWidget {\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Text("Hello Flutter"),\n    );\n  }\n}' },
    { title: 'Widgets Basics', description: 'Everything is a widget. Compose UI with StatelessWidget and StatefulWidget.', syntax: 'StatelessWidget, StatefulWidget', usage: 'Build UI', code: 'class MyWidget extends StatelessWidget {\n  Widget build(BuildContext context) {\n    return Container(child: Text("Hello"));\n  }\n}' },
    { title: 'Layouts', description: 'Use Row, Column, Stack, and Container for layouts.', syntax: 'Row, Column, Stack', usage: 'Arrange widgets', code: 'Column(\n  children: [\n    Text("Title"),\n    Text("Subtitle"),\n  ],\n)' },
    { title: 'State Management', description: 'Manage state with setState, Provider, Riverpod, or Bloc.', syntax: 'setState, Provider', usage: 'Track state', code: 'setState(() { count++; })' },
    { title: 'Navigation', description: 'Navigate between screens with Navigator and routes.', syntax: 'Navigator.push', usage: 'Multi-screen apps', code: 'Navigator.push(context, MaterialPageRoute(builder: (context) => SecondScreen()))' },
    { title: 'Forms and Input', description: 'TextFields, validation, and form submission.', syntax: 'TextField, Form', usage: 'Collect data', code: 'TextField(controller: emailController)' },
    { title: 'Networking', description: 'Fetch data with http package and decode JSON.', syntax: 'http.get, jsonDecode', usage: 'API integration', code: 'final response = await http.get(Uri.parse(url));' },
    { title: 'Lists and Data', description: 'Display data with ListView and GridView.', syntax: 'ListView.builder', usage: 'Scrollable lists', code: 'ListView.builder(itemCount: items.length, itemBuilder: (ctx, i) => Text(items[i]))' },
    { title: 'Styling and Themes', description: 'Use Theme, TextStyle, and custom widgets.', syntax: 'ThemeData, TextStyle', usage: 'Consistent design', code: 'Text("Hello", style: TextStyle(fontSize: 20, color: Colors.blue))' },
    { title: 'Testing', description: 'Widget, unit, and integration tests.', syntax: 'testWidgets', usage: 'Quality assurance', code: 'testWidgets("test", (tester) async { await tester.pumpWidget(MyApp()); })' },
    { title: 'Platform Features', description: 'Access camera, sensors, and storage with plugins.', syntax: 'plugins, permissions', usage: 'Device APIs', code: '// Add platform plugins' },
    { title: 'Mini Project', description: 'Build a task list app with add, delete, and persistence.', syntax: 'widgets + state', usage: 'Apply Flutter skills', code: '// Complete task app' },
  ]
}

// Swift
function swiftSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: 'Swift is a powerful language for iOS, macOS, watchOS, and tvOS. Build native Apple experiences with modern syntax.', syntax: 'var, let, func, class', usage: 'Apple platform apps', code: 'import UIKit\n\nclass ViewController: UIViewController {\n  override func viewDidLoad() {\n    super.viewDidLoad()\n    let label = UILabel()\n    label.text = "Hello Swift"\n    view.addSubview(label)\n  }\n}' },
    { title: 'SwiftUI Basics', description: 'Declarative UI with Views, modifiers, and state.', syntax: 'View, @State', usage: 'Modern UI', code: 'struct ContentView: View {\n  var body: some View {\n    Text("Hello SwiftUI")\n  }\n}' },
    { title: 'UIKit Basics', description: 'Imperative UI with ViewControllers and views.', syntax: 'UIViewController, UIView', usage: 'Traditional UI', code: 'let button = UIButton()\nbutton.setTitle("Tap", for: .normal)' },
    { title: 'Variables and Types', description: 'Strong typing with var, let, and type inference.', syntax: 'var, let, Int, String', usage: 'Store data', code: 'let name: String = "Ada"\nvar count = 0' },
    { title: 'Functions and Closures', description: 'Define functions and use closures for callbacks.', syntax: 'func, closure syntax', usage: 'Reusable logic', code: 'func greet(name: String) -> String {\n  return "Hello \\(name)"\n}' },
    { title: 'Optionals', description: 'Handle nil safely with optionals and unwrapping.', syntax: 'Optional, if let, guard', usage: 'Null safety', code: 'if let name = optionalName {\n  print(name)\n}' },
    { title: 'Collections', description: 'Arrays, dictionaries, and sets.', syntax: 'Array, Dictionary, Set', usage: 'Store collections', code: 'let names = ["Alice", "Bob"]\nlet scores = ["Alice": 95]' },
    { title: 'Networking', description: 'Fetch data with URLSession and decode JSON.', syntax: 'URLSession, Codable', usage: 'API calls', code: 'URLSession.shared.dataTask(with: url) { data, response, error in }' },
    { title: 'Navigation', description: 'NavigationController or NavigationView for multi-screen apps.', syntax: 'NavigationController, NavigationLink', usage: 'Screen transitions', code: 'NavigationLink("Go", destination: DetailView())' },
    { title: 'State Management', description: '@State, @Binding, ObservableObject for reactive data.', syntax: '@State, @ObservedObject', usage: 'Track changes', code: '@State private var count = 0' },
    { title: 'Testing', description: 'XCTest for unit and UI tests.', syntax: 'XCTest, XCUITest', usage: 'Quality', code: 'func testExample() {\n  XCTAssertEqual(1 + 1, 2)\n}' },
    { title: 'Mini Project', description: 'Build a weather app with API fetching and navigation.', syntax: 'SwiftUI + networking', usage: 'Apply Swift skills', code: '// Weather app' },
  ]
}

// Kotlin
function kotlinSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: 'Kotlin is a modern language for Android, server, and multiplatform apps. Concise, safe, and interoperable with Java.', syntax: 'val, var, fun, class', usage: 'Android and backend', code: 'import android.os.Bundle\nimport androidx.appcompat.app.AppCompatActivity\nimport android.widget.TextView\n\nclass MainActivity : AppCompatActivity() {\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    val text = TextView(this)\n    text.text = "Hello Kotlin"\n    setContentView(text)\n  }\n}' },
    { title: 'Variables and Types', description: 'val for immutable, var for mutable. Strong type inference.', syntax: 'val, var, Int, String', usage: 'Store data', code: 'val name: String = "Ada"\nvar count = 0' },
    { title: 'Functions', description: 'Concise function syntax with default params and named args.', syntax: 'fun, default params', usage: 'Reusable logic', code: 'fun greet(name: String = "World") = "Hello $name"' },
    { title: 'Null Safety', description: 'Nullable and non-nullable types with safe calls.', syntax: '?, !!, ?.', usage: 'Avoid crashes', code: 'val length = name?.length ?: 0' },
    { title: 'Collections', description: 'Lists, maps, sets with functional operations.', syntax: 'listOf, mapOf, filter, map', usage: 'Data structures', code: 'val evens = listOf(1,2,3,4).filter { it % 2 == 0 }' },
    { title: 'Classes and Objects', description: 'Data classes, objects, and companion objects.', syntax: 'class, data class, object', usage: 'Model data', code: 'data class User(val id: Int, val name: String)' },
    { title: 'Android UI', description: 'Build layouts with XML or Jetpack Compose.', syntax: 'XML layouts, Compose', usage: 'Screen design', code: '@Composable\nfun Greeting() {\n  Text("Hello")\n}' },
    { title: 'Networking', description: 'Retrofit or Ktor for API calls.', syntax: 'Retrofit, coroutines', usage: 'Fetch data', code: 'val response = apiService.getUsers()' },
    { title: 'Coroutines', description: 'Async programming with suspend functions and scopes.', syntax: 'suspend, launch, async', usage: 'Concurrency', code: 'GlobalScope.launch {\n  val data = fetchData()\n}' },
    { title: 'Navigation', description: 'Navigate with Navigation Component or Compose.', syntax: 'NavController, navigate', usage: 'Multi-screen apps', code: 'navController.navigate("detail")' },
    { title: 'Testing', description: 'JUnit and Espresso for unit and UI tests.', syntax: 'JUnit, Espresso', usage: 'Quality', code: '@Test\nfun testAddition() {\n  assertEquals(4, 2 + 2)\n}' },
    { title: 'Mini Project', description: 'Build a note-taking app with CRUD and persistence.', syntax: 'Android + Room DB', usage: 'Apply Kotlin skills', code: '// Notes app' },
  ]
}

// General fallback
function generalSpecs(languageName: string): SectionSpec[] {
  return [
    { title: `${languageName} HOME`, description: `${languageName} overview and how you will learn it quickly.`, syntax: 'basics', usage: 'Start here', code: '// welcome' },
    { title: 'Syntax Basics', description: 'Core syntax rules and style.', syntax: 'keywords, operators', usage: 'Write valid code', code: '// syntax sample' },
    { title: 'Variables and Data', description: 'Store and manipulate values.', syntax: 'vars, types', usage: 'Handle state', code: '// variables' },
    { title: 'Control Flow', description: 'Branching and looping constructs.', syntax: 'if/else, loops', usage: 'Direct execution', code: '// control flow' },
    { title: 'Functions', description: 'Encapsulate reusable logic.', syntax: 'def/function', usage: 'Reuse code', code: '// function sample' },
    { title: 'Modules', description: 'Import/export code across files.', syntax: 'modules/packages', usage: 'Organize code', code: '// module sample' },
    { title: 'Error Handling', description: 'Handle and log errors gracefully.', syntax: 'try/catch', usage: 'Robust apps', code: '// error handling' },
    { title: 'Testing', description: 'Basic tests for confidence.', syntax: 'assert/test', usage: 'Prevent regressions', code: '// test sample' },
    { title: 'Tooling', description: 'Linters, formatters, build tools.', syntax: 'lint, format', usage: 'Consistent code', code: '// tooling' },
    { title: 'Performance', description: 'Simple tips to keep programs fast.', syntax: 'profiling basics', usage: 'Efficient code', code: '// profile' },
    { title: 'Security Basics', description: 'Input validation and secrets handling.', syntax: 'validation, secrets', usage: 'Safe defaults', code: '// validate' },
    { title: 'Mini Project', description: 'Build a small end-to-end sample applying the concepts.', syntax: 'combine all topics', usage: 'Capstone', code: '// project' },
  ]
}
