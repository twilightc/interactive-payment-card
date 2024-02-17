import { useState } from 'react';
import './Card.scss';

// card bg
// https://i.imgur.com/5XHCjPT.jpg
// chip icon
// https://i.imgur.com/7xhP2ZA.png
// visa(bankname) icon
// https://i.imgur.com/lokBLnp.png

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isCardFlipped = isFlipped ? 'card-flipped' : '';

  const cardNumbers = Array.from({ length: 19 }).map((_, index) => {
    return [4, 9, 14].includes(index) ? <span>&nbsp;</span> : <span>#</span>;
  });

  return (
    <div className="max-w-[400px] h-[260px] mx-auto" style={{ perspective: '800px' }}>
      {/* sticky */}
      <div
        className={`card relative w-full h-full ${isCardFlipped}`}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => {
          setIsFlipped(!isFlipped);
        }}
      >
        {/* flex flex-col justify-evenly */}
        <div className="card-front absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <div className="card-front-background absolute w-full h-full  overflow-hidden rounded-[8px]">
            <img src="https://i.imgur.com/5XHCjPT.jpg" alt="card-background" />
          </div>

          <div className="grid gap-y-[35px] h-full px-[15px] py-[20px]">
            <div className="flex justify-between h-[45px]">
              <img src="https://i.imgur.com/7xhP2ZA.png" alt="chip" />
              <img src="https://i.imgur.com/lokBLnp.png" alt="visa_type" />
            </div>

            <div className="text-white">{cardNumbers}</div>

            <div className="flex justify-between text-white">
              <div>
                <div>Card Holder</div>
                <span>A</span>
              </div>
              <div>
                <div>Expires</div>
                <span>MM/YY</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-back absolute w-full h-full"
          style={{
            transform: 'rotateY(180deg) translateZ(10px)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="card-back-background absolute w-full h-full overflow-hidden rounded-[8px]">
            <img src="https://i.imgur.com/5XHCjPT.jpg" alt="card-background" />
          </div>

          <div className="grid gap-y-[15px] h-full">
            <div className="w-full h-[40px] mt-[35px] bg-[#000000] rounded-[5px]"></div>

            <div className="px-[15px]">
              <div className="text-right text-white">CVV/CVC</div>
              <input type="text" />
            </div>

            <div className="flex h-[45px] px-[15px] mb-[20px]">
              <img src="https://i.imgur.com/lokBLnp.png" alt="visa_type" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
