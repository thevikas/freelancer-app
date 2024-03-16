import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { dataStore } from './DataStore'; // Import your store

const DataDisplay = observer(() => {
  useEffect(() => {
    dataStore.fetchData('YOUR_API_ENDPOINT_HERE');
  }, []);

  return (
    <View>
      {dataStore.status === 'pending' && <Text>Loading...</Text>}
      {dataStore.status === 'error' && <Text>Error fetching data.</Text>}
      {dataStore.status === 'done' && (
        dataStore.data.map((item, index) => (
          <View key={index}>
            {/* Display your data based on your JSON structure */}
            <Text>{item.someField}</Text>
          </View>
        ))
      )}
      <Button title="Refresh" onPress={() => dataStore.fetchData('YOUR_API_ENDPOINT_HERE')} />
    </View>
  );
});

export default DataDisplay;
