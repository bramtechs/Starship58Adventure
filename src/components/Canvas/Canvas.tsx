import React, { ReactNode } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

import spaceBackgroundImg from '../../assets/images/space-background.jpg';

interface CanvasProps {
  width: number;
  height: number;
  children: ReactNode;
}

export const Canvas: React.FC<CanvasProps> = ({ width, height, children }) => {
  const [background] = useImage(spaceBackgroundImg);

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Image image={background} width={width} height={height} />
        {children}
      </Layer>
    </Stage>
  );
};

