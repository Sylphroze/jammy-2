// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.location methods that aren't implemented in JSDOM
Object.defineProperty(window, 'location', {
  writable: true,
  value: { assign: jest.fn() }
});

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
