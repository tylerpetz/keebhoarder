export default [
  {
    label: 'Name',
    field: 'name',
    sortable: false
  },
  {
    label: 'Description',
    field: 'description',
    sortable: false
  },
  {
    label: 'Public',
    field: 'public',
    type: 'boolean',
    sortable: false
  },
  {
    label: 'Item Count',
    field: 'items',
    formatFn: (val) => val.length,
    type: 'number',
    sortable: false
  },
  {
    label: 'Actions',
    field: 'after',
    type: 'boolean',
    sortable: false
  }
]
