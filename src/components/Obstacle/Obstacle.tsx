import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import { Obstacle as ObstacleType } from '../../types';
import asteroid from '@/assets/images/asteroid_1.webp'

export const Obstacle: React.FC<ObstacleType> = ({ x, y, rotation }) => {
  const [asteroidImage] = useImage(asteroid);

  return (
    <Image
      image={asteroidImage}
      x={x}
      y={y}
      width={50}
      height={50}
      rotation={rotation}
    />
  );
};