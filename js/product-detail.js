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

// 데이터 불러와서 화면에 전체 상품 띄우는 함수
const getData = async (id) => {
  const res = await fetch(`https://openmarket.weniv.co.kr/products/${id}`);
  if (res.ok) {
    const data = await res.json();
    displayData(data);
  } else {
    const errorData = await res.json();
    console.log(errorData);
  }
};

const product = getData(productId);

const displayData = (product) => {
  $productImg.src = product.image;
  $storeName.innerText = product.store_name;
  $productName.innerText = product.product_name;
  $price.innerText = product.price.toLocaleString();
  $shipping.innerText =
    product.shipping_method === "PARCEL"
      ? "택배배송 / 무료배송"
      : "직접전달(화물배송)";
};
