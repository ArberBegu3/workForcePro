import React from "react";
import taskImg from "@/assets/img/Tasks.png"
export const Webimage = () => {
  return (
    <div className="w-full mx-auto mt-20 text-center md:w-10/12">
      <div className="relative z-0 w-full mt-8">
        <div className="relative overflow-hidden shadow-2xl">
            <div className="flex items-center flex-none px-4 bg-red-700 rounderd-b-none h-8 rounded-xl">
                <div className="flex space-x-1.5">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                </div>
            </div>
            <img src={taskImg} alt="task-img-demo" />
        </div>
      </div>
    </div>
  );
};
