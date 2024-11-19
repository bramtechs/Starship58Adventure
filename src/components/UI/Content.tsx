import { FC, useEffect } from "react";
import marker from '../../assets/images/marker.png';
// import { setInterval } from "timers/promises";
// x -> horizontal
// y -> vertical
// z -> depth -> size

interface ContentProps {
    distance: number;
}

export const Content: FC<ContentProps> = ({distance}) => {
    const positionPlanet = {x: 0, y: 0};
    let interval = 1000;
    useEffect(() => {
        console.log(distance)
    }, [distance]);
    
    return (
        <div>
            <img src={marker} width={100} ></img>
        </div>
    );
}