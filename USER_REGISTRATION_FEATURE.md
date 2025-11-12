# User Registration Feature — ST-01

## Overview
This feature enables users to register for the SpeakUp platform with role-based access control. Users can register as Citizens, Politicians, or Moderators using email or mobile number with either password-based authentication or OTP verification.

## User Roles & Registration Flow

### Role Types
1. **Citizen** - General users who can submit issues and interact with politicians
2. **Politician** - Elected or aspiring officials who respond to constituency issues (requires approval)
3. **Moderator** - Platform moderators who manage content (requires approval)

### Registration Flow Summary
```
Visitor → Select Role → Fill Form → Submit → Verification → Account Status
```

- **Citizens**: Become Active immediately after email/phone verification
- **Politicians & Moderators**: Enter PendingApproval status awaiting Admin approval

## Detailed User Flow

### Step 1: Access Registration
- User clicks "Register" button in header or landing page CTA
- No authentication required (public access)

### Step 2: Role Selection
- User selects one of three roles: Citizen, Politician, or Moderator
- Form fields adjust based on selected role (progressive disclosure)

### Step 3: Form Completion
**Common Fields (All Roles):**
- Full Name (required)
- Email OR Phone Number (required)
- Password (required for password flow, optional for OTP flow)
- Confirm Password (required if password provided)
- Terms & Conditions agreement checkbox (required)

**Role-Specific Fields:**
- **Politician Only:**
  - Constituency selection (required)

### Step 4: Submission & Validation
- System validates all input fields according to validation rules
- If validation fails, user receives descriptive error messages
- If validation passes:
  - **Password Flow**: Account created with hashed password
  - **OTP Flow**: System sends OTP via SMS (for phone) or email

### Step 5: Verification
**OTP Flow:**
- User receives OTP (6-digit code)
- OTP expires in 5 minutes
- Maximum 5 verification attempts allowed
- User enters OTP in verification form
- System validates OTP

**Password Flow:**
- Email verification link sent
- User clicks link to verify email

### Step 6: Account Status Assignment
- **Citizen**: Status set to `Active` after successful verification
- **Politician/Moderator**: Status set to `PendingApproval`
  - Admin receives notification for manual approval
  - User cannot access full platform features until approved

## Technical Specifications

### API Endpoints

#### 1. User Registration
```
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required if no phone)",
  "phone": "string (required if no email)",
  "password": "string (optional)",
  "role": "string (required: citizen|politician|moderator)",
  "constituency": "string (required for politician role)"
}
```

**Response (Success - 201):**
```json
{
  "userId": "uuid",
  "status": "Active|PendingApproval",
  "message": "Registration successful. Please verify your email/phone."
}
```

**Response (Error - 400):**
```json
{
  "error": "Validation error",
  "details": {
    "email": "Email address already registered"
  }
}
```

#### 2. OTP Verification
```
POST /api/v1/auth/verify-otp
```

**Request Body:**
```json
{
  "userId": "uuid (required)",
  "otp": "string (required, 6 digits)"
}
```

**Response (Success - 200):**
```json
{
  "verified": true,
  "status": "Active|PendingApproval",
  "message": "Account verified successfully"
}
```

**Response (Error - 400):**
```json
{
  "verified": false,
  "attemptsRemaining": 4,
  "message": "Invalid OTP code"
}
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL CHECK (role IN ('citizen', 'politician', 'moderator')),
  status VARCHAR(20) NOT NULL DEFAULT 'PendingVerification' 
    CHECK (status IN ('PendingVerification', 'Active', 'PendingApproval', 'Suspended', 'Inactive')),
  constituency_id UUID REFERENCES constituencies(id),
  verification_method VARCHAR(20) CHECK (verification_method IN ('email', 'phone', 'password')),
  email_verified_at TIMESTAMP,
  phone_verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

#### OTP Verification Table (Optional)
```sql
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  otp_code VARCHAR(6) NOT NULL,
  attempts INTEGER DEFAULT 0,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_otp_user_id ON otp_verifications(user_id);
```

### Validation Rules

#### Email
- Format: Valid email regex pattern
- Example: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
- Uniqueness: Must not already exist in database

#### Phone Number
- Format: E.164 international format
- Example: `+1234567890` (+ followed by country code and number)
- Uniqueness: Must not already exist in database

#### Password
- Minimum length: 8 characters
- Must contain: At least one letter (a-z or A-Z)
- Must contain: At least one number (0-9)
- Recommended: Include special characters for stronger security
- Storage: Hashed using bcrypt or argon2 (never stored in plaintext)

#### Role
- Must be one of: `citizen`, `politician`, `moderator`
- Case-insensitive input, stored in lowercase

#### Name
- Minimum length: 2 characters
- Maximum length: 255 characters
- Pattern: Letters, spaces, hyphens, and apostrophes allowed

#### Constituency (Politicians Only)
- Required when role is `politician`
- Must reference valid constituency_id from database

### Security Requirements

1. **Password Hashing**
   - Use bcrypt (cost factor: 12) or argon2id
   - Never store passwords in plaintext
   - Salt passwords automatically (built into bcrypt/argon2)

2. **OTP Generation**
   - Generate cryptographically secure random 6-digit codes
   - Set 5-minute expiration time
   - Limit to 5 verification attempts
   - Invalidate after successful verification

3. **Rate Limiting**
   - Registration endpoint: 5 attempts per IP per hour
   - OTP verification: 5 attempts per user per OTP code
   - OTP resend: Maximum 3 times per hour per user

4. **Input Sanitization**
   - Sanitize all user inputs to prevent XSS
   - Use parameterized queries to prevent SQL injection
   - Validate and normalize email/phone formats

## UI/UX Requirements

### Progressive Disclosure
- Show only relevant fields based on selected role
- Politician role → Display constituency dropdown
- Smooth transitions when changing roles

### Password Strength Indicator
- Visual indicator showing password strength: Weak/Medium/Strong
- Real-time feedback as user types
- Color-coded: Red (weak), Yellow (medium), Green (strong)

### Form Validation Feedback
- Inline validation messages below each field
- Clear error descriptions (e.g., "Email already registered")
- Success indicators when fields are valid

### Legal & Privacy
- Clearly visible Terms & Conditions link
- Privacy Policy link
- Checkbox must be checked to enable submit button

### Responsive Design
- Mobile-friendly form layout
- Touch-friendly input fields and buttons
- Proper keyboard support for form navigation

## Acceptance Criteria

✅ **Functional Requirements:**
1. New user record created in `users` table with correct role and status
2. OTP expires exactly after 5 minutes
3. Duplicate email/phone rejected with descriptive error message
4. Passwords hashed securely using bcrypt or argon2
5. Politician/Moderator accounts set to `PendingApproval` status
6. Citizen accounts set to `Active` after verification
7. Admin receives notification when Politician/Moderator registers

✅ **Validation Requirements:**
8. Email validation using regex pattern
9. Phone validation using E.164 format
10. Password minimum 8 characters with letter and number
11. Role limited to: citizen, politician, moderator
12. Constituency required only for politician role

✅ **Security Requirements:**
13. OTP retry limited to maximum 5 attempts
14. Rate limiting implemented on registration endpoint
15. All inputs sanitized to prevent XSS/SQL injection

✅ **UI/UX Requirements:**
16. Progressive disclosure for role-specific fields
17. Password strength indicator displayed
18. Terms & Conditions link visible and functional
19. Clear error messages for all validation failures

## Edge Cases & Error Handling

### Edge Case 1: Existing Email - Unverified Account
**Scenario:** User tries to register with email that exists but was never verified

**Handling:**
- Check if existing account status is `PendingVerification`
- If yes and created > 24 hours ago: Delete old account and create new one
- If yes and created < 24 hours ago: Offer to resend verification OTP/email
- Return appropriate message to user

### Edge Case 2: OTP Expiration During Entry
**Scenario:** OTP expires while user is entering it

**Handling:**
- Display clear "OTP expired" message
- Provide "Resend OTP" button
- Track resend attempts (max 3 per hour)

### Edge Case 3: Simultaneous Registration Attempts
**Scenario:** User submits registration form multiple times quickly

**Handling:**
- Use database unique constraints on email/phone
- Return existing user_id if duplicate detected
- Prevent duplicate OTP sends within 1-minute window

### Edge Case 4: Network Failure During Registration
**Scenario:** Network fails after account created but before verification sent

**Handling:**
- Implement idempotency using request_id
- Allow user to request new verification without re-registering
- Provide clear status on registration page

### Edge Case 5: Invalid Constituency Selection
**Scenario:** Politician selects constituency that doesn't exist or is inactive

**Handling:**
- Validate constituency_id against active constituencies
- Return 400 error with message: "Selected constituency is not available"
- Refresh constituency list if stale

### Edge Case 6: Password vs OTP Flow Confusion
**Scenario:** User starts with password but switches to OTP flow mid-registration

**Handling:**
- Allow changing verification method before submission
- Clear password field if user switches to OTP
- Remember user's choice for re-attempts

## Test Cases

### Test Case 1: Citizen Registration - Password Flow
**Given:** User selects "Citizen" role and provides valid email + password

**When:** User submits registration form

**Then:**
- User account created with role=`citizen`, status=`PendingVerification`
- Verification email sent to provided email address
- User can verify email via link
- After verification, status changes to `Active`
- User can log in with email and password

### Test Case 2: Politician Registration
**Given:** User selects "Politician" role, provides valid details + constituency

**When:** User submits registration form and verifies email

**Then:**
- User account created with role=`politician`, status=`PendingApproval`
- Constituency_id is correctly stored
- Admin receives notification email
- User cannot access full platform until admin approves
- User sees "Pending Approval" message on login attempt

### Test Case 3: Invalid Email Format
**Given:** User enters email "invalidemail.com" (missing @)

**When:** User attempts to submit form

**Then:**
- Form validation prevents submission
- Error message displayed: "Please enter a valid email address"
- Submit button remains disabled until fixed

### Test Case 4: Duplicate Email Registration
**Given:** Email "test@example.com" already exists in database

**When:** New user tries to register with same email

**Then:**
- API returns 400 error
- Error message: "Email address already registered. Please login or use password recovery."
- No new user record created

### Test Case 5: OTP Verification Success
**Given:** User registered with phone number and received OTP

**When:** User enters correct 6-digit OTP within 5 minutes

**Then:**
- OTP verified successfully
- User account status updated accordingly
- User redirected to appropriate dashboard or approval waiting page

### Test Case 6: OTP Verification - Exceeded Attempts
**Given:** User has entered incorrect OTP 5 times

**When:** User attempts 6th OTP entry

**Then:**
- API returns 400 error
- Error message: "Maximum verification attempts exceeded. Please request a new OTP."
- Current OTP invalidated
- User can request new OTP

### Test Case 7: Weak Password Rejection
**Given:** User enters password "12345" (no letters, too short)

**When:** User attempts to submit form

**Then:**
- Validation error displayed
- Error message: "Password must be at least 8 characters and contain letters and numbers"
- Password strength indicator shows "Weak" or "Invalid"

### Test Case 8: Moderator Registration Without Constituency
**Given:** User selects "Moderator" role

**When:** User views registration form

**Then:**
- Constituency field is NOT displayed (only for politicians)
- User can complete registration without constituency
- Account created with role=`moderator`, constituency_id=NULL

### Test Case 9: Phone Number E.164 Validation
**Given:** User enters phone "1234567890" (missing + and country code)

**When:** User attempts to submit form

**Then:**
- Validation error displayed
- Error message: "Please enter phone number in international format (e.g., +1234567890)"

### Test Case 10: Terms & Conditions Unchecked
**Given:** User fills all fields but doesn't check T&C checkbox

**When:** User attempts to submit form

**Then:**
- Submit button disabled or validation error shown
- Error message: "You must agree to the Terms & Conditions to register"

## Priority & Dependencies

**Priority:** High - This is a foundational feature blocking user onboarding

**Dependencies:**
- Database schema must be created first
- Email/SMS service integration required for OTP delivery
- Constituency data must be populated in database
- Admin notification system must be functional

**Estimated Effort:** 3-5 development days
- Backend API: 2 days
- Frontend UI: 2 days
- Testing: 1 day
- Integration: 0.5 days

## Future Enhancements (Out of Scope)

- Social media login (Google, Facebook, Twitter OAuth)
- Multi-factor authentication (MFA) for all users
- Biometric authentication for mobile apps
- Advanced fraud detection and bot prevention
- Email domain verification for official politician accounts
- Batch import for politician accounts
- Self-service constituency verification for politicians
