import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import { Position } from '../../types';
import starshipImg from '../../assets/images/starship.png';

export const Rocket: React.FC<Position> = ({ x, y }) => {
  const [starshipImage] = useImage(starshipImg);

  return <Image image={starshipImage} x={x} y={y} width={50} height={100} />;
};

