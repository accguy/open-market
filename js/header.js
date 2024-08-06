document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  const $loginButton = document.querySelector(".login-btn");

  if (authToken) {
    $loginButton.querySelector("span").innerText = "마이페이지";
    $loginButton.href = "index.html"; // 마이페이지 링크로 변경
  } else {
    $loginButton.querySelector("span").innerText = "로그인";
    $loginButton.href = "login.html"; // 로그인 페이지 링크로 변경
  }
});
