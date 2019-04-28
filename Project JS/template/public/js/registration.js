//REGISTRATION
const API_URL_U = 'http://localhost:3000';
const us = new Vue({
    el: '#users',
    data: {
      username: '',
      name: '',
      phone: '',
      password: '',
      email: '',
      credit_card: '',
      bio: '',
      gender: '',
      users: '',
      isFakeVisible: true,

    },
  mounted() {
    fetch(`${API_URL_U}/users`)
      .then(response => response.json())
      .then((items) => {
        this.users = items;
      });
  },
  methods:{
  addUsers(){
    const username = this.username;
    const name = this.name;
    const phone = this.phone;
    const email = this.email;
    const credit_card = this.credit_card;
    const gender = this.gender;
    const bio = this.bio;
    const password = this.password;
    const regexp_name = /[a-zа-я]/;
    const regexp_phone = /^\+\d{1,3}\(\d{3}\)\d{3}-\d{4}$/;
    const regexp_email = /^([A-Za-z0-9\.-]+)(@)([A-Za-z0-9\.-]+)(\.)([A-Za-z0-9\.-]{2,})$/;
    const regexp_cart = /^\d{4} \d{4} \d{4} \d{4}$/;
    const required = 'Обязательное поле'
    if(username == ''){
        document.querySelector('.massage').innerHTML = required;
    } else{
    if(regexp_name.test(username) && regexp_phone.test(phone) && regexp_email.test(email) && regexp_cart.test(credit_card) == true){
        document.querySelector('.massage').innerHTML = null;
        fetch('/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, phone, password, email, credit_card, gender, bio, name }),
          })
            .then((response) => response.json())
            .then((item) => {
                this.users.push(item);
            });
    };
};
    
  },
  deleteUsers(){
    if (event.target.classList.contains('remove')) {
        if (confirm('Are u sure?')) {
          const id = event.target.dataset.id;

          fetch(`/users/${id}`, { method: 'DELETE' })
            .then(() => {
              $contacts.removeChild(event.target.parentElement);
            });
        }
      }
  }
  },
});



