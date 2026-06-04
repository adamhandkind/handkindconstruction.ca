#!/usr/bin/env python3
"""
Download the Screened Cat Porch completion photos from JobTread and convert to AVIF.

Run from the repo root:
    pip install requests pillow pillow-avif-plugin
    python3 scripts/download-cat-porch-photos.py

Photos are saved to assets/projects/ as cat-porch-1.avif through cat-porch-10.avif.
After running, commit the new AVIF files along with the page changes.
"""

import os
import sys
import io

try:
    import requests
except ImportError:
    sys.exit("Missing requests: pip install requests")

try:
    import pillow_avif  # noqa: F401 — registers AVIF codec with Pillow
    from PIL import Image
except ImportError:
    sys.exit("Missing image libs: pip install pillow pillow-avif-plugin")

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(REPO_ROOT, "assets", "projects")

# (output filename, JobTread CDN URL)
# Photo 1 = hero image (June 3, first completion shot)
# Photos 2-10 = gallery images
PHOTOS = [
    (
        "cat-porch-1.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FKWFdmIiwibiI6IjIwMjYwNjAzXzE2NTQwNy5qcGcifQM.ByRjnQrsZRM4LLNom1MckwK7OTrt_-VsXB-xpLp1Fco",
    ),
    (
        "cat-porch-2.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FLMjRKIiwibiI6IjIwMjYwNjAzXzE2NTQzNS5qcGcifQM.zndBX-nc3IWcw1dB_iwauumSOcTfXKFGLLDngNrAucM",
    ),
    (
        "cat-porch-3.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FLdnhqIiwibiI6IjIwMjYwNjAzXzE2NTUwMy5qcGcifQM.xRuCw0hE9LRPb4nYhQTuKOj0LBiIfR-CCF1Yu6DC8fY",
    ),
    (
        "cat-porch-4.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FLTndiIiwibiI6IjIwMjYwNjAzXzE2NTU0MS5qcGcifQM.AFPx4IswUqtoPSQ61XIM4ytbchqfCDxMFM2Pd-eqXh0",
    ),
    (
        "cat-porch-5.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FIamRKIiwibiI6IjIwMjYwNjAzXzE2NTU1MS5qcGcifQM.rhW9UEnZN1JVJtQF24nb7HjJ4sNNLlsnPtNEOeUqzpQ",
    ),
    (
        "cat-porch-6.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FLOGFyIiwibiI6IjIwMjYwNjAzXzE2NTYwMy5qcGcifQM.Vv3DyrNoUBFU-IHoHrY-rYhEhPjMroMNbuNs-3pVEXs",
    ),
    (
        "cat-porch-7.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FKODdOIiwibiI6IjIwMjYwNjAzXzE2NTYxNC5qcGcifQM.rCqcFkLwbBbjGxyvSW0DgRiHake1LcezSrC6hT3dhD4",
    ),
    (
        "cat-porch-8.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWVZIZ0FIdkZ0IiwibiI6IjIwMjYwNjAzXzE2NTc1MC5qcGcifQM.GoFjuchhd08AxuWIhSXKY5DyX1gtFNBCshJDDXzEIQ4",
    ),
    (
        "cat-porch-9.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWU5aZnNXeUFtIiwibiI6IjIwMjYwNjAxXzE1NDg0NC5qcGcifQM._RWS8cYOTCSDzy3HbTPIwyGenO5383bj13r9pfW7Fps",
    ),
    (
        "cat-porch-10.avif",
        "https://cdn.jobtread.com/CyGAeyJiIjoiam9idHJlYWQiLCJrIjoiZmlsZXMvMjJQWU5aZnNWUU1RIiwibiI6IjIwMjYwNjAxXzE1NDkwNS5qcGcifQM.umCKfOgvoPnQVHw67kSxNP7XS6MMWONjx9lbwzXX6PE",
    ),
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Referer": "https://app.jobtread.com/",
    "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
}


def download_and_convert(filename: str, url: str) -> None:
    output_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(output_path):
        print(f"  {filename} already exists — skipping")
        return

    print(f"  Downloading {filename}...", end=" ", flush=True)
    resp = requests.get(url, headers=HEADERS, timeout=120)
    resp.raise_for_status()
    print(f"{len(resp.content) // 1024} KB raw", end=" → ", flush=True)

    img = Image.open(io.BytesIO(resp.content))
    # Convert to RGB if needed (e.g. EXIF rotation is applied automatically by Pillow)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")
    img.save(output_path, format="AVIF", quality=72)

    avif_kb = os.path.getsize(output_path) // 1024
    print(f"{avif_kb} KB AVIF")


def main() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Saving to {OUTPUT_DIR}\n")

    errors = []
    for filename, url in PHOTOS:
        try:
            download_and_convert(filename, url)
        except Exception as exc:
            print(f"  ERROR: {exc}")
            errors.append(filename)

    print()
    if errors:
        print(f"Failed: {', '.join(errors)}")
        print("Re-run the script to retry failed files.")
        sys.exit(1)
    else:
        print("All photos downloaded and converted.")
        print("Next: git add assets/projects/cat-porch-*.avif && git commit")


if __name__ == "__main__":
    main()
