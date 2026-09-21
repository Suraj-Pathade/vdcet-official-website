import os
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    HRFlowable,
    KeepTogether,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        if self._pageNumber > 1:
            self.saveState()
            self.setFont("Helvetica", 9)
            self.setFillColor(colors.HexColor("#666666"))
            # Header
            self.drawString(54, 750, "VDCET Official Website with AI-Powered RAG Knowledge Assistant")
            self.setStrokeColor(colors.HexColor("#E5E5E5"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            # Footer
            self.line(54, 45, 558, 45)
            page_text = f"Page {self._pageNumber} of {page_count}"
            self.drawRightString(558, 30, page_text)
            self.drawString(54, 30, "Department of Computer Engineering, VDCET Mouda (DBATU)")
            self.restoreState()

def convert_md_to_pdf(md_file_path, output_pdf_path):
    print(f"Generating PDF for {md_file_path} -> {output_pdf_path}...")
    if not os.path.exists(md_file_path):
        print(f"Error: {md_file_path} not found.")
        return

    with open(md_file_path, "r", encoding="utf-8") as f:
        text = f.read()

    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=26,
        textColor=colors.HexColor("#1D1D1F"),
        alignment=1,
        spaceAfter=15,
    )

    h1_style = ParagraphStyle(
        "DocH1",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=18,
        textColor=colors.HexColor("#0066CC"),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True,
    )

    h2_style = ParagraphStyle(
        "DocH2",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=15,
        textColor=colors.HexColor("#1D1D1F"),
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        "DocBody",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#333333"),
        spaceAfter=6,
    )

    bullet_style = ParagraphStyle(
        "DocBullet",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#333333"),
        leftIndent=15,
        spaceAfter=4,
    )

    code_style = ParagraphStyle(
        "DocCode",
        parent=styles["Normal"],
        fontName="Courier",
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#1A1A1A"),
        backColor=colors.HexColor("#F5F5F7"),
        borderColor=colors.HexColor("#E0E0E0"),
        borderWidth=0.5,
        borderPadding=6,
        spaceBefore=6,
        spaceAfter=6,
    )

    story = []
    lines = text.split("\n")
    in_code_block = False
    code_block_lines = []

    for line in lines:
        line_str = line.rstrip()
        
        # Handle code blocks
        if line_str.startswith("```"):
            if in_code_block:
                code_text = "<br/>".join(code_block_lines).replace(" ", "&nbsp;")
                story.append(Paragraph(code_text, code_style))
                code_block_lines = []
                in_code_block = False
            else:
                in_code_block = True
            continue

        if in_code_block:
            escaped = (
                line_str.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
            )
            code_block_lines.append(escaped)
            continue

        # Format markdown headers
        if line_str.startswith("# "):
            story.append(Spacer(1, 10))
            story.append(Paragraph(line_str[2:].strip(), title_style))
            story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0066CC"), spaceAfter=12))
        elif line_str.startswith("## "):
            story.append(Paragraph(line_str[3:].strip(), h1_style))
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E5E5E5"), spaceAfter=6))
        elif line_str.startswith("### "):
            story.append(Paragraph(line_str[4:].strip(), h2_style))
        elif line_str.startswith("* ") or line_str.startswith("- "):
            bullet_text = line_str[2:].strip()
            bullet_text = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", bullet_text)
            story.append(Paragraph(f"• {bullet_text}", bullet_style))
        elif line_str.startswith("---"):
            story.append(Spacer(1, 4))
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CCCCCC"), spaceAfter=6))
        elif line_str.strip() == "":
            story.append(Spacer(1, 4))
        else:
            para_text = line_str.strip()
            para_text = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", para_text)
            para_text = re.sub(r"\*(.*?)\*", r"<i>\1</i>", para_text)
            para_text = re.sub(r"`(.*?)`", r"<font face='Courier'>\1</font>", para_text)
            story.append(Paragraph(para_text, body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {output_pdf_path}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    doc_dir = os.path.join(base_dir, "Documentation")

    convert_md_to_pdf(
        os.path.join(doc_dir, "Project-Report.md"),
        os.path.join(doc_dir, "Project-Report.pdf"),
    )
    convert_md_to_pdf(
        os.path.join(doc_dir, "Synopsis.md"),
        os.path.join(doc_dir, "Synopsis.pdf"),
    )
    convert_md_to_pdf(
        os.path.join(doc_dir, "Abstract.md"),
        os.path.join(doc_dir, "Abstract.pdf"),
    )
