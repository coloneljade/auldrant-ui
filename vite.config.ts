import { resolve } from 'node:path';
import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
	plugins: [
		preact(),
		dts({
			include: ['src'],
			outDir: 'dist',
		}),
	],
	resolve: {
		alias: {
			'@components': resolve(__dirname, 'src/components'),
			'@scripts': resolve(__dirname, 'src/scripts'),
			'@signals': resolve(__dirname, 'src/signals'),
			'@styles': resolve(__dirname, 'src/styles'),
			'@internal': resolve(__dirname, 'src/internal'),
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: 'auldrant-ui',
			cssFileName: 'auldrant-ui',
		},
		rollupOptions: {
			external: ['preact', 'preact/hooks', 'preact/jsx-runtime', '@preact/signals'],
		},
	},
});
