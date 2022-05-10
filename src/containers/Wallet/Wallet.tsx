import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useAuth } from "components/AuthProvider/hooks";
import { getCurrencies } from "entities/wallet/services";
import { selectAmount, selectCurrencies, selectCurrency } from "./selectors";
import { buy, sell, setCurrency } from "./slice";
import TradingForm from "./components/TradingForm";
import { SiBitcoinsv } from "react-icons/si";
import { BiBitcoin } from "react-icons/bi";

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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full">
        <div className="flex justify-between py-4 mx-16">
          <img
            className="h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <button
            onClick={() =>
              auth.signout(() => navigate("/login", { replace: true }))
            }
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
        <div className="flex justify-center my-8">
          <span className="mr-4 flex items-center">
            Please select a currency
          </span>
          <select
            onChange={handleChange}
            className="rounded relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value=""></option>
            {currencies.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center w-1/4 bg-indigo-100 mx-auto p-4">
          <div className="flex items-center	mr-4">
            <SiBitcoinsv size={30} className="text-indigo-500" />
          </div>
          <div>
            <div className="flex items-center text-lg">
              {userAmount} <BiBitcoin />
            </div>
            <div>
              {selectedCurrency && (
                <h3>
                  {selectedCurrency.last * userAmount} {selectedCurrency.symbol}
                </h3>
              )}
            </div>
          </div>
        </div>

        {selectedCurrency && (
          <div className="flex justify-center space-x-8 p-8">
            <TradingForm
              initialValues={initialValuesBuy}
              onSubmit={handleBuy}
              textButton="Buy"
              additionalClassesButton="bg-green-600 hover:bg-green-700 disabled:bg-green-100"
            />
            <TradingForm
              initialValues={initialValuesSell}
              onSubmit={handleSell}
              textButton="Sell"
              additionalClassesButton="bg-red-600 hover:bg-red-700 disabled:bg-red-100"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
