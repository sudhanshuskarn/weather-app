'use client'; // Ensure this is a client-side component

import { useEffect, useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"; // Importing social media icons

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  // Set the current year after component is mounted on the client
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-blue-600 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {currentYear ? currentYear : "Loading..."} Weather App by Sudhanshu S Karn. All Rights Reserved.
        </p>
        <div className="mt-4">
          <a
            href="https://github.com/sudhanshuskarn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white mx-2"
          >
            <FaGithub className="w-6 h-6 inline-block" />
          </a>
          <a
            href="https://www.linkedin.com/in/sudhanshu-karn-44653a214"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white mx-2"
          >
            <FaLinkedin className="w-6 h-6 inline-block" />
          </a>
        </div>
      </div>
    </footer>
  );
}

