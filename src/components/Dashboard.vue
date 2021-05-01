<script>
import Sidebar from '@/components/Sidebar'
import DashboardStats from '@/components/DashboardStats'
import DashboardRecentActivity from '@/components/DashboardRecentActivity'
// import DashboardGetStarted from '@/components/DashboardGetStarted'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    DashboardStats,
    DashboardRecentActivity
    // DashboardGetStarted
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
  <div>
    <div class="flex bg-theme-bg h-full">
      <div class="block fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden" />
      <sidebar />
      <main class="flex-1 overflow-x-hidden bg-theme-bg p-6">
        <h3 class="text-theme-text text-3xl font-medium">
          Dashboard
        </h3>

        <dashboard-stats />

        <div class="mt-8 flex space-x-8 w-full items-start">
          <div class="w-2/3">
            <!-- <dashboard-get-started /> -->
          </div>
          <div class="w-1/3">
            <dashboard-recent-activity />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
