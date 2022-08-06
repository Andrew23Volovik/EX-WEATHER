<template>
  <div class="time__wrapper">
    <div class="time__time">
      <div>{{ time }}</div>
    </div>
    <div class="time__data">
      <h2>{{ date }} {{ currentDayOfWeek }}</h2>
      <h2>{{ currentMonth }}, {{ year }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTimeComponent',
  data() {
    return {
      date: null,
      year: null,
      dayWeek: null,
      time: null,
    };
  },
  methods: {
    setTime() {
      const today = new Date();
      this.date = today.getDate();
      this.year = today.getFullYear();

      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();

      hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
      minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
      seconds = seconds <= 9 ? `${seconds}`.padStart(2, 0) : seconds;
      let session = 'AM';
      if (hours == 0) {
        hours = 12;
      }

      if (hours > 12) {
        hours = hours - 12;
        session = 'PM';
      }

      this.time = hours + ' : ' + minutes + ' : ' + seconds + ' ' + session;
    },
  },
  computed: {
    currentMonth() {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const currentMonth = new Date().getMonth();

      return months[currentMonth];
    },
    currentDayOfWeek() {
      const days = [
        'Monday',
        'Thusday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
      const today = new Date().getDay() - 1;

      return days[today];
    },
  },
  created() {
    setInterval(() => {
      this.setTime();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.time__wrapper {
  padding: 10px;
  background: rgba(167, 162, 169, 0.8);
  border-radius: 10px;
  border: 1px solid $color-six;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .time__time {
    display: flex;
    font-size: 32px;
    font-weight: 600;
  }
  .time__data {
    display: flex;
    h2 {
      font-weight: 500;
      font-size: 20px;
      &:first-child {
        margin-right: 28px;
      }
    }
  }
}
</style>