import React, { ReactNode } from 'react';
import { Stage as KonvaStage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

import spaceBackgroundImg from '@/assets/images/space-background.jpg';

interface CanvasProps {
  width: number;
  height: number;
  children: ReactNode;
}

export const Canvas: React.FC<CanvasProps> = ({ width, height, children }) => {
  const [background] = useImage(spaceBackgroundImg);

  return (
    <KonvaStage
      width={width}
      height={height}
      className='flex h-full justify-center items-center filter drop-shadow-[0_0_10px_rgba(0,0,0,1)]'
    >
      <Layer>
        <Image image={background} width={width} height={height} />
        {children}
      </Layer>
    </KonvaStage>
  );
};
