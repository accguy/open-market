const $inputAll = document.querySelectorAll("input");
const $inputId = document.querySelector(".input-id");
const $inputPw = document.querySelector(".input-pw");
const $loginBtn = document.querySelector(".login-btn");
const $p = document.createElement("p");
const $buyerBtn = document.querySelector(".buyer-btn");
const $sellerBtn = document.querySelector(".seller-btn");
const $memberBtns = [$buyerBtn, $sellerBtn];

// 페이지 로딩시 id에 포커스
window.onload = function () {
  $inputId.focus();
};

// 로그인 버튼 클릭시 이벤트
$loginBtn.addEventListener("click", (e) => {
  $p.classList.add("error-message");
  if (!$inputId.value) {
    $p.innerText = "아이디를 입력해주세요.";
    $inputPw.after($p);
    $inputId.focus();
  } else if (!$inputPw.value) {
    $p.innerText = "비밀번호를 입력해주세요.";
    $inputPw.after($p);
    $inputPw.focus();
  } else {
    console.log($inputId.value, $inputPw.value);
    login();
  }
});

let loginType = "BUYER";
// 판매 회원으로 로그인 클릭시 이벤트
$sellerBtn.addEventListener("click", () => {
  loginType = "SELLER";
  console.log(loginType);
});
// 구매 회원으로 로그인 클릭시 이벤트
$buyerBtn.addEventListener("click", () => {
  loginType = "BUYER";
  console.log(loginType);
});

// 구매자, 판매자 선택시 버튼 스타일 변경 이벤트
$memberBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    document.querySelector(".active").classList.remove("active");
    button.classList.add("active");
  });
});

// 인풋창에 다시 입력 시작 시 오류메시지 삭제
$inputId.addEventListener("input", (e) => {
  $p.remove();
});
$inputPw.addEventListener("input", (e) => {
  $p.remove();
});

// 로그인 요청 함수
const login = async () => {
  const res = await fetch("https://openmarket.weniv.co.kr/accounts/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: $inputId.value,
      password: $inputPw.value,
      login_type: loginType,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    history.back();
  } else if (res.status === 401) {
    const errorData = await res.json();
    console.log(errorData);
    $p.innerText = "아이디 또는 비밀번호가 일치하지 않습니다.";
    $inputPw.after($p);
    $inputPw.value = null;
    $inputPw.focus();
  } else {
    const errorData = await res.json();
    console.log(errorData);
  }
};
