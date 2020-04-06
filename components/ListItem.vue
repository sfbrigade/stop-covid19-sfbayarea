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
        :class="['ListItem-Icon', isActive(link)]"
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
        :class="['ListItem-Icon', isActive(link)]"
      />
      <ParentIcon
        v-else-if="checkIconType(icon) === 'parent'"
        :class="['ListItem-Icon', isActive(link)]"
      />
      <InfoOutlineIcon
        v-else-if="checkIconType(icon) === 'info_outline'"
        :class="['ListItem-Icon', isActive(link)]"
      />
      <PollOutlineIcon
        v-else-if="checkIconType(icon) === 'poll_outline'"
        :class="['ListItem-Icon', isActive(link)]"
      />
    </v-list-item-action>
    <v-list-item-content class="ListItem-TextContainer">
      <v-list-item-title
        :class="['ListItem-Text', isActive(link)]"
        v-text="title"
      />
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

  isActive(link: string): string | undefined {
    if (link === this.$route.path || `${link}/` === this.$route.path) {
      return 'isActive'
    }
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
    color: transparent !important;
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
      & .ListItem-Text {
        font-weight: bold;
      }
      & .ListItem-Icon {
        color: $gray-1 !important;
        &.isActive {
          color: $green-1 !important;
        }
      }
      & .ListItem-ExternalLinkIcon {
        color: $gray-1 !important;
      }
      & .ListItem-IconContainer {
        > svg {
          > path:not(:first-of-type) {
            fill: $gray-1;
          }
        }
        > svg.isActive {
          > path:not(:first-of-type) {
            fill: $green-1;
          }
        }
      }
    }
  }
  &-Text {
    color: $gray-1;
  }
  &-IconContainer {
    margin: 8px 10px 8px 0 !important;
    > svg {
      > path:not(:first-of-type) {
        fill: $gray-2;
      }
      width: 20px;
      height: 20px;
    }
  }
  &-Icon {
    color: $gray-2 !important;
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
.isActive {
  color: $green-1 !important;
  font-weight: 600;
}
svg.isActive {
  > path:not(:first-of-type) {
    fill: $green-1;
  }
}
</style>
