const API_URL = 'http://localhost:3000';

Vue.component('product-item', {
  props: ['item'],
  template: `
    <div class="item">
      <h2>{{item.name}}</h2>
      <span>{{item.price}}</span>
      <button @click.prevent="handleBuyClick(item)">Buy</button>
    </div>
  `,
  methods: {
    handleBuyClick(item) {
      this.$emit('onBuy', item);
    }
  }
});

Vue.component('products', {
  props: ['query'],
  methods: {
    handleBuyClick(item) {
      this.$emit('onbuy', item);
    },
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    filteredItems() {
      if(this.query) {
        const regexp = new RegExp(this.query, 'i');
        return this.items.filter((item) => regexp.test(item.name));
      } else {
        return this.items;
      }
    }
  },
  mounted() {
    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then((items) => {
        this.items = items;
      });
  },
  template: `
    <div class="goods">
      <product-item v-for="entry in filteredItems" :item="entry" @onBuy="handleBuyClick"></product-item>
    </div>
  `,
});

Vue.component('cart-item', {
 props:['item'], 
 template:`
  <div>
    {{ item.name }} ({{ item.quantity }})
    <button @click="app.handleDeleteClick(item)">x</button>
  </div>
 `,
 
})

Vue.component('cart', {
  props:['cart', 'visible'],
  template:`
      <div class="cart" v-bind:style="{display: visible}">
        <cart-item v-for="entry in cart" :item="entry"></cart-item>
      </div>
    `,
});
Vue.component('search', {
  props:['value'],
  template:`
    <input type="text" 
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)" 
    class="search-text" />
  `,
});

const app = new Vue({
  el: '#app',
  data: {
    searchQuery: '',
    filterValue: '',
    cart: [],
    isVisibleCart: 'none',
  },
  mounted() {
    fetch(`${API_URL}/cart`)
      .then(response => response.json())
      .then((items) => {
        this.cart = items;
      });
  },
  computed: {
    total() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
  },
  methods: {
    handleDeleteClick(item) {
      if (item.quantity > 1) {
        fetch(`${API_URL}/cart/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: item.quantity - 1 }),
        })
          .then((response) => response.json())
          .then((item) => {
            const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
            Vue.set(this.cart, itemIdx, item);
          });
      } else {
        fetch(`${API_URL}/cart/${item.id}`, {
          method: 'DELETE',
        })
          .then(() => {
            this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
          });
      }
    },
    handleSearchClick() {
      this.filterValue = this.searchQuery;
    },
    handleBuyClick(item) {
      const cartItem = this.cart.find((entry) => entry.id === item.id);
      if (cartItem) {
        // товар в корзине уже есть, нужно увеличить количество
        fetch(`${API_URL}/cart/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: cartItem.quantity + 1 }),
        })
          .then((response) => response.json())
          .then((item) => {
            const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
            Vue.set(this.cart, itemIdx, item);
          });
      } else {
        // товара в корзине еще нет, нужно добавить
        fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...item, quantity: 1 })
        })
          .then((response) => response.json())
          .then((item) => {
            this.cart.push(item);
          });
      }
    },
    VisibleCart(){
      switch(this.isVisibleCart){
        case ('none'):
            this.isVisibleCart = 'block'
            break;
        case ('block'):
        this.isVisibleCart = 'none'
            break
        };
  },
    
  }
});