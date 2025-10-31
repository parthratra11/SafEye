"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="w-full py-3 px-4 sm:px-6 flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-lg border-t border-emerald-500 sticky top-0 z-50">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/95 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/national_emblem.svg"
              alt="Government of India Emblem"
              width={50}
              height={50}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 font-sans tracking-tight">
              सफ़Eye
            </h1>
            <p className="text-xs sm:text-sm text-emerald-600 font-medium font-sans">
              Smart Infrastructure Monitoring System
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <Link
            href="#hero"
            className="text-gray-900 hover:text-emerald-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-gray-900 hover:text-emerald-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            About
          </Link>
          <Link
            href="#services"
            className="text-gray-900 hover:text-emerald-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Features
          </Link>
          <Link
            href="#portal"
            className="text-gray-900 hover:text-emerald-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Dashboard
          </Link>
          <Link
            href="#demo"
            className="text-gray-900 hover:text-emerald-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Demo
          </Link>
          <Link
            href="#contact"
            className="text-gray-900 hover:text-emerald-600 transition-colors mx-3 xl:mx-4 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 font-medium font-sans text-md"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Image
            src="/images/swach-bharat.png"
            alt="Swachh Bharat Mission Logo"
            width={60}
            height={60}
            className="object-contain mr-2"
          />
          <Link href="/login" passHref legacyBehavior>
            <a className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg border-2 border-emerald-500 font-semibold transition-all transform hover:scale-105 font-sans text-xs sm:text-md">
              Login
            </a>
          </Link>
        </div>
      </nav>

      <div className="w-full h-[3px] bg-gradient-to-r from-emerald-500 via-gray-300 to-gray-900"></div>
    </>
  );
};

const HeroSlider = () => {
  const slides = [
    {
      title: "Smart Infrastructure Monitoring & Rapid Response",
      subtitle: "सफ़Eye - Complete Urban Management Solution",
      description:
        "AI-powered platform detecting potholes, streetlight failures, and waste accumulation with automated reporting to municipal authorities for swift resolution and cleaner cities.",
      bgImage: "/images/tempLocationMap.png",
      fgImage: "/carousel/5.png",
    },
    {
      title: "Advanced AI Detection System",
      subtitle: "Real-time Infrastructure Monitoring",
      description:
        "Continuous surveillance using CCTV feeds and computer vision to identify infrastructure issues instantly, ensuring proactive maintenance and citizen safety.",
      bgImage: "/images/tempHeatMap.png",
      fgImage: "/carousel/6.png",
    },
    {
      title: "Automated Municipal Response",
      subtitle: "Streamlined Workflow Management",
      description:
        "Smart assignment of maintenance crews based on priority, location, and resource availability with real-time tracking and completion verification.",
      bgImage: "/images/tempLocationMap.png",
      fgImage: "/carousel/7.png",
    },
    {
      title: "Citizen Engagement Platform",
      subtitle: "Community-Driven Issue Reporting",
      description:
        "Easy-to-use interface for citizens to report infrastructure problems with GPS location, photo evidence, and transparent status tracking throughout resolution.",
      bgImage: "/images/tempHeatMap.png",
      fgImage: "/carousel/8.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const isImageOnRight = currentIndex % 2 === 0;

  return (
    <section
      id="hero"
      className="relative h-[calc(100vh-70px)] w-full overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div
          key={`bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.bgImage}
            alt={`Background for ${slide.title}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/75 to-emerald-600/80 z-10"></div>

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            <div
              className={`text-white col-span-2 ${
                isImageOnRight
                  ? "order-1 lg:order-1"
                  : "order-2 lg:order-2 lg:col-start-2"
              }`}
            >
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-lg lg:text-xl text-emerald-200 font-medium font-sans tracking-wide">
                  {slides[currentIndex].subtitle}
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl italic md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight font-sans">
                {slides[currentIndex].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl mb-8 sm:mb-10 text-gray-100 leading-relaxed font-sans font-light">
                {slides[currentIndex].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Link href="/login" passHref legacyBehavior>
                  <a className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 sm:px-3 lg:px-6 py-1 sm:py-2 lg:py-2 rounded-md font-semibold transition-all transform hover:scale-105 shadow-xl border border-emerald-500 text-sm lg:text-lg font-sans">
                    Explore Platform
                  </a>
                </Link>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href="/zonal-head"
                    className="border border-white hover:bg-white hover:text-gray-900 text-white px-4 sm:px-2 lg:px-3 py-1 sm:py-2 lg:py-2 rounded-full font-semibold transition-all text-xs lg:text-sm font-sans text-center flex items-center justify-center"
                  >
                    Zonal Dashboard
                  </Link>
                  <Link
                    href="/admin"
                    className="border border-white hover:bg-white hover:text-gray-900 text-white px-4 sm:px-2 lg:px-3 py-1 sm:py-2 lg:py-2 rounded-full font-semibold transition-all text-xs lg:text-sm font-sans text-center flex items-center justify-center"
                  >
                    Admin Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute w-1/3 h-2/3 top-1/2 overflow-hidden transform -translate-y-1/2 z-30 transition-all duration-1000 ease-in-out ${
            isImageOnRight
              ? "right-0 rounded-l-full order-2 lg:order-2 animate-slide-in-right"
              : "left-0 rounded-r-full order-1 lg:order-1 animate-slide-in-left"
          }`}
          key={`image-container-${currentIndex}`}
        >
          <div className="relative">
            {slides.map((slide, index) => (
              <div
                key={`fg-${index}`}
                className={`transition-opacity bg-white duration-1000 overflow-hidden ${
                  index === currentIndex
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0"
                }`}
              >
                <Image
                  src={slide.fgImage}
                  alt={`Feature image for ${slide.title}`}
                  width={700}
                  height={700}
                  className="object-contain drop-shadow-2xl"
                  style={{
                    transform: isImageOnRight
                      ? "translateX(0%)"
                      : "translateX(0%)",
                  }}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-8 sm:py-12 lg:py-16 bg-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            About सफ़Eye
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Smart infrastructure monitoring and rapid response system for
            cleaner, safer cities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans font-light">
              सफ़Eye is a comprehensive digital solution designed to
              revolutionize urban infrastructure management through AI-powered
              monitoring and automated response systems. Our platform addresses
              critical urban challenges including potholes, streetlight
              failures, and waste accumulation with unprecedented efficiency.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans font-light">
              Through cutting-edge computer vision technology, real-time citizen
              reporting, and intelligent dispatch systems, सफ़Eye ensures
              municipalities can maintain infrastructure proactively while
              citizens enjoy transparent, accountable urban services.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="bg-gradient-to-br from-emerald-500 to-gray-900 rounded-2xl p-4 sm:p-6 shadow-xl flex items-center justify-center">
              <Image
                src="/images/app.png"
                alt="SafEye Mobile App"
                width={240}
                height={400}
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-gray-900 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 flex items-center font-sans">
                <span className="mr-3 sm:mr-4 text-3xl sm:text-4xl lg:text-5xl">
                  🏗️
                </span>
                Infrastructure Management Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  "Pothole Detection",
                  "Streetlight Monitoring",
                  "Waste Management",
                  "AI-Powered Analytics",
                  "Citizen Reporting",
                  "Real-time Tracking",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mr-3 sm:mr-4"></span>
                    <span className="text-sm sm:text-base font-sans">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="w-full h-52 sm:h-64 lg:h-80 bg-gradient-to-br from-gray-200 to-white rounded-lg sm:rounded-xl mb-4 sm:mb-6 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/dashboard.png"
                    alt="Authority Dashboard Sample"
                    width={600}
                    height={300}
                    className="object-cover w-full h-full rounded-lg sm:rounded-xl"
                    priority
                  />
                </div>
                <h4 className="font-bold text-center text-base sm:text-lg font-sans">
                  Administrative Control Panel
                </h4>
                <p className="text-xs sm:text-sm text-center mt-2 sm:mt-3 opacity-90 font-sans">
                  Real-time monitoring and response coordination dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: "🚨",
      title: "Emergency Infrastructure Detection",
      desc: "Automated identification of critical infrastructure failures including potholes, broken streetlights, and waste accumulation using advanced AI algorithms.",
      border: "border-emerald-500",
      bg: "bg-emerald-100",
    },
    {
      icon: "🤖",
      title: "AI-Powered Monitoring",
      desc: "Continuous surveillance through CCTV feeds and satellite imagery with computer vision technology for proactive infrastructure maintenance.",
      border: "border-gray-900",
      bg: "bg-gray-100",
    },
    {
      icon: "📊",
      title: "Smart Analytics Dashboard",
      desc: "Comprehensive reporting and analytics platform providing insights into infrastructure health, response times, and maintenance efficiency.",
      border: "border-emerald-500",
      bg: "bg-emerald-100",
    },
    {
      icon: "📱",
      title: "Citizen Reporting Platform",
      desc: "Easy-to-use mobile and web interface enabling citizens to report infrastructure issues with GPS location and photo evidence.",
      border: "border-gray-900",
      bg: "bg-gray-100",
    },
    {
      icon: "⚡",
      title: "Rapid Response System",
      desc: "Intelligent dispatch system automatically assigns maintenance crews based on priority, location, and resource availability for optimal response times.",
      border: "border-emerald-500",
      bg: "bg-emerald-100",
    },
    {
      icon: "📋",
      title: "Comprehensive Tracking",
      desc: "End-to-end tracking of issues from detection to resolution with transparent status updates and completion verification.",
      border: "border-gray-900",
      bg: "bg-gray-100",
    },
  ];

  return (
    <section
      id="services"
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            Platform Features
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Advanced features designed for efficient infrastructure management
            and rapid response
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 ${service.border}`}
            >
              <div className="text-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${service.bg} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                >
                  <span className="text-xl sm:text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 font-sans">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 flex items-center font-sans">
                <span className="mr-3 sm:mr-4 text-3xl sm:text-4xl lg:text-5xl">
                  🏙️
                </span>
                Smart City Infrastructure
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-sans font-light">
                Our comprehensive monitoring system ensures proactive
                maintenance of urban infrastructure, creating cleaner, safer,
                and more livable cities for all citizens.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    24/7 Automated Monitoring
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    Real-time Issue Detection
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    Predictive Maintenance Analytics
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-emerald-500 to-gray-900 rounded-lg sm:rounded-xl mb-4 sm:mb-6 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/dashboard2.png"
                  alt="Infrastructure monitoring visualization showing real-time data"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                />
              </div>
              <h4 className="font-bold text-gray-900 text-center font-sans text-base sm:text-lg">
                Monitoring Visualization
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 text-center font-sans">
                Real-time infrastructure health and maintenance tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortalSection = () => {
  const workflowSteps = [
    {
      icon: "👁️",
      title: "AI Detection",
      desc: "Advanced computer vision identifies infrastructure issues automatically",
      color: "bg-emerald-100",
    },
    {
      icon: "📱",
      title: "Citizen Reporting",
      desc: "Easy mobile reporting with GPS location and photo evidence",
      color: "bg-gray-100",
    },
    {
      icon: "⚡",
      title: "Smart Assignment",
      desc: "Intelligent dispatch to appropriate maintenance teams",
      color: "bg-emerald-100",
    },
    {
      icon: "✅",
      title: "Resolution Tracking",
      desc: "Real-time progress monitoring with completion verification",
      color: "bg-gray-100",
    },
  ];

  const dashboardFeatures = [
    "Real-time Issue Tracking",
    "Crew Management System",
    "Performance Analytics",
    "Response Time Monitoring",
  ];

  return (
    <section
      id="portal"
      className="py-8 sm:py-12 lg:py-16 bg-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            Authority Dashboard
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Comprehensive management interface for municipal authorities and
            maintenance coordinators
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 font-sans">
              Multi-Issue Management
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-sans font-light">
              Unified platform handling potholes, streetlight failures, and
              waste management with specialized workflows and automated crew
              assignment for optimal city maintenance.
            </p>
            <div className="space-y-4 sm:space-y-5">
              {dashboardFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full mr-3 sm:mr-4"></span>
                  <span className="text-gray-900 font-sans text-sm sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="w-full h-60 sm:h-72 lg:h-80 bg-gradient-to-br from-white to-emerald-100 rounded-xl mb-4 sm:mb-6 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/dashboard.png"
                  alt="सफ़Eye Dashboard Interface"
                  width={300}
                  height={300}
                  className="object-contain w-auto h-full"
                  priority
                />
              </div>
              <h3 className="font-bold text-gray-900 text-center text-lg sm:text-xl font-sans">
                Administrative Interface
              </h3>
              <p className="text-sm text-gray-600 mt-2 sm:mt-3 text-center font-sans">
                Complete oversight of infrastructure maintenance operations
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans">
              How सफ़Eye Works
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-sans font-light">
              Streamlined four-step process from detection to resolution
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${step.color} border border-gray-200`}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 font-sans">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DemoSection = () => {
  return (
    <section
      id="demo"
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-sans">
            See सफ़Eye in Action
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            Watch how our AI-powered infrastructure monitoring transforms urban
            maintenance.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="relative w-full aspect-video">
            <video
              src="/images/trash-detection.mov"
              className="absolute inset-0 w-full h-full rounded-xl object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
          <div className="mt-6 sm:mt-8 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-sans">
              Real-time Infrastructure Detection
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              This demonstration showcases our AI detection system identifying
              various infrastructure issues including waste accumulation,
              potholes, and streetlight failures with automated reporting to
              authorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <div className="bg-gray-100 border border-emerald-300 text-emerald-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base font-sans text-center cursor-not-allowed select-none">
                Admin Dashboard and Zonal Dashboard are accessible only after
                login.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-500 text-white py-8 sm:py-12 lg:py-16 min-h-[calc(100vh-70px)] flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 tracking-tight font-sans">
            Ready to Transform Urban Infrastructure?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            Join municipalities and citizens who trust सफ़Eye for smart
            infrastructure monitoring and rapid response. Contact us today to
            explore our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/login" passHref legacyBehavior>
              <a className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all transform hover:scale-105 border-2 border-emerald-500 text-sm sm:text-base font-sans">
                Get Started
              </a>
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-600">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 font-sans">
              📞 Contact सफ़Eye
            </h3>
            <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
              📧 contact@safeye.gov.in
            </p>
            <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
              📞 +91-9999999999
            </p>
            <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
              📞 1800-XXX-XXXX (Toll Free)
            </p>
            <p className="text-gray-300 font-sans text-xs sm:text-sm">
              🏢 Hans Raj College, University of Delhi - 110007
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 font-sans">
              🔗 Quick Links
            </h3>
            <div className="space-y-1">
              <a
                href="#about"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                About सफ़Eye
              </a>
              <a
                href="#services"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                Platform Features
              </a>
              <a
                href="/admin"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                Admin Portal
              </a>
              <a
                href="/zonal-head"
                className="block text-gray-300 hover:text-white transition-colors font-sans text-xs sm:text-sm"
              >
                Zonal Dashboard
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 font-sans">
              🏙️ Platform Features
            </h3>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="text-gray-300 font-sans">
                • AI-powered infrastructure monitoring
              </p>
              <p className="text-gray-300 font-sans">
                • Real-time issue detection and reporting
              </p>
              <p className="text-gray-300 font-sans">
                • Automated crew dispatch system
              </p>
              <p className="text-gray-300 font-sans">
                • Comprehensive analytics dashboard
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-600">
          <p className="text-gray-300 mb-1 font-sans text-xs sm:text-sm">
            © 2025 सफ़Eye. All rights reserved. | Government of India Initiative
          </p>
          <p className="text-xs text-gray-400 font-sans">
            Smart Infrastructure for Cleaner Cities | Privacy Policy | Terms of
            Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen font-sans antialiased overflow-x-hidden">
      <style jsx global>{`
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%) translateY(0%);
            opacity: 0;
          }
          100% {
            transform: translateX(0%) translateY(0%);
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          0% {
            transform: translateX(100%) translateY(0%);
            opacity: 0;
          }
          100% {
            transform: translateX(0%) translateY(0%);
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-in-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-in-out;
        }
      `}</style>
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <PortalSection />
      <DemoSection />
      <ContactSection />
    </main>
  );
}
