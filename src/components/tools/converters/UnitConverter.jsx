import React, { useState, useEffect } from 'react';

// Conversion factors for different units
const unitData = {
  length: {
    name: 'Length',
    units: {
      meters: { name: 'Meters', factor: 1 },
      kilometers: { name: 'Kilometers', factor: 0.001 },
      centimeters: { name: 'Centimeters', factor: 100 },
      millimeters: { name: 'Millimeters', factor: 1000 },
      inches: { name: 'Inches', factor: 39.3701 },
      feet: { name: 'Feet', factor: 3.28084 },
      yards: { name: 'Yards', factor: 1.09361 },
      miles: { name: 'Miles', factor: 0.000621371 }
    }
  },
  weight: {
    name: 'Weight',
    units: {
      kilograms: { name: 'Kilograms', factor: 1 },
      grams: { name: 'Grams', factor: 1000 },
      milligrams: { name: 'Milligrams', factor: 1000000 },
      pounds: { name: 'Pounds', factor: 2.20462 },
      ounces: { name: 'Ounces', factor: 35.274 },
      stones: { name: 'Stones', factor: 0.157473 }
    }
  },
  temperature: {
    name: 'Temperature',
    units: {
      celsius: { name: 'Celsius' },
      fahrenheit: { name: 'Fahrenheit' },
      kelvin: { name: 'Kelvin' }
    }
  },
  volume: {
    name: 'Volume',
    units: {
      liters: { name: 'Liters', factor: 1 },
      milliliters: { name: 'Milliliters', factor: 1000 },
      cubicMeters: { name: 'Cubic Meters', factor: 0.001 },
      gallons: { name: 'Gallons (US)', factor: 0.264172 },
      quarts: { name: 'Quarts (US)', factor: 1.05669 },
      pints: { name: 'Pints (US)', factor: 2.11338 },
      cups: { name: 'Cups (US)', factor: 4.22675 },
      fluidOunces: { name: 'Fluid Ounces (US)', factor: 33.814 }
    }
  },
  area: {
    name: 'Area',
    units: {
      squareMeters: { name: 'Square Meters', factor: 1 },
      squareKilometers: { name: 'Square Kilometers', factor: 0.000001 },
      squareCentimeters: { name: 'Square Centimeters', factor: 10000 },
      squareFeet: { name: 'Square Feet', factor: 10.7639 },
      squareInches: { name: 'Square Inches', factor: 1550 },
      acres: { name: 'Acres', factor: 0.000247105 },
      hectares: { name: 'Hectares', factor: 0.0001 }
    }
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [convertDirection, setConvertDirection] = useState('from');
  
  // Set default units when category changes
  useEffect(() => {
    const availableUnits = Object.keys(unitData[category].units);
    setFromUnit(availableUnits[0]);
    setToUnit(availableUnits[1]);
    setFromValue('');
    setToValue('');
  }, [category]);
  
  // Convert values when inputs change
  useEffect(() => {
    if (fromUnit === '' || toUnit === '') return;
    
    if (convertDirection === 'from' && fromValue !== '') {
      const result = convert(parseFloat(fromValue), fromUnit, toUnit);
      setToValue(result !== null ? result.toString() : '');
    } else if (convertDirection === 'to' && toValue !== '') {
      const result = convert(parseFloat(toValue), toUnit, fromUnit);
      setFromValue(result !== null ? result.toString() : '');
    }
  }, [fromValue, toValue, fromUnit, toUnit, convertDirection]);
  
  const convert = (value, from, to) => {
    if (isNaN(value)) return null;
    
    // Handle temperature conversion separately
    if (category === 'temperature') {
      return convertTemperature(value, from, to);
    }
    
    // For other conversions, use the factor method
    const fromFactor = unitData[category].units[from].factor;
    const toFactor = unitData[category].units[to].factor;
    
    // Convert to base unit, then to target unit
    const baseValue = value / fromFactor;
    const result = baseValue * toFactor;
    
    return parseFloat(result.toFixed(6));
  };
  
  const convertTemperature = (value, from, to) => {
    let result;
    
    // Convert to Celsius first
    let celsius;
    if (from === 'celsius') {
      celsius = value;
    } else if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target unit
    if (to === 'celsius') {
      result = celsius;
    } else if (to === 'fahrenheit') {
      result = celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      result = celsius + 273.15;
    }
    
    return parseFloat(result.toFixed(2));
  };
  
  const handleFromValueChange = (e) => {
    setConvertDirection('from');
    setFromValue(e.target.value);
  };
  
  const handleToValueChange = (e) => {
    setConvertDirection('to');
    setToValue(e.target.value);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          {Object.keys(unitData).map(key => (
            <option key={key} value={key}>
              {unitData[key].name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            From
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={fromValue}
              onChange={handleFromValueChange}
              placeholder="Enter value"
              className="input flex-1"
            />
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                setConvertDirection('from');
              }}
              className="input w-1/2"
            >
              {fromUnit && Object.keys(unitData[category].units).map(key => (
                <option key={key} value={key}>
                  {unitData[category].units[key].name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="relative flex justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <button
            onClick={() => {
              const temp = fromUnit;
              setFromUnit(toUnit);
              setToUnit(temp);
              setConvertDirection('from');
            }}
            className="relative inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          >
            Swap
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            To
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={toValue}
              onChange={handleToValueChange}
              placeholder="Result"
              className="input flex-1"
            />
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                setConvertDirection('from');
              }}
              className="input w-1/2"
            >
              {toUnit && Object.keys(unitData[category].units).map(key => (
                <option key={key} value={key}>
                  {unitData[category].units[key].name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {fromValue && toValue && (
          <div className="text-center mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {`${fromValue} ${unitData[category].units[fromUnit].name} = ${toValue} ${unitData[category].units[toUnit].name}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}