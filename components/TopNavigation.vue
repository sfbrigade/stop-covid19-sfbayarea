<template>
  <div class="TopNavigation-ButtonsContainer">
    <nuxt-link v-for="(button, i) in buttons" :key="i" :to="button.link">
      <v-btn
        class="ma-2 TopNavigation-Button"
        :class="{ active: isActive(button.link) }"
      >
        <v-icon
          v-if="button.icon === 'news'"
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
    </nuxt-link>
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
  computed: {
    buttons() {
      return [
        {
          icon: 'faq',
          title: this.$t('FAQ'),
          link: '/faq'
        },
        {
          icon: 'stats',
          title: this.$t('Stats'),
          link: '/'
        },
        {
          icon: 'news',
          title: this.$t('News'),
          link: '/news'
        }
      ]
    }
  },
  methods: {
    isActive(link) {
      return this.$route.path === link
    }
  }
}
</script>
<style lang="scss" scoped>
.TopNavigation {
  &-ButtonsContainer {
    display: flex;
    justify-content: center;
    margin: 0.25rem 1rem;
    a {
      padding: 0.5rem;
      text-decoration: none;
    }
  }
  &-Button {
    background: $white-1 !important;
    height: 3.5rem !important;
    border-radius: 7px;
    text-transform: none !important;
    font-weight: bold;
    font-size: 20px;
    opacity: 0.4;
    &:hover {
      opacity: 0.8;
    }
    &.active {
      border: 2px solid $black;
      opacity: 1;
      span > svg {
        stroke: blue;
      }
      i {
        color: blue;
      }
    }
    @include lessThan($small) {
      font-size: 16px;
    }
  }
  &-IconContainer {
    margin: 0.4rem;
    width: 20px;
    height: 20px;
  }
}
</style>
