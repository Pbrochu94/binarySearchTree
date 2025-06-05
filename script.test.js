import { setup } from "./script.js";

describe("test", () => {
  test("test", () => {
    expect(setup.print()).toBe("Test");
  });
});
