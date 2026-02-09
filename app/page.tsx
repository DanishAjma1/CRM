"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Target,
  Code,
  TrendingUp,
  Users,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const services = [
    {
      icon: Target,
      title: "Google Ads Management",
      description:
        "Expert campaign management with data-driven strategies to maximize your ROI and reach your target audience effectively.",
      features: [
        "Campaign Strategy",
        "Ad Optimization",
        "Performance Tracking",
        "Budget Management",
      ],
    },
    {
      icon: TrendingUp,
      title: "Marketing Solutions",
      description:
        "Comprehensive marketing services including SEO, social media management, and content marketing to grow your brand.",
      features: [
        "Social Media Marketing",
        "SEO Optimization",
        "Content Strategy",
        "Brand Development",
      ],
    },
    {
      icon: Code,
      title: "Custom Coding & Apps",
      description:
        "Tailored web applications and software solutions designed to streamline your business operations and enhance efficiency.",
      features: [
        "Web Development",
        "Mobile Apps",
        "Dashboard Solutions",
        "API Integration",
      ],
    },
  ];

  const card = {
    hidden: { opacity: 0, x: 20, y: 5 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-blue-900/50">
        <source
          src="https://tkxel.com/wp-content/uploads/2025/11/tkxel-hero-animation-cropped.mp4"
          type="video/mp4"
        ></source>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-white animate-slide-in-left">
              <span className="gradient-text tracking-wide">CustomSerives</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#contact"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                href="/authentication/client/register"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Register
              </Link>
              <Link
                href="/authentication/client/login"
                className="text-blue-200 hover:text-blue-600 hover:underline transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/authentication/admin"
                className="px-6 py-1 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-300"
              >
                Admin Access
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in-up">
              <Link
                href="#services"
                className="block text-blue-200 hover:text-white transition-colors duration-300"
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="block text-blue-200 hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                href="/authentication/client/register"
                className="text-white hover:drop-shadow transition-all duration-300 text-center"
              >
                Register
              </Link>
              <Link
                href="/authentication/client/login"
                className="block px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-center"
              >
                Sign In
              </Link>
              <Link
                href="/authentication/admin"
                className="block px-6 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-300 text-center"
              >
                Admin
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Elevate Your Business with{" "}
                <span className="gradient-text">Digital Excellence</span>
              </h1>
              <p className="text-xl text-blue-200">
                We deliver cutting-edge marketing solutions, Google Ads
                expertise, and custom software development to help your business
                thrive in the digital age.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/authentication/client/register"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 flex items-center gap-2 group"
                >
                  Register Now
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-blue-300 text-sm">
                    Successful Campaigns
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-blue-300 text-sm">
                    Client Satisfaction
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">$5M+</div>
                  <div className="text-blue-300 text-sm">Ad Spend Managed</div>
                </div>
              </div>
            </div>

            {/* <AnimatePresence> */}
            <motion.div
              className="relative"
              variants={card}
              initial={"hidden"}
              whileInView={"visible"}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-linear-to-br from-blue-900/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 animate-float">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-blue-500/20">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Google Ads ROI
                      </div>
                      <div className="text-green-400 text-2xl font-bold">
                        +380%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-blue-500/20">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Conversion Rate
                      </div>
                      <div className="text-green-400 text-2xl font-bold">
                        12.5%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-blue-500/20">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Active Clients
                      </div>
                      <div className="text-green-400 text-2xl font-bold">
                        150+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* </AnimatePresence> */}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to accelerate your
              business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  <div className="mb-6 p-4 bg-blue-600 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-blue-200 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2 text-blue-300"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-blue-200">
              Ready to transform your business? Let's talk about your goals
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 animate-fade-in-up">
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-blue-200">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-200 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-blue-500/30 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-blue-500/30 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-blue-200 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-blue-500/30 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-white/5 border border-blue-500/30 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-blue-900/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <span className="gradient-text">AdVantage</span>
              </div>
              <p className="text-blue-300">
                Transforming businesses through innovative digital marketing and
                custom technology solutions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="p-2 bg-blue-600/20 rounded-lg hover:bg-blue-600 transition-all duration-300 group"
                >
                  <Facebook className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-blue-600/20 rounded-lg hover:bg-blue-600 transition-all duration-300 group"
                >
                  <Twitter className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-blue-600/20 rounded-lg hover:bg-blue-600 transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-blue-600/20 rounded-lg hover:bg-blue-600 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#services"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    Google Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-blue-300 hover:text-white transition-colors duration-300"
                  >
                    Mobile Apps
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-blue-300">
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>hello@advantage.com</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <Phone className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-2 text-blue-300">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>123 Business Ave, Suite 100, New York, NY 10001</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-blue-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">
              © 2024 AdVantage. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-blue-300 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-blue-300 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-blue-300 hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
