import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useAuth } from "components/AuthProvider/hooks";
import { getCurrencies } from "entities/wallet/services";
import { selectAmount, selectCurrencies, selectCurrency } from "./selectors";
import { buy, sell, setCurrency } from "./slice";
import TradingForm from "./components/TradingForm";

interface Props {}

const Wallet: React.FC<Props> = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(selectCurrencies);
  const selectedCurrency = useAppSelector(selectCurrency);
  const userAmount = useAppSelector(selectAmount);

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  //
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const c = currencies.find((c) => c.symbol === e.target.value);
    dispatch(setCurrency(c!));
  };

  //
  const initialValuesBuy = {
    price: selectedCurrency?.buy,
    amount: 0,
  };

  const initialValuesSell = {
    price: selectedCurrency?.buy,
    amount: 0,
  };

  const handleBuy = (values: any) => {
    dispatch(buy(Number(values.amount)));
  };

  const handleSell = (values: any) => {
    dispatch(sell(Number(values.amount)));
  };

  return (
    <>
      <h1>Wallet</h1>
      <h3>{userAmount}</h3>
      {selectedCurrency && (
        <h3>
          {selectedCurrency.symbol}: {selectedCurrency.last * userAmount}
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

      {selectedCurrency && (
        <div>
          <TradingForm initialValues={initialValuesBuy} onSubmit={handleBuy} />
          <TradingForm
            initialValues={initialValuesSell}
            onSubmit={handleSell}
          />
        </div>
      )}

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
