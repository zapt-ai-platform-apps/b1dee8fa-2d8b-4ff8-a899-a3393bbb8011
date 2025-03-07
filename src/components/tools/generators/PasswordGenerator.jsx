import React, { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);
  
  // Generate password when component mounts or when settings change
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  
  // Calculate password strength
  useEffect(() => {
    let score = 0;
    
    // Length factor
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    
    // Character variety factor
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;
    
    setStrength(Math.min(5, score));
  }, [password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  
  const generatePassword = () => {
    // Check if at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setPassword('Please select at least one character type');
      return;
    }
    
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+{}[]|:;"<>,.?/~`';
    
    let characters = '';
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    
    let generatedPassword = '';
    const charactersLength = characters.length;
    
    // Ensure password contains at least one of each selected character type
    const requiredCharacters = [];
    if (includeUppercase) requiredCharacters.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    if (includeLowercase) requiredCharacters.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    if (includeNumbers) requiredCharacters.push(numbers[Math.floor(Math.random() * numbers.length)]);
    if (includeSymbols) requiredCharacters.push(symbols[Math.floor(Math.random() * symbols.length)]);
    
    // Add required characters
    for (let i = 0; i < requiredCharacters.length; i++) {
      generatedPassword += requiredCharacters[i];
    }
    
    // Fill the rest with random characters
    for (let i = generatedPassword.length; i < length; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    // Shuffle the password
    generatedPassword = generatedPassword
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    
    setPassword(generatedPassword);
    setCopied(false);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const getStrengthLabel = () => {
    if (strength <= 1) return 'Very Weak';
    if (strength === 2) return 'Weak';
    if (strength === 3) return 'Medium';
    if (strength === 4) return 'Strong';
    return 'Very Strong';
  };
  
  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-green-500';
    return 'bg-emerald-500';
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={password}
            readOnly
            className="input pr-20 font-mono text-lg"
            onClick={copyToClipboard}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={generatePassword}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              aria-label="Generate new password"
            >
              <FiRefreshCw size={18} />
            </button>
            <button
              onClick={copyToClipboard}
              className={`p-2 rounded ${
                copied ? 'text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              } cursor-pointer`}
              aria-label="Copy password"
            >
              <FiCopy size={18} />
            </button>
          </div>
        </div>
        {copied && (
          <div className="mt-2 text-sm text-green-500">
            Copied to clipboard!
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="flex justify-between mb-1">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password Length: {length}
            </span>
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8</span>
            <span>20</span>
            <span>32</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col gap-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="rounded text-blue-500 focus:ring-blue-500 mr-2"
              />
              <span>Include Uppercase (A-Z)</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                className="rounded text-blue-500 focus:ring-blue-500 mr-2"
              />
              <span>Include Lowercase (a-z)</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="rounded text-blue-500 focus:ring-blue-500 mr-2"
              />
              <span>Include Numbers (0-9)</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="rounded text-blue-500 focus:ring-blue-500 mr-2"
              />
              <span>Include Symbols (!@#$%^&*)</span>
            </label>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password Strength: {getStrengthLabel()}
          </p>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded overflow-hidden">
            <div 
              className={`h-full ${getStrengthColor()}`} 
              style={{ width: `${(strength / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Password Tips</h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
          <li>Use at least 12 characters for better security</li>
          <li>Mix uppercase, lowercase, numbers, and symbols</li>
          <li>Avoid using personal information in your passwords</li>
          <li>Use a different password for each account</li>
          <li>Consider using a password manager to store your passwords securely</li>
        </ul>
      </div>
    </div>
  );
}