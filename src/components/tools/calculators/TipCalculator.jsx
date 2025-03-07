import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiPercent, FiUsers } from 'react-icons/fi';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTipPercentage, setCustomTipPercentage] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [perPersonAmount, setPerPersonAmount] = useState(0);
  const [useCustomTip, setUseCustomTip] = useState(false);
  
  // Common tip percentages
  const tipOptions = [10, 15, 18, 20, 25];
  
  // Calculate tip and total when inputs change
  useEffect(() => {
    if (billAmount === '' || parseFloat(billAmount) === 0) {
      setTipAmount(0);
      setTotalAmount(0);
      setPerPersonAmount(0);
      return;
    }
    
    const bill = parseFloat(billAmount);
    const tip = useCustomTip 
      ? (customTipPercentage === '' ? 0 : parseFloat(customTipPercentage)) 
      : tipPercentage;
    
    const calculatedTip = (bill * tip) / 100;
    const total = bill + calculatedTip;
    const perPerson = total / (numPeople || 1);
    
    setTipAmount(calculatedTip);
    setTotalAmount(total);
    setPerPersonAmount(perPerson);
  }, [billAmount, tipPercentage, customTipPercentage, numPeople, useCustomTip]);
  
  const handleTipSelection = (percentage) => {
    setUseCustomTip(false);
    setTipPercentage(percentage);
  };
  
  const handleBillChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBillAmount(value);
    }
  };
  
  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTipPercentage(value);
      setUseCustomTip(true);
    }
  };
  
  const handleNumPeopleChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setNumPeople(value === '' ? 1 : parseInt(value));
    }
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label htmlFor="bill-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bill Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-500" />
            </div>
            <input
              id="bill-amount"
              type="text"
              value={billAmount}
              onChange={handleBillChange}
              placeholder="0.00"
              className="input pl-8"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tip Percentage
          </label>
          <div className="grid grid-cols-5 gap-2 mb-2">
            {tipOptions.map(percentage => (
              <button
                key={percentage}
                onClick={() => handleTipSelection(percentage)}
                className={`py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !useCustomTip && tipPercentage === percentage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500'
                }`}
              >
                {percentage}%
              </button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPercent className="text-gray-500" />
            </div>
            <input
              type="text"
              value={customTipPercentage}
              onChange={handleCustomTipChange}
              placeholder="Custom tip %"
              className={`input pl-8 ${useCustomTip ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="num-people" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of People
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUsers className="text-gray-500" />
            </div>
            <input
              id="num-people"
              type="text"
              value={numPeople}
              onChange={handleNumPeopleChange}
              className="input pl-8"
              min="1"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm opacity-80">Tip Amount</div>
            <div className="text-2xl font-bold">{formatCurrency(tipAmount)}</div>
          </div>
          
          <div className="text-right">
            <div className="text-sm opacity-80">Total Amount</div>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
          </div>
        </div>
        
        {numPeople > 1 && (
          <div className="pt-4 border-t border-blue-500">
            <div className="text-sm opacity-80">Per Person</div>
            <div className="text-2xl font-bold">{formatCurrency(perPersonAmount)}</div>
          </div>
        )}
      </div>
    </div>
  );
}