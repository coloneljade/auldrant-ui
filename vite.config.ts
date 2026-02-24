import { resolve } from 'node:path';
import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		preact(),
		dts({
			include: ['src'],
			outDir: 'dist',
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: 'auldrant-ui',
		},
		rollupOptions: {
			external: ['preact', 'preact/hooks', 'preact/jsx-runtime', '@preact/signals'],
		},
	},
	resolve: {
		alias: {
			'@components': resolve(__dirname, 'src/components'),
			'@styles': resolve(__dirname, 'src/styles'),
		},
	},
});
