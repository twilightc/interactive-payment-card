import './CardForm.scss';

const CardForm = () => {
  return (
    <form className="card-form grid grid-cols-3 px-[15px] py-[20px] [&>div]:mt-[10px] overflow-auto">
      <div className="col-span-3">
        <label htmlFor="card-number">Card Number</label>
        <input type="text" id="card-number" />
      </div>
      <div className="col-span-3">
        <label htmlFor="card-name">Card Name</label>
        <input type="text" id="card-name" />
      </div>
      <div className="col-span-2">
        <div>
          <label htmlFor="expiration-date">Expiration Date</label>
        </div>
        <div className="flex gap-[3px]">
          <select name="expiration-month" id="expiration-month">
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
          </select>
          <select name="expiration-year" id="expiration-year">
            <option value="">Jan</option>
            <option value="">Feb</option>
            <option value="">Mar</option>
          </select>
        </div>
      </div>
      <div className="ml-[10px]">
        <label htmlFor="cvvAKAcvc">CVV/CVC</label>
        <input type="text" id="cvvAKAcvc" />
      </div>
      <div>
        <button className="form-button w-full h-[45px] mt-[20px] bg-[#2364d2] rounded-[5px] text-[#ffffff] text-[1rem] font-[500]">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CardForm;
