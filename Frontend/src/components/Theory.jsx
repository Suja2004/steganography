import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Binary, Image, Lock, Unlock, ChevronDown, ChevronUp, Play, Pause } from 'lucide-react';

export default function Theory() {
    const [animationStep, setAnimationStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const originalPixel = [0b11010110, 0b10011001, 0b01110011];
    const modifiedPixel = [0b11010111, 0b10011001, 0b01110011];

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setAnimationStep(0);

        const steps = [0, 1, 2, 3, 4];
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            if (currentStep >= steps.length) {
                clearInterval(interval);
                setIsAnimating(false);
                return;
            }
            setAnimationStep(currentStep);
        }, 1500);
    };

    const generatePixelMatrix = (isModified = false) => {
        const matrix = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                const isHidden = isModified && (i === 2 && j === 3) || (i === 4 && j === 1) || (i === 1 && j === 6) || (i === 6 && j === 4);
                row.push({
                    value: Math.random() > 0.5 ? 1 : 0,
                    isHidden
                });
            }
            matrix.push(row);
        }
        return matrix;
    };

    const [originalMatrix] = useState(() => generatePixelMatrix(false));
    const [modifiedMatrix] = useState(() => generatePixelMatrix(true));

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="header bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    <h1 className="text-5xl font-black  mb-4">
                        LSB Steganography Theory
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6">
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore the fascinating world of digital steganography and learn how information can be hidden in plain sight
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <div className="flex items-center mb-6">
                            <Eye className="w-8 h-8 text-blue-400 mr-3" />
                            <h2 className="text-3xl font-bold text-blue-400">What is Steganography?</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-200 mb-6">
                            <span className="text-blue-400 font-bold text-xl">Steganography</span> is the art and science of
                            hiding information within other non-secret text or data. Unlike cryptography, which scrambles data
                            to make it unreadable, steganography hides the very existence of the message.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
                                <h3 className="text-cyan-400 font-semibold text-lg mb-3 flex items-center">
                                    <Lock className="w-5 h-5 mr-2" />
                                    Cryptography
                                </h3>
                                <p className="text-gray-300">Makes data unreadable but visible</p>
                                <p className="text-gray-400 text-sm mt-2">Example: "Hello" → "Mjqqt"</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
                                <h3 className="text-purple-400 font-semibold text-lg mb-3 flex items-center">
                                    <EyeOff className="w-5 h-5 mr-2" />
                                    Steganography
                                </h3>
                                <p className="text-gray-300">Hides the existence of data</p>
                                <p className="text-gray-400 text-sm mt-2">Example: Hidden in image pixels</p>
                            </div>
                        </div>
                    </div>

                    {/* LSB Technique */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <div className="flex items-center mb-6">
                            <Binary className="w-8 h-8 text-purple-400 mr-3" />
                            <h2 className="text-3xl font-bold text-purple-400">Least Significant Bit (LSB) Technique</h2>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-200 mb-6">
                            LSB steganography works by replacing the least significant bit of each pixel component
                            with bits from the secret message. Since the LSB contributes minimally to the overall
                            pixel value, changes are virtually imperceptible to the human eye.
                        </p>

                        {/* Interactive Binary Demo */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-200">Interactive Binary Demo</h3>
                                <button
                                    onClick={startAnimation}
                                    disabled={isAnimating}
                                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                                >
                                    {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    {isAnimating ? 'Animating...' : 'Start Demo'}
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-green-400 font-semibold">Original Pixel (RGB)</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <span className="text-red-400 w-12">Red:</span>
                                            <code className="bg-gray-700 px-2 py-1 rounded font-mono text-sm">
                                                {originalPixel[0].toString(2).padStart(8, '0')}
                                            </code>
                                            <span className="ml-2 text-gray-400">({originalPixel[0]})</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-green-400 w-12">Green:</span>
                                            <code className="bg-gray-700 px-2 py-1 rounded font-mono text-sm">
                                                {originalPixel[1].toString(2).padStart(8, '0')}
                                            </code>
                                            <span className="ml-2 text-gray-400">({originalPixel[1]})</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-blue-400 w-12">Blue:</span>
                                            <code className="bg-gray-700 px-2 py-1 rounded font-mono text-sm">
                                                {originalPixel[2].toString(2).padStart(8, '0')}
                                            </code>
                                            <span className="ml-2 text-gray-400">({originalPixel[2]})</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-yellow-400 font-semibold">After Hiding Bit '1'</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <span className="text-red-400 w-12">Red:</span>
                                            <code className="bg-gray-700 px-2 py-1 rounded font-mono text-sm">
                                                {modifiedPixel[0].toString(2).padStart(8, '0').slice(0, -1)}
                                                <span className={`${animationStep >= 2 ? 'bg-yellow-400 text-black' : ''} px-1 rounded`}>
                                                    {modifiedPixel[0].toString(2).padStart(8, '0').slice(-1)}
                                                </span>
                                            </code>
                                            <span className="ml-2 text-gray-400">({modifiedPixel[0]})</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-green-400 w-12">Green:</span>
                                            <code className="bg-gray-700 px-2 py-1 rounded font-mono text-sm">
                                                {modifiedPixel[1].toString(2).padStart(8, '0')}
                                            </code>
                                            <span className="ml-2 text-gray-400">({modifiedPixel[1]})</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-blue-400 w-12">Blue:</span>
                                            <code className="bg-gray-700 px-2 py-1 rounded font-mono text-sm">
                                                {modifiedPixel[2].toString(2).padStart(8, '0')}
                                            </code>
                                            <span className="ml-2 text-gray-400">({modifiedPixel[2]})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {animationStep >= 3 && (
                                <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                                    <p className="text-green-400 font-semibold">
                                        Visual Impact: The pixel changed from RGB(214, 153, 115) to RGB(215, 153, 115) -
                                        a difference of only 1 in the red channel, imperceptible to the human eye!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Visual Matrix Comparison */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <div className="flex items-center mb-6">
                            <Image className="w-8 h-8 text-cyan-400 mr-3" />
                            <h2 className="text-3xl font-bold text-cyan-400">Binary Matrix Visualization</h2>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-200 mb-6">
                            Here's how LSB modification appears in a binary matrix representation.
                            Each cell represents the LSB of a pixel's red channel.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-green-400 font-semibold text-lg mb-4">Original Matrix</h3>
                                <div className="grid grid-cols-8 gap-1 p-4 bg-gray-800 rounded-lg">
                                    {originalMatrix.map((row, i) =>
                                        row.map((cell, j) => (
                                            <div
                                                key={`orig-${i}-${j}`}
                                                className="w-8 h-8 flex items-center justify-center rounded border border-gray-600 bg-gray-700 text-xs font-mono"
                                            >
                                                {cell.value}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-yellow-400 font-semibold text-lg mb-4">After Steganography</h3>
                                <div className="grid grid-cols-8 gap-1 p-4 bg-gray-800 rounded-lg">
                                    {modifiedMatrix.map((row, i) =>
                                        row.map((cell, j) => (
                                            <div
                                                key={`mod-${i}-${j}`}
                                                className={`w-8 h-8 flex items-center justify-center rounded border text-xs font-mono transition-all duration-300 ${cell.isHidden
                                                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400 animate-pulse'
                                                    : 'border-gray-600 bg-gray-700'
                                                    }`}
                                            >
                                                {cell.value}
                                            </div>
                                        ))
                                    )}
                                </div>
                                <p className="text-sm text-yellow-400 mt-2">
                                    Highlighted cells show where secret data is hidden
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Process */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <h2 className="text-3xl font-bold text-indigo-400 mb-6">The Steganography Process</h2>

                        <div className="space-y-6">
                            {[
                                {
                                    step: 1,
                                    title: "Message Preparation",
                                    description: "Convert the secret message into binary format",
                                    example: "'Hi' → 01001000 01101001",
                                    color: "red"
                                },
                                {
                                    step: 2,
                                    title: "Image Loading",
                                    description: "Load the cover image and access pixel data",
                                    example: "Extract RGB values for each pixel",
                                    color: "green"
                                },
                                {
                                    step: 3,
                                    title: "LSB Replacement",
                                    description: "Replace LSBs of selected channel with message bits",
                                    example: "Red channel LSB: 0 → 1 (from message)",
                                    color: "purple"
                                },
                                {
                                    step: 4,
                                    title: "Image Reconstruction",
                                    description: "Reconstruct the image with hidden data",
                                    example: "Save as new image file",
                                    color: "blue"
                                }
                            ].map(({ step, title, description, example, color }) => (
                                <div key={step} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl border border-gray-600">
                                    <div className={`w-10 h-10 rounded-full bg-${color}-600 flex items-center justify-center text-white font-bold flex-shrink-0`}>
                                        {step}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-xl font-semibold text-${color}-400 mb-2`}>{title}</h3>
                                        <p className="text-gray-300 mb-2">{description}</p>
                                        <code className="text-sm bg-gray-700 px-2 py-1 rounded text-gray-200">{example}</code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advantages vs Limitations */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-green-900/30 to-gray-900 rounded-2xl p-8 border border-green-700/50 shadow-2xl">
                            <div className="flex items-center mb-6">
                                <Unlock className="w-8 h-8 text-green-400 mr-3" />
                                <h2 className="text-3xl font-bold text-green-400">Advantages</h2>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Simple implementation and fast processing",
                                    "Minimal visual distortion to cover image",
                                    "Large capacity relative to image size",
                                    "Compatible with common image formats",
                                    "Difficult to detect without prior knowledge"
                                ].map((advantage, index) => (
                                    <li key={index} className="flex items-start text-gray-200">
                                        <span className="text-green-400 mr-3 text-lg">✓</span>
                                        <span>{advantage}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-red-900/30 to-gray-900 rounded-2xl p-8 border border-red-700/50 shadow-2xl">
                            <div className="flex items-center mb-6">
                                <Lock className="w-8 h-8 text-red-400 mr-3" />
                                <h2 className="text-3xl font-bold text-red-400">Limitations</h2>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Vulnerable to lossy compression (JPEG)",
                                    "Destroyed by image editing operations",
                                    "Detectable by statistical analysis",
                                    "Limited robustness against attacks",
                                    "Requires original image for comparison"
                                ].map((limitation, index) => (
                                    <li key={index} className="flex items-start text-gray-200">
                                        <span className="text-red-400 mr-3 text-lg">✗</span>
                                        <span>{limitation}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Applications and Use Cases */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <h2 className="text-3xl font-bold text-orange-400 mb-6">Real-World Applications</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Digital Watermarking",
                                    description: "Protect intellectual property by embedding copyright information",
                                    icon: "🏷️"
                                },
                                {
                                    title: "Secure Communication",
                                    description: "Send confidential messages through public channels",
                                    icon: "📨"
                                },
                                {
                                    title: "Data Integrity",
                                    description: "Verify image authenticity and detect tampering",
                                    icon: "🔒"
                                }
                            ].map(({ title, description, icon }) => (
                                <div key={title} className="bg-gray-800 p-6 rounded-xl border border-gray-600 text-center">
                                    <div className="text-4xl mb-4">{icon}</div>
                                    <h3 className="text-xl font-semibold text-orange-400 mb-3">{title}</h3>
                                    <p className="text-gray-300 text-sm">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}