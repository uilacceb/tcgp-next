import { test, expect } from "@playwright/test";

const searchScenarios = [
  {
    name: "Search Existing pokemon",
    searchTerm: "pikachu",
    expectedText: /Found \d+ cards/,
    shouldSeeCard: true,
  },
  {
    name: "Search Non-Existing pokemon",
    searchTerm: "zzzzzzz",
    expectedText: "No results available.",
    shouldSeeCard: false,
  },
  {
    name: "Search Empty string",
    searchTerm: "",
    expectedText: "Please enter a card name to search",
    shouldSeeCard: false,
  },
];

test.describe("Pokemon data search test", () => {
  searchScenarios.forEach(
    ({ name, searchTerm, expectedText, shouldSeeCard }) => {
      test(name, async ({ page }) => {
        await page.goto("http://localhost:3000/cards");
        const inputField = page.getByRole("searchbox", {
          name: "Search pokemon",
        });
        await inputField.fill(searchTerm);
        await page.keyboard.press("Enter");

        await expect(page.getByText(expectedText)).toBeVisible();

        if (shouldSeeCard) {
          await expect(page.getByRole('link').first()).toBeVisible();
        }
      });
    },
  );
});
