import { FC, useEffect } from "react";
import marker from '../../assets/images/marker.png';
import { WinScreen } from "./WinScreen";
// import { setInterval } from "timers/promises";
// x -> horizontal
// y -> vertical
// z -> depth -> size

export interface ContentProps {
    distance: number;
    XCoordTrappist: number;
    YCoordTrappist: number;
}

export const Content: FC<ContentProps> = ({ distance, XCoordTrappist, YCoordTrappist }) => {

    useEffect(() => {
    }, [distance]);

    if(distance < 25){
        return <WinScreen />;
    }

    return (
        <div style={{ width: "5%", position: 'absolute', left: XCoordTrappist, top: YCoordTrappist }} >
            <img src={marker} width={100} ></img>
            <div style={{ textAlign: "center" }}>{Math.floor(distance)}U</div>
        </div>
    );
}