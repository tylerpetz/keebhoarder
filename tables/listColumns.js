export default [
  {
    label: 'Name',
    field: 'name',
    clickable: true,
  },
  {
    label: 'Description',
    field: 'description',
  },
  {
    label: 'Public',
    field: 'public',
    type: 'boolean',
    width: '100px',
  },
  {
    label: 'Item Count',
    field: 'items',
    type: 'number',
    width: '150px',
    sortable: false,
  },
  {
    label: 'Created',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSSSSxxx",
    dateOutputFormat: 'MMM d yyyy', // outputs Mar 16th 2018,
  },
  {
    label: 'Last Updated',
    field: 'updatedAt',
    type: 'date',
    dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSSSSxxx",
    dateOutputFormat: 'MMM d yyyy', // outputs Mar 16th 2018,
  },
  {
    label: 'Actions',
    field: 'after',
    type: 'boolean',
    sortable: false,
  },
]
