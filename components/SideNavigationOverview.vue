<template>
  <div class="SideNavigationOverview">
    <v-list class="SideNavigationOverview-List" flat>
      <v-list-item
        v-for="(item, i) in categories"
        :key="i"
        v-ripple="false"
        class="SideNavigationOverview-Container"
      >
        <v-list-item-content class="SideNavigationOverview-TextContainer">
          <v-list-item-title
            class="SideNavigationOverview-Text"
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
    }
  }
}
</script>
<style lang="scss">
.SideNavigationOverview {
  &-List {
    background: $gray-5 !important;
  }
}
</style>
