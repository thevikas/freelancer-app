import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { dataStore } from './DataStore'; // Import your store
import Config from "react-native-config";
import { DataTable } from 'react-native-paper';

function projectRow({ index, name, Dated, Income, isSummary }) {
    boldText = isSummary ? { fontWeight: 'bold' } : {};
    Dated = isSummary ? "" : Dated;
    return (
        <DataTable.Row key={index}>
            <DataTable.Cell>{name}</DataTable.Cell>
            <DataTable.Cell>{Dated}</DataTable.Cell>
            <DataTable.Cell numeric>{Income}</DataTable.Cell>
        </DataTable.Row>
    );
}

const DataDisplay = observer(() => {
    useEffect(() => {
        console.log("howdy");
        //dataStore.fetchData(Config.API_URL + "/projects");
    }, []);

    return (
        <View style={styles.screenPad}>
            {dataStore.status === 'pending' && <Text>Loading...</Text>}
            {dataStore.status === 'error' && <Text>Error fetching data.</Text>}
            <Button title="Refresh" onPress={() => dataStore.fetchData(Config.API_URL + "/projects")} />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title sortDirection='descending'>
                        Name
                    </DataTable.Title>
                    <DataTable.Title numeric>Date</DataTable.Title>
                    <DataTable.Title numeric>Income</DataTable.Title>
                </DataTable.Header>
                {dataStore.status === 'done' && (
                    // Convert object values to an array and map over it
                    Object.entries(dataStore.data).map(([key, item], index) => {
                        isSummary = item.name === "Summary";
                        return projectRow({ index, ...item, isSummary })
                    })
                )}
            </DataTable>
        </View>
    );
});

const styles = StyleSheet.create({
    screenPad: {
        padding: 10, // Add some padding to the screen
    },
    line: {
        height: 1, // Height of the line
        backgroundColor: '#000', // Color of the line
        marginBottom: 5, // Space between the line and the summary row
    },
    container: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'space-between', // Distribute space evenly between items
        marginBottom: 10, // Add some space between the rows
        alignItems: 'center', // Align items vertically
        marginTop: 20, // Add some space between the rows
    },
    text: {
        flex: 1, // Each text item will take equal amount of space
    },
    income: {
        fontFamily: 'monospace', // Use a monospaced font for the Income text
        textAlign: 'right', // Right-align the text
    },
});

export default DataDisplay;
