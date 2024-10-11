import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import { Position } from '../../types';

interface PlanetProps extends Position {
  planetImg: string
}

export const Planet: React.FC<PlanetProps> = ({ x, y, planetImg }) => {
  const [planetImage] = useImage(planetImg);

  return <Image image={planetImage} x={x} y={y} width={100} height={100} />;
};

