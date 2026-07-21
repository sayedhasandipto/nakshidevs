# ServiceHub - Complete Online Services Platform

A modern, full-stack online services platform built with Next.js that connects service clients, providers, and small businesses in Bangladesh.

## Features

### For Service Clients

- Browse and search services by category
- View detailed service information and provider profiles
- Create orders and track progress
- Secure payment processing
- Real-time support chat
- Order history and ratings

### For Service Providers

- Create and manage service listings
- View incoming orders
- Track order progress
- Manage payment and earnings
- Build professional profile
- Client ratings and reviews

### For Small Businesses

- Website builder for online presence
- Online store capabilities
- Customer management
- Analytics and insights
- Marketing tools
- Payment processing

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Authentication**: Better Auth with email/password
- **Styling**: Tailwind CSS 4, DaisyUI, Hero UI
- **Payment**: Stripe (integrated ready)
- **Real-time**: Socket.io (setup ready)
- **Validation**: Zod
- **HTTP Client**: Axios

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...all]/          # Better Auth endpoints
│   │   ├── services/               # Service CRUD operations
│   │   └── orders/                 # Order management
│   ├── auth/                        # Auth pages (login, signup)
│   ├── dashboard/                   # User dashboard
│   ├── services/                    # Services listing and detail
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Global styles
│
├── lib/
│   ├── db.js                        # MongoDB connection
│   ├── auth.js                      # Better Auth config
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   └── Order.js
│   └── utils.ts                     # Utility functions
│
├── components/
│   ├── Navigation.tsx               # Main navigation bar
│   └── auth/
│       ├── Login.tsx
│       └── SignUp.tsx
│
└── public/                          # Static assets
```

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**

```bash
cd /vercel/share/v0-project
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/service-platform

# Generate secret: openssl rand -base64 32
BETTER_AUTH_SECRET=your-generated-secret

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Stripe keys for payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. **Start development server**

```bash
pnpm dev
```

Visit http://localhost:3000

## Available Routes

### Public Routes

- `/` - Landing page
- `/services` - Services catalog
- `/services/[id]` - Service detail
- `/auth/login` - Login page
- `/auth/signup` - Sign up page

### Protected Routes (Require Login)

- `/dashboard` - User dashboard
- `/dashboard/orders` - User's orders
- `/dashboard/services` - User's services (providers)
- `/dashboard/profile` - Profile settings

## API Endpoints

### Services

- `GET /api/services` - List all services
  - Query params: `category`, `limit`, `skip`
- `GET /api/services/[id]` - Get service details
- `POST /api/services` - Create new service (provider)
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Orders

- `GET /api/orders` - Get user's orders
  - Query params: `userId`, `role`, `status`
- `POST /api/orders` - Create new order

### Authentication (Better Auth)

- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login user
- `GET /api/auth/session` - Get current session
- `POST /api/auth/sign-out` - Logout user

## Database Models

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'client' | 'provider' | 'business',
  avatar: String (URL),
  phone: String,
  bio: String,
  address: String,
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Service

```javascript
{
  title: String,
  description: String,
  category: String,
  price: Number,
  duration: String,
  image: String (URL),
  features: [String],
  providerId: ObjectId (ref: User),
  rating: Number (0-5),
  reviews: Number,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order

```javascript
{
  serviceId: ObjectId (ref: Service),
  clientId: ObjectId (ref: User),
  providerId: ObjectId (ref: User),
  amount: Number,
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled',
  paymentStatus: 'unpaid' | 'pending' | 'paid' | 'failed',
  description: String,
  deliverables: [String],
  startDate: Date,
  completionDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features Status

### Phase 1 ✅ (Complete)

- [x] Landing page with navigation
- [x] Authentication (Better Auth setup)
- [x] User registration with roles
- [x] Services catalog with filtering
- [x] Service detail pages
- [x] Dashboard overview
- [x] MongoDB integration
- [x] API routes setup

### Phase 2 (In Development)

- [ ] Complete order management
- [ ] Payment integration with Stripe
- [ ] Order status tracking
- [ ] Invoice generation
- [ ] Email notifications

### Phase 3 (Planned)

- [ ] Real-time support chat (Socket.io)
- [ ] Developer/provider hiring system
- [ ] Notifications system
- [ ] Reviews and ratings

### Phase 4 (Planned)

- [ ] Analytics dashboard
- [ ] Website builder
- [ ] Online store functionality
- [ ] Advanced reporting

## Authentication

The platform uses **Better Auth** with email/password authentication:

1. **Sign Up**: Users create account with name, email, password, and role
2. **Login**: Email and password-based authentication
3. **Session Management**: Secure session handling with HTTP-only cookies
4. **Role-based Access**: Different dashboards for clients, providers, and businesses

## Environment Variables

| Variable                             | Required | Description                                                |
| ------------------------------------ | -------- | ---------------------------------------------------------- |
| `MONGODB_URI`                        | Yes      | MongoDB connection string                                  |
| `BETTER_AUTH_SECRET`                 | Yes      | Secret for auth (generate with: `openssl rand -base64 32`) |
| `NEXT_PUBLIC_APP_URL`                | Yes      | Application URL (http://localhost:3000 for dev)            |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No       | Stripe public key for payments                             |
| `STRIPE_SECRET_KEY`                  | No       | Stripe secret key for payments                             |

## Development

### Code Style

- ESLint configured
- TypeScript for type safety
- Tailwind CSS for styling

### Testing

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Set Environment Variables in Vercel

```
MONGODB_URI
BETTER_AUTH_SECRET
NEXT_PUBLIC_APP_URL (e.g., https://your-app.vercel.app)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (optional)
STRIPE_SECRET_KEY (optional)
```

## Troubleshooting

### MongoDB Connection Issues

- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
- Ensure connection string includes database name

### Authentication Not Working

- Verify `BETTER_AUTH_SECRET` is set
- Check that cookies are not blocked in browser
- Clear browser cache and cookies

### Services Not Loading

- Check MongoDB connection
- Verify API route is running (check terminal)
- Check browser console for errors

## Best Practices

1. **Security**
   - Never commit `.env` files
   - Use HTTPS in production
   - Validate all inputs server-side
   - Use parameterized queries (Mongoose handles this)

2. **Performance**
   - Use API route pagination for large datasets
   - Implement caching strategies
   - Optimize images and assets
   - Use lazy loading for components

3. **Database**
   - Add indexes for frequently queried fields
   - Use lean() queries when you don't need full documents
   - Implement data validation at model level

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions:

- Check existing issues on GitHub
- Create a new issue with detailed description
- Contact the development team

## Roadmap

**Q1 2024**

- Complete order and payment system
- Implement support chat
- Add provider dashboard

**Q2 2024**

- Launch website builder
- Implement hiring system
- Add analytics

**Q3 2024**

- Online store functionality
- Advanced reporting
- API documentation

## Changelog

### v0.1.0 (Current)

- Initial release
- Landing page
- Authentication system
- Services catalog
- Dashboard interface
- MongoDB integration
