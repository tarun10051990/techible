"use client";

import { useState, useRef, useEffect } from "react";

const SKILL_SUGGESTIONS = [
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "MATLAB", "Dart", "Perl", "Shell Scripting", "SQL", "HTML", "CSS",
  // Frontend
  "React", "Next.js", "Angular", "Vue.js", "Svelte", "jQuery", "Redux", "Tailwind CSS", "Bootstrap", "Material UI", "Sass/SCSS", "Webpack", "Vite", "Responsive Design", "Web Accessibility",
  // Backend
  "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", "Ruby on Rails", "Laravel", "FastAPI", "NestJS", "GraphQL", "REST API", "Microservices",
  // Database
  "MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "Oracle", "Firebase", "DynamoDB", "Elasticsearch", "Cassandra", "Neo4j",
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD", "GitHub Actions", "Linux", "Nginx", "Apache",
  // Mobile
  "React Native", "Flutter", "iOS Development", "Android Development", "Xamarin", "SwiftUI", "Jetpack Compose",
  // Data & AI
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Natural Language Processing", "Computer Vision", "Data Analysis", "Pandas", "NumPy", "Scikit-learn", "Data Visualization", "Tableau", "Power BI", "Apache Spark", "Big Data",
  // Design
  "Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Sketch", "UI/UX Design", "Prototyping", "Wireframing", "User Research", "Design Systems",
  // Project & Business
  "Agile", "Scrum", "Jira", "Project Management", "Product Management", "Business Analysis", "Strategic Planning", "Team Leadership", "Stakeholder Management",
  // Soft Skills
  "Communication", "Problem Solving", "Critical Thinking", "Teamwork", "Leadership", "Time Management", "Adaptability", "Creativity", "Analytical Thinking", "Presentation Skills",
  // Marketing
  "SEO", "SEM", "Google Analytics", "Content Marketing", "Social Media Marketing", "Email Marketing", "Digital Marketing", "Copywriting", "Brand Strategy",
  // Finance
  "Financial Analysis", "Accounting", "Excel", "Financial Modeling", "Budgeting", "Forecasting", "Risk Management",
  // Other Technical
  "Git", "GitHub", "Blockchain", "IoT", "Cybersecurity", "Network Security", "System Design", "API Development", "Testing/QA", "Selenium", "Jest", "Cypress",
];

interface SkillsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SkillsInput({ value, onChange }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const skills = value ? value.split(",").map(s => s.trim()).filter(Boolean) : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInputChange(val: string) {
    setInputValue(val);
    setSelectedIndex(-1);
    if (val.trim().length > 0) {
      const filtered = SKILL_SUGGESTIONS.filter(
        s => s.toLowerCase().includes(val.toLowerCase()) && !skills.includes(s)
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      // Show popular suggestions when focused with empty input
      const popular = SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 8);
      setSuggestions(popular);
      setShowSuggestions(true);
    }
  }

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const newSkills = [...skills, trimmed];
      onChange(newSkills.join(", "));
    }
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  function removeSkill(index: number) {
    const newSkills = skills.filter((_, i) => i !== index);
    onChange(newSkills.join(", "));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        addSkill(suggestions[selectedIndex]);
      } else if (inputValue.trim()) {
        addSkill(inputValue);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      removeSkill(skills.length - 1);
    }
  }

  return (
    <div className="relative">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        Skills
        <span className="text-xs font-normal text-gray-400">(type to search or add custom)</span>
      </label>

      {/* Skills Tags */}
      <div className="mt-1 flex flex-wrap gap-2 p-3 border rounded-lg bg-white min-h-[48px] focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-[#1a73e8]">
        {skills.map((skill, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-blue-50 text-[#1a73e8] pl-3 pr-1.5 py-1 rounded-full text-sm font-medium">
            {skill}
            <button onClick={() => removeSkill(i)} className="w-4 h-4 rounded-full hover:bg-blue-200 flex items-center justify-center text-blue-400 hover:text-blue-700">
              <i className="fa-solid fa-xmark text-[10px]"></i>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          onFocus={() => handleInputChange(inputValue)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] outline-none text-sm placeholder:text-gray-400 py-1"
          placeholder={skills.length === 0 ? "Start typing to add skills..." : "Add more..."}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-[240px] overflow-y-auto">
          <div className="px-3 py-2 bg-gray-50 border-b">
            <span className="text-xs text-gray-500 font-medium">
              <i className="fa-solid fa-lightbulb text-yellow-500 mr-1"></i>
              {inputValue ? "Suggestions" : "Popular Skills"}
            </span>
          </div>
          {suggestions.map((suggestion, i) => (
            <button
              key={suggestion}
              onClick={() => addSkill(suggestion)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition ${
                i === selectedIndex ? "bg-blue-50 text-[#1a73e8]" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <i className={`fa-solid fa-plus text-[10px] ${i === selectedIndex ? "text-[#1a73e8]" : "text-gray-300"}`}></i>
                {suggestion}
              </span>
              {i === selectedIndex && <span className="text-xs text-blue-400">Enter</span>}
            </button>
          ))}
        </div>
      )}

      {/* Skill count */}
      {skills.length > 0 && (
        <div className="mt-1.5 text-xs text-gray-400">
          {skills.length} skill{skills.length !== 1 ? "s" : ""} added
        </div>
      )}
    </div>
  );
}
