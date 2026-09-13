from PIL import Image
import os

input_path = r"C:\Users\sayan\.gemini\antigravity\brain\4c21e87f-34de-4985-b000-e6c1e36b0552\hero_laptop_isolated_png_1785549914512.jpg"
output_png = r"c:\Users\sayan\OneDrive\Attachments\Desktop\bca-web\src\assets\images\laptop_mockup.png"
public_png = r"c:\Users\sayan\OneDrive\Attachments\Desktop\bca-web\public\laptop_hero_3d.png"

if not os.path.exists(input_path):
    input_path = r"C:\Users\sayan\.gemini\antigravity\brain\4c21e87f-34de-4985-b000-e6c1e36b0552\hero_laptop_exact_premium_nobox_178550022473.jpg"

img = Image.open(input_path).convert("RGBA")
datas = img.getdata()

newData = []
for item in datas:
    r, g, b, a = item
    if r < 35 and g < 35 and b < 45:
        newData.append((0, 0, 0, 0))
    else:
        newData.append((r, g, b, a))

img.putdata(newData)
img.save(output_png, "PNG")
img.save(public_png, "PNG")
print("SUCCESS: Transparent PNG created at", output_png)
