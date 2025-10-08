# Admin Area Setup Guide

## Overview

The admin area allows authorized team members to view, manage, and respond to customer quote requests. This guide will help you set up and use the admin dashboard.

## Features

- Secure authentication with Supabase Auth
- View all quote requests in a centralized dashboard
- Real-time updates when new quotes arrive
- Filter quotes by status
- Update quote status and add quote amounts
- Add internal admin notes
- Delete quotes
- Statistics dashboard showing quote metrics

## Setup Instructions

### 1. Run Database Migrations

First, you need to apply the database migrations to create the necessary tables:

```bash
# If using Supabase CLI
npx supabase db push

# Or apply the migration file manually through Supabase Dashboard
# Navigate to SQL Editor and run the contents of:
# supabase/migrations/20250101000000_create_quotes_table.sql
```

### 2. Create Admin Users

Admin users need to be created in Supabase Auth. You have two options:

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User**
4. Enter the admin email and password
5. Optionally, add the user to the `admin_users` table for additional metadata:

```sql
INSERT INTO public.admin_users (id, email, full_name, role)
VALUES ('USER_UUID', 'admin@example.com', 'Admin Name', 'admin');
```

#### Option B: Using Supabase Auth API

You can also create admin users programmatically using the Supabase dashboard's SQL editor:

```sql
-- Note: This requires admin privileges
-- Create user through your application signup, then add to admin_users
```

### 3. Environment Variables

Ensure your `.env` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Access the Admin Area

Once setup is complete:

1. Navigate to `/admin/login`
2. Enter your admin credentials
3. You'll be redirected to `/admin/dashboard` upon successful login

## Admin Dashboard Features

### Quote Status Options

- **Pending**: New quote request (default)
- **Contacted**: Customer has been contacted
- **Quoted**: Quote amount has been provided
- **Approved**: Customer approved the quote
- **Rejected**: Quote was declined
- **Completed**: Service has been completed

### Managing Quotes

1. **View Quote Details**: Click the "View" button on any quote
2. **Update Status**: Select a new status from the dropdown
3. **Add Quote Amount**: Enter the price in the quote amount field
4. **Add Notes**: Use the admin notes field for internal team communication
5. **Save Changes**: Click "Save Changes" to update the quote
6. **Delete Quote**: Click the "Delete" button (requires confirmation)

### Filtering

Use the filter dropdown to view quotes by status:
- All Quotes
- Pending
- Contacted
- Quoted
- Approved
- Rejected
- Completed

### Statistics Dashboard

The top of the dashboard shows:
- Total number of quotes
- Number of pending quotes
- Number of contacted quotes
- Number of quoted quotes
- Number of approved quotes

## Security Features

### Row Level Security (RLS)

The database has RLS policies configured to:
- Allow anyone to insert quotes (for the public booking form)
- Only allow authenticated users to view, update, and delete quotes
- Ensure admin users can only access data through proper authentication

### Protected Routes

The admin dashboard is protected by the `ProtectedRoute` component, which:
- Checks for an active Supabase Auth session
- Redirects unauthenticated users to the login page
- Listens for auth state changes

## Real-Time Updates

The dashboard subscribes to real-time changes in the quotes table. When a new quote is submitted or an existing quote is updated by another admin, the dashboard will automatically refresh.

## Troubleshooting

### Can't Login

- Verify your email and password are correct
- Check that the user exists in Supabase Auth
- Ensure your Supabase credentials in `.env` are correct

### Quotes Not Showing

- Verify the migrations have been applied
- Check browser console for errors
- Ensure RLS policies are correctly configured
- Verify your Supabase connection

### Real-Time Updates Not Working

- Check your Supabase project has real-time enabled
- Verify your Supabase plan includes real-time functionality
- Check browser console for WebSocket connection errors

## Adding More Admins

To add additional team members:

1. Create a new user in Supabase Auth (via dashboard or API)
2. Optionally add their details to the `admin_users` table
3. Share the login credentials securely
4. They can access the admin area at `/admin/login`

## Best Practices

1. **Use Strong Passwords**: Ensure all admin accounts have strong, unique passwords
2. **Regular Backups**: Regularly backup your Supabase database
3. **Monitor Activity**: Keep track of who's accessing the admin area
4. **Update Quotes Promptly**: Respond to new quotes quickly for better customer service
5. **Use Admin Notes**: Document important information about each quote for team collaboration

## Support

For issues or questions, contact your development team or refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com/)

