import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export const Projects = () => {
  const projects = [
    {
      title: 'Advanced Hardware Verification',
      name: 'Advanced Hardware Verification',
      description: 'A comprehensive hardware verification project using SystemVerilog, focusing on the verification of synchronous FIFOs and Gray code counters. Includes testbench development, assertion-based verification, and coverage analysis.',
      technologies: ['SystemVerilog', 'VHDL', 'Questa', 'OVL'],
      github: 'https://github.com/pankaj-o/Advance-Hardware-verification',
      features: [],
      live: null,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-[#18181b] transition-colors duration-700">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all duration-700">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col p-6 min-h-[350px] relative hover:scale-105 border border-gray-800"
            >
              {/* Project Title at Top Left */}
              <span className="absolute top-4 left-6 text-base font-normal text-cyan-300 transition-colors duration-500">{project.title}</span>

              {/* Project Name Bold */}
              <div className="mt-10 mb-2">
                <h3 className="text-xl font-bold mb-2 text-white transition-colors duration-500">{project.name}</h3>
                <p className="text-gray-300 mb-4 transition-colors duration-500">{project.description}</p>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-700 to-purple-700 text-white rounded-full text-sm shadow transition-all duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Code and Live Demo Links */}
              <div className="mt-auto flex gap-6 items-center">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-300 hover:text-white transition-colors duration-300"
                >
                  <FaGithub /> Code
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors duration-300"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 