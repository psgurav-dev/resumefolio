export interface TemplateCardProps {
	id: string;
	name: string;
	snapshot: string;
}

export interface TemplateProps {
	id: number;
	tag: string;
	title: string;
	description: string;
	author: string;
	avatar: string;
	uses: string;
	accent: string;
	preview: string;
}

export interface TemplateData {
	id: string;
	name: string;
	description: string;
	Component: React.FC;
}

export interface StatBadgeProps {
	label: string;
	value: string;
	accent: string;
}