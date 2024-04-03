import { makeAutoObservable, runInAction } from 'mobx';
import Config from "react-native-config";
import base64 from 'react-native-base64';

class ProjectsStore {
    status = 'pending';
    data = [];
    TaskNow = {};
    constructor() {
        makeAutoObservable(this);
    }

    fetchProjects(showall = false) {
        const url = Config.API_URL + "/projects?showall=" + (showall ? "1" : "0");
        const apiuser = Config.API_USER;
        const apipass = Config.API_PASSWORD;
        console.log("fetchProjects", url);
        this.setStatus('pending');
        const headers = new Headers();
        if (apiuser && apipass)
            headers.set('Authorization', 'Basic ' + base64.encode(apiuser + ":" + apipass));
        fetch(url, { headers })
            .then((response) => response.json())
            .then((jsonData) => {
                runInAction(() => {
                    console.log("jsonData", jsonData);
                    this.data = jsonData;
                    this.status = 'done';
                });
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

export const projectsStore = new ProjectsStore();
