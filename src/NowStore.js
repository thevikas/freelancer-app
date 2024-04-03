import { makeAutoObservable, runInAction } from 'mobx';
import Config from "react-native-config";
import base64 from 'react-native-base64';

class NowStore {
    status = 'pending';
    data = [];
    TaskNow = {};
    project = "";
    duration = 0;
    lastTime = 0;
    taskStatus = "";
    task = "";
    taskTimeStr = "";
    constructor() {
        makeAutoObservable(this);
    }

    fetchNow() {
        const url = Config.API_URL + "/now"
        const apiuser = Config.API_USER;
        const apipass = Config.API_PASSWORD;
        console.log("fetchNow", url);
        this.setStatus('pending');
        const headers = new Headers();
        if (apiuser && apipass)
            headers.set('Authorization', 'Basic ' + base64.encode(apiuser + ":" + apipass));
        //also use API_USER and API_PASSWORD
        fetch(url, { headers })
        .then((response) => response.json())
        .then((jsonData) => {
            console.log("fetchNow jsonData", jsonData);
            this.handleNowResponse(jsonData);
        })
        .catch((error) => {
            runInAction(() => {
                this.status = 'error';
                // Optionally handle error state or data here
            });
        });
    }

    handleNowResponse(jsonData) {
        console.log("handleNowResponse", jsonData);
        runInAction(() => {
            this.project = jsonData.project;
            this.duration = jsonData.duration;
            this.lastTime = jsonData.last_time;
            this.taskStatus = jsonData.status;
            this.task = jsonData.task;
            this.taskTimeStr = jsonData.time;
            this.status = 'done';
        });
    }

    postNow(task) {
        var url = Config.API_URL + "/now"
        console.log("postNow", url);
        this.setStatus('pending');
        url = url + "?log=" + task;
        fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
            this.handleNowResponse(jsonData);
        })
        .catch((error) => {
            runInAction(() => {
                this.status = 'error';
                // Optionally handle error state or data here
            });
        });
    }

    setStatus(newStatus) {
        this.status = newStatus; // Direct assignment is okay here because setStatus is an action
    }
}

export const nowStore = new NowStore();
