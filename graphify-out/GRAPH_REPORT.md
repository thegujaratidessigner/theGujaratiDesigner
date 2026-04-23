# Graph Report - .  (2026-04-18)

## Corpus Check
- 88 files · ~465,331 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 354 nodes · 425 edges · 65 communities detected
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 97 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Product Packaging Brands|Product Packaging Brands]]
- [[_COMMUNITY_Social Media Design Portfolio|Social Media Design Portfolio]]
- [[_COMMUNITY_Admin Auth & Core|Admin Auth & Core]]
- [[_COMMUNITY_Admin Client Managers|Admin Client Managers]]
- [[_COMMUNITY_About Page Sections|About Page Sections]]
- [[_COMMUNITY_Admin Dashboard & CRUD|Admin Dashboard & CRUD]]
- [[_COMMUNITY_Services & Pricing Types|Services & Pricing Types]]
- [[_COMMUNITY_API Routes|API Routes]]
- [[_COMMUNITY_Logo Design Portfolio|Logo Design Portfolio]]
- [[_COMMUNITY_Page Server Components|Page Server Components]]
- [[_COMMUNITY_Graphics Portfolio Components|Graphics Portfolio Components]]
- [[_COMMUNITY_Brand & Platform Assets|Brand & Platform Assets]]
- [[_COMMUNITY_Navigation & Theme|Navigation & Theme]]
- [[_COMMUNITY_Scroll & Layout Utils|Scroll & Layout Utils]]
- [[_COMMUNITY_Services Section UI|Services Section UI]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Hero Animation|Hero Animation]]
- [[_COMMUNITY_Testimonials|Testimonials]]
- [[_COMMUNITY_Services Pages|Services Pages]]
- [[_COMMUNITY_Navbar Behavior|Navbar Behavior]]
- [[_COMMUNITY_Services Pricing|Services Pricing]]
- [[_COMMUNITY_Contact Sections|Contact Sections]]
- [[_COMMUNITY_Google Reviews|Google Reviews]]
- [[_COMMUNITY_Dev Documentation|Dev Documentation]]
- [[_COMMUNITY_About Us Page|About Us Page]]
- [[_COMMUNITY_Admin Layout|Admin Layout]]
- [[_COMMUNITY_Admin Packages Page|Admin Packages Page]]
- [[_COMMUNITY_Admin Featured Page|Admin Featured Page]]
- [[_COMMUNITY_Admin Login Form|Admin Login Form]]
- [[_COMMUNITY_Contact Form|Contact Form]]
- [[_COMMUNITY_Contact Page|Contact Page]]
- [[_COMMUNITY_Website Portfolio Page|Website Portfolio Page]]
- [[_COMMUNITY_Graphics Portfolio Page|Graphics Portfolio Page]]
- [[_COMMUNITY_Terms & Conditions|Terms & Conditions]]
- [[_COMMUNITY_Admin Logout|Admin Logout]]
- [[_COMMUNITY_Featured Projects|Featured Projects]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Next.js Type Defs|Next.js Type Defs]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_Admin Projects Page|Admin Projects Page]]
- [[_COMMUNITY_ThemeToggle|ThemeToggle]]
- [[_COMMUNITY_Portfolio Section|Portfolio Section]]
- [[_COMMUNITY_CTA Banner|CTA Banner]]
- [[_COMMUNITY_FAQ Section|FAQ Section]]
- [[_COMMUNITY_About Section|About Section]]
- [[_COMMUNITY_Contact Map|Contact Map]]
- [[_COMMUNITY_Contact Hero|Contact Hero]]
- [[_COMMUNITY_About Values|About Values]]
- [[_COMMUNITY_About Founder|About Founder]]
- [[_COMMUNITY_About Hero|About Hero]]
- [[_COMMUNITY_About Stats|About Stats]]
- [[_COMMUNITY_Graphics Portfolio File|Graphics Portfolio File]]
- [[_COMMUNITY_Website Portfolio File|Website Portfolio File]]
- [[_COMMUNITY_Services Hero|Services Hero]]
- [[_COMMUNITY_PostCSS Module|PostCSS Module]]
- [[_COMMUNITY_Next.js Env Types|Next.js Env Types]]
- [[_COMMUNITY_Proxy Config|Proxy Config]]
- [[_COMMUNITY_ESLint Module|ESLint Module]]
- [[_COMMUNITY_Next.js Module|Next.js Module]]
- [[_COMMUNITY_SEO Metadata|SEO Metadata]]
- [[_COMMUNITY_About Us Route|About Us Route]]
- [[_COMMUNITY_FAQ Component|FAQ Component]]
- [[_COMMUNITY_Contact Route|Contact Route]]

## God Nodes (most connected - your core abstractions)
1. `POST()` - 13 edges
2. `Social Media Posts Portfolio Sheet 1` - 13 edges
3. `Social Media Posts Portfolio Sheet 2` - 13 edges
4. `readData Function` - 11 edges
5. `Logo Designs Portfolio Grid` - 11 edges
6. `flash()` - 10 edges
7. `Social Media Branding Portfolio Sheet` - 10 edges
8. `Portfolio Graphics Section` - 10 edges
9. `GET()` - 9 edges
10. `PUT()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `checkPassword()`  [INFERRED]
  app/api/services/route.ts → lib/auth.ts
- `proxy()` --calls--> `GET()`  [INFERRED]
  proxy.ts → app/api/services/route.ts
- `proxy()` --calls--> `next()`  [INFERRED]
  proxy.ts → app/_components/sections/Testimonials.tsx
- `proxy()` --conceptually_related_to--> `Admin Layout`  [INFERRED]
  proxy.ts → app/admin/layout.tsx
- `proxy()` --conceptually_related_to--> `Admin Login Page`  [INFERRED]
  proxy.ts → app/admin/login/page.tsx

## Hyperedges (group relationships)
- **Admin Pages: Server Component loads data via readData, passes to Client Manager via props** — projects_page, projects_client_projectsmanager, page_readdata [EXTRACTED 0.95]
- **Admin Authentication Guard: proxy middleware, verifySessionToken, and login page form the auth boundary** — proxy_proxy, lib_auth_verifysessiontoken, login_loginform [EXTRACTED 0.95]
- **AdminNav shared across all admin section pages as persistent sidebar** — adminnav_adminnav, projects_page, packages_page, featured_page, services_page [EXTRACTED 0.90]
- **Curtain-Triggered Hero Entrance Animation Flow** — curtainreveal_curtainreveal, curtainreveal_curtain_open_event, hero_hero [EXTRACTED 1.00]
- **3D Shape Components Sharing useHoverColor Pattern** — heroscene_torus, heroscene_icosahedron, heroscene_octahedron, heroscene_torusknot, heroscene_dodecahedron, heroscene_wiresphere, heroscene_usehovercolor [EXTRACTED 1.00]
- **Contact Page Section Composition** — contacthero_contacthero, contactform_contactform, contactmap_contactmap [INFERRED 0.90]
- **File-based JSON CRUD API Pattern** — lib_db, readdata_fn, writedata_fn, generateid_fn [EXTRACTED 1.00]
- **Admin Authentication Flow** — auth_login_route, auth_logout_route, lib_auth, cookie_name_const [EXTRACTED 1.00]
- **Portfolio Page Server-side Data Loading** — websiteportfoliopage_page, graphicsportfoliopage_page, readdata_fn [EXTRACTED 1.00]

## Communities

### Community 0 - "Product Packaging Brands"
Cohesion: 0.06
Nodes (44): Ameerix Brand Cosmetic Packaging, Heavenmist Household Cleaning Brand, Hitarva Roasted Peanuts Brand, Jojoba Brand Packaging, O Organic Natural Juice Brand, RS Gold Atta / Flour Brand, Shayar Grain / Food Brand, Zlyn Cosmetics / Skincare Brand (+36 more)

### Community 1 - "Social Media Design Portfolio"
Cohesion: 0.09
Nodes (30): Social Cardify Brand Identity, Branding Design Category, Social Media Graphic Design Category, Ameerix Construction Agency Social Post, Bechdu May Offer Social Post, CKY.in Social Post, Columnpace Holi Festival Social Post, Dashitakri Food Brand Social Post (+22 more)

### Community 2 - "Admin Auth & Core"
Cohesion: 0.1
Nodes (20): Admin Layout, POST /api/auth/login endpoint, checkPassword(), createSessionToken(), hmacSign(), Auth Login API Route, Auth Logout API Route, verifySessionToken() (+12 more)

### Community 3 - "Admin Client Managers"
Cohesion: 0.19
Nodes (17): cancel(), cancelForm(), deleteItem(), deletePackage(), deleteProject(), deleteService(), Field(), flash() (+9 more)

### Community 4 - "About Page Sections"
Cohesion: 0.13
Nodes (19): About Section Component, AboutFounder Component, AboutHero Component, AboutValues Component, curtain:open CustomEvent, CurtainReveal(), AnimatedWord Helper, Hero Section Component (+11 more)

### Community 5 - "Admin Dashboard & CRUD"
Cohesion: 0.13
Nodes (20): Admin Dashboard Page, AdminNav(), PUT /api/featured endpoint, POST/PUT/DELETE /api/packages endpoints, POST/PUT/DELETE /api/projects/graphics endpoints, POST/PUT/DELETE /api/projects/website endpoints, POST/PUT/DELETE /api/services endpoints, FeaturedManager Client Component (+12 more)

### Community 6 - "Services & Pricing Types"
Cohesion: 0.17
Nodes (21): AboutStats Component, AddonServiceItem Type, AddonTable Component, File-based Data Store Convention, Featured API Route, generateId Function, Database Utility (lib/db), PackageCard Component (+13 more)

### Community 7 - "API Routes"
Cohesion: 0.24
Nodes (10): generateId(), writeData(), DELETE(), filename(), GET(), isAddonSection(), isMain(), isValidType() (+2 more)

### Community 8 - "Logo Design Portfolio"
Cohesion: 0.15
Nodes (17): Astha Brand Logo, Ethnico Brand Logo, Infinity Brand Logo, Palms Brand Logo, Tillage Brand Logo, VMC Monogram Badge Logo, Logo Design Category, Portfolio Grid Composition Layout (+9 more)

### Community 9 - "Page Server Components"
Cohesion: 0.2
Nodes (7): readData(), FeaturedProject Type (from Portfolio section), fetchGoogleReviews (called in home page), Home(), ProjectsPage(), ServiceItem Type (from Services section), fetchGoogleReviews()

### Community 10 - "Graphics Portfolio Components"
Cohesion: 0.24
Nodes (10): GraphicsPortfolio Component, Graphics Portfolio Page, GraphicsProject Type, Lightbox Overlay Pattern, ScreenshotImage Component, SmoothScroll useLenis Hook, WebsitePortfolio Component, Website Portfolio Page (+2 more)

### Community 11 - "Brand & Platform Assets"
Cohesion: 0.22
Nodes (10): The Gujarati Designer Brand, Next.js Framework, File Icon SVG, Globe Icon SVG, The Gujarati Designer Logo, Next.js Logo SVG, Vercel Logo SVG, Window/Browser Icon SVG (+2 more)

### Community 12 - "Navigation & Theme"
Cohesion: 0.29
Nodes (6): Footer(), Navbar Component, NavDropdown Component, navLinks Data Array, ThemeProvider(), ThemeToggle Component

### Community 13 - "Scroll & Layout Utils"
Cohesion: 0.4
Nodes (4): SectionContainer(), LenisContext, SmoothScroll(), useLenis()

### Community 14 - "Services Section UI"
Cohesion: 0.4
Nodes (5): CTABanner Component, ServiceIcon(), ServiceIconType Type, ServiceItem Type, Services Section Component

### Community 15 - "Root Layout"
Cohesion: 0.5
Nodes (3): RootLayout(), SmoothScroll Component (referenced in layout), ThemeProvider Component (referenced in layout)

### Community 16 - "Hero Animation"
Cohesion: 0.5
Nodes (0): 

### Community 17 - "Testimonials"
Cohesion: 0.83
Nodes (4): Avatar Helper, ReviewCard Helper, StarRow Helper, Testimonials Section Component

### Community 18 - "Services Pages"
Cohesion: 0.67
Nodes (1): ServicesPage()

### Community 19 - "Navbar Behavior"
Cohesion: 0.67
Nodes (0): 

### Community 20 - "Services Pricing"
Cohesion: 0.67
Nodes (0): 

### Community 21 - "Contact Sections"
Cohesion: 0.67
Nodes (3): ContactForm Component, ContactHero Component, ContactMap Component

### Community 22 - "Google Reviews"
Cohesion: 0.67
Nodes (3): fetchGoogleReviews Function, GoogleReview Interface, Reviews Utility (lib/reviews)

### Community 23 - "Dev Documentation"
Cohesion: 0.67
Nodes (3): AGENTS.md — Next.js Version Warning, Next.js Breaking Changes Warning, Project README

### Community 24 - "About Us Page"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Admin Layout"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Admin Packages Page"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Admin Featured Page"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Admin Login Form"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Contact Form"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Contact Page"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Website Portfolio Page"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Graphics Portfolio Page"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Terms & Conditions"
Cohesion: 1.0
Nodes (2): Terms & Conditions Page, Terms Sections Data (inline policy content)

### Community 34 - "Admin Logout"
Cohesion: 1.0
Nodes (2): AdminNav handleLogout, POST /api/auth/logout endpoint

### Community 35 - "Featured Projects"
Cohesion: 1.0
Nodes (2): FeaturedProject Type, Portfolio Section Component

### Community 36 - "PostCSS Config"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Next.js Type Defs"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "ESLint Config"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Home Page"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Admin Projects Page"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "ThemeToggle"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Portfolio Section"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "CTA Banner"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "FAQ Section"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "About Section"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Contact Map"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Contact Hero"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "About Values"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "About Founder"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "About Hero"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "About Stats"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Graphics Portfolio File"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Website Portfolio File"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Services Hero"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "PostCSS Module"
Cohesion: 1.0
Nodes (1): PostCSS Config

### Community 57 - "Next.js Env Types"
Cohesion: 1.0
Nodes (1): Next.js Environment Type Declarations

### Community 58 - "Proxy Config"
Cohesion: 1.0
Nodes (1): Proxy Middleware Matcher Config

### Community 59 - "ESLint Module"
Cohesion: 1.0
Nodes (1): ESLint Config

### Community 60 - "Next.js Module"
Cohesion: 1.0
Nodes (1): Next.js Config

### Community 61 - "SEO Metadata"
Cohesion: 1.0
Nodes (1): Root Layout Metadata (SEO)

### Community 62 - "About Us Route"
Cohesion: 1.0
Nodes (1): About Us Page

### Community 63 - "FAQ Component"
Cohesion: 1.0
Nodes (1): FAQ Section Component

### Community 64 - "Contact Route"
Cohesion: 1.0
Nodes (1): Contact Us Page

## Knowledge Gaps
- **96 isolated node(s):** `PostCSS Config`, `Next.js Environment Type Declarations`, `Proxy Middleware Matcher Config`, `ESLint Config`, `Next.js Config` (+91 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `About Us Page`** (2 nodes): `page.tsx`, `AboutPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Layout`** (2 nodes): `layout.tsx`, `AdminLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Packages Page`** (2 nodes): `page.tsx`, `PackagesPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Featured Page`** (2 nodes): `page.tsx`, `FeaturedPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Login Form`** (2 nodes): `page.tsx`, `handleSubmit()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Form`** (2 nodes): `ContactForm.tsx`, `handleSubmit()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Page`** (2 nodes): `page.tsx`, `ContactPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Website Portfolio Page`** (2 nodes): `page.tsx`, `WebsitePortfolioPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Graphics Portfolio Page`** (2 nodes): `page.tsx`, `GraphicsPortfolioPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Terms & Conditions`** (2 nodes): `Terms & Conditions Page`, `Terms Sections Data (inline policy content)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Logout`** (2 nodes): `AdminNav handleLogout`, `POST /api/auth/logout endpoint`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Featured Projects`** (2 nodes): `FeaturedProject Type`, `Portfolio Section Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Config`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Type Defs`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Projects Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ThemeToggle`** (1 nodes): `ThemeToggle.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Portfolio Section`** (1 nodes): `Portfolio.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CTA Banner`** (1 nodes): `CTABanner.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FAQ Section`** (1 nodes): `FAQ.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Section`** (1 nodes): `About.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Map`** (1 nodes): `ContactMap.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Hero`** (1 nodes): `ContactHero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Values`** (1 nodes): `AboutValues.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Founder`** (1 nodes): `AboutFounder.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Hero`** (1 nodes): `AboutHero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Stats`** (1 nodes): `AboutStats.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Graphics Portfolio File`** (1 nodes): `GraphicsPortfolio.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Website Portfolio File`** (1 nodes): `WebsitePortfolio.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Services Hero`** (1 nodes): `ServicesHero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Module`** (1 nodes): `PostCSS Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Env Types`** (1 nodes): `Next.js Environment Type Declarations`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Proxy Config`** (1 nodes): `Proxy Middleware Matcher Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Module`** (1 nodes): `ESLint Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Module`** (1 nodes): `Next.js Config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SEO Metadata`** (1 nodes): `Root Layout Metadata (SEO)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `About Us Route`** (1 nodes): `About Us Page`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FAQ Component`** (1 nodes): `FAQ Section Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Route`** (1 nodes): `Contact Us Page`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `proxy()` connect `Admin Auth & Core` to `API Routes`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `readData (DB utility, called in home page)` connect `Admin Dashboard & CRUD` to `Page Server Components`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `Admin Layout` connect `Admin Auth & Core` to `Admin Dashboard & CRUD`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `POST()` (e.g. with `checkPassword()` and `createSessionToken()`) actually correct?**
  _`POST()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Social Media Posts Portfolio Sheet 1` (e.g. with `Product Showcase Social Media Design Style` and `Social Media Posts Portfolio Sheet 2`) actually correct?**
  _`Social Media Posts Portfolio Sheet 1` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Social Media Posts Portfolio Sheet 2` (e.g. with `Product Showcase Social Media Design Style` and `Social Media Posts Portfolio Sheet 1`) actually correct?**
  _`Social Media Posts Portfolio Sheet 2` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Logo Designs Portfolio Grid` (e.g. with `Gold and Black Color Palette` and `Serif Typography Style`) actually correct?**
  _`Logo Designs Portfolio Grid` has 4 INFERRED edges - model-reasoned connections that need verification._