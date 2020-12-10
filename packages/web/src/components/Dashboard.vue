<script>
import gql from 'graphql-tag'

export default {
  name: 'Dashboard',
  apollo: {
    // Apollo specific options
    orders: gql`
      query {
        orders {
          id
          items {
            id
          }
        }
      }
    `,
    items: gql`
      query {
        items {
          id
          price
        }
      }
    `
  },
  data () {
    return {
      orders: [],
      items: []
    }
  },
  computed: {
    totalPrice () {
      if (!this.items.length) return 0
      return this.items.reduce((acc, cur) => acc.price + cur.price)
    }
  }
}
</script>

<template>
  <div class="flex flex-row justify-between min-h-screen">
    <div>
      stuff
    </div>
    <div class="bg-theme-bg-l pr-4 sm:pr-6 lg:pr-8 xl:pr-0">
      <div class="px-6 lg:w-96">
        <div class="pt-6 pb-2">
          <h2 class="font-bold text-theme-text">
            Recent Activity
          </h2>
        </div>
        <div>
          <ul class="divide-y divide-theme-border">
            <li class="py-4">
              <div class="flex space-x-3">
                <img
                  class="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                  alt=""
                >
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm text-theme-text font-medium">
                      You
                    </h3>
                    <p class="text-sm text-theme-text">
                      1h
                    </p>
                  </div>
                  <p class="text-sm text-theme-text-l">
                    Added "Keycult" to wishlist
                  </p>
                </div>
              </div>
            </li>
            <li class="py-4">
              <div class="flex space-x-3">
                <img
                  class="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                  alt=""
                >
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm text-theme-text font-medium">
                      You
                    </h3>
                    <p class="text-sm text-theme-text">
                      1h
                    </p>
                  </div>
                  <p class="text-sm text-theme-text-l">
                    Added "Keycult" to wishlist
                  </p>
                </div>
              </div>
            </li>
            <li class="py-4">
              <div class="flex space-x-3">
                <img
                  class="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                  alt=""
                >
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm text-theme-text font-medium">
                      You
                    </h3>
                    <p class="text-sm text-theme-text">
                      1h
                    </p>
                  </div>
                  <p class="text-sm text-theme-text-l">
                    Added "Keycult" to wishlist
                  </p>
                </div>
              </div>
            </li>

            <!-- More items... -->
          </ul>
          <div class="py-4 text-sm border-t border-theme-border">
            <a
              href="#"
              class="text-theme-link font-semibold hover:text-theme-link-hover"
            >View all activity <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </div>
    </div>

    <!-- <h1>Get Started</h1>
    <h1>My Profile</h1> -->
  </div>
</template>
