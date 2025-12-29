# CiviConnect

A modern platform connecting citizens with their local government to report and track community issues.

## Overview

CiviConnect empowers Indian communities to actively participate in civic governance by providing a transparent platform for reporting local issues, tracking their resolution, and engaging with elected officials.

## Features

- **Citizen Portal**: Report community issues with photos and descriptions
- **Real-time Tracking**: Monitor issue status from submission to resolution
- **Multi-role Access**: Separate dashboards for Citizens, Politicians, Moderators, and Admins
- **Analytics Dashboard**: Comprehensive insights and reports for administrators
- **Moderation System**: Content review and quality control

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: CSS with custom design system
- **Routing**: React Router
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd SpeakUp
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── layouts/       # Layout components
│   ├── context/       # Context providers
│   └── App.jsx        # Main app component
├── public/            # Static assets
└── index.html         # Entry HTML
```

## User Roles

- **Citizen**: Report and track community issues
- **Politician**: Review and respond to constituent concerns
- **Moderator**: Review flagged content and ensure quality
- **Admin**: Manage users, view analytics, and configure system settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For support or inquiries:
- Email: support@civiconnect.in
- Website: [civiconnect.in](https://civiconnect.in)
