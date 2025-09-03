from PIL import Image

class BinaryMatrixSteganographyDecoder:
    def decode_and_verify(self, image_path):
        """Decode text from image and return secret message"""
        img = Image.open(image_path)
        if img.mode != 'RGB':
            img = img.convert('RGB')

        width, height = img.size
        binary_data = ""

        for row in range(height):
            for col in range(width):
                r, g, b = img.getpixel((col, row))
                binary_data += str(r & 1)

        decoded_text = ""
        for i in range(0, len(binary_data), 8):
            byte = binary_data[i:i+8]
            if len(byte) == 8:
                char = chr(int(byte, 2))
                decoded_text += char
                if decoded_text.endswith("%%END%%"):
                    return decoded_text[:-7]

        return decoded_text
