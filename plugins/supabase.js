import { createClient } from '@supabase/supabase-js'

export default ({ $config }, inject) => {
  const supabaseUrl = $config.supabaseUrl
  const supabaseKey = $config.supabaseKey
  const client = createClient(supabaseUrl, supabaseKey)
  inject('supabase', client)
}
