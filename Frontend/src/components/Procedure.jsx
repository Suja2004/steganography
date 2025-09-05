export default function Procedure() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4">Procedure</h1>
            <div className="text-lg leading-relaxed space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Experiment 1: Encoding</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Upload a cover image into the system.</li>
                        <li>Enter the secret message you want to hide.</li>
                        <li>
                            The system converts the text into binary and embeds it into the LSB of
                            the image’s Red channel.
                        </li>
                        <li>The encoded image is saved and can be downloaded.</li>
                        <li>
                            The binary matrices of the original and encoded images are displayed
                            to visualize the changes.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Experiment 2: Decoding</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Upload the encoded (stego) image.</li>
                        <li>
                            The system extracts the LSB bits from the pixels and reconstructs
                            the binary data.
                        </li>
                        <li>The binary data is converted back to characters to reveal the hidden message.</li>
                        <li>Verify that the decoded message matches the original secret message.</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
