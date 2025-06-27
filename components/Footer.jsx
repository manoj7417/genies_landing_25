
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
    Facebook,
    Instagram,
    Linkedin
} from 'lucide-react';

const Footer = () => {
  return (
    <div>
        {/* Footer */}
        <footer className="bg-white text-gray-900 py-12 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <div className="flex items-center mb-4">
                                    <img src="/beta-logo.png" alt="GenieCareerHub Logo" className="h-14 w-auto mr-2" />
                                    {/* <span className="text-2xl font-bold text-gray-900">GenieCareerHub</span> */}
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Transforming careers and connecting talent with opportunity. Your success is our mission.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="https://www.linkedin.com/company/genies-career-hub/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center hover:bg-blue-900 cursor-pointer transition-colors duration-200">
                                        <Linkedin className="h-5 w-5 text-white" />
                                    </a>
                                    <a href="https://www.facebook.com/profile.php?id=61560696226983" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center hover:bg-blue-900 cursor-pointer transition-colors duration-200">
                                        <Facebook className="h-5 w-5 text-white" />
                                    </a>
                                    <a href="https://www.instagram.com/genies_career_hub/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center hover:bg-blue-900 cursor-pointer transition-colors duration-200">
                                        <Instagram className="h-5 w-5 text-white" />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-gray-900">Services</h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li><a href="https://www.geniescareerhub.com/jobs" className="hover:text-blue-950 transition-colors duration-200">Find Jobs</a></li>
                                    <li><a href="https://www.geniescareerhub.com/career-services" className="hover:text-blue-950 transition-colors duration-200">Career Coaching</a></li>
                                    <li><a href="https://www.geniescareerhub.com/resume" className="hover:text-blue-950 transition-colors duration-200">Resume Builder</a></li>
                                    <li><a href="https://www.geniescareerhub.com/recruiter/signin?redirect=/recruiter/jobs/post" className="hover:text-blue-950 transition-colors duration-200">Post Jobs</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li><a href="#about" className="hover:text-blue-950 transition-colors duration-200">About Us</a></li>
                                    <li><a href="https://www.geniescareerhub.com" className="hover:text-blue-950 transition-colors duration-200">Careers</a></li>
                                    <li><a href="#contact" className="hover:text-blue-950 transition-colors duration-200">Contact</a></li>
                                    <li><a href="https://www.geniescareerhub.com/privacy-policy" className="hover:text-blue-950 transition-colors duration-200">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
                            <p>&copy; 2025 GenieCareerHub. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
    </div>
  )
}

export default Footer