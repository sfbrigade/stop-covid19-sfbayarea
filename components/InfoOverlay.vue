<template>
  <div class="chart-info-overlay">
    <span class="chart-info-icon" @mouseover="showInfo" @mouseout="hideInfo">
      <v-icon>
        information
      </v-icon>
    </span>
    <div class="content-wrapper" :class="{ showContent: infoIsShown }">
      <span class="overlay-info">
        {{ chartInfo }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chartInfo: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    const infoIsShown = false
    return {
      infoIsShown
    }
  },
  methods: {
    showInfo() {
      this.infoIsShown = true
    },
    hideInfo() {
      this.infoIsShown = false
    }
  }
}
</script>
<style lang="scss">
.chart-info-overlay {
  position: absolute;
  z-index: 99;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  width: 95%;

  .chart-info-icon {
    position: absolute;
    width: 30px;
    top: 25px;
    right: 20px;
    z-index: 100;
  }

  .content-wrapper {
    position: relative;
    width: 100%;
    height: 60%;
    display: flex;
    opacity: 0.9;
    background: $white-1;
    visibility: hidden;

    .overlay-info {
      text-align: justify;
      position: relative;
      display: flex;
      align-items: center;
      z-index: 999;
    }
  }

  .showContent {
    visibility: visible;
  }
}
</style>
