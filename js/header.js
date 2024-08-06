document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  const $loginButton = document.querySelector(".login-btn");
  const $mypageButton = document.querySelector(".mypage-btn");

  if (authToken) {
    $loginButton.querySelector("span").innerText = "마이페이지";
    $loginButton.href = "index.html"; // 마이페이지 링크로 변경
    $loginButton.classList.add("mypage-btn");
    $loginButton.classList.remove("login-btn");
  } else {
    $mypageButton.querySelector("span").innerText = "로그인";
    $mypageButton.href = "login.html"; // 로그인 페이지 링크로 변경
    $mypageButton.classList.add("login-btn");
    $mypageButton.classList.remove("mypage-btn");
  }
});
