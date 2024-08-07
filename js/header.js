const $loginBtn = document.querySelector(".login-btn");
const $shopingCartBtn = document.querySelector(".shoping-cart-btn");
const $modal = document.querySelector(".modalContainer");
const $logOutBtn = document.querySelector(".logout-btn");

// 화면 로드 시 토큰 보유 확인 후 이벤트 처리
document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    $loginBtn.querySelector("span").innerText = "마이페이지";
    $loginBtn.href = "#";
    $loginBtn.classList.add("mypage-btn");
    $loginBtn.classList.remove("login-btn");
  } else {
    $loginBtn.querySelector("span").innerText = "로그인";
    $loginBtn.href = "login.html";
    $loginBtn.classList.add("login-btn");
    $loginBtn.classList.remove("mypage-btn");
  }
});

let isLoginBtnClicked = false;

// 로그인(마이페이지) 버튼을 클릭했을 때 이벤트
$loginBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // window로 이벤트가 전파되는것을 막음

  isLoginBtnClicked = isLoginBtnClicked ? false : true;
  $modal.classList.toggle("hidden");

  // 마이페이지 버튼 색상 변경
  if (isLoginBtnClicked) {
    $loginBtn.querySelector("span").style.color = "#21BF48";
    $loginBtn.querySelector("img").src = "./assets/icon-user-clicked.svg";
  } else {
    $loginBtn.querySelector("span").style.color = "#767676";
    $loginBtn.querySelector("img").src = "./assets/icon-user.svg";
  }
});

// 모달이 떴을때 모달 바깥쪽을 클릭했을 때 모달이 사라지는 이벤트
window.addEventListener("click", (e) => {
  if (isLoginBtnClicked) {
    isLoginBtnClicked = false;
    $modal.classList.add("hidden");
    $loginBtn.querySelector("span").style.color = "#767676";
    $loginBtn.querySelector("img").src = "./assets/icon-user.svg";
  }
});

// 모달창 내부 클릭 시 클릭 이벤트가 window로 전파되지 않도록 막음
$modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

// 로그아웃 요청 함수
const logout = async () => {
  try {
    const res = await fetch("https://openmarket.weniv.co.kr/accounts/logout/");

    if (res.ok) {
      localStorage.removeItem("authToken");
      location.href = "index.html"; // 로그아웃 후 메인 페이지로 이동
    } else {
      const errorData = await res.json();
      console.log(errorData);
    }
  } catch (error) {
    console.error("로그아웃 요청 중 오류 발생:", error);
  }
};

// 로그아웃 버튼 클릭 시 로그아웃
$logOutBtn.addEventListener("click", (e) => {
  logout();
});
