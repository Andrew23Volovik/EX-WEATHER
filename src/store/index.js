import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locationInfo: null,
    weatherDaysInfo: null,
    currentCity: null,
    searchLocation: null,
  },
  getters: {
    getLocationInfo(state) {
      return state.locationInfo;
    },
    getDays(state) {
      return state.weatherDaysInfo;
    },
    getCity(state) {
      return state.locationInfo.currentCity;
    },
    getSearch(state) {
      return state.searchLocation;
    },
  },
  mutations: {
    setLocationInfo(state, payload) {
      state.locationInfo = payload;
    },
    setWeatherDaysInfo(state, payload) {
      state.weatherDaysInfo = payload;
    },
    setSearchLocation(state, payload) {
      state.searchLocation = payload;
    },
  },
  actions: {
    async getLocation({ commit }) {
      const response = await fetch(
        'https://ipgeolocation.abstractapi.com/v1/?api_key=8f4363db941440a5901e6a78c88a2d8c'
      );
      const data = await response.json();
      const payload = {
        lat: data.latitude,
        lon: data.longitude,
        currentCity: data.city,
      };
      commit('setLocationInfo', payload);
    },
    async getWeather({ commit }, payload) {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=e0e70dd023cc4d26bfd83715222607&q=${payload}&days=3`
        );
        const data = await response.json();
        commit('setWeatherDaysInfo', data.forecast?.forecastday);
      } catch (error) {
        console.log('get weather');
      }
    },
    async searchLocation({ dispatch, commit }, payload) {
      const response = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=e0e70dd023cc4d26bfd83715222607&q=${payload.search}`
      );

      const data = await response.json();
      if (!data.length) return data;

      const params =
        data[payload.cityIdx].lat + ',' + data[payload.cityIdx].lon;

      dispatch('getWeather', params);
      commit('setLocationInfo', {
        lat: data[payload.cityIdx].lat,
        lon: data[payload.cityIdx].lon,
        currentCity: data[payload.cityIdx].name,
      });
      commit('setSearchLocation', data.slice(0, 6));

      return data;
    },
  },
  modules: {},
});
