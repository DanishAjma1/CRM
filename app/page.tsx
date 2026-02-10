"use client";

import React, { useState } from "react";
import {
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
