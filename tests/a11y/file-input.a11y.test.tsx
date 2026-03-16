import { describe, expect, it } from 'bun:test';
import FileInput from '@components/FileInput';
import { fireEvent, render } from '@testing-library/preact';
import { renderAndCheckA11y } from './setup';

/** Helper to create a File with a given name, size, and MIME type. */
function makeFile(name: string, size: number, type: string): File {
	const buffer = new ArrayBuffer(size);
	return new File([buffer], name, { type });
}

describe('FileInput a11y', () => {
	const label = 'Upload';
	const name = 'upload';
	const accept = '.pdf';
	const maxSize = 5 * 1024 * 1024;
	const noop = () => {};

	it('has no axe violations (button variant)', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<FileInput label={label} name={name} accept={accept} maxSize={maxSize} onSelect={noop} />
		);
	});

	it('has no axe violations (zone variant)', async () => {
		// Act & Assert
		await renderAndCheckA11y(
			<FileInput label={label} name={name} accept={accept} maxSize={maxSize} zone onSelect={noop} />
		);
	});

	// https://www.w3.org/TR/WCAG22/#compatible
	describe('WCAG A', () => {
		it('labels input programmatically (SC 4.1.2)', () => {
			// Act
			const { getByLabelText } = render(
				<FileInput label={label} name={name} accept={accept} maxSize={maxSize} onSelect={noop} />
			);

			// Assert
			getByLabelText(/Upload/);
		});

		it('marks input invalid with error (SC 3.3.1)', () => {
			// Act
			const { getByLabelText } = render(
				<FileInput
					label={label}
					name={name}
					accept={accept}
					maxSize={maxSize}
					error="Required"
					onSelect={noop}
				/>
			);
			const input = getByLabelText(/Upload/);

			// Assert
			expect(input.getAttribute('aria-invalid')).toBe('true');
		});

		it('describes input with error message (SC 3.3.1)', () => {
			// Arrange
			const error = 'File is required';

			// Act
			const { getByLabelText, getByText } = render(
				<FileInput
					label={label}
					name={name}
					accept={accept}
					maxSize={maxSize}
					error={error}
					onSelect={noop}
				/>
			);
			const input = getByLabelText(/Upload/);
			const errorElement = getByText(error);

			// Assert
			expect(input.getAttribute('aria-describedby')).toBe(errorElement.id);
		});

		it('announces error via role="alert" (SC 3.3.1)', () => {
			// Act
			const { getByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept={accept}
					maxSize={maxSize}
					error="Required"
					onSelect={noop}
				/>
			);

			// Assert
			getByRole('alert');
		});

		it('zone has click alternative to drag (SC 2.5.7)', () => {
			// Act — clicking the zone should open the file picker (via label wrapping the input)
			const { getByLabelText } = render(
				<FileInput
					label={label}
					name={name}
					accept={accept}
					maxSize={maxSize}
					zone
					onSelect={noop}
				/>
			);
			const input = getByLabelText(/Upload/) as HTMLInputElement;

			// Assert — the input exists and is type="file", clickable via label
			expect(input.type).toBe('file');
		});
	});

	describe('Validation errors', () => {
		it('announces validation error via role="alert" (SC 3.3.1)', () => {
			// Arrange
			const { getByLabelText, getByRole } = render(
				<FileInput label={label} name={name} accept=".pdf" maxSize={1024} onSelect={noop} />
			);
			const file = new File([new ArrayBuffer(2048)], 'big.pdf', { type: 'application/pdf' });

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

			// Assert
			getByRole('alert');
		});
	});

	describe('multiple', () => {
		it('has no axe violations (button variant, multiple)', async () => {
			// Act & Assert
			await renderAndCheckA11y(
				<FileInput
					label={label}
					name={name}
					accept={accept}
					maxSize={maxSize}
					multiple
					onSelect={noop}
				/>
			);
		});

		it('has no axe violations (zone variant, multiple)', async () => {
			// Act & Assert
			await renderAndCheckA11y(
				<FileInput
					label={label}
					name={name}
					accept={accept}
					maxSize={maxSize}
					multiple
					zone
					onSelect={noop}
				/>
			);
		});

		it('each remove button has accessible label with filename', () => {
			// Arrange
			const { getByLabelText, getAllByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					zone
					onSelect={noop}
				/>
			);
			const file1 = makeFile('report.pdf', 100, 'application/pdf');
			const file2 = makeFile('summary.pdf', 200, 'application/pdf');

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1, file2] } });

			// Assert — each remove button names its file
			const removeButtons = getAllByRole('button', { name: /remove/i });
			const labels = removeButtons.map((btn) => btn.getAttribute('aria-label'));
			expect(labels).toContain('Remove report.pdf');
			expect(labels).toContain('Remove summary.pdf');
		});

		it('clear all button has accessible label', () => {
			// Arrange
			const { getByLabelText, getByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					zone
					onSelect={noop}
				/>
			);
			const file = makeFile('a.pdf', 100, 'application/pdf');

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

			// Assert
			getByRole('button', { name: /clear all/i });
		});
	});
});
