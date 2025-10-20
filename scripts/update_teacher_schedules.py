import json
from pathlib import Path

import pdfplumber


PDF_PATH = Path("assets/data/TOBB_25-26.pdf")
OUTPUT_JSON = Path("assets/data/teacher_schedules.json")


def load_office_mapping():
    if not OUTPUT_JSON.exists():
        return {}
    try:
        data = json.loads(OUTPUT_JSON.read_text())
    except Exception:
        return {}
    mapping = {}
    for row in data:
        name = row.get("Teacher's Name")
        if name:
            mapping[name] = row.get("Office", "")
    return mapping


def normalize_cell(val: str) -> str:
    if val is None:
        return ""
    v = str(val).strip()
    if v.upper() == "N/A":
        return ""
    return v


def parse_pdf_table(pdf_path: Path):
    with pdfplumber.open(str(pdf_path)) as pdf:
        if not pdf.pages:
            raise RuntimeError("PDF has no pages")
        page = pdf.pages[0]
        tables = page.extract_tables()
        if not tables:
            raise RuntimeError("No tables found on first page")
        table = tables[0]

    # Expect first two rows to be headers
    rows = table[2:]
    parsed = []
    for r in rows:
        # Some PDFs return variable-length rows; pad to 7
        r = (r or []) + [None] * (7 - len(r or []))
        name = normalize_cell(r[0])
        if not name or name.upper().startswith("STAFFULTY MEMBER"):
            continue
        entry = {
            "Teacher's Name": name,
            "A": normalize_cell(r[1]),
            "B": normalize_cell(r[2]),
            "C": normalize_cell(r[3]),
            "D": normalize_cell(r[4]),
            "E": normalize_cell(r[5]),
            "F": normalize_cell(r[6]),
        }
        parsed.append(entry)
    return parsed


def main():
    if not PDF_PATH.exists():
        raise SystemExit(f"PDF not found: {PDF_PATH}")

    office_by_name = load_office_mapping()
    rows = parse_pdf_table(PDF_PATH)

    # Attach office info if known
    for row in rows:
        row["Office"] = office_by_name.get(row["Teacher's Name"], "")

    OUTPUT_JSON.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n")
    print(f"Updated {OUTPUT_JSON} with {len(rows)} teacher rows.")


if __name__ == "__main__":
    main()

