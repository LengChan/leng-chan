<template>
  <div class="max-w-4xl mx-auto px-4 py-16">
    <h3 class="text-center">Stuff I've Written ✍️</h3>
    <p class="text-center text-gray-600 mb-8">Writings on things I found interesting or wanted to share.</p>

    <div class="space-y-6">
      <article 
        v-for="post in paginatedPosts" 
        :key="post.id"
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div class="p-6">
          <time 
            :datetime="post.created_at"
            class="text-sm text-gray-500"
            v-html="post.created_at"
          />
          <h4 class="mt-2">
            <a :href="`/posts/${post.id}`" class="text-xl font-semibold hover:text-blue-600 transition-colors duration-200">
              {{ post.title }}
            </a>
          </h4>
          <p 
            v-if="post.description" 
            class="mt-3 text-gray-600 line-clamp-2"
          >
            {{ post.description }}
          </p>
          <div class="mt-4">
            <a :href="`/posts/${post.id}`" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Read more →
            </a>
          </div>
        </div>
      </article>
    </div>

    <div class="mt-8 flex justify-center space-x-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-3 py-1 rounded',
          currentPage === page 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ page }}
      </button>
    </div>    
  </div>
</template>

<script>
import { posts } from "../contents/index";

export default {
  data() {
    return {
      currentPage: 1,
      postsPerPage: 5,
      posts: posts,
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.posts.slice(start, end);
    },
    totalPages() {
      console.log(this.posts)
      return Math.ceil(this.posts.length / this.postsPerPage);
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    }
  }
}
</script>