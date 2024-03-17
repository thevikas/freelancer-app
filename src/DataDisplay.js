import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { dataStore } from './DataStore'; // Import your store
import Config from "react-native-config";

function projectBox({ index, name, Dated, Income, isSummary }) {
    boldText = isSummary ? { fontWeight: 'bold' } : {};
    Dated = isSummary ? "" : Dated;
    return (
        <View key={index} style={styles.container}>
            {isSummary && <View style={styles.line} />}
            <Text style={[styles.text,boldText]}>{name}</Text>
            <Text style={[styles.text,boldText]}>{Dated}</Text>
            <Text style={[styles.text, styles.income,boldText]}>{Income}</Text>
        </View>
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
            {dataStore.status === 'done' && (
                // Convert object values to an array and map over it
                Object.entries(dataStore.data).map(([key, item], index) =>
                    {
                        isSummary = item.name === "Summary";
                        return projectBox({ index, ...item, isSummary })
                    })
            )}
            <Button title="Refresh" onPress={() => dataStore.fetchData(Config.API_URL + "/projects")} />
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
    income:  {
        fontFamily: 'monospace', // Use a monospaced font for the Income text
        textAlign: 'right', // Right-align the text
    },
});

export default DataDisplay;
