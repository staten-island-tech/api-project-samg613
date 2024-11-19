import "./style.css";
async function getData { 
    try {  
        const response = await fetch ("https://valorant-api.com/v1/agents");
        if (response.status != 200) {
        throw new Error(response); 
        } else {
            const data = await response.json();
            console.log(data.data);
            data.data.forEach((agent) => console.log(agent.displayName));
            //document.querySelector("div").insertAdjacentHTML("afterbegin", `<h1>${agent.displayName}</h1›)
        }
    } catch (error) {
        alert("hey i could not find that agent");
    }
    }