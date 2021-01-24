<template>
  <div
    id="ShareWidget"
    class="ShareWidget"
    :class="[
      onMain ? 'main' : 'index',
      !navigatorShare && onMain ? 'mainPad' : 'indexPad',
      navigatorShare ? 'noPad' : null
    ]"
  >
    <div class="row">
      <div class="column">
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw&text=Up%20to%20the%20minute%20Bay%20Area%20COVID%20statistics%20and%20county%20information:&url=https://panda.baybrigades.org/"
          data-show-count="false"
        >
          <div class="twitter widge">
            <i class="fab fa-twitter fa-2x" />
          </div>
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        />
      </div>

      <div class="column">
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=https://panda.baybrigades.org/"
          target="_blank"
        >
          <div class="facebook widge">
            <i class="fab fa-facebook-f fa-2x" />
          </div>
        </a>
      </div>

      <div class="column">
        <a
          href="http://www.reddit.com/submit?url=https://panda.baybrigades.org/"
        >
          <div class="reddit widge">
            <i class="fab fa-reddit-alien fa-2x" />
          </div>
        </a>
      </div>

      <div class="column">
        <a
          href="http://www.linkedin.com/shareArticle?mini=true&url=https://panda.baybrigades.org/"
        >
          <div class="linkedin widge">
            <i class="fab fa-linkedin-in fa-2x" />
          </div>
        </a>
      </div>

      <div v-if="navigatorShare" class="column">
        <div id="emailWidget" class="email widge" @click="share">
          <i class="fas fa-share-alt fa-2x" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareWidget',
  data() {
    return { navigatorShare: true, onMain: true }
  },
  mounted() {
    this.onMain = location.pathname === '/main'
    this.navigatorShare = navigator.share !== undefined
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator.share({
          title: 'Bay Area Pandemic Dashboard',
          url: 'https://panda.baybrigades.org/'
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.ShareWidget {
  box-sizing: inherit;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 100;
}
.row {
  margin: auto;
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
  flex: 1;
}
a {
  text-decoration: none;
  font-size: 0.9rem;
}
a:hover {
  text-decoration: none;
}
.widge {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 45px;
  color: white;
}
.twitter {
  background-color: #56acee;
}
.facebook {
  background-color: #3b5998;
}
.reddit {
  background-color: #ff3f19;
}
.linkedin {
  background-color: #007ab5;
}
.email {
  background-color: #473a8c;
}
.email:hover {
  cursor: pointer;
}

@media (min-width: 1440px) {
  .ShareWidget {
    width: 3rem;
    right: 1rem;
    position: absolute;
    overflow: auto;
  }
  .row {
    display: flex;
    flex-direction: column;
  }
  .widge {
    border-radius: 50%;
    margin: 0.3rem 0;
  }
  .index {
    height: calc(100% - 225px);
  }
  .indexPad {
    padding-top: 60px;
  }
  .main {
    height: calc(100% - 95px);
  }
  .mainPad {
    padding-top: 25px;
  }
  .noPad {
    padding-top: 0px;
  }
}
</style>
