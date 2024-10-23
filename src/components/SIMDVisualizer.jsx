"use client"

import React, { useState } from 'react';
import { Play, Pause, RotateCcw, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const SIMDVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [operation, setOperation] = useState('add');

  // Sample data
  const vectorA = [1, 2, 3, 4];
  const vectorB = [5, 6, 7, 8];

  const operations = {
    // Basic Operations
    add: {
      name: 'Addition',
      func: (a, b) => a.map((val, idx) => val + b[idx]),
      code: '_mm256_add_epi32',
      category: 'basic'
    },
    multiply: {
      name: 'Multiplication',
      func: (a, b) => a.map((val, idx) => val * b[idx]),
      code: '_mm256_mul_epi32',
      category: 'basic'
    },
    min: {
      name: 'Minimum',
      func: (a, b) => a.map((val, idx) => Math.min(val, b[idx])),
      code: '_mm256_min_epi32',
      category: 'basic'
    },
    max: {
      name: 'Maximum',
      func: (a, b) => a.map((val, idx) => Math.max(val, b[idx])),
      code: '_mm256_max_epi32',
      category: 'basic'
    },
    // Bitwise Operations
    and: {
      name: 'Bitwise AND',
      func: (a, b) => a.map((val, idx) => val & b[idx]),
      code: '_mm256_and_si256',
      category: 'bitwise'
    },
    or: {
      name: 'Bitwise OR',
      func: (a, b) => a.map((val, idx) => val | b[idx]),
      code: '_mm256_or_si256',
      category: 'bitwise'
    },
    xor: {
      name: 'Bitwise XOR',
      func: (a, b) => a.map((val, idx) => val ^ b[idx]),
      code: '_mm256_xor_si256',
      category: 'bitwise'
    },
    // Advanced Operations
    shuffle: {
      name: 'Shuffle',
      func: (a) => [a[2], a[3], a[0], a[1]],
      code: '_mm256_shuffle_epi32',
      category: 'advanced'
    },
    blend: {
      name: 'Blend',
      func: (a, b) => [a[0], b[1], a[2], b[3]],
      code: '_mm256_blend_epi32',
      category: 'advanced'
    },
    shift_right: {
      name: 'Shift Right',
      func: (a) => [0, ...a.slice(0, -1)],
      code: '_mm256_srli_epi32',
      category: 'advanced'
    },
    shift_left: {
      name: 'Shift Left',
      func: (a) => [...a.slice(1), 0],
      code: '_mm256_slli_epi32',
      category: 'advanced'
    },
    permute: {
      name: 'Permute',
      func: (a) => [a[3], a[2], a[1], a[0]],
      code: '_mm256_permute4x64_epi64',
      category: 'advanced'
    }
  };

  const getResult = () => {
    const op = operations[operation];
    if (['shuffle', 'shift_right', 'shift_left', 'permute'].includes(operation)) {
      return op.func(vectorA);
    }
    return op.func(vectorA, vectorB);
  };

  const AnimatedNumber = ({ value, highlight, binary }) => (
    <div className="space-y-1">
      <div className={`w-14 h-10 flex items-center justify-center border rounded-lg
        ${highlight ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200'} 
        transition-all duration-300`}>
        {value}
      </div>
      {binary && (
        <div className="text-xs text-center font-mono text-gray-400">
          {value.toString(2).padStart(8, '0')}
        </div>
      )}
    </div>
  );

  const CustomButton = ({ children, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg transition-colors duration-200 w-28 text-sm
        ${isActive 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-100">Advanced SIMD Operations Visualizer</h2>
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-4 p-4">
          {/* Left Column - Operations */}
          <div className="col-span-3 space-y-4">
            <div className="space-y-3">
              <div className="font-semibold text-gray-300 text-sm">Basic Operations</div>
              <div className="flex flex-col gap-2">
                {Object.entries(operations)
                  .filter(([_, op]) => op.category === 'basic')
                  .map(([key, op]) => (
                    <CustomButton
                      key={key}
                      isActive={operation === key}
                      onClick={() => setOperation(key)}
                    >
                      {op.name}
                    </CustomButton>
                  ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-gray-300 text-sm">Bitwise Operations</div>
              <div className="flex flex-col gap-2">
                {Object.entries(operations)
                  .filter(([_, op]) => op.category === 'bitwise')
                  .map(([key, op]) => (
                    <CustomButton
                      key={key}
                      isActive={operation === key}
                      onClick={() => setOperation(key)}
                    >
                      {op.name}
                    </CustomButton>
                  ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-gray-300 text-sm">Advanced Operations</div>
              <div className="flex flex-col gap-2">
                {Object.entries(operations)
                  .filter(([_, op]) => op.category === 'advanced')
                  .map(([key, op]) => (
                    <CustomButton
                      key={key}
                      isActive={operation === key}
                      onClick={() => setOperation(key)}
                    >
                      {op.name}
                    </CustomButton>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visualization and Code */}
          <div className="col-span-9 space-y-4">
            {/* Visualization Area */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left side - Visualization */}
              <div className="space-y-4 bg-gray-900 p-4 rounded-lg">
                {/* Vector A */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-300">Vector A</div>
                  <div className="flex gap-2">
                    {vectorA.map((num, idx) => (
                      <AnimatedNumber 
                        key={`a-${idx}`}
                        value={num}
                        highlight={currentStep === idx}
                        binary={['and', 'or', 'xor'].includes(operation)}
                      />
                    ))}
                  </div>
                </div>

                {/* Operation Symbol */}
                <div className="flex justify-center text-lg font-bold text-gray-300">
                  {operations[operation].name}
                </div>

                {/* Vector B */}
                {!['shuffle', 'shift_right', 'shift_left', 'permute'].includes(operation) && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-300">Vector B</div>
                    <div className="flex gap-2">
                      {vectorB.map((num, idx) => (
                        <AnimatedNumber 
                          key={`b-${idx}`}
                          value={num}
                          highlight={currentStep === idx}
                          binary={['and', 'or', 'xor'].includes(operation)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Result */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-300">Result</div>
                  <div className="flex gap-2">
                    {getResult().map((num, idx) => (
                      <AnimatedNumber 
                        key={`result-${idx}`}
                        value={num}
                        highlight={currentStep === idx}
                        binary={['and', 'or', 'xor'].includes(operation)}
                      />
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-2 justify-center mt-4">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      if (!isPlaying) {
                        const interval = setInterval(() => {
                          setCurrentStep(prev => {
                            if (prev >= 3) {
                              clearInterval(interval);
                              setIsPlaying(false);
                              return 0;
                            }
                            return prev + 1;
                          });
                        }, 1000);
                      }
                    }}
                    className="flex items-center px-3 py-1.5 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 text-sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(0);
                      setIsPlaying(false);
                    }}
                    className="flex items-center px-3 py-1.5 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 text-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Right side - Code and Description */}
              <div className="space-y-4">
                {/* C++ Code Example */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="font-semibold mb-2 text-gray-300 text-sm">C++ SIMD Code:</div>
                  <pre className="text-xs bg-gray-800 p-3 rounded border border-gray-700 text-gray-200 overflow-x-auto">
                    {`#include <immintrin.h>

// Load vectors
__m256i a = _mm256_set_epi32(${vectorA.join(', ')});
${!['shuffle', 'shift_right', 'shift_left', 'permute'].includes(operation) 
  ? `__m256i b = _mm256_set_epi32(${vectorB.join(', ')});\n` 
  : ''}
// Perform ${operations[operation].name} operation
__m256i result = ${operations[operation].code}(${
  ['shuffle', 'shift_right', 'shift_left', 'permute'].includes(operation) 
    ? 'a, 0b00011011' 
    : 'a, b'});`}
                  </pre>
                </div>

                {/* Operation Description */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="font-semibold mb-2 text-gray-300 text-sm">Operation Description:</div>
                  <div className="text-sm text-gray-400">
                    {operation === 'shuffle' && 'Rearranges elements within the vector based on an immediate control value.'}
                    {operation === 'blend' && 'Selectively combines elements from two vectors based on a mask.'}
                    {operation === 'shift_right' && 'Shifts all elements right, filling with zeros.'}
                    {operation === 'shift_left' && 'Shifts all elements left, filling with zeros.'}
                    {operation === 'permute' && 'Reorders elements across the entire vector.'}
                    {['and', 'or', 'xor'].includes(operation) && 'Performs bitwise operation on each pair of elements.'}
                    {['add', 'multiply', 'min', 'max'].includes(operation) && `Performs ${operations[operation].name.toLowerCase()} on each pair of elements.`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIMDVisualizer;