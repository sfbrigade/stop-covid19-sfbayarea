<template>
  <div class="DataView-DataInfo">
    <span class="DataView-DataInfo-summary">
      {{ lText }}
      <small class="DataView-DataInfo-summary-unit">{{ unit }}</small>
    </span>
    <br />
    <small class="DataView-DataInfo-date">{{ sText }}</small>
  </div>
</template>

<style lang="scss">
.DataView {
  &-DataInfo {
    text-align: left;
    &-summary {
      display: inline-block;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 39px;
    }
    &-date {
      white-space: nowrap;
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
      color: $gray-3;
    }
  }
}
.DataView {
  @include card-container();
  height: 100%;
  &-Header {
    background-color: transparent !important;
    height: auto !important;
  }
  &-TitleContainer {
    padding: 14px 0 8px;
  }
  &-Title {
    @include card-h2();
  }
  &-CardText {
    margin-bottom: 46px;
    margin-top: 20px;
  }
}
.v-toolbar__content {
  height: auto !important;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DataViewBasicInfoPanel extends Vue {
  @Prop() private lText!: string
  @Prop() private sText!: string
  @Prop() private unit!: string
}
</script>
