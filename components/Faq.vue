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
      :class="{ 'SideNav-MainContent-Scroll-Area': !isSmallScreenWidth }"
      @scroll.passive="debounce"
    >
      <div
        class="SideNav-MainContent-Scroll-Length"
        :style="{ height: scrollLength }"
      >
        <div
          v-for="(item, i) in items"
          :id="`sidenav-main-content-${i}`"
          :key="i"
          class="SideNav-MainContent-Wrapper"
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
      lastMainContent: {
        top: 0,
        height: 200
      },
      scrollLength: 0,
      isSmallScreenWidth: false
    }
  },
  mounted() {
    // Get all FAQ category's top position to track SideNavigationOverview scroll behavior
    const mainCategoriesCount = Faq.faqItems.length
    for (let i = 0; i < mainCategoriesCount; i++) {
      const elem = document.getElementById(`sidenav-main-content-${i}`)
      const top = elem.offsetTop
      this.allScrollTops.push(top)
      if (i === mainCategoriesCount - 1) {
        this.lastMainContent.top = top
        this.lastMainContent.height = elem.offsetHeight
      }
    }
    // Set scroll length for the current browser size
    this.scrollLength = this.getScrollLength()
    // Small screen based on SideNavigationOverview display
    this.isSmallScreenWidth = !this.sideNavigationOverviewIsShown()
  },
  methods: {
    // Clicked function that scrolls to the anchor hash
    scrollToCategory(category) {
      this.activeCategory = category
      location.hash = `#sidenav-main-content-${category}`
    },
    // Debounce and handleScroll method handles when the content is scrolled
    // and 300ms after the scrolling stopped,
    // the side navigation will auto highlight the active category
    debounce: debounceFromNPM(function(e) {
      this.handleScroll(e)
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

        // Add title bar 340 + 30 margin + 60 nav bar
        const currentScrollPosition = event.target.scrollTop + 340 + 30 + 60
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
      // Add extra spacing to the last item so that the last content can fully scroll to top
      const extraSpaceToExpandLastItem = this.sideNavigationOverviewIsShown()
        ? 1.65
        : 1.21
      const scrollLength =
        this.lastMainContent.top +
        this.lastMainContent.height * extraSpaceToExpandLastItem

      return `${scrollLength}px`
    },
    sideNavigationOverviewIsShown() {
      // SideNavigationOverview displays at width 601px and up
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
  .SideNav-MainContent-Scroll-Area {
    overflow-x: scroll;
    /* minus header height and title bar + margin */
    height: calc(100vh - 340px - 30px - 60px);
    padding: 0 10px;
  }
  .SideNav-MainContent-Wrapper {
    margin-bottom: 20px;
  }
}
a {
  @include text-link();
}
</style>
