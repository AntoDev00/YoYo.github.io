<template>
  <div class="container py-3">
    <button class="btn btn-link mb-2 back-btn d-block d-md-inline" @click="$router.push('/')">
      ← Torna alla home
    </button>
    <transition name="fade">
      <div v-if="loading" key="loading" class="text-center my-5">
        <div class="skeleton-player mx-auto mb-3"></div>
        <div class="skeleton-title mx-auto mb-2"></div>
        <div class="skeleton-desc mx-auto"></div>
      </div>
      <div v-else key="content">
        <div class="mb-3 position-relative">
          <div class="ratio ratio-16x9 video-player-shadow rounded-4 mx-auto" style="max-width:600px;">
            <iframe v-if="video.youtubeId" :src="`https://www.youtube.com/embed/${video.youtubeId}`" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen class="rounded-4 w-100" style="aspect-ratio:16/9;">
            </iframe>
            <div v-else class="text-danger text-center py-4">Video non disponibile</div>
          </div>
          <span v-if="isNew(video.publishedAt)" class="badge bg-success position-absolute top-0 end-0 m-2">Nuovo</span>
        </div>
        <h4 class="fw-bold">{{ video.title }}</h4>
        <div class="text-secondary mb-2">By {{ video.author }}</div>
        <p class="lead">{{ video.description }}</p>
        <div class="my-4">
          <comment-section :video-id="video.youtubeId" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import CommentSection from '../components/CommentSection.vue';
export default {
  name: 'VideoPage',
  components: { CommentSection },
  props: ['youtubeId'],
  data() {
    return {
      video: {},
      loading: true,
    };
  },
  methods: {
    isNew(date) {
      if (!date) return false;
      const published = new Date(date);
      const now = new Date();
      const diff = (now - published) / (1000 * 60 * 60);
      return diff < 48;
    }
  },
  async mounted() {
    try {
      const res = await axios.get(`https://yoyo-api.vercel.app/api/videos/${this.youtubeId}`);
      this.video = res.data;
    } catch (e) {
      // fallback: usa solo youtubeId e mock info se serve
      this.video = {
        youtubeId: this.youtubeId,
        title: 'Video Yoga',
        author: '',
        description: '',
      };
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
.video-player-shadow {
  box-shadow: 0 8px 32px rgba(59,130,246,0.11);
  background: #f8fafc;
}
.skeleton-player {
  width: 100%;
  max-width: 600px;
  height: 340px;
  border-radius: 24px;
  background: linear-gradient(90deg, #f3f3f3 25%, #e0f2f1 50%, #f3f3f3 75%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.2s ease-in-out infinite;
}
.skeleton-title {
  width: 70%;
  height: 28px;
  border-radius: 8px;
  background: #f3f3f3;
  margin-bottom: 10px;
}
.skeleton-desc {
  width: 90%;
  height: 20px;
  border-radius: 6px;
  background: #e0f2f1;
}
@keyframes skeleton-loading {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.back-btn {
  font-weight: 600;
  color: #3B82F6;
  text-decoration: none;
  background: transparent;
  border: none;
  outline: none;
  box-shadow: none;
}
.back-btn:active, .back-btn:focus {
  color: #1e40af;
  background: #e0f2f1;
}
</style>
