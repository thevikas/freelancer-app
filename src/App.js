import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DataDisplay from './DataDisplay';
import AppView from './AppView';
export default function App() {
  return (
    <NavigationContainer>
        <AppView />
        <DataDisplay />
    </NavigationContainer>
  );
}