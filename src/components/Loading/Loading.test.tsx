import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Loading } from './Loading';

describe('Loading component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});