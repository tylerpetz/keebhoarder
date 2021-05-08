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
    label: 'Created',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
    dateOutputFormat: 'MMM d yyyy', // outputs Mar 16th 2018,
    sortable: true
  },
  {
    label: 'Last Updated',
    field: 'updatedAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
    dateOutputFormat: 'MMM d yyyy', // outputs Mar 16th 2018,
    sortable: true
  },
  {
    label: 'Actions',
    field: 'after',
    type: 'boolean',
    sortable: false
  }
]
