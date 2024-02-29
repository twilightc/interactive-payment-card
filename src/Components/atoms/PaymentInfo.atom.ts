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

const focusTargetAtom = atom<
  'cardNumbers' | 'cardName' | 'expireYear' | 'expireMonth' | 'cvvCode' | ''
>('');

const focusBoxCssAtom = atom({
  width: '100%',
  height: '100%',
  transform: ''
});

export {
  cardNumbersAtom,
  cardHolderAtom,
  cardExpireAtom,
  cardCVVAtom,
  focusTargetAtom,
  focusBoxCssAtom
};
