const app = new Vue({
  el: '#app',
  data: {
    name: 'Dmitry',
    dbs: [
      {title: 'MySQL', weight: 13},
      {title: 'MongoDB', weight: 10},
      {title: 'Redis', weight: 1},
      {title: 'RethinkDB', weight: 3},
    ],
  },
  methods: {
    handleButtonClick() {
      const title = prompt('Input title');
      const weight = prompt('Input weight');
      this.dbs.push({ title, weight });
    }
  },
  mounted() {
    alert('mounted');
  },
  computed: {
    transformedName() {
      return ('Mr.' + name).toUpperCase();
    }
  }
});