import { beforeEach, vi } from 'vitest';
import './setup.base';

export const fetchMock = vi.fn();

vi.stubGlobal('fetch', fetchMock);

beforeEach(() => {
  fetchMock.mockReset();
});
