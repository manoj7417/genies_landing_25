import React from 'react'
import {
    Search,
    Users,
    TrendingUp,
    CheckCircle,
    Star,
    ArrowRight,
    Menu,
    X,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    UserCheck,
    Target,
    Zap,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    FileText,
    BookOpen,
    Video,
    Calendar
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Toast from './Toast';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const navRef = useRef(null);
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const handleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const handleComingSoonClick = (e) => {
        e.preventDefault();
        setShowToast(true);
        setActiveDropdown(null); // Close dropdown
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const jobSeekerLinks = [
        { name: 'Find Jobs', href: 'https://www.geniescareerhub.com/jobs', icon: Search },
        { name: 'Resume Builder', href: 'https://www.geniescareerhub.com/resume', icon: FileText },
        { name: 'Career Coaching', href: 'https://www.geniescareerhub.com/career-services', icon: BookOpen },
        { name: 'Interview Prep', href: '#interview-prep', icon: Video },
        { name: 'Salary Guide', href: '#salary-guide', icon: TrendingUp }
    ];

    const recruiterLinks = [
        { name: 'Post Jobs', href: 'https://www.geniescareerhub.com/recruiter/signin?redirect=/recruiter/jobs/post', icon: Briefcase },
        { name: 'Find Candidates', href: 'https://www.geniescareerhub.com/recruiter/signin?redirect=/recruiter/candidates', icon: Users },
        { name: 'Applicant Tracking', href: '#applicant-tracking', icon: Target },
        { name: 'Schedule Interviews', href: '#schedule-interviews', icon: Calendar },
        { name: 'Recruitment Analytics', href: '#recruitment-analytics', icon: TrendingUp }
    ];

  return (
    <div>
        <Toast 
            message="Coming soon" 
            isVisible={showToast} 
            onClose={() => setShowToast(false)} 
        />
        <nav ref={navRef} className="bg-white shadow-sm border-b border-warm-100 fixed w-full top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 flex items-center">
                                    <img src="/beta-logo.png" alt="GenieCareerHub Logo" className="h-14 w-auto mr-2" />
                                    
                                </div>
                            </div>

                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-8">
                                    <Link href="#services" className="text-blue-950 hover:text-blue-950 px-3 py-2 text-sm font-medium transition-colors duration-200">Services</Link>
                                    
                                    {/* Job Seekers Dropdown */}
                                    <div className="relative group">
                                        <button 
                                            onClick={() => handleDropdown('jobSeekers')}
                                            className="flex items-center text-blue-950 hover:text-blue-950 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
                                        >
                                            For Job Seekers
                                            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'jobSeekers' ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        {activeDropdown === 'jobSeekers' && (
                                            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-warm-100 py-2 z-50">
                                                {jobSeekerLinks.map((link) => {
                                                    const IconComponent = link.icon;
                                                    const isComingSoon = link.name === 'Interview Prep' || link.name === 'Salary Guide';
                                                    
                                                    if (isComingSoon) {
                                                        return (
                                                            <button
                                                                key={link.name}
                                                                onClick={handleComingSoonClick}
                                                                className="flex items-center w-full px-4 py-3 text-sm text-blue-950 hover:bg-blue-50 hover:text-blue-950 transition-colors duration-200 text-left"
                                                            >
                                                                <IconComponent className="h-4 w-4 mr-3 text-blue-950" />
                                                                {link.name}
                                                            </button>
                                                        );
                                                    }
                                                    
                                                    return (
                                                        <Link
                                                            key={link.name}
                                                            href={link.href}
                                                            className="flex items-center px-4 py-3 text-sm text-blue-950 hover:bg-blue-50 hover:text-blue-950 transition-colors duration-200"
                                                        >
                                                            <IconComponent className="h-4 w-4 mr-3 text-blue-950" />
                                                            {link.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Recruiters Dropdown */}
                                    <div className="relative group">
                                        <button 
                                            onClick={() => handleDropdown('recruiters')}
                                            className="flex items-center text-blue-950 hover:text-blue-950 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
                                        >
                                            For Recruiters
                                            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'recruiters' ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        {activeDropdown === 'recruiters' && (
                                            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-warm-100 py-2 z-50">
                                                {recruiterLinks.map((link) => {
                                                    const IconComponent = link.icon;
                                                    const isComingSoon = link.name === 'Applicant Tracking' || link.name === 'Schedule Interviews' || link.name === 'Recruitment Analytics';
                                                    
                                                    if (isComingSoon) {
                                                        return (
                                                            <button
                                                                key={link.name}
                                                                onClick={handleComingSoonClick}
                                                                className="flex items-center w-full px-4 py-3 text-sm text-blue-950 hover:bg-blue-50 hover:text-blue-950 transition-colors duration-200 text-left"
                                                            >
                                                                <IconComponent className="h-4 w-4 mr-3 text-blue-950" />
                                                                {link.name}
                                                            </button>
                                                        );
                                                    }
                                                    
                                                    return (
                                                        <Link
                                                            key={link.name}
                                                            href={link.href}
                                                            className="flex items-center px-4 py-3 text-sm text-blue-950 hover:bg-blue-50 hover:text-blue-950 transition-colors duration-200"
                                                        >
                                                            <IconComponent className="h-4 w-4 mr-3 text-blue-950" />
                                                            {link.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <Link href="#about" className="text-blue-950 hover:text-blue-950 px-3 py-2 text-sm font-medium transition-colors duration-200">About</Link>
                                    <Link href="#contact" className="text-blue-950 hover:text-blue-950 px-3 py-2 text-sm font-medium transition-colors duration-200">Contact</Link>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center space-x-4">
                                <Link href="https://www.geniescareerhub.com/login" className="text-blue-950 hover:text-blue-950 px-4 py-2 text-sm font-medium transition-colors duration-200">
                                    Sign In
                                </Link>
                                <Link href="https://www.geniescareerhub.com/"  className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105">
                                    Get Started
                                </Link>
                            </div>

                            <div className="md:hidden">
                                <button onClick={toggleMenu} className="text-warm-700 hover:text-warm-800">
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu */}
                        {isMenuOpen && (
                            <div className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-warm-100">
                                    <Link href="#services" className="block px-3 py-2 text-base font-medium text-blue-950 hover:text-blue-950">Services</Link>
                                    
                                    {/* Mobile Job Seekers Dropdown */}
                                    <div>
                                        <button 
                                            onClick={() => handleDropdown('mobileJobSeekers')}
                                            className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-blue-950 hover:text-blue-950"
                                        >
                                            For Job Seekers
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'mobileJobSeekers' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'mobileJobSeekers' && (
                                            <div className="pl-6 space-y-1">
                                                {jobSeekerLinks.map((link) => {
                                                    const IconComponent = link.icon;
                                                    const isComingSoon = link.name === 'Interview Prep' || link.name === 'Salary Guide';
                                                    
                                                    if (isComingSoon) {
                                                        return (
                                                            <button
                                                                key={link.name}
                                                                onClick={handleComingSoonClick}
                                                                className="flex items-center w-full px-3 py-2 text-sm text-blue-950 hover:text-blue-950 transition-colors duration-200 text-left"
                                                            >
                                                                <IconComponent className="h-4 w-4 mr-2" />
                                                                {link.name}
                                                            </button>
                                                        );
                                                    }
                                                    
                                                    return (
                                                        <Link
                                                            key={link.name}
                                                            href={link.href}
                                                            className="flex items-center px-3 py-2 text-sm text-blue-950 hover:text-blue-950 transition-colors duration-200"
                                                        >
                                                            <IconComponent className="h-4 w-4 mr-2" />
                                                            {link.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile Recruiters Dropdown */}
                                    <div>
                                        <button 
                                            onClick={() => handleDropdown('mobileRecruiters')}
                                            className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-blue-950 hover:text-blue-950"
                                        >
                                            For Recruiters
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'mobileRecruiters' ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === 'mobileRecruiters' && (
                                            <div className="pl-6 space-y-1">
                                                {recruiterLinks.map((link) => {
                                                    const IconComponent = link.icon;
                                                    const isComingSoon = link.name === 'Applicant Tracking' || link.name === 'Schedule Interviews' || link.name === 'Recruitment Analytics';
                                                    
                                                    if (isComingSoon) {
                                                        return (
                                                            <button
                                                                key={link.name}
                                                                onClick={handleComingSoonClick}
                                                                className="flex items-center w-full px-3 py-2 text-sm text-blue-950 hover:text-blue-950 transition-colors duration-200 text-left"
                                                            >
                                                                <IconComponent className="h-4 w-4 mr-2" />
                                                                {link.name}
                                                            </button>
                                                        );
                                                    }
                                                    
                                                    return (
                                                        <Link
                                                            key={link.name}
                                                            href={link.href}
                                                            className="flex items-center px-3 py-2 text-sm text-blue-950 hover:text-blue-950 transition-colors duration-200"
                                                        >
                                                            <IconComponent className="h-4 w-4 mr-2" />
                                                            {link.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <Link href="#about" className="block px-3 py-2 text-base font-medium text-blue-950 hover:text-blue-950">About</Link>
                                    <Link href="#contact" className="block px-3 py-2 text-base font-medium text-blue-950 hover:text-blue-950">Contact</Link>
                                    <div className="border-t border-warm-100 pt-4">
                                        <button className="block w-full text-left px-3 py-2 text-base font-medium text-blue-950 hover:text-blue-950">
                                            Sign In
                                        </button>
                                        <button className="block w-full mt-2 bg-blue-950 hover:bg-blue-900 text-white px-3 py-2 rounded-lg text-base font-medium">
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
    </div>
  )
}

export default Navbar