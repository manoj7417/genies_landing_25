# Genies Landing Page

A modern, responsive landing page for GenieCareerHub with integrated AI-powered CareerMate chatbot.

## Features

- 🎯 Professional landing page design
- 🤖 AI-powered CareerMate chatbot assistant
- 👨‍💼 Specialized guidance for Job Seekers
- 🏢 Tailored assistance for Recruiters
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and React 19

## CareerMate AI Chatbot

CareerMate is an intelligent career assistant that provides personalized guidance for both job seekers and recruiters using OpenAI's GPT-4.

### For Job Seekers:
- Job search strategies and techniques
- Resume and LinkedIn optimization
- Interview preparation tips
- Career development guidance
- Skill development recommendations
- Networking strategies

### For Recruiters:
- Candidate sourcing strategies
- Job description optimization
- Interview process improvement
- Recruitment best practices
- Employer branding guidance

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd genies_landing_page
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure OpenAI API (Required for CareerMate)

1. Create a `.env.local` file in the root directory
2. Add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

## Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **AI Integration**: OpenAI GPT-4
- **Icons**: Lucide React
- **Carousel**: Swiper.js

## Project Structure

```
genies_landing_page/
├── app/
│   ├── api/chat/          # OpenAI API integration
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Main landing page
├── components/
│   ├── CareerMate.jsx     # AI chatbot component
│   ├── Footer.jsx         # Footer component
│   ├── Navbar.jsx         # Navigation component
│   └── Toast.jsx          # Toast notifications
├── public/                # Static assets
└── README.md
```

## Features Breakdown

### Landing Page Sections
- Hero section with compelling messaging
- About GenieCareerHub services
- Service showcase with interactive cards
- Client testimonials with image carousel
- Specialized sections for job seekers and recruiters
- Statistics and achievements
- Contact form with validation

### CareerMate AI Assistant
- Floating chat interface
- Context-aware conversations
- User type detection (Job Seeker vs Recruiter)
- Specialized question prompts
- Conversation history tracking
- Fallback responses for offline scenarios
- Professional typing indicators and animations

## Deployment

The application can be deployed on platforms like Vercel, Netlify, or any hosting service that supports Next.js.

Remember to set the `OPENAI_API_KEY` environment variable in your production environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to GenieCareerHub.
