# GAN_Front
아자아자 화이팅 

### 파일 설명 
<details>
<summary> 📁 </summary>

* Router.js : 라우팅용인데 나중에 가면 지울듯 어차피.. 여기서 안할거라
* Navigation.js : 상단 네비바
* Start.js : 소개 문구랑 '감상하기' 들어가는 첫 페이지
* Login.js : 카카오 로그인 버튼 있는 페이지 / 로그인 안 하고 갤러리로 넘어갈 수 있음
* Home.js : 작품 둘러보기 페이지
* UserPage.js : 마이 페이지
* CreateDrawing.js : 작품 변환 페이지 
* Drawing.js : '작품 둘러보기' 페이지에서 그림 한 개!!! 

</details>


### 프론트에서 할 일 정리 
<details>
<summary> 💼 </summary>

* 시작 페이지
  * 배경 이미지 넣기 - 뭔가 애니메이션이 들어가면 멋질 거 같다 그림이 변환되는 그런거~~ 우왕
  * 서비스 소개 문구 넣기 - 노션에 세현이가 적어준거 복붙
  * "감상하기" 버튼 -> 미술관 페이지로 이동 
  
* 로그인 페이지 (카카오톡 로그인 API 이용)
  * 서버로 인가코드 전송, 유저 정보 받아오기 
  * 로그인 성공 시 -> 미술관 페이지로 리다이렉트
  * "로그인 없이 둘러볼래요" 버튼 -> 클릭 시 미술관 페이지로 이동
  
* 미술관
  * 랜덤으로 12개의 작품 가져와서 4 * 3 으로 띄우기 (새로고침 누를 때마다 랜덤 다시 돌림)
    * 작품 1개당 좋아요, 스크랩 버튼 -> 비회원이 클릭 시 "로그인 필요" 토스트 메시지 띄우기
    * 작품 1개 클릭 = 상세정보 조회 -> 작품명, 작품 설명 (존재할 경우), 통계 정보 (NFT로 등록했을 경우)
  
* 사진 변환 페이지
  * 사진 업로드 - 원본 업로드 했을 때 미리보기 비율은 원본 그대로 
  * 경고 문구 : 미슐갠은 심의를 준수합니다 책임 너가 져야함 안그러면,, 못만들어 나가
  * 화풍 선택
  * 변환 성공 시 -> 작품명(필수), 작품 설명(선택) 입력칸 생성 -> 게시 -> 다하면 어디로 가..지 둘러보기?

</details>

### 뭔가 하고는 있는데 아직 완성 안 된 부분 
<details>
<summary> 😖 </summary>

* 시작 페이지
  * 배경 이미지, 소개 문구 임시로 넣어둠
  * "감상하기" 버튼 <br/>
  -> 비로그인 상태에서 클릭 시 카카오톡 로그인 페이지로 이동 (은 하는데 이거 프론트에서 라우팅하면 안 될거 같음)<br/>
  -> 로그인 상태에서 클릭 시 미술관 페이지로 이동
  
* 카카오톡 로그인
  * 인가코드 발급 성공 시 -> 소개 페이지로 리다이렉트중 (PR 코멘트에 이유 적어둠) + 여기서 서버로 인가코드 전송중 (인데 이거 미술관 페이지로 옮겨야함)
  * "로그인 없이 둘러볼래요" 버튼 -> 클릭 시 미술관 페이지로 이동
  
* 상단 네비바
  * 비회원 상태에서 "MY", "작품 만들기" 클릭 시 Alert 발생하면서 !!소개!! 페이지로 이동중 원래 로그인 페이지로 가야 맞다
  
* 미술관 페이지
  * 그림 하나 클릭하면 -> 숨어있던 확대 (지금은 작게 해뒀지만) 모달이 나오는데 이걸 화면에 꽉!! 차게 해야함
  * 서버에서 그림 받아와서 pictures 배열에 저장하는 코드 추가해야함 지금은 임시 이미지로 퉁쳐둔거


</details>

### 한 일 
<details>
<summary> 😎 </summary>
</details>


--- 
### 공부 아자아자 화이팅 

<details>
<summary> 📚 </summary>

  #### Redux - [공식문서](https://ko.redux.js.org/introduction/getting-started/)

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


