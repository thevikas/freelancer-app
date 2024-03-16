import { makeAutoObservable } from "mobx";

class DataStore {
  data = [];
  status = "pending"; // "pending", "done", or "error"

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData(url) {
    this.data = [];
    this.status = "pending";
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      this.data = jsonData;
      this.status = "done";
    } catch (error) {
      this.status = "error";
      console.error("Failed to fetch data:", error);
    }
  }
}

export const dataStore = new DataStore();
