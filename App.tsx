import { Loading } from '@components/Loading';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Box, NativeBaseProvider } from "native-base";
import { StatusBar } from 'react-native';
import { THEME } from './src/theme';
import { Routes } from './src/routes';
import { Home } from '@screens/Home';
export default function App() {
  const [fontLoad] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (

      <NativeBaseProvider theme={THEME} >

        <StatusBar
          backgroundColor='transparent'
          translucent
          barStyle='light-content' />

        {fontLoad ?

          <Routes />

          : <Loading />}

      </NativeBaseProvider>
  );
}
