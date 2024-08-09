const authToken = localStorage.getItem("authToken");

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
        cartItemList.forEach((x) => console.log(x));
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

getCart();
