<template>
  <transition v-if="isModalShown" name="modal">
    <div class="NoMaintenanceModal">
      <div class="modal-overlay" @click="handleCloseModal()" />
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="TopNavigation-LogoContainer">
              <img class="headericon" src="/header-icon.png" />
              <div class="logo-title-container">
                <span class="logotitle">Bay Area Pandemic Dashboard</span>
                <span class="logosubtitle">by Bay Area Brigades</span>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <div class="body-content">
              <h3>Thank you for your support!</h3>
              <div>
                As of October 1st, 2021, the Bay Area Pandemic Dashboard will no
                longer be maintained by the Code4SF team. The data will continue
                to update automatically but will no longer be reviewed for
                accuracy or errors. To ensure you have accurate information, we
                recommend you visit your state or county health organization
                dashboard.
              </div>
              <div>
                Thank you for supporting the site for the time it was active. We
                hope it has been helpful in any way towards making the Bay Area
                better informed and safer during the ongoing pandemic. From all
                of us at the PanDa team, take care and stay safe.
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="button" @click="handleCloseModal(null)">
              Continue to the site
            </button>
            <button class="button inverted" @click="handleCloseModal('learn')">
              Learn about Code4SF
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    isModalShown: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  methods: {
    handleCloseModal(nav) {
      if (nav === 'learn') {
        window.open('https://www.codeforsanfrancisco.org/', '_blank')
      }
      this.$emit('onModalCloseClick')
    }
  }
}
</script>
<style lang="scss">
.NoMaintenanceModal {
  height: 100vh;
  position: absolute;
  max-width: 1440px;
  z-index: 99;
  top: 0;
  @include lessThan($small) {
    width: 100vw;
  }

  .modal-overlay {
    position: absolute;
    height: 100vh;
    width: 100vw;
    max-width: 1440px;
    top: 0;
    background: #000000;
    opacity: 0.6;
  }

  .modal-wrapper {
    position: relative;
    display: flex;
    height: 100%;
    width: 100vw;
    max-width: 1440px;
    align-items: center;
    justify-content: center;
    z-index: 100;
    left: 0;
    @include lessThan($small) {
      width: 100%;
    }

    .modal-container {
      height: fit-content;
      background: #ffffff;
      width: 80vw;
      height: 60vh;
      max-width: 1200px;
      @include lessThan($small) {
        height: unset;
        padding-bottom: 30px;
      }

      .modal-header {
        background: url('../static/titlebar_bg.png') center no-repeat;
        padding: 0 30px;
        height: 15vh;
        @include lessThan($small) {
          padding: 0 15px;
          /* height: 10vh; */
        }

        .TopNavigation {
          &-LogoContainer {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            min-width: 72px;

            .headericon {
              width: 60px;
              height: 60px;
              margin-left: 16px;
              margin-right: 25px;
              @include lessThan($small) {
                width: 28px;
                height: 28px;
                margin-left: 14px;
                margin-right: 14px;
              }
            }
            .logo-title-container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 60px;

              .logotitle {
                font-style: normal;
                font-weight: bold;
                font-size: 24px;
                line-height: 28px;
                color: $white-1;
                justify-content: space-evenly;
                @include lessThan($small) {
                  font-size: 14px;
                  line-height: 1.25;
                }
              }
              .logosubtitle {
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 18px;
                color: $white-1;
                @include lessThan($small) {
                  font-size: 10px;
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }

      .modal-body {
        padding: 30px 45px;
        height: 35vh;
        @include lessThan($small) {
          padding: 15px 30px;
          height: unset;
        }

        .body-content {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          h3 {
            font-size: 24px;
            @include lessThan($small) {
              font-size: 16px;
            }
          }

          div {
            font-size: 16px;
            margin: 18px 0;
            @include lessThan($small) {
              font-size: 12px;
              margin: 14px 0;
            }
          }
        }
      }

      .modal-footer {
        padding: 0 45px;
        display: flex;
        justify-content: center;
        @include lessThan($small) {
          padding: 0 30px;
          flex-direction: column;
        }

        .button {
          border-radius: 5px;
          background: $purple-1;
          color: $white-1;
          font-size: 16px;
          padding-top: 15px;
          padding-bottom: 15px;
          width: 200px;
          margin: 0 20px;
          @include lessThan($small) {
            font-size: 12px;
            padding-top: 11px;
            padding-bottom: 11px;
            width: unset;
            margin: 0 0 10px 0;
          }

          &.inverted {
            color: $purple-1;
            background: $white-1;
            border: 1px solid $purple-1;
          }
        }
      }
    }
  }
}
</style>
