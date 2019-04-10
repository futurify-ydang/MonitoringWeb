import { environment } from '../environments/environment';

export const DEFAULT_SETTINGS = {
  defaultLanguage: 'en',
};

export const REQUEST_TIMEOUT = 20000;

export const API_USERMANAGEMENT_HOST = environment.UserManagement;

export const LOCAL_STORAGE_VARIABLE = {
  access_token: 'access_token',
  is_logged_in: 'is_logged_in',
  current_language: 'current_language',
  account: 'account',
  current_user_id: 'current_user_id',
  user_type: 'user_type',
  allow_login: 'allow_login',
  permissions: 'permissions'
};

export const LOGIN_STATUS = {
  logged_in: 'true'
};
