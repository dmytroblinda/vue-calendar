import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')

Vue.filter('returnDate', function (oldValue) {
  let dateArr = oldValue.split('-');
  return dateArr.length === 3 ? dateArr[2]+'.'+dateArr[1]+'.'+dateArr[0] : 'noCorrectDate';
});