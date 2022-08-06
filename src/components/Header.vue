<template>
  <nav>
    <header class="container">
      <div class="branding">
        <router-link class="link" to="#">Ex Weather</router-link>
      </div>
      <div class="theme">
        <p>Theme</p>
        <el-switch
          v-model="value2"
          active-color="#ffb140"
          inactive-color="#20a39e"
        >
        </el-switch>
      </div>
      <div class="avatar">
        <el-dropdown trigger="click">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      value2: null,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    };
  },
};
</script>

<style lang="scss" scoped>
nav {
  z-index: 100;
  padding: 25px;
  background: $color-one;
  box-shadow: 0px 1px 3px 2px rgba(32, 163, 158, 0.1),
    0px 1px 3px 2px rgba(255, 177, 64, 0.1);
  header {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .branding {
      font-size: 24px;
      flex: 1;
    }
    .theme {
      width: 110px;
      display: flex;
      justify-content: space-between;
      margin-right: 30px;
      text-transform: uppercase;
      p {
        font-size: 16px;
        color: $color-five;
      }
    }
    .avatar {
      width: 40px;
      height: 40px;
    }
  }
}
.el-avatar {
  transition: 0.3s all ease-in;
  &:hover {
    box-shadow: 0px 0px 2px 2px $color-five;
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: $color-five;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-menu {
  background-color: $color-one;
  border: 1px solid rgba(255, 177, 64, 0.5);
}

.el-dropdown-menu__item {
  background-color: $color-one;
  color: $color-three;
  transition: 0.5s all ease-in;
  &:not(.is-disabled):hover {
    background-color: rgba(167, 162, 169, 0.5);
    color: $color-four;
  }
}
</style>