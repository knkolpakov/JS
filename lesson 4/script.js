const $text = document.querySelector('.text');

document.querySelector('.res').addEventListener('click', ()=> {
  let str = $text.value;
  const regexp = / '\b|\b' /g;
  document.querySelector('.output-text').innerHTML = str.replace(regexp, '\"');
});

//Проверка ввода

const $name = document.querySelector('#name');
const $phone = document.querySelector('#phone');
const $email = document.querySelector('#email');
const massage = 'Неоходимо ввести в формате ';
const m_name = 'Name';
const m_phone = '+7(123)454-2323';
const m_email = 'example@site.ru';
const required = 'Обязательное поле'

document.querySelector('.reg-btn').addEventListener('click', ()=> {
  //Проверка ввода имени
  let str_name = $name.value;
  console.log(str_name)
  const regexp_name = /[a-zа-я]/;

  if(str_name == ''){
      document.querySelector('#name').classList.add('active');
      document.querySelector('.massage-name').innerHTML = required;
  } else {
      if(regexp_name.test(str_name) == true){
        document.querySelector('#name').classList.remove('active');
        document.querySelector('.massage-name').innerHTML = null;
    } else{
        document.querySelector('#name').classList.add('active');
        document.querySelector('.massage-name').innerHTML = massage + m_name;
    }
  }
  

  //Проверка ввода телефона
  let str_phone = $phone.value;
  console.log(str_phone)
  const regexp_phone = /^\+\d{1,3}\(\d{3}\)\d{3}-\d{4}$/;
  
  if(str_phone == ''){
    document.querySelector('#phone').classList.add('active');
    document.querySelector('.massage-phone').innerHTML = required;
  } else {
    if(regexp_phone.test(str_phone) == true){
      document.querySelector('#phone').classList.remove('active');
      document.querySelector('.massage-phone').innerHTML = null;
    } else{
      document.querySelector('#phone').classList.add('active');
      document.querySelector('.massage-phone').innerHTML = massage + m_phone;
    }
  }
  

  // Проверка Email
  let str_email = $email.value;
  console.log(str_email)
  const regexp_email = /^([A-Za-z0-9\.-]+)(@)([A-Za-z0-9\.-]+)(\.)([A-Za-z0-9\.-]{2,})$/;
  
  if(str_email == ''){
    document.querySelector('#email').classList.add('active');
    document.querySelector('.massage-email').innerHTML = required;
  } else {
    if(regexp_email.test(str_email) == true){
      document.querySelector('#email').classList.remove('active');
      document.querySelector('.massage-email').innerHTML = null;
    } else{
      document.querySelector('#email').classList.add('active');
      document.querySelector('.massage-email').innerHTML = massage + m_email;
    }
  }
});







