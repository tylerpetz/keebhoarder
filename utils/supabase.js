import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czxnnbzuuvgfzmtmgodz.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjEzODg2NSwiZXhwIjoxOTM3NzE0ODY1fQ.kXifYKPykedOENrseZurhbAwhD8w0J7KiUy9iHbvkPY'
const client = createClient(supabaseUrl, supabaseKey)
export default client
