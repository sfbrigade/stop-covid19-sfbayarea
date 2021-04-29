<template>
  <div class="SideNavigationOverview-Container">
    <div class="SideNavigationOverview">
      <v-list class="SideNavigationOverview-List" flat>
        <v-list-item
          v-for="(item, i) in categories"
          :key="i"
          v-ripple="false"
          :href="`#${item.title}`"
          :class="{ active: activeCategory === i }"
          class="SideNavigationOverview-Container"
        >
          <v-list-item-content class="SideNavigationOverview-TextContainer">
            <v-list-item-title
              class="SideNavigationOverview-Text"
              @click="scrollToCategory(i)"
              v-text="item.title"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <!-- Add Scroll Area if SideNavigationOverview is shown -->
    <div
      ref="contentArea"
      :class="{ 'SideNav-MainContent-Scroll-Area': !isSmallScreenWidth }"
      @scroll.passive="debounce"
    >
      <div
        class="SideNav-MainContent-Scroll-Length"
        :style="{ height: scrollLength }"
      >
        <div
          v-if="isPinnedSlotShown()"
          :id="`sidenav-main-content-pinned`"
          class="SideNav-MainContent-Wrapper"
        >
          <slot name="pinned" />
        </div>
        <div
          v-for="(item, i) in categories"
          ref="mainContents"
          :key="i"
          class="SideNav-MainContent-Wrapper"
        >
          <slot :item="item" :i="i" />
        </div>
      </div>
    </div>
    <div
      v-if="isPinnedSlotShown() && !isSmallScreenWidth"
      class="scroll-to-top-icon"
    >
      <v-icon @click="scrollToTop()">
        mdi-arrow-up
      </v-icon>
    </div>
  </div>
</template>

<script>
import { debounce as debounceFromNPM } from 'debounce'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
  watch: {
    categories() {
      this.$nextTick(() => this.scrollToCategory(0))
    }
  },
  mounted() {
    this.updateScrollLengths()
    // Small screen based on SideNavigationOverview display
    this.isSmallScreenWidth = !this.sideNavigationOverviewIsShown()
    this.isPinnedSlotShown()
    if (this.isPinnedSlotShown()) this.activeCategory = null
  },
  methods: {
    updateScrollLengths() {
      // Get all FAQ category's top position to track SideNavigationOverview scroll behavior
      const mainCategoriesCount = this.categories.length
      const { allScrollTops, lastMainContent } = this.getAllScrollTop(
        mainCategoriesCount
      )
      this.allScrollTops = allScrollTops
      // last content top and height
      this.lastMainContent = lastMainContent

      // Set scroll length for the current browser size
      this.scrollLength = this.getScrollLength()
    },
    // Clicked function that scrolls to the anchor hash
    scrollToCategory(category) {
      this.activeCategory = category
      this.updateScrollLengths()
      this.$refs.contentArea.scroll(0, this.allScrollTops[category])
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

        this.updateScrollLengths()
        const currentScrollTop = event.target.scrollTop

        // Set active for item in SideNavigationOverview that matches the current FAQ item
        if (this.isPinnedSlotShown() && currentScrollTop === 0) {
          this.activeCategory = null
        } else {
          const currentScrollPosition = currentScrollTop
          this.activeCategory = findHashIndexBaseOnScrollPosition(
            currentScrollPosition,
            this.allScrollTops
          )
        }
      }
    },
    isPinnedSlotShown() {
      return !!this.$slots.pinned
    },
    getAllScrollTop(mainCategoriesCount) {
      const allScrollTops = []
      const lastMainContent = {}
      const MARGIN = 20
      let top = -MARGIN
      for (let i = 0; i < mainCategoriesCount; i++) {
        const offsetHeight = this.$refs.mainContents[i]?.offsetHeight || 0
        allScrollTops.push(top)
        if (i === mainCategoriesCount - 1) {
          lastMainContent.top = top
          lastMainContent.height = offsetHeight
        }
        top += offsetHeight + MARGIN
      }
      return { allScrollTops, lastMainContent }
    },
    getScreenWidth() {
      return window.innerWidth
    },
    getScrollLength() {
      // Add extra spacing to the last item so that the last content can fully scroll to top
      const scrollWindowHeight = this.$refs.contentArea.offsetHeight
      const extraSpaceToExpandLastItem = Math.max(
        this.lastMainContent.height,
        scrollWindowHeight
      )
      const scrollLength = this.lastMainContent.top + extraSpaceToExpandLastItem

      return `${scrollLength}px`
    },
    scrollToTop() {
      const elem = document.getElementsByClassName(
        'SideNav-MainContent-Scroll-Area'
      )[0]
      if (elem) {
        elem.scrollTop = 0
      } else {
        window.scrollTo(0, 0)
      }
    },
    sideNavigationOverviewIsShown() {
      // SideNavigationOverview displays at width 601px and up
      return this.getScreenWidth() > 600
    }
  }
}
</script>
<style lang="scss">
.SideNavigationOverview-Container {
  display: flex;

  .SideNavigationOverview {
    max-width: 216px;
    @include lessThan($small) {
      display: none;
    }
    &-List {
      background: $white-2 !important;
      margin: 0 1.25rem 0 1rem;
      border-radius: 10px;
      padding: 8px 18px;
      a {
        margin: 5px 0;
      }
      .SideNavigationOverview-TextContainer {
        max-width: 180px;
        min-width: 125px;
        padding: 5px;
        .v-list-item__title {
          @include font-size(14);
          text-overflow: unset;
          white-space: break-spaces;
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }

      a:hover {
        text-decoration: none !important;
        .v-list-item__title {
          color: $purple-2 !important;
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        &.v-list-item--active {
          cursor: default;
          .v-list-item__title {
            color: $black !important;
          }
        }
      }
      .v-list-item--active,
      .active {
        color: $black !important;
        font-weight: bold;
        border-left: 5px solid $purple-1;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        padding-left: 10px;
      }
    }
  }

  .SideNav-MainContent-Scroll-Area {
    overflow-x: scroll;
    height: calc(100vh - 80px);
    padding: 0 10px;
    width: 100%;
  }
  .SideNav-MainContent-Wrapper {
    margin-bottom: 20px;
  }
  .scroll-to-top-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: $purple-2;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    z-index: 999;
    .mdi-arrow-up::before {
      color: $white-1;
    }
  }
}
</style>
