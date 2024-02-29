import { useCallback, useEffect, useRef, useState } from 'react';
import './Card.scss';
import { useAtom, useSetAtom } from 'jotai';
import {
  cardCVVAtom,
  cardExpireAtom,
  cardHolderAtom,
  cardNumbersAtom,
  focusTargetAtom,
  focusBoxCssAtom,
  isFocusingAtom
} from '../atoms/PaymentInfo.atom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const Card = () => {
  const [cardNumbers] = useAtom(cardNumbersAtom);
  const [cardHolder] = useAtom(cardHolderAtom);
  const [cardExpire] = useAtom(cardExpireAtom);
  const [cardCVV] = useAtom(cardCVVAtom);
  const [focusTarget, setFocusTarget] = useAtom(focusTargetAtom);
  const [focusBoxCss, setFocusBoxCss] = useAtom(focusBoxCssAtom);
  const setIsFocusing = useSetAtom(isFocusingAtom);

  const cardNumbersRef = useRef<HTMLDivElement>(null);
  const cardNameRef = useRef<HTMLDivElement>(null);
  const expireDateRef = useRef<HTMLDivElement>(null);
  const cvvCodeRef = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);

  const isCardFlipped = isFlipped ? 'card-flipped' : '';

  const handleFocusBoxPos = useCallback(
    (target: '' | 'cardNumbers' | 'cardName' | 'expireYear' | 'expireMonth' | 'cvvCode') => {
      if (target === '') {
        return;
      }

      let node: HTMLDivElement | null = null;
      switch (target) {
        case 'cardNumbers':
          node = cardNumbersRef.current;
          break;
        case 'cardName':
          node = cardNameRef.current;
          break;
        case 'expireYear':
          node = expireDateRef.current;
          break;
        case 'expireMonth':
          node = expireDateRef.current;
          break;
        case 'cvvCode':
          node = cvvCodeRef.current;
          break;
        default:
          break;
      }

      if (target === 'cvvCode') {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }

      setFocusBoxCss({
        width: `${node?.offsetWidth ?? 0}px`,
        height: `${node?.offsetHeight ?? 0}px`,
        transform: `translate(${node?.offsetLeft}px, ${node?.offsetTop}px)`
      });
    },
    [setFocusBoxCss]
  );

  useEffect(() => {
    handleFocusBoxPos(focusTarget);
  }, [focusTarget, handleFocusBoxPos]);

  const cardNumbersList = Array.from({ length: 19 }).map((_, index) =>
    [4, 9, 14].includes(index) ? (
      <span className="!w-[10px] md:!w-[30px]" key={`blank-${index}`}></span>
    ) : (
      <SwitchTransition key={`cardNumberPos-${index}`}>
        <CSSTransition
          key={`fragment-${index < cardNumbers.length ? cardNumbers[index] : '#'}`}
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
          classNames="card-number-transition"
        >
          <span key={`cardNumberPos-${index}`}>
            {index < cardNumbers.length ? cardNumbers[index] : '#'}
          </span>
        </CSSTransition>
      </SwitchTransition>
    )
  );

  return (
    <div className="max-w-[400px] h-[260px] mx-auto" style={{ perspective: '800px' }}>
      <div
        className={`card relative w-full h-full ${isCardFlipped}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="card-front absolute w-full sm:h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className={`focus-box ${focusTarget !== '' ? 'focus-box--active' : ''}`}
            style={focusBoxCss}
          ></div>
          <div className="card-front-background absolute w-full overflow-hidden rounded-[8px]">
            <img src="https://i.imgur.com/5XHCjPT.jpg" alt="card-background" />
          </div>

          <div className="grid gap-y-[10px] sm:gap-y-[35px] h-[90%] sm:h-full px-[15px] py-[20px]">
            <div className="flex justify-between h-[45px]">
              <img src="https://i.imgur.com/7xhP2ZA.png" alt="chip" />
              <img src="https://i.imgur.com/lokBLnp.png" alt="visa_type" />
            </div>

            <div
              ref={cardNumbersRef}
              className="card-number-list z-[3] sm:px-[15px] py-[10px] text-white text-[26px] cursor-pointer"
              onClick={() => {
                setFocusTarget('cardNumbers');
                setIsFocusing(true);
              }}
            >
              {cardNumbersList}
            </div>

            <div className="flex justify-between z-[3] text-white cursor-pointer">
              <div
                ref={cardNameRef}
                onClick={() => {
                  setFocusTarget('cardName');
                  setIsFocusing(true);
                }}
                className="p-[5px]"
              >
                <div>Card Holder</div>
                <span>{cardHolder || 'FULL NAME'}</span>
              </div>
              <div
                ref={expireDateRef}
                onClick={() => {
                  setFocusTarget('expireMonth');
                  setIsFocusing(true);
                }}
                className="p-[5px]"
              >
                <div>Expires</div>
                <span>
                  {cardExpire.month || 'MM'}/{cardExpire.year || 'YY'}
                </span>
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
          <div
            className={`focus-box ${focusTarget !== '' ? 'focus-box--active' : ''}`}
            style={focusBoxCss}
          ></div>
          <div className="card-back-background absolute w-full overflow-hidden rounded-[8px]">
            <img src="https://i.imgur.com/5XHCjPT.jpg" alt="card-background" />
          </div>

          <div className="grid sm:gap-y-[15px] h-[80%] sm:h-full">
            <div className="w-full h-[40px] mt-[15px] sm:mt-[35px] bg-[#000000] rounded-[5px]"></div>

            <div
              ref={cvvCodeRef}
              className="z-[3] mx-[5px] px-[10px] cursor-pointer"
              onClick={() => {
                setFocusTarget('cvvCode');
                setIsFocusing(true);
              }}
            >
              <div className="text-right text-white">CVV/CVC</div>
              <div className="w-full h-[40px] text-right pr-[15px] rounded-[5px] bg-[#ffffff] leading-[40px]">
                {cardCVV}
              </div>
            </div>

            <div className="flex h-[45px] px-[15px] sm:mb-[20px]">
              <img src="https://i.imgur.com/lokBLnp.png" alt="visa_type" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
