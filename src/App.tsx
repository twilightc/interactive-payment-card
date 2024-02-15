import { useState } from 'react';
import './App.css';
import CardForm from './Components/CardForm/CardForm';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);

  const isCardFlipped = isFlipped ? 'card-flipped' : '';

  return (
    <>
      <div className="w-[400px] h-[200px]" style={{ perspective: '800px' }}>
        <div
          className={`relative w-full h-full card ${isCardFlipped}`}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
        >
          <div className="card-common card-front" style={{ background: '#ff0000' }}>
            front
          </div>
          <div
            className="card-common card-back"
            style={{
              background: '#0000ff',
              transform: 'rotateY(180deg)'
            }}
          >
            back
          </div>
        </div>
      </div>
      <div className="mt-[50px]"></div>
      <CardForm></CardForm>
    </>
  );
}

export default App;
