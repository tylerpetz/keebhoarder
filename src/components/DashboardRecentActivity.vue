<script>
export default {
  name: 'DashboardRecentActivity'
}
</script>

<template>
  <div class="w-full shadow overflow-hidden rounded">
    <table class="w-full">
      <thead>
        <tr class="bg-theme-bg-d text-theme-text">
          <th
            class="p-4 text-left text-sm font-medium"
          >
            Recent Activity
          </th>
          <th class="p-4" />
        </tr>
      </thead>

      <tbody class="bg-theme-bg-l">
        <tr>
          <td class="p-4 whitespace-no-wrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <img
                  class="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                >
              </div>

              <div class="ml-4">
                <div class="text-sm leading-5 font-medium text-theme-text">
                  Added <a
                    href="#"
                    class="text-theme-link"
                  >Keycult 1/65</a> to Wishlist
                </div>
                <div class="text-sm leading-5 text-theme-text-d">
                  12d ago
                </div>
              </div>
            </div>
          </td>

          <td
            class="p-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
          >
            <a
              href="#"
              class="text-theme-link"
            >Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
