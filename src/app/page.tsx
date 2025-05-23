"use client";
import Nav from "./components/nav";
import "../css/fonts.css";
import RotatingText from "./components/rotatingText";
import { motion } from "framer-motion";
import Footer from "./components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "./overflow.css"

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
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
              <div className="flex flex-col justify-center items-center">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="w-16 h-16 hover:rotate-360 duration-300"
                />
                <h1 className="text-8xl flex flex-row gap-8 font-bold text-white montserrat tracking-wider mt-16">
                  No{" "}
                  <span>
                    <RotatingText
                      texts={["Code?", "Design?", "Developer?", "Time?"]}
                      mainClassName="text-[#EDA200]"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={2000}
                    />
                  </span>{" "}
                  No problem.
                </h1>
                <p className="text-4xl font-light text-white montserrat tracking-wider mt-4">
                  Build your imagination using Weforge.
                </p>
                <a href="/editor"><button className="bg-transparent montserrat tracking-wider hover:bg-[#EDA200] hover:text-[#0e0e0e] text-white border-2 border-[#EDA200] hover:scale-105 duration-300 font-bold p-4 rounded-md mt-8 shadow-md min-w-52 text-2xl">
                  Get Started
                </button></a>
              </div>
            </div>
          </section>

          <section className="flex flex-row justify-evenly items-center gap-40 p-16 -mt-52">
            <div className="bg-[#EDA200] h-96 w-full flex flex-col text-[#0e0e0e] p-8 space-y-8 rounded-lg shadow-lg hover:rotate-3 duration-300">
              <h1 className="text-4xl font-bold montserrat tracking-wider">
                Custom-Made Component Library.
              </h1>
              <p className="text-2xl font-normal montserrat tracking-wider">
                AI will often re-use the same components over and over again,
                creating the same feeling for every generated website. We have
                craftedd our own component library, ensuring the website is
                fully yours.
              </p>
            </div>

            <div className="bg-[#EDA200] h-96 w-full flex flex-col text-[#0e0e0e] p-8 space-y-8 rounded-lg shadow-lg hover:-rotate-3 duration-300">
              <h1 className="text-4xl font-bold montserrat tracking-wider">
                AI assistance for your website.
              </h1>
              <p className="text-2xl font-normal montserrat tracking-wider">
                Use our carefully configured AI tool, powered by Gemini to
                create your website in minutes. The AI will generate a website
                based on your preferences, and you can edit it to your liking.
              </p>
            </div>

            <div className="bg-[#EDA200] h-96 w-full flex flex-col text-[#0e0e0e] p-8 space-y-8 rounded-lg shadow-lg hover:rotate-3 duration-300">
              <h1 className="text-4xl font-bold montserrat tracking-wider">
                Save projects directly to your computer.
              </h1>
              <p className="text-2xl font-normal montserrat tracking-wider">
                Directly save your projects to your computer, and host them on
                any hosting provider to your liking. No strings attached.
              </p>
              <p className="text-2xl font-normal montserrat tracking-wider">
                Your project will be exported as code, reusable anywhere.
              </p>
            </div>
          </section>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="relative"
        >
          <section className="flex flex-row justify-center mt-40 mb-40">
            <div className="bg-[#1a1a1a] h-fit w-full flex flex-col rounded-md shadow-md m-16 p-10">
              <h1 className="text-5xl font-bold text-[#EDA200] montserrat tracking-wider">
                Why should you pick Weforge?
              </h1>
              <div className="flex flex-row gap-24 mt-24 justify-between">
                <div className="bg-[#0e0e0e] hover:border-4 border-[#EDA200] h-96 w-full flex flex-col text-white p-8 space-y-8 rounded-lg shadow-lg duration-75">
                  <h1 className="text-4xl font-bold montserrat tracking-wider">
                    Scalability
                  </h1>
                  <p className="text-2xl font-normal montserrat tracking-wider">
                    Your projects are saved as code, and can be hosted on any
                    platform to your liking. We do not bind you to our service.
                    Your project, your rules.
                  </p>
                </div>

                <div className="bg-[#0e0e0e] hover:border-4 border-[#EDA200] h-96 w-full flex flex-col text-white p-8 space-y-8 rounded-lg shadow-lg duration-75">
                  <h1 className="text-4xl font-bold montserrat tracking-wider">
                    Service
                  </h1>
                  <p className="text-2xl font-normal montserrat tracking-wider">
                    We offer excellent service, using our custom-made CSS
                    framework and Gemini AI to create your website in minutes.
                    We are here to help you.
                  </p>
                </div>

                <div className="bg-[#0e0e0e] hover:border-4 border-[#EDA200] h-96 w-full flex flex-col text-white p-8 space-y-8 rounded-lg shadow-lg duration-75">
                  <h1 className="text-4xl font-bold montserrat tracking-wider">
                    Flexibility
                  </h1>
                  <p className="text-2xl font-normal montserrat tracking-wider">
                    Using our CMS, you can directly manage all of the generated
                    components real-time, to make your product fully yours. No
                  </p>
                </div>
              </div>
            </div>
          </section>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="relative flex flex-row justify-center"
        >
          <section className="flex flex-row justify-center mt-20 mb-40 w-[95%]">
            <Accordion type="single" collapsible className="w-full bg-[#1a1a1a] p-16">
            <h1 className="text-4xl text-[#EDA200] font-bold montserrat mb-16">Frequently Asked Questions (FAQ)</h1>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-4xl text-white montserrat font-bold tracking-wider">Terms Of Service</AccordionTrigger>
                <AccordionContent className="text-2xl text-white montserrat font-light tracking-wider">
                  You can learn more about the way we handle your data and information by reading our Terms of Service. <span className="underline font-bold hover:cursor-pointer">download PDF</span>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-4xl text-white montserrat font-bold tracking-wider">If I am experienced as a developer, can I edit the code to optimalise my result?</AccordionTrigger>
                <AccordionContent className="text-2xl text-white montserrat font-light tracking-wider">
                  Yes. Your code is entirely yours. There is a tab that says "code" at the top of your file. You can edit the code directly, making any changes you need to optimize your result.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-4xl text-white montserrat font-bold tracking-wider">Is the AI trained with user data?</AccordionTrigger>
                <AccordionContent className="text-2xl text-white montserrat font-light tracking-wider">
                  No, the AI is not trained with user data. The AI is trained using a custom-built dataset that is not related to any user data. Your data is safe with us.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-4xl text-white montserrat font-bold tracking-wider">Where are my projects saved?</AccordionTrigger>
                <AccordionContent className="text-2xl text-white montserrat font-light tracking-wider">
                  Your profile keeps track of your file history. You can even create folders to get the most optimal overview of your projects. Your projects are saved on our servers, and you can download them at any time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </motion.section>
        <Footer />
      </main>
    </>
  );
}
