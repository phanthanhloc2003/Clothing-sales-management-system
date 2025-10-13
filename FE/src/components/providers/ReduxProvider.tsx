"use client";
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '@/components/ui/Loading';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading overlay text="Đang tải dữ liệu..." />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
