import type { Palette } from '@components/Theme';
import { signal } from '@preact/signals';

/** Currently active palette class. Set to change the theme library-wide. */
export const palette = signal<Palette | null>(null);
