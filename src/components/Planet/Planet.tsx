import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import { Position } from '../../types';
import planetImg from '../../assets/images/planet.png'

export const Planet: React.FC<Position> = ({ x, y }) => {
  const [planetImage] = useImage(planetImg);

  return <Image image={planetImage} x={x} y={y} width={100} height={100} />;
};

