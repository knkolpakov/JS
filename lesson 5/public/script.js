const app = new Vue({
    el: '#app',
    data: {
      items: [],
      filteredItems: [],
      cart: [],
      searchQuery: '',
      isVisibleCart: 'none',
    },
    mounted() {
      fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then((items) => {
          this.items = items;
          this.filteredItems = items;
          this.cart = cart;
        });
    },
    methods: {
      
      handleSearchClick() {
        const regexp = new RegExp(this.searchQuery, 'i');
        this.filteredItems = this.items.filter((item) => regexp.test(item.name));
      },

      VisibleCart(){
          switch(this.isVisibleCart){
            case ('none'):
                this.isVisibleCart = 'block'
                break;
            case ('block'):
            this.isVisibleCart = 'none'
                break
            }
        
      }
    }
  })