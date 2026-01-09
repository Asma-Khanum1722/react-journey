var tl = gsap.timeline();

tl.from("h2",{
    y:-30,
    opacity:0,
    duration:0.5,
    delay:0.5
})

tl.from("h4",{
    y:-30,
    opacity:0,
    duration:0.5,
    stagger:0.5
})

tl.from("h1",{
    y:30,
    opacity:0,
    duration:0.5,
    scale:0.2
})