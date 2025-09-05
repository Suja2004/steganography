export default function Theory() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4">Theory</h1>
            <div className="text-lg leading-relaxed space-y-4">
                <p>
                    <strong>Steganography</strong> is the science of hiding information in a way
                    that prevents detection. In digital images, this is often achieved using the
                    <strong> Least Significant Bit (LSB)</strong> technique.
                </p>
                <p>
                    In an RGB image, each pixel consists of three components: Red, Green, and Blue.
                    By modifying only the least significant bit of one channel (commonly the Red channel),
                    we can embed secret binary data without creating visible changes in the image.
                </p>
                <p>
                    <strong>Binary Matrix Representation:</strong>
                    Each pixel’s LSB can be represented in a binary matrix. By comparing the original and
                    encoded matrices, we can clearly visualize which pixels were modified during encoding.
                </p>
                <p>
                    <strong>Advantages:</strong>
                    - Easy to implement
                    - Minimal distortion to the image
                </p>
                <p>
                    <strong>Limitations:</strong>
                    - Vulnerable to lossy compression and image editing
                    - Limited capacity (depends on image size)
                </p>
            </div>
        </>
    );
}
