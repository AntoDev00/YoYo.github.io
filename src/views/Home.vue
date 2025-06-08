<template>
  <div class="container py-3">
    <div class="text-center mb-1">
      <h2 class="fw-bold" style="letter-spacing:1px;">Video della Community</h2>
      <div class="text-secondary mb-3" style="font-size:1.1rem;">Scopri, condividi e lasciati ispirare dalla pratica di tutti!</div>
      <button class="btn btn-gradient mb-3" @click="addVideo" style="min-width:160px;">+ Aggiungi Video</button>
    </div>
    <transition-group name="fade-slide" tag="div" class="row g-3">
      <template v-if="loading">
        <div v-for="n in 6" :key="'skeleton-'+n" class="col-12 col-md-6 col-lg-4">
          <div class="skeleton-card"></div>
        </div>
      </template>
      <template v-else-if="videos.length === 0">
        <div class="col-12 text-center text-muted py-5">Nessun video trovato.</div>
      </template>
      <template v-else>
        <div v-for="video in videos" :key="video.youtubeId" class="col-12 col-md-6 col-lg-4">
          <div class="video-card h-100 shadow-sm position-relative animate__animated animate__fadeInUp" @click="goToVideo(video.youtubeId)">
            <img :src="video.thumbnail" class="w-100 rounded-top" style="aspect-ratio:16/9;object-fit:cover;" :alt="video.title" />
            <div class="p-3">
              <div class="d-flex align-items-center mb-2">
                <h5 class="mb-0 flex-grow-1">{{ video.title }}</h5>
                <span v-if="isNew(video.publishedAt)" class="badge bg-success ms-2">Nuovo</span>
              </div>
              <div class="text-secondary small mb-2">By {{ video.author }}</div>
              <div class="text-dark" style="min-height:48px;">{{ video.description }}</div>
            </div>
          </div>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      videos: [],
      loading: true,
      mockVideos: [
        { youtubeId: "LqXZ628YNj4", title: "Morning Yoga Flow", author: "Yoga With Adriene" },
        { youtubeId: "PPkLpLts2hY", title: "Yoga Restorative", author: "La Scimmia Yoga" },
        { youtubeId: "fenyU0mHmQE", title: "Yoga La Routine del Mattino", author: "La Scimmia Yoga" },
        { youtubeId: "GjMSgK5H4ho", title: "25 Min Total Body Yoga & Tension Release", author: "Boho Beautiful Yoga" },
        { youtubeId: "KQfXOaLja5o", title: "Gentle Evening Yoga", author: "Boho Beautiful Yoga" },
        { youtubeId: "52GAcwujm0k", title: "25 Minute Intermediate Yoga for Strength", author: "Breathe and Flow" }
      ]
    };
  },
  methods: {
    goToVideo(youtubeId) {
      this.$router.push({ name: 'VideoPage', params: { youtubeId } });
    },
    addVideo() {
      alert('Funzionalità in arrivo!');
    },
    isNew(date) {
      if (!date) return false;
      const published = new Date(date);
      const now = new Date();
      const diff = (now - published) / (1000 * 60 * 60);
      return diff < 48; // meno di 48 ore
    },
    getThumbnail(video) {
      if (video.thumbnail) return video.thumbnail;
      if (video.youtubeId) return `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
      return '';
    },
  },
  async mounted() {
    try {
      const res = await axios.get('https://yoyo-api.vercel.app/api/videos');
      this.videos = (res.data || []).map(v => ({
        ...v,
        thumbnail: v.thumbnail || (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : ''),
      }));
      // Se manca publishedAt, non mostrare badge "Nuovo"
    } catch (e) {
      // fallback mock locale
      this.videos = this.mockVideos.map(v => ({
        ...v,
        thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
      }));
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 980px;
}
.btn-gradient {
  background: linear-gradient(90deg, #6EE7B7 0%, #3B82F6 100%);
  color: #fff;
  border: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  transition: box-shadow 0.18s, transform 0.18s;
}
.btn-gradient:hover {
  box-shadow: 0 4px 16px rgba(59,130,246,0.16);
  transform: translateY(-2px) scale(1.04);
}
.video-card {
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;
  overflow: hidden;
  border: 1px solid #e0f2f1;
}
.video-card:hover {
  box-shadow: 0 8px 32px rgba(59,130,246,0.14);
  transform: translateY(-4px) scale(1.03);
}
.skeleton-card {
  height: 240px;
  border-radius: 16px;
  background: linear-gradient(90deg, #f3f3f3 25%, #e0f2f1 50%, #f3f3f3 75%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.2s ease-in-out infinite;
}
@keyframes skeleton-loading {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}
.fade-slide-enter-active {
  transition: all 0.4s cubic-bezier(.4,0,.2,1);
}
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(24px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
