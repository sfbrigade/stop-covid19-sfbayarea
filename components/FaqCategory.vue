<template>
  <div class="FaqCategory">
    <h2 v-if="title" class="FaqCategory-Heading">
      <a v-if="link" :href="link" target="_blank" rel="noopener">
        {{ title }}
      </a>
      <template v-else>
        {{ title }}
      </template>
    </h2>
    <p class="FaqCategory-LastUpdatedAt">
      Last updated at {{ lastUpdatedAt }}
      <slot />
    </p>
    <v-expansion-panels class="FaqCategory-QA">
      <v-expansion-panel v-for="(qa, i) in qa" :key="i">
        <v-expansion-panel-header> + {{ qa.q }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ qa.a }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    lastUpdatedAt: {
      type: String,
      default: '',
      required: false
    },
    qa: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.FaqCategory {
  @include card-container();
  padding: 20px;
  margin-bottom: 20px;

  &-Heading {
    @include card-h1();
    margin-bottom: 8px;
    a {
      @include card-h1();
    }
  }
  &-LastUpdatedAt {
    margin-bottom: 12px;

    font-size: 13px;
    color: #898989;
  }
  &-QA {
    * {
      @include body-text();
      font-size: 14px;
    }
    a {
      word-break: break-all;
      color: $link;
      text-decoration: none;
    }
  }
}
</style>
