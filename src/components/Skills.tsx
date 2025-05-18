import React from 'react';
import { FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiArduino, SiMongodb } from 'react-icons/si';
import { BsCpu, BsMotherboard } from 'react-icons/bs';

const skills = [
  // Electronics & Embedded Systems
  { name: 'Embedded Systems', icon: <BsCpu className="text-[#00A0E9]" /> },
  { name: 'SystemVerilog', icon: <BsMotherboard className="text-[#FF6B6B]" /> },
  { name: 'Arduino', icon: <SiArduino className="text-[#00979D]" /> },
  { name: 'PCB Design', icon: <BsMotherboard className="text-[#4CAF50]" /> },
  
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
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-lg font-semibold">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 