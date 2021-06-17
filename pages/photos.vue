<script>
import supabase from '@/utils/supabase'

export default {
  name: 'NotFound',
  async mounted() {
    const { data } = await supabase.storage.from('photos').list()
    console.log('stuff', data)
  },
}
</script>

<template>
  <div>stuff</div>
</template>
