import { observable, action } from 'mobx';

/**
 * App state mobx store
 */
export default class AppStore {
  @observable authenticated;
  @observable authenticating;
  @observable mark;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.mark = true;
  }

  @action
  toggleMark() {
    this.mark = !this.mark;
  }

  @action
  authenticate() {
    this.authenticated = true;
    this.authenticating = false;
  }
}
