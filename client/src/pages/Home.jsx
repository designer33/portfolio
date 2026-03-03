import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Projects from './Projects';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <Projects />
            <ExperienceTimeline />
            <BlogSection />
            <ContactSection />
        </div>
    );
};

export default Home;
