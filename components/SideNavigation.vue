<template>
  <div class="SideNavigation">
    <div class="SideNavigation-HeadingContainer sp-flex">
      <v-icon
        class="SideNavigation-HeadingIcon pc-none"
        :aria-label="$t('Navi Open')"
        @click="openNavi"
      >
        mdi-menu
      </v-icon>
      <nuxt-link to="/" class="SideNavigation-HeadingLink">
        <div class="SideNavigation-Logo">
          <img src="/sfbayarea.jpeg" :alt="$t('bayarea')" />
        </div>
      </nuxt-link>
    </div>
    <v-divider class="SideNavigation-HeadingDivider" />
    <div
      class="SideNavigation-ContentContainer sp-none"
      :class="{ open: isNaviOpen }"
    >
      <v-icon
        class="SideNavigation-ListContainerIcon pc-none"
        :aria-label="$t('Navi Close')"
        @click="closeNavi"
      >
        mdi-close
      </v-icon>
      <div class="SideNavigation-TopInfoContainer">
        <div class="SideNavigation-TitleContainer">
          <h3>{{ $t('COVID-19 Tracker') }}</h3>
          <span>{{ $t('by Code for San Francisco') }}</span>
        </div>
        <v-list class="SideNavigation-ListContainer" :flat="true">
          <v-container
            v-for="(item, i) in sideNavItems"
            :key="i"
            class="SideNavigation-ListItemContainer"
            :class="{ active: isActive(item.link) }"
            @click="closeNavi"
          >
            <ListItem :link="item.link" :icon="item.icon" :title="item.title" />
            <v-divider v-show="item.divider" class="SideNavigation-Divider" />
          </v-container>
        </v-list>
      </div>
      <div class="SideNavigation-Footer">
        <v-divider />
        <nuxt-link to="/about">
          <div class="SideNavigation-AboutUs">
            <span>About Code 4 San Francisco</span>
          </div>
        </nuxt-link>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <div
                v-for="(contact, i) in contacts"
                :key="i"
                class="SideNavigation-SocialLinkContainer"
              >
                <a :href="contact.link" target="_blank" rel="noopener">
                  <i :class="contact.class" />
                </a>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem'

export default {
  components: {
    ListItem
  },
  props: {
    isNaviOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    sideNavItems() {
      return [
        {
          icon: 'info_outline',
          title: this.$t('General FAQ'),
          link: '/faq'
        },
        {
          icon: 'poll_outline',
          title: this.$t('Statistic'),
          link: '/'
        },
        {
          icon: 'far fa-newspaper',
          title: this.$t('Latest News'),
          link: '/news'
        }
      ]
    },
    isClass() {
      return item => (item.title.charAt(0) === '【' ? 'kerningLeft' : '')
    },
    contacts() {
      return [
        {
          class: 'fab fa-meetup',
          link:
            'https://www.meetup.com/Code-for-San-Francisco-Civic-Hack-Night/'
        },
        {
          class: 'fab fa-slack',
          link: 'https://sfbrigade-slackin.herokuapp.com/'
        },
        {
          class: 'fab fa-github',
          link: 'https://github.com/sfbrigade/stop-covid19-sfbayarea'
        },
        {
          class: 'fab fa-twitter',
          link: 'https://twitter.com/sfbrigade'
        },
        {
          class: 'fab fa-facebook',
          link: 'https://www.facebook.com/codeforsanfrancisco'
        }
      ]
    }
  },
  methods: {
    openNavi() {
      this.$emit('openNavi')
    },
    closeNavi() {
      this.$emit('closeNavi')
    },
    isActive(link) {
      return this.$route.path === link
    }
  }
}
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  height: 100%;
  background: $gray-5;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  &-HeadingContainer {
    padding: 1.25em;
    align-items: center;
    @include lessThan($small) {
      padding: 7px 0 7px 20px;
    }
  }
  &-HeadingIcon {
    margin-right: 16px;
  }
  &-HeadingLink {
    @include lessThan($small) {
      display: flex;
      align-items: center;
    }
    text-decoration: none;
  }
  &-TitleContainer {
    color: #000000;
    margin: 10px 20px 5px 20px;
    h3 {
      font-family: 'SF Pro Display', 'Hiragino Sans', sans-serif;
      font-weight: bold;
      font-size: 0.8rem;
    }
    span {
      font-family: 'SF Pro Text', 'Hiragino Sans', sans-serif;
      font-size: 0.7rem;
    }
  }
  &-ContentContainer {
    /* minus top image */
    height: calc(100% - 160px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-ListContainer {
    background: inherit;
  }
  &-ListContainerIcon {
    margin: 24px 16px 0;
  }
  &-ListItemContainer {
    padding: 2px 20px;
  }
  &-Logo {
    margin: 20px 16px 0 0;
    width: 110px;
    @include lessThan($small) {
      margin-top: 0;
    }
  }
  &-Heading {
    margin-top: 8px;
    font-size: 13px;
    color: #898989;
    padding: 0.5em 0;
    text-decoration: none;
    @include lessThan($small) {
      margin-top: 0;
    }
  }
  &-HeadingDivider {
    margin: 0px 20px 4px;
    @include lessThan($small) {
      display: none;
    }
  }
  &-Divider {
    margin: 12px 0;
  }
  &-Footer {
    padding: 20px;
    .container {
      padding: 0;
      .col {
        padding: 0;
      }
    }
    a {
      text-decoration: none;
    }
  }
  &-AboutUs {
    color: $black;
    font-size: 0.7rem;
    margin-top: 0.8rem;
    &:hover {
      font-weight: bold;
    }
  }
  &-SocialLinkContainer {
    display: inline-block;
    margin: 4px 8px;
    a > i {
      font-size: 1rem;
      color: $black;
    }
    &:hover {
      transform: scale(1.5);
      transition: transform 1s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
  }
}
.open {
  @include lessThan($small) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: block !important;
    width: 100%;
    z-index: z-index-of(opened-side-navigation);
    background-color: $gray-5;
  }
}
.active {
  background: $gray-4;
}
@include largerThan($small) {
  .pc-none {
    display: none;
  }
}
@include lessThan($small) {
  .sp-flex {
    display: flex;
  }
  .sp-none {
    display: none;
  }
}
</style>
