# GAN_Front
아자아자 화이팅 

### 브랜치 설명
<details>
<summary> 🌳 </summary>

* main : 메인
* gh-pages : 깃허브 페이지로 배포할 때 쓰는 브랜친데 main이랑 상태 같음요 
* develop : 기능 하나 끝날 때마다 여기로 합쳐두고 나중에 다 테스트해봐도 문제 없으면 얘를 main에 합칠 예정
* create : 작품 변환 페이지 담당하는 브랜치
* start : 시작화면 담당하는 브랜치
* drawing : 그림 1개 (drawing.js / userdrawing.js) 담당하는 브랜치
* mypage : 마이 페이지 

에반데..................................

그니까 따지자면<br/>
main<br/>
ㄴ develop<br/>
ㄴㄴ create<br/>

의 느낌입니다<br/>
(2022.08.15 login, gallery 브랜치 develop에 합침 - 기능 끝나서 합친거 아니고 너무 만든지 오래 돼서 ^^...)<br/>
(2022.08.17 create 브랜치도 develop에 합쳐버렸습니다,,,,,, 앞으로 PR은 짧게 자주 하겠ㅆ븐니다)
</details>

### 파일 설명 
<details>
<summary> 📁 </summary><br/>

|파일명|설명|
|------|---|
|Router.js|BrowserRouter를 사용한 라우팅|
|Navigation.js|상단 네비게이션 바 (소개 페이지 제외, 모든 페이지에서 보임)|
|Start.js|소개 문구, '감상하기' 들어가는 첫 페이지|
|Login.js|토큰 받아서 -> 유저정보 받아오는 파일. 실제로 화면에 그리는 건 없음 (할 거 끝나면 /join or /home 으로 넘어가서)|
|Join.js|별명 설정 페이지|
|Home.js|작품 둘러보기 페이지|
|UserPage.js|특정 유저 페이지|
|MyPage.js|마이 페이지|
|CreateDrawing.js|작품 변환 페이지|
|Drawing.js|'작품 둘러보기' 페이지에서 그림 한 개|
|UserDrawing.js|특정 유저 페이지 or 마이 페이지에서의 그림 한 개|
|LoginCode.js|__삭제 예정 (url에서 인가코드 따오는 파일인데 이제 아무 곳에서도 안 씀)__|
|LoginKey.js|로그인 api URL 따로 빼둔 파일|

</details>


### 프론트에서 할 일 정리 
<details>
<summary> 💼 </summary>

* 네비게이션
  * 디자인 (프로필 눌렀을 때 생기는 작은 모달 위치가 진자,, 이상함)
  * 클릭한 메뉴 색상 초록색으로 변경

* 시작 페이지
  * 이미지, 버튼 둘다 css 조정 필요 💥
  * ~~배경 이미지 넣기~~ - 뭔가 애니메이션이 들어가면 멋질 거 같다 그림이 변환되는거 보여준다던지
  * ~~버튼 디자인~~
  * ~~"감상하기" 버튼 -> 미술관 페이지로 이동~~
  
* 별명 페이지 
  * ~~form 태그 지우면서 거기에 있던 autoComplete 날아감 input 태그에 다시 넣기~~
  * input type=search로 바꾸기 (input에 포커스 잡힐 때는 x 버튼 떠야함) 💥
  
* 로그인 페이지 (카카오톡 로그인 API 이용)
  * ~~서버로 인가코드 전송~~
  * ~~서버에서 준 토큰으로 사용자 정보 얻어오기~~
  
* 미술관 (가로 스크롤, 나머지 사진 보이는 곳은 전부 세로 스크롤)
  * 좋아요순으로 작품 가져와서 20 * 1 로 띄우기 (새로고침 누를 때마다 다시 돌림)
    * ~~작품 1개당 좋아요, 스크랩 버튼 -> 비회원이 클릭 시 "로그인 필요" 모달 띄우기~~
  * 조회 옵션에 따라 요청 보내고 그림 배열 다시 받기 (태그 && 좋아요순or랜덤순)
  * 가로 스크롤..... [시연이가 보내준 참고 링크](https://github.com/Eunyeol-Lucas/AllofArt)
    
* 그림 상세보기 모달
  * drawing.filename 으로 이미지 링크 가져와서 img 태그 src로 넣기까지 보여줄 로딩중 만들기
  * like, bookmark 초기값 변경 (지금 무조건 false로 시작하는데 이거 내가 눌렀는지 아닌지 백에서 보내준다고 했음)
  * NFT 정보 보는 부분, 페이지 연결 (여기 뭘 넣을지/페이지 디자인이 안 나와서 일단 손 안 댔음) 
  * 상세보기 css 단위 걍 갈아엎어야 됨 창 크기랑 비례하게 해놨더니 난리구만............
  * ~~상세정보 조회 -> 생성자, 작품명, 작품 설명 (존재할 경우)~~ + 통계 정보 (NFT로 등록했을 경우)
  * ~~생성자 이름 클릭시 - 그 사람의 유저 페이지로 이동~~

* 사진 변환 페이지
  * __아래 항목 3개는 코드는 있는데 테스트가 안 된 상태 💥__
  * 조건 충족시 서버로 전송 + 변환된 작품 filename 받아오기
  * 변환 완료 -> ~~작품명(필수), 작품 설명(선택) 입력칸 생성~~ -> /drawing 으로 그림 추가 요청 보내기
  * 게시 성공하면 마이 페이지로 이동 (내가 만든 작품 확인 가능하게)
  * ~~스토리지 뒤져보고 로그인 중인지 검증하는 코드 + alert 모달 추가 (비회원이 /create url 쳐서 들어올 수 있으니까)~~
  * ~~사진 업로드 - 원본 업로드 했을 때 미리보기 비율은 원본 그대로~~
  * ~~경고 문구 : 미슐갠은 심의를 준수합니다 책임 너가 져야함 안그러면,, 못만들어 나가~~
  * ~~화풍 선택/업로드~~
 
 * 특정 유저 페이지
   * pic.slice() 기준점 정하기 (배열 길이에 따라 세로 한 줄당 들어갈 개수가 달라지니까)
   * 근데 이거 서버에 그림 요청하는 부분은 다 빠졌음 일단 받아왔다 치고 출력하는 부분만 만져둔거
   * ~~(내 페이지) 내가 생성한 작품, 내가 스크랩한 작품 모아보기~~
   * ~~(남 페이지) 그 사람이 생성한 작품 모아보기~~ 
   
 * 마이 페이지
   * 배열 2개 (내 작품 저장용, 스크랩 작품 저장용) 전부 []로 선언해두고 useEffect 에서 새로 받아올 동안 로딩중 만들어두기
   
     * 지금은 내가 안에 값 직접 넣어둠
     
</details>

### 뭔가 하고는 있는데 아직 완성 안 된 부분 
<details>
<summary> 😖 </summary>
 
* 필터 값 바뀌면 -> 서버에서 이미지 받아와서 -> pictures 배열에 세팅하고 싶은데 useEffect 내에서 setState 하면 무한루프 돌아버림 
    * useEffect(... , [changeFilter]) : changeFilter는 select 태그의 onChange 이벤트 함수, 그냥 그 안에서 filter 찍으면 한 박자씩 느려서 useEffect 쓰던거였음  

* 네비게이션 선택된 메뉴 색상 변경

    * 원인/해결
    
      * [참고](https://blog.hoseung.me/2021-12-07-do-not-use-link/)
      
      > react-router에서 내부적으로 사용하는 RouterContext때문에 history change event가 일어날 때마다 계속 리렌더링이 일어난다는 겁니다. (...) __Navigation이나 Tab Bar같이 Switch 바깥에 있는 UI 컴포넌트들은 이런 문제에 영향을 크게 받을 수 있습니다__
      
      * Navigation.js 에서 useNavigate()를 사용중. 근데 그걸 사용하는 컴포넌트는 __무조건 Router 안에 존재해야함__
        
      * 아직 해결 못함 ^^.. 결국 네비게이션의 리렌더링을 막아야 된다는건 알았음 
      
  * 삽질 과정
  
      * i) 원래 소개 페이지(Start.js)에는 네비게이션이 없어서, 거길 제외한 각 컴포넌트에서 매번 Navigation을 import 해서 쓰던 중<br/>
      ➡ 각 페이지마다 네비게이션이 달려있는 것 때문에 페이지 바뀔 때마다 네비게이션도 같이 리렌더링 되는 줄 알았음<br/>
      ➡ 페이지 내부의 Navigation을 지우고 Router.js 에서 한번만 넣어줌<br/>
      (Start.js 에서 네비게이션이 보이는건 position:absolute + top:0 + left:0 으로 배경 사진이 네비게이션을 가리게 함)
     
      

* ~~redux : dispatch로 변수 값 수정했는데 유지가 안 됨~~
    * 삽질 과정
    
      * i) reducer 안에서 state 값 직접 변경 -> state는 읽기 전용이라 이러면 에러 (state mutation이 감지되었다 어쩌고)
      
      * ii) action 에 넣고 보낸 값을 reducer에서 받아서 새 객체 만들고 return -> 실패~ 여전히 유지 안 됨
      
    * 원인/해결
    
      * 새로고침 할 때나 다른 페이지로 갈 때 state 가 초기화 되는 건 원래 유지가 안 되는게 기본인가봄<br/>
      그래서 Login.js -> Join.js / Home.js 로 갈 때는 잠깐 유지되다가~ 거기서 새고 or 다른 페이지로 가면 날아갔던 거였음<br/>
      그럴 때도 유지 시키고 싶으면 __redux-persist__ 패키지를 쓰면 된다고 한다!! 
      
      * 해결 끝 ! 아래 공부 ➡ redux-persist 참고

* ~~카카오톡 로그인~~
  * ~~로그인 -> 인가코드 발급 -> 토큰 받아오기까지 성공, 사용자 정보 받아오는 부분에서 막혔음~~
  
    * 오늘의 감자같은 행동<br/><br/>
    오빠가 말한거: 액세스 토큰을 서버로 보내서 유저정보 받아와라 (=/member/me 헤더로 넣고 받아와라)<br/>
    내가 이해한 거: 액세스 토큰을 서버로 보내서 유저정보 받아와라 (=/oauth2/authorization/kakao 헤더로 넣고 받아와라)

    * 눈물나는 삽질 과정 
    
      * i) /oauth2/authorization/kakao 로 보내면 당연히 전혀 다른 응답만 보임
      * ii) 여기 아닌가 보네 그럼 어디지 -> /member/me 에는 파라미터 넣는 곳이 없네 -> 아닌가보다
      * iii) kapi.kakao.com/v2/user/me 로 보내보자 -> token is too long ^^~~~~~~<br/>
      ㄴ 당연함 백엔드에서 쓰는 토큰이 한 3배 기니까 그쪽 서버에선 당연히 그 토큰 보내봤자 사용자 정보 안주지.......


* ~~미술관 페이지~~
  * ~~상세보기 모달 열었을 때 버튼 배경이 아래처럼 잡히는 현상~~ ➡ 버튼 배경 투명으로 지정해서 해결<br/>
  ![image](https://user-images.githubusercontent.com/87255462/183278318-bfdd7290-9140-470e-81cf-90748308676b.png)

  * ~~상세보기 모달 내 name이 모두 0으로 뜨는 중 -> 콘솔에 찍을 때는 자기 번호로 잘 나오는데 whyrano.......~~
  * ~~Drawing 컴포넌트끼리 seeNFT 값이 유지되는 것 같음 -> OpenSea 정보가 디폴트로 닫혀있어야 하는데 열려있음 도랏나~~
    * 눈물나는 삽질 과정 (나중에 복습할 땐 굵은 글씨만 봐도 됨)
    
      * i) 인자로 준 name을 못 가져오는 줄 알고 Drawing 컴포넌트 여기저기서 name 콘솔로 찍어서 값 확인함
      * ii) 정확히는 이미지 클릭할 때까지 (상세보기 모달 열 때) name은 정상인데 닫을 때는 name이 또 0으로 찍히던 중
      * iii) 알고보니 name을 잘못 가져오는게 아니라 __무슨 그림을 눌러도 상세보기 모달이 그림 0의 모달로 뜨던중__ ^^~~~
      
    * 원인 / 해결
      * 이미지 클릭, 모달 닫기 등에서 요소는 다음과 같이 가져옴 (상세보기 모달의 id=zoom-modal, className=drawing-modal)<br/>
      이때, 같은 id 여러 개 있으면 첫번째 들고옴 (=그림 0의 모달) -> 이러니까 __id는 고유값으로 지정하라는거임 중복 생기면 지정이 안되니까__
      ```javascript
      const modal = document.getElementById("zoom-modal"); // id가 줌-모달인 요소 하나
      ```
      * 아래와 같이 수정함
      ```javascript
      const modal = document.getElementsByClassName("drawing-modal")[name]; // className이 드로잉-모달인 배열에서 name번째 요소
      ```
</details>

--- 
### 공부 아자아자 화이팅 

<details>
<summary> 📚 </summary>

 <details>
 <summary> Redux </summary>
 
  * [공식문서](https://ko.redux.js.org/introduction/getting-started/)
  * 왜 써야 하는지 : state를 전역적으로 관리할 수 있게 됨<br/>
  컴포넌트끼리 순차적으로 전달전달해서 쓰지 않고 필요한 곳에서 바로 읽어오게 ◠‿◠ <br/>
  (현재는 Link의 state 속성으로 인가코드를 전달해서 받아 쓰거나,
  그 시점의 url에서 인가코드 부분만 추출해서 사용중 -> 비효율적)

  * 어디 적용할 건지 : 당장은 로그인에서 리다이렉트 될 때 생기는 인가코드(code), 이후에는 사용자 정보 (아마도)

  * 어떻게 쓰는건지 - [🍎](https://www.youtube.com/watch?v=QZcYz2NrDIs&t=194s) 참고

    0. 필요한 파일을 설치한다 (npm i redux react-redux @reduxjs/toolkit)

    1. index.js를 아래와 같이 수정한다
    ```javascript
    import { Provider } from 'react-redux';
    import { configureStore } from '@reduxjs/toolkit'; //영상 속 createStore를 대체함

    const code = "인가코드"; // 전역적으로 관리할 변수

    function myReducer(state = code, action){ // action(컴포넌트에서 보내는 수정 요청) 에 따라 state를 변경
        if(action.type === '클릭'){
          state = "인가코드 (버튼 클릭함)";
          return state;
        }
        else 
          return state;
    }

    const store = configureStore({ reducer: myReducer});

    root.render(
        <Provider store={store}> 
          <App />
        </Provider>
    );
    ```

    2. state를 사용할 컴포넌트를 아래와 같이 수정한다
    ```javascript
    import { useSelector, useDispatch } from 'react-redux';

    function componentName() {
      const code = useSelector( (state) => state ); // state를 가져와서 저장
      const dispatch = useDispatch(); // state 변경하고 싶을 때 요청 보내는 함수

      return (
        <div>
          { code }
          <button onClick={() => { dispatch({type : '클릭'}) }}> 버튼! </button>
        </div>
      );
    }
    ```
</details>
    
<details>
 <summary> Redux-persist </summary>
 
 * 왜 써야하는지 : redux만 쓰면 새로고침, 다른 창에서 값 유지가 안됨
   * Login.js -> Join.js 들어가서 새로고침하면 유저 정보 날아가던거

* 어디 적용할 건지 : index.js 수정

* 어떻게 쓰는건지 - [📹](https://www.youtube.com/watch?v=09g4ieXJ3rE) 참고

0. 필요한 파일을 설치한다 (npm i redux-persist)
1. index.js를 아래와 같이 수정한다 (redux만 썼을 때에서 추가하는거임 저거만 쓰는거 아니고)

```javascript
import { persistStore, persistReducer } from 'redux-persist'; // 추가
import storageSession from 'redux-persist/lib/storage/session';
import { applyMiddleware } from 'redux'; // 추가
import { PersistGate } from 'redux-persist/integration/react'; // 추가

const persistConfig = {
  key : root,
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, myReducer);
const store = configureStore({reducer : persistedReducer}, applyMiddleware());
const Persistor = persistStore(store);

root.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <App />
        </PersistGate>
      </Provider>
);
```

* sessionStorage vs localStorage

  * sessionStorage 

    * 해당 탭 하나!! 내에서만 유지됨 (다른 탭끼리 공유 ㄴㄴ)<br/>

  * localStorage

    * origin이 같은 탭끼리는 다 공유함 (근데 해보니까 완전 실시간은 아니고 탭1에서 변경하면 탭2에서 새고 한번 해야 보임) 
 
</details>
 
<details>
  <summary> BrowserRouter </summary>

  * 왜 써야 하는지 : 현재는 HashRouter를 사용중인데, 이 경우 특정 컴포넌트를 띄울 때 url에 #이 붙게됨<br/># 들어간 url은 redirect 주소로 등록할 수 없게 되어있어서 HashRouter를 쓰면 안됨 ('fragment는 허용하지 않습니다')
    * 근데 왜 처음에 HashRouter를 썼는지 : 써본게 그거 밖에 없어서 자연스럽게 그걸로 했음 반성하겠읍니다 <br/>

  * 어디 적용할 건지 : Router.js
</details>
 
<details>
  <summary> CORS 정책  </summary><br/>
  
  * [참고한 자료](https://coding-groot.tistory.com/91)
  
  * 원인: 나는 localhost:3000 에서 실행중인데 다른 origin (여기서는 https://api.missulgan.art/~) 로 요청 보내서 받아오려고 함 </br>
  ➡ 브라우저가 보안 상의 이유로 냅다 막아버릴거고 콘솔에 아래 에러 메시지 뜨면 cors다 
  
  ```javascript
  Access to XMLHttpRequest at 'https://api.missulgan.art/member/me' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  ```

  * 어떻게 해결하는지 : http-proxy-middleware 사용해서 해결함 다른 방법도 있겠지만,, 그냥 이걸로 했음</br> 
  ```javascript
  //설치 후 src/setupProxy.js 생성
  const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '이주소로보낸요청은',
        createProxyMiddleware({
            target: '이주소로바꿔서보내줌',
            changeOrigin: true,
        })
    );
}; 
  ```
  자세한 방법은 login 브랜치 PR -> 커밋 [e492c69](https://github.com/MISSUL-GAN/GAN_Front/commit/e492c69b1b0071362734352a0c1f598a5697657a) 코멘트 참고 

  * [참고](https://about-tech.tistory.com/entry/Programming-CORS%EB%9E%80-preflight-OPTIONS-%EB%A9%94%EC%86%8C%EB%93%9C)
  
    * 프론트에서 미들웨어 안 쓸거면 백엔드에서 해결 가능이다 이열....
</details>


<details>
<summary> spa-gh-pages </summary>

  * [참고](https://github.com/sujinleeme/spa-github-pages-ko)
  * [참고 2](https://velog.io/@ausg/gh-pages-react-router)
  * 왜 써야하는지 
    * > ... 깃허브 페이지는 SPA를 지원하지 않습니다. 예를 들어 URL이 example.tld/foo이고 /foo가 프론트엔드 경로인 경우, 깃허브 페이지 서버는 /foo를 모르기 때문에 404 에러를 반환합니다. ...

    * 지금 배포해둔 https://missulgan.art 에서도 /home 에서 새고하면 404 발생
    
      ![image](https://user-images.githubusercontent.com/87255462/184100999-b597cb43-b752-4ac7-a8c5-70784e132f19.png)

  * 어떻게 수정할건지 (이미 해서 pr 올려주셨음 ^^,,,, 허거덩덩,,,,)
  0. 404.html 추가 - /home 같은 url을 쿼리로 변경
  1. index.html 수정 - 🔼 그걸 여기서 받아서 올바른 url로 변경함
  2. Router.js 수정 (커스텀 도메인 없이 배포 할 때 해야 하는 과정, 지금은 필요 X)<br/>

  ```javascript
  return( 
        <Router basename="/reponame">
        </Router>
    );
  ```
</details>

<details>
<summary> 컴포넌트 리렌더링과 변수 </summary>

* 내부 변수 : 컴포넌트가 리렌더링 될 때마다 초기화 됨 (다시 선언됨)

* useState : 값이 변화하면 컴포넌트가 리렌더링 된다 

* useRef : current.value가 변화해도 컴포넌트가 리렌더링 되지 않는다.<br/>변경된 value는 다른 이유로(state가 변경된다던지) 컴포넌트가 리렌더링 될 때 보여진다

* 결론 : 변수를 선언할 땐 위 내용을 고려해서 선언하자 생각을 안 하고 내부 변수만 막 쓰려는 버릇이 있어,,,,,,,,,,,,<br/>
리렌더링 될 때도 값을 유지해야하면 state/ref 둘 중 하나 쓰면 될 듯 이건 뇌피셜인데 값을 화면에 보여주는 경우는 변경된 값을 바로 보여줘야하니까 state 쓰면 되는데 굳이 출력 안 하고 내부에서만 쓰는거면 ref 써도 되.......지 않을까?...

</details>

<details>
<summary> multipart/form-data </summary>

* [참고](https://velog.io/@shin6403/HTTP-multipartform-data-%EB%9E%80)

  * > ...이미지 파일을 전송한다고 해서 이메일에 첨부파일을 붙여 메일을 보내는 것처럼 png나 jpg 파일 자체가 전송되는 것이 아니다. 이미지 파일을 문자로 생성하여 HTTP request body에 담아 서버로 전송하는 것이다. ...

<br/>

* 왜 써야 하는지: http request body의 타입은 1개만 명시 가능<br/>
➡ 근데 난 content-type이 다른 데이터를 같이 보내야 함. (이미지/텍스트)<br/>이때 하나의 body 안에 여러 종류의 데이터를 구분해서 넣는 방법이 multipart 타입이다~!

  * ```javascript headers: { "Content-Type": "multipart/form-data", } ```

<br/>

* 혹은 이미지를 base64로 인코딩 ➡ JSON 으로 전송하는 방식도 존재

  ||multipart/form-data|base64|
  |---|---|---|
  |용량|(상대적으로) 작다|크다|
  |인코딩 오버헤드|X|O|
  |연관관계 표현|제한적|용이함|

</details>

</details>


