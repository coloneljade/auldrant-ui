import Progress from '@components/Progress';
import { useSignal } from '@preact/signals';
import type { FunctionComponent } from 'preact';

export const ProgressSection: FunctionComponent = () => {
	const interactiveValue = useSignal(50);

	return (
		<div class="dev-section">
			<h2>Progress</h2>

			<h3>Determinate</h3>
			<div class="dev-stack dev-narrow">
				<Progress label="0%" value={0} />
				<Progress label="25%" value={25} />
				<Progress label="50%" value={50} />
				<Progress label="75%" value={75} />
				<Progress label="100%" value={100} />
			</div>

			<h3>Interactive</h3>
			<div class="dev-stack dev-narrow">
				<Progress label={`Progress: ${interactiveValue.value}%`} value={interactiveValue.value} />
				<div class="dev-row">
					<button
						type="button"
						onClick={() => {
							interactiveValue.value = Math.max(0, interactiveValue.value - 10);
						}}
					>
						−10
					</button>
					<span>{interactiveValue.value}%</span>
					<button
						type="button"
						onClick={() => {
							interactiveValue.value = Math.min(100, interactiveValue.value + 10);
						}}
					>
						+10
					</button>
				</div>
			</div>

			<h3>Indeterminate</h3>
			<div class="dev-narrow">
				<Progress label="Loading…" indeterminate />
			</div>
		</div>
	);
};
