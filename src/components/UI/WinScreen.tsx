import {FC} from "react";

export const WinScreen: FC = () => {
    return <div className='text-center border-white border bg-light w-25 m-auto p-2 rounded'>
        <h1>Mission accomplished!</h1>
        <p>Would you like to play again?</p>
        <button onClick={() => window.location.reload()}>Yes</button>
    </div>
}