# GAN_Front
아자아자 화이팅 

[미슐갠](https://missulgan.art/) 가서 로그인 시도하면 안되는거 맞습니다
왜냐면 LoginKey.js 안에 선언된 redirect url이 localhost로 걸려있으니까..... 나중에 바꾸겠음

### 브랜치 설명
<details>
<summary> 🌳 </summary>

* main : 메인
* gh-pages : 깃허브 페이지로 배포할 때 쓰는 브랜친데 main이랑 상태 같음요 
* develop : 기능 하나 개발 끝날 때마다 여기로 합쳐두고 나중에 다 테스트해봐도 문제 없으면 얘를 냅다 main에 합칠 예정
* create : 작품 변환 페이지 담당하는 브랜치
* gallery : '작품 둘러보기' 담당하는 브랜치

그니까 따지자면<br/>
main<br/>
ㄴ develop<br/>
ㄴㄴ create<br/>
ㄴㄴ gallery<br/>
ㄴㄴ ...<br/>

의 느낌입니다
</details>

### 파일 설명 
<details>
<summary> 📁 </summary>

* Router.js : BrowserRouter를 사용한 라우팅
* Navigation.js : 상단 네비게이션 바 (소개 페이지 제외, 모든 페이지에서 보임)
* Start.js : 소개 문구, '감상하기' 들어가는 첫 페이지
* Home.js : 작품 둘러보기 페이지
* UserPage.js : 마이 페이지
* CreateDrawing.js : 작품 변환 페이지 
* Drawing.js : '작품 둘러보기' 페이지에서 그림 한 개!!! <br/><br/>

* Login.js : 카카오 로그인 버튼 있는 페이지였지만 더이상 사용하지 않습니다...........
</details>


### 프론트에서 할 일 정리 
<details>
<summary> 💼 </summary>

* 시작 페이지
  * 배경 이미지 넣기 - 뭔가 애니메이션이 들어가면 멋질 거 같다 그림이 변환되는 그런거~~ 우왕
  * 서비스 소개 문구 넣기 
  * "감상하기" 버튼 -> 무조건 미술관 페이지로 이동 
  
* 로그인 페이지 (카카오톡 로그인 API 이용)
  * 서버로 인가코드 전송, 유저 정보 받아오기 
  
* 미술관 (가로 스크롤, 나머지 사진 보이는 곳은 전부 세로 스크롤)
  * 랜덤으로 12개의 작품 가져와서 20 * 1 로 띄우기 (새로고침 누를 때마다 랜덤 다시 돌림)
    * 작품 1개당 좋아요, 스크랩 버튼 -> 비회원이 클릭 시 "로그인 필요" 토스트 메시지 띄우기
    * 작품 1개 클릭 = 상세정보 조회 -> 생성자, 작품명, 작품 설명 (존재할 경우), 통계 정보 (NFT로 등록했을 경우)
      * 생성자 이름 클릭시 - 그 사람의 마이 페이지로 이동

 
* 사진 변환 페이지
  * 사진 업로드 - 원본 업로드 했을 때 미리보기 비율은 원본 그대로 
  * 경고 문구 : 미슐갠은 심의를 준수합니다 책임 너가 져야함 안그러면,, 못만들어 나가
  * 화풍 선택
  * 변환 성공 시 -> 작품명(필수), 작품 설명(선택) 입력칸 생성 -> 게시 -> 다하면 어디로 가..지 둘러보기?
 
 * 마이 페이지
   * (내 마이 페이지) 내가 생성한 작품, 내가 좋아요 한 작품 모아보기
   * (남의 마이 페이지) 그 사람이 생성한 작품 모아보기 

</details>

### 뭔가 하고는 있는데 아직 완성 안 된 부분 
<details>
<summary> 😖 </summary>

* 시작 페이지
  * 배경 이미지 임시로 넣어둠

* 미술관 페이지
  * 그림 하나 클릭하면 -> 숨어있던 확대 (지금은 작게 해뒀지만) 모달이 나오는데 이걸 화면에 꽉!! 차게 해야함
  * 서버에서 그림 받아와서 pictures 배열에 저장하는 코드 추가해야함 지금은 임시 이미지로 퉁쳐둔거
  * 상세보기 모달 내 name이 모두 0으로 뜨는 중 -> 콘솔에 찍을 때는 자기 번호로 잘 나오는데 whyrano.......
  * 상세보기 모달이 현재 스크롤 위치에서 열려야 하는데 무조건 상단에 열리는 중
    * 근데 내가 모달 떴을 때 배경 스크롤 막아놔서 지금 3번 그림부터는 모달 닫기가 안되는 상황임 어라,,,,
  
 * 사진 변환 페이지
   * 사진 업로드 - 미리보기 : 이거 근데 아직 확실히 모르겠음 ㅜ머가 어떻게 돌아가는거냐!!
   * 화풍 선택을 라디오 버튼으로 해놨는데 이미지 클릭해도 선택되게 하고싶음

</details>

### 한 일 
<details>
<summary> 😎 </summary>

* 시작 페이지
  * 소개 문구 넣어둠
  * '감상하기' 버튼 클릭 시 미술관 페이지로 이동
  
* 카카오톡 로그인 API
  * 로그인 후 인가코드 발급 성공 시 -> 미술관 페이지로 리다이렉트중
  
* 상단 네비게이션바
  * '작품 둘러보기', '작품 만들기', 'MY', '로그인(로그아웃)' 메뉴 생성 (페이지 이동 됨)
  * 비회원 상태에서 "MY", "작품 만들기" 클릭 시 Alert 발생하면서 카카오톡 로그인 페이지로 보내줌
  
</details>


--- 
### 공부 아자아자 화이팅 

<details>
<summary> 📚 </summary>

 <details>
 <summary> Redux - [공식문서](https://ko.redux.js.org/introduction/getting-started/) </summary>

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
  <summary> BrowserRouter </summary>

  * 왜 써야 하는지 : 현재는 HashRouter를 사용중인데, 이 경우 특정 컴포넌트를 띄울 때 url에 #이 붙게됨<br/># 들어간 url은 redirect 주소로 등록할 수 없게 되어있어서 HashRouter를 쓰면 안됨 ('fragment는 허용하지 않습니다')
    * 근데 왜 처음에 HashRouter를 썼는지 : 써본게 그거 밖에 없어서 자연스럽게 그걸로 했음 반성하겠읍니다 <br/>

  * 어디 적용할 건지 : Router.js
</details>

</details>


