export default [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Description',
    field: 'description'
  },
  {
    label: 'Qty',
    field: 'qty',
    type: 'number',
    width: '100px'

  },
  {
    label: 'Price',
    field: 'price',
    type: 'number',
    width: '150px'

  },
  {
    label: 'Public',
    field: 'public',
    type: 'boolean',
    width: '100px'

  },
  {
    label: 'Created',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
    dateOutputFormat: 'MMM d yyyy' // outputs Mar 16th 2018,
  },
  {
    label: 'Last Updated',
    field: 'updatedAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
    dateOutputFormat: 'MMM d yyyy' // outputs Mar 16th 2018,
  },
  {
    label: 'Actions',
    field: 'after',
    type: 'boolean',
    sortable: false
  }
]
