import React from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaMicrochip, FaTools } from 'react-icons/fa';

const ProfileCard = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto p-10 rounded-3xl bg-gradient-to-br from-[#18181b]/90 to-emerald-900/70 backdrop-blur-xl shadow-2xl border border-emerald-500/40 flex flex-col items-center">
      {/* Profile Image */}
      <div className="relative z-10 mb-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-400 shadow-xl flex items-center justify-center bg-white/10">
          <Image
            src="/profile.jpg"
            alt="Profile picture"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* Name and Badge */}
      <h3 className="text-3xl font-extrabold text-white mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight text-center">Pankaj Sharma</h3>
      <span className="inline-flex items-center gap-2 px-4 py-2 mb-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-base font-semibold shadow">
        <FaMicrochip className="text-white" /> Electronics Engineer
      </span>
      <span className="text-base text-emerald-200 font-mono mb-6 flex items-center gap-2 text-center">
        <FaTools className="inline-block text-emerald-300" /> Building the future, one circuit & code at a time
      </span>
      <div className="flex space-x-8 mb-8">
        <a
          href="https://github.com/pankaj-o"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-emerald-500/20 hover:bg-emerald-400/40 transition-colors duration-300 shadow-lg"
        >
          <FaGithub size={32} className="text-emerald-400 hover:text-white transition-colors duration-300" />
        </a>
        <a
          href="https://linkedin.com/in/pankaj-sharma-75597a181"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-teal-500/20 hover:bg-teal-400/40 transition-colors duration-300 shadow-lg"
        >
          <FaLinkedin size={32} className="text-teal-400 hover:text-white transition-colors duration-300" />
        </a>
      </div>
      <span className="inline-block px-7 py-3 rounded-full bg-emerald-700/90 text-white text-base font-semibold shadow border border-emerald-400/40 hover:bg-emerald-600/90 transition-all duration-300">
        Open to Opportunities
      </span>
    </div>
  );
};

export default ProfileCard;