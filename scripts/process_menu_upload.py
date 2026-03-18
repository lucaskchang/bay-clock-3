import argparse
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageOps


SUPPORTED_SUFFIXES = {".pdf", ".jpg", ".jpeg"}
PDF_SIGNATURE = b"%PDF-"
JPEG_SIGNATURE = b"\xff\xd8\xff"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Normalize an uploaded lunch menu asset into the live JPG path.",
    )
    parser.add_argument("--input", required=True, type=Path, dest="input_path")
    parser.add_argument("--output", required=True, type=Path, dest="output_path")
    parser.add_argument("--backup", required=True, type=Path, dest="backup_path")
    return parser.parse_args()


def detect_upload_type(input_path: Path) -> str:
    if not input_path.exists():
        raise RuntimeError(f"Upload file does not exist: {input_path}")

    suffix = input_path.suffix.lower()
    if suffix in SUPPORTED_SUFFIXES:
        return suffix

    with input_path.open("rb") as file_obj:
        signature = file_obj.read(8)
    if signature.startswith(PDF_SIGNATURE):
        return ".pdf"
    if signature.startswith(JPEG_SIGNATURE):
        return ".jpg"

    supported = ", ".join(sorted(SUPPORTED_SUFFIXES))
    raise RuntimeError(
        f"Unsupported upload type for {input_path}. Expected one of: {supported}, PDF bytes, or JPEG bytes",
    )


def render_pdf_to_jpeg(input_path: Path, temp_dir: Path) -> Path:
    output_prefix = temp_dir / "menu-first-page"
    try:
        subprocess.run(
            [
                "pdftoppm",
                "-jpeg",
                "-f",
                "1",
                "-singlefile",
                "-r",
                "200",
                str(input_path),
                str(output_prefix),
            ],
            check=True,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError as exc:
        raise RuntimeError("pdftoppm is required to process PDF uploads") from exc
    except subprocess.CalledProcessError as exc:
        stderr = exc.stderr.strip() or exc.stdout.strip() or "unknown pdftoppm failure"
        raise RuntimeError(f"Failed to rasterize PDF upload: {stderr}") from exc

    rendered_path = output_prefix.with_suffix(".jpg")
    if not rendered_path.exists():
        raise RuntimeError("PDF conversion did not produce an output image")
    return rendered_path


def normalize_to_jpeg(source_path: Path, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source_path) as image:
        normalized = ImageOps.exif_transpose(image).convert("RGB")
        normalized.save(
            output_path,
            format="JPEG",
            quality=90,
            optimize=True,
            progressive=True,
        )


def main() -> None:
    args = parse_args()
    suffix = detect_upload_type(args.input_path)

    with tempfile.TemporaryDirectory(prefix="menu-upload-") as temp_dir_name:
        temp_dir = Path(temp_dir_name)
        normalized_source = args.input_path
        if suffix == ".pdf":
            normalized_source = render_pdf_to_jpeg(args.input_path, temp_dir)

        temp_output = temp_dir / "menu.jpg"
        normalize_to_jpeg(normalized_source, temp_output)

        if args.output_path.exists():
            args.backup_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(args.output_path, args.backup_path)

        shutil.copy2(temp_output, args.output_path)

    print(f"Updated {args.output_path} and rotated backup to {args.backup_path}.")


if __name__ == "__main__":
    main()
