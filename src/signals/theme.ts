import type { Palette } from '@internal/types';
import { signal } from '@preact/signals';

/** Currently active palette class. Set to change the theme library-wide. */
export const palette = signal<Palette | null>(null);
