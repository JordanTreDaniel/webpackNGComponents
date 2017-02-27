import * as angular from 'angular';

export class SessionServiceClass {
  public user;

  constructor(
    private $sessionStorage: angular.storage.IStorageService
  ) {
    this.user = this.getUser();
  }

  create(user) {
    this.$sessionStorage['user'] = user;
  }

  isAuthenticated() {
    let user = this.getUser();
    return !!user['username'];
  }

  isAuthorized(roles) {
    let user = this.getUser();
    if (!user['roles']){
      return false;
    }

    if (!angular.isArray(roles)) {
      roles = [roles];
    }

    return roles.some((v, k) => {
      for(let i in user['roles']) {
        if (user['roles'][i] === v) {
          return true;
        }
      }
    });
  }

  public getUser() {
    return this.$sessionStorage['user'] || {};
  }

  destroy() {
    this.$sessionStorage.$reset();
    this.$sessionStorage['user'] = {};
  }
}

SessionServiceClass.$inject = ['$sessionStorage'];

export const SessionServiceModule = angular.module('app.services.session', [])
  .service('SessionService', SessionServiceClass)
  .name;
