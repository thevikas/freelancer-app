import { makeAutoObservable, runInAction } from 'mobx';

class DataStore {
    status = 'pending';
    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchData(url) {
        console.log("fetchData",url);
        this.setStatus('pending');
        fetch(url)
            .then((response) => response.json())
            .then((jsonData) => {
                runInAction(() => {
                    console.log("jsonData",jsonData);
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

export const dataStore = new DataStore();
