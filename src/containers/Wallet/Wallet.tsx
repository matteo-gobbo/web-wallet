import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useAuth } from "components/AuthProvider/hooks";
import { getCurrencies } from "entities/wallet/services";
import { selectCurrencies, selectCurrency } from "./selectors";
import { setCurrency } from "./slice";

interface Props {}

const Wallet: React.FC<Props> = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(selectCurrencies);
  const selectedCurrency = useAppSelector(selectCurrency);

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const c = currencies.find((c) => c.symbol === e.target.value);
    dispatch(setCurrency(c!));
  };

  return (
    <>
      <h1>Wallet</h1>
      {selectedCurrency && (
        <h3>
          {selectedCurrency.symbol}: {selectedCurrency.last}
        </h3>
      )}
      <div>
        Please select a currency
        <select onChange={handleChange}>
          <option value=""></option>
          {currencies.map((c) => (
            <option key={c.symbol} value={c.symbol}>
              {c.symbol}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() =>
          auth.signout(() => navigate("/login", { replace: true }))
        }
      >
        Logout
      </button>
    </>
  );
};

export default Wallet;
