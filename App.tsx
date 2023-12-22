import { THEME } from './src/theme';
import { Routes } from './src/routes';
import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { NativeBaseProvider } from "native-base";
import { AuthContext, AuthContextProvider } from '@contexts/AuthContext';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { useState } from 'react';

export default function App() {
  const [fontLoad] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (

    <NativeBaseProvider theme={THEME} >

      <StatusBar
        backgroundColor='transparent'
        translucent
        barStyle='light-content' />
     
      <AuthContextProvider>
        {fontLoad ? <Routes /> : <Loading />}
      </AuthContextProvider>
     

    </NativeBaseProvider>
  );
}
