import { atom } from 'jotai';

// expect 19 columns totally
const cardNumbersAtom = atom('');
const cardHolderAtom = atom('');
// format: MM/YY
const cardExpireAtom = atom({
  month: '',
  year: ''
});
const cardCVVAtom = atom('');

export { cardNumbersAtom, cardHolderAtom, cardExpireAtom, cardCVVAtom };
