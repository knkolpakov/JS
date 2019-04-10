// PCRE - Perl Compatible Regular Expressions
const regexp1 = new RegExp('abc', 'ig');
const regexp2 = /abc/ig;

/abc/ // abc, blablabaabcblabala
/[abc]/ // a, b, c набор
/[^abc]/
/[a-zA-Z123]/ // диапазон
/\d/ // все цифры
/\D/ // все что угодно, кроме цифры
/\w/ // все латинские буквы, цифры и знак подчеркивания
/\W/
/\s/ // любой, , пробельный символ (пробел, табуляция или перевод строки)
/\S/ 
/\b/ // граница слова
/\B/