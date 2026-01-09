let cursor = document.querySelector("#cursor");
let container = document.querySelector("#container");
let imageDiv = document.querySelector("#image")

container.addEventListener("mousemove", function(dets){
    gsap.to(cursor,{
        x: dets.x,
        y: dets.y,
        duration: 0.5
    })
})

imageDiv.addEventListener("mouseenter",function(){
    cursor.innerHTML = "View More"
    gsap.to(cursor,{
        scale:2,
        backgroundColor: "#ffffff8a"
    })
})

imageDiv.addEventListener("mouseleave",function(){
    cursor.innerHTML = ""
    gsap.to(cursor,{
        scale:1,
        backgroundColor: "#fff"
    })
})