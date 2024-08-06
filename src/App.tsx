import {Canvas, Obstacle, Planet, Rocket, CommandCenter} from './components';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './utils/constants';

function App() {
  return (
    <div>
    <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <Rocket x={0} y={500}></Rocket>
      <Planet x={500} y={0}></Planet>
      <Obstacle x={300} y={300} rotation={0} dx={0} dy={0}></Obstacle>
    </Canvas>
    <CommandCenter onLaunch={() => console.log('LAUNCH')}></CommandCenter>
    </div>
  );
}

export default App;
