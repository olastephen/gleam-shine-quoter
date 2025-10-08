-- Helper script to add admin metadata for existing users
-- 
-- IMPORTANT: This script only adds admin metadata to existing Supabase Auth users.
-- You must first create the user in Supabase Auth Dashboard:
-- 1. Go to Authentication > Users in your Supabase Dashboard
-- 2. Click "Add User" and create the admin account
-- 3. Copy the UUID of the newly created user
-- 4. Replace 'USER_UUID_HERE' below with the actual UUID
-- 5. Run this script in SQL Editor

-- Example: Add admin metadata for a user
INSERT INTO public.admin_users (id, email, full_name, role)
VALUES (
  'USER_UUID_HERE',  -- Replace with actual user UUID from auth.users
  'admin@example.com',  -- Replace with actual admin email
  'Admin Name',  -- Replace with actual admin name
  'admin'  -- Can be 'admin' or 'super_admin'
)
ON CONFLICT (id) DO UPDATE 
SET 
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;

-- To view all admin users:
-- SELECT * FROM public.admin_users;

-- To view all auth users and their admin status:
-- SELECT 
--   au.id,
--   au.email,
--   au.created_at,
--   adu.full_name,
--   adu.role,
--   CASE WHEN adu.id IS NOT NULL THEN 'Yes' ELSE 'No' END as is_admin
-- FROM auth.users au
-- LEFT JOIN public.admin_users adu ON au.id = adu.id;

