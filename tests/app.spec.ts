import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
test('lista, pesquisa, estado vazio, layout e uso sem rede', async ({ page, context }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('article')).toHaveCount(5);
  await mkdir('docs/screenshots', { recursive: true });
  await page.screenshot({ path: 'docs/screenshots/inicio-mobile.png', fullPage: true });
  const search = page.getByRole('searchbox');
  await search.fill('FRONT-END');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(page.getByRole('article')).toContainText('Orbit Tecnologia');
  await search.fill('  codigo  ');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(page.getByRole('article')).toContainText('Código Aberto');
  await page.screenshot({ path: 'docs/screenshots/busca-mobile.png', fullPage: true });
  await search.fill('inexistente');
  await expect(page.getByText('Nenhuma vaga encontrada')).toBeVisible();
  await page.getByRole('button', { name: 'Limpar busca' }).click();
  await expect(page.getByRole('article')).toHaveCount(5);
  await context.setOffline(true);
  await search.fill('nuvem');
  await expect(page.getByRole('article')).toHaveCount(1);
  await search.fill('');
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.screenshot({ path: 'docs/screenshots/inicio-desktop.png', fullPage: true });
  expect(errors).toEqual([]);
});