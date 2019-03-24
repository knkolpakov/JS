/*
// 1 задание
// Создовать единицу товара в карзине

class cart{
  constructor()
}
// Создовать список карзины
class cartList{
  constructor(){

  }

  sumCart() {} // считать стоимость товаров
  productIndex() {} // определять индекс товара в карзине для удаления товаров 

}
*/

// 2 задание
class Item {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }

    render() {
      return `<div class="item"><h2>${this.name}</h2><span>${this.price}</span></div>`
    }
  }

  class ItemsList {
    constructor() {
      this.items = [];
    }

    fetchItems() {
      this.items = [
        { name: 'iPhone X', price: 70000 },
        { name: 'Стекло', price: 1000 },
        { name: 'Чехол', price: 4000 },
      ];

      this.items = this.items.map(item => new Item(item.name, item.price)); 
    }

    render() {
      const itemsHtmls = this.items.map(item => item.render());
      return itemsHtmls.join('');
    } 
    // Добавил подсчет стоимости товаров
    count(){
        let count = 0;
        for (let i = 0; this.items.length > i; i++){
            count += (this.items[i].price)
        }
        return count;
    }
  }

  const items = new ItemsList();
  items.fetchItems();

  document.querySelector('.goods-list').innerHTML = items.render() + '<br>';
  document.querySelector('.goods-count').innerHTML = 'Cумма товаров: ' + items.count();