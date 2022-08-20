const KAKAO_JS_KEY = "c27366526f2f7bd29e9fe093f57c55f8";

export const initKakao = () => {
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
    }
}