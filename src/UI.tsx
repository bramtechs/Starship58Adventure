import { FC } from 'react';
import { TopBar, TopBarProps } from './components/UI/TopBar';
import { Content, ContentProps } from './components/UI/Content';
import { BottomBar, BottomBarProps } from './components/UI/BottomBar';

export const UI: FC<TopBarProps & ContentProps & BottomBarProps> = (props) => {
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
            <Content distance={props.distance} XCoordTrappist={props.XCoordTrappist} YCoordTrappist={props.YCoordTrappist} onWin={props.onWin} lost={props.lost} />
            <BottomBar HullHealth={props.HullHealth} Objectives={props.Objectives} />
        </div>


    )
};
