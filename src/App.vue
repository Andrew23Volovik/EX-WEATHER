<template>
  <div id="app">
    <div class="background-image"></div>
    <div class="blur"></div>
    <Header></Header>
    <WheatherInfo></WheatherInfo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import WheatherInfo from './views/WheatherInfo';

export default {
  name: 'app',
  components: {
    Header,
    WheatherInfo,
    Footer,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
//@import '@/scss/variables.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.container {
  width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  //color: $color-five;
  background: $color-four;
  background: linear-gradient(to right, #20a39e 0%, #ffb140 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: url('./assets/vittorio.jpg') center center / cover no-repeat;
  z-index: 1;
}
.blur {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  backdrop-filter: blur(5px);
  z-index: 2;
}

.el-input__inner {
  border-radius: 10px !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: rgba(167, 162, 169, 1) !important;
}

.el-input-group__append {
  border-radius: 10px !important;
  border-left: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  &:hover {
    box-shadow: 0px 0px 5px 2px $color-four;
  }
}

svg {
  width: 100px;
  height: 100px;
}
</style>
