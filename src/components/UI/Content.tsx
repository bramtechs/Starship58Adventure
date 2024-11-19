import { FC } from "react";
import marker from '../../assets/images/marker.png';
// x -> horizontal
// y -> vertical
// z -> depth -> size

export const Content: FC = () => {
    const positionPlanet = {x: 0, y: 0};

    return (
        <div>
            <img src={marker} width={100} ></img>
        </div>
    );
}