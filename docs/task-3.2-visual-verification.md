# Task 3.2 Visual Verification Guide

## Login Page Verification

### Access the Login Page
1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`

### Visual Elements to Verify

#### Header Section
- [ ] "Ice Star" title in primary red color (#C62828)
- [ ] "Painel Administrativo" subtitle in gray
- [ ] Centered layout

#### Form Section
- [ ] Email input field with label "Email *"
- [ ] Email placeholder: "admin@icestar.com"
- [ ] Password input field with label "Senha *"
- [ ] Password placeholder: "••••••••"
- [ ] Submit button with text "Entrar"
- [ ] Button in primary red color
- [ ] Full-width button

#### Footer Section
- [ ] Copyright text: "© 2024 Ice Star. Todos os direitos reservados."
- [ ] Centered gray text

### Functional Testing

#### Validation Testing
1. **Empty Form Submission**
   - Click "Entrar" without filling fields
   - Expected: "Email é obrigatório" error below email field
   - Expected: "Senha é obrigatória" error below password field

2. **Invalid Email Format**
   - Enter: "invalid-email"
   - Click "Entrar"
   - Expected: "Email inválido" error

3. **Short Password**
   - Enter valid email: "admin@icestar.com"
   - Enter password: "123"
   - Click "Entrar"
   - Expected: "Senha deve ter no mínimo 8 caracteres" error

4. **Valid Format but Wrong Credentials**
   - Enter email: "wrong@example.com"
   - Enter password: "wrongpassword123"
   - Click "Entrar"
   - Expected: Red alert box with "Credenciais inválidas"

5. **Valid Credentials** (requires database setup)
   - Enter email: "admin@icestar.com"
   - Enter correct password from seed script
   - Click "Entrar"
   - Expected: Button shows "Entrando..."
   - Expected: Redirect to `/admin/dashboard`

#### Loading State Testing
- [ ] Button text changes to "Entrando..." during submission
- [ ] Form inputs are disabled during submission
- [ ] Loading state clears after response

#### Responsive Design Testing
1. **Desktop (1920px)**
   - [ ] Login card centered on screen
   - [ ] Card max-width: 448px (max-w-md)
   - [ ] Proper spacing and padding

2. **Tablet (768px)**
   - [ ] Login card remains centered
   - [ ] Form inputs remain readable
   - [ ] Button remains full-width

3. **Mobile (375px)**
   - [ ] Login card adapts to screen width
   - [ ] Form remains usable
   - [ ] Text remains readable

### Error State Verification

#### Field-Level Errors
- [ ] Error text appears below input field
- [ ] Error text in red color (#C62828)
- [ ] Input border turns red when error present
- [ ] Red ring appears around input

#### Authentication Errors
- [ ] Red alert box appears above submit button
- [ ] Error message: "Credenciais inválidas"
- [ ] Alert box has red border and light red background

### Accessibility Verification

#### Keyboard Navigation
- [ ] Tab through form fields in correct order
- [ ] Enter key submits form
- [ ] Focus indicators visible

#### Screen Reader Support
- [ ] Labels properly associated with inputs
- [ ] Required fields marked with asterisk
- [ ] Error messages announced

### Integration Testing

#### Middleware Integration
1. Try to access `/admin/dashboard` without logging in
   - Expected: Redirect to `/admin/login?callbackUrl=/admin/dashboard`

2. Login successfully
   - Expected: Redirect to `/admin/dashboard`

3. Try to access `/admin/content/hero` without logging in
   - Expected: Redirect to `/admin/login?callbackUrl=/admin/content/hero`

4. Login successfully from that redirect
   - Expected: Redirect to `/admin/content/hero`

### Browser Compatibility

Test in the following browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

### Performance Verification

- [ ] Page loads in < 1 second
- [ ] No console errors
- [ ] No console warnings
- [ ] Smooth animations and transitions

## Test Credentials

**Note:** These credentials are only available after running the database seed script.

- **Email:** admin@icestar.com
- **Password:** Check deployment logs or run: `npm run generate-admin-hash`

## Known Limitations

1. **Dashboard Placeholder:** The dashboard page is a placeholder. Full implementation in Task 9.2.
2. **No Password Reset:** Password reset functionality not implemented in this phase.
3. **No Remember Me:** Remember me functionality not implemented in this phase.

## Troubleshooting

### Login Page Not Loading
- Check if dev server is running
- Check console for errors
- Verify NextAuth configuration in `.env.local`

### Authentication Not Working
- Verify database is running (Docker Compose)
- Check if admin user exists in database
- Verify password hash in database
- Check NextAuth secret in `.env.local`

### Redirect Not Working
- Check middleware configuration
- Verify NextAuth session creation
- Check browser console for errors

## Success Criteria

All checkboxes above should be checked for complete verification.

## Next Steps

After verification:
1. Proceed to Task 3.3: Write component tests for login page (optional)
2. Or proceed to Task 5: Content Management Service Layer
