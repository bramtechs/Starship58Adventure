import { FC } from "react";

// x -> horizontal
// y -> vertical
// z -> depth -> size

export const Content: FC = () => {
    const positionPlanet = {x: 0, y: 0, z: 0};
    
    const convertToPositionOnUI = (position: {x: number, y: number, z: number}) => {
        return {x: position.x, y: position.z};
    }
    return (
        <div style={{height:"60%"}}>
            
        </div>
    );
}