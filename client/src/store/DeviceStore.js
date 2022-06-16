import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [
    ];
    this._brands = [
    ];
    this._device = [

    ];
    this._selectedTypes = {};
    this._selectedBrand = {};
    this._page=1;
    this._totalCount=0;
    this._limit=3
    makeAutoObservable(this);
  }
  setTypes(type) {
    this._types = type;
  }
  setBrands(Brand) {
    this._brands = Brand;
  }
  setDevice(device) {
    this._device = device;
  }
  setSelectedTypes(types) {
    this.setPage(1)
    this._selectedTypes = types;
  }
  setSelectedBrand(brand) {
    this.setPage(1)
    this._selectedBrand = brand;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get device() {
    return this._device;
  }

  get selectedTypes() {
    return this._selectedTypes;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }

  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}
