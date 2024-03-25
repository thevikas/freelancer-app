import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import DataDisplay from './DataDisplay';
import AppView from './AppView';
import NowView from './NowView';
import { nowStore } from './NowStore';
import { projectsStore } from './ProjectsStore';

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {

    React.useEffect(() => {
        nowStore.fetchNow();
        projectsStore.fetchProjects();
      }, []);

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="AppView">
                    <Stack.Screen name="AppView" component={AppView} />
                    <Stack.Screen name="Projects" component={DataDisplay} />
                    <Stack.Screen name="NowView" component={NowView} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
