<template>
  <div class="min-h-screen bg-base-100 pt-24">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">My Music</h1>
      
      <!-- Music Player -->
      <div class="bg-base-200 rounded-lg p-6 mb-8">
        <div class="flex flex-col items-center">
          <!-- Album Art -->
          <img 
            :src="currentTrack.cover" 
            alt="Album Cover"
            class="w-64 h-64 rounded-lg shadow-lg mb-4 object-cover"
          >
          
          <!-- Track Info -->
          <h2 class="text-xl font-bold mb-2">{{ currentTrack.title }}</h2>
          <p class="text-base-content/70 mb-4">{{ currentTrack.artist }}</p>
          
          <!-- Audio Controls -->
          <audio
            ref="audioPlayer"
            :src="currentTrack.url"
            @timeupdate="updateProgress"
            @ended="handleTrackEnd"
          ></audio>
          
          <!-- Progress Bar -->
          <div class="w-full max-w-md mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
            <input 
              type="range"
              min="0"
              max="100"
              v-model="progress"
              @input="seekTo"
              class="range range-primary"
            >
          </div>
          
          <!-- Control Buttons -->
          <div class="flex items-center gap-4">
            <button @click="previousTrack" class="btn btn-circle">
              <i class="fas fa-step-backward"></i>
            </button>
            <button @click="togglePlay" class="btn btn-circle btn-primary">
              <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
            </button>
            <button @click="nextTrack" class="btn btn-circle">
              <i class="fas fa-step-forward"></i>
            </button>
            <button @click="togglePlayMode" class="btn btn-circle" :title="playModeTitle">
              <i :class="playModeIcon"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Playlist -->
      <div class="bg-base-200 rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Playlist</h2>
        <div class="space-y-2">
          <div 
            v-for="(track, index) in playlist" 
            :key="index"
            @click="playTrack(index)"
            class="flex items-center p-3 rounded-lg hover:bg-base-300 cursor-pointer"
            :class="{ 'bg-base-300': currentTrackIndex === index }"
          >
            <img 
              :src="track.cover"
              alt="Track Cover"
              class="w-12 h-12 rounded object-cover mr-4"
            >
            <div>
              <div class="font-medium">{{ track.title }}</div>
              <div class="text-sm text-base-content/70">{{ track.artist }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      currentTrackIndex: 0,
      progress: 0,
      playlist: [
        {
          title: "真的爱着你",
          artist: "明慧",
          url: "/src/assets/music/background.mp3",
          cover: "/src/assets/music/andrew.jpg"
        },
        {
          title: "寂寞的季节",
          artist: "陶喆",
          url: "/src/assets/music/陶喆 - 寂寞的季节.mp3",
          cover: "/src/assets/music/vue.svg"
        },
        // Add more tracks as needed
      ],
      currentTime: 0,
      duration: 0,
      playMode: 'order', // 'order', 'loop', 'random'
    }
  },
  computed: {
    currentTrack() {
      return this.playlist[this.currentTrackIndex]
    },
    playModeIcon() {
      switch (this.playMode) {
        case 'order':
          return 'fas fa-list-ol'
        case 'loop':
          return 'fas fa-repeat'
        case 'random':
          return 'fas fa-random'
      }
    },
    playModeTitle() {
      switch (this.playMode) {
        case 'order':
          return 'Order Play'
        case 'loop':
          return 'Loop Play'
        case 'random':
          return 'Random Play'
      }
    }
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause()
      } else {
        this.$refs.audioPlayer.play()
      }
      this.isPlaying = !this.isPlaying
    },
    playTrack(index) {
      this.currentTrackIndex = index
      this.$refs.audioPlayer.load()
      if (this.isPlaying) {
        this.$refs.audioPlayer.play()
      }
    },
    previousTrack() {
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length
      this.$refs.audioPlayer.load()
      if (this.isPlaying) {
        this.$refs.audioPlayer.play()
      }
    },
    nextTrack() {
      if (this.playMode === 'random') {
        this.playRandomTrack()
      } else {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length
        this.$refs.audioPlayer.load()
        if (this.isPlaying) {
          this.$refs.audioPlayer.play()
        }
      }
    },
    updateProgress() {
      const audio = this.$refs.audioPlayer
      this.currentTime = audio.currentTime
      this.duration = audio.duration
      this.progress = (audio.currentTime / audio.duration) * 100
    },
    seekTo() {
      const audio = this.$refs.audioPlayer
      const time = (this.progress / 100) * audio.duration
      audio.currentTime = time
    },
    handleTrackEnd() {
      switch (this.playMode) {
        case 'order':
          if (this.currentTrackIndex < this.playlist.length - 1) {
            this.nextTrack()
          } else {
            this.isPlaying = false
          }
          break
        case 'loop':
          this.nextTrack()
          break
        case 'random':
          this.playRandomTrack()
          break
      }
    },
    playRandomTrack() {
      const randomIndex = Math.floor(Math.random() * this.playlist.length)
      this.currentTrackIndex = randomIndex
      this.$refs.audioPlayer.load()
      if (this.isPlaying) {
        this.$refs.audioPlayer.play()
      }
    },
    togglePlayMode() {
      const modes = ['order', 'loop', 'random']
      const currentIndex = modes.indexOf(this.playMode)
      this.playMode = modes[(currentIndex + 1) % modes.length]
    },
    formatTime(seconds) {
      if (!seconds) return '0:00'
      
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }
  },
  mounted() {
    // 监听音频加载完成事件以获取总时长
    this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
      this.duration = this.$refs.audioPlayer.duration
    })
  }
}
</script>