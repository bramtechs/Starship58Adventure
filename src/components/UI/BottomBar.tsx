import { FC } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

export interface BottomBarProps {
    HullHealth: number;
    Objectives: string[];
}

export const BottomBar: FC<BottomBarProps> = ({ HullHealth, Objectives }) => {

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
                <ProgressBar now={HullHealth} label={`${Math.ceil(HullHealth)}%`} style={{ width: 300, height: 50, backgroundColor: "orange" }} variant="danger" />
            </div>
        </div>
    )
}