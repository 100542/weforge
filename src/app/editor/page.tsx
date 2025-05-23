"use client";
import Nav from "../components/nav";
import "../../css/fonts.css";
import { motion } from "framer-motion";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import "../overflow.css";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Editor() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const promptInput = form.elements.namedItem("prompt") as HTMLInputElement;
    const prompt = promptInput.value;

    setLoading(true);
    setMessage(""); // Clear previous message

    fetch(`http://localhost:8000/generate?prompt=${encodeURIComponent(prompt)}`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.response);
        setLoading(false);
      })
      .catch((err) => {
        setMessage("Error: " + err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Nav />
      <main className="bg-[#0e0e0e] h-full">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="relative"
        >
          <section>
            <div className="bg-[#0e0e0e] flex flex-row justify-center items-center w-screen h-screen">
              <div className="flex flex-row w-full h-full justify-between gap-6 p-10">
                <div className="w-[20%] p-6 h-[90%] flex flex-col gap-10 bg-[#1a1a1a] rounded-md shadow-md">
                  <h2 className="text-4xl text-white montserrat font-bold">
                    Welcome to Weforge!
                  </h2>
                  <h2 className="text-2xl text-white montserrat font-bold">
                    To get started on your first project, press the button
                    below.
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="prompt"
                      placeholder="Enter your prompt..."
                      className="p-4 text-2xl text-[#1a1a1a] montserrat font-bold w-full rounded-md shadow-md bg-[#EDA200] mb-4"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      className="p-4 text-2xl text-[#EDA200] montserrat font-bold border-4 w-full rounded-md shadow-md border-[#EDA200] hover:bg-[#EDA200]"
                      disabled={loading}
                    >
                      {loading ? "Generating..." : "Chat..."}
                    </button>
                  </form>
                </div>
                <div className="w-[75%] h-[90%] bg-[#464646] rounded-md shadow-md flex justify-center items-center overflow-auto">
                  {loading ? (
                    <p className="text-white text-3xl font-bold animate-pulse">
                      Generating your website...
                    </p>
                  ) : (
                    <div
                      className="w-full h-full bg-white rounded-md shadow-md p-4 overflow-auto text-black"
                      dangerouslySetInnerHTML={{ __html: message }}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
