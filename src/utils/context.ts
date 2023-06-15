'use client';

import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';

export const isDarkModeContext = createContext(true);
export const sessionContext = createContext<Session | null>(null);
export const playerContext = createContext<Player | null>(null);
