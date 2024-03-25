import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { projectsStore } from './ProjectsStore'; // Import your store
import { nowStore } from './NowStore'; // Import your store
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import { set } from 'mobx';
import { TextInput, Text } from 'react-native-paper';

const NowView = observer(() => {

    const [project, setProject] = React.useState(null);
    const [logNowTask, setText] = React.useState(nowStore.project + ": " + nowStore.task);
    useEffect(() => {
        console.log("howdy");
        //projectsStore.fetchData(Config.API_URL + "/projects");
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

            <TextInput
                label="Task"
                value={logNowTask}
                onChangeText={text => setText(logNowTask)}
                />

            <Button title="Log Now" onPress={() => nowStore.postNow(logNowTask)} />
            {projectsStore.status === 'pending' && <Text>Loading...</Text>}
            {projectsStore.status === 'error' && <Text>Error fetching data.</Text>}
            
            <DataTable.Row>
            <Text variant="titleMedium">{nowStore.task}</Text>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Project</DataTable.Cell>
                <DataTable.Cell>{nowStore.project}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Duration</DataTable.Cell>
                <DataTable.Cell>{nowStore.taskTimeStr}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Status</DataTable.Cell>
                <DataTable.Cell>{nowStore.taskStatus}</DataTable.Cell>
            </DataTable.Row>
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

export default NowView;
