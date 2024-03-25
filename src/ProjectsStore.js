import { makeAutoObservable, runInAction } from 'mobx';
import Config from "react-native-config";

class ProjectsStore {
    status = 'pending';
    data = [];
    TaskNow = {};
    constructor() {
        makeAutoObservable(this);
    }

    fetchProjects() {
        const url = Config.API_URL + "/projects"
        console.log("fetchProjects", url);
        this.setStatus('pending');
        fetch(url)
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
