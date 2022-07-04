import { makeAutoObservable } from "mobx";

export default class CitiesStore {
  constructor() {
    this._city = {};
    makeAutoObservable(this);
  }
  setCities(city) {
    this._city = city;
  }
  get cities() {
    return this._city;
  }
}
