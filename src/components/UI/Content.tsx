import { FC, useEffect } from "react";
import marker from '../../assets/images/marker.png';
// import { setInterval } from "timers/promises";
// x -> horizontal
// y -> vertical
// z -> depth -> size

export interface ContentProps {
    distance: number;
    XCoordTrappist: number;
}

export const Content: FC<ContentProps> = ({distance, XCoordTrappist}) => {
    
    useEffect(() => {
        
    }, [distance]);
    
    return (
        <div style={{width:"5%", position:'absolute', left:XCoordTrappist}} >
            <img src={marker} width={100} ></img>
            <div style={{textAlign:"center"}}>{Math.floor(distance)}U</div>
        </div>
    );
}