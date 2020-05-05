<template>
  <div class="FaqCategory">
    <h2 v-if="title" class="FaqCategory-Heading">
      {{ title }}
    </h2>
    <p class="FaqCategory-LastUpdatedAt">Last updated at {{ lastUpdatedAt }}</p>
    <v-expansion-panels class="FaqCategory-QA">
      <v-expansion-panel
        v-for="(qa, i) in qa"
        :key="i"
        @click="getExpandedIds(i)"
      >
        <v-expansion-panel-header class="FaqCategory-QA-Q">
          <v-icon
            class="FaqCategory-QA-Icon"
            small
            :class="{ isHidden: qaSubCategoryExpanded === i }"
          >
            mdi-plus
          </v-icon>
          <v-icon
            class="FaqCategory-QA-Icon"
            small
            :class="{ isHidden: qaSubCategoryExpanded !== i }"
          >
            mdi-minus
          </v-icon>
          {{ qa.q }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="FaqCategory-QA-A-Container">
          <div class="FaqCategory-QA-A">
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
          </div>
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
  data() {
    return {
      qaSubCategoryExpanded: null
    }
  },
  methods: {
    isInternalLink(path) {
      return !/^https?:\/\//.test(path)
    },
    getExpandedIds(subCategoryId) {
      if (subCategoryId === this.qaSubCategoryExpanded) {
        this.qaSubCategoryExpanded = null
      } else {
        this.qaSubCategoryExpanded = subCategoryId
      }
    }
  }
}
</script>

<style lang="scss">
.FaqCategory {
  @include card-container();
  padding: 24px 30px;
  margin-bottom: 20px;

  &-Heading {
    @include card-h1();
    margin-bottom: 10px;
    a {
      @include card-h1();
    }
    @include lessThan($small) {
      font-size: 20px;
    }
  }
  &-LastUpdatedAt {
    margin-bottom: 1.5rem !important;
    font-size: 14px;
    color: $gray-1;
    font-weight: 500;
    @include lessThan($small) {
      font-size: 12px;
      margin-bottom: 1.375rem !important;
    }
  }
  &-QA {
    /* RESETS */
    .v-expansion-panel::before {
      box-shadow: none;
    }
    .v-expansion-panel-header__icon {
      display: none;
    }
    .v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
      flex: none;
    }
    .v-expansion-panel-content__wrap {
      padding: 0;
      margin: 11px 0 15px 0;
      @include lessThan($small) {
        margin-top: 2px;
      }
    }
    .v-expansion-panel--active {
      border-top: 1px solid $gray-2;
      border-top-right-radius: 0%;
      border-top-left-radius: 0%;
    }
    .v-expansion-panel:last-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      border-bottom-right-radius: 0%;
      border-bottom-left-radius: 0%;
    }
    /* RESETS END */

    &-Icon {
      color: $purple-1 !important;
      margin-right: 14px;
      &.isHidden {
        display: none;
      }
    }

    &-Q {
      @include body-text();
      padding: 12px 0;
      min-height: unset !important;
    }

    &-A-Container {
      @include body-text();
      font-weight: bold;
      border-bottom: 1px solid $gray-2;
    }

    &-A {
      background: $white-2;
      padding: 20px 30px;
      border-radius: 10px;
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
