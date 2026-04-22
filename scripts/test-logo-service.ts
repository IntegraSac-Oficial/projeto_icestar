/**
 * Test script for logo service functions
 * 
 * Tests the validation, sanitization, and filename generation functions
 */

import { 
  validateFile, 
  sanitizeFilename, 
  generateUniqueFilename 
} from '../src/lib/services/logo.service';

console.log('=== Testing Logo Service Functions ===\n');

// Test 1: validateFile with valid PNG
console.log('Test 1: Validate valid PNG file');
const validPng = new File(['test'], 'logo.png', { type: 'image/png' });
Object.defineProperty(validPng, 'size', { value: 1024 * 1024 }); // 1MB
const result1 = validateFile(validPng);
console.log('Result:', result1);
console.log('Expected: { valid: true }');
console.log('Pass:', result1.valid === true, '\n');

// Test 2: validateFile with invalid type
console.log('Test 2: Validate invalid file type (PDF)');
const invalidType = new File(['test'], 'document.pdf', { type: 'application/pdf' });
Object.defineProperty(invalidType, 'size', { value: 1024 * 1024 });
const result2 = validateFile(invalidType);
console.log('Result:', result2);
console.log('Expected: { valid: false, error: "..." }');
console.log('Pass:', result2.valid === false && result2.error !== undefined, '\n');

// Test 3: validateFile with file too large
console.log('Test 3: Validate file too large (6MB)');
const tooLarge = new File(['test'], 'logo.png', { type: 'image/png' });
Object.defineProperty(tooLarge, 'size', { value: 6 * 1024 * 1024 }); // 6MB
const result3 = validateFile(tooLarge);
console.log('Result:', result3);
console.log('Expected: { valid: false, error: "..." }');
console.log('Pass:', result3.valid === false && result3.error !== undefined, '\n');

// Test 4: sanitizeFilename removes special characters
console.log('Test 4: Sanitize filename with special characters');
const filename1 = 'my logo!@#$%^&*().png';
const sanitized1 = sanitizeFilename(filename1);
console.log('Input:', filename1);
console.log('Output:', sanitized1);
console.log('Expected: Only alphanumeric, hyphens, underscores, dots');
console.log('Pass:', /^[a-zA-Z0-9\-_.]+$/.test(sanitized1), '\n');

// Test 5: sanitizeFilename removes path traversal
console.log('Test 5: Sanitize filename with path traversal');
const filename2 = '../../etc/passwd.png';
const sanitized2 = sanitizeFilename(filename2);
console.log('Input:', filename2);
console.log('Output:', sanitized2);
console.log('Expected: No path traversal sequences');
console.log('Pass:', !sanitized2.includes('..') && !sanitized2.includes('/'), '\n');

// Test 6: sanitizeFilename replaces spaces with hyphens
console.log('Test 6: Sanitize filename with spaces');
const filename3 = 'my company logo.png';
const sanitized3 = sanitizeFilename(filename3);
console.log('Input:', filename3);
console.log('Output:', sanitized3);
console.log('Expected: Spaces replaced with hyphens');
console.log('Pass:', sanitized3 === 'my-company-logo.png', '\n');

// Test 7: generateUniqueFilename creates unique names
console.log('Test 7: Generate unique filename');
const original = 'logo.png';
const unique1 = generateUniqueFilename(original);
const unique2 = generateUniqueFilename(original);
console.log('Original:', original);
console.log('Unique 1:', unique1);
console.log('Unique 2:', unique2);
console.log('Expected: Different filenames with format logo-{timestamp}-{random}.png');
console.log('Pass:', unique1 !== unique2 && unique1.startsWith('logo-') && unique1.endsWith('.png'), '\n');

// Test 8: generateUniqueFilename preserves extension
console.log('Test 8: Generate unique filename preserves extension');
const jpgFile = 'company-logo.jpg';
const uniqueJpg = generateUniqueFilename(jpgFile);
console.log('Original:', jpgFile);
console.log('Unique:', uniqueJpg);
console.log('Expected: Ends with .jpg');
console.log('Pass:', uniqueJpg.endsWith('.jpg'), '\n');

console.log('=== All Tests Complete ===');
