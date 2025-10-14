-- Create a secure function to create admin users that bypasses RLS
-- This function can only be called by super_admin users

CREATE OR REPLACE FUNCTION public.create_admin_user(
  user_email TEXT,
  user_full_name TEXT DEFAULT NULL,
  user_role TEXT DEFAULT 'admin'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_role TEXT;
  new_user_id UUID;
  result JSON;
BEGIN
  -- Check if the current user is a super_admin
  SELECT role INTO current_user_role
  FROM public.admin_users
  WHERE id = auth.uid();
  
  -- If user is not found or not a super_admin, deny access
  IF current_user_role IS NULL OR current_user_role != 'super_admin' THEN
    RAISE EXCEPTION 'Access denied. Only super_admin users can create admin users.';
  END IF;
  
  -- Validate role
  IF user_role NOT IN ('admin', 'super_admin') THEN
    RAISE EXCEPTION 'Invalid role. Must be either admin or super_admin.';
  END IF;
  
  -- Generate a new UUID for the user
  new_user_id := gen_random_uuid();
  
  -- Insert the new admin user
  INSERT INTO public.admin_users (id, email, full_name, role)
  VALUES (new_user_id, user_email, user_full_name, user_role);
  
  -- Return success response
  result := json_build_object(
    'success', true,
    'user_id', new_user_id,
    'email', user_email,
    'role', user_role
  );
  
  RETURN result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_admin_user TO authenticated;
