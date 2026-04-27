from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import random


ROOT = Path(__file__).resolve().parents[1]
PROFILE_DIR = ROOT / "public" / "assets" / "images" / "profile"
PROJECTS_DIR = ROOT / "public" / "assets" / "images" / "projects"

PROFILE_DIR.mkdir(parents=True, exist_ok=True)
PROJECTS_DIR.mkdir(parents=True, exist_ok=True)


def get_font(size: int, bold: bool = False):
    candidates = [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    if bold:
        candidates.insert(0, "C:/Windows/Fonts/segoeuib.ttf")
        candidates.insert(1, "C:/Windows/Fonts/arialbd.ttf")
    for font_path in candidates:
        if Path(font_path).exists():
            return ImageFont.truetype(font_path, size=size)
    return ImageFont.load_default()


def gradient_bg(size, top=(20, 20, 20), bottom=(8, 8, 8)):
    w, h = size
    img = Image.new("RGB", size)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return img


def add_noise(img: Image.Image, opacity: int = 28):
    noise = Image.effect_noise(img.size, 18).convert("L")
    layer = Image.new("RGBA", img.size, (245, 242, 237, 0))
    layer.putalpha(noise.point(lambda p: int(p * opacity / 255)))
    return Image.alpha_composite(img.convert("RGBA"), layer)


def draw_window(draw: ImageDraw.ImageDraw, box, title: str):
    x1, y1, x2, y2 = box
    draw.rounded_rectangle(box, radius=22, fill=(20, 20, 20, 235), outline=(245, 242, 237, 55), width=2)
    draw.rectangle((x1 + 1, y1 + 1, x2 - 1, y1 + 42), fill=(15, 15, 15, 255))
    draw.ellipse((x1 + 16, y1 + 14, x1 + 24, y1 + 22), fill=(245, 242, 237, 120))
    draw.ellipse((x1 + 30, y1 + 14, x1 + 38, y1 + 22), fill=(245, 242, 237, 85))
    draw.ellipse((x1 + 44, y1 + 14, x1 + 52, y1 + 22), fill=(245, 242, 237, 55))
    draw.text((x1 + 70, y1 + 11), title, font=get_font(16, True), fill=(245, 242, 237, 190))


def draw_project(path: Path, title: str, subtitle: str):
    img = gradient_bg((1600, 1000), top=(24, 24, 24), bottom=(9, 9, 9)).convert("RGBA")
    draw = ImageDraw.Draw(img)
    draw.rectangle((56, 56, 1544, 944), outline=(245, 242, 237, 38), width=2)

    # Primary app window
    draw_window(draw, (120, 120, 1480, 860), "Project Overview")
    # Left sidebar
    draw.rounded_rectangle((160, 186, 430, 820), radius=14, fill=(14, 14, 14, 250))
    for i in range(7):
        y = 220 + i * 84
        draw.rounded_rectangle((182, y, 408, y + 54), radius=10, fill=(245, 242, 237, 15 + i * 4))

    # Main charts/cards
    cards = [
        (470, 190, 870, 410),
        (900, 190, 1440, 410),
        (470, 440, 1440, 820),
    ]
    for idx, c in enumerate(cards):
        draw.rounded_rectangle(c, radius=16, fill=(245, 242, 237, 14 + idx * 3), outline=(245, 242, 237, 40))
    # Fake line graph
    points = []
    for i in range(12):
        x = 520 + i * 74
        y = 760 - random.randint(10, 260)
        points.append((x, y))
    draw.line(points, fill=(245, 242, 237, 190), width=3, joint="curve")
    for p in points:
        draw.ellipse((p[0] - 5, p[1] - 5, p[0] + 5, p[1] + 5), fill=(245, 242, 237, 205))

    title_font = get_font(42, bold=True)
    subtitle_font = get_font(24, bold=False)
    mono_font = get_font(14, bold=False)
    draw.text((120, 892), title, font=title_font, fill=(245, 242, 237, 220))
    draw.text((122, 938), subtitle, font=subtitle_font, fill=(245, 242, 237, 155))
    draw.text((1290, 920), "FULLSTACK CASE", font=mono_font, fill=(245, 242, 237, 100))

    img = add_noise(img, opacity=22)
    img.save(path, "PNG", optimize=True)


def draw_profile_main(path: Path):
    img = gradient_bg((900, 1200), top=(18, 18, 18), bottom=(8, 8, 8)).convert("RGBA")
    draw = ImageDraw.Draw(img)
    draw.rectangle((55, 55, 845, 1145), outline=(245, 242, 237, 45), width=2)
    # Better portrait-like abstract form
    draw.ellipse((280, 190, 620, 530), fill=(245, 242, 237, 55))
    draw.rounded_rectangle((220, 510, 680, 1090), radius=180, fill=(245, 242, 237, 30))
    draw.rectangle((200, 980, 700, 1020), fill=(245, 242, 237, 20))
    draw.ellipse((350, 310, 410, 360), fill=(15, 15, 15, 70))
    draw.ellipse((490, 310, 550, 360), fill=(15, 15, 15, 70))
    draw.arc((365, 380, 535, 470), 10, 170, fill=(15, 15, 15, 90), width=4)

    title_font = get_font(30, bold=True)
    meta_font = get_font(16, bold=False)
    draw.text((90, 92), "PROFILE PLACEHOLDER", font=title_font, fill=(245, 242, 237, 190))
    draw.text((90, 1048), "Replace with your real portrait photo", font=meta_font, fill=(245, 242, 237, 145))
    draw.text((90, 1076), "Best crop: chest-up, neutral background", font=meta_font, fill=(245, 242, 237, 118))

    img = add_noise(img, opacity=25)
    img.save(path, "PNG", optimize=True)


def draw_profile_portrait(path: Path):
    img = gradient_bg((1000, 1400), top=(20, 20, 20), bottom=(10, 10, 10)).convert("RGBA")
    draw = ImageDraw.Draw(img)
    draw.rectangle((60, 60, 940, 1340), outline=(245, 242, 237, 48), width=2)
    draw.ellipse((300, 230, 700, 630), fill=(245, 242, 237, 45))
    draw.rounded_rectangle((225, 620, 775, 1300), radius=220, fill=(245, 242, 237, 24))
    draw.rectangle((195, 1180, 805, 1230), fill=(245, 242, 237, 22))

    title_font = get_font(38, bold=True)
    meta_font = get_font(20, bold=False)
    draw.text((100, 100), "ABOUT SECTION PORTRAIT", font=title_font, fill=(245, 242, 237, 190))
    draw.text((100, 1260), "Replace with your actual portrait image", font=meta_font, fill=(245, 242, 237, 130))

    img = add_noise(img, opacity=24)
    img.save(path, "PNG", optimize=True)


project_specs = [
    ("multi-vendor-commerce", "MULTI-VENDOR COMMERCE", "ORDER • INVENTORY • PAYMENT"),
    ("b2b-saas-command-center", "B2B SAAS COMMAND CENTER", "TENANT • BILLING • ANALYTICS"),
    ("realtime-project-collaboration-suite", "REALTIME COLLABORATION SUITE", "WEBSOCKET • PRESENCE • TASKS"),
    ("ai-knowledge-automation-hub", "AI KNOWLEDGE AUTOMATION HUB", "RAG • WORKFLOW • APPROVAL"),
    ("enterprise-api-platform", "ENTERPRISE API PLATFORM", "AUTH • RATE LIMIT • DOCS"),
]

for slug, a, b in project_specs:
    draw_project(PROJECTS_DIR / f"{slug}.png", a, b)

draw_profile_main(PROFILE_DIR / "profile-main.png")
draw_profile_portrait(PROFILE_DIR / "profile-portrait.png")

print("PNG assets generated successfully.")
