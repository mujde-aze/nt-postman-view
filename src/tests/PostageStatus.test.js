import {PostageStatus} from "../models/PostageStatus";

describe("The postage status transition state", () => {
  it("Should be NT_SENT if the current status is NEEDS_NT", () => {
    const nextState = PostageStatus.getTransitionState(PostageStatus.NEEDS_NT);
    expect(nextState).toBe(PostageStatus.NT_SENT);
  });

  it("Should be NT_RECEIVED if the current status is NT_SENT", () => {
    const nextState = PostageStatus.getTransitionState(PostageStatus.NT_SENT);
    expect(nextState).toBe(PostageStatus.NT_RECEIVED);
  });
});
