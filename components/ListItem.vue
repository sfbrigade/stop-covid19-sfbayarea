<template>
  <v-list-item
    v-ripple="false"
    :to="isInternalLink(link) ? link : ''"
    :href="!isInternalLink(link) ? link : ''"
    :target="!isInternalLink(link) ? '_blank' : ''"
    :rel="!isInternalLink(link) ? 'noopener' : ''"
    router
    exact
    class="ListItem-Container"
    style="color: transparent"
  >
    <v-list-item-action v-if="icon" class="ListItem-IconContainer">
      <v-icon
        v-if="checkIconType(icon) === 'prefix-icon'"
        :class="['ListItem-Icon', { 'fa-18': icon.startsWith('fa') }]"
        size="20"
      >
        {{ icon }}
      </v-icon>
      <FaqIcon
        v-else-if="checkIconType(icon) === 'faq'"
        :class="['ListItem-Icon', isActive(link)]"
      />
      <CovidIcon
        v-else-if="checkIconType(icon) === 'covid'"
        class="ListItem-Icon"
      />
      <ParentIcon
        v-else-if="checkIconType(icon) === 'parent'"
        class="ListItem-Icon"
      />
      <InfoOutlineIcon
        v-else-if="checkIconType(icon) === 'info_outline'"
        class="ListItem-Icon"
      />
      <PollOutlineIcon
        v-else-if="checkIconType(icon) === 'poll_outline'"
        class="ListItem-Icon"
      />
    </v-list-item-action>
    <v-list-item-content class="ListItem-TextContainer">
      <v-list-item-title class="ListItem-Text" v-text="title" />
    </v-list-item-content>
    <v-icon
      v-if="!isInternalLink(link)"
      class="ListItem-ExternalLinkIcon"
      size="12"
    >
      mdi-open-in-new
    </v-icon>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import FaqIcon from '@/static/faq.svg'
import CovidIcon from '@/static/covid.svg'
import ParentIcon from '@/static/parent.svg'
import InfoOutlineIcon from '@/static/information-outline.svg'
import PollOutlineIcon from '@/static/poll-box-outline.svg'

@Component({
  components: {
    CovidIcon,
    FaqIcon,
    InfoOutlineIcon,
    ParentIcon,
    PollOutlineIcon
  }
})
export default class ListItem extends Vue {
  @Prop({
    default: '',
    required: false
  })
  link!: string

  @Prop({
    default: '',
    required: false
  })
  icon!: string

  @Prop({
    default: '',
    required: false
  })
  title!: string

  isInternalLink(path: string): boolean {
    return !/^https?:\/\//.test(path)
  }

  checkIconType(
    icon?: string
  ):
    | 'none'
    | 'prefix-icon'
    | 'faq'
    | 'covid'
    | 'parent'
    | 'info_outline'
    | 'poll_outline'
    | 'others' {
    if (!icon) return 'none'
    if (icon.startsWith('mdi') || icon.startsWith('fa')) {
      return 'prefix-icon'
    } else if (icon === 'faq') {
      return 'faq'
    } else if (icon === 'covid') {
      return 'covid'
    } else if (icon === 'parent') {
      return 'parent'
    } else if (icon === 'info_outline') {
      return 'info_outline'
    } else if (icon === 'poll_outline') {
      return 'poll_outline'
    } else {
      return 'others'
    }
  }
}
</script>

<style lang="scss">
.ListItem {
  &-Container {
    min-height: 30px;
    padding: 0;
    & .ListItem-TextContainer {
      max-width: calc(100% - 20px);
    }
    & .ListItem-Text {
      overflow: visible;
      white-space: normal;
      font-size: 0.85rem;
    }
    &:hover {
      color: transparent !important;
      text-decoration: none;
      & .ListItem-Text {
        font-weight: bold;
      }
      & .ListItem-Icon {
        color: $black !important;
      }
      & .ListItem-ExternalLinkIcon {
        color: $black !important;
      }
      & .ListItem-IconContainer {
        > svg {
          > path:not(:first-of-type) {
            fill: $black;
          }
        }
      }
    }
  }
  &-Text {
    color: $black;
  }
  &-IconContainer {
    margin: 8px 10px 8px 0 !important;
    > svg {
      > path:not(:first-of-type) {
        fill: $black;
      }
      width: 20px;
      height: 20px;
    }
    .fa-18 {
      font-size: 17px !important;
    }
  }
  &-Icon {
    color: $black !important;
  }
  &-TextContainer {
    display: inline-block;
    flex: none;
  }
  &-ExternalLinkIcon {
    margin-left: 2px;
    color: $gray-3 !important;
  }
}
</style>
