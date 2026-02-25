-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done')),
  category TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Disable RLS for public read/write (no auth required for this demo)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.tasks FOR DELETE USING (true);

-- No seed data: tasks come from real user input only
