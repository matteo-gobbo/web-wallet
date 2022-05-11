import { useAppDispatch } from "app/hooks";
import { getCurrencies } from "entities/wallet/services";
import { useEffect } from "react";
import { buy, init, reset, sell } from "./slice";

export const useFetchCurrencies = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  return;
};

export const useSetWalletInitialValues = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return;
};

export const useResetWalletValues = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(reset());
};

export const useBuy = () => {
  const dispatch = useAppDispatch();
  return (value: number) => dispatch(buy(value));
};

export const useSell = () => {
  const dispatch = useAppDispatch();
  return (value: number) => dispatch(sell(value));
};
