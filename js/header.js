const $loginButton = document.querySelector(".login-btn");
const $shopingCartButton = document.querySelector(".shoping-cart-btn");
const $modal = document.querySelector(".modalContainer");

// 화면 로드 시 토큰 보유 확인 후 이벤트 처리
document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    $loginButton.querySelector("span").innerText = "마이페이지";
    $loginButton.href = "#";
    $loginButton.classList.add("mypage-btn");
    $loginButton.classList.remove("login-btn");
  } else {
    $loginButton.querySelector("span").innerText = "로그인";
    $loginButton.href = "login.html";
    $loginButton.classList.add("login-btn");
    $loginButton.classList.remove("mypage-btn");
  }
});

let isLoginBtnClicked = false;

// 로그인(마이페이지) 버튼을 클릭했을 때 이벤트
$loginButton.addEventListener("click", (e) => {
  e.stopPropagation(); // window로 이벤트가 전파되는것을 막음

  isLoginBtnClicked = isLoginBtnClicked ? false : true;
  $modal.classList.toggle("hidden");

  // 마이페이지 버튼 색상 변경
  if (isLoginBtnClicked) {
    $loginButton.querySelector("span").style.color = "#21BF48";
    $loginButton.querySelector("img").src = "./assets/icon-user-clicked.svg";
  } else {
    $loginButton.querySelector("span").style.color = "#767676";
    $loginButton.querySelector("img").src = "./assets/icon-user.svg";
  }
});

// 모달창 바깥을 클릭했을 때 모달창이 사라지는 이벤트
window.addEventListener("click", (e) => {
  if (isLoginBtnClicked && !$modal.contains(e.target)) {
    isLoginBtnClicked = false;
    $modal.classList.add("hidden");
    $loginButton.querySelector("span").style.color = "#767676";
    $loginButton.querySelector("img").src = "./assets/icon-user.svg";
  }
});
