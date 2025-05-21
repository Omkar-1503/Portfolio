"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Hero3D from "@/components/Hero3D";
import ContactForm from "@/components/ContactForm";
import SpaceBackground from "@/components/SpaceBackground";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

// Animation variants for consistent effects
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Home() {
  // Refs for sections to track scroll progress
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Parallax effect for sections
  const { scrollYProgress } = useScroll();
  const aboutY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const experienceY = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);
  const projectsY = useTransform(scrollYProgress, [0.4, 0.7], [50, -50]);
  const skillsY = useTransform(scrollYProgress, [0.6, 0.9], [50, -50]);

  // State for client-side rendered particles
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  // Generate particles only on the client side
  useEffect(() => {
    const particleElements = Array.from({ length: 20 }).map((_, i) => {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const width = `${Math.random() * 20 + 10}px`;
      const height = `${Math.random() * 20 + 10}px`;
      const opacity = Math.random() * 0.3;
      const scale = Math.random() * 0.5 + 0.5;
      const duration = Math.random() * 10 + 10;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm"
          style={{
            top,
            left,
            width,
            height,
            opacity,
            transform: `scale(${scale})`,
            animation: `float ${duration}s infinite ease-in-out`,
          }}
        />
      );
    });

    setParticles(particleElements);
  }, []);

  return (
    <SpaceBackground>
      {/* Hero Section - without any separator */}
      <section className="relative">
        <Hero3D />
      </section>

      {/* About Section - reduced height and padding */}
      <motion.section
        ref={aboutRef}
        style={{ y: aboutY }}
        className="relative py-16 px-4 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center text-white mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                Who I Am
              </h3>
              <p className="text-gray-300 mb-4">
                I'm a Computer Science Engineering student at Symbiosis Institute
                of Technology, passionate about building impactful web and mobile
                applications.
              </p>
              <p className="text-gray-300 mb-4">
                Currently working as a Software Engineer Intern at Fendahl
                Technology, where I'm leveraging .NET, C#, and React Native to
                develop cross-platform mobile solutions.
              </p>
              <p className="text-gray-300">
                My goal is to create beautiful, efficient, and user-friendly
                applications that solve real-world problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-bold text-blue-400 mb-2">
                    Education
                  </h4>
                  <p className="text-gray-300">B.Tech in Computer Science</p>
                  <p className="text-gray-400 text-sm">
                    Symbiosis Institute of Technology
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-bold text-blue-400 mb-2">
                    Experience
                  </h4>
                  <p className="text-gray-300">Software Engineer Intern</p>
                  <p className="text-gray-400 text-sm">
                    Fendahl Technology Pvt. Ltd.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-bold text-blue-400 mb-2">
                    Location
                  </h4>
                  <p className="text-gray-300">Nagpur, India</p>
                  <p className="text-gray-400 text-sm">Open to Remote Work</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-bold text-blue-400 mb-2">
                    Interests
                  </h4>
                  <p className="text-gray-300">Web Development</p>
                  <p className="text-gray-400 text-sm">Mobile Apps, 3D Web</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Magical floating particles for this section */}
        <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
          {particles}
        </div>
      </motion.section>

      {/* Experience Section - reduced height and padding */}
      <motion.section
        ref={experienceRef}
        style={{ y: experienceY }}
        className="relative py-16 px-4 overflow-hidden"
      >
        {/* Subtle overlay just for this section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b30]/0 via-[#13064f]/30 to-[#0b0b30]/0 -z-10 mix-blend-overlay"></div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center text-white mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    Software Engineer Intern
                  </h3>
                  <p className="text-xl text-gray-300">
                    Fendahl Technology Pvt. Ltd.
                  </p>
                </div>
                <div className="text-gray-400 md:text-right mt-2 md:mt-0">
                  <p>Nagpur, India</p>
                  <p>Feb 2025 - Present</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>
                  Gained a strong foundation in .NET Framework, C#, and ASP.NET Core
                  MVC, contributing to a new cross-platform mobile application.
                </li>
                <li>
                  Accelerated mobile UI development by ~15% using React Native to
                  build key interface components.
                </li>
                <li>
                  Improved mobile data integration with GraphQL, REST APIs, and Cosmos
                  DB, reducing loading times by 10%.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    Full Stack Developer Intern
                  </h3>
                  <p className="text-xl text-gray-300">Bharat Intern</p>
                </div>
                <div className="text-gray-400 md:text-right mt-2 md:mt-0">
                  <p>Remote, India</p>
                  <p>Dec 2023 - Jan 2024</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>
                  Engineered a scalable blog platform using HTML, CSS, Node.js,
                  Express.js, and MongoDB; improved content management efficiency by
                  30%.
                </li>
                <li>
                  Created a registration form with Node.js, MongoDB, and Express.js;
                  enhanced user data security and operational efficiency by 50%.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section - reduced height and padding */}
      <motion.section
        ref={projectsRef}
        style={{ y: projectsY }}
        className="relative py-16 px-4 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center text-white mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                Doodle Dash
              </h3>
              <p className="text-gray-400 mb-4">Real-Time Multiplayer Drawing Game</p>
              <p className="text-gray-300 mb-4">
                Built a scalable multiplayer drawing and guessing game supporting 10+
                real-time users with canvas synchronization and time-limited turns.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Socket.IO
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Redis
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  React
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Docker
                </span>
              </div>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  View Demo
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                  Source Code
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                Cryptonite
              </h3>
              <p className="text-gray-400 mb-4">Crypto Tracker</p>
              <p className="text-gray-300 mb-4">
                Designed a Web3-inspired cryptocurrency tracker with detailed coin
                information, interactive price charts, personalized watchlists and dark
                mode for enhanced user experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  React
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Tailwind CSS
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Redux Toolkit
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Chart.js
                </span>
                <span className="px-3 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">
                  Netlify
                </span>
              </div>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  View Demo
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                  Source Code
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section - reduced height and padding, remove the transition div */}
      <motion.section
        ref={skillsRef}
        style={{ y: skillsY }}
        className="relative py-16 px-4 overflow-hidden"
      >
        {/* Subtle overlay just for this section - adjusted to blend with contact */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b30]/0 via-[#13064f]/30 to-[#020420]/40 -z-10 mix-blend-multiply"></div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center text-white mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Languages</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">JavaScript</span>
                    <span className="text-blue-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">TypeScript</span>
                    <span className="text-blue-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">C#</span>
                    <span className="text-blue-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Python</span>
                    <span className="text-blue-400">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-blue-400 mt-10 mb-6">
                Databases
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">MongoDB</span>
                    <span className="text-blue-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">SQL</span>
                    <span className="text-blue-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Cosmos DB</span>
                    <span className="text-blue-400">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Redis</span>
                    <span className="text-blue-400">70%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">
                Frameworks & Libraries
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">React.js</span>
                    <span className="text-blue-400">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Next.js</span>
                    <span className="text-blue-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Node.js</span>
                    <span className="text-blue-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Express.js</span>
                    <span className="text-blue-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">.NET Core</span>
                    <span className="text-blue-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">React Native</span>
                    <span className="text-blue-400">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-blue-400 mt-10 mb-6">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Git
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Docker
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Linux
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Netlify
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Vercel
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Redis
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Socket.IO
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  GraphQL
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  REST APIs
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300">
                  Vite
                </span>
              </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
    
        {/* Contact Section - adjust to blend with Skills section */}
        <section className="relative py-16 px-4">
          {/* Create a gradient that blends with the skills section */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020420]/60 to-[#020420] -z-10"></div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center text-white mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
              <p className="max-w-md mx-auto text-lg">
                Have a question or want to work together? Send me a message!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10"
              >
                <ContactForm />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10 flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">+91 93091-46502</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">omkarkhadakkar13@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">Nagpur, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Connect With Me
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com/in/omkarkhadakkar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-300 hover:bg-blue-600/50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                    </a>
                    <a
                      href="https://github.com/Omkar-1503"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-300 hover:bg-blue-600/50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    </a>
                    <a
                      href="mailto:omkarkhadakkar13@gmail.com"
                      className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-300 hover:bg-blue-600/50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer - adjust to blend with contact */}
        <footer className="relative text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p>© 2024 Omkar Khadakkar. All Rights Reserved.</p>
            <p className="text-gray-400 mt-2">
              Built with Next.js, Three.js, and Framer Motion
            </p>
          </div>
        </footer>

        <Toaster position="top-right" />
    </SpaceBackground>
  );
}
