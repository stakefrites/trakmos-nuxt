<template>

  <div class="bg-hero-circuit-board bg-repeat bg-[#070c38] h-screen overflow-x-hidden flex <md:flex-col">
    <Sidebar/>
    <div class="md:(container mx-auto) px-4 py-10  h-full">
      <slot />
    </div>
  </div>
</template>

