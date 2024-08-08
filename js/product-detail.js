// URL에서 쿼리 파라미터를 가져오는 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
// 상품 ID 가져오기
const productId = getQueryParam("id");

// 상품 정보
const $productImg = document.querySelector(".product-img");
const $storeName = document.querySelector(".store-name");
const $productName = document.querySelector(".product-name");
const $price = document.querySelector(".price");
const $shipping = document.querySelector(".shipping");
let numPrice = 0;
let numStock = 1;

// 데이터 불러와서 화면에 전체 상품 띄우는 함수
const getData = async (id) => {
  const res = await fetch(`https://openmarket.weniv.co.kr/products/${id}`);
  if (res.ok) {
    const data = await res.json();
    numPrice = data.price;
    numStock = data.stock;
    displayData(data);
  } else {
    const errorData = await res.json();
    console.log(errorData);
  }
};

// 상품 정보 출력
const displayData = (product) => {
  $productImg.src = product.image;
  $storeName.innerText = product.store_name;
  $productName.innerText = product.product_name;
  $price.innerText = product.price.toLocaleString();
  $totalPrice.innerText = product.price.toLocaleString();
  $shipping.innerText =
    product.shipping_method === "PARCEL"
      ? "택배배송 / 무료배송"
      : "직접전달(화물배송)";
};

// 구매 개수 사용자 입력
const $quantityControl = document.querySelector(".product-quantity-controls");
const $quantityInput = document.querySelector(".quantity-input");

const $quantity = document.querySelector(".quantity");
const $totalPrice = document.querySelector(".total-price");

// 버튼 클릭으로 수량 변경
$quantityControl.addEventListener("click", (e) => {
  // (-)버튼 클릭시
  if (e.target.className === "decrease-btn") {
    if ($quantityInput.value > 1) {
      $quantityInput.value--;
    }
    updateQuantityAndPrice();
  }
  // (+)버튼 클릭시
  else if (e.target.className === "increase-btn") {
    if ($quantityInput.value < numStock) {
      $quantityInput.value++;
    }
    updateQuantityAndPrice();
  }
});

// 수량 및 총 가격 업데이트 함수
const updateQuantityAndPrice = () => {
  $quantity.innerText = $quantityInput.value;
  $totalPrice.innerText = ($quantityInput.value * numPrice).toLocaleString();
};

const product = getData(productId);

// 하단 탭메뉴 선택시 색상 변경 이벤트
const $tapMenuBtns = document.querySelectorAll(".tap-menu button");
$tapMenuBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    document.querySelector(".active").classList.remove("active");
    button.classList.add("active");
  });
});
