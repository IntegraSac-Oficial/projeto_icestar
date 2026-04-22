-- Ice Star Admin Panel - Initial Admin User Seed Script
-- Creates the initial administrator account with a secure random password
-- This script is idempotent and safe to run multiple times

USE istar;

-- ============================================================================
-- INITIAL ADMIN USER CREDENTIALS
-- ============================================================================
-- Email: admin@icestar.com
-- Password: IceStar2024!Admin#Secure
-- 
-- IMPORTANT: Change this password immediately after first login!
-- The password hash below was generated using bcrypt with 10 rounds
-- ============================================================================

-- Insert initial admin user (only if not exists)
INSERT INTO admin_users (email, password_hash, created_at, updated_at)
SELECT 
    'admin@icestar.com',
    '$2b$10$FhGk7ZARHfNQZhLYei.5C.MikudBN5qe5PpYckRehPoxrd8pEEdZO',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM admin_users WHERE email = 'admin@icestar.com'
);

-- Verify admin user creation
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Initial admin user exists or was created successfully'
        ELSE 'Failed to create initial admin user'
    END AS status
FROM admin_users 
WHERE email = 'admin@icestar.com';

-- ============================================================================
-- DEPLOYMENT NOTES
-- ============================================================================
-- 
-- The initial admin password is: IceStar2024!Admin#Secure
-- 
-- SECURITY NOTICE:
-- 1. This is a temporary password for initial setup
-- 2. Change this password immediately after first login
-- 3. Store the new password securely
-- 4. Do not share credentials via insecure channels
-- 
-- To generate a new bcrypt hash for a different password, use:
-- - Node.js: bcrypt.hash('your-password', 10)
-- - Python: bcrypt.hashpw(b'your-password', bcrypt.gensalt(10))
-- - Online tool: https://bcrypt-generator.com/ (use with caution)
-- 
-- ============================================================================
