#!/usr/bin/env node
/**
 * One-off: replace old footer with adsgupta.com-matching footer in all HTML files that still have it.
 * Run from repo root: node scripts/update-footer-html.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const NEW_FOOTER = `  <footer class="footer-adsgupta" data-testid="footer-section">
    <div class="footer-adsgupta-inner">
      <div class="footer-adsgupta-top">
        <div class="footer-adsgupta-cta">
          <h3 class="footer-adsgupta-heading">Stay Ahead of<br>the Curve</h3>
          <p class="footer-adsgupta-desc">Get Ranjan Dasgupta on AI advertising, delivered to your inbox.</p>
          <form class="footer-adsgupta-form" action="#" method="post" id="footerNewsletterForm">
            <input type="email" placeholder="Email" class="footer-adsgupta-input" required aria-label="Email for newsletter">
            <button type="submit" class="footer-adsgupta-submit" aria-label="Subscribe">Subscribe</button>
          </form>
        </div>
        <div class="footer-adsgupta-links">
          <div class="footer-adsgupta-col">
            <h4 class="footer-adsgupta-col-title">Platform</h4>
            <ul class="footer-adsgupta-ul">
              <li><a href="https://adsgupta.com" target="_blank" rel="noopener noreferrer">Substack</a></li>
              <li><a href="/feed.xml" rel="noopener">RSS</a></li>
            </ul>
          </div>
          <div class="footer-adsgupta-col">
            <h4 class="footer-adsgupta-col-title">Resources</h4>
            <ul class="footer-adsgupta-ul">
              <li><a href="https://x.com/ranjandsgpt" target="_blank" rel="noopener noreferrer">Twitter (X)</a></li>
              <li><a href="https://www.linkedin.com/in/ranjandsgpt/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/ranjandsgpt" target="_blank" rel="noopener noreferrer">Github</a></li>
            </ul>
          </div>
          <div class="footer-adsgupta-col">
            <h4 class="footer-adsgupta-col-title">Company</h4>
            <ul class="footer-adsgupta-ul">
              <li><a href="/about">About</a></li>
              <li><a href="/work">Work</a></li>
              <li><a href="/insights">Insights</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-adsgupta-col">
            <h4 class="footer-adsgupta-col-title">Legal</h4>
            <ul class="footer-adsgupta-ul">
              <li><a href="https://adsgupta.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://adsgupta.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-adsgupta-bottom">
        <div class="footer-adsgupta-brand-wrap">
          <span class="footer-adsgupta-copy">© 2024 Ranjan Dasgupta. All rights reserved.</span>
          <a href="https://astro.build" target="_blank" rel="noopener noreferrer" class="footer-adsgupta-astro">Built with &lt;3 and Astro</a>
        </div>
      </div>
    </div>
  </footer>`;

// Match <footer class="footer-adsgupta" ...> ... </footer> (any leading whitespace)
const FOOTER_RE = /\s*<footer class="footer-adsgupta" data-testid="footer-section">[\s\S]*?<\/footer>/;

function findHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.name === 'node_modules' || e.name === '.git') continue;
    if (e.isDirectory()) findHtmlFiles(full, list);
    else if (e.name === 'index.html' && dir !== ROOT) list.push(full);
  }
  return list;
}

const htmlFiles = findHtmlFiles(ROOT).filter((f) => {
  const rel = path.relative(ROOT, f);
  return !rel.startsWith('exchange' + path.sep);
});
let updated = 0;
for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('© 2025 Ads Gupta') && !content.includes('Get exclusive insights on AI advertising')) continue;
  if (!FOOTER_RE.test(content)) {
    console.warn('No footer match:', path.relative(ROOT, file));
    continue;
  }
  content = content.replace(FOOTER_RE, NEW_FOOTER);
  fs.writeFileSync(file, content);
  updated++;
  console.log('Updated:', path.relative(ROOT, file));
}
console.log('Done. Updated', updated, 'files.');