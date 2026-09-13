import "@testing-library/jest-dom";
import { afterEach, jest } from "@jest/globals";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});
