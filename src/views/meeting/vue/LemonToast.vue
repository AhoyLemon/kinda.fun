<template>
  <a href="https://ahoylemon.xyz" target="_blank">
    <div class="container">
      <div class="image-holder">
        <img src="/svg/lemon.svg" alt="lemon wedge" />
      </div>

      <div class="text-holder">
        <span>This site is by Lemon.</span>
      </div>
    </div>
  </a>
</template>
<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  });
</script>
