import path from 'node:path';
import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
	plugins: [preact()],
	resolve: {
		alias: {
			'@components': path.resolve(import.meta.dirname, './src/components'),
			'@signals': path.resolve(import.meta.dirname, './src/signals'),
			'@styles': path.resolve(import.meta.dirname, './src/styles'),
			'@internal': path.resolve(import.meta.dirname, './src/internal'),
			'@hooks': path.resolve(import.meta.dirname, './src/hooks.ts'),
			'@utils': path.resolve(import.meta.dirname, './src/utils.ts'),
		},
	},
	build: {
		lib: {
			entry: {
				'components/index': 'src/components/index.ts',
				'signals/index': 'src/signals/index.ts',
				hooks: 'src/hooks.ts',
				utils: 'src/utils.ts',
				styles: 'src/styles.ts',
			},
			formats: ['es'],
			cssFileName: 'auldrant-ui',
		},
		rollupOptions: {
			external: ['preact', 'preact/hooks', 'preact/jsx-runtime', '@preact/signals'],
			output: {
				entryFileNames: '[name].js',
			},
		},
	},
});
