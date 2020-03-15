<template>
  <div class="Worker">
    <h2 class="Worker-Heading">
      For employees and employers
    </h2>
    <div v-for="(item, i) in items" :key="i">
      <TextCard :title="item.title" :link="item.link" :body="item.body" />
    </div>
  </div>
</template>
<script lang="ts">
import TextCard from '@/components/TextCard.vue'
export default {
  components: {
    TextCard
  },
  data() {
    return {
      items: [
        {
          title: 'Announcement 1',
          link: '',
          body: ''
        },
        {
          title: 'Announcement 2',
          link: '',
          body: ''
        }
      ]
    }
  },
  head() {
    return {
      title: 'For employees and employers'
    }
  }
}
</script>
<style lang="scss">
.Worker {
  &-Heading {
    @include font-size(30);
    font-weight: normal;
    color: $gray-2;
    margin-bottom: 12px;
  }
}
a {
  @include text-link();
}
</style>
