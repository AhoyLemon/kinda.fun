<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import { reactive } from "vue";
  import { doc, increment, serverTimestamp, Timestamp, setDoc, updateDoc, collection } from "firebase/firestore";
  import { useFirestore, useCollection, useDocument } from "vuefire";
</script>

<template>
  <RouterView />
</template>
<style lang="scss">
  @import "@/shared/scss/globals/_reset";
</style>
