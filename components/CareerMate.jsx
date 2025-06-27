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
                addBotMessage("👋 Hello! I'm CareerMate, your career assistant.");
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
            "Should I take this job offer?",
            "How to find entry-level positions?"
        ],
        recruiter: [
            "Need to hire a senior developer quickly",
            "How to attract passive candidates?",
            "Writing job descriptions for tech roles",
            "Screening candidates more effectively",
            "Building our employer brand",
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
            lower.includes('recruiter tools')
        ) {
            return 'recruiter-tools';
        }
        // Job search detection (stricter)
        if (
            lower.match(/\b(i want|find me|get me|looking for|search for|need|apply for) (a |an |the )?([a-z ]+ )?job\b/) ||
            lower.match(/\b([a-z ]+ )job\b/) && (lower.includes('find') || lower.includes('want') || lower.includes('looking for') || lower.includes('apply for')) ||
            lower.match(/\b(software developer job|testing job|career coach job|marketing job|sales job|designer job|engineer job|manager job|analyst job|internship)\b/)
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

        // Get AI response
        const aiResponse = await getAIResponse(question);
        // Fallback: If AI response contains resume-update intent, show the link
        if (detectSpecialIntent(aiResponse) === 'resume-update') {
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

            // Special intent detection
            const special = detectSpecialIntent(userInput);
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

            // Get AI response for the user's message
            const aiResponse = await getAIResponse(userInput);
            // Fallback: If AI response contains resume-update intent, show the link
            if (detectSpecialIntent(aiResponse) === 'resume-update') {
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
                className={`fixed bottom-6 right-6 z-50 bg-blue-950 hover:bg-blue-900 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
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
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="bg-blue-950 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">CareerMate</h3>
                                    <p className="text-sm text-blue-200">Your Career Assistant</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={resetChat}
                                    className="text-blue-200 hover:text-white transition-colors text-sm"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-blue-200 hover:text-white transition-colors"
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
                                            <div className="whitespace-pre-wrap text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content }} />
                                        ) : (
                                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
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
                                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm"
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