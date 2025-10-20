#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Subify development build...');

try {
  // Clean and build
  console.log('📦 Building extension...');
  execSync('npm run build', { stdio: 'inherit' });

  // Get absolute path to dist directory
  const distPath = path.resolve(__dirname, '..', 'dist');

  console.log('✅ Build completed successfully!');
  console.log('');
  console.log('📁 Extension ready for loading:');
  console.log(`   ${distPath}`);
  console.log('');
  console.log('🔧 To load in Chrome:');
  console.log('   1. Go to chrome://extensions/');
  console.log('   2. Enable "Developer mode"');
  console.log('   3. Click "Load unpacked"');
  console.log('   4. Select the dist folder above');
  console.log('');
  console.log('🔄 For development with auto-rebuild:');
  console.log('   Run: npm run dev');
  console.log('   Then reload the extension in Chrome');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
