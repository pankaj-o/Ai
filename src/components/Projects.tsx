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
    {
      title: 'El Toro Restaurant Website',
      name: 'El Toro Restaurant Website',
      description: 'A modern, responsive website for El Toro Spanish Restaurant in Delmenhorst. Features online table reservations, menu display, and a beautiful user interface showcasing the restaurant\'s authentic Spanish cuisine and atmosphere.',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      github: 'https://github.com/pankaj-o/aioli-flame',
      features: [],
      live: 'https://aioli-flame.vercel.app/',
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col p-6 min-h-[350px] relative"
            >
              {/* Project Title at Top Left */}
              <span className="absolute top-4 left-6 text-base font-normal text-gray-700">{project.title}</span>

              {/* Project Name Bold */}
              <div className="mt-10 mb-2">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <FaGithub /> Code
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
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