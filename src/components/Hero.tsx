import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Electronics Engineer & Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Specializing in Embedded Systems, SystemVerilog, and Full Stack Web Development
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 transition-colors"
            >
              Contact Me
            </a>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/pankaj-o"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 