"use client";

import { PortfolioData } from "@/types/portfolio";
import { useState } from "react";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Lightbulb, ExternalLink } from "lucide-react";

interface ResumePreviewProps {
  data: PortfolioData;
  onSave: (name: string, data: PortfolioData) => Promise<void>;
  isSaving?: boolean;
  onCancel?: () => void;
}

export const ResumePreview = ({ data, onSave, isSaving, onCancel }: ResumePreviewProps) => {
  const [variantName, setVariantName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleSave = async () => {
    if (!variantName.trim()) return;
    await onSave(variantName, data);
    setVariantName("");
    setShowSaveForm(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 ">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
        <p className="text-xl text-blue-100 mb-4">{data.jobTitle}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {data.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{data.location}</span>
            </div>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <ExternalLink size={16} />
              <span>LinkedIn</span>
            </a>
          )}
          {data.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
              <Code size={16} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Code size={20} /> Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-gray-700 mb-2">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sidx) => (
                    <span key={sidx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase size={20} /> Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                {exp.location && <p className="text-sm text-gray-600 mb-2">{exp.location}</p>}
                <ul className="space-y-1">
                  {exp.description.map((desc, didx) => (
                    <li key={didx} className="text-gray-700 text-sm flex gap-2">
                      <span className="text-blue-500">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap size={20} /> Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className="pb-4 border-b last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500">{edu.period}</span>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Code size={20} /> Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.projects.map((project, idx) => (
              <div key={idx} className="border border-gray-300 p-4 rounded-lg hover:shadow-md transition">
                <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, tidx) => (
                      <span key={tidx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                    View Project <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {data.interests && data.interests.length > 0 && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Lightbulb size={20} /> Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest, idx) => (
              <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-lg">
        {!showSaveForm ? (
          <>
            <button
              onClick={() => setShowSaveForm(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Save Resume
            </button>
            {onCancel && (
              <button
                onClick={onCancel}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </>
        ) : (
          <div className="w-full flex gap-2">
            <input
              type="text"
              placeholder="e.g., Senior Developer, Software Engineer..."
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSave}
              disabled={!variantName.trim() || isSaving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setShowSaveForm(false);
                setVariantName("");
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
