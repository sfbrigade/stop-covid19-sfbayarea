<template>
  <div class="Parent">
    <h2 class="Parent-Heading">
      <!-- Tab TBD -->
    </h2>
    <div v-for="(item, i) in items" :key="i">
      <FaqCategory
        :title="item.title"
        :last-updated-at="item.lastUpdatedAt"
        :qa="item.qa"
      />
    </div>
  </div>
</template>
<script>
import FaqCategory from '@/components/FaqCategory.vue'
import Faq from '@/data/faq.json'

export default {
  components: {
    FaqCategory
  },
  data() {
    return {
      items: Faq.faqItems
    }
  },
  head() {
    return {
      title: 'General FAQ'
    }
  }
}
</script>
<style lang="scss">
.Parent {
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
