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

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [userType, setUserType] = useState(null); // 'jobseeker' or 'recruiter'
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
            // Initial greeting
            setTimeout(() => {
                addBotMessage("👋 Hello! I'm CareerMate, your professional career and recruitment assistant. I'm here to help you succeed in your career journey!");
                setTimeout(() => {
                    addBotMessage("👉 Are you a **Jobseeker** or a **Recruiter**?", true);
                }, 1000);
            }, 500);
        }
    }, [isOpen]);

    const addBotMessage = (content, showButtons = false) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                content,
                sender: 'bot',
                timestamp: new Date(),
                showButtons
            }]);
            setIsTyping(false);
        }, 1000);
    };

    const addUserMessage = (content) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            content,
            sender: 'user',
            timestamp: new Date()
        }]);
    };

    const handleUserTypeSelection = (type) => {
        setUserType(type);
        addUserMessage(type === 'jobseeker' ? 'Jobseeker' : 'Recruiter');
        
        if (type === 'jobseeker') {
            setTimeout(() => {
                addBotMessage("Perfect! I'm excited to help you with your job search journey. 🎯");
                setTimeout(() => {
                    addBotMessage("Let me ask you a few questions to better understand how I can assist you:", true, 'jobseeker-questions');
                }, 1500);
            }, 500);
        } else {
            setTimeout(() => {
                addBotMessage("Excellent! I'm here to help you find the best talent for your organization. 🏢");
                setTimeout(() => {
                    addBotMessage("Let me ask you a few questions to understand your hiring needs:", true, 'recruiter-questions');
                }, 1500);
            }, 500);
        }
        setConversationStage('questions');
    };

    const jobseekerQuestions = [
        { id: 'job-type', text: 'What type of job are you looking for?', icon: <Search className="h-4 w-4" /> },
        { id: 'resume-help', text: 'Do you need help with your resume?', icon: <FileText className="h-4 w-4" /> },
        { id: 'interview-prep', text: 'Need interview preparation tips?', icon: <User className="h-4 w-4" /> },
        { id: 'career-growth', text: 'Looking for career growth advice?', icon: <TrendingUp className="h-4 w-4" /> }
    ];

    const recruiterQuestions = [
        { id: 'hiring-roles', text: 'What roles are you hiring for?', icon: <Briefcase className="h-4 w-4" /> },
        { id: 'sourcing-help', text: 'Need candidate sourcing strategies?', icon: <Search className="h-4 w-4" /> },
        { id: 'interview-process', text: 'Want to improve your interview process?', icon: <Users className="h-4 w-4" /> },
        { id: 'job-descriptions', text: 'Need help creating job descriptions?', icon: <FileText className="h-4 w-4" /> }
    ];

    const handleQuestionClick = (questionId) => {
        const question = userType === 'jobseeker' 
            ? jobseekerQuestions.find(q => q.id === questionId)
            : recruiterQuestions.find(q => q.id === questionId);
        
        addUserMessage(question.text);
        
        // Provide specific advice based on the question
        setTimeout(() => {
            let response = getResponseForQuestion(questionId, userType);
            addBotMessage(response);
            
            setTimeout(() => {
                addBotMessage("Would you like to explore any other areas? Feel free to ask me anything related to your " + (userType === 'jobseeker' ? 'job search' : 'recruitment needs') + "! 💪");
            }, 2000);
        }, 1000);
    };

    const getResponseForQuestion = (questionId, userType) => {
        const responses = {
            jobseeker: {
                'job-type': "Great! To help you find the right job, consider these steps:\n\n🎯 **Define your goals**: What industry, role level, and company size interests you?\n\n📝 **Tailor your search**: Use specific keywords on job boards like LinkedIn, Indeed, and company websites\n\n🌐 **Network actively**: Reach out to professionals in your target field\n\n💼 **Consider remote opportunities**: Expand your search beyond geographic limitations\n\nWhat specific industry or role are you targeting?",
                
                'resume-help': "Absolutely! Here's how to create a standout resume:\n\n✨ **ATS-Optimized**: Use relevant keywords from job descriptions\n\n📊 **Quantify achievements**: Include numbers, percentages, and specific results\n\n🎯 **Tailor for each role**: Customize your resume for different positions\n\n📋 **Clean format**: Use professional fonts, consistent spacing, and clear sections\n\n🔗 **LinkedIn alignment**: Ensure your resume matches your LinkedIn profile\n\nWould you like me to review any specific section of your resume?",
                
                'interview-prep': "Excellent! Here's your interview success roadmap:\n\n🔍 **Research thoroughly**: Study the company, role, and interviewer backgrounds\n\n💭 **Practice STAR method**: Structure your answers with Situation, Task, Action, Result\n\n❓ **Prepare questions**: Show interest by asking about company culture, growth opportunities\n\n👔 **Professional presentation**: Dress appropriately and test your tech for virtual interviews\n\n🎯 **Follow up**: Send a thank-you email within 24 hours\n\nWhat type of interview are you preparing for?",
                
                'career-growth': "Fantastic! Let's accelerate your career growth:\n\n📚 **Continuous learning**: Identify in-demand skills in your field and invest in training\n\n🤝 **Build relationships**: Network within and outside your organization\n\n🎯 **Set clear goals**: Define short-term and long-term career objectives\n\n💪 **Take initiative**: Volunteer for challenging projects and leadership opportunities\n\n📈 **Track progress**: Document your achievements and regularly update your professional profiles\n\nWhat's your current career stage and where do you want to be in 2-3 years?"
            },
            recruiter: {
                'hiring-roles': "Perfect! Let's optimize your hiring strategy:\n\n📋 **Define requirements**: Create detailed job descriptions with must-have vs. nice-to-have skills\n\n🎯 **Identify sourcing channels**: LinkedIn, industry-specific boards, employee referrals, universities\n\n💰 **Competitive compensation**: Research market rates to attract top talent\n\n⏰ **Streamline process**: Set clear timelines and communication expectations\n\n🏢 **Showcase culture**: Highlight your company's values and growth opportunities\n\nWhat roles are your top priority right now?",
                
                'sourcing-help': "Excellent! Here are proven sourcing strategies:\n\n🔍 **Boolean search mastery**: Use advanced LinkedIn and Google search techniques\n\n🌐 **Expand your reach**: Explore GitHub, Stack Overflow, industry forums, and professional associations\n\n🤝 **Employee referrals**: Implement a strong referral program with incentives\n\n📱 **Social recruiting**: Engage candidates on Twitter, professional groups, and industry events\n\n🎯 **Passive candidates**: Build relationships before you need to hire\n\nWhich sourcing channels have worked best for your organization?",
                
                'interview-process': "Great choice! Let's enhance your interview process:\n\n🏗️ **Structured approach**: Use consistent questions and evaluation criteria\n\n👥 **Panel diversity**: Include different perspectives and expertise levels\n\n⚡ **Efficient scheduling**: Respect candidates' time with prompt communication\n\n🧠 **Skills assessment**: Include practical exercises relevant to the role\n\n📞 **Candidate experience**: Provide feedback and maintain professional communication throughout\n\nWhat challenges are you currently facing in your interview process?",
                
                'job-descriptions': "Absolutely! Here's how to craft compelling job descriptions:\n\n🎯 **Clear title**: Use industry-standard terms that candidates search for\n\n💡 **Engaging summary**: Start with what makes the role and company exciting\n\n📝 **Specific requirements**: Distinguish between required and preferred qualifications\n\n🚀 **Growth opportunities**: Highlight career development and learning prospects\n\n🎁 **Complete package**: Include salary range, benefits, and company culture details\n\nWhat type of role are you looking to create a job description for?"
            }
        };
        
        return responses[userType][questionId] || "Thanks for your question! I'm here to help with any other career-related queries you might have.";
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            addUserMessage(inputValue);
            
            // Simple response logic for general questions
            setTimeout(() => {
                let response = "Thank you for your question! ";
                if (userType === 'jobseeker') {
                    response += "As a jobseeker, I recommend focusing on building a strong professional network, keeping your skills updated, and maintaining an active online presence. ";
                } else if (userType === 'recruiter') {
                    response += "As a recruiter, consider leveraging multiple sourcing channels, building relationships with passive candidates, and ensuring a positive candidate experience. ";
                }
                response += "Is there anything specific you'd like to know more about?";
                
                addBotMessage(response);
            }, 1000);
            
            setInputValue('');
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
                                    {/* <Bot className="h-6 w-6" /> */}
                                    <img src="/genies.jpg" alt="Genie Icon" className="h-10 w-10" />
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
                                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                            {message.content}
                                        </div>
                                        
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
                                                    <span>I'm a Jobseeker</span>
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => handleUserTypeSelection('recruiter')}
                                                    className="w-full bg-blue-950 hover:bg-blue-900 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>I'm a Recruiter</span>
                                                </motion.button>
                                            </div>
                                        )}

                                        {/* Question Buttons */}
                                        {message.showButtons && conversationStage === 'questions' && (
                                            <div className="mt-3 space-y-2">
                                                {(userType === 'jobseeker' ? jobseekerQuestions : recruiterQuestions).map((question) => (
                                                    <motion.button
                                                        key={question.id}
                                                        onClick={() => handleQuestionClick(question.id)}
                                                        className="w-full bg-blue-950 hover:bg-blue-900 text-white py-2 px-3 rounded-lg transition-colors flex items-center space-x-2 text-sm"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {question.icon}
                                                        <span>{question.text}</span>
                                                    </motion.button>
                                                ))}
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

export default ChatBot; 