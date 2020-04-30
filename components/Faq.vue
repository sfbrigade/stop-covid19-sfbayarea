<template>
  <div class="Parent">
    <h2 class="Parent-Heading">
      <!-- Tab TBD -->
    </h2>
    <SideNavigationOverview :categories="items" @clicked="scrollToCategory" />
    <div class="FaqContent-Scroll-Area">
      <div class="FaqContent-Wrapper">
        <div
          v-for="(item, i) in items"
          :id="`faq-content-${i}`"
          :key="i"
          :ref="i"
        >
          <FaqCategory
            :title="item.title"
            :last-updated-at="item.lastUpdatedAt"
            :qa="item.qa"
          />
        </div>
      </div>
    </div>
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
  methods: {
    scrollToCategory(category) {
      const elem = this.$refs[category]
      const top = elem[0].offsetTop
      // this.$scrollTo(elem[0])
      // const element = document.getElementById('faq-content-1')
      // window.scrollTo({ top, behavior: 'smooth' })
      // VueScrollTo(elem[0])
      // const hash = `#faq-content-${category}`
      // document.location.href = `#faq-content-${category}`
      // window.scrollTo({ top, left: 0, behavior: 'smooth' })
      location.hash = `#faq-content-${category}`

      // eslint-disable-next-line no-console
      console.log(category, elem[0], top)
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
  .FaqContent-Scroll-Area {
    overflow-x: scroll;
    height: calc(100vh - 80px);
    .FaqContent-Wrapper {
      height: 200%;
    }
  }
}
a {
  @include text-link();
}
</style>
