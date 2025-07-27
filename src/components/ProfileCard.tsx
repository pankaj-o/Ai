import React from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaMicrochip, FaTools } from 'react-icons/fa';

const ProfileCard = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto p-8 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border-2 border-emerald-500/40 hover:scale-105 transition-all duration-500 group overflow-hidden flex flex-col items-center">
      {/* Techy border accent */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-dashed border-emerald-400/30 z-0" />
      {/* Profile Image */}
      <div className="relative z-10 -mt-20 mb-4">
        <div className="w-44 h-44 rounded-2xl overflow-hidden border-4 border-emerald-400 bg-[#18181b] shadow-xl flex items-center justify-center">
          <Image
            src="/profile.jpg"
            alt="Profile picture"
            width={176}
            height={176}
            className="object-cover w-full h-full"
            priority
            quality={100}
          />
        </div>
      </div>
      {/* Name and Badge */}
      <div className="z-10 flex flex-col items-center w-full">
        <h3 className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Pankaj Sharma</h3>
        <span className="inline-flex items-center gap-2 px-4 py-1 mb-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow">
          <FaMicrochip className="text-white" /> Electronics Engineer
        </span>
        <span className="text-base text-emerald-200 font-mono mb-4 flex items-center gap-2">
          <FaTools className="inline-block text-emerald-300" /> Building the future, one circuit & code at a time
        </span>
        <div className="flex space-x-8 mb-4">
          <a
            href="https://github.com/pankaj-o"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-white transition-colors duration-300"
          >
            <FaGithub size={32} />
          </a>
          <a
            href="https://linkedin.com/in/pankaj-sharma-75597a181"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
        <span className="inline-block px-6 py-2 mt-2 rounded-full bg-emerald-700/80 text-white text-base font-semibold shadow transition-all duration-300 border border-emerald-400/40">
          Open to Opportunities
        </span>
      </div>
      {/* Glassmorphism accent shapes */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 z-0" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 z-0" />
    </div>
  );
};

export default ProfileCard; 