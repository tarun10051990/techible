"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati",
  "Kannada", "Malayalam", "Odia", "Punjabi", "Assamese", "Maithili", "Sanskrit",
  "Sindhi", "Konkani", "Nepali", "Manipuri", "Kashmiri", "Dogri", "Bodo", "Santali",
  "Spanish", "French", "German", "Italian", "Portuguese", "Dutch", "Russian",
  "Chinese (Mandarin)", "Chinese (Cantonese)", "Japanese", "Korean",
  "Arabic", "Turkish", "Persian (Farsi)", "Hebrew", "Thai", "Vietnamese",
  "Indonesian", "Malay", "Filipino (Tagalog)", "Swahili",
  "Polish", "Czech", "Romanian", "Hungarian", "Greek", "Swedish", "Norwegian",
  "Danish", "Finnish", "Ukrainian", "Serbian", "Croatian",
  "Afrikaans", "Zulu", "Amharic", "Somali",
  "Latin", "Sign Language (ASL)", "Sign Language (BSL)", "Sign Language (ISL)",
];

interface LanguageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageInput({ value, onChange }: LanguageInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const languages = value ? value.split(",").map(s => s.trim()).filter(Boolean) : [];

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
      const filtered = LANGUAGES.filter(
        l => l.toLowerCase().includes(val.toLowerCase()) && !languages.includes(l)
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      const popular = LANGUAGES.filter(l => !languages.includes(l)).slice(0, 6);
      setSuggestions(popular);
      setShowSuggestions(true);
    }
  }

  function addLanguage(lang: string) {
    const trimmed = lang.trim();
    if (trimmed && !languages.includes(trimmed)) {
      const newLangs = [...languages, trimmed];
      onChange(newLangs.join(", "));
    }
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  function removeLanguage(index: number) {
    const newLangs = languages.filter((_, i) => i !== index);
    onChange(newLangs.join(", "));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        addLanguage(suggestions[selectedIndex]);
      } else if (inputValue.trim()) {
        addLanguage(inputValue);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (e.key === "Backspace" && !inputValue && languages.length > 0) {
      removeLanguage(languages.length - 1);
    }
  }

  return (
    <div className="relative">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        Languages
        <span className="text-xs font-normal text-gray-400">(type to search)</span>
      </label>
      <div className="mt-1 flex flex-wrap gap-2 p-3 border rounded-lg bg-white min-h-[48px] focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-[#1a73e8]">
        {languages.map((lang, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-green-50 text-green-700 pl-3 pr-1.5 py-1 rounded-full text-sm font-medium">
            {lang}
            <button onClick={() => removeLanguage(i)} className="w-4 h-4 rounded-full hover:bg-green-200 flex items-center justify-center text-green-400 hover:text-green-700">
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
          placeholder={languages.length === 0 ? "Start typing to add languages..." : "Add more..."}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-[200px] overflow-y-auto">
          <div className="px-3 py-2 bg-gray-50 border-b">
            <span className="text-xs text-gray-500 font-medium">
              <i className="fa-solid fa-globe text-green-500 mr-1"></i>
              {inputValue ? "Suggestions" : "Common Languages"}
            </span>
          </div>
          {suggestions.map((s, i) => (
            <button
              key={s}
              onClick={() => addLanguage(s)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition ${
                i === selectedIndex ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <i className={`fa-solid fa-plus text-[10px] ${i === selectedIndex ? "text-green-600" : "text-gray-300"}`}></i>
                {s}
              </span>
              {i === selectedIndex && <span className="text-xs text-green-500">Enter</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
