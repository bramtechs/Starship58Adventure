import { FC, useEffect } from "react";
import marker from '../../assets/images/marker.png';
import { WinScreen } from "./WinScreen";
import { GameOver } from "./GameOver";
// import { setInterval } from "timers/promises";
// x -> horizontal
// y -> vertical
// z -> depth -> size

export interface ContentProps {
    distance: number;
    XCoordTrappist: number;
    YCoordTrappist: number;
    lost: boolean;
    onWin: () => void;
}

export const Content: FC<ContentProps> = ({ distance, XCoordTrappist, YCoordTrappist, onWin, lost }) => {
    if (distance < 25) {
        onWin();
        return <WinScreen />;
    }

    if (lost) {
        return <GameOver />;
    }

    return (
        <div style={{ width: "5%", position: 'absolute', left: XCoordTrappist, top: YCoordTrappist }} >
            <img src={marker} width={100} ></img>
            <div style={{ textAlign: "center" }}>{Math.floor(distance)}U</div>
        </div>
    );
}