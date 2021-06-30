import { reactive, computed, readonly } from '@vue/composition-api'
import supabase from '@/utils/supabase'

const state = reactive({
  loading: false,
  lists: [],
  currentList: {},
  pagination: {
    limit: 5, // vgt-table perPage
    page: 1, // vgt-table currentPage
  },
  sorts: {
    field: 'id',
    type: 'desc',
  },
  total: null,
})

const findAll = async () => {
  const { data, count } = await supabase
    .from('lists')
    .select(
      `
      *,
      items (
        id
      )
    `,
      { count: 'exact' }
    )
    .order(state.sorts.field, {
      ascending: state.sorts.type === 'asc',
    })
    .range(rangeStart, rangeEnd)

  state.lists = data
  state.total = count
}

const findById = async (listId) => {
  const { data: lists } = await supabase
    .from('lists')
    .select(
      `
      *,
      items (
        *
      )
    `,
      { count: 'exact' }
    )
    .eq('id', listId)

  state.activeList = lists[0]
}

const onPagingChange = (params) => {
  const modifiedParams = {
    ...(params.currentPage && { page: params.currentPage }),
    ...(params.currentPerPage && { limit: params.currentPerPage }),
  }
  state.pagination = modifiedParams
}

const onSortChange = (params) => {
  const sorts = params[0]
  if (sorts.type === 'none') {
    state.sorts = {
      field: 'id',
      type: 'desc',
    }
  } else {
    state.sorts = { ...sorts }
  }
}

const lists = computed(() => state.lists)
const currentList = computed(() =>
  Object.keys(state.currentList).length ? state.currentList : null
)
const total = computed(() => state.total)
const loading = computed(() => state.loading)

const rangeStart = computed(
  () => (state.pagination.page - 1) * state.pagination.limit
)
const rangeEnd = computed(
  () => state.pagination.page * state.pagination.limit - 1
)

export const ListProvider = readonly({
  // getters
  lists,
  currentList,
  total,
  loading,
  // methods
  findAll,
  findById,
  onPagingChange,
  onSortChange,
})
