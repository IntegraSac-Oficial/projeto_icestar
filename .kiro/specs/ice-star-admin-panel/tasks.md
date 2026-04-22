# Implementation Plan: Ice Star Administrative Panel

## Overview

This implementation plan provides a comprehensive, step-by-step guide for building the Ice Star administrative panel. The system enables authorized administrators to authenticate, manage site content, and upload visual assets through a protected web interface built with Next.js 16 App Router, TypeScript, and MySQL.

The implementation follows a logical progression: database foundation → authentication → backend services → admin UI → logo management → landing page integration → testing and documentation.

## Tasks

- [x] 1. Database Setup and Initial Configuration
  - Create database migration scripts for new tables (admin_users, content_sections, logos, content_history)
  - Create seed script for initial admin user with random password generation
  - Create seed script to migrate existing hardcoded content to database
  - Test database setup with Docker Compose environment
  - Verify all tables created with proper indexes and constraints
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 14.1, 14.2, 14.3, 14.4, 14.5, 16.1, 16.2, 16.3, 16.4, 16.5_

- [ ] 2. Authentication System Foundation
  - [x] 2.1 Install and configure NextAuth.js v5 dependencies
    - Install next-auth, bcrypt, and type definitions
    - Configure NextAuth.js with credentials provider
    - Set up environment variables for auth secrets
    - _Requirements: 1.1, 1.4, 1.5_
  
  - [x] 2.2 Create authentication service module
    - Implement password hashing with bcrypt (10 rounds)
    - Implement password comparison function
    - Implement credential verification against database
    - Create database connection utility with connection pooling
    - _Requirements: 1.4, 1.5, 17.1, 17.2_
  
  - [x] 2.3 Create NextAuth.js API route configuration
    - Configure credentials provider with email/password
    - Implement authorize callback using auth service
    - Configure JWT session strategy with 24-hour expiration
    - Set custom login page path to /admin/login
    - _Requirements: 1.2, 1.3, 1.6, 17.3, 17.4, 17.5_
  
  - [ ]* 2.4 Write unit tests for authentication service
    - Test password hashing produces valid bcrypt hashes
    - Test password comparison with correct and incorrect passwords
    - Test credential verification with valid and invalid credentials
    - Test database connection error handling
    - _Requirements: 1.2, 1.3, 1.4, 1.5_

- [ ] 3. Authentication Middleware and Login UI
  - [x] 3.1 Create authentication middleware
    - Implement middleware to protect /admin/* routes (except /admin/login)
    - Verify session validity using NextAuth.js
    - Redirect unauthenticated users to /admin/login
    - Allow authenticated users to proceed to protected routes
    - _Requirements: 1.8, 3.1, 3.2, 3.3, 3.4_
  
  - [x] 3.2 Create login page component
    - Build login form with email and password inputs
    - Implement form validation using React Hook Form + Zod
    - Handle form submission with NextAuth.js signIn
    - Display authentication errors in Portuguese
    - Redirect to dashboard on successful login
    - _Requirements: 1.1, 1.2, 1.3, 18.1, 18.2, 18.3, 18.4_
  
  - [ ]* 3.3 Write component tests for login page
    - Test login form renders correctly
    - Test validation errors display for empty fields
    - Test form submission with valid credentials
    - Test error message display for invalid credentials
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 4. Checkpoint - Verify authentication system
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Content Management Service Layer
  - [x] 5.1 Create content service module
    - Implement getSection function to retrieve content by section_key
    - Implement getAllSections function to retrieve all content sections
    - Implement updateSection function with validation
    - Implement getSectionHistory function with limit parameter
    - Add error handling for database operations
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 18.1, 18.2, 18.3_
  
  - [x] 5.2 Create content validation schemas
    - Define Zod schemas for hero section (main_title, subtitle, description, buttons)
    - Define Zod schemas for about section (title, description, benefits array)
    - Define Zod schemas for CTA section (headline, button_text)
    - Define Zod schemas for contact_form section (title, description, button, success message)
    - Define Zod schemas for footer section (description, contact info, social links)
    - _Requirements: 5.1, 5.4, 6.1, 10.1, 11.1, 12.1, 12.4, 12.5, 18.1, 18.5_
  
  - [x] 5.3 Implement content history tracking
    - Create function to record content changes before updates
    - Store old_value, new_value, changed_by, changed_at in content_history table
    - Implement history retrieval with pagination
    - _Requirements: 22.1, 22.2, 22.4, 22.5_
  
  - [ ]* 5.4 Write integration tests for content service
    - Test getSection retrieves correct content from database
    - Test updateSection persists changes correctly
    - Test updateSection validates required fields
    - Test content history records changes
    - Test error handling for database failures
    - _Requirements: 4.2, 4.3, 18.1, 18.2, 22.1, 22.5_

- [ ] 6. Content Management API Endpoints
  - [x] 6.1 Create GET /api/admin/content/[section] endpoint
    - Verify session authentication
    - Retrieve section content using content service
    - Return JSON response with section data
    - Handle 404 for non-existent sections
    - Handle 401 for unauthenticated requests
    - _Requirements: 25.1, 25.8, 25.9, 25.10_
  
  - [x] 6.2 Create PUT /api/admin/content/[section] endpoint
    - Verify session authentication
    - Parse and validate request body
    - Update section content using content service
    - Return success response with updated data
    - Handle validation errors with 400 status
    - _Requirements: 25.2, 25.8, 25.9, 25.10, 18.1, 18.2, 18.4_
  
  - [x] 6.3 Create GET /api/admin/content endpoint
    - Verify session authentication
    - Retrieve all content sections using content service
    - Return JSON array of all sections
    - _Requirements: 25.3, 25.8, 25.9, 25.10_
  
  - [ ]* 6.4 Write integration tests for content API endpoints
    - Test GET returns 401 without authentication
    - Test GET returns section content when authenticated
    - Test GET returns 404 for non-existent section
    - Test PUT updates content successfully
    - Test PUT validates required fields
    - Test PUT records content history
    - _Requirements: 25.1, 25.2, 25.8, 25.9, 25.10_

- [ ] 7. Logo Management Service and API
  - [x] 7.1 Create logo service module
    - Implement file validation (MIME type, size, extension)
    - Implement filename sanitization (remove special characters, path traversal)
    - Implement unique filename generation (timestamp + random string)
    - Implement file storage to /public/uploads/logos/
    - Implement database metadata storage
    - Implement active logo management (set is_active flag)
    - _Requirements: 13.2, 13.3, 13.4, 13.5, 13.6, 21.1, 21.2, 21.3, 21.4, 21.5_
  
  - [x] 7.2 Create POST /api/admin/logo endpoint
    - Verify session authentication
    - Parse multipart form data
    - Validate file type (PNG, JPG, JPEG, SVG, WEBP)
    - Validate file size (max 5MB)
    - Upload file using logo service
    - Return logo record with file path
    - Handle validation errors with appropriate messages
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 25.4, 25.8_
  
  - [x] 7.3 Create GET /api/admin/logo endpoint
    - Verify session authentication
    - Retrieve active logo using logo service
    - Return logo record or null if no active logo
    - _Requirements: 13.10, 25.5, 25.8_
  
  - [ ]* 7.4 Write unit tests for logo service
    - Test file validation accepts valid image types
    - Test file validation rejects invalid types
    - Test file validation rejects files over 5MB
    - Test filename sanitization removes special characters
    - Test unique filename generation
    - _Requirements: 13.2, 13.5, 13.6, 21.1, 21.2, 21.3_
  
  - [ ]* 7.5 Write integration tests for logo API
    - Test POST uploads file successfully
    - Test POST validates file type
    - Test POST validates file size
    - Test POST returns 401 without authentication
    - Test GET returns active logo
    - Test GET returns null when no logo exists
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 25.4, 25.5_

- [ ] 8. Checkpoint - Verify backend services
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Admin Panel Layout and Dashboard
  - [x] 9.1 Create admin panel layout component
    - Build responsive layout with navigation sidebar
    - Add navigation menu items (Dashboard, Site Content, Logo Management, Settings)
    - Display authenticated user email in header
    - Add logout button with signOut functionality
    - Highlight active navigation item
    - Apply Tailwind CSS styling consistent with landing page
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 24.1, 24.2, 24.3, 24.4, 24.5_
  
  - [x] 9.2 Create dashboard page component
    - Fetch dashboard data from API (sections, logo, contact submissions count, recent changes)
    - Display last updated timestamp for each content section
    - Display current active logo information
    - Display contact form submissions count
    - Display recent content changes (last 10)
    - Provide quick edit links to each content section
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 22.4_
  
  - [x] 9.3 Create GET /api/admin/dashboard endpoint
    - Verify session authentication
    - Aggregate dashboard data (sections with timestamps, logo info, submission count, recent history)
    - Return JSON response with dashboard data
    - _Requirements: 20.2, 20.3, 20.4, 20.5_
  
  - [ ]* 9.4 Write component tests for dashboard
    - Test dashboard renders all sections
    - Test dashboard displays last updated timestamps
    - Test dashboard displays logo information
    - Test dashboard displays recent changes
    - Test quick edit links navigate correctly
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

- [ ] 10. Content Editor Components
  - [x] 10.1 Create hero section editor page
    - Build form with inputs for main_title, subtitle, description, primary_button_text, secondary_button_text
    - Load current hero content from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to PUT /api/admin/content/hero
    - Display success/error messages in Portuguese
    - Add preview section showing current content
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 18.1, 18.3, 18.4_
  
  - [x] 10.2 Create about section editor page
    - Build form with inputs for section_title, main_description, and four benefit items
    - Each benefit item has title and description fields
    - Load current about content from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to PUT /api/admin/content/about
    - Display success/error messages in Portuguese
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 18.1, 18.3, 18.4_
  
  - [x] 10.3 Create services section editor page
    - Build form with inputs for section_title, section_description
    - Build list of service items with edit capability
    - Each service has title, description, icon fields
    - Load current services from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to update services
    - Maintain service display order
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 18.1, 18.3, 18.4_
  
  - [x] 10.4 Create applications section editor page
    - Build form with inputs for section_title, section_description
    - Build list of application items with edit capability
    - Each application has title, description fields
    - Load current applications from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to update applications
    - Maintain application display order
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 18.1, 18.3, 18.4_
  
  - [x] 10.5 Create differentials section editor page
    - Build form with inputs for section_title, section_description
    - Build list of differential items with edit capability
    - Each differential has title, description, icon fields
    - Load current differentials from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to update differentials
    - Maintain differential display order
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 18.1, 18.3, 18.4_
  
  - [x] 10.6 Create CTA section editor page
    - Build form with inputs for headline, button_text
    - Load current CTA content from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to PUT /api/admin/content/cta
    - Display success/error messages in Portuguese
    - _Requirements: 10.1, 10.2, 10.3, 18.1, 18.3, 18.4_
  
  - [x] 10.7 Create contact form section editor page
    - Build form with inputs for section_title, section_description, submit_button_text, success_message
    - Load current contact_form content from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to PUT /api/admin/content/contact_form
    - Display success/error messages in Portuguese
    - _Requirements: 11.1, 11.2, 11.3, 18.1, 18.3, 18.4_
  
  - [x] 10.8 Create footer section editor page
    - Build form with inputs for company_description, phone, email, address, social_media_links
    - Validate email format and URL formats for social links
    - Load current footer content from API on mount
    - Implement form validation with React Hook Form + Zod
    - Handle form submission to PUT /api/admin/content/footer
    - Display success/error messages in Portuguese
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 18.1, 18.3, 18.4, 18.5_
  
  - [ ]* 10.9 Write component tests for content editors
    - Test each editor renders form correctly
    - Test each editor loads current content
    - Test validation errors display for empty required fields
    - Test form submission with valid data
    - Test success message displays after save
    - _Requirements: 5.1, 6.1, 7.1, 8.1, 9.1, 10.1, 11.1, 12.1, 18.1, 18.4_

- [ ] 11. Logo Upload Component
  - [x] 11.1 Create logo management page
    - Build file upload interface with drag-and-drop support
    - Display file preview before upload
    - Validate file type and size on client side
    - Handle file upload to POST /api/admin/logo
    - Display current active logo with preview
    - Show upload progress indicator
    - Display success/error messages in Portuguese
    - _Requirements: 13.1, 13.2, 13.5, 13.6, 13.10, 18.3, 18.4_
  
  - [ ]* 11.2 Write component tests for logo upload
    - Test file upload interface renders correctly
    - Test file validation on client side
    - Test file preview displays before upload
    - Test current logo displays
    - Test error messages for invalid files
    - _Requirements: 13.1, 13.2, 13.5, 13.6, 13.10_

- [ ] 12. Checkpoint - Verify admin panel UI
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Landing Page Integration - Content Fetcher
  - [x] 13.1 Create content fetcher utility module
    - Implement getHeroContent function with database query
    - Implement getAboutContent function with database query
    - Implement getCTAContent function with database query
    - Implement getContactFormContent function with database query
    - Implement getFooterContent function with database query
    - Implement getActiveLogo function with database query
    - Add 5-minute in-memory caching for all content
    - Provide fallback values for missing content
    - Handle database errors gracefully
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_
  
  - [ ]* 13.2 Write unit tests for content fetcher
    - Test each function retrieves correct content from database
    - Test caching reduces database queries
    - Test fallback values returned when content missing
    - Test error handling for database failures
    - _Requirements: 19.1, 19.2, 19.3, 19.4_

- [x] 14. Landing Page Integration - Update Components
  - [x] 14.1 Update Hero component for dynamic content
    - Modify Hero component to accept content prop
    - Fetch hero content using content fetcher in parent page
    - Replace hardcoded text with dynamic content
    - Add fallback content for missing data
    - Maintain existing styling and structure
    - _Requirements: 5.2, 5.3, 5.5, 19.4, 19.5_
  
  - [x] 14.2 Update About component for dynamic content
    - Modify About component to accept content prop
    - Fetch about content using content fetcher in parent page
    - Replace hardcoded text with dynamic content
    - Add fallback content for missing data
    - Maintain existing styling and structure
    - _Requirements: 6.2, 6.3, 19.4, 19.5_
  
  - [x] 14.3 Update CTASection component for dynamic content
    - Modify CTASection to fetch content from database (already accepts props)
    - Fetch CTA content using content fetcher in parent page
    - Replace hardcoded props with dynamic content
    - Add fallback content for missing data
    - _Requirements: 10.2, 10.3, 19.4, 19.5_
  
  - [x] 14.4 Update ContactForm component for dynamic content
    - Modify ContactForm component to accept content prop
    - Fetch contact_form content using content fetcher in parent page
    - Replace hardcoded labels with dynamic content
    - Add fallback content for missing data
    - Maintain existing form functionality
    - _Requirements: 11.2, 11.3, 19.4, 19.5_
  
  - [x] 14.5 Update Footer component for dynamic content
    - Modify Footer component to accept content prop
    - Fetch footer content using content fetcher in parent page
    - Replace hardcoded contact info with dynamic content
    - Add fallback content for missing data
    - Maintain existing styling and structure
    - _Requirements: 12.2, 12.3, 19.4, 19.5_
  
  - [x] 14.6 Update Header component for dynamic logo
    - Modify Header component to accept logo prop
    - Fetch active logo using content fetcher in parent page
    - Display logo image when available
    - Display "Ice Star" text as fallback when no logo
    - Maintain existing header styling and navigation
    - _Requirements: 13.7, 13.8, 13.9, 19.5, 23.3_
  
  - [x] 14.7 Update main page component to use content fetcher
    - Import content fetcher utility
    - Fetch all content sections on server side
    - Pass content props to all section components
    - Handle errors gracefully with fallback content
    - Verify page renders correctly with dynamic content
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_
  
  - [ ]* 14.8 Write component tests for updated landing page components
    - Test Hero renders with dynamic content
    - Test About renders with dynamic content
    - Test CTASection renders with dynamic content
    - Test ContactForm renders with dynamic content
    - Test Footer renders with dynamic content
    - Test Header renders with logo
    - Test Header renders fallback text when no logo
    - Test components render fallback content when data missing
    - _Requirements: 5.5, 6.3, 10.3, 11.3, 12.3, 13.8, 13.9, 19.4_

- [ ] 15. Checkpoint - Verify landing page integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Error Handling and Security Hardening
  - [~] 16.1 Implement comprehensive error handling
    - Add try-catch blocks to all API endpoints
    - Implement user-friendly error messages in Portuguese
    - Log errors with context for debugging
    - Return appropriate HTTP status codes
    - Handle database connection errors gracefully
    - _Requirements: 18.1, 18.2, 18.3, 18.4_
  
  - [~] 16.2 Implement security measures
    - Add rate limiting to login endpoint (5 attempts per 15 minutes)
    - Implement CSRF protection for admin forms
    - Sanitize all user inputs to prevent XSS
    - Use parameterized queries to prevent SQL injection
    - Set secure cookie flags (HTTP-only, secure in production)
    - Validate file MIME types server-side
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6_
  
  - [~] 16.3 Add logging for security events
    - Log failed login attempts with IP address
    - Log unauthorized access attempts
    - Log file upload rejections
    - Log content changes with admin email
    - Implement log retention policy
    - _Requirements: 22.5_

- [ ] 17. Documentation and Deployment Preparation
  - [~] 17.1 Create API documentation
    - Document all API endpoints with request/response examples
    - Document authentication requirements
    - Document error response formats
    - Document rate limiting policies
    - _Requirements: 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.7, 25.8, 25.9, 25.10_
  
  - [~] 17.2 Create admin user guide
    - Document login process
    - Document content editing workflows for each section
    - Document logo upload process
    - Document dashboard features
    - Include screenshots and examples
    - Write in Portuguese
    - _Requirements: 1.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1, 11.1, 12.1, 13.1, 20.1_
  
  - [~] 17.3 Create deployment guide
    - Document database setup steps
    - Document environment variable configuration
    - Document migration execution process
    - Document seed script execution
    - Document initial admin password retrieval
    - Document verification steps
    - Include rollback procedures
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_
  
  - [~] 17.4 Create database schema documentation
    - Document all tables with field descriptions
    - Document indexes and constraints
    - Document relationships between tables
    - Include ER diagram
    - Document data types and validation rules
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

- [ ] 18. Final Integration Testing and Verification
  - [~] 18.1 Execute manual testing checklist
    - Test complete authentication flow (login, session, logout)
    - Test all content editors (save, validate, display errors)
    - Test logo upload (valid files, invalid files, display)
    - Test landing page with dynamic content
    - Test error handling scenarios
    - Test security measures (rate limiting, input sanitization)
    - _Requirements: All requirements_
  
  - [~] 18.2 Verify all acceptance criteria
    - Review requirements document
    - Verify each acceptance criterion is met
    - Document any deviations or limitations
    - Confirm validation criteria checklist
    - _Requirements: All requirements_
  
  - [~] 18.3 Performance testing
    - Test landing page load time (target < 2 seconds)
    - Test admin panel responsiveness
    - Verify caching reduces database queries
    - Test with multiple concurrent users
    - Monitor database query performance
    - _Requirements: 19.1, 19.2_
  
  - [~] 18.4 Security audit
    - Verify passwords are hashed in database
    - Test SQL injection prevention
    - Test XSS prevention
    - Test file upload security
    - Verify session security
    - Test rate limiting
    - _Requirements: 1.4, 1.5, 17.1, 17.2, 17.3, 17.4, 17.5, 21.1, 21.2, 21.3, 21.4, 21.5, 21.6_

- [ ] 19. Final checkpoint - Production readiness
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- The implementation uses TypeScript throughout as specified in the design
- All user-facing messages should be in Portuguese (Brazilian)
- The system maintains backward compatibility with existing landing page functionality
- Database migrations and seeds must be idempotent (safe to run multiple times)
- All API endpoints require authentication except login and public landing page
- Content caching is set to 5 minutes to balance performance and freshness
- File uploads are limited to 5MB and specific image formats (PNG, JPG, JPEG, SVG, WEBP)
- The initial admin password is randomly generated and must be retrieved from deployment logs
- Security is a priority: use bcrypt for passwords, parameterized queries, input validation, and rate limiting
- The admin panel should be responsive for desktop and tablet (768px-1920px)
- Error messages should be user-friendly in Portuguese while detailed errors are logged
- The landing page must continue functioning even if the database is unavailable (fallback content)

## Testing Strategy

This feature is **NOT suitable for property-based testing** because it involves:
- Infrastructure as Code (database schema, API routes)
- Authentication and session management (external service behavior)
- File upload and storage (I/O operations)
- UI rendering and forms (visual components)
- Database CRUD operations (integration concerns)

Instead, the testing strategy uses:
- **Unit Tests**: For pure functions (password hashing, file validation, sanitization)
- **Integration Tests**: For API endpoints and database operations
- **Component Tests**: For React components in isolation
- **Manual Testing**: For complete user workflows and security verification

All test-related sub-tasks are marked as optional with `*` and can be skipped for faster MVP delivery.
