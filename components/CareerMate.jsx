'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageCircle, 
    X, 
    Send, 
    User, 
    Bot, 
    Briefcase, 
    Search,
    Users,
    Target,
    FileText,
    TrendingUp
} from 'lucide-react';

// Unique ID generator
function uniqueId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const CareerMate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [userType, setUserType] = useState(null);
    const [conversationStage, setConversationStage] = useState('initial');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                addBotMessage("👋 Hello! I'm Genies, your career assistant.");
                setTimeout(() => {
                    addBotMessage("Are you looking for help as a **Job Seeker** or a **Recruiter**?", true);
                }, 1000);
            }, 500);
        }
    }, [isOpen]);

    const addBotMessage = (content, showButtons = false) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: uniqueId(),
                    content,
                    sender: 'bot',
                    timestamp: new Date(),
                    showButtons
                }
            ]);
            setIsTyping(false);
        }, 1000);
    };

    const addUserMessage = (content) => {
        setMessages(prev => [
            ...prev,
            {
                id: uniqueId(),
                content,
                sender: 'user',
                timestamp: new Date()
            }
        ]);
    };

    const handleUserTypeSelection = (type) => {
        setUserType(type);
        addUserMessage(type === 'jobseeker' ? 'Job Seeker' : 'Recruiter');
        
        if (type === 'jobseeker') {
            setTimeout(() => {
                addBotMessage("Great! I'm here to help with your job search. 🎯");
                setTimeout(() => {
                    addBotMessage("What do you need help with? Type your question", false, 'suggestions');
                }, 1000);
            }, 500);
        } else {
            setTimeout(() => {
                addBotMessage("Perfect! I'm here to help with your recruitment needs. 🏢");
                setTimeout(() => {
                    addBotMessage("What do you need help with? Type your question", false, 'suggestions');
                }, 1000);
            }, 500);
        }
        setConversationStage('conversation');
    };

    const suggestedQuestions = {
        jobseeker: [
            "I need help finding remote software jobs",
            "How do I switch from marketing to tech?",
            "My resume isn't getting responses",
            "I'm nervous about salary negotiation",
            "I'm looking for internship opportunities",
            "How to find entry-level positions?"
        ],
        recruiter: [
            "Need to hire a senior developer quickly",
            "How to attract passive candidates?",
            "Writing job descriptions for tech roles",
            "Screening candidates more effectively",
            "Looking to offer internship programs",
            "Reducing time-to-hire process"
        ]
    };

    // Helper: Detect if message is about resume building or ATS analysis
    const detectSpecialIntent = (text) => {
        const lower = text.toLowerCase();
        if (
            lower.includes('build resume') ||
            lower.includes('create resume') ||
            lower.includes('make resume') ||
            lower.includes('resume template') ||
            lower.includes('cv builder') ||
            lower.includes('create cv') ||
            lower.includes('build cv') ||
            lower.includes('i want a new resume') ||
            lower.includes('i want to update my resume') ||
            lower.includes('update my resume') ||
            lower.includes('update my cv') ||
            lower.includes('refresh my resume') ||
            lower.includes('refresh my cv') ||
            lower.includes('make a new cv') ||
            lower.includes('new resume')
        ) {
            return 'resume-update';
        }
        if (
            lower.includes('ats score') ||
            lower.includes('resume analyzer') ||
            lower.includes('cv analyzer') ||
            lower.includes('ats check') ||
            lower.includes('ats test') ||
            lower.includes('ats scan') ||
            lower.includes('analyze my resume') ||
            lower.includes('resume score') ||
            lower.includes('check my resume score') ||
            lower.includes('resume evaluation') ||
            lower.includes('score my resume')
        ) {
            return 'ats';
        }
        // Recruiter actions detection (move above job-search)
        if (
            lower.includes('post a job') ||
            lower.includes('post job') ||
            lower.includes('find candidate') ||
            lower.includes('find candidates') ||
            lower.includes('hire someone') ||
            lower.includes('recruit talent') ||
            lower.includes('recruiter login') ||
            lower.includes('recruiter sign in') ||
            lower.includes('recruiter signin') ||
            lower.includes('recruiter tools') ||
            lower.includes('i am a recruiter') ||
            lower.includes("i'm a recruiter") ||
            lower.includes('i am recruiter') ||
            lower.includes("i'm recruiter") ||
            lower.includes('i work as a recruiter') ||
            lower.includes('i work as recruiter') ||
            lower.includes('i am working as a recruiter') ||
            lower.includes('i am working as recruiter')
        ) {
            return 'recruiter-tools';
        }
        // STRICT: First check if the message contains ANY career-related keywords
        const careerKeywords = [
            'career', 'job', 'jobs', 'resume', 'cv', 'interview', 'interviews', 'salary', 'wage', 'wages',
            'workplace', 'professional', 'employment', 'employ', 'hired', 'hiring', 'recruit', 'recruitment',
            'internship', 'intern', 'work', 'working', 'application', 'apply', 'applying', 'employer',
            'employee', 'company', 'business', 'skill', 'skills', 'qualification', 'qualifications',
            'experience', 'portfolio', 'networking', 'network', 'promotion', 'promoted', 'coaching',
            'mentor', 'mentoring', 'leadership', 'management', 'manager', 'supervisor', 'position',
            'role', 'roles', 'occupation', 'profession', 'industry', 'industries', 'freelance',
            'contract', 'full-time', 'part-time', 'remote', 'office', 'team', 'colleague', 'colleagues',
            'performance', 'productivity', 'development', 'growth', 'training', 'certification',
            'linkedin', 'job search', 'job hunt', 'job hunting', 'job seeker', 'job seeking',
            'cover letter', 'references', 'background check', 'onboarding', 'probation', 'resignation',
            'termination', 'layoff', 'redundancy', 'promotion', 'raise', 'bonus', 'benefits',
            'vacation', 'leave', 'sick leave', 'maternity', 'paternity', 'hr', 'human resources',
            'payroll', 'tax', 'income', 'earnings', 'compensation', 'package', 'offer', 'negotiation',
            'transition', 'change', 'switch', 'pivot', 'startup', 'corporate', 'entrepreneur',
            'self-employed', 'consultant', 'consulting', 'agency', 'firm', 'organization',
            'director', 'executive', 'ceo', 'cto', 'cfo', 'vp', 'vice president', 'president',
            'senior', 'junior', 'entry level', 'mid-level', 'experienced', 'graduate', 'degree',
            'education', 'university', 'college', 'school', 'course', 'training program',
            'workshop', 'seminar', 'conference', 'meeting', 'presentation', 'project', 'deadline',
            'client', 'customer', 'vendor', 'supplier', 'partner', 'stakeholder', 'board'
        ];

        const hasCareerKeywords = careerKeywords.some(keyword => lower.includes(keyword));

        // VERY STRICT: If no career keywords found, it's out of scope
        if (!hasCareerKeywords) {
            // Additional check for obviously non-career questions
            if (
                lower.includes('write code') ||
                lower.includes('write a code') ||
                lower.includes('factorial') ||
                lower.includes('fibonacci') ||
                lower.includes('algorithm') ||
                lower.includes('programming') ||
                lower.includes('python') ||
                lower.includes('javascript') ||
                lower.includes('java') ||
                lower.includes('c++') ||
                lower.includes('html') ||
                lower.includes('css') ||
                lower.includes('sql') ||
                lower.includes('database') ||
                lower.includes('function') ||
                lower.includes('variable') ||
                lower.includes('array') ||
                lower.includes('object') ||
                lower.includes('class') ||
                lower.includes('method') ||
                lower.includes('loop') ||
                lower.includes('condition') ||
                lower.includes('math') ||
                lower.includes('mathematics') ||
                lower.includes('calculate') ||
                lower.includes('formula') ||
                lower.includes('equation') ||
                lower.includes('physics') ||
                lower.includes('chemistry') ||
                lower.includes('biology') ||
                lower.includes('science') ||
                lower.includes('weather') ||
                lower.includes('temperature') ||
                lower.includes('climate') ||
                lower.includes('time') ||
                lower.includes('date') ||
                lower.includes('calendar') ||
                lower.includes('news') ||
                lower.includes('politics') ||
                lower.includes('government') ||
                lower.includes('election') ||
                lower.includes('vote') ||
                lower.includes('stock') ||
                lower.includes('crypto') ||
                lower.includes('bitcoin') ||
                lower.includes('investment') ||
                lower.includes('finance') ||
                lower.includes('money') ||
                lower.includes('banking') ||
                lower.includes('loan') ||
                lower.includes('mortgage') ||
                lower.includes('insurance') ||
                lower.includes('cooking') ||
                lower.includes('recipe') ||
                lower.includes('food') ||
                lower.includes('restaurant') ||
                lower.includes('travel') ||
                lower.includes('vacation') ||
                lower.includes('holiday') ||
                lower.includes('flight') ||
                lower.includes('hotel') ||
                lower.includes('booking') ||
                lower.includes('movie') ||
                lower.includes('film') ||
                lower.includes('tv') ||
                lower.includes('television') ||
                lower.includes('music') ||
                lower.includes('song') ||
                lower.includes('book') ||
                lower.includes('read') ||
                lower.includes('health') ||
                lower.includes('medical') ||
                lower.includes('doctor') ||
                lower.includes('medicine') ||
                lower.includes('hospital') ||
                lower.includes('legal') ||
                lower.includes('law') ||
                lower.includes('lawyer') ||
                lower.includes('court') ||
                lower.includes('sport') ||
                lower.includes('game') ||
                lower.includes('play') ||
                lower.includes('shopping') ||
                lower.includes('buy') ||
                lower.includes('purchase') ||
                lower.includes('sell') ||
                lower.includes('product') ||
                lower.includes('price') ||
                lower.includes('cost') ||
                lower.includes('animal') ||
                lower.includes('pet') ||
                lower.includes('dog') ||
                lower.includes('cat') ||
                lower.includes('car') ||
                lower.includes('vehicle') ||
                lower.includes('transport') ||
                lower.includes('technology') ||
                lower.includes('smartphone') ||
                lower.includes('computer') ||
                lower.includes('software') ||
                lower.includes('hardware') ||
                lower.includes('app') ||
                lower.includes('website') ||
                lower.includes('internet') ||
                lower.includes('social media') ||
                lower.includes('facebook') ||
                lower.includes('instagram') ||
                lower.includes('twitter') ||
                lower.includes('youtube') ||
                lower.includes('google') ||
                lower.includes('apple') ||
                lower.includes('microsoft') ||
                lower.includes('amazon') ||
                text.length < 3 || // Very short messages
                lower.match(/^(hi|hello|hey|what|who|when|where|why|how)$/i) || // Single word questions
                lower.match(/\b(what is|define|explain|tell me about|how to) (?!.*\b(career|job|resume|cv|interview|salary|workplace|professional|employment|hiring|recruitment|internship|work|skill|development|growth|training|coaching|mentor|leadership|management|networking|linkedin|application|employer|employee|company|business|position|role|occupation|profession|industry|freelance|contract|remote|team|performance|productivity|certification|promotion|raise|benefits|hr|compensation|transition|startup|corporate|consultant|director|executive|graduate|education|university|college|course|workshop|seminar|conference|client|customer|project)\b)/) ||
                lower.match(/\bhow to (?!.*\b(get a job|find a job|find work|apply for|interview|build resume|write cv|network|career|professional|develop|grow|learn|improve|advance|transition|switch|negotiate|manage|lead|communicate|present|organize|plan|solve|achieve|succeed|excel|perform|deliver|complete|finish|start|begin|create|build|make|design|develop)\b)/)
            ) {
                return 'out-of-scope';
            }

            // If no career keywords and not obviously technical/non-career, still consider out of scope
            return 'out-of-scope';
        }
        // Internship detection (check before job search)
        if (
            lower.includes('internship') ||
            lower.includes('intern') ||
            lower.includes('i want to get the internship') ||
            lower.includes('looking for internship') ||
            lower.includes('need internship') ||
            lower.includes('find internship') ||
            lower.includes('apply for internship') ||
            lower.includes('summer internship') ||
            lower.includes('paid internship') ||
            lower.includes('unpaid internship') ||
            lower.includes('internship opportunities') ||
            lower.includes('internship program')
        ) {
            return 'internship';
        }
        // Job search detection (stricter)
        if (
            lower.match(/\b(i want|find me|get me|looking for|search for|need|apply for) (a |an |the )?([a-z ]+ )?job\b/) ||
            lower.match(/\b([a-z ]+ )job\b/) && (lower.includes('find') || lower.includes('want') || lower.includes('looking for') || lower.includes('apply for')) ||
            lower.match(/\b(software developer job|testing job|career coach job|marketing job|sales job|designer job|engineer job|manager job|analyst job)\b/) ||
            lower.includes('i am a job seeker') ||
            lower.includes("i'm a job seeker") ||
            lower.includes('i am a jobseeker') ||
            lower.includes("i'm a jobseeker") ||
            lower.includes('i am job seeker') ||
            lower.includes("i'm job seeker") ||
            lower.includes('i am looking for a job') ||
            lower.includes('i am searching for a job') ||
            lower.includes('i need a job') ||
            lower.includes('i want a job')
        ) {
            return 'job-search';
        }
        return null;
    };

    // Helper: Add bot message with HTML (for links)
    const addBotMessageHTML = (html) => {
        setMessages(prev => [
            ...prev,
            {
                id: uniqueId(),
                content: html,
                sender: 'bot',
                timestamp: new Date(),
                isHTML: true
            }
        ]);
    };

    const handleSuggestedQuestion = async (question) => {
        addUserMessage(question);

        // Special intent detection
        const special = detectSpecialIntent(question);
        if (special === 'out-of-scope') {
            addBotMessage(
                "I appreciate your question, but I specialize specifically in career-related services. I can only assist with:\n\n✅ Career growth and development\n✅ Job search and applications\n✅ Resume/CV building and optimization\n✅ Interview preparation\n✅ Internship opportunities\n✅ Professional skills and networking\n✅ Workplace guidance\n\nFor any queries beyond these career and job-related services, other topics are outside my scope of expertise.\n\nHow can I help you with your career journey today? 🚀"
            );
            return;
        }
        if (special === 'resume-update') {
            addBotMessageHTML(
                `You can update or build your resume instantly using our <b>Genies Career Hub Resume Builder</b>.<br />
                <a href="https://www.geniescareerhub.com/resume" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Update or Build Your Resume Now</a><br /><br />Is there anything else I can help you with?`
            );
            return;
        }
        if (special === 'ats') {
            addBotMessageHTML(
                `You can check your resume's ATS score and get a detailed analysis using our <b>Genies Career Hub Resume Analyzer</b>.<br />
                <a href="https://www.geniescareerhub.com/resume-analyzer" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Analyze My Resume</a><br /><br />Is there anything else I can help you with?`
            );
            return;
        }
        if (special === 'job-search') {
            addBotMessageHTML(
                `You can browse and apply for jobs on <b>Genies Career Hub</b>.<br />
                <a href="https://www.geniescareerhub.com/jobs" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Browse Jobs Now</a><br /><br />Let me know if you need help with your job search or applications!`
            );
            return;
        }
        if (special === 'recruiter-tools') {
            addBotMessageHTML(
                `You can access recruiter tools, post jobs, and find candidates on <b>Genies Career Hub</b>.<br />
                <a href="https://www.geniescareerhub.com/recruiter/signin" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Access Recruiter Tools</a><br /><br />Let me know if you need help with your recruitment process!`
            );
            return;
        }
        if (special === 'internship') {
            addBotMessageHTML(
                `🎓 <b>Kickstart Your Career with Internships!</b><br />
                Explore internship opportunities that align with your interests and skills. Gain real-world experience and build your professional network through our comprehensive internship program.<br />
                <a href="https://www.geniescareerhub.com/internship" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Browse Internships</a><br /><br />Need help with applications or want to know more about specific programs? I'm here to help!`
            );
            return;
        }

        // Get AI response
        const aiResponse = await getAIResponse(question);
        // Fallback: If AI response contains specific intents, handle them
        if (detectSpecialIntent(aiResponse) === 'out-of-scope') {
            addBotMessage(
                "I appreciate your question, but I specialize specifically in career-related services. I can only assist with:\n\n✅ Career growth and development\n✅ Job search and applications\n✅ Resume/CV building and optimization\n✅ Interview preparation\n✅ Internship opportunities\n✅ Professional skills and networking\n✅ Workplace guidance\n\nFor any queries beyond these career and job-related services, other topics are outside my scope of expertise.\n\nHow can I help you with your career journey today? 🚀"
            );
        } else if (detectSpecialIntent(aiResponse) === 'resume-update') {
            addBotMessageHTML(
                `You can update or build your resume instantly using our <b>Genies Career Hub Resume Builder</b>.<br />
                <a href="https://www.geniescareerhub.com/resume" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Update or Build Your Resume Now</a><br /><br />Is there anything else I can help you with?`
            );
        } else if (detectSpecialIntent(aiResponse) === 'ats') {
            addBotMessageHTML(
                `You can check your resume's ATS score and get a detailed analysis using our <b>Genies Career Hub Resume Analyzer</b>.<br />
                <a href="https://www.geniescareerhub.com/resume-analyzer" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Analyze My Resume</a><br /><br />Is there anything else I can help you with?`
            );
        } else if (detectSpecialIntent(aiResponse) === 'job-search') {
            addBotMessageHTML(
                `You can browse and apply for jobs on <b>Genies Career Hub</b>.<br />
                <a href="https://www.geniescareerhub.com/jobs" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Browse Jobs Now</a><br /><br />Let me know if you need help with your job search or applications!`
            );
        } else if (detectSpecialIntent(aiResponse) === 'recruiter-tools') {
            addBotMessageHTML(
                `You can access recruiter tools, post jobs, and find candidates on <b>Genies Career Hub</b>.<br />
                <a href="https://www.geniescareerhub.com/recruiter/signin" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Access Recruiter Tools</a><br /><br />Let me know if you need help with your recruitment process!`
            );
        } else if (detectSpecialIntent(aiResponse) === 'internship') {
            addBotMessageHTML(
                `🎓 <b>Kickstart Your Career with Internships!</b><br />
                Explore internship opportunities that align with your interests and skills. Gain real-world experience and build your professional network through our comprehensive internship program.<br />
                <a href="https://www.geniescareerhub.com/internship" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Browse Internships</a><br /><br />Need help with applications or want to know more about specific programs? I'm here to help!`
            );
        } else {
            addBotMessage(aiResponse);
        }

        // Add follow-up suggestion
        setTimeout(() => {
            addBotMessage("What else would you like to know? Feel free to ask any follow-up questions!");
        }, 1500);
    };

    const getAIResponse = async (message, context = '') => {
        try {
            setIsTyping(true);
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: context ? `${context}\n\n${message}` : message,
                    userType,
                    conversationHistory: messages.slice(-6) // Send last 6 messages for context
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error getting AI response:', error);
            
            // Fallback responses
            const fallbackResponses = {
                jobseeker: "I'm here to help with your job search! Let me know what specific area you'd like assistance with - resume building, interview prep, or job search strategies.",
                recruiter: "I'm here to assist with your recruitment needs! What would you like help with - candidate sourcing, interview processes, or job descriptions?"
            };
            
            return fallbackResponses[userType] || fallbackResponses.jobseeker;
        } finally {
            setIsTyping(false);
        }
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            const userInput = inputValue;
            addUserMessage(userInput);
            setInputValue('');

            // Check for special intents first
            const specialIntent = detectSpecialIntent(userInput);
            if (specialIntent) {
                // Handle special intents with responses
                if (specialIntent === 'out-of-scope') {
                    addBotMessage(
                        "I appreciate your question, but I specialize specifically in career-related services. I can only assist with:\n\n✅ Career growth and development\n✅ Job search and applications\n✅ Resume/CV building and optimization\n✅ Interview preparation\n✅ Internship opportunities\n✅ Professional skills and networking\n✅ Workplace guidance\n\nFor any queries beyond these career and job-related services, other topics are outside my scope of expertise.\n\nHow can I help you with your career journey today? 🚀"
                    );
                    return;
                }
                if (specialIntent === 'resume-update') {
                    addBotMessageHTML(
                        `You can update or build your resume instantly using our <b>Genies Career Hub Resume Builder</b>.<br />
                        <a href="https://www.geniescareerhub.com/cv-studio" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Update or Build Your Resume Now</a><br /><br />Is there anything else I can help you with?`
                    );
                    return;
                }
                if (specialIntent === 'ats') {
                    addBotMessageHTML(
                        `You can check your resume's ATS score and get a detailed analysis using our <b>Genies Career Hub Resume Analyzer</b>.<br />
                        <a href="https://www.geniescareerhub.com/resume-analyzer" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Analyze My Resume</a><br /><br />Is there anything else I can help you with?`
                    );
                    return;
                }
                if (specialIntent === 'job-search') {
                    addBotMessageHTML(
                        `You can browse and apply for jobs on <b>Genies Career Hub</b>.<br />
                        <a href="https://www.geniescareerhub.com/jobs" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Browse Jobs Now</a><br /><br />Let me know if you need help with your job search or applications!`
                    );
                    return;
                }
                if (specialIntent === 'recruiter-tools') {
                    addBotMessageHTML(
                        `You can access recruiter tools, post jobs, and find candidates on <b>Genies Career Hub</b>.<br />
                        <a href="https://www.geniescareerhub.com/recruiter/signin" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Access Recruiter Tools</a><br /><br />Let me know if you need help with your recruitment process!`
                    );
                    return;
                }
                if (specialIntent === 'internship') {
                    addBotMessageHTML(
                        `🎓 <b>Kickstart Your Career with Internships!</b><br />
                        Explore internship opportunities that align with your interests and skills. Gain real-world experience and build your professional network through our comprehensive internship program.<br />
                        <a href="https://www.geniescareerhub.com/internship" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:8px 16px;background:#172554;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Browse Internships</a><br /><br />Need help with applications or want to know more about specific programs? I'm here to help!`
                    );
                    return;
                }
            }

            // Get AI response for generic queries
            const aiResponse = await getAIResponse(userInput);
            // Check if the response contains HTML tags
            if (typeof aiResponse === 'string' && (aiResponse.includes('<b>') || aiResponse.includes('<ul>') || aiResponse.includes('<li>') || aiResponse.includes('<br'))) {
                addBotMessageHTML(aiResponse);
            } else {
                addBotMessage(aiResponse);
            }
        }
    };

    const resetChat = () => {
        setMessages([]);
        setUserType(null);
        setConversationStage('initial');
        setInputValue('');
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`animate-bounce fixed bottom-6 right-6 z-50 bg-blue-950 hover:bg-blue-900 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
            >
                <MessageCircle className="h-6 w-6" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden "
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="bg-blue-950 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src="/genies.jpg" alt="Genie Icon" className="h-8 w-8 rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Genies</h3>
                                    <p className="text-sm text-blue-200">Your Career Assistant</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 gap-5">
                                <button
                                    onClick={resetChat}
                                    className="text-blue-200 hover:text-white transition-colors text-sm flex items-center gap-1 cursor-pointer"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-blue-200 hover:text-white transition-colors cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] rounded-2xl p-3 ${
                                        message.sender === 'user'
                                            ? 'bg-blue-950 text-white'
                                            : 'bg-gray-100 text-gray-900'
                                    }`}>
                                        {message.isHTML ? (
                                            <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content }} />
                                        ) : (
                                            <div className="text-sm leading-relaxed">
                                                {message.content}
                                            </div>
                                        )}
                                        
                                        {/* User Type Selection Buttons */}
                                        {message.showButtons && conversationStage === 'initial' && (
                                            <div className="mt-3 space-y-2">
                                                <motion.button
                                                    onClick={() => handleUserTypeSelection('jobseeker')}
                                                    className="w-full bg-blue-950 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <User className="h-4 w-4" />
                                                    <span>Job Seeker</span>
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => handleUserTypeSelection('recruiter')}
                                                    className="w-full bg-blue-950 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>Recruiter</span>
                                                </motion.button>
                                            </div>
                                        )}

                                        {/* Suggested Questions */}
                                        {message.showButtons === 'suggestions' && userType && (
                                            <div className="mt-3 space-y-2">
                                                <div className="text-xs text-gray-600 mb-2 font-semibold">Examples:</div>
                                                {suggestedQuestions[userType].slice(0, 4).map((question, index) => (
                                                    <motion.button
                                                        key={index}
                                                        onClick={() => handleSuggestedQuestion(question)}
                                                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-800 py-2 px-3 rounded-lg transition-colors text-sm text-left border border-blue-200"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        🎯 {question}
                                                    </motion.button>
                                                ))}
                                                <motion.div
                                                    className="text-center mt-3"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <div className="text-xs text-gray-500 italic">
                                                        Or type your own question below ⬇️
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            
                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-100 rounded-2xl p-3">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm"
                                />
                                <motion.button
                                    onClick={handleSendMessage}
                                    className="bg-blue-950 hover:bg-blue-900 text-white p-2 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send className="h-4 w-4" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CareerMate; 