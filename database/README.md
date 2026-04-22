# Ice Star Database Setup

This directory contains database migration and seed scripts for the Ice Star administrative panel.

## Overview

The database setup consists of three main scripts that run automatically when the Docker container is initialized:

1. **01-create-tables.sql** - Creates initial tables for the landing page (services, applications, differentials, contact submissions, site settings)
2. **02-admin-panel-tables.sql** - Creates tables for the admin panel (admin_users, content_sections, logos, content_history)
3. **03-initial-admin-seed.sql** - Creates the initial administrator account
4. **04-migrate-content-seed.sql** - Migrates existing hardcoded content from components to the database

## Database Schema

### Admin Panel Tables

#### admin_users
Stores administrator user accounts for the admin panel.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| email | VARCHAR(255) | Unique email address for login |
| password_hash | VARCHAR(255) | Bcrypt hashed password |
| created_at | TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | Last modification timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `email`
- INDEX on `email` (idx_email)

#### content_sections
Stores flexible content for simple sections using JSON format.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| section_key | VARCHAR(100) | Unique section identifier (hero, about, cta, etc.) |
| section_data | JSON | JSON object containing all section fields |
| updated_at | TIMESTAMP | Last modification timestamp |
| updated_by | VARCHAR(255) | Email of admin who made the change |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `section_key`
- INDEX on `section_key` (idx_section_key)
- INDEX on `updated_at` (idx_updated_at)

**Content Sections:**
- `hero` - Hero section content (main_title, subtitle, description, buttons)
- `about` - About section content (title, description, benefits)
- `cta` - Call-to-action section content (headline, button_text)
- `contact_form` - Contact form content (labels, placeholders, messages)
- `footer` - Footer content (company info, contact details, social links)

#### logos
Tracks uploaded logo files and active logo selection.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| file_name | VARCHAR(255) | Original or sanitized filename |
| file_path | VARCHAR(500) | Relative path from public directory |
| file_size | INT | File size in bytes |
| mime_type | VARCHAR(100) | MIME type (image/png, image/jpeg, etc.) |
| uploaded_at | TIMESTAMP | Upload timestamp |
| is_active | BOOLEAN | Currently active logo flag (only one should be true) |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `is_active` (idx_is_active)
- INDEX on `uploaded_at` (idx_uploaded_at)

#### content_history
Tracks content change history for audit and recovery.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| section_key | VARCHAR(100) | Section identifier |
| field_key | VARCHAR(100) | Specific field that changed |
| old_value | TEXT | Previous value |
| new_value | TEXT | New value |
| changed_by | VARCHAR(255) | Email of admin who made the change |
| changed_at | TIMESTAMP | Change timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `section_key` (idx_section_key)
- INDEX on `changed_at` (idx_changed_at)
- INDEX on `changed_by` (idx_changed_by)

## Initial Admin Credentials

The initial administrator account is created automatically with the following credentials:

- **Email:** admin@icestar.com
- **Password:** IceStar2024!Admin#Secure

**⚠️ SECURITY NOTICE:**
- This is a temporary password for initial setup
- **Change this password immediately after first login**
- Store the new password securely
- Do not share credentials via insecure channels

## Running the Scripts

### Automatic Execution (First Time Setup)

When you start the Docker container for the first time, all scripts in the `database/init/` directory are executed automatically in alphabetical order:

```bash
docker-compose up -d
```

### Manual Execution (After Container is Running)

If you need to run the scripts manually (e.g., after modifying them), use the following commands:

**PowerShell:**
```powershell
# Run admin panel tables migration
Get-Content database/init/02-admin-panel-tables.sql | docker exec -i istar_db mysql -uroot -proot istar

# Run initial admin seed
Get-Content database/init/03-initial-admin-seed.sql | docker exec -i istar_db mysql -uroot -proot istar

# Run content migration seed
Get-Content database/init/04-migrate-content-seed.sql | docker exec -i istar_db mysql -uroot -proot istar
```

**Bash/Linux:**
```bash
# Run admin panel tables migration
docker exec -i istar_db mysql -uroot -proot istar < database/init/02-admin-panel-tables.sql

# Run initial admin seed
docker exec -i istar_db mysql -uroot -proot istar < database/init/03-initial-admin-seed.sql

# Run content migration seed
docker exec -i istar_db mysql -uroot -proot istar < database/init/04-migrate-content-seed.sql
```

## Verification

### Verify Tables Were Created

```bash
docker exec -i istar_db mysql -uroot -proot istar -e "SHOW TABLES;"
```

Expected output should include:
- admin_users
- content_sections
- logos
- content_history
- (plus existing tables: services, vehicle_applications, differentials, etc.)

### Verify Initial Admin User

```bash
docker exec -i istar_db mysql -uroot -proot istar -e "SELECT email, created_at FROM admin_users;"
```

Expected output:
```
email                   created_at
admin@icestar.com       [timestamp]
```

### Verify Content Sections

```bash
docker exec -i istar_db mysql -uroot -proot istar -e "SELECT section_key, updated_by, updated_at FROM content_sections ORDER BY section_key;"
```

Expected output should include 5 sections:
- about
- contact_form
- cta
- footer
- hero

### Verify Content Data

```bash
docker exec -i istar_db mysql -uroot -proot istar -e "SELECT section_key, JSON_PRETTY(section_data) FROM content_sections WHERE section_key = 'hero';"
```

This will display the hero section content in a readable JSON format.

### Verify Brand Name Update

```bash
docker exec -i istar_db mysql -uroot -proot istar -e "SELECT setting_key, setting_value FROM site_settings WHERE setting_key = 'site_name';"
```

Expected output:
```
setting_key     setting_value
site_name       Ice Star
```

## Idempotency

All scripts are designed to be idempotent, meaning they can be run multiple times safely without causing errors or duplicate data:

- Tables are created with `CREATE TABLE IF NOT EXISTS`
- Data is inserted with `INSERT ... WHERE NOT EXISTS` checks
- Updates use conditional logic to prevent unnecessary changes

## Troubleshooting

### Scripts Not Running on Container Start

If the scripts don't run automatically:

1. Stop and remove the container and volume:
   ```bash
   docker-compose down -v
   ```

2. Start fresh:
   ```bash
   docker-compose up -d
   ```

### Manual Script Execution Fails

If manual execution fails, check:

1. Container is running:
   ```bash
   docker ps
   ```

2. Database is ready:
   ```bash
   docker logs istar_db
   ```

3. Correct credentials are used (root/root)

### Verify Database Connection

Test the database connection:

```bash
docker exec -i istar_db mysql -uroot -proot -e "SELECT VERSION();"
```

## Database Access

### Using phpMyAdmin

Access phpMyAdmin at: http://localhost:8090

- **Server:** istar_db
- **Username:** root
- **Password:** root

### Using MySQL CLI

```bash
docker exec -it istar_db mysql -uroot -proot istar
```

### Using Application Connection

The application connects using the credentials in `.env.local`:

```
DATABASE_HOST=localhost
DATABASE_PORT=3307
DATABASE_NAME=istar
DATABASE_USER=istar_user
DATABASE_PASSWORD=istar_password
```

## Content Migration Details

The content migration script (`04-migrate-content-seed.sql`) extracts content from the following components:

1. **Hero Section** (src/components/sections/Hero.tsx)
   - Main title, subtitle, description
   - Primary and secondary button text

2. **About Section** (src/components/sections/About.tsx)
   - Section title and main description
   - Four benefit items with icons, titles, and descriptions

3. **CTA Section** (src/components/sections/CTASection.tsx)
   - Headline and button text

4. **Contact Form Section** (src/components/sections/ContactForm.tsx)
   - Section title and description
   - Form field labels and placeholders
   - Submit button text and success message

5. **Footer Section** (src/components/layout/Footer.tsx)
   - Company name and description
   - Contact information (phone, email, address)
   - Social media links
   - Copyright text

### Brand Name Correction

The migration script also corrects the brand name from "iStar" to "Ice Star" throughout the content and in the site_settings table, as specified in Requirement 23.1.

## Next Steps

After the database setup is complete:

1. ✅ Verify all tables were created successfully
2. ✅ Verify initial admin user exists
3. ✅ Verify content sections were populated
4. ✅ Verify brand name was updated to "Ice Star"
5. ⏭️ Proceed to Task 2: Authentication System Foundation
6. ⏭️ Test admin login with initial credentials
7. ⏭️ Change the initial admin password

## Maintenance

### Backup Database

```bash
docker exec istar_db mysqldump -uroot -proot istar > backup.sql
```

### Restore Database

```bash
docker exec -i istar_db mysql -uroot -proot istar < backup.sql
```

### Reset Database

To completely reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

This will recreate the database and run all init scripts again.
