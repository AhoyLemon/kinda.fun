import fs from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.bold.blue('\n🗺️  Update Sitemap\n'));

try {
  const gitDate = execSync('git log -1 --format=%cI').toString().trim();
  const lastModDate = gitDate.split('T')[0];

  let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
  sitemap = sitemap.replace(/<lastmod>[\d-]+<\/lastmod>/g, `<lastmod>${lastModDate}</lastmod>`);
  fs.writeFileSync('public/sitemap.xml', sitemap);

  console.log(chalk.green(`✅ sitemap.xml updated — lastmod = ${chalk.bold(lastModDate)}\n`));
} catch (err) {
  console.error(chalk.red(`\n❌ Failed to update sitemap: ${err.message}`));
  process.exit(1);
}
