<template>
  <div class="Parent">
    <h2 class="Parent-Heading">
      <!-- Tab TBD -->
    </h2>
    <div v-for="(item, i) in items" :key="i">
      <FaqCategory
        :title="item.title"
        :last-updated-at="item.lastUpdatedAt"
        :qa="item.qa"
      />
    </div>
  </div>
</template>
<script lang="ts">
import FaqCategory from '@/components/FaqCategory.vue'
export default {
  components: {
    FaqCategory
  },
  data() {
    return {
      items: [
        {
          title: 'General Info About the Virus',
          lastUpdatedAt: '2020-04-04',
          qa: [
            {
              q: 'Who is most at risk?',
              a:
                'Folks with pre-existing conditions, immunocompromised people, older people.',
              url:
                'https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/summary.html#covid19-pandemic'
            },
            {
              q: 'What is a pandemic?',
              a:
                'An outbreak of a disease that occurs over a wide geographic area and affects an exceptionally high proportion of the population.',
              url: 'https://www.merriam-webster.com/dictionary/pandemic'
            },
            {
              q: 'What is corona virus?',
              a:
                'COVID-19 is caused by a coronavirus. Coronaviruses are a family of common viruses affecting people and many species of animal, including camels, cattle, cats, and bats. Very rarely, animal coronaviruses transfer to people and then spread, as with MERS-CoV, SARS-CoV, and now SARS-CoV-2.',
              url:
                'https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/summary.html#emergence'
            },
            {
              q: 'What are the symptoms?',
              a:
                'Fever. Cough. Shortness of breath. In some people anosmia (losing sense of smell and taste) and/or body ache.',
              url:
                'https://www.cdc.gov/coronavirus/2019-ncov/about/symptoms.html'
            }
          ]
        },
        {
          title: 'Preventative Information',
          lastUpdatedAt: '2020-04-04',
          qa: [
            {
              q: '',
              a: '',
              url: ''
            },
            {
              q: '',
              a: '',
              url: ''
            },
            {
              q: '',
              a: '',
              url: ''
            }
          ]
        },
        {
          title: 'Social Distancing',
          lastUpdatedAt: '2020-04-04',
          qa: [
            {
              q: '',
              a: '',
              url: ''
            },
            {
              q: '',
              a: '',
              url: ''
            },
            {
              q: '',
              a: '',
              url: ''
            }
          ]
        }
      ]
    }
  },
  head() {
    return {
      title: 'General FAQ'
    }
  }
}
</script>
<style lang="scss">
.Parent {
  &-Heading {
    @include font-size(30);
    font-weight: normal;
    color: $gray-2;
    margin-bottom: 12px;
  }
}
a {
  @include text-link();
}
</style>
