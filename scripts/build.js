#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Subify Chrome Extension...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
    console.log('✅ Cleaned dist directory');
  }

  // Run webpack build
  console.log('📦 Running webpack build...');
  execSync('npx webpack --mode production', { stdio: 'inherit' });

  // Create package info
  const packageInfo = {
    name: 'subify-chrome-extension',
    version: '1.0.0',
    buildDate: new Date().toISOString(),
    files: fs.readdirSync('dist')
  };

  fs.writeFileSync(
    path.join('dist', 'package-info.json'),
    JSON.stringify(packageInfo, null, 2)
  );

  console.log('✅ Build completed successfully!');
  console.log('📁 Output directory: dist/');
  console.log('📋 Files created:', packageInfo.files.join(', '));

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
