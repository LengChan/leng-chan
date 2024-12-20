<template>
  <div class="post-container">
    <div v-html="content"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

export default {
  name: 'Post',
  setup() {
    const route = useRoute()
    const content = ref('')

    onMounted(async () => {
      try {
        const postId = route.params.id
        const response = await fetch(`/src/contents/posts/${postId}.md`)
        if (!response.ok) {
          throw new Error('Post not found')
        }
        const markdown = await response.text()
        content.value = marked(markdown)
      } catch (error) {
        console.error('Error loading post:', error)
      }
    })

    return {
      content
    }
  }
}
</script>

<style scoped>
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

:deep(pre) {
  background-color: #1a1a1a;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  color: #e6e6e6;
}

:deep(code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 85%;
  padding: 0.2em 0.4em;
  margin: 0;
  background-color: #2d2d2d;
  color: #e6e6e6;
  border-radius: 3px;
}

:deep(pre code) {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  display: block;
}

:deep(h1),
:deep(h2) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

:deep(p) {
  margin-bottom: 16px;
}
</style>
