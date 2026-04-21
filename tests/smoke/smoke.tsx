// Smoke test: verify every subpath export resolves for types and imports.
// If this file type-checks, all subpath exports resolve correctly.
import '@auldrant/ui/styles';
import {
	Alert,
	AlertVariant,
	Button,
	DialogHost,
	IconName,
	Palette,
	Theme,
} from '@auldrant/ui/components';
import { type ITimerControls, page, usePage, useTimer } from '@auldrant/ui/hooks';
import {
	confirm,
	dialog,
	hash,
	type IConfirmOptions,
	type IDialogOptions,
	location,
	navigate,
	palette,
	toast,
} from '@auldrant/ui/signals';
import { cx, HeadingLevel } from '@auldrant/ui/utils';
import type { FunctionComponent } from 'preact';

// Verify values are callable / usable (not just importable)
const _classes: string = cx('a', false, 'b', undefined);
const _level: HeadingLevel = HeadingLevel.h2;

const App: FunctionComponent = () => {
	const _timer: ITimerControls = useTimer(10, () => {});
	const _currentPage = usePage();
	const _pageSignal = page();

	const _handleConfirm = async () => {
		const _options: IConfirmOptions = { title: 'Test', message: 'Test' };
		await confirm(_options);
	};

	const _handleDialog = async () => {
		const _options: IDialogOptions = { title: 'Test', actions: [] };
		await dialog(_options);
	};

	const _nav = () => navigate('/test');
	const _toastIt = () => toast('test');
	const _path: string = location.value;
	const _hashVal: string = hash.value;
	palette.value = Palette.blue;

	return (
		<Theme class={Palette.blue}>
			<DialogHost />
			<Button label="Click" />
			{IconName.dismiss satisfies IconName}
			<Alert variant={AlertVariant.info} message="Works" />
		</Theme>
	);
};

export default App;
