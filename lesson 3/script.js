
// Обернул в промис (1 задание)
function sendRequest(url, callback) {
  return new Promise((resolve, reject) => {
      
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
      xhr.open("GET", url, true);
      xhr.onload = () => resolve(callback(xhr.responseText));
      xhr.send();
    });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

    class Item {
      constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
      }

      render() {
        return `<div class="item">
          <div class="name">
          <h2>${this.product_name}</h2>
          </div>
          <div class="price">
          <span>${this.price}</span>
          </div>
          <button>Купить</button>
        </div>`
      }
    }

    class ItemsList {
      constructor() {
        this.items = [];
      }

      fetchItems() {
        sendRequest(`${API_URL}/catalogData.json`, (good) => {
          this.items = JSON.parse(good);
          this.render();
        });
      }

      count() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
      }

      render() {
        let listHtml = '';
        this.items.forEach((item) => {
            const goodItem = new Item(item.product_name, item.price);
             listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('.goods-count').innerHTML = 'Cумма товаров: ' + this.count();
        console.log(this.items);
        
    }
      
    }

    const list = new ItemsList();
    list.fetchItems() 
    
      
      

    class Cart{
      constructor(){}
    }
    // Создовать список карзины
    class CartItem{
      constructor(product_name, price, id, quantity){
        this.product_name = product_name;
        this.price = price;
        this.id = id;
        this.quantity = quantity;
        
    
      }

      render(){
        return `<div class="cart-item">
          <div class="name">
          <h2>${this.product_name}</h2>
          </div>
          <div class="price">
          <span>${this.price}</span>
          </div>
          <span></span>
          <button>Купить</button>
        </div>`
      }
    }

    class CartList{
      constructor(){
        this.cart = [];
      }

      fetchCart(){}

      addCart(){
       document.querySelector('.item').addEventListener('click', function(){
        let add;
        list.items.forEach(function(item) {
            if(id == item.id) {
              add = {
                    id: item.id,
                    product_name: item.product_name,
                    price: item.price,
                    
                }
            }
        });
        this.cart.push(add);
        this.sumCart();
      });
      }

      productIndex() {} 

      sumCart() {
        return this.cart.reduce((acc, item) => acc + item.price, 0);
      }

      render(){
        const cartsHtml = this.cart.map(item => item.render());
        return cartsHtml.join('');
      }


    }

    
    const cart = new CartList();
    cart.fetchCart() 
    cart.addCart();
    document.querySelector('.cart').innerHTML = 'Cумма товаров: ' + cart.sumCart();
    
    console.log(this.cart)
    

  
  