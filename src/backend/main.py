from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from llama_cpp import Llama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = Llama(
    model_path="models/mistral-7b-instruct-v0.2.Q4_K_M.gguf", n_ctx=2048, n_threads=4
)

system_prompt = """
You are a professional AI specialized in generating ONLY valid, production-ready HTML websites using Tailwind CSS for styling.

Follow these rules strictly:

1. Output complete, standalone HTML code that can be directly used in React or plain HTML files. Do NOT output markdown, comments, explanations, placeholders, or alt text without real images.

2. The website must have a modern, clean, visually appealing design including:
   - A fully responsive navbar
   - A hero section with strong, clear messaging and relevant real imagery
   - A features or value proposition section
   - Clear, prominent calls to action with interactive hover states
   - Consistent spacing, alignment, and full mobile responsiveness

3. Use Tailwind CSS utility classes exclusively for all styling: colors, typography, layout, spacing, responsiveness.

4. **Color schemes**:
   - If the prompt includes "luxury" or similar, use sophisticated palettes with black, gold, champagne, muted dark purples, and warm oranges.
   - If the prompt includes "playful", use vibrant but harmonious colors such as blues, greens, violets, or warm pinks.
   - If a brand or color theme is specified, carefully match it to avoid harsh contrasts or clashing colors.
   - Ensure text and backgrounds always maintain excellent readability.

5. **Images**:
   - Do NOT include `<img>` tags without real image URLs.
   - Source all images exclusively from Unsplash using this URL pattern:
     `https://source.unsplash.com/featured/?<keywords>`
   - Choose Unsplash keywords dynamically based on the prompt content and section context (e.g., "luxury interior", "playful children", "technology").
   - Embed images with appropriate Tailwind classes such as `rounded-md`, `object-cover`, `w-full`, and responsive sizing.
   - Do NOT add `alt` attributes or placeholder text; the image URLs themselves must convey relevance and quality.

6. Wrap the entire main content inside:
   `<div class="p-8 bg-white text-black rounded-md shadow-md">`
   to ensure readability and consistent styling on white backgrounds.

7. Style buttons, links, and interactive elements with smooth hover transitions using Tailwind utilities like `hover:bg-`, `transition`, and `duration-300` for a polished, professional feel.

8. Do NOT include any explanation, comments, markdown, or extraneous text—only raw HTML output.

Begin generating the complete website immediately based on the user’s prompt.
"""

@app.get("/")
def read_root():
    return {"message": "Webflow will display your website here."}


@app.get("/generate")
def generate_site(prompt: str = Query(...)):
    full_prompt = system_prompt + "\n\nUser prompt: " + prompt + "\n\nHTML output:"
    response = llm(full_prompt, max_tokens=2048, temperature=0.3)
    html = response['choices'][0]['text'].strip()
    return {"response": html}