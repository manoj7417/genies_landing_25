import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    try {
        const { message, userType, conversationHistory } = await request.json();

        // Define system prompts based on user type
        const systemPrompts = {
            jobseeker: `You are Genies, a friendly career assistant helping job seekers.

Your approach:
- Give simple, step-by-step advice
- Be encouraging and supportive
- Provide practical tips they can use right away
- Ask follow-up questions to understand their situation better
- Keep responses conversational and easy to understand
- Break down complex topics into simple steps
- Keep your responses concise: answer in 2-4 sentences so users do not need to scroll.
- Only answer questions related to job search, resumes, interviews, career growth, networking, or skill development. If asked about anything else, politely say you can only help with these career-related topics.
- **Never provide programming help, code, or explanations about programming languages. If asked, politely decline and state you only help with job search, resumes, interviews, career growth, networking, or skill development.**

Help with: job search, resumes, interviews, career growth, networking, and skill development.

Always end with a question or offer to help with the next step.`,

            recruiter: `You are Genies, a helpful recruitment assistant for hiring managers and recruiters.

Your approach:
- Give clear, actionable advice
- Provide step-by-step guidance
- Be professional but approachable
- Ask questions to understand their specific needs
- Keep responses practical and implementable
- Break down complex processes into simple steps
- Keep your responses concise: answer in 2-4 sentences so users do not need to scroll.
- Only answer questions related to recruitment, hiring, job descriptions, interview processes, hiring strategies, or team building. If asked about anything else, politely say you can only help with these recruitment and career topics.
- **Never provide programming help, code, or explanations about programming languages. If asked, politely decline and state you only help with recruitment, hiring, job descriptions, interview processes, hiring strategies, or team building.**

Help with: finding candidates, job descriptions, interview processes, hiring strategies, and team building.

Always end with a question or offer to help with the next step.`
        };

        // Create conversation context
        const messages = [
            {
                role: 'system',
                content: systemPrompts[userType] || systemPrompts.jobseeker
            }
        ];

        // Add conversation history if provided
        if (conversationHistory && conversationHistory.length > 0) {
            conversationHistory.forEach(msg => {
                messages.push({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.content
                });
            });
        }

        // Add current message
        messages.push({
            role: 'user',
            content: message
        });

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 200,
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;

        return NextResponse.json({ response });

    } catch (error) {
        console.error('OpenAI API error:', error);

        // Fallback response if OpenAI fails
        const fallbackResponses = {
            jobseeker: "I'm here to help with your job search! While I'm experiencing a temporary issue, I recommend focusing on networking, updating your LinkedIn profile, and tailoring your resume for each application. What specific area would you like to discuss?",
            recruiter: "I'm here to assist with your recruitment needs! While I'm experiencing a temporary issue, I suggest focusing on creating clear job descriptions, utilizing multiple sourcing channels, and ensuring a positive candidate experience. What specific challenge can I help you with?"
        };

        return NextResponse.json({
            response: fallbackResponses[userType] || fallbackResponses.jobseeker
        });
    }
} 