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
    model_path="models/mistral-7b-instruct-v0.2.Q4_K_M.gguf", n_ctx=6256, n_threads=4
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

Below are examples of good looking websites. You can look at the code, but do not exactly copy them.

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Royal Automotive Collective - We value nothing short of perfection">
    <meta name="keywords" content="automotive, cars, vehicles, car enthusiasts">
    <meta name="author" content="Royal Automotive Collective">
    <title>Royal Automotive Collective</title>
    <link rel="icon" href="./logo/R.png" type="image/png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/menubar.css">
</head>

<body class="bg-[#323232] overflow-x-hidden overflow-y-scroll relative">
    <video class="w-full h-screen object-cover z-[-1]" autoplay loop muted>
        <source src="media/Timeline 1.mov" type="video/mp4">
    </video>
    <div class="container absolute top-0 z-10">
    <!-- Menubar Copy & Paste! -->
        <div class="menubar w-screen h-52 bg-gradient-to-b from-[#1b1b1b] to-transparent flex justify-center items-center">
            <!-- Dark Overlay -->
            <div id="overlay" class="overlay hidden"></div>
            <!-- Site logo in het midden van de menubar -->
            <img src="logo/rac_logo.png" alt="Royal Automotive Collective"
                class="w-[200px] h-[200px] lg:w-[200px] lg:h-[200px]">
            <!-- Menubar  -->
            <div id="menuButton" class="flex flex-col justify-evenly space-y-3 absolute right-1 cursor-pointer menu-button z-40">
                <div class="line bg-[#DEDEDE] w-8 h-1 lg:w-10 lg:h-1"></div>
                <div class="line bg-[#DEDEDE] w-8 h-1 lg:w-10 lg:h-1"></div>
                <div class="line bg-[#DEDEDE] w-8 h-1 lg:w-10 lg:h-1"></div>
            </div>
            <!-- Menu items -->
            <div id="menuItems" class="menu-items">
                <a href="index.html"><div class="menu-item hidden slide-in-left">Home</div></a>
                <a href="store.html"><div class="menu-item hidden slide-in-right">Store</div></a>
                <a href="latest.html"><div class="menu-item hidden slide-in-left">Latest</div></a>
                <a href="company.html"><div class="menu-item hidden slide-in-right">Company</div></a>
                <a href="account.html"><div class="menu-item hidden slide-in-right">Account</div></a>
            </div>
    <!-- Menubar Copy & Paste! -->
        </div>
        <div class="flex flex-col justify-center w-screen xl:mt-52">
            <h1 class="font-bold text-6xl xl:text-7xl z-20 text-center font-[Tauri] text-[#DEDEDE]">EXPERIENCE TRUE LUXURY</h1>
            <h1 class="font-normal text-4xl xl:text-4xl z-20 text-center text-[#DEDEDE]">Royal Automotive Collective
            </h1>
        </div>
    </div>
    <div class="bg-transparent w-screen h-1 mt-24 flex flex-row justify-center">
        <div class="bg-gradient-to-r from-transparent via-white to-transparent w-[90%] shadow-[0px_0px_20px_20px_rgba(0,0,0,0.50)] h-1"></div>
    </div>
    <!-- Selector voor de items -->
    <div id="scroll-container" class="flex h-auto flex-row justify-evenly overflow-x-scroll items-center hide-scrollbar pt-20 pb-20">
        <a href="store.html"><div class="selector-div min-w-[250px] lg:min-w-[500px] ml-20 2xl:ml-0 h-[400px] lg:h-[700px] bg-[url('media/store.png')] bg-cover bg-center mt-10 shadow-[0px_0px_70px_20px_rgba(0,0,0,0.99)] relative">
            <div class="bg-gradient-to-t from-black via-gray-900 to-transparent w-full z-10 h-40 lg:h-80 absolute bottom-0 flex flex-row justify-center"><h1 class="font-bold text-4xl text-white font-[Tauri] mt-24 lg:mt-44">STORE</h1></div>
        </div></a>
        <a href="latest.html"><div class="selector-div min-w-[250px] lg:min-w-[500px] ml-24 2xl:ml-0 h-[400px] lg:h-[700px] bg-[url('media/latest.png')] bg-cover bg-center mt-10 shadow-[0px_0px_70px_20px_rgba(0,0,0,0.99)] relative">
            <div class="bg-gradient-to-t from-black via-gray-900 to-transparent w-full z-10 h-40 lg:h-80 absolute bottom-0 flex flex-row justify-center"><h1 class="font-bold text-4xl text-white font-[Tauri] mt-24 lg:mt-44">LATEST</h1></div>
        </div></a>
        <a href="company.html"><div class="selector-div min-w-[250px] lg:min-w-[500px] ml-24 2xl:ml-0 h-[400px] lg:h-[700px] bg-[url('media/company.png')] bg-cover bg-center mt-10 shadow-[0px_0px_70px_20px_rgba(0,0,0,0.99)] relative">
            <div class="bg-gradient-to-t from-black via-gray-900 to-transparent w-full z-10 h-40 lg:h-80 absolute bottom-0 flex flex-row justify-center"><h1 class="font-bold text-4xl text-white font-[Tauri] mt-24 lg:mt-44">COMPANY</h1></div>
        </div></a>
    </div>
<!-- Footer -->
<footer class="bg-[#1B1B1B] w-full mt-10 py-10">
    <div class="container mx-auto flex flex-wrap justify-between items-start px-6 lg:px-16">
        <!-- Contact Column -->
        <div class="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h1 class="font-[Tauri] text-[#DEDEDE] text-4xl mb-4">CONTACT</h1>
            <p class="text-[#DEDEDE] text-xl mb-2">Sales</p>
            <p class="text-[#DEDEDE] text-xl mb-4">sales@rac.com</p>
            <p class="text-[#DEDEDE] text-xl mb-2">Questions</p>
            <p class="text-[#DEDEDE] text-xl mb-4">inbox@rac.com</p>
            <p class="text-[#DEDEDE] text-xl mb-2">Phone</p>
            <p class="text-[#DEDEDE] text-xl">06 12345678</p>
        </div>
        <!-- Links Column -->
        <div class="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h1 class="font-[Tauri] text-[#DEDEDE] text-4xl mb-4">LINKS</h1>
            <a href="index.html"><p class="text-[#DEDEDE] text-xl mb-2 cursor-pointer hover:text-gray-400">Home</p></a>
            <a href="store.html"><p class="text-[#DEDEDE] text-xl mb-2 cursor-pointer hover:text-gray-400">Store</p></a>
            <a href="latest.html"><p class="text-[#DEDEDE] text-xl mb-2 cursor-pointer hover:text-gray-400">Latest</p></a>
            <a href="company.html"><p class="text-[#DEDEDE] text-xl cursor-pointer hover:text-gray-400">Company</p></a>
        </div>
        <!-- About Us Column -->
        <div class="w-full lg:w-1/4">
            <h1 class="font-[Tauri] text-[#DEDEDE] text-4xl mb-4">ABOUT US</h1>
            <p class="text-[#DEDEDE] text-xl">Welcome to Royal Automotive Collective, where luxury meets performance. Established with a passion for excellence, Royal Automotive Collective is more than just a dealership; it's a destination for automotive enthusiasts who demand nothing short of perfection.</p>
        </div>
    </div>
</footer>
</div>
<script src="js/menubar.js"></script>
<script src="js/scroll.js"></script>
</body>
</html>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Information Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<style>
  body {
    margin: 0;
    overflow: hidden;
    width: 1080px;
    height: 1920px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7fafc;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menubar {
    width: 100vw;
  }

  .card {
    width: 90%;
    max-width: 960px;
  }
</style>

<body>
  <div class="container mx-auto">
    <div class="menubar w-screen h-52 bg-gradient-to-b from-black to-transparent flex justify-center items-center">
      <img src="images/glr.png" alt="Royal Automotive Collective" class="w-36 h-36">
    </div>
    <div class="weather-widget mb-10 mt-10 h-30 w-[90%] rounded-lg bg-white shadow-[0px_0px_30px_10px_rgba(0,0,0,0.30)]">
      <a class="weatherwidget-io" href="https://forecast7.com/nl/51d924d48/rotterdam/" data-label_1="ROTTERDAM"
        data-label_2="WEER">ROTTERDAM WEER</a>
      <script>
        !function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://weatherwidget.io/js/widget.min.js';
            fjs.parentNode.insertBefore(js, fjs);
          }
        }(document, 'script', 'weatherwidget-io-js');
      </script>
    </div>
    <div class="card mx-auto shadow-[0px_0px_30px_10px_rgba(0,0,0,0.30)] bg-white overflow-hidden">
      <div class="md:flex">
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-green-500 font-semibold">Rotterdam Central Station</div>
          <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Treintijden</a>
          <p class="mt-2 text-gray-500">Aankomende treinen:</p>
          <div class="mt-4">
            <div class="flex justify-between">
              <div class="text-gray-900">Train to Amsterdam</div>
              <div class="text-gray-600">14:05</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="text-gray-900">Train to Utrecht</div>
              <div class="text-gray-600">14:15</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="text-gray-900">Train to The Hague</div>
              <div class="text-gray-600">14:30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mx-auto shadow-[0px_0px_30px_10px_rgba(0,0,0,0.30)] overflow-hidden mt-10">
      <div class="md:flex">
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-green-500 font-semibold">STADHUIS METRO</div>
          <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Metrotijden</a>
          <p class="mt-2 text-gray-500">Aankomende metro's:</p>
          <div class="mt-4">
            <div class="flex justify-between">
              <div class="text-gray-900">E Den Haag Centraal</div>
              <div class="text-gray-600 ml-10">14:05</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="text-gray-900">E Slinge</div>
              <div class="text-gray-600">14:10</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="text-gray-900">D De Akkers</div>
              <div class="text-gray-600">14:15</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mx-auto shadow-[0px_0px_30px_10px_rgba(0,0,0,0.30)] overflow-hidden mt-10">
      <div class="md:flex">
        <div class="p-8">
          <img src="images/IMG_1769-1920x920.webp" alt="broodje">
          <div class="uppercase tracking-wide text-sm text-green-500 font-semibold mt-5">ETEN IN DE KANTINE</div>
          <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Voedselwaren</a>
          <p class="mt-2 text-gray-500">Lijst met huidige voedselwaren:</p>
          <div class="mt-4">
            <div class="flex justify-between">
              <div class="text-gray-900">Broodje Kip</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="text-gray-900">Broodje Bal</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="text-gray-900">Broodje Frikandel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="js/p5.min.js"></script>
  <script src="js/p5.js"></script>
</body>

</html>
"""

@app.get("/")
def read_root():
    return {"message": "Webflow will display your website here."}


@app.get("/generate")
def generate_site(prompt: str = Query(...)):
    full_prompt = system_prompt + "\n\nUser prompt: " + prompt + "\n\nHTML output:"
    response = llm(full_prompt, max_tokens=4096, temperature=0.3)
    html = response['choices'][0]['text'].strip()
    return {"response": html}