const authToken = localStorage.getItem("authToken");
const $cartItemList = document.querySelector(".cart-item-list");
const $emptyCartSign = document.querySelector(".nothing-in-cart");
const $cartModal = document.querySelector(".cart-modal");
const $insertHere = document.querySelector(".insert-here");

// url로 접근했을때 예외 처리
if (!authToken) {
  window.alert("로그인이 필요한 서비스입니다.");
  window.location.href = "login.html";
}

// 헤더 장바구니 아이콘 색상변경
const $headerCartBtn = document.querySelector(".shoping-cart-btn");
$headerCartBtn.querySelector("span").style.color = "#21BF48";
$headerCartBtn.querySelector("img").src =
  "./assets/icon-shopping-cart-clicked.svg";

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
        cartItemList.forEach(renderItem);
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
const renderItem = async (item) => {
  const $li = document.createElement("li");
  $li.classList.add("cart-item");
  const productInfo = await getProductInfo(item.product_id);
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

let isModalOpened = false;
// 장바구니 수량 조절 및 삭제 모달창 이벤트 리스너
$cartItemList.addEventListener("click", (e) => {
  const $target = e.target;
  console.log($target);

  if (!isModalOpened) {
    if (
      $target.className === "decrease-btn" ||
      $target.className === "increase-btn"
    ) {
      isModalOpened = true;
      $cartModal.classList.toggle("hidden");
      $cartModal.classList.toggle("flex");
      document.body.classList.toggle("scroll-stop");
      $insertHere.innerHTML = `
      <div class="product-quantity-controls">
        <button class="decrease-btn"></button>
        <input
          class="quantity-input"
          type="number"
          name="quantity"
          value="1"
          disabled
        />
        <button class="increase-btn"></button>
      </div>
      `;
      $cartModal.style.gap = "26px";
    } else if ($target.className === "delete-btn" || isModalOpened === 0) {
      isModalOpened = true;
      $cartModal.classList.toggle("hidden");
      $cartModal.classList.toggle("flex");
      document.body.classList.toggle("scroll-stop");
      $insertHere.innerHTML = `<p>상품을 삭제하시겠습니까?</p>`;
      $cartModal.style.gap = "40px";
    } else {
      console.log("다른거 클릭됨");
    }
    console.log(isModalOpened);
  } else if (isModalOpened) {
    if (!e.target.contains($cartModal)) {
      isModalOpened = false;
      $cartModal.classList.toggle("hidden");
      $cartModal.classList.remove("flex");
      document.body.classList.toggle("scroll-stop");
    }
  }
});

// 모달창 내부 클릭 시 클릭 이벤트가 window로 전파되지 않도록 막음: OK
$cartModal.addEventListener("click", (e) => {
  e.stopPropagation();
});
$cartItemList.addEventListener("click", (e) => {
  e.stopPropagation();
});

// 모달이 떴을때 모달 바깥쪽을 클릭했을 때 모달이 사라지는 이벤트
window.addEventListener("click", (e) => {
  if (isModalOpened) {
    isModalOpened = false;
    $cartModal.classList.toggle("hidden");
    $cartModal.classList.remove("flex");
    document.body.classList.remove("scroll-stop");
    console.log("window");
  }
});

getCart();
