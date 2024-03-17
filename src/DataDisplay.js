import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { dataStore } from './DataStore'; // Import your store
import Config from "react-native-config";

const DataDisplay = observer(() => {
    useEffect(() => {
        console.log("howdy");
        //dataStore.fetchData(Config.API_URL + "/projects");
    }, []);

    return (
        <View>
            {dataStore.status === 'pending' && <Text>Loading...</Text>}
            {dataStore.status === 'error' && <Text>Error fetching data.</Text>}
            {dataStore.status === 'done' && (
                // Convert object values to an array and map over it
                Object.entries(dataStore.data).map(([key, item], index) => (
                    <View key={index}>
                        {/* Display key and other details from your JSON structure */}
                        <Text>Name: {item.name}</Text>
                        <Text>Date: {item.Dated}</Text>
                        <Text>Income: {item.Income}</Text>
                        {/* Add more fields as needed */}
                    </View>
                ))
            )}
            <Button title="Refresh" onPress={() => dataStore.fetchData(Config.API_URL + "/projects")} />
        </View>
    );
});

export default DataDisplay;
