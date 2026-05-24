import { test, expect } from 'playwright/test'

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Cameo', path: '/cameo' },
  { name: 'Court', path: '/court' },
  { name: 'Guillotine', path: '/guillotine' },
  { name: 'Invalid', path: '/invalid' },
  { name: 'Meeting', path: '/meeting' },
  { name: 'Megachurch', path: '/megachurch' },
  { name: 'Pretend', path: '/pretend' },
  { name: 'Sisyphus', path: '/sisyphus' },
  { name: 'Stats', path: '/stats' },
  { name: 'Wrongest', path: '/wrongest' },
]

for (const { name, path } of pages) {
  test(`${name} — no white screen`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto(path)

    const app = page.locator('#app')
    await expect(app).not.toBeEmpty()

    expect(errors, `Uncaught JS errors on ${path}: ${errors.join('; ')}`).toHaveLength(0)
  })
}
