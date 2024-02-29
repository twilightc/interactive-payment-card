import { useAtom, useSetAtom } from 'jotai';
import './CardForm.scss';
import {
  cardCVVAtom,
  cardExpireAtom,
  cardHolderAtom,
  cardNumbersAtom,
  focusTargetAtom,
  isFocusingAtom
} from '../atoms/PaymentInfo.atom';
import { useEffect, useRef } from 'react';

const CardForm = () => {
  const [cardNumbers, setCardNumber] = useAtom(cardNumbersAtom);
  const [cardHolder, setCardHolder] = useAtom(cardHolderAtom);
  const [cardCVV, setCardCVV] = useAtom(cardCVVAtom);
  const [focusTarget, setFocusTarget] = useAtom(focusTargetAtom);
  const [isFocusing, setIsFocusing] = useAtom(isFocusingAtom);
  const setCardExpire = useSetAtom(cardExpireAtom);

  const isFocusingRef = useRef(isFocusing);
  isFocusingRef.current = isFocusing;

  const cardNumberRef = useRef<HTMLInputElement>(null);
  const cardNameRef = useRef<HTMLInputElement>(null);
  const expireMonthRef = useRef<HTMLSelectElement>(null);
  const expireYearRef = useRef<HTMLSelectElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rule = /^(\d{0,4}\s?){0,4}$/;
    const inputCardNumbers = e.target.value.replace(/\s/g, '');

    if (inputCardNumbers === '' || rule.test(inputCardNumbers)) {
      let newCardNumbers = '';
      // first, iterate input and put char to responding position
      for (let index = 0; index < inputCardNumbers.length; index++) {
        newCardNumbers += inputCardNumbers[index];
        if ([3, 7, 11].includes(index)) {
          newCardNumbers += ' ';
        }
      }
      // second, erase unnecessary space for case (e.g. 1234 ,1234 5678 )
      newCardNumbers = newCardNumbers.trimEnd();

      setCardNumber(newCardNumbers);
    }
  };

  const handleSetFocusField = (
    key: '' | 'cardNumbers' | 'cardName' | 'expireYear' | 'expireMonth' | 'cvvCode'
  ) => {
    if (key === '') {
      return;
    }

    switch (key) {
      case 'cardNumbers':
        cardNumberRef.current?.focus();
        break;
      case 'cardName':
        cardNameRef.current?.focus();
        break;
      case 'expireMonth':
        expireMonthRef.current?.focus();
        break;
      case 'expireYear':
        expireYearRef.current?.focus();
        break;
      case 'cvvCode':
        cvvRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const handleBlur = () => {
    setIsFocusing(false);

    setTimeout(() => {
      if (!isFocusingRef.current) {
        setFocusTarget('');
      }
    }, 150);
  };

  useEffect(() => {
    handleSetFocusField(focusTarget);
  }, [focusTarget]);

  return (
    <form className="card-form grid grid-cols-3 px-[15px] py-[20px] [&>div]:mt-[10px] overflow-auto">
      <div className="col-span-3">
        <label htmlFor="card-number">Card Number</label>
        <input
          type="text"
          id="card-number"
          value={cardNumbers}
          onFocus={() => {
            setFocusTarget('cardNumbers');
            setIsFocusing(true);
          }}
          onBlur={() => handleBlur()}
          onChange={(e) => {
            handleCardNumberChange(e);
          }}
          ref={cardNumberRef}
          autoFocus
        />
      </div>
      <div className="col-span-3">
        <label htmlFor="card-name">Card Name</label>
        <input
          type="text"
          id="card-name"
          value={cardHolder}
          onFocus={() => {
            setFocusTarget('cardName');
            setIsFocusing(true);
          }}
          onBlur={() => handleBlur()}
          onChange={(e) => {
            setCardHolder(e.target.value);
          }}
          ref={cardNameRef}
        />
      </div>
      <div className="col-span-2">
        <div>
          <label htmlFor="expiration-date">Expiration Date</label>
        </div>
        <div className="flex gap-[3px]">
          <select
            name="expiration-month"
            id="expiration-month"
            defaultValue={'Month'}
            onFocus={() => {
              setFocusTarget('expireMonth');
              setIsFocusing(true);
            }}
            onBlur={() => handleBlur()}
            onChange={(e) => {
              setCardExpire((cardExpire) => ({
                ...cardExpire,
                month: e.target.value
              }));
            }}
            ref={expireMonthRef}
          >
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
          </select>
          <select
            name="expiration-year"
            id="expiration-year"
            defaultValue={'Year'}
            onFocus={() => {
              setFocusTarget('expireYear');
              setIsFocusing(true);
            }}
            onBlur={() => handleBlur()}
            onChange={(e) => {
              setCardExpire((cardExpire) => ({
                ...cardExpire,
                year: e.target.value
              }));
            }}
            ref={expireYearRef}
          >
            <option value="2024">2020</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>
      <div className="ml-[10px]">
        <label htmlFor="cvvAKAcvc">CVV/CVC</label>
        <input
          type="text"
          id="cvvAKAcvc"
          value={cardCVV}
          onFocus={() => {
            setFocusTarget('cvvCode');
            setIsFocusing(true);
          }}
          onBlur={() => handleBlur()}
          onChange={(e) => {
            setCardCVV(e.target.value);
          }}
          ref={cvvRef}
        />
      </div>
      <div className="col-span-3">
        <button className="form-button w-full h-[45px] mt-[20px] bg-[#2364d2] rounded-[5px] text-[#ffffff] text-[1rem] font-[500]">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CardForm;
