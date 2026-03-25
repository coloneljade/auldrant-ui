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
		tsconfigPaths: true,
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
				preserveModules: true,
				preserveModulesRoot: 'src',
				entryFileNames: '[name].js',
			},
		},
	},
});
