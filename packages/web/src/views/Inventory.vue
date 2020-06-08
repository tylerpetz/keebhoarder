<script>
import { VueGoodTable } from 'vue-good-table'
export default {
  name: 'Inventory',
  components: {
    VueGoodTable
  },
  data () {
    return {
      columns: [
        {
          label: 'Item Name',
          field: 'name'
        },
        {
          label: 'Purchase Price',
          field: 'price',
          type: 'number'
        },
        {
          label: 'Item Type',
          field: 'type'
        },
        {
          label: 'Date Purchased',
          field: 'purchasedOn',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy'
        },
        {
          label: 'Date Received',
          field: 'purchasedOn',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy'
        },
        {
          label: 'Photo',
          field: 'purchasedOn',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy',
          sortable: false
        },
        {
          label: '',
          field: 'type',
          sortable: false
        }
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '', score: 0.03343 },
        { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 }
      ]
    }
  }
}
</script>

<template>
  <div class="bg-theme-bg-alt h-full p-8 pr-6">
    <div class="w-full flex justify-between mb-6">
      <div>
        <h1 class="text-theme-text text-xl">Inventory</h1>
      </div>
      <div>
        <Shortcut :hotkeys="[{text: 'Alt', theme: 'mod', type: 'mod' }, {text: 'N', theme: 'base' }]" @click.native="$store.commit('SET_ACTIVE_MODAL', '')">Add New Item</Shortcut>
      </div>
    </div>
    <vue-good-table
      theme="keebhoarder"
      :columns="columns"
      :rows="rows"/>
  </div>
</template>

<style lang="scss">
@import "vue-good-table/src/styles/style.scss";

$thead-bg-color-2: #2C394F;
// $chevron-color: lighten(var(--alpha-cap), 10%);

$secondary-text-color: #8290A7 ;
$input-border-color: var(--theme-bg-alt);

// suggested by wifey
.vgt-table.keebhoarder {
  border-radius: 8px;
  border: none;
  background-color: var(--theme-bg);

  & tr.clickable {
    &:hover{
      background-color: var(--theme-bg);
    }
  }

  // td
  & td {
    border-bottom: none;
    color: var(--theme-text);
  }

  //th
  thead tr {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }

  thead th{
    color: var(--alpha-legend);
    border-bottom:  1px solid var(--theme-bg-alt);
    background: var(--alpha-cap);

    &.sortable {
           // color: lighten(var(--theme-text), 15%);
      &:before{
        border-top-color: $chevron-color;
      }
      &:after{
        border-bottom-color: $chevron-color;
      }
      &.sorting-asc, &.sorting-desc {
        background: var(--mod-cap);
        color: var(--mod-legend);
      }
      &.sorting-asc, &.sorting-desc {
        &:after{
          border-bottom-color: $link-color;
        }
      }
      &.sorting-desc {
        &:before{
          border-top-color: $link-color;
        }
      }
    }
  }

  //bordered
  &.bordered td, &.bordered th {
    border: none;
  }

  //input
  .vgt-input, .vgt-select{
    color: var(--theme-text);
    background-color: darken($thead-bg-color-2, 5%);
    border: 1px solid $input-border-color;
    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: var(--theme-text);
      opacity: 0.3; /* Firefox */
    }
  }

  .v-select {
    background-color: darken($thead-bg-color-2, 5%);
    input {
      color: var(--theme-text);
    }
    .vs__open-indicator {
      fill: var(--theme-text)
    }
  }
}

.vgt-wrap.nocturnal{
  .vgt-wrap__footer{
    color: var(--theme-text);
    border: 1px solid var(--theme-bg-alt);
    background: linear-gradient(var(--alpha-cap), $thead-bg-color-2);
    .footer__row-count{
      &__label{
        color: $secondary-text-color;
      }
      &__select{
        color:  var(--theme-text);
        &:focus{
          border-color: $link-color;
        }
      }
    }
    .footer__navigation{
      &__page-btn{
        color: var(--theme-text);
        &.disabled,
        &.disabled:hover {
          .chevron.left:after{
            border-right-color: var(--theme-text);
          }
          .chevron.right:after{
            border-left-color: var(--theme-text);
          }
        }
      }
      &__info, &__page-info{
        color: $secondary-text-color;
      }
    }
  }

  // control bar
  .vgt-global-search{
    border:  1px solid var(--theme-bg-alt);
    background: linear-gradient(var(--alpha-cap), $thead-bg-color-2);
  }
  .vgt-global-search__input{
    .input__icon{
      .magnifying-glass{
        border: 2px solid var(--theme-bg-alt);
        &:before{
          background: var(--theme-bg-alt);
        }
      }
    }
    .vgt-input, .vgt-select{
      color: var(--theme-text);
      background-color: darken($thead-bg-color-2, 5%);
      border: 1px solid $input-border-color;
      &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: var(--theme-text);
        opacity: 0.3; /* Firefox */
      }
    }
  }
}
</style>
