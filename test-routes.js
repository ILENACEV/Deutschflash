#!/usr/bin/env node
const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://localhost:9002';

const routes = [
  { path: '/', name: 'Landing Page', expectContent: ['Научи германски'] },
  { path: '/dashboard', name: 'Dashboard', expectContent: ['SM-2'] },
  { path: '/session', name: 'Session', expectContent: ['SM-2'] },
  { path: '/words', name: 'Words', expectContent: ['words'] },
  { path: '/settings', name: 'Settings', expectContent: ['settings'] },
  { path: '/stats', name: 'Stats', expectContent: ['stats'] },
  { path: '/decks', name: 'Decks', expectContent: ['decks'] },
  { path: '/mistakes', name: 'Mistakes', expectContent: ['mistakes'] },
  { path: '/wordle', name: 'Wordle', expectContent: ['Wordle'] },
  { path: '/grammar', name: 'Grammar', expectContent: ['grammar'] },
  { path: '/dialogs', name: 'Dialogs', expectContent: ['dialogs'] },
  { path: '/verbs', name: 'Verbs', expectContent: ['verbs'] },
  { path: '/adjectives', name: 'Adjectives', expectContent: ['adjectives'] },
  { path: '/cases', name: 'Cases', expectContent: ['cases'] },
  { path: '/stories', name: 'Stories', expectContent: ['stories'] },
  { path: '/placement', name: 'Placement', expectContent: ['placement'] },
  { path: '/spelling', name: 'Spelling', expectContent: ['spelling'] },
  { path: '/phrases', name: 'Phrases', expectContent: ['phrases'] },
  { path: '/listening', name: 'Listening', expectContent: ['listening'] },
  { path: '/idioms', name: 'Idioms', expectContent: ['idioms'] },
  { path: '/lessons', name: 'Lessons', expectContent: ['lessons'] },
  { path: '/import', name: 'Import', expectContent: ['import'] },
  { path: '/discovery', name: 'Discovery', expectContent: ['discovery'] },
  { path: '/sentences', name: 'Sentences', expectContent: ['sentences'] },
  { path: '/privacy', name: 'Privacy', expectContent: ['приватност'] },
];

async function testRoutes() {
  console.log('🧪 DeutschFlash Automatic Test\n');
  console.log(`Base URL: ${BASE_URL}\n`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let passed = 0;
  let failed = 0;
  const errors = [];

  for (const route of routes) {
    const url = `${BASE_URL}${route.path}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      if (response.status() !== 200) {
        throw new Error(`HTTP ${response.status()}`);
      }

      const content = await page.content();
      const hasContent = route.expectContent.some(term => 
        content.toLowerCase().includes(term.toLowerCase())
      );

      if (!hasContent) {
        throw new Error(`Missing: ${route.expectContent.join(', ')}`);
      }

      console.log(`✅ ${route.name} (${route.path})`);
      passed++;
    } catch (error) {
      console.log(`❌ ${route.name} (${route.path}) - ${error.message}`);
      failed++;
      errors.push({ route: route.name, path: route.path, error: error.message });
    }
  }

  console.log('\n📊 Results:');
  console.log(`   Passed: ${passed}/${routes.length}`);
  console.log(`   Failed: ${failed}/${routes.length}`);

  if (errors.length > 0) {
    console.log('\n❌ Failed routes:');
    errors.forEach(e => console.log(`   - ${e.route}: ${e.error}`));
  }

  await browser.close();
  process.exit(failed > 0 ? 1 : 0);
}

testRoutes().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
