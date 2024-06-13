import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ImageEditorTools } from './ImageEditorTools';

describe('ImageEditorTools Component', () => {
  const defaultProps = {
    width: 600,
    height: 400,
    greyscale: false,
    blur: 0,
    onWidthChange: vi.fn(),
    onHeightChange: vi.fn(),
    onGreyscaleChange: vi.fn(),
    onBlurChange: vi.fn(),
  };

  test('renders correctly with given props', () => {
    render(<ImageEditorTools {...defaultProps} />);

    expect(screen.getByLabelText('Width:')).toHaveValue(600);
    expect(screen.getByLabelText('Height:')).toHaveValue(400);
    expect(screen.getByLabelText('Greyscale:')).not.toBeChecked();
    expect(screen.getByLabelText('Blur:')).toHaveValue('0');
  });

  test('calls onWidthChange with debounced value', async () => {
    render(<ImageEditorTools {...defaultProps} />);
    const widthInput = screen.getByLabelText('Width:');

    fireEvent.change(widthInput, { target: { value: '800' } });

    await waitFor(
      () => {
        expect(defaultProps.onWidthChange).toHaveBeenCalledWith(800);
      },
      { timeout: 600 }
    );
  });

  test('calls onHeightChange with debounced value', async () => {
    render(<ImageEditorTools {...defaultProps} />);
    const heightInput = screen.getByLabelText('Height:');

    fireEvent.change(heightInput, { target: { value: '600' } });

    await waitFor(
      () => {
        expect(defaultProps.onHeightChange).toHaveBeenCalledWith(600);
      },
      { timeout: 600 }
    );
  });

  test('calls onGreyscaleChange when greyscale checkbox changes', () => {
    render(<ImageEditorTools {...defaultProps} />);
    const greyscaleInput = screen.getByLabelText('Greyscale:');

    fireEvent.click(greyscaleInput);
    expect(defaultProps.onGreyscaleChange).toHaveBeenCalledWith(true);
  });

  test('calls onBlurChange when blur range input changes', () => {
    render(<ImageEditorTools {...defaultProps} />);
    const blurInput = screen.getByLabelText('Blur:');

    fireEvent.change(blurInput, { target: { value: '5' } });
    expect(defaultProps.onBlurChange).toHaveBeenCalledWith(5);
  });
});
