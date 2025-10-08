-- Create quotes table
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Service information
  service_type TEXT NOT NULL,
  
  -- Property details
  address TEXT NOT NULL,
  postcode TEXT,
  bedrooms TEXT,
  bathrooms TEXT,
  
  -- Scheduling
  preferred_date DATE,
  preferred_time TIME,
  
  -- Contact information
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Admin management fields
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'contacted', 'quoted', 'approved', 'rejected', 'completed')),
  quote_amount DECIMAL(10, 2),
  admin_notes TEXT,
  assigned_to UUID REFERENCES auth.users(id)
);

-- Create index on created_at for sorting
CREATE INDEX idx_quotes_created_at ON public.quotes(created_at DESC);

-- Create index on status for filtering
CREATE INDEX idx_quotes_status ON public.quotes(status);

-- Create index on email for searching
CREATE INDEX idx_quotes_email ON public.quotes(email);

-- Enable Row Level Security
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert quotes (for public booking form)
CREATE POLICY "Anyone can insert quotes"
  ON public.quotes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view all quotes
CREATE POLICY "Authenticated users can view all quotes"
  ON public.quotes
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can update quotes
CREATE POLICY "Authenticated users can update quotes"
  ON public.quotes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can delete quotes
CREATE POLICY "Authenticated users can delete quotes"
  ON public.quotes
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on row update
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create admin_users table for storing admin-specific information
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin'))
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view admin_users
CREATE POLICY "Authenticated users can view admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (true);

