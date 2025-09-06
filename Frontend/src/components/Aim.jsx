export default function Aim() {
    return (
        <div className="page-center px-4 sm:px-8">
            <div className="header">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Aim
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-6 sm:p-12 max-w-4xl mx-auto hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl">
                <div className="text-lg sm:text-xl leading-relaxed text-center text-gray-200 mb-8">
                    <p className="mb-6">
                        The purpose of this experiment is to encode a secret text message into an image using
                        <span className="font-semibold text-amber-300 px-2 py-1 bg-amber-900/20 rounded-md mx-1 border border-amber-700/30"> 
                            Least Significant Bit (LSB) steganography
                        </span>, 
                        and then analyze the changes in the image's binary representation.
                    </p>
                    <p>
                        This technique allows data to be hidden within an image without noticeably affecting its visual quality, 
                        making it useful for <span className="text-green-400 font-medium">secure communication</span> and 
                        <span className="text-blue-400 font-medium"> digital watermarking</span>.
                    </p>
                </div>
                
                {/* Note Section */}
                <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-amber-400 font-semibold">Note</span>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">
                        This experiment demonstrates the practical applications of steganography in image
                        processing and the impact on digital data security.
                    </p>
                </div>
            </div>
        </div>
    );
}