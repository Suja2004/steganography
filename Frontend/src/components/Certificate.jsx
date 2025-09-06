import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function Certificate({ name = "John Doe" }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [pdfBlob, setPdfBlob] = useState(null);

    const generateCertificate = () => {
        const pdf = new jsPDF("landscape", "pt", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Draw certificate content
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
        pdf.setDrawColor(255, 193, 7);
        pdf.setLineWidth(10);
        pdf.rect(20, 20, pageWidth - 40, pageHeight - 40);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(40);
        pdf.setTextColor(217, 119, 6);
        pdf.text("Certificate of Completion", pageWidth / 2, 120, { align: "center" });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(18);
        pdf.setTextColor(0, 0, 0);
        pdf.text("This certificate is proudly presented to", pageWidth / 2, 180, { align: "center" });

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(30);
        pdf.setTextColor(217, 119, 6);
        pdf.text(name, pageWidth / 2, 240, { align: "center" });

        // Body text (more detailed)
        const bodyLines = [
            "For successfully completing the StegaLab Quiz,",
            "demonstrating knowledge and understanding of",
            "the principles of LSB steganography, image",
            "processing, and data security techniques."
        ];

        // Start drawing at y = 300
        let y = 300;
        pdf.setFontSize(18);
        pdf.setFont("helvetica", "normal");

        bodyLines.forEach(line => {
            pdf.text(line, pageWidth / 2, y, { align: "center" });
            y += 30; // space between lines
        });


        const today = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        pdf.setFont("courier", "italic");
        pdf.setFontSize(16);
        pdf.text("Sujan Kumar K", pageWidth / 4, pageHeight - 80, { align: "center" });
        pdf.setFont("helvetica", "normal");
        pdf.text("Instructor", pageWidth / 4, pageHeight - 50, { align: "center" });

        pdf.text(today, (3 * pageWidth) / 4, pageHeight - 80, { align: "center" });
        pdf.text("Date", (3 * pageWidth) / 4, pageHeight - 50, { align: "center" });

        const blob = pdf.output("blob");
        setPdfBlob(blob);

        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
    };

    useEffect(() => {
        generateCertificate();

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [name]);

    const downloadCertificate = () => {
        if (!pdfBlob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = `certificate-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
    };

    return (
        <div className="flex flex-col items-center m-1">
            {previewUrl ? (
                <div className="border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden mb-2">
                    <embed
                        src={previewUrl}
                        type="application/pdf"
                        width="800"
                        height="400"
                        className="max-w-full"
                    />
                </div>
            ) : (
                <div className="w-[800px] h-[500px] max-w-full border-2 border-gray-300 rounded-lg shadow-lg flex items-center justify-center mb-3">
                    <div className="text-gray-500">Generating certificate preview...</div>
                </div>
            )}

            <button
                onClick={downloadCertificate}
                disabled={!pdfBlob}
                className="bg-amber-500 hover:bg-amber-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
                Download Certificate
            </button>

            <p className="mt-2 text-sm text-gray-600 text-center">
                Certificate generated for: <span className="font-semibold">{name}</span>
            </p>
        </div>
    );
}