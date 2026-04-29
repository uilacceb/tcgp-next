import { test, expect } from "@playwright/test";


test.describe("Pokemon 卡片功能測試", () => {
  // 在這個群組裡的每個測試開始前，都先去首頁
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("應該能搜索皮卡丘", async ({ page }) => {
    const searchIcon = page.getByRole("link", { name: "search icon" });
    await searchIcon.click();

    //Verify if it goes to the search Page
    await expect(page).toHaveURL(/\/cards/);

    //Click on the inputField
    const inputField = page.getByRole("searchbox", { name: "Search pokemon" });
    await inputField.fill("pikachu");

    //search
    await page.keyboard.press("Enter");

    //result
    await expect(page.getByText(/Found \d+ cards/)).toBeVisible(); // 驗證有找到卡片
    await expect(
      page.getByText("pikachu", { exact: false }).first(),
    ).toBeVisible();
  });

  test("no matching result", async ({ page }) => {
    const searchIcon = page.getByRole("link", { name: "search icon" });
    await searchIcon.click();

    //Verify if it goes to the search Page
    await expect(page).toHaveURL(/\/cards/);

    //Click on the inputField
    const inputField = page.getByRole("searchbox", { name: "Search pokemon" });
    await inputField.fill("lllllllllll");

    //search
    await page.keyboard.press("Enter");

    //result
    await expect(page.getByText("No results available.")).toBeVisible();
  });

  test("應該能查看卡片詳情", async ({ page }) => {
    //click on the search Icon
    const seriesIcon = page.getByRole("link", {
      name: "Paldean Wonders - logo",
    });
    await seriesIcon.click();

    //Verify if it goes to the search Page
    await expect(page).toHaveURL(/\/B2a/);

    //Click on the inputField
    const card = page.getByRole("link", { name: "Sprigatito" }).first();
    await card.click();

    //search
    await expect(page).toHaveURL(/\/b2a-001/);
    //result
    await expect(page.getByText("Sprigatito")).toBeVisible(); // 驗證
    await expect(page.getByText(/Rarity: \w+/)).toBeVisible();
    await expect(page.getByText("Type:Grass")).toBeVisible();
  });
});
