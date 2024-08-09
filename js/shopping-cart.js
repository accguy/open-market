const authToken = localStorage.getItem("authToken");
const $cartItemList = document.querySelector(".cart-item-list");
const $emptyCartSign = document.querySelector(".nothing-in-cart");

// url로 접근했을때 예외 처리
if (!authToken) {
  window.alert("비정상적인 접근방식입니다. 로그인 먼저 해주세요!");
  window.location.href = "login.html";
}

//  장바구니 데이타 불러오기(GET)
const getCart = async () => {
  try {
    const res = await fetch("https://openmarket.weniv.co.kr/cart/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.count === 0) {
        return;
      } else {
        const cartItemList = data.results;
        $cartItemList.removeChild($emptyCartSign);
        cartItemList.forEach(rederItem);
      }
    } else if (res.status === 401) {
      const errorData = await res.json();
      console.log(errorData);
      if (!authToken) {
        window.alert("로그인이 필요한 서비스입니다.");
        window.location.href = "login.html";
      }
    } else {
      const errorData = await res.json();
      console.log(errorData);
    }
  } catch (error) {
    console.error("장바구니 불러오기 요청 중 오류 발생:", error);
  }
};

// 상품 한개씩 렌더링 해주는 함수
const rederItem = async (item) => {
  const $li = document.createElement("li");
  const productInfo = await getProductInfo(item.product_id);
  $li.classList.add("cart-item");
  $li.innerHTML = `
  <input type="checkbox" name="" id="" />
    <div class="img-info-container">
      <img src=${productInfo.image} alt="" />
      <div class="product-info">
        <p class="store-name">${productInfo.store_name}</p>
        <p class="product-name">${productInfo.product_name}</p>
        <p class="price">${productInfo.price.toLocaleString()}원</p>
        <p class="shipping">${
          productInfo.shipping_method === "PARCEL"
            ? "택배배송 / 무료배송"
            : "직접전달(화물배송)"
        }</p>
      </div>
    </div>
    <div class="product-quantity-section">
      <div class="product-quantity-controls">
        <button class="decrease-btn"></button>
        <input
          class="quantity-input"
          type="number"
          name="quantity"
          value=${item.quantity}
          disabled
        />
        <button class="increase-btn"></button>
      </div>
    </div>
    <div class="price-order-container">
      <p>${(item.quantity * productInfo.price).toLocaleString()}원</p>
      <button class="order-btn">주문하기</button>
      <button class="delete-btn"></button>
    </div>`;
  $cartItemList.appendChild($li);
};

// 상품 1개의 데이터를 불러오는 함수
const getProductInfo = async (id) => {
  const res = await fetch(`https://openmarket.weniv.co.kr/products/${id}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    console.log(errorData);
  }
};

getCart();
