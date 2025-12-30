# Backend API Documentation - SpeakUp Feedback System

## Overview
This document outlines the REST API endpoints required for the SpeakUp feedback, rating, and suggestions system.

## Base URL
```
/api/v1
```

## Authentication
All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. Feedback Endpoints

### 1.1 Create Feedback
Submit new feedback on government services.

**Endpoint:** `POST /feedback`

**Request Body:**
```json
{
  "serviceCategory": "Water Supply",
  "feedbackType": "complaint",
  "description": "Water supply has been irregular",
  "location": "Downtown Area",
  "attachment": "base64_encoded_file_or_url"
}
```

**Validation Rules:**
- `serviceCategory`: Required, must be one of: Water Supply, Electricity, Roads & Infrastructure, Healthcare, Education, Sanitation, Public Transport, Parks & Recreation, Police Services, Fire Services, Other
- `feedbackType`: Required, must be one of: complaint, suggestion, appreciation
- `description`: Required, min 10 characters, max 1000 characters
- `location`: Optional, max 200 characters
- `attachment`: Optional, max 5MB

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "fb_123456",
    "serviceCategory": "Water Supply",
    "feedbackType": "complaint",
    "description": "Water supply has been irregular",
    "location": "Downtown Area",
    "attachment": "https://storage.example.com/uploads/abc123.jpg",
    "author": {
      "id": "user_789",
      "name": "John Doe"
    },
    "status": "Open",
    "timestamp": "2025-12-30T10:30:00Z",
    "rating": null
  }
}
```

### 1.2 Get Feedback
Retrieve feedback with filters.

**Endpoint:** `GET /feedback`

**Query Parameters:**
- `category`: Filter by service category
- `type`: Filter by feedback type (complaint, suggestion, appreciation)
- `status`: Filter by status (Open, In Progress, Resolved)
- `location`: Filter by location
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Example:** `GET /feedback?category=Water%20Supply&status=Open&page=1&limit=20`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "feedbacks": [
      {
        "id": "fb_123456",
        "serviceCategory": "Water Supply",
        "feedbackType": "complaint",
        "description": "Water supply has been irregular",
        "location": "Downtown Area",
        "attachment": "https://storage.example.com/uploads/abc123.jpg",
        "author": {
          "id": "user_789",
          "name": "John Doe"
        },
        "status": "Open",
        "timestamp": "2025-12-30T10:30:00Z",
        "rating": null
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 87,
      "itemsPerPage": 20
    }
  }
}
```

### 1.3 Get Single Feedback
**Endpoint:** `GET /feedback/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "fb_123456",
    "serviceCategory": "Water Supply",
    "feedbackType": "complaint",
    "description": "Water supply has been irregular",
    "location": "Downtown Area",
    "attachment": "https://storage.example.com/uploads/abc123.jpg",
    "author": {
      "id": "user_789",
      "name": "John Doe"
    },
    "status": "Open",
    "timestamp": "2025-12-30T10:30:00Z",
    "rating": null
  }
}
```

### 1.4 Update Feedback Status (Admin/Politician only)
**Endpoint:** `PATCH /feedback/:id/status`

**Request Body:**
```json
{
  "status": "In Progress"
}
```

**Validation:**
- `status`: Required, must be one of: Open, In Progress, Resolved

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "fb_123456",
    "status": "In Progress",
    "updatedAt": "2025-12-30T11:00:00Z"
  }
}
```

---

## 2. Rating Endpoints

### 2.1 Submit Rating
Rate a resolved feedback/issue.

**Endpoint:** `POST /feedback/:id/rating`

**Request Body:**
```json
{
  "rating": 4,
  "review": "Issue was resolved quickly. Thank you!"
}
```

**Validation:**
- `rating`: Required, integer between 1-5
- `review`: Optional, max 500 characters
- Feedback must have status "Resolved"
- User can only rate once per feedback

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "feedbackId": "fb_123456",
    "rating": 4,
    "review": "Issue was resolved quickly. Thank you!",
    "ratedBy": {
      "id": "user_789",
      "name": "John Doe"
    },
    "timestamp": "2025-12-30T12:00:00Z"
  }
}
```

### 2.2 Get Ratings
Retrieve ratings with analytics.

**Endpoint:** `GET /ratings`

**Query Parameters:**
- `feedbackId`: Filter by specific feedback
- `category`: Filter by service category
- `startDate`: Filter from date (ISO 8601)
- `endDate`: Filter to date (ISO 8601)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "ratings": [
      {
        "id": "rating_001",
        "feedbackId": "fb_123456",
        "rating": 4,
        "review": "Issue was resolved quickly",
        "ratedBy": {
          "id": "user_789",
          "name": "John Doe"
        },
        "timestamp": "2025-12-30T12:00:00Z"
      }
    ],
    "analytics": {
      "averageRating": 4.2,
      "totalRatings": 156,
      "ratingDistribution": {
        "5": 78,
        "4": 45,
        "3": 20,
        "2": 8,
        "1": 5
      }
    }
  }
}
```

---

## 3. Suggestions Endpoints

### 3.1 Create Suggestion
Submit a new improvement idea.

**Endpoint:** `POST /suggestions`

**Request Body:**
```json
{
  "title": "Install Solar Panels on Public Buildings",
  "description": "We should install solar panels on government buildings to reduce energy costs",
  "category": "Environment",
  "expectedBenefit": "Reduce carbon footprint by 30%"
}
```

**Validation:**
- `title`: Required, min 5 characters, max 100 characters
- `description`: Required, min 20 characters, max 2000 characters
- `category`: Required, must be one of: Infrastructure, Healthcare, Education, Environment, Transportation, Technology, Public Safety, Economy, Social Services, Other
- `expectedBenefit`: Optional, max 500 characters

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "sug_789012",
    "title": "Install Solar Panels on Public Buildings",
    "description": "We should install solar panels...",
    "category": "Environment",
    "expectedBenefit": "Reduce carbon footprint by 30%",
    "author": {
      "id": "user_789",
      "name": "John Doe"
    },
    "upvotes": 0,
    "comments": [],
    "timestamp": "2025-12-30T13:00:00Z"
  }
}
```

### 3.2 Get Suggestions
Retrieve suggestions with filters.

**Endpoint:** `GET /suggestions`

**Query Parameters:**
- `category`: Filter by category
- `sortBy`: Sort by (popular, recent, upvotes)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "suggestions": [
      {
        "id": "sug_789012",
        "title": "Install Solar Panels on Public Buildings",
        "description": "We should install solar panels...",
        "category": "Environment",
        "expectedBenefit": "Reduce carbon footprint by 30%",
        "author": {
          "id": "user_789",
          "name": "John Doe"
        },
        "upvotes": 45,
        "comments": [
          {
            "id": "com_001",
            "text": "Great idea!",
            "author": {
              "id": "user_456",
              "name": "Jane Smith"
            },
            "timestamp": "2025-12-30T14:00:00Z"
          }
        ],
        "timestamp": "2025-12-30T13:00:00Z",
        "hasUserUpvoted": true
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 52,
      "itemsPerPage": 20
    }
  }
}
```

### 3.3 Upvote Suggestion
Upvote or remove upvote from a suggestion.

**Endpoint:** `POST /suggestions/:id/upvote`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "suggestionId": "sug_789012",
    "upvotes": 46,
    "hasUpvoted": true
  }
}
```

**Note:** If user already upvoted, this endpoint removes the upvote (toggle behavior).

### 3.4 Comment on Suggestion
Add a comment to a suggestion.

**Endpoint:** `POST /suggestions/:id/comments`

**Request Body:**
```json
{
  "text": "This is a great idea! When can we start implementation?"
}
```

**Validation:**
- `text`: Required, min 1 character, max 500 characters

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "com_002",
    "suggestionId": "sug_789012",
    "text": "This is a great idea!",
    "author": {
      "id": "user_999",
      "name": "Mike Johnson"
    },
    "timestamp": "2025-12-30T15:00:00Z"
  }
}
```

### 3.5 Delete Comment (Author only)
**Endpoint:** `DELETE /suggestions/:suggestionId/comments/:commentId`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

---

## 4. Analytics Endpoints (Admin/Politician only)

### 4.1 Get Dashboard Analytics
**Endpoint:** `GET /analytics/dashboard`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "feedback": {
      "total": 523,
      "byType": {
        "complaint": 312,
        "suggestion": 156,
        "appreciation": 55
      },
      "byStatus": {
        "Open": 145,
        "In Progress": 89,
        "Resolved": 289
      },
      "byCategory": {
        "Water Supply": 89,
        "Roads & Infrastructure": 125,
        "Healthcare": 67
      }
    },
    "ratings": {
      "averageRating": 4.2,
      "totalRatings": 289,
      "ratingDistribution": {
        "5": 145,
        "4": 89,
        "3": 34,
        "2": 15,
        "1": 6
      }
    },
    "suggestions": {
      "total": 87,
      "topCategories": [
        { "category": "Environment", "count": 23 },
        { "category": "Infrastructure", "count": 19 }
      ],
      "totalUpvotes": 1234,
      "totalComments": 456
    }
  }
}
```

### 4.2 Export Reports
**Endpoint:** `GET /analytics/export`

**Query Parameters:**
- `type`: Report type (feedback, ratings, suggestions, all)
- `format`: Export format (csv, json, pdf)
- `startDate`: From date (ISO 8601)
- `endDate`: To date (ISO 8601)

**Response (200 OK):**
Returns file download with appropriate content-type header.

---

## 5. Error Responses

### Standard Error Format
All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "description",
        "message": "Description must be at least 10 characters"
      }
    ]
  }
}
```

### Error Codes
- `VALIDATION_ERROR` (400): Invalid input data
- `UNAUTHORIZED` (401): Missing or invalid authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource conflict (e.g., duplicate rating)
- `RATE_LIMIT` (429): Too many requests
- `SERVER_ERROR` (500): Internal server error

---

## 6. Database Schema

### Feedback Table
```sql
CREATE TABLE feedbacks (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  service_category VARCHAR(50) NOT NULL,
  feedback_type ENUM('complaint', 'suggestion', 'appreciation') NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(200),
  attachment_url VARCHAR(500),
  status ENUM('Open', 'In Progress', 'Resolved') DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_category (service_category),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
);
```

### Ratings Table
```sql
CREATE TABLE ratings (
  id VARCHAR(50) PRIMARY KEY,
  feedback_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (feedback_id) REFERENCES feedbacks(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_user_feedback (user_id, feedback_id),
  INDEX idx_feedback (feedback_id),
  INDEX idx_rating (rating)
);
```

### Suggestions Table
```sql
CREATE TABLE suggestions (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  expected_benefit TEXT,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_category (category),
  INDEX idx_upvotes (upvotes),
  INDEX idx_created (created_at)
);
```

### Suggestion Upvotes Table
```sql
CREATE TABLE suggestion_upvotes (
  id VARCHAR(50) PRIMARY KEY,
  suggestion_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (suggestion_id) REFERENCES suggestions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_user_suggestion (user_id, suggestion_id),
  INDEX idx_suggestion (suggestion_id)
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id VARCHAR(50) PRIMARY KEY,
  suggestion_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (suggestion_id) REFERENCES suggestions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_suggestion (suggestion_id),
  INDEX idx_created (created_at)
);
```

---

## 7. Security & Performance

### Security Measures
1. **Authentication**: JWT-based authentication for all endpoints
2. **Authorization**: Role-based access control (RBAC)
   - Citizens: Can create feedback, rate, suggest, upvote, comment
   - Politicians: Can view all feedback, view ratings, respond to suggestions
   - Moderators: Can review and moderate feedback/comments
   - Admins: Full access including analytics and exports
3. **Input Validation**: Strict validation on all inputs
4. **Rate Limiting**: 
   - General: 100 requests/hour per user
   - Feedback creation: 10/hour per user
   - Suggestion creation: 5/hour per user
5. **File Upload**: 
   - Max size: 5MB
   - Allowed types: images (jpg, png, gif), documents (pdf, doc, docx)
   - Virus scanning before storage
6. **SQL Injection**: Use parameterized queries
7. **XSS Protection**: Sanitize all user inputs

### Performance Optimization
1. **Caching**: Cache frequently accessed data (categories, analytics)
2. **Pagination**: Mandatory for list endpoints
3. **Indexing**: Database indexes on frequently queried fields
4. **CDN**: Serve uploaded files via CDN
5. **Database Connection Pooling**: Reuse database connections
6. **Async Processing**: Use queues for analytics and exports

---

## 8. Implementation Notes

### Middleware Required
```javascript
// Example Express.js middleware
app.use(express.json({ limit: '5mb' }));
app.use(authenticate); // JWT verification
app.use(authorize); // Role-based access
app.use(rateLimit); // Rate limiting
app.use(validateInput); // Input validation
```

### Example Backend Structure (Node.js)
```
backend/
├── src/
│   ├── controllers/
│   │   ├── feedbackController.js
│   │   ├── ratingController.js
│   │   ├── suggestionController.js
│   │   └── analyticsController.js
│   ├── models/
│   │   ├── Feedback.js
│   │   ├── Rating.js
│   │   ├── Suggestion.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── feedback.js
│   │   ├── ratings.js
│   │   ├── suggestions.js
│   │   └── analytics.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── rateLimit.js
│   ├── services/
│   │   ├── feedbackService.js
│   │   ├── ratingService.js
│   │   └── analyticsService.js
│   └── utils/
│       ├── fileUpload.js
│       └── errorHandler.js
├── tests/
└── server.js
```

---

## 9. Testing Requirements

### Unit Tests
- Test all controller functions
- Test validation logic
- Test database models

### Integration Tests
- Test complete API workflows
- Test authentication/authorization
- Test file uploads

### Load Tests
- Test with 1000+ concurrent users
- Test database query performance
- Test API response times

---

## 10. Deployment Checklist

- [ ] Set up production database with proper indexes
- [ ] Configure environment variables
- [ ] Set up file storage (AWS S3, Azure Blob, etc.)
- [ ] Configure CDN for file delivery
- [ ] Set up SSL certificates
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Perform security audit
- [ ] Load testing
- [ ] Create API documentation site (Swagger/OpenAPI)
