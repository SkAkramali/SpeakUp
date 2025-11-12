# User Registration - Quick Reference Guide

## 🎯 TL;DR

Allow users to register as Citizens, Politicians, or Moderators with email/phone verification. Citizens get instant access; Politicians/Moderators need admin approval.

## 📋 Quick Facts

| Aspect | Details |
|--------|---------|
| **Roles** | Citizen, Politician, Moderator |
| **Auth Methods** | Email + Password, Phone + OTP |
| **OTP Expiry** | 5 minutes |
| **Max OTP Attempts** | 5 |
| **Password Rules** | Min 8 chars, 1 letter, 1 number |
| **Citizen Status** | Active (after verification) |
| **Politician/Mod Status** | PendingApproval (needs admin) |

## 🔌 API Quick Reference

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",          # Optional if email provided
  "password": "SecurePass123",      # Optional for OTP flow
  "role": "citizen",                # citizen|politician|moderator
  "constituency": "district-1"      # Required for politician
}

# Returns 201 with userId
```

### Verify OTP
```bash
POST /api/v1/auth/verify-otp
Content-Type: application/json

{
  "userId": "uuid-here",
  "otp": "123456"
}

# Returns 200 on success
```

## 🗄️ Database Quick Schema

```sql
-- Minimal schema
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL,  -- citizen|politician|moderator
  status VARCHAR(20) NOT NULL, -- PendingVerification|Active|PendingApproval
  constituency_id UUID,
  verification_method VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## ✅ Validation Checklist

- [ ] Email: Valid regex + unique
- [ ] Phone: E.164 format (+1234567890) + unique
- [ ] Password: Min 8 chars, 1 letter, 1 number
- [ ] Role: One of citizen/politician/moderator
- [ ] Constituency: Required only if role=politician
- [ ] T&C: Must be checked

## 🎨 UI Components Needed

1. **Role Selection Toggle** (Citizen/Politician/Moderator)
2. **Email/Phone Input** with validation
3. **Password Input** with strength indicator
4. **Constituency Dropdown** (show if politician)
5. **T&C Checkbox** with link
6. **OTP Input Modal** (6-digit)

## 🔒 Security Checklist

- [ ] Hash passwords with bcrypt (cost 12) or argon2
- [ ] Generate secure random OTP (6 digits)
- [ ] Set OTP expiry to 5 minutes
- [ ] Limit OTP attempts to 5
- [ ] Sanitize all inputs (XSS prevention)
- [ ] Use parameterized queries (SQL injection prevention)
- [ ] Rate limit: 5 registrations/IP/hour

## 🧪 Quick Test Scenarios

```javascript
// Test 1: Citizen with email+password → Active
{ name: "Alice", email: "alice@test.com", password: "Pass1234", role: "citizen" }
// Expected: Status = Active after verification

// Test 2: Politician → PendingApproval
{ name: "Bob", email: "bob@test.com", password: "Pass1234", role: "politician", constituency: "dist-1" }
// Expected: Status = PendingApproval after verification

// Test 3: Invalid email
{ email: "invalid-email" }
// Expected: 400 error "Invalid email format"

// Test 4: Duplicate email
{ email: "existing@test.com" }
// Expected: 400 error "Email already registered"

// Test 5: Weak password
{ password: "123" }
// Expected: 400 error "Password too weak"
```

## 🚀 Implementation Order

1. **Backend** (Day 1-2)
   - [ ] Create database schema
   - [ ] Implement POST /auth/register endpoint
   - [ ] Implement POST /auth/verify-otp endpoint
   - [ ] Add validation rules
   - [ ] Set up OTP generation & email/SMS service
   - [ ] Add rate limiting

2. **Frontend** (Day 3-4)
   - [ ] Create registration form component
   - [ ] Add role selection UI
   - [ ] Implement progressive disclosure
   - [ ] Add password strength indicator
   - [ ] Create OTP verification modal
   - [ ] Add client-side validation

3. **Testing** (Day 5)
   - [ ] Unit tests for validation logic
   - [ ] Integration tests for API endpoints
   - [ ] E2E tests for complete flows
   - [ ] Security testing (SQL injection, XSS)

## 🐛 Common Pitfalls

❌ **Don't:**
- Store passwords in plaintext
- Allow unlimited OTP attempts
- Skip email/phone uniqueness check
- Forget to validate constituency for politicians
- Show same error for "user exists" and "invalid credentials" (security)

✅ **Do:**
- Hash passwords before storing
- Implement OTP expiry and attempt limits
- Use unique constraints on email/phone in DB
- Show constituency field only for politicians
- Use generic error messages for security

## 📊 Status Flow

```
Registration → PendingVerification → [Citizen: Active] | [Politician/Mod: PendingApproval]
                                                                    ↓
                                                          Admin Approval → Active
```

## 🔔 Notifications

- **User registers** → Send verification email/SMS
- **Politician/Mod registers** → Notify admin
- **Account approved** → Notify user

## 📱 Sample UI Flow

```
[Landing Page]
      ↓
   [Click Register]
      ↓
[Select Role: ○ Citizen ○ Politician ○ Moderator]
      ↓
[Form Fields]
- Name: _______
- Email: _______ 
- Password: _______ [Strength: ████░░ Medium]
- [x] I agree to Terms & Conditions
      ↓
   [Submit]
      ↓
[OTP Verification Modal]
- Enter 6-digit code: [_][_][_][_][_][_]
- Expires in: 4:32
      ↓
  [Success!]
- Citizen → "Account active! Welcome aboard"
- Politician/Mod → "Account pending approval. You'll be notified soon."
```

## 🔗 Related Documentation

- See [USER_REGISTRATION_FEATURE.md](./USER_REGISTRATION_FEATURE.md) for complete specification
- API documentation: TBD
- Database schema: TBD
- Testing guide: TBD

---

**Last Updated:** 2025-11-12  
**Version:** 1.0  
**Status:** Specification Complete
