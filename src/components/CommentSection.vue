<template>
  <div class="comment-section">
    <h5 class="mb-3">Commenti</h5>
    <div v-if="comments.length === 0" class="text-muted mb-3">
      Nessun commento ancora. Scrivi il primo!
    </div>
    <div v-else class="mb-3">
      <div v-for="(comment, idx) in comments" :key="idx" class="comment mb-2 p-2 rounded bg-light">
        <strong>{{ comment.author }}</strong>
        <span class="text-muted small ms-2">{{ comment.time }}</span>
        <div>{{ comment.text }}</div>
      </div>
    </div>
    <form @submit.prevent="submitComment" class="d-flex flex-column gap-2">
      <input v-model="author" class="form-control" placeholder="Il tuo nome" maxlength="32" required />
      <textarea v-model="newComment" class="form-control" rows="2" placeholder="Scrivi un commento..." maxlength="200" required></textarea>
      <button type="submit" class="btn btn-primary align-self-end" :disabled="!author || !newComment">Invia</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CommentSection',
  props: ['videoId'],
  data() {
    return {
      comments: [],
      newComment: '',
      author: '',
    };
  },
  mounted() {
    // Load comments from localStorage (simulate backend)
    const saved = localStorage.getItem(`comments_${this.videoId}`);
    this.comments = saved ? JSON.parse(saved) : [];
  },
  methods: {
    submitComment() {
      const comment = {
        author: this.author.trim() || 'Anonimo',
        text: this.newComment.trim(),
        time: new Date().toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' }),
      };
      this.comments.unshift(comment);
      localStorage.setItem(`comments_${this.videoId}` , JSON.stringify(this.comments));
      this.newComment = '';
    },
  },
};
</script>

<style scoped>
.comment-section {
  background: #fff;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.comment {
  border-left: 4px solid #86b7fe;
}
</style>
