import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This is the MSW server for Node (tests, storybook, etc.).
export const server = setupServer(...handlers);
