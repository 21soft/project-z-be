import { getErrorMessage } from "./error";

describe("", () => {
  it("should get message when its instance of error", () => {
    const error = new Error("Test error");
    const errMsg = getErrorMessage(error);

    expect(errMsg).toEqual("Test error");
  });

  it("shoud get string message when its unknown type", () => {
    const errMsg = getErrorMessage(1);

    expect(errMsg).toEqual("1");
  });
});
