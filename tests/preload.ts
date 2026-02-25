import { afterEach } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { cleanup } from '@testing-library/preact';

GlobalRegistrator.register();

afterEach(cleanup);
