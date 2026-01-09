var tl = gsap.timeline();

gsap.to("#box",{
    x:900,
    duration:2,
    delay:0.5,
    repeat: Infinity,
    yoyo: true
})

gsap.from("h1",{
    opacity: 0,
    scale: 0.5,
    duration:1,
    delay:0.5
})

gsap.from("h3",{
    x:400,
    duration:1,
    delay:0.5,
    stagger:0.5
})

// with timeline
tl.to("#box1",{
    x:900,
    duration:2,
    delay:0.5
})

tl.to("#box2",{
    x:900,
    duration:2,
    delay:0.5
})

tl.to("#box3",{
    x:900,
    duration:2,
    delay:0.5
})






// gsap.to("#box1",{
//     x:900,
//     duration:2,
//     delay:2.5,
//     // rotate:360
// })

// gsap.to("#box2",{
//     x:900,
//     duration:2,
//     delay:4.5,
//     rotate:360,
//     scale: 0.8,
//     borderRadius: "50%"
// })