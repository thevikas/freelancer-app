import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { dataStore } from './DataStore'; // Import your store
import Config from "react-native-config";
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import { set } from 'mobx';

function projectRow({ index, name, Dated, Income, isSummary, project, onRowPress, onTaskRowPress, recent}) {
    boldText = isSummary ? { fontWeight: 'bold' } : {};
    Dated = isSummary ? "" : Dated;
    const s1 = isSummary ? styles.summary : {}; 
    const d2 = moment(Dated, "YYYY-MM-DD H:mm:ss").fromNow();
    const projectCellStyle = project === name ? { 
        fontWeight: 'bold',
        backgroundColor: 'lightblue'
     } : {};
    return (
        <>
            <DataTable.Row key={index} style={s1} onPress={() => onRowPress(name)}>
                <DataTable.Cell style={projectCellStyle}>{name}</DataTable.Cell>
                <DataTable.Cell style={projectCellStyle}>{d2}</DataTable.Cell>
                <DataTable.Cell  style={projectCellStyle} numeric>{Income}</DataTable.Cell>
            </DataTable.Row>
            {project === name && projectTaskInfo(recent,onTaskRowPress)}
        </>
    );
}

function projectTaskInfo(recent,onTaskRowPress) {
    console.log("L28 tasks",recent);
    return (
        <DataTable>
                <DataTable.Header>
                    <DataTable.Title sortDirection='descending'>
                        Task
                    </DataTable.Title>
                    <DataTable.Title numeric>Last time</DataTable.Title>
                </DataTable.Header>
                {(
                    // Convert object values to an array and map over it
                    Object.entries(recent).map(([key, item], index) => {
                        return projectTaskRow({ index, ...item, onTaskRowPress})
                    })
                )}
            </DataTable>
    );
}

function projectTaskRow({ index, task, last_time, onTaskRowPress}) {
    const d2 = moment(last_time, "YYYY-MM-DD H:mm:ss").fromNow();
    return (
        <DataTable.Row key={index} onPress={() => onTaskRowPress(name)}>
            <DataTable.Cell>{task}</DataTable.Cell>
            <DataTable.Cell numeric>{d2}</DataTable.Cell>
        </DataTable.Row>
    );
}

const DataDisplay = observer(() => {

    const [project, setProject] = React.useState(null);

    useEffect(() => {
        console.log("howdy");
        //dataStore.fetchData(Config.API_URL + "/projects");
    }, []);

    const onRowPress = (project) => {
        setProject(project);
        console.log("L35 open project",project);
    }

    const onTaskRowPress = (task) => {
        console.log("L39 open task",task);
    }

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
                        return projectRow({ index, ...item, isSummary, project, onRowPress, onTaskRowPress})
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
    summary: {
        //bold
        fontWeight: 'bold', // Make the text bold
        height: 1, // Height of the line
        backgroundColor: 'gray', // Line color
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
