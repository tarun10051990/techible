"use client";

import { useState, useRef, useEffect } from "react";

const UNIVERSITIES = [
  // India - Top IITs
  "Indian Institute of Technology Bombay (IIT Bombay)",
  "Indian Institute of Technology Delhi (IIT Delhi)",
  "Indian Institute of Technology Madras (IIT Madras)",
  "Indian Institute of Technology Kanpur (IIT Kanpur)",
  "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
  "Indian Institute of Technology Roorkee (IIT Roorkee)",
  "Indian Institute of Technology Guwahati (IIT Guwahati)",
  "Indian Institute of Technology Hyderabad (IIT Hyderabad)",
  // India - NITs
  "National Institute of Technology Trichy (NIT Trichy)",
  "National Institute of Technology Warangal (NIT Warangal)",
  "National Institute of Technology Surathkal (NIT Karnataka)",
  "National Institute of Technology Calicut (NIT Calicut)",
  "National Institute of Technology Rourkela (NIT Rourkela)",
  // India - IIITs
  "IIIT Hyderabad",
  "IIIT Allahabad",
  "IIIT Delhi",
  "IIIT Bangalore",
  // India - Top Universities
  "University of Delhi",
  "Jawaharlal Nehru University (JNU)",
  "Banaras Hindu University (BHU)",
  "University of Mumbai",
  "University of Calcutta",
  "Anna University",
  "University of Madras",
  "Osmania University",
  "Savitribai Phule Pune University",
  "Jadavpur University",
  "Aligarh Muslim University",
  "University of Hyderabad",
  "Jamia Millia Islamia",
  // India - Private Universities
  "Birla Institute of Technology and Science (BITS Pilani)",
  "Vellore Institute of Technology (VIT)",
  "SRM Institute of Science and Technology",
  "Manipal Academy of Higher Education",
  "Amity University",
  "Lovely Professional University (LPU)",
  "Christ University, Bangalore",
  "Symbiosis International University",
  "Ashoka University",
  "Shiv Nadar University",
  "FLAME University",
  "O.P. Jindal Global University",
  // India - Management
  "Indian Institute of Management Ahmedabad (IIM-A)",
  "Indian Institute of Management Bangalore (IIM-B)",
  "Indian Institute of Management Calcutta (IIM-C)",
  "Indian Institute of Management Lucknow (IIM-L)",
  "Indian School of Business (ISB)",
  "XLRI Jamshedpur",
  "Faculty of Management Studies (FMS), Delhi",
  "SP Jain Institute of Management",
  // India - Medical
  "All India Institute of Medical Sciences (AIIMS) Delhi",
  "Armed Forces Medical College (AFMC) Pune",
  "Christian Medical College (CMC) Vellore",
  "Kasturba Medical College, Manipal",
  // India - Engineering
  "College of Engineering Pune (COEP)",
  "PSG College of Technology",
  "Thapar Institute of Engineering and Technology",
  "Delhi Technological University (DTU)",
  "Netaji Subhas University of Technology (NSUT)",
  "IIIT Sri City",
  // USA
  "Massachusetts Institute of Technology (MIT)",
  "Stanford University",
  "Harvard University",
  "California Institute of Technology (Caltech)",
  "University of California, Berkeley",
  "University of California, Los Angeles (UCLA)",
  "Columbia University",
  "Yale University",
  "Princeton University",
  "University of Chicago",
  "University of Pennsylvania",
  "Cornell University",
  "Johns Hopkins University",
  "Duke University",
  "Northwestern University",
  "Carnegie Mellon University",
  "Georgia Institute of Technology",
  "University of Michigan",
  "University of Texas at Austin",
  "University of Illinois Urbana-Champaign",
  "New York University (NYU)",
  "University of Southern California",
  "University of Washington",
  "Purdue University",
  "Ohio State University",
  "Penn State University",
  "University of Wisconsin-Madison",
  "University of Florida",
  "Arizona State University",
  "Boston University",
  // UK
  "University of Oxford",
  "University of Cambridge",
  "Imperial College London",
  "University College London (UCL)",
  "London School of Economics (LSE)",
  "University of Edinburgh",
  "University of Manchester",
  "King's College London",
  "University of Bristol",
  "University of Warwick",
  "University of Glasgow",
  "University of Birmingham",
  "University of Leeds",
  "University of Sheffield",
  "University of Nottingham",
  // Canada
  "University of Toronto",
  "University of British Columbia",
  "McGill University",
  "University of Waterloo",
  "University of Alberta",
  "University of Montreal",
  // Australia
  "University of Melbourne",
  "University of Sydney",
  "Australian National University",
  "University of Queensland",
  "Monash University",
  "University of New South Wales (UNSW)",
  // Europe
  "ETH Zurich",
  "Technical University of Munich",
  "Sorbonne University",
  "University of Amsterdam",
  "KU Leuven",
  // Asia
  "National University of Singapore (NUS)",
  "Nanyang Technological University (NTU)",
  "University of Hong Kong",
  "Tsinghua University",
  "Peking University",
  "University of Tokyo",
  "Seoul National University",
  "KAIST",
  // Other
  "Open University",
  "IGNOU (Indira Gandhi National Open University)",
];

interface UniversityInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function UniversityInput({ value, onChange, placeholder }: UniversityInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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

  function handleChange(val: string) {
    onChange(val);
    setSelectedIndex(-1);
    if (val.trim().length >= 2) {
      const filtered = UNIVERSITIES.filter(u =>
        u.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }

  function selectSuggestion(s: string) {
    onChange(s);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (value.length >= 2) handleChange(value); }}
        className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100"
        placeholder={placeholder || "Start typing university name..."}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-[200px] overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={s}
              onClick={() => selectSuggestion(s)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition ${
                i === selectedIndex ? "bg-blue-50 text-[#1a73e8]" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <i className={`fa-solid fa-graduation-cap text-[10px] ${i === selectedIndex ? "text-[#1a73e8]" : "text-gray-300"}`}></i>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
