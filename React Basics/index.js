// const firstPromise = new Promise((resolve, reject)=>{
//  console.log("Hello")
//  resolve(101);
// })

// // promise -> fulfill -> then()
// // promise -> fail -> catch()

// const promise2 = new Promise((resolve, reject)=>{
//     const fulfilled = false;
//     if(fulfilled){
//         resolve("success")
//     }else{
//         reject(new Error("Error!!!!"))
//     }
// }).then((message)=>{
//     console.log("First Message : " + message)
// }).catch((error)=>{
//     console.log("Error Message : "+ error)
// })


// function getData() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Data Received!")
//         }, 2000)
//     });
// }

// async function fetchData() {
//     console.log("fetching data....")
//     let result = await getData();
//     console.log(result)
// }

// fetchData();

// Create a promise that resolves with "Hello, World!" and log the value using .then().
const promise1 = new Promise((resolve) => {
    resolve("Hello, World!");
})

promise1.then((message) => {
    console.log(message);
})

// Make a promise that always rejects with "Something went wrong!" and handle it with .catch().
const promise2 = new Promise((resolve, reject) => {
    reject("Something went wrong!")
})

promise2.catch((error) => {
    console.log(error)
})

// Write a promise that resolves "Done!" after 2 seconds using setTimeout.
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Done!");
    }, 2000)
});

promise3.then((message) => {
    console.log(message)
})

// Create a promise that resolves "Success" if isLoggedIn = true, otherwise rejects "Not Logged In".
const promise4 = new Promise((resolve, reject) => {
    const isLoggedIn = false;

    if (isLoggedIn) {
        resolve("Success!")
    } else {
        reject("Not logged In!!")
    }
}).then((message) => {
    console.log(message)
}).catch((error) => {
    console.log(error)
})

//// Create a promise that resolves to 2. ////
// In .then(), multiply it by 2 → pass to next .then().
// Multiply again by 2.
// Finally log the result (8).
const promise5 = new Promise((resolve, reject) => {
    resolve(2);
}).then((value) => {
    return value * 2;
}).then((value) => {
    return value * 2;
}).then((value) => {
    console.log(value);
})

//// Convert the above logic into an async function using await. ////
// Start with 2.
// Multiply by 2, then again by 2.
// Log the final result (8).

function multiplyByTwo(num){
    return new Promise((resolve)=>{
        resolve(num * 2);
    })
}

async function calculate(){
   let value = 2;
   value = await multiplyByTwo(value);
   value = await multiplyByTwo(value);
   console.log(value);
}

calculate();
