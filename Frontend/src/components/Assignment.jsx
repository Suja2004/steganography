import React, { useState, useEffect } from "react";
import { X, Award, CheckCircle, AlertCircle } from "lucide-react";
import Certificate from './Certificate';

export default function Assignment() {
    const originalQuestions = [
        {
            id: 1,
            question: "What is Steganography?",
            options: [
                "A method to encrypt data",
                "The science of hiding information",
                "Compressing image files",
                "A type of image filter",
            ],
            answer: "The science of hiding information",
        },
        {
            id: 2,
            question: "Which image channel is commonly used for LSB steganography?",
            options: ["Red", "Green", "Blue", "Alpha"],
            answer: "Red",
        },
        {
            id: 3,
            question: "What does LSB stand for?",
            options: [
                "Last Secure Bit",
                "Least Significant Bit",
                "Low Scale Binary",
                "Logical Stego Block",
            ],
            answer: "Least Significant Bit",
        },
        {
            id: 4,
            question: "Why is LSB steganography usually imperceptible to the human eye?",
            options: [
                "Because only the most significant bit is modified",
                "Because changes occur in the image metadata",
                "Because changing the least significant bit does not affect visual quality much",
                "Because the image resolution is reduced",
            ],
            answer:
                "Because changing the least significant bit does not affect visual quality much",
        },
        {
            id: 5,
            question: "What is one major limitation of LSB steganography?",
            options: [
                "It requires special hardware",
                "It cannot be implemented in Python",
                "It is vulnerable to image compression and editing",
                "It always makes the image blurry",
            ],
            answer: "It is vulnerable to image compression and editing",
        },
    ];

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const shuffledQuestions = shuffleArray(originalQuestions).map((q) => ({
            ...q,
            options: shuffleArray(q.options),
        }));
        setQuestions(shuffledQuestions);
    }, []);

    const handleOptionChange = (qId, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [qId]: option,
        });
    };

    const handleSubmit = () => {
        if (Object.keys(selectedAnswers).length !== originalQuestions.length) {
            setModalMessage("Please answer all questions before submitting.");
            setShowModal(true);
            return;
        }

        let newScore = 0;
        questions.forEach((q) => {
            if (selectedAnswers[q.id] === q.answer) {
                newScore++;
            }
        });
        setScore(newScore);
        setModalMessage(`Your Score: ${newScore} / ${questions.length}`);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const isScorePassing = score >= 3;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="select-none p-6 flex flex-col items-center max-w-4xl mx-auto">
                <div className="header bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    <h1 className="text-5xl font-bold mb-4 ">
                        Steganography Quiz                </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                        Test your knowledge of LSB steganography                </p>
                </div>

                <div className="w-full space-y-6">
                    {questions.map((q, index) => (
                        <div key={q.id} className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                            <h2 className="mb-4 font-semibold text-xl text-gray-100">
                                <span className="text-amber-400 font-bold">{index + 1}.</span> {q.question}
                            </h2>
                            <div className="grid gap-3">
                                {q.options.map((option, idx) => (
                                    <label
                                        key={idx}
                                        className="cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 px-4 py-3 rounded-lg transition-colors duration-200 flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${q.id}`}
                                            value={option}
                                            checked={selectedAnswers[q.id] === option}
                                            onChange={() => handleOptionChange(q.id, option)}
                                            className="w-4 h-4 text-amber-500 bg-gray-600 border-gray-500 focus:ring-amber-400 focus:ring-2 mr-3"
                                        />
                                        <span className="text-gray-200">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-8 py-3 rounded-xl font-medium text-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                    Submit Quiz
                </button>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-sm">
                        <div className={`${score !== null && isScorePassing ? 'max-w-fit' : 'max-w-sm'} bg-gray-800 border border-gray-600 text-white p-6 rounded-2xl shadow-2xl w-full mx-4`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    {score !== null ? (
                                        isScorePassing ? (
                                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                                        ) : (
                                            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                                        )
                                    ) : (
                                        <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                                    )}
                                    <p className={`text-lg font-medium ${score !== null ? (isScorePassing ? 'text-green-400' : 'text-red-400') : 'text-amber-400'
                                        }`}>
                                        {modalMessage}
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-700 hover:bg-gray-600 border border-gray-600 p-2 rounded-lg transition-colors duration-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {score !== null && isScorePassing && (
                                <div className="border-t border-gray-700 pt-4">
                                    <p className="text-green-400 mb-3 font-medium">Congratulations! You passed the quiz.</p>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Enter your name to generate a certificate:
                                    </label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                        placeholder="Your full name"
                                    />

                                    {userName && (
                                        <Certificate name={userName} score={score} />
                                    )}
                                </div>
                            )}

                            {score !== null && !isScorePassing && (
                                <div className="border-t border-gray-700 pt-4">
                                    <p className="text-red-400">You need at least 3 correct answers to pass. Try again!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}