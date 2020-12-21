<template>
  <v-card class="DataView pa-1">
    <v-toolbar flat class="DataView-content" :class="{ centered: centered }">
      <div v-if="title" class="DataView-TitleContainer">
        <h4 :id="titleId" class="DataView-ToolbarTitle">
          {{ title }}
        </h4>
        <h5 v-if="subTitle" class="DataView-ToolbarSubTitle">
          {{ subTitle }}
        </h5>
        <slot name="button" />
      </div>
      <div class="DataView-InfoContainer">
        <span
          :class="{ 'infoIcon-visible': chartInfo }"
          class="infoIcon"
          @mouseover="showInfo()"
          @mouseout="hideInfo()"
        >
          <InfoOutlineIcon />
        </span>
        <!-- <v-spacer /> -->
        <slot name="infoPanel" />
      </div>
    </v-toolbar>
    <v-card-text
      :class="
        $vuetify.breakpoint.xs ? 'DataView-CardTextForXS' : 'DataView-CardText'
      "
    >
      <InfoOverlay
        v-if="chartInfo"
        :chart-info="chartInfo"
        :class="{ showContent: infoIsShown }"
        class="DataView-InfoOverlay"
      />
      <slot />
    </v-card-text>
    <v-footer class="DataView-Footer">
      <time v-if="date" :datetime="formattedDate">
        Last Updated at {{ date }}
      </time>
      <a
        v-if="url"
        class="OpenDataLink"
        :href="url"
        target="_blank"
        rel="noopener"
      >
        {{ $t('Link to the Open Data Source') }}
        <v-icon class="ExternalLinkIcon" size="15">mdi-open-in-new</v-icon>
      </a>
    </v-footer>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InfoOverlay from '@/components/InfoOverlay.vue'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'
import InfoOutlineIcon from '@/static/information-outline.svg'

@Component({
  components: {
    InfoOutlineIcon,
    InfoOverlay
  }
})
export default class DataView extends Vue {
  @Prop() private title!: string
  @Prop() private subTitle!: string
  @Prop() private titleId!: string
  @Prop() private date!: string
  @Prop() private url!: string
  @Prop() private info!: any // FIXME expect info as {lText:string, sText:string unit:string}
  @Prop() private centered?: boolean
  @Prop() private chartInfo?: object

  formattedDate: string = convertDatetimeToISO8601Format(this.date)
  infoIsShown: boolean = false

  showInfo() {
    this.infoIsShown = true
  }

  hideInfo() {
    this.infoIsShown = false
  }
}
</script>

<style lang="scss">
.DataView {
  @include card-container();
  height: 100%;
  &-content {
    height: auto !important;
    .v-toolbar__content {
      align-items: start;
      justify-content: space-between;

      @include lessThan($small) {
        flex-direction: column;
      }
    }
  }
  &-Header {
    background-color: transparent !important;
    height: auto !important;
  }
  &-TitleContainer {
    padding: 14px 0 8px;
    color: $black;
  }
  &-Title {
    @include card-h2();
  }
  &-ToolbarTitle {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.5;
  }
  &-ToolbarSubTitle {
    font-size: 16px;
    line-height: 1.5;
  }
  &-InfoContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 10px;
    .infoIcon {
      visibility: hidden;
    }
    .infoIcon-visible {
      visibility: unset;
    }

    @include lessThan($small) {
      align-self: flex-end;

      .DataView-DataInfo {
        text-align: right;
      }
    }
  }
  &-CardText {
    margin-bottom: 46px;
    margin-top: 35px;
  }
  &-CardTextForXS {
    margin-bottom: 46px;
    margin-top: 30px;
  }
  &-InfoOverlay {
    display: none;
    &.showContent {
      display: unset;
    }
  }
  &-Footer {
    background-color: $white-1 !important;
    margin: 2px 4px 12px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    color: $gray-1 !important;
    justify-content: space-between;
    flex-direction: row-reverse;
    .OpenDataLink {
      text-decoration: none;
      font-style: italic;
      font-size: 14px;
      line-height: 140%;
      .ExternalLinkIcon {
        vertical-align: text-bottom;
      }
    }
  }
}
.v-toolbar__content {
  height: auto !important;
}
.centered {
  display: flex;
  justify-content: center;
}
@media screen and (min-width: 960px) {
  .DataView {
    &-ToolbarTitle {
      max-width: 800px;
    }
  }
  #confirmed-cases {
    max-width: unset;
  }
}
</style>
