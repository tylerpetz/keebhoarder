<script>
export default {
  name: 'Sidebar'
}
</script>

<template>
  <div class="translate-x-0 ease-out fixed z-30 inset-y-0 left-0 w-48 transition duration-300 transform bg-theme-bg-d overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
    <nav>
      <a
        class="flex items-center mt-2 p-3 text-theme-link"
        href="/"
      >
        <Keycap
          theme="accent"
          cap-style="tiny"
        >
          D
        </Keycap>
        <span class="ml-4">Dashboard</span>
      </a>
      <a
        class="flex items-center p-3 text-theme-text"
        href="/"
      >
        <Keycap
          theme="base"
          cap-style="tiny"
        >
          O
        </Keycap>
        <span class="ml-4">Orders</span>
      </a>
      <a
        class="flex items-center p-3 text-theme-text"
        href="/"
      >
        <Keycap
          theme="base"
          cap-style="tiny"
        >
          I
        </Keycap>
        <span class="ml-4">Inventory</span>
      </a>
      <a
        class="flex items-center p-3 text-theme-text"
        href="/"
      >
        <Keycap
          theme="base"
          cap-style="tiny"
        >
          B
        </Keycap>
        <span class="ml-4">Builds</span>
      </a>
    </nav>
  </div>
</template>
