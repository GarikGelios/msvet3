//проверяем, что документ готов
document.addEventListener("DOMContentLoaded", ready);

//ссылка на таблицы Google
const urlDocs = "https://spreadsheets.google.com/feeds/list/";
//уникальный номер таблицы
const sheetsId = "1dziTjA-eZib8b4g3UerdVD55DW-VjYhauQYd8NIpQ18";
//ссылка с параметром, чтобы получить json по ревой странице
const urlParams = "/1/public/full?alt=json";

//собираем во единую ссылку
const endpoint = urlDocs + sheetsId + urlParams;

function ready() {

//вариант получения json с jQuery
// $.getJSON(endpoint, function (data) {
//     //first row "title" column
//     console.log(data.feed.entry);
// });

//сложный вариант получения json с JavaScript
//собираем функцию для XML запроса
var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

//запрашиваем json
  getJSON(endpoint,
  function (err, data) {
    if (err !== null) {
      alert('Something went wrong: ' + err);
    } else {
      data = data.feed.entry;
      console.log(data);  

      showCategory(data);
    }
  });

  //определяем в DOM элемент в который будем встраивать продукты
  const products = document.getElementById('products');
  //определяем в DOM элемент в который будем встраивать пункты меню для категорий
  const scrollspymenu = document.getElementById('scrollspymenu');

  //проверяем категории
  showCategory = (data) => {
    for (let i=0; i < data.length; i++){
      //создаём из номера категории id для блока
      let categoryId = data[i].gsx$categoryid.$t;
      let categoryIdValue = 'category' + categoryId;
      
      //ищем такой id в DOM
      let categoryIs = document.getElementById(categoryIdValue);

      //если такого id в DOM нету, то создаём его
      if (categoryIs == null) {
        let article = document.createElement('article');
        article.setAttribute("id", categoryIdValue);
        article.className = "row row-cols-1 row-cols-md-2 mt-5";
        products.append(article);

        //создаём пункт в меню scrollspy
        showMenu(data, categoryIdValue, i);
        console.log(data[i]['gsx$published']);
        //проверяем разрешение на публикаци продукта
        if(data[i]['gsx$published']['$t'] == 1){
          console.log(data[i]['gsx$published']);
          //потом создаём продукт в этом блоке 
          showProducts(data, categoryIdValue, i);
        }

      } else {
        //или сразу создаём продукт в уже имеющимся блоке
        //проверяем разрешение на публикаци продукта
        if(data[i]['gsx$published']['$t'] == 1){
          //потом создаём продукт в этом блоке 
          showProducts(data, categoryIdValue, i);
        }
      }
    }
  }

  //функция для создания одного продукта
  showProducts = (data, categoryIdValue, i) => {
      //находим нужную категорию продукта и вставляем туда продукт
      const categoryRow = document.getElementById(categoryIdValue);
      const card = `
      <div class="col col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100">
        <img src="${data[i]['gsx$img']['$t']}" class="card-img-top" alt="${data[i]['gsx$product']['$t']}">
            <div class="card-body">
            <h5 class="card-title">${data[i]['gsx$product']['$t']}</h5>
            <p class="card-text">${data[i]['gsx$title']['$t']}</p>
          </div>
        </div>
      </div>
      `;
      categoryRow.insertAdjacentHTML('beforeEnd', card);
  }

  //добавляем пункт в меню scrollspy
  showMenu = (data, categoryIdValue, i) => {
    const scrollspybutton = `
      <li class="nav-item">
        <a class="nav-link px-4 py-2" href="#${categoryIdValue}">${data[i]['gsx$category']['$t']}</a>
      </li>
    `;
    scrollspymenu.insertAdjacentHTML('beforeEnd', scrollspybutton);
  }


};