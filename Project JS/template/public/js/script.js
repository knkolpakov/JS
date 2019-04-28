// APP
let API_URL = 'http://localhost:3000';

const app = new Vue({
  el: '#app',
  data: {
    searchQuery: '',
    filterValue: '',
    cart: [],
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
    },
    quantityTotal(){
        return this.cart.reduce((acc, item) => acc + item.quantity, 0);
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
    }
  }
});
//END APP

//COMPONENTS

Vue.component('product-item', {
    props: ['item'],
    template: `
      <div class="item">
        
        <div class="addcart" @click.prevent="handleBuyClick(item)">
                    <a href="shoppingcart.html">
                    
                        <img src="images/addcart.png" alt="">
                        
                        <div>Add to Cart</div>
                    </a>
                </div>
                
                <img :src="item.img" alt="">
                
                <div>
                <div class="dis">{{item.name}}</div>
                
                </div>
                <div class="price">
                \${{item.price}}
                
                </div>
      </div>
    `,
    methods: {
      handleBuyClick(item) {
        this.$emit('onBuy', item);
      }
    }
  });
  
  Vue.component('goods', {
    props: {query:{
      type:Array,
      required:true,
    },
    size:{
      type:Number,
      required:false,
      default: 3
    },
    },
    methods: {
      handleBuyClick(item) {
        this.$emit('onbuy', item);
      },
      nextPage(){
        this.pageNumber++;
     },
     prevPage(){
       this.pageNumber--;
     },
    },
    data() {
      return {
        items: [], pageNumber: 0, 
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
      },
      pageCount(){
        return Math.ceil(this.items.length/this.size);
      },
      paginatedData(){
        const start = this.pageNumber * this.size,
              end = start + this.size;
        return this.items.slice(start, end);
      },
    },
    mounted() {
      fetch(`${API_URL}/products`)
        .then(response => response.json())
        .then((items) => {
          this.items = items;
        });
    },
    // TO DO
    template: `
      <div class="items">
        <product-item v-for="entry in paginatedData" :item="entry" @onBuy="handleBuyClick"></product-item>
        {{pageNumber + 1}}
        <div>
                <button 
                    :disabled="pageNumber === 0" 
                    @click="prevPage">
                    Previous
                </button>
                <button 
                    :disabled="pageNumber >= pageCount -1" 
                    @click="nextPage">
                    Next
                </button>
                </div>
      </div>
    `,
  });

  //SCROLL CART
  Vue.component('scroll-cart-item', {
   props:['item'], 
   template:`
    <div>
    
    <div class="products">
    <div class="productinfo">
        <div class="productfoto">
        <img :src="item.img" alt="foto">
        </div>
        <div class="producttext">
            <div>{{ item.name }}</div>
            <div>Color:<span>Red</span></div>
            <div>Size:<span>Xll</span></div>
        </div>
    </div>
    
        <div>{{ item.quantity }}</div>
        <div>
            <img src="images/x.png" @click="app.handleDeleteClick(item)" alt="foto">
        </div>
      
    </div>
   `,
  })
  
  Vue.component('cart-sc', {
    props:['cart'],
    template:`
        <div>
        
            <div class="scroll-cart-rowname">
                <div>Product Details </div>
                <div>Quantity</div>
                <div>ACTION</div>
            </div>
            <div class="scroll-cart-goods">
            <scroll-cart-item v-for="entry in cart" :item="entry"></scroll-cart-item>
            </div>
        
        </div>
      `
  });

  Vue.component('cart-item', {
    props:['item'], 
    template:`
    <div class="products">
    <div class="productinfo">
        <div class="productfoto">
        <img :src="item.img" alt="foto">
        </div>
        <div class="producttext">
            <div>{{ item.name }}</div>
            <div>Color:<span>Red</span></div>
            <div>Size:<span>Xll</span></div>
        </div>
    </div>
    <div>{{ item.price }}</div>
    <div>{{ item.quantity }}</div>
    <div>FREE</div>
    <div>{{ item.price * item.quantity }}</div>
    <div>
    <img src="images/x.png" @click="app.handleDeleteClick(item)" alt="foto">
    </div>
</div>
    `,
   })
   
   Vue.component('cart', {
     props:['cart'],

     template:`
         <div>
             <cart-item v-for="entry in cart" :item="entry"></cart-item>
         </div>
       `
   });


   Vue.component('cart-sc',{
    data(){
      
      return {
        pageNumber: 0, 
      }
    },
    props:{
      cart:{
        type:Array,
        required:true
      },
      size:{
        type:Number,
        required:false,
        default: 3
      },
    },
    methods:{
        nextPage(){
           this.pageNumber++;
        },
        prevPage(){
          this.pageNumber--;
        }
    },
    computed:{
      pageCount(){
        return Math.ceil(this.cart.length/this.size);
      },
      paginatedData(){
        const start = this.pageNumber * this.size,
              end = start + this.size;
        return this.cart.slice(start, end);
      },

    
    },
    template: `<div class="container">
    <div class="scroll-cart-rowname">
    <div>Product Details </div>
    <div>Quantity</div>
    <div>ACTION</div>
</div>
<div class="scroll-cart-goods">
<cart-item v-for="entry in paginatedData" :item="entry"></cart-item>
</div>
                 
                 {{pageNumber + 1}}
                <button 
                    :disabled="pageNumber === 0" 
                    @click="prevPage">
                    Previous
                </button>
                <button 
                    :disabled="pageNumber >= pageCount -1" 
                    @click="nextPage">
                    Next
                </button>
               </div>
    `
  });

  
  
  

//END COMPONENTS