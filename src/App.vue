<script setup>
import Light from './components/Light.vue'
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header Navigation -->
    <header class="fixed top-0 left-0 right-0 bg-base-100 shadow-sm z-50">
      <nav class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" class="text-xl font-bold">Leng Chan</a>
        <ul class="flex gap-6">
          <li><RouterLink to="/about" class="hover:text-primary transition-colors">About</RouterLink></li>
          <li><RouterLink to="/music" class="hover:text-primary transition-colors">Music</RouterLink></li>
          <li><RouterLink to="/projects" class="hover:text-primary transition-colors">Projects</RouterLink></li>
          <li><RouterLink to="/blog" class="hover:text-primary transition-colors">Blog</RouterLink></li>
        </ul>
        <Light />
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-base-200 mt-16">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-base-content/80">
            © 2024 Leng Chan. All rights reserved.
          </div>
          <div class="flex gap-4">
            <a href="https://github.com/yourusername" class="hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="https://twitter.com/yourusername" class="hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com/in/yourusername" class="hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
