import { useEffect, useState } from "react";

const usePagination = <T>(countPerPage: number) => {
    // state : 전체 객체 리스트 상태 (데이터 전체 리스트)
    const [totalList, setTotalList] = useState<T[]>([]);

    // state : 보여줄 객체 리스트 상태 (하나의 페이지에 n개의 객체를 보여줌)
    const [viewList, setViewList] = useState<T[]>([]);

    // state : 현재 페이지 번호 상태 (현재페이지가 어떤 페이지에 있는지)
    const [currentPage, setCurrentPage] = useState<number>(1);

    // state : 전체 페이지 번호 리스트 상태 (전체 페이지 번호가 몇번까지 있는지)
    const [totalPageList, setTotalPageList] = useState<number[]>([1]);

    // state : 보여줄 페이지 번호 리스트 상태
    const [viewPageList, setViewPageList] = useState<number[]>([1]);

    // state : 현재 섹션 상태
    const [currentSection, setCurrentSection] = useState<number>(1);

    // state : 전체 섹션 상태
    const [totalSection, setTotalSection] = useState<number>(1);

    // function : 보여줄 객체 리스트 추출 함수
    const setView = () => {
        const FIRST_INDEX = countPerPage * (currentPage - 1);
        const LAST_INDEX = totalList.length > countPerPage * currentPage ? countPerPage * currentPage : totalList.length;
        const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
        setViewList(viewList);
    }

    // function : 보여줄 페이지 리스트 추출 함수
    const setViewPage = () => {
        const FIRST_INDEX = 10 * (currentSection - 1);
        const LAST_INDEX = totalPageList.length > 10 * currentSection ? 10 * currentSection : totalPageList.length;
        const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
        setViewPageList(viewPageList);
    }
    
    // effect : total list 가 변경될 때 마다 진행할 작업
    useEffect(() => {
        const totalPage = Math.ceil(totalList.length / countPerPage);
        
        const totalPageList: number[] = [];
        for (let page = 1; page <= totalPage; page++) totalPageList.push(page);
        setTotalPageList(totalPageList);
        
        const totalSection = Math.ceil(totalList.length / (countPerPage * 10));
        setTotalSection(totalSection);
        
        setCurrentPage(1);
        setCurrentSection(1);

        setView();
        setViewPage();

    }, [totalList]);


    // effect : current page 가 변경될 때 마다 진행할 작업
    useEffect(setView, [currentPage]);

    // effect : current section 가 변경될 때 마다 진행할 작업
    useEffect(setViewPage, [currentPage]);

    // useEffect(setViewPage, [currentSection, totalPageList]);

    return {
        currentPage,
        setCurrentPage,
        currentSection,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList
    };
};

export default usePagination;

/*

totalList = [a0, a1, a2, a3, a4 ... a102]

하나의 페이지에 3개의 객체를 보여줌.

1번 페이지 - [a0, a1, a2]
2번 페이지 - [a3, a4, a5]
3번 페이지 - [a6, a7, a8]
...

1 - 0, 2
2 - 3, 5
3 - 6, 8
4 - 9, 11

35 - 102, 104
=> 102 

startIndex = 3 * (n-1)
endIndex = 3 * n - 1
3-1=2
3

103 객체 - 103/3 = 35페이지

< 1 2 3 4 5 6 7 8 9 10 > // 섹션

totalPage = [1, 2, 3, 4, 5, ... 35]

하나의 섹션에 10개의 페이지 번호를 보여줌

1번 섹션 - [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
2번 섹션 - [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
3번 섹션 - [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
4번 섹션 - [31, 32, 33, 34, 45]

startIndex = 10 * (n-1)
endIndex = 10 * n - 1

---------------------------------------------------------------------------
front 처리
---------------------------------------------------------------------------

back 에서 전체 객체 리스트를 받아옴
front 에서 슬라이싱 처리

---------------------------------------------------------------------------
back 처리
---------------------------------------------------------------------------

client로부터 현재 페이지 번호를 받아옴
해당 페이지에서 보여줄 객체 리스트만 응답 + 전체 객체 갯수

// useEffect(() => {
    //     // 전체 페이지 (전체 길이 / 한페이지당 보여줄 페이지수)
    //     const toatlPage = Math.ceil(totalList.length / countPerPage);
    //     // 한 섹션에 10개 보여줌 
    //     // 게시물의 갯수가 30개면 1섹션만 1로 나누어떨어지니까 countPerPage 가 3 일때
    //     const totalSection = Math.ceil(totalList.length / (countPerPage * 10));
        
    //     const toatalPageList: number[] = [];
    //     for (let page = 1; page <= toatlPage; page++) totalPageList.push(page);
    //     setTotalPageList(totalPageList);
    //     setTotalSection(totalSection);

    //     setCurrentPage(1);
    //     setCurrentSection(1);

    //     setView();
    //     setViewPage();

    // }, [totalList]);

*/