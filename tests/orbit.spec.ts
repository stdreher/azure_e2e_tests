import { test, expect } from '@playwright/test';
import { time } from 'console';

test('Orbit page has title', async ({ page }) => {
  await page.goto('https://www.orbit.de');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("ORBIT IT-Solutions Bonn – wir digitalisieren den Mittelstand");
});

test('Check started link and subpage', async ({ page }) => {
  await page.goto('https://www.orbit.de');

  // Wait for the page to load completely.
  await page.waitForLoadState('networkidle');

  // Ensure the page has loaded by checking for the presence of a specific element.
  await expect(page.getByRole('heading', { name: 'ORBIT IT-Solutions Bonn' })).toBeVisible();

  // Click the accept cookies button if it appears.
  const acceptCookiesButton = page.getByRole('button', { name: 'Alle akzeptieren' });
  if (await acceptCookiesButton.isVisible()) {
    await acceptCookiesButton.click();
  } else {
    console.log('Accept cookies button not found or not visible.');
  }

  // Ensure the page has loaded by checking for the presence of a specific element.
  await expect(page.getByRole('heading', { name: 'ORBIT IT-Solutions Bonn' })).toBeVisible();

  // Ensure the get started link has the correct href attribute.
  const getStartedLink = page.getByRole('link', { name: 'Mehr über ORBIT IT-Solutions Bonn' });
  await expect(getStartedLink).toHaveAttribute('href', 'https://www.orbit.de/unternehmen/');

  // Ensure the get started link is visible.
  await expect(getStartedLink).toBeVisible();

  // Log the href attribute of the get started link.
  const href = await getStartedLink.getAttribute('href');
  console.log(`Get started link href: ${href}`);

  // Click the get started link.
  await getStartedLink.click();

  // Expects page to have a heading
  await expect(page.getByText('Das sind wir von ORBIT')).toContainText('Das sind wir von ORBIT');
  
  // Ensure the page has loaded by checking for the presence of a specific element.
  await expect(page.getByText('Das sind wir von ORBIT')).toContainText('Das sind wir von ORBIT');

  // Log the alt text of the image1
  const image = page.getByAltText('Team im Meetingraum beim Unternehmen ORBIT');
  await expect(image).toBeVisible();
  

  // Log the alt text of the image2.
  const image2 = page.getByAltText('Event auf der Rooftopbar beim Unternehmen ORBIT in Bonn');
  await expect(image).toBeVisible();

  // Log the href attribute of image2.
  const href_image2 = await image2.getAttribute('src');
  console.log(`Image2 href: ${href_image2}`);

  // Contact link in the main content area should be visible
  const kontaktLink = page.getByRole('link', { name: 'Kontakt', exact: true }).first();
  await expect(kontaktLink).toBeVisible();

  // Click the visible Kontakt link
  await kontaktLink.click();

});
