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
			outDir: 'dist',
			entryRoot: 'src',
		}),
	],
	resolve: {
		tsconfigPaths: true,
	},

	build: {
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: 'auldrant-ui',
			cssFileName: 'auldrant-ui',
		},
		rollupOptions: {
			external: ['preact', 'preact/hooks', 'preact/jsx-runtime', '@preact/signals'],
		},
	},
});
