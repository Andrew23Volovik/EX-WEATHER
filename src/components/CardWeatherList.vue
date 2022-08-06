<template>
  <div
    class="wheather__card__wrapper"
    :style="weatherCardStyle"
    @mouseenter="enter"
    @mouseleave="leave"
  >
    <div class="background"></div>
    <CardWeatherItem
      v-for="(count, index) in counts"
      :key="index"
      :top="index"
      :isActive="activeDayIndex"
    >
      <template #top v-if="counts.length === 3">
        <div @click="onClick(index)" class="item__weather__wrapper__top">
          <div class="date_t">
            <h2>{{ count.date }}</h2>
            <h2>
              <span>{{ getCity }}</span>
            </h2>
          </div>
          <div class="wrapper">
            <font-awesome-icon
              icon="fa-solid fa-temperature-half"
              class="icon_temp_t"
            />
            <h2 class="temp_t">{{ count.day.avgtemp_c.toFixed() }} °C</h2>
            <font-awesome-icon
              :icon="weatherIconTop(index).icon"
              class="svg_icon"
            />
          </div>
          <h2 class="wind_t">
            <span>Wind:</span> {{ count.day.maxwind_kph }} km/h
          </h2>
          <h2 class="title_t">{{ count.day.condition.text }}</h2>
        </div>
      </template>

      <template #bottom v-else>
        <h2 class="date_t_b">{{ count.time }}</h2>
        <div>
          <font-awesome-icon
            :icon="weatherIconBottom(index).icon"
            class="svg_icon_bottom"
          />
        </div>
        <h2 class="temp_t_b">{{ count.temp_c.toFixed() }} °C</h2>
        <h2 class="temp_t_b_feel">
          <span>Feels:</span> {{ count.feelslike_c }} °C
        </h2>
        <h2 class="pressure">
          <span>Pressure:</span> {{ (count.pressure_mb / 1.333).toFixed() }}
        </h2>
        <h2 class="wind_t_b"><span>W:</span> {{ count.wind_kph }} km/h</h2>
        <h2 class="title_t_b">{{ count.condition.text }}</h2>
      </template>
    </CardWeatherItem>
    <slot></slot>
  </div>
</template>

<script>
import icons from '../assets/icons_pack.js';
import CardWeatherItem from '../components/CardWeatherItem';

export default {
  name: 'CardWheatherListComponent',
  components: {
    CardWeatherItem,
  },
  props: ['counts', 'variant', 'activeDayIndex'],
  data() {
    return {
      icons: icons,
      isActive: 0,
    };
  },
  computed: {
    weatherCardStyle() {
      return {
        gap: this.variant === 'day' ? '20px' : '10px',
      };
    },
    getCity() {
      return this.$store.getters.getCity;
    },
  },
  methods: {
    enter() {
      this.$emit('hover', true);
    },
    leave() {
      this.$emit('leave', false);
    },
    weatherIconTop(index) {
      const currentWeather = this.counts[index].day.condition.code;
      return icons.find((obj) => obj.code === currentWeather);
    },
    weatherIconBottom(index) {
      const currentWeather = this.counts[index].condition.code;
      return icons.find((obj) => obj.code === currentWeather);
    },
    onClick(idx) {
      this.$emit('changeDay', idx);
    },
  },
  mounted() {
    console.log(this.counts);
  },
};
</script>

<style lang="scss" scoped>
.wheather__card__wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  //gap: 20px;
  padding: 20px;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    background-color: rgba(167, 162, 169, 0.7);
    z-index: -1;
  }

  .item__weather__wrapper__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .date_t {
    display: flex;
    align-items: center;
    h2 {
      margin: 0 5px 0;
      font-size: 16px;
      font-weight: 400;
      color: $color-black;
      span {
        color: $color-black;
        font-size: 18px;
        font-weight: 600;
      }
    }
    &_b {
      color: $color-black;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    .icon_temp_t {
      margin-right: 10px;
      margin-top: 8px;
      width: 15px;
      height: 50px;
      color: $color-five;
    }
  }

  .svg_icon {
    width: 100px;
    height: 100px;
    color: $color-five;
    transition: 0.3s all ease;
    &:hover {
      animation: scale 3s linear infinite;
    }
    &_bottom {
      width: 60px;
      height: 60px;
      color: $color-five;
      &:hover {
        animation: scale 3s linear infinite;
      }
    }
  }

  .temp_t {
    font-size: 40px;
    font-weight: 400;
    margin-right: 30px;
    color: $color-black;
    &_b {
      color: $color-black;
      font-weight: 500;
      font-size: 24px;
      &_feel {
        color: $color-black;
        font-size: 16px;
        font-weight: 400;
        span {
          font-weight: 500;
          color: $color-black;
        }
      }
    }
  }

  .pressure {
    color: $color-black;
    font-size: 16px;
    font-weight: 400;
    span {
      color: $color-black;
      font-weight: 500;
    }
  }

  .wind_t {
    font-size: 16px;
    color: $color-black;
    font-weight: 400;
    span {
      color: $color-black;
      font-weight: 600;
    }
    &_b {
      font-size: 16px;
      color: $color-black;
      font-weight: 400;
      span {
        color: $color-black;
        font-weight: 500;
      }
    }
  }

  .title_t {
    font-size: 22px;
    font-weight: 600;
    color: $color-black;
    text-transform: uppercase;
    &_b {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
    }
  }
}

@keyframes scale {
  from {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  to {
    transform: scale(1);
  }
}
</style>