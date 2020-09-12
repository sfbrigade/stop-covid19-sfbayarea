<template>
  <div class="WhatsNew">
    <h2 class="WhatsNew-heading">
      News & Updates
    </h2>
    <ul class="WhatsNew-list">
      <div class="WhatsNew-subheading">
        <p>Date</p>
        <p>Link</p>
      </div>
      <li v-for="(item, i) in feed.items" :key="i" class="WhatsNew-list-item">
        <a
          class="WhatsNew-list-item-anchor"
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
          <time
            class="WhatsNew-list-item-anchor-time px-2"
            :datetime="item.date_published"
          >
            {{ humanDate(item.date_published) }}
          </time>
          <span class="WhatsNew-list-item-anchor-link">
            {{ item.title }}
            <v-icon
              v-if="!isInternalLink(item.url)"
              class="WhatsNew-item-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { convertISO8601ToHumanDateFormat } from '@/utils/formatDate'
import Data from '@/data/data.json'
import DataVTwo from '@/data/data.v2.json'

export default {
  props: {
    feed: {
      type: Object,
      required: true
    }
  },

  data() {
    const currentCounty = 'San Francisco County'
    const countyNames = Object.keys(Data)
    const data = {
      Data,
      DataVTwo,
      currentCounty,
      countyNames
    }

    return data
  },

  methods: {
    isInternalLink(path) {
      return !/^https?:\/\//.test(path)
    },
    humanDate(isoDate) {
      return convertISO8601ToHumanDateFormat(isoDate)
    }
  }
}
</script>

<style lang="scss">
.WhatsNew {
  @include card-container();
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
}

.WhatsNew-heading {
  display: flex;
  align-items: center;
  @include card-h2();
  margin-bottom: 12px;
  // color: $gray-2;
  margin-left: 12px;
  height: 28px;
  &-icon {
    margin: 3px;
  }
}

.WhatsNew-subheading {
  font-size: 16px;
  font-weight: bold;
  margin-left: 12px;
  display: flex;
  width: 100%;
}

.WhatsNew-subheading p {
  width: 9%;
  color: $gray-1;
}

.WhatsNew .WhatsNew-list {
  padding-left: 0px;
  list-style-type: none;

  &-item {
    &-anchor {
      display: flex;
      text-decoration: none;
      margin: 5px;
      font-size: 14px;

      @include lessThan($medium) {
        flex-wrap: wrap;
      }

      &-time {
        flex: 0 0 95px;
        @include lessThan($medium) {
          flex: 0 0 100%;
        }
        color: $gray-1;
      }

      &-link {
        flex: 0 1 auto;
        margin-left: 42px;
        @include text-link();
        @include lessThan($medium) {
          padding-left: 8px;
        }
      }

      &-ExternalLinkIcon {
        margin-left: 2px;
        color: $gray-3 !important;
      }
    }
  }
}

.county-selector-card {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 64px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.selection {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: white;
  letter-spacing: 0.03em;
  width: 250px;
  height: 33px;
  margin-left: 30px;
  margin-top: 18px;
  margin-bottom: 18px;
  @include lessThan($small) {
    display: none;
  }
}

.county-choice {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 250px;
  max-width: 60%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  &:-ms-expand {
    display: none;
  }
  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  option {
    font-weight: normal;
  }
}
</style>
