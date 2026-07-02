<script setup>
  // Runtime error boundary. Route-level 404s are handled by [...slug].vue, so
  // the realistic path here is a fatal client error (a plugin throwing, a fatal
  // hydration error) — default to 500 and reflect the real status/message
  // instead of always claiming "404 Not Found".
  const props = defineProps({
    error: { type: Object, default: () => ({}) },
  });

  const statusCode = Number(props.error?.statusCode) || 500;
  const isNotFound = statusCode === 404;
  const heading = isNotFound ? "Page Not Found" : "Something went wrong";
  const description = isNotFound
    ? "Sorry, the page you're looking for doesn't exist. Check out our games instead!"
    : props.error?.statusMessage || "An unexpected error occurred — try heading back home.";

  useHead({
    title: `${statusCode} — ${heading} | Kinda fun.`,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { name: "theme-color", content: "#e5e828" },
      { name: "msapplication-TileColor", content: "#e5e828" },
    ],
  });
</script>

<template>
  <NotFound :status-code="statusCode" :heading="heading" />
</template>
