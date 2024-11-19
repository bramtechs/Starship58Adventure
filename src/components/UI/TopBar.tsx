import { FC, useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TopBarProps {
    speedShip: number;
}

export const TopBar: FC<TopBarProps> = ({ speedShip }) => {
    let [speed, setSpeed] = useState<number>(0);
    let [oxygenLevel, setOxygenLevel] = useState<number>(100);
    const interval = 30000;
    const percentage = speed / 100;


    useEffect(() => {
        const intervalId = setInterval(() => {
            setOxygenLevel(oxygenLevel - 1)
        }, interval);
        return () => clearInterval(intervalId);
    })
    useEffect(() => {
        setSpeed(speedShip);

    }
    , [speedShip])
    return (
    <div className="topbar" style={{display: "flex", justifyContent:"space-around", height:"20%"}}>
        <div className='speedMeter' style={{width:"10rem"}}>
            <button onClick={() => setSpeed(speed + 1000)}>Increase Speed</button>
            <CircularProgressbar value={percentage} text={`${percentage}u/s`} />;
        </div>
        <div className='compass'>

        </div>
        <div className='oxygenLevel' style={{width:"10rem"}}>
            <CircularProgressbar value={oxygenLevel} text={`${oxygenLevel}%`}/>;
        </div>
    </div>
    )
}