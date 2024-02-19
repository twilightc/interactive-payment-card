import { useAtom } from 'jotai';
import './CardForm.scss';
import {
  cardCVVAtom,
  cardExpireAtom,
  cardHolderAtom,
  cardNumbersAtom
} from '../atoms/PaymentInfo.atom';

const CardForm = () => {
  const [cardNumbers, setCardNumber] = useAtom(cardNumbersAtom);
  const [cardHolder, setCardHolder] = useAtom(cardHolderAtom);
  const [cardExpire, setCardExpire] = useAtom(cardExpireAtom);
  const [cardCVV, setCardCVV] = useAtom(cardCVVAtom);

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

  return (
    <form className="card-form grid grid-cols-3 px-[15px] py-[20px] [&>div]:mt-[10px] overflow-auto">
      <div className="col-span-3">
        <label htmlFor="card-number">Card Number</label>
        <input type="text" id="card-number" value={cardNumbers} onChange={handleCardNumberChange} />
      </div>
      <div className="col-span-3">
        <label htmlFor="card-name">Card Name</label>
        <input
          type="text"
          id="card-name"
          value={cardHolder}
          onChange={(e) => {
            setCardHolder(e.target.value);
          }}
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
            value={cardExpire.month}
            onChange={(e) => {
              setCardExpire((cardExpire) => ({
                ...cardExpire,
                month: e.target.value
              }));
            }}
          >
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
          </select>
          <select
            name="expiration-year"
            id="expiration-year"
            defaultValue={'Year'}
            value={cardExpire.year}
            onChange={(e) => {
              setCardExpire((cardExpire) => ({
                ...cardExpire,
                year: e.target.value
              }));
            }}
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
          onChange={(e) => {
            setCardCVV(e.target.value);
          }}
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
