'use client';

import { createContext } from 'react';

import { Web3AuthContextType } from './types';

// ----------------------------------------------------------------------

const Web3AuthContext = createContext({} as Web3AuthContextType);

export default Web3AuthContext;
