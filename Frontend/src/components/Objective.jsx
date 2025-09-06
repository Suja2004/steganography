export default function Objective() {
    const objectives = [
        "To understand the concept of LSB-based image steganography.",
        "To encode a text message into an image without visually altering it.",
        "To extract and decode the hidden message from the stego-image.",
        "To visualize and analyze changes in the LSB matrices before and after encoding."
    ];

    return (
        <div className="page-center">
            <div className="text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <h1 className="text-5xl font-bold mb-4">
                    Objectives
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="text-lg leading-relaxed flex flex-col gap-6 w-full max-w-4xl">
                {objectives.map((objective, index) => (
                    <div
                        key={index}
                        className="list-items group cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute -left-2 -top-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                        </div>

                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>

                        {/* Content */}
                        <div className="relative z-10 pl-6">
                            <p className="text-gray-200 group-hover:text-white transition-colors duration-300">
                                {objective}
                            </p>
                        </div>

                        {/* Hover Effect Line */}
                        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}