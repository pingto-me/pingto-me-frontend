'use client';

import { createContext } from 'react';

import { TonContextType } from '../types';

// ----------------------------------------------------------------------

const TonContext = createContext({} as TonContextType);

export default TonContext;
