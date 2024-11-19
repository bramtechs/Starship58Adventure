import { FC } from 'react';
import { TopBar } from './components/UI/TopBar';
import { BottomBar } from './components/UI/BottomBar';
import { Content } from './components/UI/Content';

export const UI: FC = () => {
    const speedShip = 69;
    const HullHealth = 60;
    const Objectives = ["Navigate to Trappist-1", "Collect samples", "Return to Earth"];

    return (
        <div style={
            {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                color: "orange"
            }
        }>
            <TopBar speedShip={speedShip} />
            <Content />
            <BottomBar HullHealth={HullHealth} Objectives={Objectives}/>
        </div>


    )
};
