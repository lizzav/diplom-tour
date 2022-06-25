import { makeAutoObservable } from "mobx";

export default class SightStore {
  constructor() {
    this._sights = {};
    this._sight = {};
    makeAutoObservable(this);
  }
  setSights(sights) {
    this._sights = sights;
  }
  get sights() {
    return this._sights;
  }
  setOneSight(sight) {
    this._sight = sight;
  }
  get oneSight() {
    return this._sight;
  }
}
