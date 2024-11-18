import React, { useContext } from "react";
import { GameStateContext } from "@/contexts/GameStateContext";
import { useForm } from "react-hook-form";

interface CommandCenterProps {
  onLaunch: () => void;
  isGameRunning: boolean;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onLaunch,
  isGameRunning,
}) => {
  const { gameState, setDirection, setRotation } = useContext(GameStateContext)!;

  // MISSION BRIEFING: Navigation Control System
  // Cadet, your task is to implement the rocket's navigation system to get to the planet without crashing.
  // Remember: The fate of the mission depends on your calculations and creativity!
  const onSubmit = () => {
    // Your navigation code here, cadet!
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
              <p className="mb-2">Oxygen Level: {gameState.oxygen.toFixed(2)}</p>
              <p className="mb-4">
                Rocket Position: ({gameState.rocket.x.toFixed(2)}, {gameState.rocket.y.toFixed(2)})
              </p>
            </>
          )}
          {/* EQUIPMENT BAY: Control Interface
              Cadet, construct your control interface here.
          */}
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
