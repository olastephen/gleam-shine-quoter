# Quick Start Guide - Admin Area

This guide will get your admin area up and running in 5 minutes.

## Prerequisites

- Supabase account and project set up
- Environment variables configured in `.env`

## Step-by-Step Setup

### Step 1: Apply Database Migrations

Run the migration to create the quotes and admin_users tables:

**Option A: Using Supabase Dashboard (Easiest)**
1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/20250101000000_create_quotes_table.sql`
5. Paste it into the SQL editor
6. Click **Run** or press `Ctrl+Enter`
7. You should see "Success. No rows returned"

**Option B: Using Supabase CLI**
```bash
npx supabase db push
```

### Step 2: Create Your First Admin User

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click the **Add User** button
4. Fill in:
   - **Email**: your-admin@example.com
   - **Password**: Create a strong password (at least 8 characters)
5. Click **Create User**
6. Copy the UUID of the newly created user

### Step 3: Add Admin Metadata (Optional but Recommended)

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query (replace the values with your info):

```sql
INSERT INTO public.admin_users (id, email, full_name, role)
VALUES (
  'paste-user-uuid-here',
  'your-admin@example.com',
  'Your Name',
  'admin'
);
```

### Step 4: Test the Admin Login

1. Start your development server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:5173/admin/login`

3. Login with:
   - Email: your-admin@example.com
   - Password: (the password you created)

4. You should be redirected to `/admin/dashboard`

### Step 5: Test Quote Submission

1. Open a new browser tab/window
2. Go to your main website: `http://localhost:5173/`
3. Scroll to the booking form
4. Fill out the form and submit a quote
5. Go back to the admin dashboard
6. You should see the new quote appear automatically (real-time!)

## That's It!

You now have a fully functional admin area. 

## Next Steps

- Read `ADMIN_FEATURES.md` for detailed feature documentation
- Read `ADMIN_SETUP.md` for troubleshooting and best practices
- Create additional admin users for your team
- Customize the dashboard to match your needs

## Quick Reference

### URLs
- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin/dashboard`

### Quote Statuses
1. Pending (new)
2. Contacted
3. Quoted (price sent)
4. Approved
5. Rejected
6. Completed

### Common Tasks

**View a Quote:**
1. Click the "View" button on any quote row

**Update Quote Status:**
1. Click "View" on a quote
2. Select new status from dropdown
3. Click "Save Changes"

**Add Quote Amount:**
1. Click "View" on a quote
2. Enter amount in "Quote Amount" field
3. Click "Save Changes"

**Delete a Quote:**
1. Click "Delete" button on quote row
2. Confirm deletion

**Logout:**
1. Click "Logout" button in top-right corner

## Troubleshooting

**Problem: Can't login**
- Verify email/password are correct
- Check that user was created in Supabase Auth
- Verify `.env` file has correct Supabase credentials

**Problem: Quotes not showing**
- Check that migration was applied successfully
- Try refreshing the page
- Check browser console for errors

**Problem: "Failed to submit quote" when testing form**
- Verify Supabase connection
- Check RLS policies are enabled
- View browser console for specific error

## Support

For detailed documentation, see:
- `ADMIN_FEATURES.md` - Complete feature list and technical details
- `ADMIN_SETUP.md` - In-depth setup and configuration guide

