<template>
  <div class="Parent">
    <h2 class="Parent-Heading">
      Important notice about prevention of COVID-19 for students and families during the nationwide emergency school closure. 
    </h2>
    <div v-for="(item, i) in items" :key="i">
      <TextCard :title="item.title" :body="item.body" />
    </div>
  </div>
</template>
<script lang="ts">
import TextCard from '@/components/TextCard.vue'
export default {
  components: {
    TextCard
  },
  data() {
    return {
      items: [
        {
          title: '1 How to reduce the risk of infection',
          body:
            'Avoid crowded areas and stay at home.<br />To prevent the spread of infection, - Wash your hands regularly. - Cover your mouth when coughing or sneezing.<br />　<a href="https://www.youtube.com/watch?v=d914EnpU4Fo" target="_blank" rel="noopener">https://www.youtube.com/watch?v=d914EnpU4Fo</a> <br />Keep an orderly lifestyle and monitor your health condition.'
        },
        {
          title: '2 If you think you are infected',
          body:
            'If you have any symptoms listed below, please call the nearby public health center.<br />'
        },
        {
          title: '3 Other information',
          body: 'Make sure to check for any updates from the schools'
        }
      ]
    }
  },
  head() {
    return {
      title: 'For Families with children'
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
