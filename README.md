# Broker Listing API Demo

A comprehensive demonstration of a shared yacht listing ecosystem for independent brokers. This application showcases how multiple brokers can securely publish and consume yacht listings through a unified API with admin controls, authentication, IP whitelisting, and granular permissions.

## Overview

This is a **frontend-only demo** built with Next.js, TypeScript, and Tailwind CSS. It simulates a real-world broker listing API system using mocked data and API responses. The application demonstrates:

- **Public Listings**: Browse yacht listings with advanced filtering and sorting
- **Admin Dashboard**: Manage brokers, listings, approvals, API keys, and view logs
- **Broker Portal**: Submit listings, manage API access, and view documentation
- **Security Features**: IP whitelisting, JWT tokens, and permission levels
- **Enterprise SaaS UI**: Modern, responsive design with a professional look

## Features

### Public Features
- Browse yacht listings with grid/list view toggle
- Advanced filtering by type, price, length, location, and featured status
- Sorting options (newest, price, length)
- Detailed listing pages with image galleries and specifications
- Responsive design for all screen sizes

### Admin Dashboard
- **Overview**: KPI cards showing total boats, active brokers, pending approvals, and API requests
- **Boats**: Manage all listings, toggle featured status, search functionality
- **Brokers**: View broker accounts, permissions, and whitelisted IPs
- **Approvals**: Review and approve/reject pending broker applications
- **API Keys**: Manage authentication credentials for all brokers
- **Logs**: Monitor API requests with detailed information (endpoint, status, IP, response time)

### Broker Portal
- **My Listings**: View and manage your yacht listings
- **Submit Listing**: Create new listings with detailed forms (read/write permission required)
- **Access & Security**:
  - View account status and permission level
  - Manage IP whitelist with validation
  - Regenerate API tokens
  - Request permission upgrades
- **API Docs**: Complete integration guide with code examples and authentication details

## Getting Started

### Prerequisites
- Bun (recommended) or Node.js 18+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd broker-listing-api-demo
```

2. Install dependencies:
```bash
bun install
```

3. (Optional) Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` to set your API base URL:
```
NEXT_PUBLIC_API_BASE_URL=https://api.brokerlistings.com/v1
```

### Running the Application

Start the development server:
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Demo Accounts

**Admin Portal** (`/admin/login`)
- Click "Login as Admin" to access the admin dashboard
- Full access to all features

**Broker Portal** (`/broker/login`)
- **Marina Yacht Sales** - Active, Read/Write permissions (12 listings)
- **Coastal Brokers Group** - Active, Read/Write permissions (11 listings)
- **Island Marine Brokers** - Pending, Read-Only permissions (7 listings)

## Project Structure

```
broker-listing-api-demo/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── listings/            # Public listings pages
│   │   ├── admin/               # Admin dashboard
│   │   ├── broker/              # Broker portal
│   │   └── page.tsx             # Landing page
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── navbar.tsx           # Main navigation
│   │   ├── dashboard-layout.tsx # Dashboard layout
│   │   └── boat-card.tsx        # Boat listing card
│   ├── data/                    # Mock data files
│   │   ├── boats.json           # 30 yacht listings
│   │   ├── brokers.json         # 3 broker accounts
│   │   └── api-logs.json        # API request logs
│   └── lib/
│       ├── api-client.ts        # API client with mock responses
│       ├── types.ts             # TypeScript type definitions
│       └── utils.ts             # Utility functions
└── .env.local.example           # Environment variables template
```

## API Integration Guide

### Current Implementation (Demo)

The application currently uses mocked data from JSON files in `src/data/`. All API calls in `src/lib/api-client.ts` simulate network delays and return mock data.

### Transitioning to a Real Backend

To connect this application to a real API backend:

1. **Update Environment Variables**:
   - Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to your actual API endpoint

2. **Modify API Client**:
   - In `src/lib/api-client.ts`, replace mock implementations with real HTTP requests
   - Uncomment the fetch examples provided in the code
   - Add proper error handling and token management

3. **Example Real Implementation**:
```typescript
export async function getBoats(filters?: FilterOptions): Promise<Boat[]> {
  const queryParams = new URLSearchParams();
  if (filters?.type) queryParams.append('type', filters.type);
  // ... add other filters

  const response = await fetch(
    `${API_BASE_URL}/boats?${queryParams}`,
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
```

4. **Authentication**:
   - Implement actual JWT token storage (localStorage, cookies, or session)
   - Add token refresh logic
   - Implement real login/logout flows

5. **File Uploads**:
   - Integrate with S3 or similar service for image uploads
   - Update the listing form to handle real file uploads

## Mock Data

### Boats
- 30 yacht listings across 3 brokers
- Types: Catamaran, Monohull, Power
- Price range: $385K - $4.25M
- Length range: 36ft - 76ft

### Brokers
- **Marina Yacht Sales**: Active, Read/Write, 12 listings
- **Coastal Brokers Group**: Active, Read/Write, 11 listings
- **Island Marine Brokers**: Pending, Read-Only, 7 listings

### API Logs
- 50 recent API requests
- Includes timestamps, endpoints, status codes, and response times

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Package Manager**: Bun

## Development Notes

### Mocked vs Real

**Currently Mocked**:
- All API requests (boats, brokers, logs)
- Authentication and authorization
- File uploads (images)
- Database operations

**Ready for Backend Integration**:
- API client structure with placeholder endpoints
- TypeScript types for all data models
- Environment variable configuration
- Request/response handling patterns

### Key Design Decisions

1. **Client-Side State**: Uses React hooks for state management (suitable for demo; consider Redux/Zustand for production)
2. **Local Storage**: Demo uses localStorage for broker ID (use secure session management in production)
3. **No Real Security**: Authentication is simulated (implement proper JWT validation in production)
4. **Mock Delays**: API calls include simulated network delays for realism

## AI Technology & Product Roadmap

### AI-Powered Integration
The platform leverages cutting-edge AI technology to make integration effortless:

- **Intelligent Field Matching**: AI automatically maps API fields to your existing systems
- **WordPress Integration**: Seamless connection to WordPress custom post types and yacht plugins
- **Universal Compatibility**: Works with Wix, Squarespace, custom CMS, or any hosting environment
- **Auto-Detection**: AI analyzes your website schema and creates mappings automatically
- **Fully Scalable**: Handles 10 listings or 10,000 with the same ease
- **Zero Configuration**: Just connect your site—AI does the rest

**Average Setup Time**: 5-10 minutes (vs. days/weeks with traditional integrations)

### Products in Pipeline

**1. Branded Vendor Apps**
- White-label mobile applications with your branding
- Seamless listing integration from the field
- Real-time sync to broker inventory
- iOS and Android support

**2. Client Data Capture**
- Advanced lead tracking integrated into listing feeds
- Real-time analytics: know who's viewing what
- Automated follow-up workflows
- CRM integration ready

**3. Direct Client Listing Submission**
- Boat owners submit listings directly to portal
- Broker review and authorization workflow
- Draft management system
- Streamlined acquisition process
- Quality control before publication

**Early Access**: Existing members get priority access to all new features at no additional cost.

## Future Enhancements

To make this production-ready:

1. **Backend Integration**:
   - Connect to real REST API or GraphQL endpoint
   - Implement proper authentication (JWT, OAuth)
   - Add database (PostgreSQL, MongoDB)

2. **Security**:
   - Implement server-side API route handlers
   - Add CSRF protection
   - Validate IP whitelisting on server
   - Encrypt sensitive data

3. **Features**:
   - Real-time updates (WebSockets)
   - Advanced search (Elasticsearch)
   - Email notifications
   - Analytics dashboard
   - Multi-language support

4. **Testing**:
   - Unit tests (Jest, React Testing Library)
   - E2E tests (Playwright, Cypress)
   - API integration tests

5. **DevOps**:
   - CI/CD pipeline
   - Docker containerization
   - Monitoring and logging (Sentry, LogRocket)
   - Performance optimization

## License

This is a demonstration project for showcasing a broker listing API ecosystem.

## Support

For questions or feedback about this demo, please create an issue in the repository.
