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
  <Modal @close="$emit('close')">
    <div class="flex flex-col p-6 items-center">
      <FormInput
        class="w-full mb-6"
        type="text"
      >
        Name *
      </FormInput>
      <FormSelect
        :options="itemTypes"
        class="w-full mb-6"
        type="text"
        placeholder="Select Item Type"
      >
        Type *
      </FormSelect>
      <div class="grid grid-cols-5 w-full mb-6">
        <FormInput
          class="col-span-3"
          input-classes="rounded-r-none"
          type="number"
          step="any"
        >
          Price *
        </FormInput>
        <FormSelect
          class="col-span-2"
          :options="currencyTypes"
          input-classes="rounded-l-none"
          type="text"
        >
          Currency *
        </FormSelect>
      </div>
      <FormInput
        class="w-full mb-6"
        type="text"
      >
        Description
      </FormInput>
      <Keycap
        theme="mod"
        cap-style="large"
        @click.native="$emit('close')"
      >
        Add Photos
      </Keycap>
    </div>
    <footer
      class="bg-theme-bg-d p-2 flex justify-end"
    >
      <Keycap
        theme="accent"
        cap-style="large"
        class="capitalize"
        @click.native="$emit('close')"
      >
        &#10229; Save Item
      </Keycap>
    </footer>
  </Modal>
</template>
