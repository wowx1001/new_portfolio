const html = $("html");
let section = document.querySelectorAll('.pf-pages');

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


let start_y, end_y; //터치 좌표
let curSectionNum = 1;
let curScrollY = 0;
let posTop = 0;
let curElem;

let rect = section[curSectionNum-1].getBoundingClientRect();
let sectionTmp = section[curSectionNum-1];
let remain_amt = sectionTmp.offsetHeight;


history.scrollRestoration = "manual";

/* 페이지 슬라이드 색 상태 변경 */
const setIndexColor = (idx)=>{
    $(".swiper-btn").removeClass('on');
    $(".swiper-btn").eq(idx).addClass("on");
}

const scrollMovePage = (event)=>{
    if(html.is(":animated")) return;
    let rect = section[curSectionNum-1].getBoundingClientRect();
    let sectionTmp = section[curSectionNum-1];

    if(event.originalEvent.deltaY > 0) {
        if(curSectionNum == section.length) return;

        if(sectionTmp.offsetHeight > window.innerHeight){
            if(rect.top==0){
                posTop = posTop + sectionTmp.offsetHeight % window.innerHeight;
            }else{
                posTop = posTop + window.innerHeight;
                curSectionNum++;
                setIndexColor(curSectionNum-1);
            }
        }else{
            posTop = posTop + window.innerHeight;
            curSectionNum++;
            setIndexColor(curSectionNum-1);
        }
    }else if(event.originalEvent.deltaY < 0) {
        if(curSectionNum == 1) return;
        if(curSectionNum == 2 && rect.top != 0){
            posTop = window.innerHeight;
        }else{
            posTop = posTop - window.innerHeight;
            curSectionNum--;
            setIndexColor(curSectionNum-1);
        }
    }

    html.stop().animate({
        scrollTop : posTop
    }, 1100, 'swing');
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

window.addEventListener('resize',function(){
    if(window.innerWidth<=1024){
        $(window).off("wheel", scrollMovePage);
    }else{
        $(window).on("wheel", scrollMovePage);
    }
    posTop = posTop + section[curSectionNum-1].getBoundingClientRect().top;
    window.scrollTo({top: posTop});
    setIndexColor(curSectionNum-1);
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
})


if(window.innerWidth<=1024){
    
}else{
    /* 마우스 휠 이벤트 */
    window.addEventListener("wheel", function(e){
        e.preventDefault();
    },{passive : false});

    $(window).on("wheel", scrollMovePage);
}
