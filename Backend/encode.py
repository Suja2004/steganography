import time
from functools import partial
import concurrent.futures
import threading
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import matplotlib
matplotlib.use("Agg")


class BinaryMatrixSteganography:
    def __init__(self, num_threads=4):
        self.original_img = None
        self.encoded_img = None
        self.original_lsb_matrix = None
        self.encoded_lsb_matrix = None
        self.num_threads = num_threads

    def _encode_chunk(self, start_row, end_row, img, binary_text, width, height):
        """Encode a chunk of rows in parallel"""
        modifications = []
        bit_index = start_row * width

        for row in range(start_row, min(end_row, height)):
            for col in range(width):
                if bit_index < len(binary_text):
                    r, g, b = img.getpixel((col, row))
                    new_bit = int(binary_text[bit_index])
                    new_r = (r & ~1) | new_bit
                    modifications.append((col, row, new_r, g, b, new_bit))
                    bit_index += 1
                else:
                    break

        return modifications

    def encode_text_with_matrices(self, image_path, text, output_path):
        """Encode text into image and save it with parallel processing"""
        img = Image.open(image_path)
        if img.mode != 'RGB':
            img = img.convert('RGB')

        self.original_img = img.copy()
        encoded = img.copy()
        width, height = img.size

        # Store original LSB matrix
        original_array = np.array(img)
        self.original_lsb_matrix = original_array[:, :, 0] & 1

        # Prepare text with delimiter
        text_with_delimiter = text + "%%END%%"
        binary_text = ''.join(format(ord(char), '08b')
                              for char in text_with_delimiter)

        encoded_lsb_matrix = self.original_lsb_matrix.copy()

        # Split work into chunks by rows
        rows_per_chunk = max(1, height // self.num_threads)

        # Process chunks in parallel
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.num_threads) as executor:
            futures = []
            for i in range(0, height, rows_per_chunk):
                start_row = i
                end_row = min(i + rows_per_chunk, height)
                future = executor.submit(
                    self._encode_chunk, start_row, end_row, img, binary_text, width, height)
                futures.append(future)

            # Collect all modifications
            all_modifications = []
            for future in concurrent.futures.as_completed(futures):
                all_modifications.extend(future.result())

        # Apply modifications to image and matrix
        total_bits = 0
        for col, row, new_r, g, b, new_bit in all_modifications:
            encoded.putpixel((col, row), (new_r, g, b))
            encoded_lsb_matrix[row, col] = new_bit
            total_bits += 1

        self.encoded_img = encoded
        self.encoded_lsb_matrix = encoded_lsb_matrix
        encoded.save(output_path)

        return {
            "status": "success",
            "bits_encoded": total_bits,
            "output_path": output_path,
        }

    def _compute_matrix_region(self, matrix, start_row, end_row, start_col, end_col):
        """Compute a matrix region in parallel"""
        return matrix[start_row:end_row, start_col:end_col]

    def show_binary_matrices(
        self,
        matrix_size=(40, 40),
        start_row=None,
        start_col=None,
        save_dir="uploads",
        auto_zoom=True,
    ):
        """Save binary matrices separately (Original, Encoded, Changes)."""

        import os
        os.makedirs(save_dir, exist_ok=True)

        diff = np.abs(self.original_lsb_matrix - self.encoded_lsb_matrix)
        H, W = self.original_lsb_matrix.shape

        if auto_zoom:
            rows, cols = np.where(diff > 0)
            if len(rows) > 0:
                min_r, max_r = rows.min(), rows.max()
                min_c, max_c = cols.min(), cols.max()
                margin = 10
                start_row = max(0, min_r - margin)
                end_row = min(H, max_r + margin)
                start_col = max(0, min_c - margin)
                end_col = min(W, max_c + margin)
            else:
                start_row, start_col = 0, 0
                end_row, end_col = matrix_size
        else:
            if start_row is None:
                start_row = 0
            if start_col is None:
                start_col = 0
            end_row = min(H, start_row + matrix_size[0])
            end_col = min(W, start_col + matrix_size[1])

        # Slice regions
        original_region = self._compute_matrix_region(
            self.original_lsb_matrix, start_row, end_row, start_col, end_col
        )
        encoded_region = self._compute_matrix_region(
            self.encoded_lsb_matrix, start_row, end_row, start_col, end_col
        )
        diff_region = np.abs(original_region - encoded_region)

        # Save each matrix separately
        paths = {}
        matrices = {
            "original": (original_region, "gray"),
            "encoded": (encoded_region, "gray"),
            "changes": (diff_region, "Reds"),
        }

        for name, (matrix, cmap) in matrices.items():
            h, w = matrix.shape
            fig_width = 8
            fig_height = max(2, fig_width * (h / w))

            fig, ax = plt.subplots(figsize=(fig_width, fig_height))
            ax.imshow(matrix, cmap=cmap, vmin=0, vmax=1)
            ax.set_title(name.capitalize())
            ax.axis("off")

            # 👇 unique filename with timestamp
            ts = int(time.time() * 1000)
            save_path = os.path.join(save_dir, f"{name}_lsb_{ts}.png")

            plt.savefig(save_path, dpi=200, bbox_inches="tight", pad_inches=0)
            plt.close(fig)

            paths[name] = save_path
        return paths
