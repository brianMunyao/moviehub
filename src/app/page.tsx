import Button from "@/components/global/button";
import NavBar from "@/components/global/navbar";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

const HomePage = () => {
  return (
    <main className="">
      <NavBar />
      <h1>HomePage</h1>
    </main>
  );
};

export default HomePage;
