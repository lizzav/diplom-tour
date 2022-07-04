import { makeAutoObservable } from "mobx";

export default class TravelsStore {
  constructor() {
    this._travel= {};
    makeAutoObservable(this);
  }
  setTravels(travel) {
    this._travel = travel;
  }
  get travels() {
    return this._travel;
  }
}
