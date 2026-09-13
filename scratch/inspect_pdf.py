import sys

libraries = ['pypdf', 'PyPDF2', 'fitz', 'pdfplumber', 'pypdfium2', 'pdfminer', 'easyocr', 'pytesseract']
for lib in libraries:
    try:
        __import__(lib)
        print(f"AVAILABLE: {lib}")
    except ImportError:
        print(f"NOT AVAILABLE: {lib}")
