import { makeAutoObservable, runInAction } from 'mobx';
import { UserAPI } from '../api/userapi';

class UserStore {
  currentUser = null;
  isAuthenticated = false;
  isAdmin = false;
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.initialize();
  }

  async initialize() {
    await this.checkAuth();
  }

  async register(userData) {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });
      
      const response = await UserAPI.register(userData);
      await this.login(userData.username, userData.password);
      
      return response;
    } catch (error) {
      runInAction(() => {
        this.error = error.message || 'Ошибка регистрации';
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async login(username, password) {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });
      
      const userData = await UserAPI.login(username, password);
      
      runInAction(() => {
        this.currentUser = userData;
        this.isAuthenticated = true;
        this.isAdmin = userData.roles?.includes('ROLE_ADMIN') || false;
        localStorage.setItem('authToken', userData.token);
      });
      
      return userData;
    } catch (error) {
      runInAction(() => {
        this.error = error.message || 'Ошибка авторизации';
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout() {
    UserAPI.logout();
    runInAction(() => {
      this.currentUser = null;
      this.isAuthenticated = false;
      this.isAdmin = false;
      localStorage.removeItem('authToken');
    });
  }

  async checkAuth() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      
      const userData = await UserAPI.checkAuth();
      
      if (userData) {
        runInAction(() => {
          this.currentUser = userData;
          this.isAuthenticated = true;
          this.isAdmin = userData.roles?.includes('ROLE_ADMIN') || false;
        });
        return true;
      }
      return false;
    } catch (error) {
      runInAction(() => {
        this.logout();
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
  
}

export const userStore = new UserStore();