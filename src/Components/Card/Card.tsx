import { useState } from 'react';
import './Card.scss';

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isCardFlipped = isFlipped ? 'card-flipped' : '';

  return (
    <div className="w-[400px] h-[200px] mx-auto" style={{ perspective: '800px' }}>
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
  );
};

export default Card;