<template>
   <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Add padding-top to account for fixed header -->
      <div class="pt-8">
        <!-- Hero Section -->
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/3">
            <img 
              src="../assets/andrew.jpg" 
              alt="Profile Picture" 
              class="rounded-full w-48 h-48 object-cover shadow-lg mx-auto"
            >
          </div>
          <div class="md:w-2/3 text-center md:text-left">
            <h1 class="text-4xl font-bold mb-4">Hey there, I'm Leng Chan 👋</h1>
            <p class="text-xl text-base-content/80 mb-6">
              I'm a full-stack Software Engineer, living in CHINA. I love building things with Ruby on Rails, Vue.js, and exploring new technologies.
            </p>
            <div class="flex gap-4 justify-center md:justify-start">
              <a href="https://github.com/yourusername" class="btn btn-primary">
                GitHub
              </a>
              <a href="https://twitter.com/yourusername" class="btn btn-outline">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <!-- Projects Section -->
        <div id="projects" class="mt-16">
          <h2 class="text-2xl font-bold mb-4">Featured Projects</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Project Name</h3>
                <p>Brief description of your awesome project goes here.</p>
                <div class="card-actions justify-end">
                  <a href="#" class="btn btn-sm">View Project</a>
                </div>
              </div>
            </div>
            <!-- Add more project cards as needed -->
          </div>
        </div>
      </div>
    </div>
</template>