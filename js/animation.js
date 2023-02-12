window.addEventListener('load', () => {


    //Accueil
    if (document.querySelector('body') !== null){
        const TL = gsap.timeline({paused: true});
    
    TL
    .from("header", 1, {autoAlpha:0, ease:"ease-out"},'start')
    .from(".description", 1, {autoAlpha:0, transform: "translateX(500px)", ease:"ease-out"},'1')
    .from(".charts", 1.5, {autoAlpha:0, ease:"ease-out"},'1')
    .staggerFrom('.piechart', 0.5, {autoAlpha:0, pointerEvents: "none", ease: "linear"}, 0.5, '1')
        TL.play();
    }
});