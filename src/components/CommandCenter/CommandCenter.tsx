import React, { useContext, useState } from "react";
import { GameStateContext } from "@/contexts/GameStateContext";
import { useForm } from "react-hook-form";

interface CommandCenterProps {
  onLaunch: () => void;
  isGameRunning: boolean;
}

const inputStyle =
  " w-full py-2 px-3 outline-none bg-sky-50  border-b-2 border-sky-900";

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onLaunch,
  isGameRunning,
}) => {
  const { register, handleSubmit, watch } = useForm();
  const inputX = watch("inputX");
  const inputY = watch("inputY");
  const inputRotation = watch("inputRotation");

  const { gameState, setDirection, setRotation } =
    useContext(GameStateContext)!;

  // Handler for form submission
  const onSubmit = () => {
    // Normalize the direction vector
    const magnitude = Math.sqrt(inputX * inputX + inputY * inputY);
    setRotation(parseInt(inputRotation));

    if (magnitude === 0) {
      return;
    }
    const normalizedDirection = {
      x: inputX / magnitude,
      y: inputY / magnitude,
    };
    setDirection(normalizedDirection);
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      <div className="relative z-[1] m-10 flex flex-col justify-center items-center flex-grow">
        <div className="rounded-lg p-8 border-2 border-sky-900 flex flex-col w-full flex-grow filter">
          <h2 className="text-center text-2xl font-bold mb-4 pb-4 border-b-2 border-sky-900">
            Command Center
          </h2>
          {gameState && (
            <>
              <p className="mb-2">
                Oxygen Level: {gameState.oxygen.toFixed(2)}
              </p>
              <p className="mb-4">
                Rocket Position: ({gameState.rocket.x.toFixed(2)},{" "}
                {gameState.rocket.y.toFixed(2)})
              </p>
            </>
          )}
          {/* Students can build their form here */}
          {/* This form is just to demonstrate how it works, but we’ll need to remove it so that students can build it themselves.*/}{" "}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Direction X:
              </label>
              <input
                type="number"
                className={inputStyle}
                {...register("inputX")}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Direction Y:
              </label>
              <input
                type="number"
                className={inputStyle}
                {...register("inputY")}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                Rotation (degrees):
              </label>
              <input
                type="number"
                {...register("inputRotation")}
                className={inputStyle}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-sky-900 text-white hover:bg-blue-700 font-bold py-4 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Set Direction
              </button>
            </div>
          </form>
          {/* Form ends here */}
        </div>
        <button
          onClick={onLaunch}
          disabled={isGameRunning}
          className="bg-red-500 text-white font-bold text-xl py-4 px-8 rounded-[10px] cursor-pointer m-8 filter transform transition duration-300 hover:bg-red-700 hover:scale-105 disabled:bg-gray-500 disabled:cursor-default"
        >
          LAUNCH
        </button>
      </div>
    </div>
  );
};
