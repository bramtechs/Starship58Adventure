import { FC, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { GameOver } from "./GameOver";

interface BottomBarProps {
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
        <div className="bottombar" style={{display: "flex", justifyContent:"space-around", height:"20%"}}>
            <div className='Objective'>
                <h2>Objectives</h2>
                <ul>
                    {Objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                    ))}
                </ul>
            </div>
            <div className='ProximityRadar'>radar</div>
            <div className='HullHealth'>
                <ProgressBar now={Health} label={`${Health}%`} style={{width: 200}} />
            </div>
        </div>
    )
}