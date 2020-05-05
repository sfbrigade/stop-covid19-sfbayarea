<template>
  <div class="SideNavigationOverview">
    <v-list class="SideNavigationOverview-List" flat>
      <v-list-item
        v-for="(item, i) in categories"
        :key="i"
        v-ripple="false"
        :to="`#faq-content-${i}`"
        :class="{ active: activeCategory === i }"
        class="SideNavigationOverview-Container"
      >
        <v-list-item-content class="SideNavigationOverview-TextContainer">
          <v-list-item-title
            class="SideNavigationOverview-Text"
            @click="viewCategory(i)"
            v-text="item.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: Number,
      default: 0
    }
  },
  methods: {
    viewCategory(i) {
      this.$emit('clicked', i)
    }
  }
}
</script>
<style lang="scss">
.SideNavigationOverview {
  max-width: 216px;
  @include lessThan($small) {
    display: none;
  }
  &-List {
    background: $white-2 !important;
    margin: 0 1.25rem 0 1rem;
    border-radius: 10px;
    padding: 8px 18px;
    a {
      margin: 5px 0;
    }
    .SideNavigationOverview-TextContainer {
      max-width: 180px;
      min-width: 125px;
      padding: 5px;
      .v-list-item__title {
        @include font-size(14);
        text-overflow: unset;
        white-space: break-spaces;
      }
    }

    a:hover {
      text-decoration: none !important;
      .v-list-item__title {
        color: $purple-2 !important;
      }
      &.v-list-item--active {
        cursor: default;
        .v-list-item__title {
          color: $black !important;
        }
      }
    }
    .v-list-item--active,
    .active {
      color: $black !important;
      font-weight: bold;
      border-left: 5px solid $purple-1;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding-left: 10px;
    }
  }
}
</style>
