import React from 'react';
import Image from 'next/image';

export const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                I am currently pursuing my Masters in Electronics Engineering with a focus on Embedded Systems and SystemVerilog. 
                My passion lies in the intersection of hardware and software, where I combine my expertise in electronic design 
                with modern web development practices.
              </p>
              <p className="text-lg text-gray-600">
                With two years of experience in web development, I've built a strong foundation in creating responsive and 
                efficient web applications. This unique combination of skills allows me to approach problems from both 
                hardware and software perspectives, enabling me to develop comprehensive solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Education</h3>
                  <p className="text-gray-600">M.S. in Electronics Engineering</p>
                  <p className="text-gray-600">Current Student</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Experience</h3>
                  <p className="text-gray-600">2+ Years in Web Development</p>
                  <p className="text-gray-600">Embedded Systems Research</p>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
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