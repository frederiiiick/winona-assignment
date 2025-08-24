<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="navbar bg-[#fd7c3f]/80">
      <div class="flex-1">
        <RouterLink to="/" class="text-xl font-bold px-4 py-2">Dashboard</RouterLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><RouterLink to="/">Doctors</RouterLink></li>
          <li>
            <ThemeToggle size="md" />
          </li>
        </ul>
      </div>
    </div>
    
    <main class="flex-1 min-h-0">
      <RouterView />
    </main>

    <footer class="footer-center p-10 bg-base-200 text-base-content mt-auto">
      <div class="space-y-4 flex justify-between w-full">
        <p class="m-0 text-base-content/70 text-sm">Copyright © 2025 - All rights reserved</p>
        <div class="flex items-center gap-3">
          <ThemeToggle size="sm" />
        </div>
      </div>
    </footer>
  </div>
</template>
