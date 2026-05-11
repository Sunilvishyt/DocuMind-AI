import easyocr

# Initialize the reader (it takes a few seconds the first time)
# 'en' is for English. You can add more like ['en', 'hi']
reader = easyocr.Reader(["en"])


def extract_image_text(file_path):
    try:
        # readtext returns a list of results
        results = reader.readtext(file_path)

        # We only want the text strings (the second item in each result tuple)
        text_only = [res[1] for res in results]

        return " ".join(text_only)
    except Exception as e:
        return f"EasyOCR Error: {str(e)}"
