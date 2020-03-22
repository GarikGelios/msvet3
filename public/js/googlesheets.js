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

        //потом создаём продукт в этом блоке
        showProducts(data, categoryIdValue, i);
      } else {
        //или сразу создаём продукт в уже имеющимся блоке
        showProducts(data, categoryIdValue, i);
      }
    }
  }

  //функция для создания одного продукта
  showProducts = (data, categoryIdValue, i) => {
      //находим нужную категорию продукта и вставляем туда продукт
      const categoryRow = document.getElementById(categoryIdValue);
      const card = `
      <div class="col col-md-3 mb-4">
        <div class="card h-100">
        <img src="${data[i]['gsx$img']['$t']}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data[i]['gsx$product']['$t']}</h5>
            <p class="card-text">${data[i]['gsx$title']['$t']}</p>
          </div>
        </div>
      </div>
      `;
      categoryRow.insertAdjacentHTML('afterbegin', card);
  }

};