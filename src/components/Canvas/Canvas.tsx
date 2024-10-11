import React, { ReactNode } from 'react';
import { Stage as KonvaStage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import styled from 'styled-components';

import spaceBackgroundImg from '../../assets/images/space-background.jpg';

interface CanvasProps {
  width: number;
  height: number;
  children: ReactNode;
}

const Stage = styled(KonvaStage)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 0px 10px #000000);
`;

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
