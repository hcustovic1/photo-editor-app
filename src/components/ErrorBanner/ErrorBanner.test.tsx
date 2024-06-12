import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ErrorBanner } from './ErrorBanner';

describe('ErrorBanner Component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(
      <ErrorBanner message="Error! Please check your internet connection" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
