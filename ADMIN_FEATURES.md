# Admin Area - Complete Feature Documentation

## System Architecture

### Frontend Components

#### Pages
1. **AdminLogin** (`src/pages/AdminLogin.tsx`)
   - Secure login form with email/password authentication
   - Integrates with Supabase Auth
   - Redirects to dashboard on successful login
   - Shows error messages for failed login attempts

2. **AdminDashboard** (`src/pages/AdminDashboard.tsx`)
   - Main admin interface for managing quotes
   - Real-time quote updates via Supabase subscriptions
   - Statistics dashboard with key metrics
   - Quote filtering by status
   - Detailed quote viewing and editing dialog
   - Quote deletion with confirmation

#### Components
1. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
   - Wraps admin routes to ensure authentication
   - Checks for active Supabase session
   - Redirects to login if not authenticated
   - Shows loading state during auth check

2. **BookingForm** (Updated - `src/components/BookingForm.tsx`)
   - Now saves quotes to Supabase database
   - Handles form validation
   - Provides user feedback via toast notifications
   - Resets form after successful submission

### Backend (Supabase)

#### Database Tables

1. **quotes**
   - Stores all customer quote requests
   - Fields:
     - `id` (UUID, primary key)
     - `created_at` (timestamp)
     - `updated_at` (timestamp)
     - `service_type` (text)
     - `address` (text)
     - `postcode` (text, optional)
     - `bedrooms` (text, optional)
     - `bathrooms` (text, optional)
     - `preferred_date` (date, optional)
     - `preferred_time` (time, optional)
     - `email` (text)
     - `phone` (text)
     - `status` (enum: pending, contacted, quoted, approved, rejected, completed)
     - `quote_amount` (decimal, optional)
     - `admin_notes` (text, optional)
     - `assigned_to` (UUID, references auth.users)

2. **admin_users**
   - Stores admin-specific metadata
   - Fields:
     - `id` (UUID, references auth.users)
     - `created_at` (timestamp)
     - `email` (text)
     - `full_name` (text, optional)
     - `role` (enum: admin, super_admin)

#### Security (Row Level Security)

**Quotes Table Policies:**
- `Anyone can insert quotes` - Allows public to submit quote requests
- `Authenticated users can view all quotes` - Admins can see all quotes
- `Authenticated users can update quotes` - Admins can modify quotes
- `Authenticated users can delete quotes` - Admins can delete quotes

**Admin Users Table Policies:**
- `Authenticated users can view admin_users` - Admins can see other admins

#### Database Features

1. **Automatic Timestamp Updates**
   - Trigger automatically updates `updated_at` on row changes
   
2. **Indexes for Performance**
   - Index on `created_at` for efficient sorting
   - Index on `status` for fast filtering
   - Index on `email` for quick searching

## User Flows

### Customer Quote Request Flow
1. Customer visits the website
2. Fills out the booking form
3. Submits the form
4. Quote is saved to database with status "pending"
5. Customer sees success message
6. Admin receives the quote in real-time

### Admin Management Flow
1. Admin navigates to `/admin/login`
2. Enters credentials
3. Authenticated by Supabase Auth
4. Redirected to `/admin/dashboard`
5. Views all quotes with real-time updates
6. Filters quotes by status
7. Clicks "View" to see quote details
8. Updates status, adds quote amount, or adds notes
9. Saves changes
10. Customer information is updated in database

## Quote Status Workflow

```
PENDING → CONTACTED → QUOTED → APPROVED → COMPLETED
                          ↓
                      REJECTED
```

**Status Definitions:**
- **Pending**: New quote, awaiting admin review
- **Contacted**: Admin has reached out to customer
- **Quoted**: Price has been provided to customer
- **Approved**: Customer accepted the quote
- **Rejected**: Quote was declined
- **Completed**: Service has been performed

## Dashboard Features

### Statistics Cards
- **Total Quotes**: All-time quote count
- **Pending**: Quotes awaiting contact
- **Contacted**: Quotes in progress
- **Quoted**: Quotes with prices sent
- **Approved**: Accepted quotes

### Quote Table
Displays:
- Submission date
- Customer contact info (email, phone)
- Service type
- Property address
- Current status (color-coded badge)
- Quote amount
- Action buttons (View, Delete)

### Quote Details Dialog
Shows:
- Customer information (email, phone)
- Property details (address, postcode, bedrooms, bathrooms)
- Service information (type, preferred date/time)
- Admin actions:
  - Status update dropdown
  - Quote amount input
  - Admin notes textarea

### Real-Time Updates
- Uses Supabase real-time subscriptions
- Automatically refreshes when quotes are added/updated
- No manual refresh needed

## Technical Implementation

### Authentication Flow
```typescript
// Login
supabase.auth.signInWithPassword({ email, password })

// Check session
supabase.auth.getSession()

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {})

// Logout
supabase.auth.signOut()
```

### Database Operations
```typescript
// Insert quote (public form)
supabase.from("quotes").insert({ ... })

// Fetch all quotes (admin)
supabase.from("quotes").select("*").order("created_at", { ascending: false })

// Update quote (admin)
supabase.from("quotes").update({ ... }).eq("id", quoteId)

// Delete quote (admin)
supabase.from("quotes").delete().eq("id", quoteId)

// Real-time subscription
supabase.channel("quotes_changes")
  .on("postgres_changes", { event: "*", schema: "public", table: "quotes" }, handler)
  .subscribe()
```

## Routes

| Path | Component | Protected | Description |
|------|-----------|-----------|-------------|
| `/` | Index | No | Main website/landing page |
| `/admin/login` | AdminLogin | No | Admin login page |
| `/admin/dashboard` | AdminDashboard | Yes | Admin quote management |

## Environment Setup

Required environment variables (`.env`):
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Files Created/Modified

### New Files
- `src/pages/AdminLogin.tsx`
- `src/pages/AdminDashboard.tsx`
- `src/components/ProtectedRoute.tsx`
- `supabase/migrations/20250101000000_create_quotes_table.sql`
- `supabase/create_admin_user.sql`
- `ADMIN_SETUP.md`
- `ADMIN_FEATURES.md`

### Modified Files
- `src/App.tsx` - Added admin routes
- `src/components/BookingForm.tsx` - Added database integration
- `src/integrations/supabase/types.ts` - Added TypeScript types for tables

## Security Considerations

1. **Authentication Required**: All admin pages require valid Supabase session
2. **RLS Enabled**: Database has Row Level Security policies
3. **Protected Routes**: Client-side route protection via ProtectedRoute component
4. **Session Management**: Automatic session checking and auth state monitoring
5. **Secure Password Storage**: Handled by Supabase Auth (bcrypt hashing)

## Performance Optimizations

1. **Database Indexes**: Optimized queries for common operations
2. **Real-Time Subscriptions**: Efficient WebSocket connections
3. **Loading States**: Prevents layout shifts and improves UX
4. **Optimistic Updates**: Immediate UI feedback

## Future Enhancements

Possible additions:
- Email notifications when new quotes arrive
- Quote assignment to specific admin users
- Quote history/audit trail
- Export quotes to CSV/Excel
- Advanced filtering (date range, service type, etc.)
- Customer communication tracking
- Quote templates
- Automated quote calculation based on service type
- Mobile app for admins

## Testing Checklist

- [ ] Create admin user in Supabase Auth
- [ ] Run database migrations
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Submit quote from public form
- [ ] Verify quote appears in admin dashboard
- [ ] Test quote filtering
- [ ] Update quote status
- [ ] Add quote amount
- [ ] Add admin notes
- [ ] Delete quote
- [ ] Test logout functionality
- [ ] Verify protected routes redirect when not authenticated
- [ ] Test real-time updates (submit quote in one browser, view in another)

