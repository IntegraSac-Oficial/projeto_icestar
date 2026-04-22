# Authentication Middleware

## Overview

The authentication middleware protects admin routes by verifying session validity using NextAuth.js v5 (Auth.js). It runs on every request to `/admin/*` routes and redirects unauthenticated users to the login page.

## Implementation

**File:** `src/middleware.ts`

### Route Protection

- **Public Route:** `/admin/login` - Accessible without authentication
- **Protected Routes:** All other `/admin/*` routes - Require authentication

### Behavior

1. **Unauthenticated Access to Protected Route:**
   - User is redirected to `/admin/login`
   - Original destination is preserved in `callbackUrl` query parameter
   - After successful login, user is redirected back to original destination

2. **Authenticated Access:**
   - Session is verified using NextAuth.js `auth()` function
   - If valid session exists, request proceeds to the protected route
   - If session is invalid or expired, user is redirected to login

3. **Login Page Access:**
   - Always accessible without authentication
   - No session check is performed

4. **Error Handling:**
   - If auth check fails (e.g., database error), user is redirected to login for safety
   - Error is logged to console for debugging

## Configuration

The middleware uses Next.js matcher pattern to specify which routes it should run on:

```typescript
export const config = {
  matcher: ['/admin/:path*'],
};
```

This matches all routes starting with `/admin/`, including nested routes like:
- `/admin/dashboard`
- `/admin/content/hero`
- `/admin/logo`
- etc.

## Integration with NextAuth.js

The middleware uses the `auth()` function exported from `@/lib/auth/index.ts`, which is configured with:

- **Session Strategy:** JWT
- **Session Duration:** 24 hours
- **Login Page:** `/admin/login`
- **Provider:** Credentials (email/password)

## Testing

Unit tests are provided in `src/middleware.test.ts` to verify:

1. ✅ `/admin/login` is accessible without authentication
2. ✅ Protected routes redirect unauthenticated users to login
3. ✅ Authenticated users can access protected routes
4. ✅ Nested admin routes are protected
5. ✅ Callback URL preserves original destination
6. ✅ Auth errors redirect to login for safety

## Requirements Satisfied

This implementation satisfies the following requirements from the spec:

- **Requirement 1.8:** Auth system prevents access to protected routes without valid session
- **Requirement 3.1:** Admin panel accessible only through protected routes
- **Requirement 3.2:** Unauthenticated users redirected to login interface
- **Requirement 3.3:** Authenticated users can access protected routes
- **Requirement 3.4:** Session validity verified before serving protected routes

## Next.js 16 Compatibility

This middleware follows Next.js 16 App Router patterns:

- Uses `NextRequest` and `NextResponse` from `next/server`
- Exports `middleware` function as default export
- Uses `config.matcher` for route matching
- Compatible with NextAuth.js v5 (Auth.js)
- Supports async/await for session verification

## Security Considerations

1. **Session Verification:** Every request to protected routes verifies session validity
2. **Redirect Safety:** Uses absolute URLs for redirects to prevent open redirect vulnerabilities
3. **Error Handling:** Auth errors result in redirect to login (fail-safe behavior)
4. **Callback URL:** Preserves original destination for better UX after login
5. **No Session Exposure:** Session data is not exposed in middleware, only verified

## Example Flow

### Scenario 1: Unauthenticated User Accessing Dashboard

1. User navigates to `/admin/dashboard`
2. Middleware intercepts request
3. `auth()` returns `null` (no session)
4. User is redirected to `/admin/login?callbackUrl=%2Fadmin%2Fdashboard`
5. After successful login, user is redirected back to `/admin/dashboard`

### Scenario 2: Authenticated User Accessing Dashboard

1. User navigates to `/admin/dashboard`
2. Middleware intercepts request
3. `auth()` returns valid session object
4. Request proceeds to `/admin/dashboard`
5. Dashboard page is rendered

### Scenario 3: User Accessing Login Page

1. User navigates to `/admin/login`
2. Middleware intercepts request
3. Middleware allows request without session check
4. Login page is rendered

## Troubleshooting

### Issue: Infinite redirect loop

**Cause:** Login page is not excluded from authentication check

**Solution:** Verify that `/admin/login` check comes before session verification in middleware

### Issue: Session not recognized

**Cause:** NextAuth.js configuration mismatch or session expired

**Solution:** 
- Verify `NEXTAUTH_SECRET` environment variable is set
- Check session expiration (24 hours by default)
- Verify database connection for session storage

### Issue: Middleware not running

**Cause:** Matcher pattern doesn't match the route

**Solution:** Verify `config.matcher` includes the route pattern

## Performance Considerations

- **Session Check:** Adds minimal overhead (~10-50ms) for session verification
- **Database Query:** Session verification may query database (depends on NextAuth.js configuration)
- **Caching:** NextAuth.js caches session data to reduce database queries
- **Edge Compatibility:** Middleware runs on Edge Runtime for optimal performance

## Future Enhancements

Potential improvements for future iterations:

1. **Role-Based Access Control:** Check user roles in middleware
2. **Rate Limiting:** Add rate limiting for admin routes
3. **IP Whitelisting:** Restrict admin access to specific IPs
4. **Audit Logging:** Log all admin route access attempts
5. **Custom Error Pages:** Redirect to custom error pages instead of login
