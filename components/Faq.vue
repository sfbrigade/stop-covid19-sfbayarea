<template>
  <div class="Parent">
    <h2 class="Parent-Heading">
      <!-- Tab TBD -->
    </h2>
    <SideNavigationOverview
      :categories="items"
      :active-category="activeCategory"
      @clicked="scrollToCategory"
    />
    <div
      :class="{ 'FaqContent-Scroll-Area': getScreenWidth() > 400 }"
      @scroll.passive="debounce"
    >
      <div class="FaqContent-Scroll-Length" :style="{ height: scrollLength }">
        <div
          v-for="(item, i) in items"
          :id="`faq-content-${i}`"
          :key="i"
          class="FaqContent-Wrapper"
        >
          <FaqCategory
            :ref="i"
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
import { debounce as debounceFromNPM } from 'debounce'
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
      items: Faq.faqItems,
      allScrollTops: [],
      activeCategory: 0,
      lastFaq: {
        top: 0,
        height: 200
      },
      scrollLength: 0
    }
  },
  mounted() {
    // GET ALL FAQ CATEGORY'S TOP POSITION FOR SCROLL
    const faqCategoriesCount = Faq.faqItems.length
    for (let i = 0; i < faqCategoriesCount; i++) {
      const elem = document.getElementById(`faq-content-${i}`)
      const top = elem.offsetTop
      this.allScrollTops.push(top)
      if (i === faqCategoriesCount - 1) {
        this.lastFaq.top = top
        this.lastFaq.height = elem.offsetHeight
      }
    }
    this.scrollLength = this.getScrollLength()
  },
  methods: {
    scrollToCategory(category) {
      // const elem = this.$refs[category]
      // const top = elem[0].offsetTop
      this.activeCategory = category
      location.hash = `#faq-content-${category}`
    },
    debounce: debounceFromNPM(function(e) {
      if (this.getScreenWidth() > 600) {
        this.handleScroll(e)
      }
    }, 300),
    handleScroll(event) {
      const findHashIndexBaseOnScrollPosition = (currPos, allScrollsPos) => {
        const allScrollTopsLength = allScrollsPos.length
        let hashIdx = 0
        while (hashIdx < allScrollTopsLength) {
          const startPos = allScrollsPos[hashIdx]
          const nextPos = allScrollsPos[hashIdx + 1]
          if (nextPos === undefined) break
          if (startPos <= currPos && currPos < nextPos) break
          hashIdx++
        }
        return hashIdx
      }

      if (document.location.href.includes('#')) {
        document.location.hash = ''
      }
      const scrollPosition = event.target.scrollTop
      this.activeCategory = findHashIndexBaseOnScrollPosition(
        scrollPosition,
        this.allScrollTops
      )
    },
    getScreenWidth() {
      return window.innerWidth
    },
    getScrollLength() {
      let scrollLength = this.lastFaq.top
      if (this.getScreenWidth() > 600) {
        scrollLength += this.lastFaq.height * 1.65
      }
      return `${scrollLength}px`
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
    /* minus header height */
    height: calc(100vh - 80px);
    padding: 0 10px;
    .FaqContent-Wrapper {
      margin-bottom: 20px;
    }
  }
}
a {
  @include text-link();
}
</style>
