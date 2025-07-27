"use client"
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import LightRays from './Background';
import TextType from './Texttype';


export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* LightRays background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <LightRays
          raysOrigin="right"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
        />
      </div>
      {/* Hero content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          <TextType 
  text={["Electronics Engineer & Developer"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
          </h1>
        
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Specializing in Embedded Systems, SystemVerilog, and Full Stack Web Development
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:from-emerald-400 hover:to-teal-400 hover:scale-105 transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-emerald-500 text-emerald-700 font-semibold rounded-full bg-white shadow-lg hover:bg-emerald-50 hover:border-teal-500 hover:text-teal-700 hover:scale-105 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/pankaj-o"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://linkedin.com/in/pankaj-sharma-75597a181"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 