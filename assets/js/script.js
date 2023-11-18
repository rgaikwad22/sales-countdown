var productImages = document.querySelector(".image-list"),
  defSortBtn = document.querySelector(".def-btn"),
  lowToHighSort = document.querySelector(".low-btn"),
  highToLowSort = document.querySelector(".high-btn"),
  minPrice = document.querySelector(".start-slider"),
  maxPrice = document.querySelector(".end-slider"),
  minRange = document.querySelector(".min-range"),
  maxRange = document.querySelector(".max-range"),
  filterBtn = document.querySelector(".filter-btn"),
  showAllBtn = document.querySelector(".showall-btn"),
  filterCategory = document.querySelectorAll(".filter-category-list a");

var filterCount = 0;

var productList = [
  {
    "productName": "Smart watch",
    "price": "46",
    "minPrice": "",
    "discount": "",
    "productFilter": "wonderful",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  },
  {
    "productName": "Fitness tracker",
    "price": "25",
    "minPrice": "",
    "discount": "",
    "productFilter": "creative",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  },
  {
    "productName": "Air pods",
    "price": "76",
    "minPrice": "52",
    "discount": "-50%",
    "productFilter": "creative",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  },
  {
    "productName": "Red cap",
    "price": "55",
    "minPrice": "",
    "discount": "",
    "productFilter": "animated",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  },
  {
    "productName": "Notebook",
    "price": "23",
    "minPrice": "",
    "discount": "",
    "productFilter": "awesome",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  },
  {
    "productName": "Mouse",
    "price": "98",
    "minPrice": "",
    "discount": "",
    "productFilter": "responsive",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  },
  {
    "productName": "Media player",
    "price": "22",
    "minPrice": "",
    "discount": "",
    "productFilter": "responsive",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  },
  {
    "productName": "Phone",
    "price": "46",
    "minPrice": "",
    "discount": "",
    "productFilter": "awesome",
    "imgUrl": "https://dummyimage.com/215x215/000/fff"
  }
]

var countDownDate = new Date("Sep 5, 2023 1:44:25").getTime();

var countDownTimer = setInterval(function () {
  var now = new Date().getTime(),
    distance = countDownDate - now,
    days = Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var daysCount = document.querySelector(".days"),
    hoursCount = document.querySelector(".hours"),
    minutesCount = document.querySelector(".minutes"),
    secCount = document.querySelector(".seconds");

  daysCount.innerHTML = days;
  hoursCount.innerHTML = hours;
  minutesCount.innerHTML = minutes;
  secCount.innerHTML = seconds;

  if (distance < 0) {
    clearInterval(countDownTimer);
    document.querySelector(".sale-countdown-lists").innerHTML = "EXPIRED!";
  }

}, 1000);

function showAllProducts(productList) {
  if (filterCount == 1) {
    producRemove();
    filterCount = 0;
  }

  for (var product of productList) {
    var li = document.createElement("li"),
      figure = document.createElement("figure"),
      img = document.createElement("img"),
      figCaption = document.createElement("figcaption"),
      div = document.createElement("div"),
      span = document.createElement("span"),
      minPrice = document.createElement("span"),
      discount = document.createElement("span")

    // li.dataset.product = `${product.dataProduct}`;

    img.src = `${product.imgUrl}`;
    img.alt = `${product.productName}`;

    discount.classList.add("offer-percent");
    discount.innerHTML = `${product.discount}`;

    figCaption.innerHTML = `${product.productName}`;

    div.classList.add("offer-product");
    span.classList.add("price");
    span.innerHTML = `${product.price}`;

    minPrice.classList.add("txt-line");
    minPrice.innerHTML = `${product.minPrice}`;

    if (product.discount != "" && product.minPrice != "") {
      li.append(div, span, minPrice);
      div.append(figure, discount);
      figure.append(img, figCaption)
      productImages.append(li);
    } else {
      li.append(figure, span);
      figure.append(img, figCaption);
      productImages.append(li);
    }
  }
}

function producRemove() {
  var products = document.querySelectorAll(".image-list > li");

  for (var product of products) {
    product.remove();
  }
}

// sort filter logic starts

function activeSortRemove() {
  var removeActiveSort = document.querySelector(".active-sort");
  removeActiveSort.classList.remove("active-sort");
}

// sort filter logic ends

// range filter logic starts

minRange.addEventListener("input", function () {
  if (minRange.value >= 51) {
    minRange.value = 22;
  }
  minPrice.innerHTML = minRange.value;
});

maxRange.addEventListener("input", function () {
  if (maxRange.value <= 50) {
    maxRange.value = 98;
  }
  maxPrice.innerHTML = maxRange.value;
});

var productFilter;
filterBtn.addEventListener("click", function () {
  var minPrice = minRange.value, maxPrice = maxRange.value;

  productFilter = productList.filter(product => {
    if (product.price >= minPrice && product.price <= maxPrice) {
      filterCount = 1;
      return product;
    }
  });

  showAllProducts(productFilter);

});

showAllBtn.addEventListener("click", function () {
  producRemove();
  showAllProducts(productList);
});
// range filter logic ends

// category filter logic starts

filterCategory.forEach(category =>
  category.addEventListener("click", function () {
    changeCategory(category);
  })
);

function changeCategory(cat) {
  var getCategoryData = cat.getAttribute("data-category");

  var activecat = document.querySelector(".actie-category-link");
  activecat.classList.remove("actie-category-link");

  cat.classList.add("actie-category-link");

  if (getCategoryData == "all") {
    filterCount = 1;
    showAllProducts(productList);
    return;
  }

  var filterproducts = productList.filter(function (product) {
    if (product.productFilter == getCategoryData) {
      filterCount = 1;
      return product;
    }
  });
  showAllProducts(filterproducts);
}

defSortBtn.addEventListener("click", function () {
  activeSortRemove();
  defSortBtn.classList.add("active-sort");

  producRemove();
  location.reload();
  showAllProducts(productList);
});

lowToHighSort.addEventListener("click", function () {
  activeSortRemove();
  lowToHighSort.classList.add("active-sort");

  var sort = productList.sort((x, y) => parseFloat(x.price) - parseFloat(y.price));
  producRemove();
  if(productFilter) {
    showAllProducts(productFilter);
  }else {
    showAllProducts(sort)
  }
});

highToLowSort.addEventListener("click", function () {
  activeSortRemove();
  highToLowSort.classList.add("active-sort");

  var sort = productList.sort((x, y) => parseFloat(y.price) - parseFloat(x.price));
  producRemove();
  if(productFilter) {
    showAllProducts(productFilter);
  }else {
    showAllProducts(sort)
  }
})

// category filter logic ends

window.addEventListener("load", function () {
  showAllProducts(productList);
}); 