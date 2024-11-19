import { FC } from 'react';
import { TopBar, TopBarProps } from './components/UI/TopBar';
import { BottomBar } from './components/UI/BottomBar';
import { Content } from './components/UI/Content';

export const UI: FC<TopBarProps> = (props) => {
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
            <TopBar shipSpeed={props.shipSpeed} oxygenLevel={props.oxygenLevel} shipMaxSpeed={props.shipMaxSpeed} />
            <Content />
            <BottomBar />
        </div>


    )
};
