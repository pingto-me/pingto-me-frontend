'use client';

import { createContext } from 'react';

import { AuthContextType } from '../types';

// ----------------------------------------------------------------------

const AuthContext = createContext({} as AuthContextType);

export default AuthContext;
