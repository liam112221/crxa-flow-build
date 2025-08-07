-- Create orders table for the payment system
CREATE TABLE public.orders (
  id TEXT NOT NULL PRIMARY KEY,
  service TEXT NOT NULL,
  description TEXT NOT NULL,
  budget INTEGER NOT NULL,
  dp_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Menunggu Pembayaran DP',
  payment_url TEXT,
  session_id TEXT,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  demo_link TEXT,
  drive_link TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders access (public for now since no auth system yet)
CREATE POLICY "Orders are viewable by everyone" 
ON public.orders 
FOR SELECT 
USING (true);

CREATE POLICY "Orders can be created by everyone" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Orders can be updated by everyone" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();