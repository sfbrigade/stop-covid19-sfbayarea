<template>
  <div class="chart-info-overlay">
    <div class="content-wrapper">
      <div v-for="(info, i) in chartInfo" :key="i" class="overlay-info">
        <b>{{ info.title }} </b>
        <br />
        <span> {{ info.description }} </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chartInfo: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>
<style lang="scss">
.chart-info-overlay {
  position: absolute;
  height: 70%;
  width: 95%;
  z-index: 99;

  .content-wrapper {
    background: $white-1;
    height: 100%;
    width: 100%;
    opacity: 0.9;
    line-height: 25px;

    .overlay-info {
      font-size: 14px;
      text-align: justify;
      padding: 5px;
      z-index: 999;
    }
  }
}
</style>
