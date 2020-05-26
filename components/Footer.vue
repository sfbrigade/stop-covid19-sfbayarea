<template>
  <div class="Footer">
    <div class="Content-Container">
      <div class="Category-Container">
        <p>About</p>
        <span>Project Information</span>
        <nuxt-link to="/about">
          <div class="Footer-AboutUs">
            <span>About Code 4 San Francisco</span>
          </div>
        </nuxt-link>
      </div>
      <div class="Category-Container">
        <p>Contact</p>
        <span>info@baybrigades.com</span>
      </div>
      <div class="Category-Container">
        <p>Social</p>
        <div class="Footer-SocialLinks">
          <div
            v-for="(contact, i) in contacts"
            :key="i"
            class="Footer-SocialLinkContainer"
          >
            <a :href="contact.link" target="_blank" rel="noopener">
              <i :class="contact.class" />
              <span>{{ contact.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <v-divider />
    <div class="Footer-Copyright">
      <span>&copy; 2020 Code for San Francisco</span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    contacts() {
      return [
        {
          class: 'fab fa-meetup',
          name: 'Meetup',
          link:
            'https://www.meetup.com/Code-for-San-Francisco-Civic-Hack-Night/'
        },
        {
          class: 'fab fa-slack',
          name: 'Slack',
          link: 'https://sfbrigade-slackin.herokuapp.com/'
        },
        {
          class: 'fab fa-github',
          name: 'Github',
          link: 'https://github.com/sfbrigade/stop-covid19-sfbayarea'
        },
        {
          class: 'fab fa-twitter',
          name: 'Twitter',
          link: 'https://twitter.com/sfbrigade'
        },
        {
          class: 'fab fa-facebook',
          name: 'Facebook',
          link: 'https://www.facebook.com/codeforsanfrancisco'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.Footer {
  padding: 31px 40px 26px 40px;
  background: $white-2;
  .Content-Container {
    padding: 0;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 31px;

    .Category-Container {
      margin: 0 2rem;
      max-width: 200px;

      &:first-child {
        margin-left: 0;
        @include lessThan($small) {
          margin-bottom: 1rem;
        }
      }
      &:last-child {
        margin-right: 0;
        @include lessThan($small) {
          margin-left: 3rem;
        }
      }
      p {
        font-weight: bold;
        margin-bottom: 10px;
        @include lessThan($small) {
          @include font-size(14);
        }
      }
      span {
        @include font-size(14);
        @include lessThan($small) {
          @include font-size(12);
        }
      }
    }
  }
  a {
    text-decoration: none;
    transition: text-shadow 0.5s;
  }
  a:hover {
    text-shadow: 1px 0 $black;
    i {
      text-shadow: none;
    }
  }
  &-AboutUs {
    color: $black;
  }
  &-SocialLinks {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 200px;
  }
  &-SocialLinkContainer {
    display: flex;
    margin: 4px 0;
    width: 100px;
    a > i {
      font-size: 1rem;
      color: $black;
      @include lessThan($small) {
        margin-right: 5px;
      }
    }
  }
  &-Copyright {
    margin-top: 10px;
    text-align: center;
    @include font-size(14);
    @include lessThan($small) {
      @include font-size(12);
    }
  }
}

@include lessThan($small) {
  .Footer {
    padding: 22px;

    .Content-Container {
      margin-bottom: 25px;
      flex-direction: column;
      flex-wrap: wrap;
      max-height: 270px;

      .Category-Container {
        margin: 0;
        max-width: 165px;

        &:first-child {
          margin-bottom: 1rem;
        }
        &:last-child {
          margin-left: 3rem;
        }

        p {
          @include font-size(14);
        }

        span {
          @include font-size(12);
        }
      }
    }

    &-SocialLinkContainer {
      a > i {
        margin-right: 5px;
      }
    }

    &-Copyright {
      @include font-size(12);
    }
  }
}
</style>
