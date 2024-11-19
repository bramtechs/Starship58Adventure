import { FC, useEffect, useState } from "react";

export const FadeIn: FC = () => {

    const [opacity, setOpacity] = useState<number>(1);

    useEffect(() => {
        let interval = setInterval(() => {
            setOpacity((prev) => Math.max(0, prev - 0.03));
        }, 1000 / 60);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return <div style={{ position: "absolute", width: "100vw", height: "100vh", "backgroundColor": "black", opacity: opacity }}></div>
}