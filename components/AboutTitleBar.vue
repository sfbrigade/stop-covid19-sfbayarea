<template>
  <div class="AbourTitleBar">
    <div class="Background-Wrapper">
      <div class="header-container">
        <h2>
          <span class="headertitle">
            About the Bay Area Pandemic Dashboard
          </span>
        </h2>
        <p>
          <span class="headersubtitle">
            Local data and information associated with the coronavirus pandemic
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutTitleBar'
}
</script>
<style lang="scss">
.Background-Wrapper {
  background: url('../static/titlebar_bg.png') center no-repeat;
  height: 340px;
  position: relative;
  width: 1440px;
  height: 340px;
  left: 0px;
  right: 0px;
  top: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  @include lessThan($small) {
    display: none;
  }
}

.header-container {
  position: absolute;
  width: 1000px;
  height: 75px;
  left: 139px;
  top: 88px;
  display: flex;
  flex-direction: column;
  padding: 4px 15px;
}

.headertitle {
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
  letter-spacing: 0.03em;
  color: white;
}

.headersubtitle {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
  color: white;
}
</style>
