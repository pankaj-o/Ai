'use client';

import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: false });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Pankaj',
          to_email: 'er.pankaj2021@gmail.com',
          reply_to: formData.email
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus({ submitting: false, submitted: true, error: false });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: true });
      console.error('Error sending email:', error);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black transition-colors duration-700">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all duration-700">Contact Me</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-lg shadow-lg transition-all duration-500 border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-cyan-300 mb-1 transition-colors duration-500">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cyan-300 mb-1 transition-colors duration-500">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-cyan-300 mb-1 transition-colors duration-500">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status.submitting}
                  className={`w-full py-2 px-4 rounded-md transition-all duration-300 shadow font-semibold text-white ${
                    status.submitting
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 hover:scale-105'
                  }`}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
                {status.submitted && (
                  <p className="text-green-400 text-center mt-2 transition-colors duration-500">
                    Thank you for your message! I will get back to you soon.
                  </p>
                )}
                {status.error && (
                  <p className="text-red-400 text-center mt-2 transition-colors duration-500">
                    Oops! Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-cyan-300 transition-colors duration-500">Get in Touch</h3>
                <p className="text-gray-300 transition-colors duration-500">
                  Im always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-300 transition-colors duration-500">Connect with Me</h3>
                <div className="flex space-x-6">
                  <a
                    href="https://github.com/pankaj-o"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white transition-colors duration-300"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/pankaj-sharma-75597a181"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white transition-colors duration-300"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white transition-colors duration-300"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="mailto:er.pankaj2021@gmail.com"
                    className="text-cyan-300 hover:text-white transition-colors duration-300"
                  >
                    <FaEnvelope size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 