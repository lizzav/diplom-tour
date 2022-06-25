import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  //todo удалить
  get user() {
    console.log(this._user)
    return this._user;
  }
  get users() {
    console.log(this._user)
    return this._user;
  }
}
