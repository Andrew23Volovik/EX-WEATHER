<template>
  <div>
    <div class="container" v-if="isLoaded">
      <div class="app__wrapper">
        <BaseLayout class="aside">
          <div>
            <el-input
              :clearable="true"
              placeholder="City, country or region"
              v-model="searchInput"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
            <p v-if="errorMsg">{{ errorMsg }}</p>
          </div>
          <div
            class="search__wrapper"
            v-for="(city, idx) in serachCityList"
            :key="idx"
            @click="currentCity(idx)"
          >
            <div>
              <h2 class="search__wrapper__name">{{ city.name }}</h2>
              <h2 class="search__wrapper__country">{{ city.country }}</h2>
            </div>
            <h2 class="search__wrapper__region">{{ city.region }}</h2>
          </div>
          <DataTime />
        </BaseLayout>
        <BaseLayout class="wheather__card">
          <CardWeatherList
            @changeDay="onChangeDay($event)"
            :activeDayIndex="activeDayIndex"
            :counts="days"
            variant="day"
          ></CardWeatherList>
          <CardWeatherList
            :activeDayIndex="activeDayIndex"
            :counts="hourArr"
            variant="hour"
            @hover="activeArrow = $event"
            @leave="activeArrow = $event"
          >
            <arrowNext class="icon" :style="iconShow" @click="next" />
            <arrowBack class="icon__prev" :style="iconShow" @click="prev" />
          </CardWeatherList>
        </BaseLayout>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLayout from '../components/UI/BaseLayout';
import DataTime from '../components/UI/DataTime';
import CardWeatherList from '../components/CardWeatherList';
import arrowNext from '../assets/arrows/next.svg';
import arrowBack from '../assets/arrows/back.svg';

export default {
  name: 'WheatherInfoComponent',
  components: {
    BaseLayout,
    DataTime,
    CardWeatherList,
    arrowNext,
    arrowBack,
  },
  data() {
    return {
      searchInput: '',
      activeDayIndex: 0,
      isLoaded: false,
      activeArrow: false,
      page: 0,
      errorMsg: '',
      currentCityIdx: 0
    };
  },
  methods: {
    prev() {
      if (this.page > 1) this.page--;
      else this.page = 4;
    },
    next() {
      if (this.page < 4) this.page++;
      else this.page = 1;
    },
    onChangeDay(idx) {
      console.log(idx);
      this.activeDayIndex = idx;
    },
    async search() {
      const response = await this.$store.dispatch('searchLocation', {
        search: this.searchInput,
        cityIdx: this.currentCityIdx,
      });
      console.log(response);
      if (!response.length) {
        this.errorMsg = 'Fill correct location';
      } else {
        this.errorMsg = '';
      }
    },
    async currentCity(idx) {
      this.currentCityIdx = idx
      await this.search(idx);
    },
  },
  computed: {
    locationInfo() {
      return this.$store.getters.getLocationInfo;
    },
    days() {
      return this.$store.getters.getDays;
    },
    serachCityList() {
      return this.$store.getters.getSearch;
    },
    currentPage() {
      const currentHour = new Date().getHours();
      if (currentHour < 6) {
        return 1;
      } else if (currentHour < 12) {
        return 2;
      } else if (currentHour < 18) {
        return 3;
      } else {
        return 4;
      }
    },
    hourArr() {
      return this.days[this.activeDayIndex].hour.slice(
        (this.page - 1) * 6,
        this.page * 6
      );
    },
    iconShow() {
      if (this.activeArrow) {
        return { display: 'block' };
      } else {
        return { display: 'none' };
      }
    },
  },
  async created() {
    await this.$store.dispatch('getLocation');
    const lat = this.locationInfo.lat;
    const lon = this.locationInfo.lon;
    const params = lat + ',' + lon;
    await this.$store.dispatch('getWeather', params);
    this.isLoaded = true;
  },
  mounted() {
    this.page = this.currentPage;
  },
};
</script>

<style lang="scss" scoped>
div {
  z-index: 100;
}
.app__wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  padding: 25px 0;
  p {
    text-align: center;
    color: red;
    font-size: 18px;
    font-weight: 500;
  }
}

.aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wheather__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
}

.search__wrapper {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 177, 64, 0.5);
  background-color: rgba(167, 162, 169, 0.7);
  box-shadow: 2px 2px 10px 0px rgba(52, 52, 52, 0.5);
  border-radius: 20px;
  padding: 10px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    font-size: 18px;
  }
  &__country {
    font-size: 14px;
  }
  &__region {
    margin-top: 5px;
    font-size: 14px;
    text-align: center;
  }
  &:hover {
    box-shadow: 0px 0px 10px 2px rgba(32, 163, 158, 0.5);
  }
}

.icon {
  display: none;
  position: absolute;
  top: calc(50% - 25px);
  right: -22px;
  width: 35px;
  height: 35px;
  fill: $color-two;
  &:hover {
    fill: $color-five;
  }
  &__prev {
    position: absolute;
    top: calc(50% - 25px);
    right: 0;
    left: -22px;
    width: 35px;
    height: 35px;
    fill: $color-two;
    &:hover {
      fill: $color-five;
    }
  }
}
</style>