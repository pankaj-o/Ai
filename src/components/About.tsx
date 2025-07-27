import React from 'react';
import Image from 'next/image';
import ProfileCard from './ProfileCard';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-[#18181b] transition-colors duration-700">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all duration-700">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ProfileCard />
            <div className="space-y-6">
              <p className="text-lg text-gray-300 transition-colors duration-500">
                I&apos;m currently pursuing my Master&apos;s in Electronics Engineering with a focus on Embedded Systems and SystemVerilog. 
                My passion lies in the intersection of hardware and software, where I combine my expertise in electronic design 
                with modern web development practices.
              </p>
              <p className="text-lg text-gray-300 transition-colors duration-500">
                With two years of experience in web development, I have built a strong foundation in creating responsive and 
                efficient web applications. Additionally, I am actively working on hardware verification projects using SystemVerilog, 
                including the verification of synchronous FIFOs and Gray code counters. This unique combination of skills allows me 
                to approach problems from both hardware and software perspectives, enabling me to develop comprehensive solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-cyan-300 transition-colors duration-500">Education</h3>
                  <p className="text-gray-300 transition-colors duration-500">M.S. in Electronics Engineering</p>
                  <p className="text-gray-300 transition-colors duration-500">Current Student</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-purple-300 transition-colors duration-500">Experience</h3>
                  <p className="text-gray-300 transition-colors duration-500">2+ Years in Web Development</p>
                  <p className="text-gray-300 transition-colors duration-500">Hardware Verification & Embedded Systems</p>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold shadow hover:from-emerald-400 hover:to-teal-400 hover:scale-105 transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 