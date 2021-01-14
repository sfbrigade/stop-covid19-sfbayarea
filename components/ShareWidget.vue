<template>
  <div id="ShareWidget" class="ShareWidget main">
    <div class="row">
      <div class="column">
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw&text=COVID%20Awareness%20for%20the%20Bay%20Area,%20by%20the%20Bay%20Area.%0A"
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

      <div class="column">
        <div class="email widge" @click="share">
          <i class="fas fa-share-alt fa-2x" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareWidget',
  mounted() {
    this.getPage()
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator
          .share({
            title: 'Bay Area Pandemic Dashboard',
            url: 'https://panda.baybrigades.org/'
          })
          .then(() => {
            console.log('Thanks for sharing!')
          })
          .catch(console.error)
      } else {
        // Fallback...
        alert('This feature is not available on your current browser.')
      }
    },
    getPage() {
      const widget = document.getElementById('ShareWidget')
      const page = location.href

      if (page === 'https://panda.baybrigades.org/') {
        widget.classList.add('main')
      } else {
        widget.classList.remove('main')
      }

      //   if statement below is for testing purposes only!

      //   if (page === "http://localhost:3000/") {
      //     widget.classList.add("main");
      //   } else {
      //     widget.classList.remove("main");
      //   }
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
/* Should try 1350px? */
@media (min-width: 1264px) {
  .ShareWidget {
    width: 3rem;
    height: calc(100% - 95px);
    right: 1rem;
    position: absolute;
    overflow: auto;
    z-index: 100;
  }
  .main {
    height: calc(100% - 225px);
  }
  .row {
    display: flex;
    flex-direction: column;
  }
  .widge {
    border-radius: 50%;
    margin: 0.3rem 0;
  }
}
</style>
