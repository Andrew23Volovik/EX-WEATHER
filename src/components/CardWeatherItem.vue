<template>
  <div class="item__weather" :style="selectStyle">
    <div class="item__weather__wrapper">
      <slot name="top"></slot>
      <div class="item__weather__wrapper__top__bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWeatherItemComponent',
  props: ['top', 'isActive'],
  computed: {
    selectStyle() {
      return {
        boxShadow:
          this.top === true ? '0px 0px 10px 2px rgba(255, 177, 64, 0.5)' : '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.item__weather {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 177, 64, 0.5);
  background-color: rgba(52, 52, 52, 0.5);
  box-shadow: 2px 2px 10px 0px rgba(52, 52, 52, 0.5);
  transition: 0.1s all ease-in;
  &:hover {
    box-shadow: 0px 0px 10px 2px rgba(32, 163, 158, 0.5);
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    height: 100%;
    &__top {
      &__bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}

.active {
  background-color: rgba(255, 177, 64, 0.5);
}
</style>