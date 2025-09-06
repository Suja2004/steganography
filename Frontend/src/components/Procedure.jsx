export default function Procedure() {
    const experiments = [
        {
            title: "Experiment 1: Encoding",
            color: "blue",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            steps: [
                "Upload a cover image into the system.",
                "Enter the secret message you want to hide.",
                "The system converts the text into binary and embeds it into the LSB of the image's Red channel.",
                "The encoded image is saved and can be downloaded.",
                "The binary matrices of the original and encoded images are displayed to visualize the changes."
            ]
        },
        {
            title: "Experiment 2: Decoding",
            color: "green",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
            ),
            steps: [
                "Upload the encoded (stego) image.",
                "The system extracts the LSB bits from the pixels and reconstructs the binary data.",
                "The binary data is converted back to characters to reveal the hidden message.",
                "Verify that the decoded message matches the original secret message."
            ]
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: "from-blue-900/20 to-cyan-900/20",
                border: "border-blue-700/50 hover:border-blue-500/50",
                text: "text-blue-400",
                accent: "text-blue-300"
            },
            green: {
                bg: "from-green-900/20 to-emerald-900/20",
                border: "border-green-700/50 hover:border-green-500/50",
                text: "text-green-400",
                accent: "text-green-300"
            }
        };
        return colors[color];
    };

    return (
        <div className="page-center">
            {/* Header Section */}
            <div className="header">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Procedure
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
            </div>

            {/* Experiments */}
            <div className="text-lg leading-relaxed space-y-8 w-full max-w-5xl">
                {experiments.map((experiment, expIndex) => {
                    const colorClasses = getColorClasses(experiment.color);
                    return (
                        <div
                            key={expIndex}
                            className={`bg-gradient-to-r ${colorClasses.bg} border ${colorClasses.border} rounded-3xl p-8 transition-all duration-300 hover:shadow-xl`}
                        >
                            {/* Experiment Header */}
                            <div className="flex items-center mb-6">
                                <div className={`${colorClasses.text} mr-4`}>
                                    {experiment.icon}
                                </div>
                                <h2 className={`text-2xl font-bold ${colorClasses.text}`}>
                                    {experiment.title}
                                </h2>
                            </div>

                            {/* Steps */}
                            <div className="space-y-4">
                                {experiment.steps.map((step, stepIndex) => (
                                    <div
                                        key={stepIndex}
                                        className="flex items-start space-x-4 group"
                                    >
                                        <div className={`flex-shrink-0 w-8 h-8 ${colorClasses.text} bg-gray-700 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300`}>
                                            {stepIndex + 1}
                                        </div>
                                        <p className="text-gray-200 group-hover:text-white transition-colors duration-300 pt-1">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
           
        </div>
    );
}