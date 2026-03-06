import CreativeTheme from "@/templates/nexus.template"
import React from 'react'

import { PortfolioData } from '@/types/portfolio';

export const resumeData: PortfolioData = {
	fullName: "Ravindra Kisan Jadhav",
	jobTitle: "Creative Frontend Developer & Game UI Designer",
	profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=500&h=500", // High-quality placeholder
	githubUsername: "ravindra-j-dev", // Used for the GitHub Stats API
	email: "ravindra.jadhav@example.com",
	phone: "+91 98765 43210",
	location: "Pune, Maharashtra",
	linkedin: "https://linkedin.com/in/ravindrajadhav",
	github: "https://github.com/ravindra-j-dev",
	summary: "A passionate Lead Generation Executive turned Frontend Developer with a flair for crafting immersive user interfaces. Specialized in React, Next.js, and Phaser JS, I bridge the gap between business logic and interactive digital experiences.",

	skills: [
		{
			category: "Frontend Tech",
			items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
		},
		{
			category: "Game Development",
			items: ["Phaser JS", "Game UI Design", "Asset Optimization", "Canvas API"]
		},
		{
			category: "Tools & Others",
			items: ["Figma", "Git", "Node.js", "Lead Generation", "SEO"]
		}
	],

	experience: [
		{
			company: "AMAR (Construction)",
			role: "Operations Support",
			period: "Dec 2025 - Present",
			location: "Pune, India",
			description: [
				"Managing digital workflows and documentation for large-scale construction projects.",
				"Optimizing internal reporting systems using modern web tools."
			]
		},
		{
			company: "Revknew Technologies Private Limited",
			role: "Lead Generation Executive",
			period: "Jan 2024 - Dec 2025",
			location: "Pune, India",
			description: [
				"Led a team to generate high-quality B2B leads, resulting in a 25% increase in conversion rates.",
				"Developed automated scripts to streamline data scraping and CRM entry."
			]
		}
	],

	projects: [
		{
			name: "Phaser Quest: UI Redesign",
			description: "A complete overhaul of an RPG game interface. Implemented responsive HUDs, inventory management systems, and smooth transition animations using Phaser JS and Framer Motion.",
			technologies: ["Phaser JS", "TypeScript", "GSAP"],
			link: "https://phaser.io", // Replace with actual project URL
			screenshot: "https://images.unsplash.com/photo-1542751371-adc38448a05e?fit=crop&w=800&h=450"
		},
		{
			name: "Nexus Portfolio Engine",
			description: "A Next.js based portfolio generator that uses AI to curate resume data into high-end, glassmorphic themes. Features real-time GitHub integration and dynamic iFrame previews.",
			technologies: ["Next.js 14", "Tailwind CSS", "Motion/React"],
			link: "https://vercel.com",
			screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=800&h=450"
		},
		{
			name: "Stranger Things Tribute",
			description: "An interactive fan experience featuring 80s synth-wave aesthetics and CSS-grid heavy layouts inspired by the Netflix series.",
			technologies: ["React", "Three.js", "CSS Modules"],
			link: "https://www.netflix.com",
			screenshot: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?fit=crop&w=800&h=450"
		}
	],

	education: [
		{
			institution: "Savitribai Phule Pune University",
			degree: "Bachelor of Commerce (B.Com)",
			period: "2016 - 2019",
			gpa: "3.8/4.0"
		}
	]
};

function page() {
	return (
		<CreativeTheme  />
	)
}

export default page