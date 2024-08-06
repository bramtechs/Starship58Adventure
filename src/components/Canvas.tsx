import React, { ReactNode } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

interface CanvasProps {
  width: number;
  height: number;
  children: ReactNode;
}

const Canvas: React.FC<CanvasProps> = ({ width, height, children }) => {
  const [background] = useImage('/assets/images/space-background.jpg');

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Image image={background} width={width} height={height} />
        {children}
      </Layer>
    </Stage>
  );
};

export default Canvas;