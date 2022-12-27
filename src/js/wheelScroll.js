const html = $("html");
let section = document.querySelectorAll('.pf-pages');

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);



let curSectionNum = 1;
let posTop = 0;


history.scrollRestoration = "manual";

/* 페이지 슬라이드 색 상태 변경 */
const setIndexColor = (idx)=>{
    $(".swiper-btn").removeClass('on');
    $(".swiper-btn").eq(idx).addClass("on");
}


/* 페이지 슬라이더 인덱스 클릭 이벤트 */
$(".swiper-btn, .navmenu-items > a").on("click",function(e){
    if(html.is(":animated")) return;
    curSectionNum = this.getAttribute("data-index");
    posTop = posTop + section[curSectionNum-1].getBoundingClientRect().top;

    html.stop().animate({
        scrollTop : posTop
    }, 1100, 'swing');

    setIndexColor(curSectionNum-1);
});

/* 최상단 이동 이벤트 */
$(".move-top").on("click",function(e){
    if(html.is(":animated")) return;
    curSectionNum = 1;

    html.stop().animate({
        scrollTop : 0
    }, 1100, 'swing');

    setIndexColor(0);
});


window.addEventListener("scroll", function(){
    section = document.querySelectorAll('.pf-pages');
    for(let i=0;i<section.length;i++){
        let tm = section[i].getBoundingClientRect();
        if(Math.floor(tm.top) <= 0 && tm.top >= (-1)*tm.height){
            curSectionNum = i+1;
            setIndexColor(curSectionNum-1);
        }
    }
    posTop = window.scrollY;
})
