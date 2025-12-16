import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import {Lightbulb, MoveRight} from "lucide-react"
import { Webimage } from "@/components/shared/landing/Webimage";
const LandingPage = () => {
  return (
    <>
      <main className="pt-24 bg-white">
  <div className="px-12 mx-auto max-w-7xl">
    <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
      <h1 className="mb-8 font-extrabold leading-none tracking-normal text-slate-800 md:text-6xl text-4xl md:tracking-tight">
        <span>Start</span>
        <span className="mr-2">&nbsp;</span> {/* Space after "Start" */}
        <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-red-900 to-red-600 lg:inline">
             Managing Employees
        </span>
        <br /> {/* Moves "with our product" to a new line */}
        <span>with our product</span>
      </h1>
      <p className="px-0 text-lg text-gray-600 md:text-xl lg:px-24">
      Start gaining the traction you{"'"}ve always wanted with our next-level templates and designs. Crafted to help
      you tell your story.
      </p>
      <div className="mb-4 space-x-2 md:space-x-2 md:mb-8">
        <Button className="bg-red-700 hover:bg-red-900" asChild>
        <Link to="/login">Get Started<MoveRight/></Link>

        </Button>
        <Button variant="secondary" asChild>
        <Link to="/register">Sign Up <Lightbulb/></Link>
        </Button>
      </div>
    </div>
     <Webimage/>
  </div>
</main>


    </>
  );
};

export default LandingPage;
