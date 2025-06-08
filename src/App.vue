<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-light bg-white shadow-sm nav-gradient px-2 py-1 d-flex align-items-center">
      <img src="@/assets/yoyo-logo.svg" alt="YoYo Logo" style="height:32px;width:32px;margin-right:8px;" />
      <span class="navbar-brand mb-0 h1 fw-bold" style="font-size:1.4rem;letter-spacing:1px;">YoYo <span class="text-primary">Friends</span></span>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f7fa 100%);
  min-height: 100vh;
}
.nav-gradient {
  background: linear-gradient(90deg, #6EE7B7 0%, #3B82F6 100%)!important;
  box-shadow: 0 2px 12px rgba(59,130,246,0.06);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
