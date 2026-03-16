import { describe, expect, it, mock } from 'bun:test';
import FileInput from '@components/FileInput';
import { fireEvent, render } from '@testing-library/preact';

/** Helper to create a File with a given name, size, and MIME type. */
function makeFile(name: string, size: number, type: string): File {
	const buffer = new ArrayBuffer(size);
	return new File([buffer], name, { type });
}

describe('FileInput', () => {
	const label = 'Upload';
	const name = 'upload';
	const accept = '.pdf,image/*';
	const maxSize = 5 * 1024 * 1024; // 5 MB

	it('renders with label (button variant default)', () => {
		// Act
		const { getByLabelText } = render(
			<FileInput label={label} name={name} accept={accept} maxSize={maxSize} onSelect={() => {}} />
		);

		// Assert
		getByLabelText(/Upload/);
	});

	it('renders zone variant when zone is true', () => {
		// Act
		const { getByText } = render(
			<FileInput
				label={label}
				name={name}
				accept={accept}
				maxSize={maxSize}
				zone
				onSelect={() => {}}
			/>
		);

		// Assert
		getByText(/Drag a file here/);
	});

	it('calls onSelect with File[] on valid input change', () => {
		// Arrange
		const handleSelect = mock(() => {});
		const { getByLabelText } = render(
			<FileInput
				label={label}
				name={name}
				accept=".pdf"
				maxSize={maxSize}
				onSelect={handleSelect}
			/>
		);
		const file = makeFile('test.pdf', 1024, 'application/pdf');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		expect(handleSelect).toHaveBeenCalledWith([file]);
	});

	it('does NOT call onSelect when file exceeds maxSize', () => {
		// Arrange
		const handleSelect = mock(() => {});
		const { getByLabelText } = render(
			<FileInput label={label} name={name} accept=".pdf" maxSize={1024} onSelect={handleSelect} />
		);
		const file = makeFile('big.pdf', 2048, 'application/pdf');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		expect(handleSelect).not.toHaveBeenCalled();
	});

	it('does NOT call onSelect when file type is not accepted', () => {
		// Arrange
		const handleSelect = mock(() => {});
		const { getByLabelText } = render(
			<FileInput
				label={label}
				name={name}
				accept=".pdf"
				maxSize={maxSize}
				onSelect={handleSelect}
			/>
		);
		const file = makeFile('test.txt', 100, 'text/plain');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		expect(handleSelect).not.toHaveBeenCalled();
	});

	it('shows validation error for size violation', () => {
		// Arrange
		const { getByLabelText, getByRole } = render(
			<FileInput label={label} name={name} accept=".pdf" maxSize={1024} onSelect={() => {}} />
		);
		const file = makeFile('big.pdf', 2048, 'application/pdf');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		expect(getByRole('alert').textContent).toContain('exceeds');
	});

	it('shows validation error for type violation', () => {
		// Arrange
		const { getByLabelText, getByRole } = render(
			<FileInput label={label} name={name} accept=".pdf" maxSize={maxSize} onSelect={() => {}} />
		);
		const file = makeFile('test.txt', 100, 'text/plain');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		expect(getByRole('alert').textContent).toContain('type not accepted');
	});

	it('shows consumer error prop with precedence over internal', () => {
		// Act
		const { getByRole } = render(
			<FileInput
				label={label}
				name={name}
				accept=".pdf"
				maxSize={maxSize}
				error="Server error"
				onSelect={() => {}}
			/>
		);

		// Assert
		expect(getByRole('alert').textContent).toBe('Server error');
	});

	it('shows filename and size after valid selection', () => {
		// Arrange
		const { getByLabelText, getByText } = render(
			<FileInput label={label} name={name} accept=".pdf" maxSize={maxSize} onSelect={() => {}} />
		);
		const file = makeFile('report.pdf', 1536, 'application/pdf');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		getByText(/report\.pdf/);
		getByText(/1\.5 KB/);
	});

	it('clears file and calls onClear', () => {
		// Arrange
		const handleClear = mock(() => {});
		const { getByLabelText, getByRole, queryByText } = render(
			<FileInput
				label={label}
				name={name}
				accept=".pdf"
				maxSize={maxSize}
				onSelect={() => {}}
				onClear={handleClear}
			/>
		);
		const file = makeFile('report.pdf', 1024, 'application/pdf');
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Act
		fireEvent.click(getByRole('button', { name: /remove file/i }));

		// Assert
		expect(handleClear).toHaveBeenCalled();
		expect(queryByText(/report\.pdf/)).toBeNull();
	});

	it('disabled state prevents interaction', () => {
		// Act
		const { getByLabelText } = render(
			<FileInput
				label={label}
				name={name}
				accept=".pdf"
				maxSize={maxSize}
				disabled
				onSelect={() => {}}
			/>
		);
		const input = getByLabelText(/Upload/) as HTMLInputElement;

		// Assert
		expect(input.disabled).toBe(true);
	});

	it('passes accept, name, required to native input', () => {
		// Act
		const { getByLabelText } = render(
			<FileInput
				label={label}
				name={name}
				accept=".pdf,.docx"
				maxSize={maxSize}
				required
				onSelect={() => {}}
			/>
		);
		const input = getByLabelText(/Upload/) as HTMLInputElement;

		// Assert
		expect(input.getAttribute('accept')).toBe('.pdf,.docx');
		expect(input.name).toBe('upload');
		expect(input.required).toBe(true);
	});

	it('zone: handles valid drop', () => {
		// Arrange
		const handleSelect = mock(() => {});
		const { getByText } = render(
			<FileInput
				label={label}
				name={name}
				accept="image/*"
				maxSize={maxSize}
				zone
				onSelect={handleSelect}
			/>
		);
		const file = makeFile('photo.png', 2048, 'image/png');
		const dropLabel = getByText(/Drag a file here/).closest('label') as HTMLElement;

		// Act — drag events are on the label wrapper
		fireEvent.drop(dropLabel, { dataTransfer: { files: [file] } });

		// Assert
		expect(handleSelect).toHaveBeenCalledWith([file]);
	});

	it('zone: rejects invalid drop', () => {
		// Arrange
		const handleSelect = mock(() => {});
		const { getByText, getByRole } = render(
			<FileInput
				label={label}
				name={name}
				accept="image/*"
				maxSize={maxSize}
				zone
				onSelect={handleSelect}
			/>
		);
		const file = makeFile('doc.pdf', 100, 'application/pdf');
		const dropLabel = getByText(/Drag a file here/).closest('label') as HTMLElement;

		// Act
		fireEvent.drop(dropLabel, { dataTransfer: { files: [file] } });

		// Assert
		expect(handleSelect).not.toHaveBeenCalled();
		expect(getByRole('alert').textContent).toContain('type not accepted');
	});

	it('accepts wildcard MIME types', () => {
		// Arrange
		const handleSelect = mock(() => {});
		const { getByLabelText } = render(
			<FileInput
				label={label}
				name={name}
				accept="image/*"
				maxSize={maxSize}
				onSelect={handleSelect}
			/>
		);
		const file = makeFile('photo.webp', 100, 'image/webp');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		expect(handleSelect).toHaveBeenCalledWith([file]);
	});

	it('accepts exact MIME types', () => {
		// Arrange
		const handleSelect = mock(() => {});
		const { getByLabelText } = render(
			<FileInput
				label={label}
				name={name}
				accept="application/pdf"
				maxSize={maxSize}
				onSelect={handleSelect}
			/>
		);
		const file = makeFile('doc.pdf', 100, 'application/pdf');

		// Act
		fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

		// Assert
		expect(handleSelect).toHaveBeenCalledWith([file]);
	});

	describe('multiple', () => {
		it('appends files across multiple selections', () => {
			// Arrange
			const handleSelect = mock(() => {});
			const { getByLabelText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					onSelect={handleSelect}
				/>
			);
			const file1 = makeFile('a.pdf', 1024, 'application/pdf');
			const file2 = makeFile('b.pdf', 2048, 'application/pdf');

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1] } });
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file2] } });

			// Assert — second call should include both files
			expect(handleSelect).toHaveBeenCalledTimes(2);
			const secondCall = handleSelect.mock.calls[1];
			expect(secondCall?.[0]).toEqual([file1, file2]);
		});

		it('deduplicates by name + size', () => {
			// Arrange
			const handleSelect = mock(() => {});
			const { getByLabelText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					onSelect={handleSelect}
				/>
			);
			const file = makeFile('a.pdf', 1024, 'application/pdf');

			// Act — add same file twice
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

			// Assert — only called once (duplicate silently skipped, no new files added)
			expect(handleSelect).toHaveBeenCalledTimes(1);
		});

		it('respects maxFiles limit', () => {
			// Arrange
			const handleSelect = mock(() => {});
			const { getByLabelText, getByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					maxFiles={2}
					onSelect={handleSelect}
				/>
			);
			const file1 = makeFile('a.pdf', 100, 'application/pdf');
			const file2 = makeFile('b.pdf', 100, 'application/pdf');
			const file3 = makeFile('c.pdf', 100, 'application/pdf');

			// Act — add all three at once
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1, file2, file3] } });

			// Assert — only first 2 accepted
			expect(handleSelect).toHaveBeenCalledWith([file1, file2]);
			expect(getByRole('alert').textContent).toContain('Maximum 2 files');
		});

		it('respects maxTotalSize limit', () => {
			// Arrange
			const handleSelect = mock(() => {});
			const { getByLabelText, getByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					maxTotalSize={1500}
					onSelect={handleSelect}
				/>
			);
			const file1 = makeFile('a.pdf', 1000, 'application/pdf');
			const file2 = makeFile('b.pdf', 1000, 'application/pdf');

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1, file2] } });

			// Assert — only first file fits
			expect(handleSelect).toHaveBeenCalledWith([file1]);
			expect(getByRole('alert').textContent).toContain('Total size limit');
		});

		it('removes individual file via onRemove', () => {
			// Arrange
			const handleRemove = mock(() => {});
			const handleSelect = mock(() => {});
			const { getByLabelText, getAllByRole, queryByText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					zone
					onSelect={handleSelect}
					onRemove={handleRemove}
				/>
			);
			const file1 = makeFile('a.pdf', 100, 'application/pdf');
			const file2 = makeFile('b.pdf', 200, 'application/pdf');
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1, file2] } });

			// Act — remove first file
			const [firstRemove] = getAllByRole('button', { name: /remove/i });
			if (firstRemove) {
				fireEvent.click(firstRemove);
			}

			// Assert
			expect(handleRemove).toHaveBeenCalledWith(file1);
			expect(queryByText(/a\.pdf/)).toBeNull();
		});

		it('clears all files', () => {
			// Arrange
			const handleClear = mock(() => {});
			const { getByLabelText, getByRole, queryByText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					zone
					onSelect={() => {}}
					onClear={handleClear}
				/>
			);
			const file1 = makeFile('a.pdf', 100, 'application/pdf');
			const file2 = makeFile('b.pdf', 200, 'application/pdf');
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1, file2] } });

			// Act
			fireEvent.click(getByRole('button', { name: /clear all/i }));

			// Assert
			expect(handleClear).toHaveBeenCalled();
			expect(queryByText(/a\.pdf/)).toBeNull();
			expect(queryByText(/b\.pdf/)).toBeNull();
		});

		it('shows file count and total size (button variant)', () => {
			// Arrange
			const { getByLabelText, getByText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					onSelect={() => {}}
				/>
			);
			const file1 = makeFile('a.pdf', 1024, 'application/pdf');
			const file2 = makeFile('b.pdf', 1024, 'application/pdf');

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1, file2] } });

			// Assert
			getByText(/2 files/);
			getByText(/2\.0 KB/);
		});

		it('shows file list with per-file remove (zone variant)', () => {
			// Arrange
			const { getByLabelText, getByText, getAllByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					zone
					onSelect={() => {}}
				/>
			);
			const file1 = makeFile('a.pdf', 100, 'application/pdf');
			const file2 = makeFile('b.pdf', 200, 'application/pdf');

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1, file2] } });

			// Assert — both files listed individually
			getByText(/a\.pdf/);
			getByText(/b\.pdf/);
			// Remove buttons: one per file
			const removeButtons = getAllByRole('button', { name: /remove/i });
			expect(removeButtons.length).toBe(2);
		});

		it('rejects some files and accepts others (partial batch)', () => {
			// Arrange
			const handleSelect = mock(() => {});
			const { getByLabelText, getByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					onSelect={handleSelect}
				/>
			);
			const valid = makeFile('a.pdf', 100, 'application/pdf');
			const invalid = makeFile('b.txt', 100, 'text/plain');

			// Act
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [valid, invalid] } });

			// Assert — valid file accepted, error shown for invalid
			expect(handleSelect).toHaveBeenCalledWith([valid]);
			expect(getByRole('alert').textContent).toContain('type not accepted');
		});

		it('sets multiple attribute on native input', () => {
			// Act
			const { getByLabelText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					onSelect={() => {}}
				/>
			);
			const input = getByLabelText(/Upload/) as HTMLInputElement;

			// Assert
			expect(input.multiple).toBe(true);
		});

		it('pluralizes button prompt text', () => {
			// Act
			const { getByText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					onSelect={() => {}}
				/>
			);

			// Assert
			getByText('Choose files');
		});

		it('pluralizes zone prompt text', () => {
			// Act
			const { getByText } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					zone
					onSelect={() => {}}
				/>
			);

			// Assert
			getByText(/Drag files here/);
		});

		it('calls onClear when last file is removed', () => {
			// Arrange
			const handleClear = mock(() => {});
			const { getByLabelText, getByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					zone
					onSelect={() => {}}
					onClear={handleClear}
				/>
			);
			const file = makeFile('a.pdf', 100, 'application/pdf');
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file] } });

			// Act — remove the only file
			fireEvent.click(getByRole('button', { name: /remove a\.pdf/i }));

			// Assert
			expect(handleClear).toHaveBeenCalled();
		});

		it('shows maxFiles error when adding to a full list', () => {
			// Arrange
			const handleSelect = mock(() => {});
			const { getByLabelText, getByRole } = render(
				<FileInput
					label={label}
					name={name}
					accept=".pdf"
					maxSize={maxSize}
					multiple
					maxFiles={1}
					onSelect={handleSelect}
				/>
			);
			const file1 = makeFile('a.pdf', 100, 'application/pdf');
			const file2 = makeFile('b.pdf', 100, 'application/pdf');

			// Add first file
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file1] } });

			// Act — try to add another
			fireEvent.change(getByLabelText(/Upload/), { target: { files: [file2] } });

			// Assert
			expect(handleSelect).toHaveBeenCalledTimes(1);
			expect(getByRole('alert').textContent).toContain('Maximum 1 files');
		});
	});
});
