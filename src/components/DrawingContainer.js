import React, { useCallback, useEffect, useRef, useState } from "react";
import { getDrawingsWithOptions } from "../api/drawingApi";
import Drawing from "../routes/Drawing";
import LoginAlert from "./LoginAlert";
import { InfiniteScroll } from "./InfiniteScroll";


const DrawingContainer = ({ sort, tagFilter }) => {

    const page = useRef(0);
    const [drawings, setDrawings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const reset = () => {
        setIsLoading(true);
        page.current = 0;
        setDrawings([]);
        setHasNextPage(true);
        setIsLoading(false);
    }

    const scrollRef = useRef();

    const [loginAlertExpanded, setLoginAlertExpanded] = useState(false);
    const handleLoginAlertClose = () => setLoginAlertExpanded(false);
    const openLoginAlert = () => { setLoginAlertExpanded(true); }

    useEffect(() => {
        reset();
    }, [sort, tagFilter]);

    const onIntersect = 
        async ([entry], observer) => {
            if (entry.isIntersecting && !isLoading && hasNextPage) {
                setIsLoading(true);
                observer.unobserve(entry.target);

                const response = await getDrawingsWithOptions(sort, tagFilter, page.current++);

                setDrawings(prev => [...prev, ...response]);
                if (!response.length)
                    setHasNextPage(false);
                else
                    observer.observe(entry.target);
                setIsLoading(false);
            }
        }

    const [setTarget] = InfiniteScroll({
        onIntersect,
    });

    return (
        <>
            <div className="drawingBox" ref={scrollRef}>
                {
                    drawings.map((drawing) =>
                        <Drawing key={drawing.id} drawing={drawing} openLoginAlert={openLoginAlert} />
                    )
                }
                {!isLoading && hasNextPage && (
                    <div ref={setTarget}>
                        {isLoading && <div>로딩중</div>}
                    </div>
                )
                }
            </div>

            {loginAlertExpanded && <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />}
        </>
    );
};

export default DrawingContainer;