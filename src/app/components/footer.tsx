import React from "react";

const Footer = () => {
  return (
    <footer>
        <div className="h-auto py-16 bg-[#0e0e0e] text-white mt-24">
          <div className="mx-auto w-full">
            <div className="flex ml-4 md:ml-0 flex-col md:flex-row w-full justify-evenly gap-8">
              <img
                src="/logo.svg"
                alt="Logo"
                className="hidden md:block w-40 h-40 hover:rotate-360 duration-300"
              />
              <div>
                <h2 className="font-semibold text-2xl mb-4">Quick Links</h2>
                <nav className="flex flex-col gap-2">
                  <a href="/" className="hover:text-[#EDA200]">
                    Home
                  </a>
                  <a href="/editor" className="hover:text-[#EDA200]">
                    Editor
                  </a>
                  <a href="/account" className="hover:text-[#EDA200]">
                    Account
                  </a>
                </nav>
              </div>
              <div>
                <h2 className="font-semibold text-2xl mb-4">Legalities</h2>
                <nav className="flex flex-col gap-4">
                  <a target="_blank" href="https://github.com/100542">
                    Privacy Policy
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/aaron-heemskerk-7a7079328/"
                  >
                    Terms of Service
                  </a>
                </nav>
              </div>
              <div>
                <h2 className="font-semibold text-2xl mb-4">Contact</h2>
                <p>Email: contact@webflow.com</p>
              </div>
            </div>
            <div className="text-center mt-12 text-sm opacity-70">
              Designed & Developed by <a href="https://aaronheemskerk.com" target="_blank" className="underline">Aaron Heemskerk</a>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
