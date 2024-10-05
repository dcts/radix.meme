import { shortenString } from "./index";

/* Test shortenString function */
describe("shortenWalletAddress", () => {
  it("should return the same string for too short strings", () => {
    const shortString = "abc123";
    const result = shortenString(shortString);
    expect(result).toBe(shortString);
  });

  it("should shorten an address by default using '...' separator and using 4 chars at start and end", () => {
    const address =
      "account_rdx128j46ndap3fvlkdg6llzja9qteamr8ve89cjjyyekh2gggfpw34yxq";
    const expectedShortened = "acco...4yxq";
    const result = shortenString(address);
    expect(result).toBe(expectedShortened);
  });

  it("should correctly select starting and ending chars", () => {
    const address =
      "account_rdx128j46ndap3fvlkdg6llzja9qteamr8ve89cjjyyekh2gggfpw34yxq";
    const expectedShortened = "account...34yxq";
    const result = shortenString(address, 7, 5);
    expect(result).toBe(expectedShortened);
  });

  it("should correctly select separator", () => {
    const address = "component_asdo823hdksviuzv982ev";
    const expectedShortened = "comp----82ev";
    const result = shortenString(address, 4, 4, "----");
    expect(result).toBe(expectedShortened);
  });
});
