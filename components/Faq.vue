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
    <!-- Add Scroll Area if SideNavigationOverview is shown -->
    <div
      :class="{ 'FaqContent-Scroll-Area': !isSmallScreenWidth }"
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
      scrollLength: 0,
      isSmallScreenWidth: false
    }
  },
  mounted() {
    // Get all FAQ category's top position to track SideNavigationOverview scroll behavior
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
    // Set scroll length for the current browser size
    this.scrollLength = this.getScrollLength()
    // Small screen based on SideNavigationOverview display
    this.isSmallScreenWidth = !this.sideNavigationOverviewIsShown()
  },
  methods: {
    scrollToCategory(category) {
      this.activeCategory = category
      location.hash = `#faq-content-${category}`
    },
    debounce: debounceFromNPM(function(e) {
      if (this.getScreenWidth() > 599) {
        this.handleScroll(e)
      }
    }, 300),
    handleScroll(event) {
      if (this.sideNavigationOverviewIsShown()) {
        // Get index of FAQ item that is closest to current position
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

        // Each FAQ item has an anchor that the sideNavigationOverview is linked to
        // Clicking items in SideNavigationOverview will scroll to that item's position
        // The URL will include the hash name
        // Remove hash name in URL
        if (document.location.href.includes('#')) {
          document.location.hash = ''
        }

        const currentScrollPosition = event.target.scrollTop
        // Set active for item in SideNavigationOverview that matches the current FAQ item
        this.activeCategory = findHashIndexBaseOnScrollPosition(
          currentScrollPosition,
          this.allScrollTops
        )
      }
    },
    getScreenWidth() {
      return window.innerWidth
    },
    getScrollLength() {
      const extraSpaceToExpandLastItem = this.sideNavigationOverviewIsShown()
        ? 1.65
        : 1.21
      const scrollLength =
        this.lastFaq.top + this.lastFaq.height * extraSpaceToExpandLastItem

      return `${scrollLength}px`
    },
    sideNavigationOverviewIsShown() {
      // SideNavigationOverview displays at width 601px
      return this.getScreenWidth() > 600
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
  }
  .FaqContent-Wrapper {
    margin-bottom: 20px;
  }
}
a {
  @include text-link();
}
</style>
