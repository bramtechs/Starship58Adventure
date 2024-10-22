import React, { ReactNode } from "react";
import { Stage as KonvaStage, Layer, Image } from "react-konva";
import useImage from "use-image";

import spaceBackgroundImg from "@/assets/images/space-background.jpg";

interface CanvasProps {
  width: number;
  height: number;
  children: ReactNode;
}

export const Canvas: React.FC<CanvasProps> = ({ width, height, children }) => {
  const [background] = useImage(spaceBackgroundImg);

  return (
    <div className="flex h-full justify-center items-center filter">
      <div
        style={{ width: width, height: height }}
        className="rounded-lg border-4 border-sky-900 overflow-hidden"
      >
        <KonvaStage width={width} height={height}>
          <Layer>
            <Image image={background} width={width} height={height} />
            {children}
          </Layer>
        </KonvaStage>
      </div>
    </div>
  );
};
