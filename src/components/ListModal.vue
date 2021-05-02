<script>
export default {
  name: 'ItemModal',
  data () {
    return {
      itemTypes: [
        {
          text: 'Keyboard',
          value: 'usd'
        },
        {
          text: 'Keycap Set',
          value: 'usd'
        },
        {
          text: 'Artisan Keycap',
          value: 'usd'
        },
        {
          text: 'Switch',
          value: 'usd'
        },
        {
          text: 'Case',
          value: 'usd'
        },
        {
          text: 'PCB',
          value: 'usd'
        },
        {
          text: 'Cable',
          value: 'usd'
        },
        {
          text: 'Deskmat',
          value: 'usd'
        },
        {
          text: 'Other',
          value: 'usd'
        }
      ],
      currencyTypes: [
        {
          text: '$ (USD)',
          value: 'usd'
        }
      ]
    }
  }
}
</script>

<template>
  <Modal
    :show="$store.state.app.activeModal === 'add-list'"
    @close="$emit('close')"
  >
    <div class="flex flex-col p-6 items-center">
      <FormInput
        class="w-full mb-6"
        type="text"
      >
        Name *
      </FormInput>
      <FormInput
        class="w-full mb-6"
        type="text"
      >
        Description
      </FormInput>
      <input
        type="checkbox"
        placeholder="Make List Public"
        value="1"
      >
    </div>
    <footer
      slot="footer"
      class="p-2 flex justify-end"
    >
      <Keycap
        theme="accent"
        cap-style="large"
        class="capitalize"
        @click.native="$emit('close')"
      >
        &#10229; Save List
      </Keycap>
    </footer>
  </Modal>
</template>
