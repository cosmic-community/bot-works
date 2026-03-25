# Bot Works — Digital Services Platform
![App Preview](https://imgix.cosmicjs.com/50e7d5a0-280e-11f1-a9b4-1bd048ffba97-autopilot-photo-1472099645785-5658abf4ff4e-1774417737704.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive company website for **Bot Works**, a digital services firm combining human expertise with AI-powered team members to deliver tailored solutions across industries. Built with Next.js 16 and powered by Cosmic CMS.

## Features

- 🏠 **Dynamic Homepage** — Hero section, featured services, team highlights, case studies, and testimonials
- 🛠️ **Services Showcase** — Complete listing with individual detail pages
- 👥 **Team Directory** — Filterable by Human/AI member type with individual profiles
- 📊 **Case Studies** — Detailed project breakdowns with connected services and team members
- ⭐ **Client Testimonials** — Star ratings and company attribution
- 📱 **Fully Responsive** — Mobile-first design across all breakpoints
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router
- 🎨 **Modern UI** — Tailwind CSS with smooth animations and hover effects

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69c376cede4357f8519a3236&clone_repository=69c37829c3cad27e1b2e5838)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a professional services company with services offered, team members (including photos and bios), case studies, and client testimonials.
>
> User instructions: Bot Works is a digital services firm combining human expertise with AI-powered team members to deliver tailored solutions across industries. We provide end-to-end project management and digital services designed to meet the unique needs of diverse clientele."

### Code Generation Prompt

> "Build a Next.js application for a company website called "Bot Works". The content is managed in Cosmic CMS with the following object types: services, team-members, case-studies, testimonials. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Bot Works is a digital services firm combining human expertise with AI-powered team members to deliver tailored solutions across industries. We provide end-to-end project management and digital services designed to meet the unique needs of diverse clientele."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the Bot Works content model

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd bot-works

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Case Study with Connected Objects

```typescript
const { object: caseStudy } = await cosmic.objects
  .findOne({ type: 'case-studies', slug: 'my-case-study' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(2)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| 🛠️ Services | `services` | Service offerings with descriptions, icons, and images |
| 👤 Team Members | `team-members` | Team bios, photos, roles, and member type (Human/AI) |
| 📊 Case Studies | `case-studies` | Project showcases with connected services and team |
| ⭐ Testimonials | `testimonials` | Client quotes with ratings and company info |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->