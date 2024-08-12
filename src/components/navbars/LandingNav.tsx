import Link from "next/link";
import React from "react";

const LandingNav = () => {
  return (
    <header className="bg-white shadow-md py-6 text-gray-500">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Homework Help</h1>
        <nav className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#testimonials">Testimonials</Link>
          <Link href="#about">About Us</Link>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <Link href={"/login"}> Get Started</Link>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default LandingNav;
