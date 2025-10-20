#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Packaging Subify Chrome Extension...');

try {
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    console.log('❌ dist directory not found. Run npm run build first.');
    process.exit(1);
  }

  // Create package name with version
  const packageName = `subify-extension-v1.0.0-${new Date().toISOString().split('T')[0]}.zip`;

  // Remove existing package
  if (fs.existsSync(packageName)) {
    fs.unlinkSync(packageName);
  }

  // Create zip package
  console.log('🗜️ Creating zip package...');

  if (process.platform === 'win32') {
    execSync(`powershell Compress-Archive -Path dist/* -DestinationPath ${packageName}`, { stdio: 'inherit' });
  } else {
    execSync(`zip -r ${packageName} dist/`, { stdio: 'inherit' });
  }

  // Get file size
  const stats = fs.statSync(packageName);
  const fileSizeInKB = Math.round(stats.size / 1024);

  console.log('✅ Package created successfully!');
  console.log(`📦 Package name: ${packageName}`);
  console.log(`📏 Package size: ${fileSizeInKB} KB`);
  console.log('🚀 Ready for Chrome Web Store upload!');

} catch (error) {
  console.error('❌ Packaging failed:', error.message);
  process.exit(1);
}
