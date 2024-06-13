import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { describe, expect, test, vi } from 'vitest';

vi.useFakeTimers();

describe('useDebounce', () => {
  test('should debounce the value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' },
      }
    );

    // Initial value should be 'initial'
    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated' });

    expect(result.current).toBe('initial');

    // Fast-forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should now be 'updated'
    expect(result.current).toBe('updated');
  });

  test('should reset debounce timer if value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    // Initial value should be 'initial'
    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'first update' });

    // Fast-forward time by 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Update the value again before debounce delay passes
    rerender({ value: 'second update' });

    // Value should still be 'initial' because the debounce delay hasn't passed
    expect(result.current).toBe('initial');

    // Fast-forward time by another 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should now be 'second update'
    expect(result.current).toBe('second update');
  });
});
