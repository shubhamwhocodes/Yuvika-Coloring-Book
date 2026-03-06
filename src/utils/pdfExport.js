import jsPDF from 'jspdf';

/**
 * Generate a printable A4 PDF from story pages
 */
export async function exportStoryToPDF(story, familyData) {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Cover Page
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    const title = story.title || 'My Coloring Book';
    const titleLines = pdf.splitTextToSize(title, contentWidth);
    pdf.text(titleLines, pageWidth / 2, pageHeight / 3, { align: 'center' });

    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'normal');
    const subtitle = `A story for ${familyData?.childName || 'you'}`;
    pdf.text(subtitle, pageWidth / 2, pageHeight / 3 + 30, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text('✏️ Color me! ✏️', pageWidth / 2, pageHeight / 3 + 50, { align: 'center' });

    // Story pages
    if (story.pages) {
        story.pages.forEach((page, index) => {
            pdf.addPage();

            // Page number
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Page ${index + 1}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

            // Text section
            pdf.setFontSize(20);
            pdf.setFont('helvetica', 'normal');
            let yPos = margin + 10;

            if (page.text) {
                page.text.forEach(line => {
                    const wrappedLines = pdf.splitTextToSize(line, contentWidth);
                    wrappedLines.forEach(wl => {
                        pdf.text(wl, pageWidth / 2, yPos, { align: 'center' });
                        yPos += 12;
                    });
                });
            }

            // Illustration placeholder area
            const illustrationY = yPos + 15;
            const illustrationHeight = pageHeight - illustrationY - margin - 15;
            if (illustrationHeight > 50) {
                pdf.setDrawColor(200, 200, 200);
                pdf.setLineWidth(0.5);
                pdf.roundedRect(margin, illustrationY, contentWidth, illustrationHeight, 5, 5);

                pdf.setFontSize(14);
                pdf.setTextColor(180, 180, 180);
                pdf.text(
                    page.illustrationHint || '🎨 Illustration area — color me!',
                    pageWidth / 2,
                    illustrationY + illustrationHeight / 2,
                    { align: 'center' }
                );
                pdf.setTextColor(0, 0, 0);
            }
        });
    }

    pdf.save(`${story.title || 'coloring-book'}.pdf`);
}

export async function exportSinglePageToPDF(page, pageNumber, familyData) {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    pdf.setFontSize(10);
    pdf.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

    pdf.setFontSize(20);
    let yPos = margin + 10;

    if (page.text) {
        page.text.forEach(line => {
            const wrappedLines = pdf.splitTextToSize(line, contentWidth);
            wrappedLines.forEach(wl => {
                pdf.text(wl, pageWidth / 2, yPos, { align: 'center' });
                yPos += 12;
            });
        });
    }

    const illustrationY = yPos + 15;
    const illustrationHeight = pageHeight - illustrationY - margin - 15;
    if (illustrationHeight > 50) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(margin, illustrationY, contentWidth, illustrationHeight, 5, 5);
        pdf.setFontSize(14);
        pdf.setTextColor(180, 180, 180);
        pdf.text(
            page.illustrationHint || '🎨 Color this page!',
            pageWidth / 2,
            illustrationY + illustrationHeight / 2,
            { align: 'center' }
        );
    }

    pdf.save(`page-${pageNumber}.pdf`);
}
