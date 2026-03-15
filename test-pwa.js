#!/usr/bin/env node

const BASE_URL = process.env.BASE_URL || 'http://localhost:9002';

async function testPWA() {
  console.log('🧪 PWA & Assets Test\n');
  
  const tests = [
    { url: '/manifest.json', name: 'PWA Manifest', expect: ['name', 'icons'] },
    { url: '/icon-192.png', name: '192px Icon', expect: ['PNG'] },
    { url: '/icon-512.png', name: '512px Icon', expect: ['PNG'] },
    { url: '/og-image.png', name: 'OG Image', expect: ['PNG'] },
    { url: '/favicon.ico', name: 'Favicon', expect: [] },
    { url: '/offline.html', name: 'Offline Page', expect: ['офлајн'] },
    { url: '/sw.js', name: 'Service Worker', expect: ['workbox'] },
  ];

  const https = require('http');

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const response = await new Promise((resolve, reject) => {
        https.get(`${BASE_URL}${test.url}`, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve({ status: res.statusCode, data }));
        }).on('error', reject);
      });

      if (response.status !== 200) {
        console.log(`❌ ${test.name} - HTTP ${response.status}`);
        failed++;
        continue;
      }

      const hasContent = test.expect.length === 0 || 
        test.expect.some(term => response.data.toLowerCase().includes(term.toLowerCase()));

      if (hasContent) {
        console.log(`✅ ${test.name}`);
        passed++;
      } else {
        console.log(`❌ ${test.name} - Missing content`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} - ${error.message}`);
      failed++;
    }
  }

  console.log('\n📊 PWA Results:');
  console.log(`   Passed: ${passed}/${tests.length}`);
  console.log(`   Failed: ${failed}/${tests.length}`);
  
  process.exit(failed > 0 ? 1 : 0);
}

testPWA();
