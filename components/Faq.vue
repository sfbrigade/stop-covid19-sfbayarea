<template>
  <div class="Parent">
    <h2 class="Parent-Heading">
      <!-- Tab TBD -->
    </h2>
    <SideNavigationOverview :categories="items">
      <!-- Add pinned content here -->
      <!-- <template v-slot:pinned>
        <div class="pinned">
          <h1>Pinned</h1>
        </div>
      </template> -->
      <template v-slot="{ item, i }">
        <FaqCategory
          :ref="i"
          :title="item.title"
          :last-updated-at="item.lastUpdatedAt"
          :qa="item.qa"
        />
      </template>
    </SideNavigationOverview>
  </div>
</template>
<script>
import FaqCategory from '@/components/FaqCategory.vue'
import SideNavigationOverview from '@/components/SideNavigationOverview.vue'
import Faq from '@/data/faq.json'

export default {
  components: {
    FaqCategory,
    SideNavigationOverview
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
  },
  transition: {
    name: 'test',
    mode: 'out-in'
  }
}
</script>
<style lang="scss">
.Parent {
  display: flex;
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
