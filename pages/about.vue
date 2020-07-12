<template>
  <div class="About">
    <nuxt-link to="/main">
      <div class="About-Header">
        <TopNavigation />
      </div>
    </nuxt-link>

    <TextCard title="About the Project">
      This site was derived from an existing open source project
      <a
        href="https://stopcovid19.metro.tokyo.lg.jp/en/"
        target="_blank"
        rel="noopener"
      >
        website
      </a>
      by the Tokyo Metropolitan Government with Code For Japan in order to
      provide the latest information on COVID-19.<br />
      <br />
      The goal is to provide easy to understand, publicly available, and
      unbiased information on the spread of infection in the Bay Area. This
      allows the residents, companies, as well as visitors to the Bay Area to
      understand the current situation while having the right information about
      the necessary precautions and measures.
    </TextCard>
    <TextCard title="How you can help contribute">
      As an open source project, we want help! Learn how you can help out by
      clicking on one of the following links:<br />
      <div dense class="About-Navigation">
        <v-card
          v-for="(item, i) in cardItems"
          :key="i"
          width="276px"
          height="74px"
          outlined
          @click="getCreateUrl(item.to)"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="About-Navigation-Cardtitle">
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="About-Navigation-Carddescription">
                {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <img
              class="About-Navigation--Navigationicon"
              src="/right-arrow.png"
            />
          </v-list-item>
        </v-card>
      </div>
    </TextCard>
    <TextCard title="Disclaimers">
      Although every effort has been made to ensure the accuracy of the
      information posted on this site, the team Stop Cornavirus is not
      responsible for any actions taken by users using the information on this
      site.<br />
      <br />
      Website will not be responsible in case any user uses the website data in
      a way that causes, or is likely to cause any damage.<br />
      <br />
      Any information on this site may be changed or deleted without prior
      notice.
    </TextCard>
    <TextCard title="To COVID-19 County Public Health Departments">
      On this site we are working on a public website to aggregate COVID-19 data
      for the Bay Area counties. <br />
      <br />
      We were heartened to see that CDPH has made case data available by county.
      We have two additional data requests that would help our communities. We
      appreciate if you could make the following publicly accessible by API: 1),
      testing data over time by county, 2) demographic data by county, and 3)
      the county data table on
      <a
        href="https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/COVID-19/COVID19CountyDataTable.aspx"
        target="_blank"
        rel="noopener"
      >
        this page
      </a>
      .<br />
      <br />
      In the Bay Area, many people live their daily lives across county lines.
      Our communities have a strong regional identity, and it is important that
      we can track the pandemic at a regional level. <br />
      <br />
      Thank you for helping us in this mission!
    </TextCard>

    <Footer />
  </div>
</template>

<script>
import TextCard from '@/components/TextCard.vue'
import TopNavigation from '@/components/TopNavigation'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    TextCard,
    TopNavigation,
    Footer
  },
  computed: {
    cardItems() {
      return [
        {
          title: 'Project Information',
          subtitle: 'Learn what this project is about',
          to: 'ProjectInformation'
        },
        {
          title: 'Provide Feedback',
          subtitle: 'Help to improve the website',
          to: 'ProvideFeedback'
        },
        {
          title: 'Join the Team',
          subtitle: 'Join the Slack channel',
          to: 'JoinTeam'
        }
      ]
    }
  },
  methods: {
    getCreateUrl(to) {
      if (to === 'ProjectInformation') {
        open(
          'https://docs.google.com/document/d/1b4ct3YOURBCzlZQTqyGOXM8w4m_tQJ94rAd1eV8KG4E/edit?usp=sharing',
          '_blank'
        )
      } else if (to === 'ProvideFeedback') {
        open(
          'https://docs.google.com/forms/d/e/1FAIpQLSfBIwWZxm-QYl1Cm9CxQWwYcdNDkqQHWN5vTOpNXfSnuOnAEA/viewform',
          '_blank'
        )
      } else if (to === 'JoinTeam') {
        open('https://sfbrigade-slackin.herokuapp.com/')
      }
    }
  },
  head() {
    return {
      title: 'About the website'
    }
  }
}
</script>

<style lang="scss">
.About {
  max-width: 1440px;
  margin: 0 auto;
  &-Header {
    margin-bottom: 30px;
  }
  &-Navigation {
    display: flex;
    justify-content: space-between;
    margin: 30px 40px;
    max-width: 900px;
    .v-card--link {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
    .v-list-item {
      height: 100%;
      .v-list-item__content {
        height: 100%;
        padding: 10px 0;
        flex-direction: column;
        align-items: unset;
        align-self: unset;
        flex-wrap: unset;
        flex: none;
        min-width: 220px;
        margin-right: 10px;
      }
    }
    &-Cardtitle {
      height: 19px;
      width: 100%;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: $purple-1;
      display: flex;
      align-items: center;
    }
    &-Carddescription {
      height: 17px;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 140%;
      color: $gray-1;
      display: flex;
      align-items: center;
    }
    &-Navigationicon {
      width: 14px;
      height: 24px;
    }
  }
  @media screen and (max-width: 600px) {
    &-Navigation {
      flex-direction: column;
      margin-top: 40px !important;
      margin-bottom: 20px !important;
      .v-card--link {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
