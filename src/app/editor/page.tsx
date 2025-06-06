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
  const [sessions, setSessions] = useState<{ [key: string]: { html: string } }>(
    {}
  );

  useEffect(() => {
    fetch("http://127.0.0.1:8001/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));

    fetch("http://127.0.0.1:8001/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data.sessions))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const promptInput = form.elements.namedItem("prompt") as HTMLInputElement;
    const prompt = promptInput.value;

    setLoading(true);
    setMessage("");

    fetch(`http://localhost:8001/generate?session_id=12345&prompt=${encodeURIComponent(prompt)}`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.response);
        setLoading(false);

        fetch("http://127.0.0.1:8001/sessions")
          .then((res) => res.json())
          .then((data) => setSessions(data.sessions))
          .catch((err) => console.error(err));
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

                <div className="w-[75%] h-[90%] bg-[#464646] rounded-md shadow-md flex flex-col gap-6 p-4 overflow-auto">
                  <div className="flex-1 bg-white rounded-md shadow-md p-4 overflow-auto text-black">
                    {loading ? (
                      <p className="text-white text-3xl font-bold animate-pulse">
                        Generating your website...
                      </p>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: message }}
                      />
                    )}
                  </div>

                  <div className="bg-[#1a1a1a] rounded-md shadow-md p-4 text-white">
                    <h2 className="text-2xl font-bold mb-4">Saved Chats</h2>
                    <div className="flex flex-col gap-4">
                      {Object.entries(sessions).length === 0 ? (
                        <p>No saved chats yet.</p>
                      ) : (
                        Object.entries(sessions).map(([sessionId, sessionData]) => (
                          <div
                            key={sessionId}
                            className="p-4 bg-[#2a2a2a] rounded-md shadow-md"
                          >
                            <h3 className="text-xl font-bold">
                              Session ID: {sessionId}
                            </h3>
                            <div
                              className="mt-2 text-sm bg-white text-black p-2 rounded-md overflow-auto"
                              dangerouslySetInnerHTML={{ __html: sessionData.html }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
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
