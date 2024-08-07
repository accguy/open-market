const $productList = document.querySelector(".product-list");
const $pagination = document.querySelector(".pagination");
let currentPage = 1;

// 데이터 불러와서 화면에 전체 상품 띄우는 함수
const getData = async (page) => {
  const res = await fetch(
    `https://openmarket.weniv.co.kr/products/?page=${page}`
  );
  if (res.ok) {
    const data = await res.json();
    const productList = data.results;
    productList.forEach(rederItem);
    const numOfPages = Math.ceil(data.count / 15); // 상품 목록 페이지 수 계산
    renderPagination(numOfPages); // 페이지네이션 생성
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
  $price.innerText = product.price.toLocaleString();

  $product.classList.add("product-item");
  $productImg.classList.add("product-img");
  $storeName.classList.add("store-name");
  $productName.classList.add("product-name");
  $price.classList.add("price");

  $product.append($link);
  $link.append($productImg, $storeName, $productName, $price);
  $productList.append($product);
};

// 처음 로딩했을때 화면 출력
getData(currentPage);

// 페이지네이션 생성 및 기능 구현
const renderPagination = (numOfPages) => {
  for (let i = 0; i < numOfPages; i++) {
    const $li = document.createElement("li");
    $li.classList.add("page-link");
    $li.innerText = $li.value = i + 1;

    // 현재 페이지 강조 표시
    if (i + 1 === currentPage) {
      $li.style.fontSize = "25px";
      $li.style.color = "#21BF48";
      $li.style.textDecorationLine = "underline";
    }
    $pagination.appendChild($li);
  }

  // 페이제 링크 클릭 시 currentPage 값 변경 후 상품 렌더링
  const $pageLinks = document.querySelectorAll(".page-link");
  $pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      currentPage = link.value;
      $pagination.innerHTML = "";
      $productList.innerHTML = "";
      getData(currentPage);
      window.scrollTo(0, 0);
    });
  });
};
