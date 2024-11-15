import { paths } from 'src/routes/paths';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ACCESS_TOKEN_STORAGE_KEY = 'pingto-me-token';

export const LOGIN_METHOD_STORAGE_KEY = 'pingto-me-login-method';

export const PATH_AFTER_LOGIN = paths.dashboard;
