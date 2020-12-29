<script>
export default {
  name: 'DashboardStats'
}
</script>

<template>
  <div class="mt-8 flex space-x-8 w-full">
    <div class="w-full sm:w-1/2 xl:w-1/3">
      <div class="flex items-center px-5 py-6 shadow-sm rounded bg-theme-bg-l text-theme-text">
        <keycap>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 pt-1"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </keycap>

        <div class="mx-5">
          <h4 class="text-2xl font-semibold">
            3
          </h4>
          <div class="">
            Pending Orders
          </div>
        </div>
      </div>
    </div>

    <div class="w-full sm:w-1/2 xl:w-1/3">
      <div class="flex items-center px-5 py-6 shadow-sm rounded bg-theme-bg-l text-theme-text">
        <keycap
          theme="mod"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-6 h-6 pt-1"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </keycap>

        <div class="mx-5">
          <h4 class="text-2xl font-semibold">
            53
          </h4>
          <div class="">
            Items in Inventory
          </div>
        </div>
      </div>
    </div>

    <div class="w-full sm:w-1/2 xl:w-1/3">
      <div class="flex items-center px-5 py-6 shadow-sm rounded bg-theme-bg-l text-theme-text">
        <keycap theme="accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 pt-1"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </keycap>

        <div class="mx-5">
          <h4 class="text-2xl font-semibold">
            4
          </h4>
          <div class="">
            Builds
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
