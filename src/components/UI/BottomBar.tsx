import { FC } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface BottomBarProps {
    HullHealth: number;
    Objectives: string[];
}

export const BottomBar: FC<BottomBarProps> = ({HullHealth, Objectives}) => {

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
                <ProgressBar now={HullHealth} label={`${HullHealth}%`} style={{width: 200}} />
            </div>
        </div>
    )
}