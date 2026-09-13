import urllib.request
import re
import os
import sys

file_id = "1Kq2qvoJpH1FczEH0FqY4wnX5P3R6LQWL"
download_url = f"https://drive.google.com/uc?export=download&id={file_id}"
output_pdf = "scratch/DS_Notes.pdf"

print(f"Downloading PDF from {download_url}...")

# Download using urllib with user-agent
req = urllib.request.Request(
    download_url,
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)

try:
    with urllib.request.urlopen(req) as response, open(output_pdf, 'wb') as out_file:
        data = response.read()
        out_file.write(data)
    print(f"Downloaded {len(data)} bytes to {output_pdf}")
except Exception as e:
    print(f"Error downloading: {e}")

# Check installed PDF extraction libraries
try:
    import pypdf
    reader = pypdf.PdfReader(output_pdf)
    print(f"Total pages in PDF: {len(reader.pages)}")
    text_content = []
    for idx, page in enumerate(reader.pages):
        txt = page.extract_text()
        text_content.append(f"--- PAGE {idx+1} ---\n{txt}")
    full_txt = "\n".join(text_content)
    with open("scratch/DS_Notes_extracted.txt", "w", encoding="utf-8") as f:
        f.write(full_txt)
    print("Successfully extracted text using pypdf")
except Exception as e:
    print(f"pypdf failed or not installed: {e}")
    try:
        import fitz # PyMuPDF
        doc = fitz.open(output_pdf)
        print(f"PyMuPDF Total pages: {len(doc)}")
        text_content = []
        for idx, page in enumerate(doc):
            text_content.append(f"--- PAGE {idx+1} ---\n{page.get_text()}")
        with open("scratch/DS_Notes_extracted.txt", "w", encoding="utf-8") as f:
            f.write("\n".join(text_content))
        print("Successfully extracted text using PyMuPDF")
    except Exception as e2:
        print(f"PyMuPDF failed: {e2}")
