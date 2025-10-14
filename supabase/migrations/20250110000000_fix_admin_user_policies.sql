-- Fix admin user creation policies to allow any authenticated admin to create users

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Super admins can insert admin_users" ON public.admin_users;

-- Create a new policy that allows any authenticated admin user to insert admin users
CREATE POLICY "Admin users can insert admin_users"
  ON public.admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

-- Also allow admin users to update admin users (not just super_admin)
DROP POLICY IF EXISTS "Super admins can update admin_users" ON public.admin_users;

CREATE POLICY "Admin users can update admin_users"
  ON public.admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

-- Keep the delete policy restricted to super_admin only for safety
-- (This policy already exists, so we don't need to recreate it)
