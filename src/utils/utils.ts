import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createClient } from '@supabase/supabase-js';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const supabaseUrl = 'https://sylxhjatzcdgbnwqsizk.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bHhoamF0emNkZ2Jud3FzaXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2OTE4NjksImV4cCI6MjAwMjI2Nzg2OX0.ejd83jfJGECpN3_Ya-6NVN-NDHuKNgLcTsmNbWDK928';
export const supabase = createClient(supabaseUrl, supabaseKey);

export function toDecimal(number: number, decimal: number) {
	const tenPow = 10 ** decimal;

	return Math.round(number * tenPow) / tenPow;
}
