import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAmount, selectCurrencies, selectCurrency } from "./selectors";
import { setCurrency } from "./slice";
import TradingForm from "./components/TradingForm";
import { SiBitcoinsv } from "react-icons/si";
import { BiBitcoin } from "react-icons/bi";
import { validateBuyAmount, validateSellAmount } from "entities/wallet/utils";
import { useLogout } from "containers/Login/hooks";
import { fakeAuthProvider } from "utils/fakeAuthProvider";
import {
  useBuy,
  useFetchCurrencies,
  useResetWalletValues,
  useSell,
  useSetWalletInitialValues,
} from "./hooks";

interface Props {}

const Wallet: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //
  const logout = useLogout();
  const resetWalletValues = useResetWalletValues();
  const buy = useBuy();
  const sell = useSell();

  //
  useFetchCurrencies();
  useSetWalletInitialValues();

  //
  const currencies = useAppSelector(selectCurrencies);
  const selectedCurrency = useAppSelector(selectCurrency);
  const userAmount = useAppSelector(selectAmount);

  //
  const handleLogout = () => {
    fakeAuthProvider.signout(() => {
      resetWalletValues();
      logout();
      localStorage.removeItem("username");
      navigate("/login", { replace: true });
    });
  };

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

  return (
    <div className="min-h-full flex items-center justify-center py-6 py-md-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full">
        <div className="flex justify-between py-4 mx-md-16">
          <img
            className="h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <button
            onClick={handleLogout}
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
        <div className="flex justify-center w-md-1/4 bg-indigo-100 mx-auto p-4">
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
          <div className="md:flex justify-center space-y-8 md:space-y-0 md:space-x-8 py-8">
            <TradingForm
              initialValues={initialValuesBuy}
              onSubmit={(values: any) => buy(values.amount)}
              textButton="Buy"
              additionalClassesButton="bg-green-600 hover:bg-green-700 disabled:bg-green-100"
              userAmount={userAmount}
              validateAmount={validateBuyAmount}
            />
            <TradingForm
              initialValues={initialValuesSell}
              onSubmit={(values: any) => sell(values.amount)}
              textButton="Sell"
              additionalClassesButton="bg-red-600 hover:bg-red-700 disabled:bg-red-100"
              userAmount={userAmount}
              validateAmount={validateSellAmount}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
