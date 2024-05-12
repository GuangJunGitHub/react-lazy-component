import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Suspense, useState } from 'react';
import { LazyLoad } from '../../../dist/index';


function App() {

const [pic] = useState(
  viteLogo
);

return (
  <>
    <LazyLoad>
      1、<img src={pic} style={{ height: '1000px' }}></img>
    </LazyLoad>
    <LazyLoad rootMargin={'10%'}>
      2、<img src={pic} style={{ height: '1000px' }}></img>
    </LazyLoad>
    <LazyLoad threshold={0.2}>
      3、<img src={pic} style={{ height: '1000px' }}></img>
    </LazyLoad>

    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoad threshold={0.5} freeOnceVisible={true}>
        4、<img src={pic} style={{ height: '1000px' }}></img>
      </LazyLoad>
    </Suspense>
  </>
);
}

export default App
