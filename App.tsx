import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Loading } from '@components/index';
import { Routes } from '@routes/index';
import { Provider } from '@components/Provider';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        style='dark'
        translucent
      />

      <Provider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </Provider>
    </GluestackUIProvider>
  );
}
