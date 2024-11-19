import { FC, useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarStyles } from "react-circular-progressbar/dist/types";

export interface TopBarProps {
    shipSpeed: number;
    oxygenLevel: number;
    shipMaxSpeed: number;
}

export const TopBar: FC<TopBarProps> = ({ shipSpeed, oxygenLevel, shipMaxSpeed }) => {

    const circleStyles: CircularProgressbarStyles = {
        "text": { "fill": "orange" },
        "path": { "stroke": "orange" },
    };

    const percentage = Math.ceil(shipSpeed / shipMaxSpeed);

    const BarLabel: FC<{ children?: React.ReactNode }> = ({ children }) => {
        return <p style={{ textAlign: "center" }}>{children}</p>
    }

    return (
        <div className="topbar" style={{ display: "flex", justifyContent: "space-around", height: "20%" }}>
            <div className='speedMeter' style={{ width: "10rem" }}>
                <BarLabel>Speed</BarLabel>
                <CircularProgressbar value={percentage} text={`${percentage}u/s`} styles={circleStyles} />
            </div>
            <div className='compass'>

            </div>
            <div className='oxygenLevel' style={{ width: "10rem" }}>
                <BarLabel>Oxygen</BarLabel>
                <CircularProgressbar value={Math.ceil(oxygenLevel)} text={`${Math.ceil(oxygenLevel)}%`} styles={circleStyles} />
            </div>
        </div>
    )
}