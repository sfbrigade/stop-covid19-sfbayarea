<template>
  <div class="chart-info-overlay">
    <div class="content-wrapper">
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
  }
}
</script>
<style lang="scss">
.chart-info-overlay {
  position: absolute;
  height: 80%;
  width: 95%;
  padding: 10px;
  z-index: 99;

  .content-wrapper {
    background: $white-1;
    height: 100%;
    width: 100%;
    opacity: 0.9;

    .overlay-info {
      display: flex;
      font-size: 16px;
      text-align: justify;
      padding: 20px 10px;
      z-index: 999;
    }
  }
}
</style>
