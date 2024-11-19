import { FC } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

export const BottomBar: FC = () => {
    const HullHealth = 60;
    const Objectives = ["Navigate to Trappist-1", "Collect samples", "Return to Earth"];

    
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
                <ProgressBar now={HullHealth} label={`${HullHealth}%`} />
            </div>
        </div>
    )
}