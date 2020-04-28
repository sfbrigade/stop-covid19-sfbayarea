<template>
  <div class="FaqCategory">
    <h2 v-if="title" class="FaqCategory-Heading">
      {{ title }}
    </h2>
    <p class="FaqCategory-LastUpdatedAt">Last updated at {{ lastUpdatedAt }}</p>
    <v-expansion-panels class="FaqCategory-QA">
      <v-expansion-panel v-for="(qa, i) in qa" :key="i">
        <v-expansion-panel-header class="FaqCategory-QA-Q">
          + {{ qa.q }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="FaqCategory-QA-A">
          {{ qa.a }}
          <p class="FaqCategory-QA-Link">
            <a :href="qa.url" target="_blank" rel="noopener">source link</a>
            <v-icon
              v-if="!isInternalLink(qa.url)"
              class="FaqCategory-QA-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </p>
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
  },
  methods: {
    isInternalLink(path) {
      return !/^https?:\/\//.test(path)
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
    &-Q {
      @include body-text();
      font-size: 14px;
    }

    &-A {
      @include body-text();
      font-size: 14px;
      font-weight: bold;
    }

    &-Link {
      @include text-link();
      margin-top: 10px;
      font-size: 12px;
      font-style: italic;
      font-weight: bold;
    }

    &-ExternalLinkIcon {
      margin-left: 2px;
      color: $gray-3 !important;
    }
  }
}
</style>
