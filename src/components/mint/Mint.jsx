import React, {useState} from 'react';

import {mint} from '../../utils/wallet';

const Mint = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const address = event.target.address.value;
      const amount = event.target.amount.value;

      const op = await mint(address, amount);

      console.log(op);
      setMessage('Minted Successfully!');

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage('Error: Not Able to Mint');
    }
  };

  const closeMessage = () => {
    setMessage('');
  };

  return (
    <div className="container">
      {message && (
        <div className="position-fixed top-0 end-0 p-3" style={{zIndex: 11}}>
          <div id="liveToast" className="toast fade show d-flex" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">{message}</div>
            <button type="button" className="btn-close me-2 m-auto" onClick={closeMessage}></button>
          </div>
        </div>
      )}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input type="text" className="form-control" id="address" aria-describedby="address" required />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            aria-describedby="amount"
            required
            min="1"
            step="1"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
          Mint
        </button>
      </form>
    </div>
  );
};

export default Mint;
