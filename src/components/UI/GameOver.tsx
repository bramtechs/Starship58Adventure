import {FC} from 'react';

export const GameOver: FC = () => {
    function playAgain() {
        window.location.reload();
    }
    return (
        <div className='text-center border-white border bg-light w-25 m-auto p-2 rounded'>
            <h1>Game Over</h1>
            <p>Would you like to play again?</p>
            <button onClick={playAgain}>Yes</button>
        </div>
    )
}