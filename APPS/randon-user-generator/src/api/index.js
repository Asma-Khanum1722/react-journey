export async function getRandomUser(){
    const response = await fetch("https://randomuser.me/api/",{
        method: "GET",
    });

    return await response.json();
}