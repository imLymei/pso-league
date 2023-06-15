'use client';

import { Session } from '@supabase/supabase-js';
import { Dispatch, SetStateAction, createContext } from 'react';

export const isDarkModeContext = createContext(true);
export const sessionContext = createContext<Session | null>(null);
export const playerContext = createContext<Player | null>(null);
export const setPlayerContext = createContext<Dispatch<SetStateAction<Player | null>> | null>(null);
