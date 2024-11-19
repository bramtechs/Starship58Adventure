import { FC, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { GameOver } from "./GameOver";

export interface BottomBarProps {
    HullHealth: number;
    Objectives: string[];
}

export const BottomBar: FC<BottomBarProps> = ({HullHealth, Objectives}) => {
    let [Health, setHealth] = useState<number>(0);
    useEffect(() => {
        setHealth(HullHealth);
    }, [HullHealth]);

    if (Health <= 0) {
        return <GameOver />;
    }
    return (
        <div className="bottombar" style={{ display: "flex", justifyContent: "space-around", height: "20%", "width": "100vw", position: "absolute", bottom: 0 }}>
            <div className='Objective'>
                <h2>Objectives</h2>
                <ul style={{ "listStyleType": "circle" }}>
                    {Objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                    ))}
                </ul>
            </div>
            <div className='HullHealth'>
                <ProgressBar now={Health} label={`${Math.round(Health)}%`} style={{width: 200}} />
            </div>
        </div>
    )
}