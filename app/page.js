'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
    FileText,
    Building,
    Globe,
    BarChart3,
    Award
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Animated Counter Hook
const useAnimatedCounter = (end, duration = 2000, shouldStart = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
};

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isStatsInView, setIsStatsInView] = useState(false);
    const [showContactToast, setShowContactToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Animated counters
    const professionalsPlaced = useAnimatedCounter(50, 2000, isStatsInView);
    const partnerCompanies = useAnimatedCounter(2500, 2500, isStatsInView);
    const successRate = useAnimatedCounter(95, 1500, isStatsInView);
    const yearsExperience = useAnimatedCounter(15, 1000, isStatsInView);

    const testimonials = [
        {
            quote: "Andrew helped me a lot in my professional career. I cannot recommend him enough.",
            author: "Alexander Green",
            title: "CTO at Global Finance Inc.",
            image: "/testimonials-1.jpg"
        },
        {
            quote: "The guidance and strategies provided transformed my approach to leadership and doubled my team's productivity.",
            author: "Sarah Williams",
            title: "VP of Operations at TechCorp",
            image: "/testimonials-2.jpg"
        },
        {
            quote: "Thanks to the personalized coaching, I successfully transitioned from engineering to executive management within 8 months.",
            author: "Michael Chen",
            title: "Director of Engineering at StartupXYZ",
            image: "/testimonials-3.jpg"
        },
        {
            quote: "The career development program gave me the confidence and skills to start my own consulting firm.",
            author: "Jennifer Rodriguez",
            title: "Founder & CEO at Strategic Solutions",
            image: "/testimonials-1.jpg"
        }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleContactFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission delay (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset form and show success message
        e.target.reset();
        setIsSubmitting(false);
        setShowContactToast(true);
    };


    return (
        <>
            <Toast
                message="Form submitted successfully! Our team will get back to you soon."
                isVisible={showContactToast}
                onClose={() => setShowContactToast(false)}
                duration={5000}
            />
            <div className="min-h-screen bg-white">
                {/* Navigation */}

                <Navbar />

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: 'url(/hero.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: '100%',
                            marginTop: '65px'
                        }}
                    >
                        {/* Optional overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20 mt-20">
                            <div className="text-left">
                                <motion.h1
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
                                </motion.h1>
                                <motion.p
                                    className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-lg"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    If you are not willing to risk the usual, you will have to settle for the ordinary. I'm here to help and share my story.
                                </motion.p>
                                <motion.div
                                    className="mb-12"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <Link href="https://www.geniescareerhub.com/career-coaching" className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        GET FREE SESSION
                                    </Link>
                                </motion.div>

                            </div>
                            <div className="relative lg:flex justify-end">
                                {/* This space is for the person in the image */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Andrew Section */}
                <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
                    {/* Decorative Background Circles */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-10 left-10 w-20 h-20 bg-blue-950 rounded-full opacity-20"
                            animate={{
                                x: [0, 20, 0],
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute top-32 right-20 w-12 h-12 bg-blue-950 rounded-full opacity-25"
                            animate={{
                                x: [0, -15, 0],
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-20 w-16 h-16 bg-blue-950 rounded-full opacity-15"
                            animate={{
                                x: [0, 25, 0],
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                            }}
                        />
                        <motion.div
                            className="absolute bottom-32 right-10 w-8 h-8 bg-blue-950 rounded-full opacity-30"
                            animate={{
                                x: [0, -10, 0],
                                y: [0, 12, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-8 w-6 h-6 bg-blue-950 rounded-full opacity-20"
                            animate={{
                                x: [0, 18, 0],
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 3
                            }}
                        />
                        <motion.div
                            className="absolute top-1/3 right-8 w-14 h-14 bg-blue-950 rounded-full opacity-18"
                            animate={{
                                x: [0, -12, 0],
                                y: [0, 18, 0],
                            }}
                            transition={{
                                duration: 6.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.5
                            }}
                        />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                                About GenieCareerHub
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-4xl mx-auto">
                                GenieCareerHub is your comprehensive career advancement platform, empowering both job seekers and recruiters with cutting-edge tools and personalized services. We specialize in transforming careers through innovative technology and expert guidance.
                            </p>

                            {/* Services Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                                <motion.div
                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <FileText className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Resume Builder</h3>
                                    <p className="text-sm text-gray-600">Create professional, ATS-optimized resumes with our intelligent builder</p>
                                </motion.div>

                                <motion.div
                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <BarChart3 className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Resume Analyzer</h3>
                                    <p className="text-sm text-gray-600">Get detailed insights and improvement suggestions for your resume</p>
                                </motion.div>

                                <motion.div
                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">CV Match</h3>
                                    <p className="text-sm text-gray-600">AI-powered matching system connecting candidates with perfect opportunities</p>
                                </motion.div>

                                <motion.div
                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Career Coaching</h3>
                                    <p className="text-sm text-gray-600">Personalized guidance from industry experts to accelerate your career growth</p>
                                </motion.div>

                                <motion.div
                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">For Job Seekers</h3>
                                    <p className="text-sm text-gray-600">Comprehensive career development tools and job placement services</p>
                                </motion.div>

                                <motion.div
                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Briefcase className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">For Recruiters</h3>
                                    <p className="text-sm text-gray-600">Advanced recruitment solutions and talent acquisition services</p>
                                </motion.div>
                            </div>

                            <motion.button
                                className="border-2 border-blue-950 text-blue-950 px-8 py-3 rounded-lg font-medium hover:bg-blue-950 hover:text-white transition-all duration-300 tracking-wide"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href="https://www.geniescareerhub.com/">EXPLORE OUR SERVICES</Link>
                            </motion.button>
                        </motion.div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-6 mb-6">
                            {/* Online Career Coaching */}
                            <div className="relative group overflow-hidden rounded-2xl h-96 cursor-pointer transform transition-all duration-300 hover:scale-105">
                                <img
                                    src="/Program1.jpg"
                                    alt="Online Career Coaching"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">
                                    <div className="mb-4">
                                        <span className="text-sm font-semibold tracking-widest uppercase opacity-90 text-white drop-shadow-lg">BUILD YOUR RESUME</span>
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold mb-8 leading-tight max-w-sm drop-shadow-lg">
                                        Create Professional, ATS-Optimized Resumes Effortlessly
                                    </h3>
                                    <Link href="https://www.geniescareerhub.com/resume" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 self-start tracking-wide text-sm drop-shadow-lg">
                                        LEARN MORE
                                    </Link>
                                </div>
                            </div>

                            {/* One-to-One Sessions */}
                            <div className="relative group overflow-hidden rounded-2xl h-96 cursor-pointer transform transition-all duration-300 hover:scale-105">
                                <img
                                    src="/Program2.jpg"
                                    alt="Personal Sessions"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">
                                    <div className="mb-4">
                                        <span className="text-sm font-semibold tracking-widest uppercase opacity-90 text-white drop-shadow-lg">ONE TO ONE</span>
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold mb-8 leading-tight max-w-sm drop-shadow-lg">
                                        Personalized Career Coaching for Growth and Success
                                    </h3>
                                    <Link href="https://www.geniescareerhub.com/career-services" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 self-start tracking-wide text-sm drop-shadow-lg">
                                        LEARN MORE
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Public Programs - Full Width */}
                        <div className="relative group overflow-hidden rounded-2xl h-96 cursor-pointer transform transition-all duration-300 hover:scale-105">
                            <img
                                src="/Program3.jpg"
                                alt="Public Programs"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">
                                <div className="mb-4">
                                    <span className="text-sm font-semibold tracking-widest uppercase opacity-90 text-white drop-shadow-lg">RECRUITMENT</span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold mb-8 leading-tight max-w-3xl drop-shadow-lg">
                                    Advanced Recruitment Solutions for Hiring Success
                                </h3>
                                <Link href="https://www.geniescareerhub.com/recruiter/signin?redirect=/recruiter/jobs/post" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 self-start tracking-wide text-sm drop-shadow-lg">
                                    LEARN MORE
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>



                {/* For Job Seekers */}
                <section id="for-job-seekers" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <motion.div
                            className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-8 lg:mb-0">
                                <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">
                                    For Job Seekers
                                </h2>
                                <p className="text-xl text-gray-600 max-w-2xl">
                                    Accelerate your career growth with our comprehensive services
                                </p>
                            </div>
                            <motion.button
                                className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-xl text-base font-semibold transition-all duration-300 flex items-center group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href="https://www.geniescareerhub.com">View All Services</Link>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                        </motion.div>

                        {/* Service Cards */}
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            navigation={true}
                            loop={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                            }}
                            className="job-seekers-swiper !pb-16"
                        >
                            {/* Career Coaching Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-80 flex flex-col justify-between relative overflow-hidden"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div>
                                        <div className="flex items-center justify-center w-16 h-16 bg-blue-950 rounded-2xl mb-6">
                                            <UserCheck className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Coaching</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            Personalized one-on-one sessions to accelerate your career growth and unlock new opportunities.
                                        </p>
                                        <ul className="text-gray-600 space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Career path planning & goal setting
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Skills assessment & development
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Industry insights & networking
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* Resume & Profile Building Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-80 flex flex-col justify-between relative overflow-hidden"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div>
                                        <div className="flex items-center justify-center w-16 h-16 bg-blue-950 rounded-2xl mb-6">
                                            <FileText className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Resume & Profile Building</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            Professional resume writing and LinkedIn optimization to make you stand out from the competition.
                                        </p>
                                        <ul className="text-gray-600 space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                ATS-optimized resume writing
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                LinkedIn profile optimization
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Cover letter customization
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* Interview Preparation Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-80 flex flex-col justify-between relative overflow-hidden"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <div>
                                        <div className="flex items-center justify-center w-16 h-16 bg-blue-950 rounded-2xl mb-6">
                                            <Target className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Interview Preparation</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            Mock interviews and strategic coaching to help you confidently ace any interview.
                                        </p>
                                        <ul className="text-gray-600 space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Mock interview sessions
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Behavioral question practice
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Confidence building techniques
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* Job Matching Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-80 flex flex-col justify-between relative overflow-hidden"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <div>
                                        <div className="flex items-center justify-center w-16 h-16 bg-blue-950 rounded-2xl mb-6">
                                            <Zap className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Matching</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            AI-powered job matching system that connects you with opportunities that fit your skills and goals.
                                        </p>
                                        <ul className="text-gray-600 space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                AI-powered job recommendations
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Skills & preference matching
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-950 mr-2">•</span>
                                                Real-time job alerts
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>

                {/* For Recruiters */}
                <section id="for-recruiters" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <motion.div
                            className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-8 lg:mb-0">
                                <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">
                                    For Companies
                                </h2>
                                <p className="text-xl text-gray-600 max-w-2xl">
                                    Build exceptional teams with our recruitment and consulting services
                                </p>
                            </div>
                            <motion.button
                                className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-xl text-base font-semibold transition-all duration-300 flex items-center group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href="https://www.geniescareerhub.com/recruiter/signin?redirect=/recruiter/candidates">View All Services</Link>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.button>
                        </motion.div>

                        {/* Service Cards */}
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            navigation={true}
                            loop={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                            }}
                            className="companies-swiper !pb-16"
                        >
                            {/* Talent Acquisition Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mb-6"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Users className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <div className="card-content">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Talent Acquisition</h3>
                                        <p className="text-gray-600 leading-relaxed card-description">
                                            End-to-end recruitment solutions to help you find and hire the best talent for your organization.
                                        </p>
                                        <ul className="space-y-2 text-gray-600 card-features">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Sourcing
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Screening
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Assessment
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* Executive Search Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mb-6"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Building className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <div className="card-content">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Executive Search</h3>
                                        <p className="text-gray-600 leading-relaxed card-description">
                                            Specialized executive recruitment for C-level and senior management positions.
                                        </p>
                                        <ul className="space-y-2 text-gray-600 card-features">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Executive Search
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Leadership Assessment
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Succession Planning
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* HR Consulting Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mb-6"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Briefcase className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <div className="card-content">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">HR Consulting</h3>
                                        <p className="text-gray-600 leading-relaxed card-description">
                                            Strategic HR consulting services to optimize your human resources processes and policies.
                                        </p>
                                        <ul className="space-y-2 text-gray-600 card-features">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                HR Strategy
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Policy Development
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Compliance
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* Team Development Card */}
                            <SwiperSlide>
                                <motion.div
                                    className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mb-6"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BarChart3 className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <div className="card-content">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Team Development</h3>
                                        <p className="text-gray-600 leading-relaxed card-description">
                                            Team building and organizational development programs to enhance workplace performance.
                                        </p>
                                        <ul className="space-y-2 text-gray-600 card-features">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Team Building
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Skills Training
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-warm-500 rounded-full mr-3"></div>
                                                Performance Management
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>


                {/* Testimonials Section */}
                <section className="relative py-20 bg-slate-100 overflow-hidden">


                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                What Our Clients Say About Us
                            </h2>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                                Don't just take our word for it. Hear from the professionals and companies who have transformed their careers and teams with our services.
                            </p>
                        </motion.div>

                        <div className="relative w-full min-h-[600px] overflow-hidden">
                            {/* Full Width Background Image */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`bg-image-${currentTestimonial}`}
                                    className="absolute inset-0 w-full h-full"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    style={{
                                        backgroundImage: `url(${testimonials[currentTestimonial].image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    {/* Optional overlay for better content readability */}
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Testimonial Card - Absolutely Positioned on Left */}
                            <motion.div
                                className="absolute left-8 md:left-16 lg:left-20 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl p-8 md:p-10 lg:p-12 shadow-2xl overflow-hidden w-full max-w-md lg:max-w-lg z-20"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {/* Large Quote Mark */}
                                <motion.div
                                    className="absolute top-4 left-4 text-7xl font-serif text-gray-200 leading-none select-none"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                >
                                    "
                                </motion.div>

                                {/* Testimonial Content */}
                                <div className="relative z-10 pt-12">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`testimonial-${currentTestimonial}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                        >
                                            <blockquote className="text-lg md:text-xl lg:text-2xl font-normal text-gray-900 leading-relaxed mb-8">
                                                {testimonials[currentTestimonial].quote}
                                            </blockquote>

                                            {/* Attribution */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.2 }}
                                            >
                                                <cite className="not-italic">
                                                    <div className="font-bold text-gray-900 text-lg mb-1">
                                                        — {testimonials[currentTestimonial].author}
                                                    </div>
                                                    <div className="text-gray-600 text-base">
                                                        {testimonials[currentTestimonial].title}
                                                    </div>
                                                </cite>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Navigation Arrow - Right Edge */}
                            <motion.button
                                onClick={nextTestimonial}
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group z-30"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
                            </motion.button>

                            {/* Testimonial Indicators - Bottom Center */}
                            <motion.div
                                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial
                                            ? 'bg-white w-6'
                                            : 'bg-white/50 hover:bg-white/75 w-2'
                                            }`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.6 + index * 0.1,
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
                            viewport={{ once: true }}
                            onViewportEnter={() => setIsStatsInView(true)}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Trusted by Thousands
                            </h2>
                            <p className="text-2xl font-bold text-blue-950 mb-8">
                                Worldwide
                            </p>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                                Our track record speaks for itself. We've helped thousands of professionals and hundreds of companies achieve their goals.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                            {/* Professionals Placed */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Users className="h-6 w-6 text-white" />
                                </motion.div>
                                <motion.div
                                    className="text-2xl md:text-3xl"
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    {professionalsPlaced}K+
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professionals Placed</h3>
                                <p className="text-gray-600">Successfully matched with their dream careers</p>
                            </motion.div>

                            {/* Partner Companies */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Building className="h-6 w-6 text-white" />
                                </motion.div>
                                <motion.div
                                    className="text-2xl md:text-3xl"
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    {partnerCompanies.toLocaleString()}+
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Partner Companies</h3>
                                <p className="text-gray-600">Leading organizations trust our services</p>
                            </motion.div>

                            {/* Success Rate */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </motion.div>
                                <motion.div
                                    className="text-2xl md:text-3xl"
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    {successRate}%
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Rate</h3>
                                <p className="text-gray-600">Client satisfaction and placement success</p>
                            </motion.div>

                            {/* Years Experience */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Award className="h-6 w-6 text-white" />
                                </motion.div>
                                <motion.div
                                    className="text-2xl md:text-3xl"
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    {yearsExperience}+
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Years Experience</h3>
                                <p className="text-gray-600">Decades of industry expertise and insight</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
                                Ready to Transform Your Career?
                            </h2>
                            <p className="text-xl text-blue-950 max-w-3xl mx-auto">
                                Get in touch with our team of experts and take the first step towards your professional success.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-semibold text-warm-900 mb-8">Get in Touch</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mr-4">
                                            <Mail className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-950">Email</h4>
                                            <p className="text-blue-950">info@geniescareerhub.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mr-4">
                                            <Phone className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-950">Phone</h4>
                                            <p className="text-blue-950">0203 476 7492</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                                            <MapPin className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-950">Address</h4>
                                            <p className="text-blue-950">The Career Genies Group UK LTD ,124 City Road,London,EC1V 2NX</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <form className="space-y-6" onSubmit={handleContactFormSubmit}>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-blue-950 mb-2">First Name</label>
                                            <input type="text" className="w-full px-4 py-3 border border-blue-950 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-blue-950 mb-2">Last Name</label>
                                            <input type="text" className="w-full px-4 py-3 border border-blue-950 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 mb-2">Email</label>
                                        <input type="email" className="w-full px-4 py-3 border border-blue-950 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 mb-2">I'm interested in</label>
                                        <select className="w-full px-4 py-3 border border-blue-950 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent">
                                            <option>Job Search Services</option>
                                            <option>Recruitment Solutions</option>
                                            <option>Career Coaching</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 mb-2">Message</label>
                                        <textarea rows={4} className="w-full px-4 py-3 border border-blue-950 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full px-6 py-4 rounded-lg font-semibold transition-all duration-200 transform ${isSubmitting
                                            ? 'bg-blue-700 cursor-not-allowed'
                                            : 'bg-blue-950 hover:bg-blue-900 hover:scale-105'
                                            } text-white`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
} 