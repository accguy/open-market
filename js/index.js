const $productList = document.querySelector(".product-list");

// 데이터 불러와서 화면에 전체 상품 띄우는 함수
const getData = async () => {
  const res = await fetch("https://openmarket.weniv.co.kr/products/");
  if (res.ok) {
    const data = await res.json();
    const productList = data.results;
    productList.forEach(rederItem);
  } else {
    const errorData = await res.json();
    console.log(errorData);
  }
};

// 상품 한개씩 렌더링 해주는 함수
const rederItem = (product) => {
  const $product = document.createElement("li");
  const $link = document.createElement("a");
  const $productImg = document.createElement("img");
  const $storeName = document.createElement("p");
  const $productName = document.createElement("p");
  const $price = document.createElement("p");

  // $link.href = "product.html";
  $productImg.src = product.image;
  $storeName.innerText = product.store_name;
  $productName.innerText = product.product_name;
  $price.innerText = product.price;

  $product.classList.add("product-item");
  $productImg.classList.add("product-img");
  $storeName.classList.add("store-name");
  $productName.classList.add("product-name");
  $price.classList.add("price");

  $product.append($link);
  $link.append($productImg, $storeName, $productName, $price);
  $productList.append($product);
};

getData();
