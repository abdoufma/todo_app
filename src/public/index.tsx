import "./styles.css";
import { createRoot } from "react-dom/client";
import Logo from "/Users/abdou/Desktop/remed_logo/square/remed_logo.svg";

document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<Index />);
});

export function Index() {
    return (
        <div className="container mx-auto p-4 h-screen flex flex-col justify-center items-center bg-[#f0f9ff]">
            <img src={Logo} alt="Electrobun Logo" className="w-32 h-32" />
            <h1 className="font-bold text-2xl text-blue-500 mt-4">Remed Server - Electrobun</h1>
            <p>Electrobun is a modern web framework for building web applications with Bun.</p>
            <p>It is inspired by <a href="https://nextjs.org/">Next.js</a> and <a href="https://electron.dev/">Electron</a>.</p>
        </div>
    );
}