#!/usr/bin/env node
/**
 * One-off: normalize the site footer to the canonical AdsGupta footer snippet.
 * Run from repo root: node scripts/update-footer-html.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const NEW_FOOTER = `<footer data-testid="footer-section" class="relative py-16 md:py-24 bg-[#0A0A0A] dark:bg-[#0A0A0A] border-t border-white/5" role="contentinfo"><div class="max-w-[1200px] mx-auto px-6 md:px-12"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16"><div><h3 class="text-3xl md:text-4xl font-bold text-white font-sans mb-4 tracking-tight">Stay Ahead of<br>the Curve</h3><p class="text-zinc-400 text-lg mb-8 max-w-md">Get exclusive insights on AI advertising, delivered to your inbox.</p><form class="flex gap-3" aria-label="Newsletter signup"><input placeholder="Enter your email" data-testid="newsletter-input" class="newsletter-input flex-1 px-5 py-4 rounded-full text-white placeholder-zinc-500 font-medium" required="" type="email" aria-label="Email for newsletter"><button type="submit" data-testid="newsletter-submit" class="glow-button w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]" aria-label="Subscribe"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></button></form></div><div class="grid grid-cols-2 md:grid-cols-4 gap-8"><div><h4 class="text-white font-semibold mb-4 text-sm tracking-wide">Platform</h4><ul class="space-y-3"><li><a href="https://demoai.adsgupta.com" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">AI Sandbox</a></li><li><a href="https://adsgupta.com/#features" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">Features</a></li><li><a href="https://adsgupta.com/" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">Pricing</a></li></ul></div><div><h4 class="text-white font-semibold mb-4 text-sm tracking-wide">Resources</h4><ul class="space-y-3"><li><a class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm" href="/insights">Blog</a></li><li><a href="https://adsgupta.com/" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">Documentation</a></li><li><a href="https://adsgupta.com/" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">API</a></li></ul></div><div><h4 class="text-white font-semibold mb-4 text-sm tracking-wide">Company</h4><ul class="space-y-3"><li><a class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm" href="/about">About</a></li><li><a class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm" href="/contact">Contact</a></li><li><a href="https://adsgupta.com/" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">Careers</a></li></ul></div><div><h4 class="text-white font-semibold mb-4 text-sm tracking-wide">Legal</h4><ul class="space-y-3"><li><a href="https://adsgupta.com/privacy" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a></li><li><a href="https://adsgupta.com/terms" class="text-zinc-500 hover:text-white transition-colors duration-300 text-sm">Terms of Service</a></li></ul></div></div></div><div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"><div class="flex items-center gap-6"><a href="https://adsgupta.com" class="text-2xl font-bold text-white font-sans">ADS<span class="text-cyan-400">GUPTA</span></a><span class="text-zinc-600 text-sm">© 2026 Ads Gupta. All rights reserved.</span></div><div class="flex items-center gap-4"><a href="https://twitter.com/adsgupta" target="_blank" rel="noopener noreferrer" data-testid="social-twitter" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a><a href="https://linkedin.com/company/adsgupta" target="_blank" rel="noopener noreferrer" data-testid="social-linkedin" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a></div></div></div></footer>`;

// Match any footer that declares data-testid="footer-section"
const FOOTER_RE = /<footer[^>]*data-testid="footer-section"[\s\S]*?<\/footer>/;

function findHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.name === 'node_modules' || e.name === '.git') continue;
    if (e.isDirectory()) findHtmlFiles(full, list);
    else if (e.name === 'index.html') list.push(full);
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
  if (!content.includes('data-testid="footer-section"')) continue;
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