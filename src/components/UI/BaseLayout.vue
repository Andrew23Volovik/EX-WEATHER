<template>
  <div class="box" >
    <slot></slot>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="scss" scoped>
.box {
  padding: 25px;
  height: calc(100vh - 165px);
  border: 1px solid rgba(255, 177, 64, 0.5);
  //background: rgba(167, 162, 169, 0.5);
  background: radial-gradient(
    circle,
    rgba(244, 247, 245, 0.5) 0%,
    rgba(167, 162, 169, 0.5) 35%,
    rgba(52, 52, 52, 0.5) 100%
  );
  border-radius: 20px;
}
</style>