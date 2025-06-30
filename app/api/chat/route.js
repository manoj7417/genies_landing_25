import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// Smart query matcher - maps user intents to JSON sections
function getRelevantSections(query, data) {
    const q = query.toLowerCase();

    // Define query patterns and their corresponding JSON paths
    const intentMap = {
        // AI-related queries
        'ai': ['core_services.ai_career_coach', 'key_differentiators.ai_integration', 'technology_and_innovation.ai_capabilities'],
        'artificial intelligence': ['core_services.ai_career_coach', 'key_differentiators.ai_integration'],
        'ai-powered': ['core_services.ai_career_coach', 'key_differentiators.ai_integration'],
        'personalized career guidance': ['core_services.ai_career_coach'],
        'career guidance': ['core_services.ai_career_coach', 'core_services.career_coaching_services'],

        // CV/Resume related
        'cv': ['core_services.genies_pro_cv_studio'],
        'resume': ['core_services.genies_pro_cv_studio'],
        'cv builder': ['core_services.genies_pro_cv_studio.tools.cv_creator'],
        'cv optimizer': ['core_services.genies_pro_cv_studio.tools.cv_optimizer'],
        'cv match': ['core_services.genies_pro_cv_studio.tools.cv_match'],
        'ats': ['key_differentiators.ats_friendly_solutions'],

        // Career coaching and advice
        'career coach': ['core_services.career_coaching_services'],
        'coaching': ['core_services.career_coaching_services'],
        'career transition': ['core_services.career_coaching_services'],
        'career growth': ['core_services.career_coaching_services'],
        'career advice': ['core_services.career_coaching_services'],
        'get career advice': ['core_services.career_coaching_services'],
        'can i get career advice': ['core_services.career_coaching_services'],
        'need career advice': ['core_services.career_coaching_services'],
        'want career advice': ['core_services.career_coaching_services'],
        'looking for career advice': ['core_services.career_coaching_services'],
        'career help': ['core_services.career_coaching_services'],
        'can you help with career': ['core_services.career_coaching_services'],
        'career support': ['core_services.career_coaching_services'],

        // Job matching
        'job matching': ['core_services.job_matching_and_career_discovery'],
        'career discovery': ['core_services.job_matching_and_career_discovery'],
        'job search': ['core_services.job_matching_and_career_discovery'],

        // Testing
        'psychometric': ['core_services.psychometric_testing'],
        'personality test': ['core_services.psychometric_testing'],

        // Company info
        'company': ['company'],
        'about': ['company'],
        'contact': ['company.details', 'service_accessibility.contact_methods'],
        'phone': ['company.details', 'service_accessibility.contact_methods'],
        'hours': ['company.details', 'service_accessibility.operating_schedule'],

        // Industries
        'industry': ['industry_coverage'],
        'domains': ['industry_coverage.domains'],

        // Internships (backup detection)
        'internship': ['core_services.internship_program'],
        'intern': ['core_services.internship_program']
    };

    // Find matching intents
    let relevantPaths = [];
    for (const [intent, paths] of Object.entries(intentMap)) {
        if (q.includes(intent)) {
            relevantPaths.push(...paths);
        }
    }

    // If no specific intent found, do a broader search
    if (relevantPaths.length === 0) {
        const queryWords = q.split(' ').filter(word => word.length > 2);
        for (const word of queryWords) {
            for (const [intent, paths] of Object.entries(intentMap)) {
                if (intent.includes(word) || word.includes(intent)) {
                    relevantPaths.push(...paths);
                }
            }
        }
    }

    return [...new Set(relevantPaths)]; // Remove duplicates
}

// Get data from JSON path
function getDataByPath(data, path) {
    const keys = path.split('.');
    let current = data;
    for (const key of keys) {
        if (current && current[key]) {
            current = current[key];
        } else {
            return null;
        }
    }
    return current;
}

// Format response based on data structure
function formatResponse(data, sectionName) {
    let response = '';

    // Format title
    const title = sectionName.split('.').pop().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (data.description) {
        response += `<b>${data.description}</b><br/><br/>`;
    } else {
        response += `<b>${title}</b><br/><br/>`;
    }

    if (data.features && Array.isArray(data.features)) {
        response += '<ul>' + data.features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    } else if (data.tools) {
        // Handle CV Studio tools
        response += '<b>Available Tools:</b><br/>';
        Object.entries(data.tools).forEach(([toolName, toolData]) => {
            const formattedToolName = toolName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            response += `<br/><b>${formattedToolName}:</b><ul>`;
            if (toolData.features) {
                response += toolData.features.map(f => `<li>${f}</li>`).join('');
            }
            response += '</ul>';
        });
    } else if (Array.isArray(data)) {
        response += '<ul>' + data.map(item => `<li>${item}</li>`).join('') + '</ul>';
    } else if (typeof data === 'object') {
        // Handle nested objects
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'description' && key !== 'features') {
                const keyFormatted = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                if (typeof value === 'string') {
                    response += `<b>${keyFormatted}:</b> ${value}<br/>`;
                } else if (Array.isArray(value)) {
                    response += `<b>${keyFormatted}:</b><ul>${value.map(v => `<li>${v}</li>`).join('')}</ul>`;
                }
            }
        });
    }

    // Add specific buttons for certain services
    if (sectionName.includes('internship_program')) {
        response += '<br/><a href="https://www.geniescareerhub.com/internship" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Browse Internships →</a>';
    } else if (sectionName.includes('career_coaching_services')) {
        response += '<br/><a href="https://www.geniescareerhub.com/career-services" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Get Career Coaching →</a>';
    } else if (sectionName.includes('genies_pro_cv_studio')) {
        response += '<br/><a href="https://www.geniescareerhub.com/cv-studio" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Go to CV Studio →</a>';
    } else if (sectionName.includes('job_matching') || sectionName.includes('career_discovery')) {
        response += '<br/><a href="https://www.geniescareerhub.com/jobs" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Browse Jobs →</a>';
    } else if (sectionName.includes('ai_career_coach')) {
        response += '<br/><a href="https://www.geniescareerhub.com/career-services" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Try AI Career Coach →</a>';
    } else if (sectionName.includes('psychometric_testing')) {
        response += '<br/><a href="https://www.geniescareerhub.com/career-services" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Take Psychometric Test →</a>';
    }

    return response;
}

export async function POST(request) {
    try {
        const { message } = await request.json();
        const query = message.toLowerCase();

        console.log('User query:', query);

        // Fix the file path to use correct filename
        const filePath = path.join(process.cwd(), 'app', 'data', 'genies_career_hub.json');
        const fileData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileData);

        // Check for specific career advice requests first
        const careerAdvicePatterns = [
            'can i get career advice',
            'can i get career guidance',
            'need career advice',
            'want career advice',
            'looking for career advice',
            'get career advice',
            'career advice',
            'career help',
            'can you help with career',
            'career support'
        ];

        const isCareerAdviceRequest = careerAdvicePatterns.some(pattern => query.includes(pattern));

        if (isCareerAdviceRequest) {
            // Provide a direct response for career advice requests
            const careerAdviceResponse = `
                <b>Absolutely! I'd be happy to help you with career advice. 🚀</b><br/><br/>
                
                <b>Genies Career Hub</b> offers comprehensive career services to help you succeed:<br/><br/>
                
                <b>🎯 What we offer:</b>
                <ul>
                    <li><b>Expert Career Coaches:</b> Access to internationally acclaimed and accredited career coaches</li>
                    <li><b>24/7 AI Career Coach:</b> Get personalized career guidance anytime</li>
                    <li><b>Career Transition Support:</b> Guidance for changing career paths</li>
                    <li><b>Skill Development:</b> Strategies for professional growth</li>
                    <li><b>Personal Brand Development:</b> Build your professional presence</li>
                    <li><b>Job Search Strategies:</b> Proven methods to find your ideal role</li>
                </ul><br/>
                
                <b>✨ Our expert coaches have years of experience working with candidates from different backgrounds and understand global professional trends.</b><br/><br/>
                
                Ready to supercharge your career? Click below to get started with our career services:<br/>
                <a href="https://www.geniescareerhub.com/career-services" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Get Career Advice Now →</a>
            `;

            return NextResponse.json({ response: careerAdviceResponse });
        }

        // PRIORITY INTERNSHIP DETECTION - Check this FIRST before any other logic
        const internshipPatterns = [
            'internship',
            'intern',
            'get the internship',
            'want internship',
            'need internship',
            'looking for internship',
            'find internship',
            'apply for internship',
            'internship opportunities'
        ];

        const isInternshipRequest = internshipPatterns.some(pattern => query.includes(pattern));

        console.log('=== INTERNSHIP DETECTION DEBUG ===');
        console.log('Query received:', query);
        console.log('Internship patterns checked:', internshipPatterns);
        console.log('Is internship request:', isInternshipRequest);
        console.log('================================');

        if (isInternshipRequest) {
            console.log('🎓 INTERNSHIP DETECTED! Returning internship response immediately...');

            // Get internship program data from the updated JSON
            const internshipData = data.core_services.internship_program;

            const internshipResponse = `
                <b>🎓 INTERNSHIP DETECTED! ${internshipData.service_name}</b><br/><br/>
                
                <b>${internshipData.description}</b><br/><br/>
                
                <b>🌟 What we offer:</b>
                <ul>
                    ${internshipData.features.slice(0, 6).map(feature => `<li>${feature}</li>`).join('')}
                </ul><br/>
                
                <b>💼 Perfect for:</b>
                <ul>
                    ${internshipData.target_audience.map(audience => `<li>${audience}</li>`).join('')}
                </ul><br/>
                
                <b>🚀 Ready to explore internship opportunities that align with your interests and skills?</b><br/><br/>
                
                <a href="https://www.geniescareerhub.com/internship" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#162556;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">Browse Internships →</a>
            `;

            return NextResponse.json({ response: internshipResponse });
        }

        // Get relevant sections based on smart matching
        const relevantPaths = getRelevantSections(query, data);
        console.log('Relevant paths found:', relevantPaths);

        if (relevantPaths.length > 0) {
            // Get the first relevant section
            const sectionData = getDataByPath(data, relevantPaths[0]);

            if (sectionData) {
                const response = formatResponse(sectionData, relevantPaths[0]);
                console.log('Returning formatted response for:', relevantPaths[0]);
                return NextResponse.json({ response });
            }
        }

        // If no relevant sections found, return out-of-scope message
        console.log('No relevant sections found, returning out-of-scope message');
        return NextResponse.json({
            response: data.limitations_and_scope.beyond_scope_notice ||
                "Kindly stick to career discussion only."
        });

    } catch (error) {
        console.error('Error in PDF-based chat API:', error);
        return NextResponse.json({
            response: "Sorry, there was an error processing your request."
        });
    }
} 