import React from "react";
import { Link } from 'react-router-dom';

function Home() {
    return(
        <>
        <div>
            여기는 카톡 로그인 페이지...🙃
        </div>

        <div>
            <Link to = '/home'>
                로그인 없이 둘러볼래요
            </Link>
        </div>
        </>
    );
}

export default Home;