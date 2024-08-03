// - 아이디나 비밀번호가 일치하지 않거나,
// - 아이디나 비밀번호를 입력하지 않은 채 로그인 버튼을 누르면 경고 문구가 나타납니다.
// - 입력 창 아래에 경고창이 나타나면 로그인 버튼을 눌러도 로그인 되지 않습니다.
// - 입력 창에 입력이 안된 부분이 존재한 채로 로그인 버튼을 누르면 입력되지 않은 입력 창에 focus 이벤트가 작동하고 로그인은 되지 않습니다.
// - 아이디나 비밀번호가 일치하지 않는다면, 비밀번호 입력창에 focus이벤트가 발생하고 빈칸이 됩니다.
// - 로그인이 성공할 시, 로그인하기 이전 페이지로 이동합니다.
// - 구매자 : 구매 회원 로그인 탭을 클릭하면 구매 회원으로 로그인합니다.
// - 판매자 : 판매 회원 로그인 탭을 클릭하면 판매 회원으로 로그인합니다.

// 1. 로그인 버튼을 누르면 인풋창에 입력된 값을 확인한다.
// 2. id가 입력되지 않은 경우 & 둘다 입력하지 않은 경우: 아이디를 입력해주세요.
// 3. pw가 입력되지 않은 경우: 비밀번호를 입력해주세요.
// 4. 입력된 값이 없거나 아이디, 비밀번호가 일치하지 않는경우에
//    비밀번호 인풋창 아래에 p 태그 추가해서 케이스에 맞는 오류 메시지 삽입후 추가.
// 5. 다시 사용자가 인풋창에 입력중이면 오류 메시지(p 태그) 삭제
const $inputAll = document.querySelectorAll("input");
const $inputId = document.querySelector(".input-id");
const $inputPw = document.querySelector(".input-pw");
const $loginBtn = document.querySelector(".login-btn");
const $p = document.createElement("p");

// 로그인 버튼 클릭시 이벤트
$loginBtn.addEventListener("click", (e) => {
  $p.classList.add("error-message");
  if (!$inputId.value) {
    $p.innerText = "아이디를 입력해주세요.";
    $inputPw.after($p);
  } else if (!$inputPw.value) {
    $p.innerText = "비밀번호를 입력해주세요.";
    $inputPw.after($p);
  } else {
    console.log($inputId.value, $inputPw.value);
    // $p.remove();
    login();
  }
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
      login_type: `BUYER`,
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
  } else {
    const errorData = await res.json();
    console.log(errorData);
  }
};
