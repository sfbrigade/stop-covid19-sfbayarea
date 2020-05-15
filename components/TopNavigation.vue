<template>
  <div class="TopNavigation-Container">
    <a href="/">
      <div class="TopNavigation-LogoContainer">
        <img class="headericon" src="/header-icon.png" />
        <div class="logo-title-container">
          <span class="logotitle">Bay Area Pandemic Dashboard</span>
          <span class="logosubtitle">by Bay Area Brigades</span>
        </div>
      </div>
    </a>
    <div class="TopNavigation-ButtonsContainer">
      <v-btn
        v-for="(button, i) in buttons"
        :key="i"
        :class="{ active: i === activeTab }"
        class="ma-2 TopNavigation-Button"
        @click="viewPage(i)"
      >
        <v-icon
          v-if="button.icon === 'updates'"
          class="TopNavigation-IconContainer"
          size="20"
        >
          far fa-newspaper
        </v-icon>
        <InfoOutlineIcon
          v-else-if="button.icon === 'faq'"
          class="TopNavigation-IconContainer"
        />
        <PollOutlineIcon
          v-else-if="button.icon === 'stats'"
          class="TopNavigation-IconContainer"
        />
        {{ button.title }}
      </v-btn>
    </div>
  </div>
</template>
<script>
import InfoOutlineIcon from '@/static/information-outline.svg'
import PollOutlineIcon from '@/static/poll-box-outline.svg'

export default {
  components: {
    InfoOutlineIcon,
    PollOutlineIcon
  },
  props: {
    activeTab: {
      type: Number,
      default: 0
    }
  },
  computed: {
    buttons() {
      return [
        {
          icon: 'faq',
          title: 'FAQ',
          tab: 'FAQ'
        },
        {
          icon: 'stats',
          title: 'Stats',
          tab: 'Stats'
        },
        {
          icon: 'updates',
          title: 'Updates',
          tab: 'Updates'
        }
      ]
    }
  },
  methods: {
    viewPage(link) {
      this.$emit('tabClicked', link)
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}

.TopNavigation {
  &-Container {
    display: flex;
    background: $purple-1;
    color: $white-1 !important;
    height: 60px;
    margin: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    @include lessThan($small) {
      height: 50px;
    }
  }
  &-LogoContainer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    min-width: 72px;
    @include lessThan($small) {
      min-width: 56px;
    }

    .headericon {
      width: 40px;
      height: 40px;
      margin-left: 16px;
      margin-right: 25px;
      @include lessThan($small) {
        width: 28px;
        height: 28px;
        margin-left: 14px;
        margin-right: 14px;
      }
    }
    .logo-title-container {
      display: flex;
      flex-direction: column;
      margin-right: 30px;

      .logotitle {
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.03em;
        color: $white-1;
        margin-bottom: 2px;
      }
      .logosubtitle {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: $white-1;
      }
    }
    @include lessThan(824) {
      .logo-title-container {
        display: none;
      }
    }
  }
  &-ButtonsContainer {
    display: flex;
    justify-content: center;
    a {
      padding: 0.5rem;
      text-decoration: none;
    }
  }
  &-Button {
    background: inherit !important;
    padding: 18px 25px !important;
    color: $white-1 !important;
    margin: 0 !important;
    height: 100% !important;
    border-radius: 0;
    box-shadow: none;
    text-transform: none !important;
    font-weight: bold;
    @include font-size(20);
    span {
      svg {
        fill: $white-1;
        margin: 0 10px 0 0;
      }
      i {
        margin: 0 10px 0 0;
        color: $white-1;
      }
    }
    /* &:hover {
      opacity: 0.8;
    } */
    &.active {
      background: $purple-2 !important;
      i {
        color: $white-1;
      }
    }
    @include lessThan($small) {
      @include font-size(16);
      padding: 15.5px 10px !important;
    }
  }
  &-IconContainer {
    margin: 0.4rem;
    width: 20px;
    height: 20px;
  }
}
</style>
