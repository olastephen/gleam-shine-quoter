-- Fix super admin policies to properly allow only super_admin users to create admin users
-- This addresses the RLS policy issue while maintaining proper security

-- Drop the overly permissive policy I created earlier
DROP POLICY IF EXISTS "Admin users can insert admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can update admin_users" ON public.admin_users;

-- Create a proper policy that only allows super_admin users to insert admin users
CREATE POLICY "Only super admins can insert admin_users"
  ON public.admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Create a policy that allows super_admin users to update admin users
CREATE POLICY "Only super admins can update admin_users"
  ON public.admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Ensure the delete policy is also properly restricted to super_admin
DROP POLICY IF EXISTS "Super admins can delete admin_users" ON public.admin_users;

CREATE POLICY "Only super admins can delete admin_users"
  ON public.admin_users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );
