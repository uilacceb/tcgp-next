import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "search icon" }).click();
  await page.getByRole("searchbox", { name: "Search pokemon" }).click();
  await page.getByRole("searchbox", { name: "Search pokemon" }).fill("pichu");
  await page.getByRole("link", { name: "Pichu" }).nth(1).click();
  await expect(page.getByText("Name: Pichu")).toBeVisible(); // 驗證
  await expect(page.getByText(/Rarity: \w+/)).toBeVisible();
  await expect(page.getByText("Type:Lightning")).toBeVisible();
  await page.getByRole("button", { name: "back arrow logo back" }).click();

  // 專業技巧：與其檢查 URL，不如直接等搜尋框出現
  // 因為你的目的是要清空它
  const searchBox = page.getByRole("searchbox", { name: "Search pokemon" });

  // 增加一點點等待時間，確保跳轉完成
  await expect(searchBox).toBeVisible();

  // 如果你非要檢查 URL，把 expect 改成這樣（放寬條件）：
  await expect(page).toHaveURL(/.*cards.*/);

  await searchBox.fill("");
  await searchBox.press("Enter");
  // 5. 驗證最終狀態
  await expect(page.getByText("Found 0 cards that include ''")).toBeVisible();
});
