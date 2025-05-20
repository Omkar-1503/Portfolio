You are my coding assistant. I’m a beginner and I need to build a full‑featured portfolio website in VSCode using this exact stack:
 • Next.js 13+ with App Router and TypeScript  
 • Tailwind CSS + shadcn/ui (Radix + Tailwind component library)  
 • Framer Motion + GSAP (with ScrollTrigger) + Lenis for smooth scroll  
 • Three.js via @react-three/fiber + @react-three/drei + Tweakpane for 3D  
 • Node.js + Express + Mongoose (MongoDB Atlas) + Nodemailer for backend/API  
 • Vercel for hosting and GitHub Actions for CI  
Explain everything clearly and precisely as if to a beginner, in numbered steps. Start from project creation (npm create or pnpm create), cover installation of each dependency, folder structure, basic example code snippets, and end with deployment.  
At each major step (frontend init, styling, animations, 3D, backend, deployment) include:
 1. **What** we’re doing and **why**  
 2. **Exact commands** to run  
 3. A **short code snippet** or config example  
 4. **Next** pointers to proceed  
Organize your response like this:
1. **Initialize Next.js + TypeScript**  
  - Why choose Next.js & TS  
  - `npm create next-app@latest my-portfolio --typescript --use-npm --experimental-app`  
  - …
2. **Set up Tailwind CSS & shadcn/ui**  
  - Why utility-first + component library  
  - `npm install -D tailwindcss postcss autoprefixer`  
  - `npx tailwindcss init -p` …  
  - Example `tailwind.config.js` and shadcn setup
3. **Add Framer Motion, GSAP & Lenis**  
  - Why combine React animation + high‑performance scroll  
  - `npm install framer-motion gsap lenis`  
  - Example of a scroll‑triggered GSAP timeline in a Next.js page  
4. **Integrate Three.js (@react-three/fiber + drei + Tweakpane)**  
  - Why use Three.js with React  
  - `npm install three @react-three/fiber @react-three/drei tweakpane`  
  - Basic `<Canvas>` example showing a spinning cube and a Tweakpane panel  
5. **Build Backend: Node.js + Express + Mongoose + Nodemailer**  
  - Why a custom API demonstrates backend skills  
  - Create `server/` folder, `npm init -y`, install `express mongoose nodemailer dotenv`  
  - Example `server/index.js` with one `/api/contact` POST route  
6. **Connect Frontend to Backend**  
  - How to call your Express API from Next.js (e.g. `fetch('/api/contact')`)  
  - Show an example contact form component  
7. **Prepare for Deployment**  
  - Why Vercel + GitHub Actions  
  - Add `vercel.json` or use Next.js defaults  
  - Example `.github/workflows/ci.yml` for linting and test builds  
8. **Final Checks & Launch**  
  - Environment variables setup  
  - Testing both frontend and backend  
  - `git push` ➔ automatic deploy
Explain each step thoroughly but concisely. Use bullet points, headings, and code blocks. Let’s get started!