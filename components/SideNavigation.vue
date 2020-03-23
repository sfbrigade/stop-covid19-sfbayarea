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
        <h1 class="SideNavigation-Heading">
          {{ $t('COVID-19') }}<br />{{ $t('Tracker for SF') }}
        </h1>
      </nuxt-link>
    </div>
    <v-divider class="SideNavigation-HeadingDivider" />
    <div class="sp-none" :class="{ open: isNaviOpen }">
      <v-icon
        class="SideNavigation-ListContainerIcon pc-none"
        :aria-label="$t('Navi Close')"
        @click="closeNavi"
      >
        mdi-close
      </v-icon>
      <v-list :flat="true">
        <v-container
          v-for="(item, i) in items"
          :key="i"
          class="SideNavigation-ListItemContainer"
          @click="closeNavi"
        >
          <ListItem :link="item.link" :icon="item.icon" :title="item.title" />
          <v-divider v-show="item.divider" class="SideNavigation-Divider" />
        </v-container>
      </v-list>
      <div class="SideNavigation-Footer">
        <div class="SideNavigation-SocialLinkContainer">
          <a
            href="https://www.meetup.com/Code-for-San-Francisco-Civic-Hack-Night/"
            target="_blank"
            rel="noopener"
          >
            <img src="/meetup.png" alt="Meetup" />
          </a>
          <a
            href="https://sfbrigade-slackin.herokuapp.com/"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <img src="/slack.png" alt="Slack" />
          </a>
          <a
            href="https://github.com/sfbrigade/stop-covid19-sfbayarea"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <img src="/github.png" alt="GitHub" />
          </a>
          <a
            href="https://twitter.com/sfbrigade"
            target="_blank"
            rel="noopener"
          >
            <img src="/twitter.png" alt="Twitter" />
          </a>
          <a
            href="https://www.facebook.com/codeforsanfrancisco"
            target="_blank"
            rel="noopener"
          >
            <img src="/facebook.png" alt="Facebook" />
          </a>
        </div>
        <small class="SideNavigation-Copyright" lang="en">
          Copyright &copy; 2020 Team Stop Coronavirus by Code For San Francisco.
          All Rights Reserved.
        </small>
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
    items() {
      return [
        {
          icon: 'mdi-chart-timeline-variant',
          title: this.$t('The latest updates'),
          link: '/'
        },
        {
          icon: 'covid',
          title: this.$t('If you have any symptoms'),
          link:
            'https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fsteps-when-sick.html',
          divider: true
        },
        {
          icon: 'mdi-account-multiple',
          title: this.$t('City services during COVID-19'),
          link: 'https://sf.gov/topics/coronavirus-covid-19'
        },
        {
          icon: 'parent',
          title: this.$t('Find out about emergency child care centers'),
          link:
            'https://sf.gov/information/san-francisco-converts-rec-facilities-emergency-child-care-centers'
        },
        {
          icon: 'mdi-domain',
          title: this.$t('Get City help if your job is affected by COVID-19'),
          link:
            'https://oewd.org/assistance-guidance-businesses-and-workers-impacted-covid-19#Employees%20Banner',
          divider: true
        },
        {
          title: this.$t('City services: Whats open'),
          link: 'https://sf.gov/information/city-services-whats-open'
        },
        {
          title: this.$t('Free Meals Available During School Closure'),
          link:
            'https://www.sfusd.edu/services/health-wellness/nutrition-school-meals'
        },
        {
          title: this.$t(
            'San Francisco Department of Public Health COVID-19 site'
          ),
          link: 'https://www.sfdph.org/dph/alerts/coronavirus.asp'
        },
        {
          title: this.$t('FAQ: What residents need to know'),
          link:
            'https://www.sfchronicle.com/bayarea/article/coronavirus-bayarea-what-you-need-know-15000563.php'
        },
        {
          title: this.$t('Donation: Give to the City to respond to COVID-19'),
          link: 'https://sf.gov/give-city-respond-covid-19'
        },
        {
          title: this.$t('About us'),
          link: '/about'
        }
      ]
    },
    isClass() {
      return item => (item.title.charAt(0) === '【' ? 'kerningLeft' : '')
    }
  },
  methods: {
    openNavi() {
      this.$emit('openNavi')
    },
    closeNavi() {
      this.$emit('closeNavi')
    }
  }
}
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  height: 100%;
  background: $white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  &-HeadingContainer {
    padding: 1.25em 0 1.25em 1.25em;
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
    background-color: $white;
  }
  &-SocialLinkContainer {
    display: flex;
    & img {
      width: 30px;
      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
  &-Copyright {
    display: block;
    margin-top: 10px;
    font-size: 8px;
    line-height: 1.2;
    color: $gray-1;
    font-weight: bold;
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
    background-color: $white;
  }
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
