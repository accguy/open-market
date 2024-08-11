document.querySelector("header").innerHTML = `
<div class="header">
  <!-- <h1>HODU</h1> -->
  <div class="logo-search-container">
    <a class="header-logo" href="./index.html">
      <img src="./assets/Logo-hodu.png" alt="HODU" />
    </a>
    <div class="seach-bar">
      <input type="text" placeholder="상품을 검색해보세요!" />
      <button></button>
    </div>
  </div>

  <ul class="nav-bar">
    <li>
      <a class="shoping-cart-btn" href="login.html">
        <img src="./assets/icon-shopping-cart.svg" alt="" /><span
          >장바구니</span
        >
      </a>
    </li>
    <li>
      <a class="login-btn" href="login.html">
        <img src="./assets/icon-user.svg" alt="" /><span>로그인</span>
        <div class="modalContainer hidden">
          <button>마이페이지</button>
          <button class="logout-btn">로그아웃</button>
        </div>
      </a>
    </li>
  </ul>
</div>`;
