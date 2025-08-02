<script setup>
  import { onMounted } from "vue";
  
  // Simple analytics tracking for 404 pages
  import { sendEvent } from "@/shared/js/_functions.js";
  
  onMounted(() => {
    // Track 404 page views for analytics
    sendEvent("404_page_viewed", {
      path: window.location.pathname,
      referrer: document.referrer
    });
  });
</script>

<template>
  <div id="not-found-page">
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="not-found-title">404</h1>
        <h2 class="not-found-subtitle">Page Not Found</h2>
        <p class="not-found-message">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div class="not-found-actions">
          <a href="/" class="btn btn-primary">Go Home</a>
          <div class="game-links">
            <h3>Or try one of these games:</h3>
            <div class="game-grid">
              <a href="/invalid" class="game-link">Invalid</a>
              <a href="/meeting" class="game-link">Meeting</a>
              <a href="/pretend" class="game-link">Pretend</a>
              <a href="/guillotine" class="game-link">Guillotine</a>
              <a href="/wrongest" class="game-link">Wrongest</a>
              <a href="/sisyphus" class="game-link">Sisyphus</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Open Sans', sans-serif;
  color: white;
  text-align: center;
  padding: 20px;
}

.not-found-container {
  max-width: 600px;
  width: 100%;
}

.not-found-title {
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  font-family: 'Big Shoulders', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.not-found-subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin: 10px 0 20px 0;
  font-family: 'Big Shoulders', cursive;
}

.not-found-message {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
}

.not-found-actions {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.btn {
  display: inline-block;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: 'Big Shoulders', cursive;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: #fff;
  color: #667eea;
  border: 2px solid #fff;
  
  &:hover {
    background: transparent;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
}

.game-links h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-family: 'Big Shoulders', cursive;
  opacity: 0.9;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  max-width: 400px;
}

.game-link {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-family: 'Big Shoulders', cursive;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 768px) {
  .not-found-title {
    font-size: 6rem;
  }
  
  .not-found-subtitle {
    font-size: 1.5rem;
  }
  
  .not-found-message {
    font-size: 1rem;
  }
  
  .game-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .not-found-title {
    font-size: 4rem;
  }
  
  .btn {
    padding: 12px 24px;
    font-size: 1rem;
  }
  
  .game-grid {
    grid-template-columns: 1fr;
  }
}
</style>