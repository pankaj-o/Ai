'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Contact = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="contact"  className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#10151c] py-20">
      <div
        className="card-container"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        tabIndex={0}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        style={{ outline: 'none' }}
      >
        <div
          className="card-inner"
          style={{
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div className="card-face card-front">
            <Image
              src="/Contactme.jpg"
              alt="Contact"
              className="w-40 h-40 rounded-full mb-6 object-cover shadow-lg"
              width={160}
              height={160}
            />
            <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text mb-4">
              Let&rsquo;s Connect!
            </h2>
            <p className="text-gray-300 text-center text-base mb-2">
              Interested in collaborating, working together, or just want to say hello?
            </p>
            <p className="text-gray-400 text-center text-sm mb-2">
              I love meeting new people, sharing ideas, and building innovative solutions. Whether you have a project in mind or want to discuss technology, feel free to reach out!
            </p>
            <p className="text-gray-500 text-center text-xs">
              Hover over this card to see how you can contact me directly.
            </p>
            <p className="text-gray-500 text-center text-xs mb-6">
              Click the button below to send me an email. I look forward to hearing from you!
            </p>
          </div>
          <div className="card-face card-back">
            <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text mb-4">
              Let&rsquo;s Work Together
            </h2>
            <p className="text-gray-300 text-center text-base mb-2 leading-relaxed">
              I&rsquo;m open to freelance projects, internships, and full-time opportunities. My expertise includes electronics engineering, embedded systems, and software development.
            </p>
            <p className="text-gray-400 text-center text-sm mb-2">
              I value clear communication, creative problem-solving, and delivering high-quality results. Let&rsquo;s build something amazing together!
            </p>
            <p className="text-gray-500 text-center text-xs mb-6">
              Click the button below to send me an email. I look forward to hearing from you!
            </p>
            <a
              href="mailto:er.pankaj2021@gmail.com"
              className="px-7 py-3 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Send Me Mail
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          width: 480px;
          height: 600px;
          perspective: 1200px;
          cursor: pointer;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #18181b;
          border: 1px solid #23272f;
          border-radius: 1rem;
          padding: 2.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          backface-visibility: hidden;
        }

        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};
