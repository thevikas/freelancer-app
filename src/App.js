import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import DataDisplay from './DataDisplay';
import AppView from './AppView';

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="AppView">
                    <Stack.Screen name="AppView" component={AppView} />
                    <Stack.Screen name="DataDisplay" component={DataDisplay} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
