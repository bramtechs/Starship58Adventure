import { FC, useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export interface TopBarProps {
    shipSpeed: number;
    oxygenLevel: number;
    shipMaxSpeed: number;
}

export const TopBar: FC<TopBarProps> = ({ shipSpeed, oxygenLevel, shipMaxSpeed }) => {
    const percentage = Math.ceil(shipSpeed / shipMaxSpeed);
    return (
        <div className="topbar" style={{ display: "flex", justifyContent: "space-around", height: "20%" }}>
            <div className='speedMeter' style={{ width: "10rem" }}>
                <CircularProgressbar value={percentage} text={`${percentage}u/s`} />
            </div>
            <div className='compass'>

            </div>
            <div className='oxygenLevel' style={{ width: "10rem" }}>
                <CircularProgressbar value={Math.ceil(oxygenLevel)} text={`${Math.ceil(oxygenLevel)}%`} />
            </div>
        </div>
    )
}