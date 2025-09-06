import EncodeForm from "./EncodeForm";
import DecodeForm from "./DecodeForm";

export default function Simulation() {
    return (
        <div className="page-center">
            <div className="header">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Simulation Lab
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                    Experience LSB steganography in action. Encode secret messages into images and decode them back.
                </p>
            </div>

            <div className="flex flex-col gap-8 items-center max-w-6xl w-full">
                <EncodeForm />
                <DecodeForm />
            </div>
        </div>
    );
}