#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';

// Get the latest git commit date in ISO format
const gitDate = execSync('git log -1 --format=%cI').toString().trim();
const lastModDate = gitDate.split('T')[0]; // Extract just the date part (YYYY-MM-DD)

// Read the sitemap template
let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

// Replace all lastmod dates with the git commit date
sitemap = sitemap.replace(/<lastmod>[\d-]+<\/lastmod>/g, `<lastmod>${lastModDate}</lastmod>`);

// Write back to the file
fs.writeFileSync('public/sitemap.xml', sitemap);

console.log(`Updated sitemap.xml with lastmod date: ${lastModDate}`);
