import type { StorybookConfig } from '@storybook/preact-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	framework: '@storybook/preact-vite',
	addons: ['@storybook/addon-essentials'],
};

export default config;
