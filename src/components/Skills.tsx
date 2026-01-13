import React from 'react';
import { FaReact, FaNodeJs, FaGitAlt, FaCode } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiMongodb, SiCplusplus } from 'react-icons/si';
import { BsCpu, BsMotherboard, BsGraphUp } from 'react-icons/bs';

const skills = [
  // Electronics & Embedded Systems
  { name: 'Embedded Systems', icon: <BsCpu className="text-[#00A0E9]" /> },
  { name: 'SystemVerilog', icon: <BsMotherboard className="text-[#FF6B6B]" /> },
  { name: 'FPGA', icon: <BsCpu className="text-[#8B5CF6]" /> },
  { name: 'VHDL', icon: <BsMotherboard className="text-[#00D9FF]" /> },
  { name: 'C++', icon: <SiCplusplus className="text-[#00599C]" /> },
  // Signal Processing & MATLAB
  { name: 'MATLAB', icon: <FaCode className="text-[#0076A8]" /> },
  { name: 'Signal Processing', icon: <BsGraphUp className="text-[#FF9800]" /> },
  // Web Development
  { name: 'React', icon: <FaReact className="text-[#61DAFB]" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-[#339933]" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-black" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: 'Git', icon: <FaGitAlt className="text-[#F05032]" /> },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-[#18181b] transition-colors duration-700">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all duration-700">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer border border-gray-800"
            >
              <div className="text-4xl mb-4 transition-colors duration-500">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-white transition-colors duration-500">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 