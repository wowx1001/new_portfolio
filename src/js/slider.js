const sliderData = [
    {
        'num':1,
        'imgSrc':'/src/img/shweb.png',
        'title':'반응형 쇼핑몰 웹 퍼블리싱',
        'desc':'반응형 쇼핑몰 퍼블리싱 / 프론트 개인 프로젝트',
        'pdf_link':'/src/html/shop.html',
        'real_link':'https://github.com/wowx1001/shop',
        'other_link':'http://seokjang.site/shop',
    },
    {
        'num':2,
        'imgSrc':'/src/img/lwweb.png',
        'title':'로이어드 웹 서비스',
        'desc':'풀스택 개발 및 유지보수 프로젝트',
        'pdf_link':'/src/html/lw.html',
        'real_link':'#',
        'other_link':'https://lawired.co.kr/',
    },
    {
        'num':3,
        'imgSrc':'/src/img/etweb.png',
        'title':'긴급교통정보 조회 사이트',
        'desc':'카카오 맵 api를 활용하여 사고, 행사 등의 교통 geo 정보를 조회 및 입력하는 웹 프로젝트',
        'pdf_link':'/src/html/ef.html',
        'real_link':'https://github.com/wowx1001/emergencytraffic',
        'other_link':'#',
    },
    {
        'num':4,
        'imgSrc':'/src/img/fwweb.png',
        'title':'꽃다발 추천 웹 애플리케이션',
        'desc':'웹 프론트엔드 / python 데이터 분석 & 개발 프로젝트',
        'pdf_link':'/src/html/fw.html',
        'real_link':'https://github.com/wowx1001/Team3_FinalProject',
        'other_link':'#',
    },
    {
        'num':5,
        'imgSrc':'/src/img/wtweb.png',
        'title':'기상정보와 주변 정보의 매시업을 통한 상품추천시스템',
        'desc':'vmware 서버 구축 및 풀스택 개발',
        'pdf_link':'/src/html/wef.html',
        'real_link':'https://github.com/wowx1001/SemiColok',
        'other_link':'https://youtu.be/lKkeMt2aNiU',
    }
]

const sliderContainer = document.getElementById("projects-slider");

let shtml = "";
let pjCurIdx = 0;


/* 슬라이드 렌더링 */
const renderSlide = (elem) => {
    elem.innerHTML = shtml;
    setSwiperDots();
    $('#projects-swiper > ol > li:first-child').addClass('on');
}

/* 슬라이드 하단 점 설정 */
const setSwiperDots = () => {
    let ps = document.getElementById('projects-swiper');
    let ol = '<ol>';
    for(let i = 0; i<sliderData.length; i++){
        ol = ol + `<li onclick="moveSlideItems(${i});"></li>`;
    }
    ol = ol + '</ol>';

    ps.innerHTML = ol;
}

/* 슬라이드 html 컨텐츠 설정 */
const setSlideItem = () =>{
    sliderData.map(data =>{
        shtml = shtml + `<div>
        <div class='row-flex-block'>
          <h1 class='projects-num'>${data['num']}</h1>
          <div class='projects-img-wrap'>
            <img src='${data['imgSrc']}'/>
          </div>
          <div class='projects-description column-flex horizontal-align-flex vertical-align-flex'>
            <div>
              <h2>${data['title']}</h2>
              <h3>${data['desc']}</h3>
              <a target='_blank' class='main-point-color' href='${data['pdf_link']}'>기술서 바로가기 (PDF)</a>
              <div>
              ${data['real_link']!='#'?"<a target='_blank' href='"+data['real_link']+"'>github 바로가기</a>":""}
              ${data['other_link']!='#'?"<a target='_blank' href='"+data['other_link']+"'>배포 링크 바로가기</a>":""}
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }, shtml);
}

/* 슬라이드 이동 */
const moveSlideItems = (idx) => {
    let nextOffset;
    if(typeof idx !== 'undefined'){
        pjCurIdx = idx;
    }

    nextOffset = (-1)*100*pjCurIdx;
    $('#projects-slider').animate({"left":nextOffset+"%"}, 500, 'swing');

    /* dot swiper 클래스 설정 */
    $('#projects-swiper > ol > li').removeClass('on');
    $(`#projects-swiper > ol > li:nth-child(${pjCurIdx+1})`).addClass('on');
}


/* 버튼 클릭 리스너 */
$("#projects-prev").on("click",function(e){
    if($('#projects-slider').is(":animated")) return;
    if(pjCurIdx == 0)return;

    pjCurIdx--;
    moveSlideItems();
});

$("#projects-next").on("click",function(e){
    if($('#projects-slider').is(":animated")) return;
    if(pjCurIdx == sliderData.length-1)return;

    pjCurIdx++;
    moveSlideItems();
});

setSlideItem();
renderSlide(sliderContainer);
