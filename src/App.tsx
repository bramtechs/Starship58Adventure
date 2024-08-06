import { Star } from 'react-konva';
import Canvas from './components/Canvas';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './utils/constants';

function App() {
  return (
    <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <Star
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill='#89b717'
      ></Star>
    </Canvas>
  );
}

export default App;
