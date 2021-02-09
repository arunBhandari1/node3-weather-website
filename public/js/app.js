console.log("Client side javascript file is loaded.")

const messageOne=document.querySelector("#message-1")
const messageTwo=document.querySelector("#message-2")


const weatherForm =document.querySelector("form")   //select the form query
const searchElement = document.querySelector("input")
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()                              // stop refreshing the page after clicking the search

    const location = searchElement.value
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error)
        {
            messageOne.textContent=data.error
          
        }
        else
        {
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast
            
        }
    })
})
})