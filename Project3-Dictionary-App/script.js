const inputButton = document.querySelector(".inputBtn")
const searchButton = document.querySelector(".searchBtn")
const wordContent = document.querySelector(".wordContent")
const form  = document.querySelector("form")





const getWordInfo = async (word) => {
    wordContent.style.display = "flex"
    try {
    wordContent.innerHTML = `<h3>Fetching Data</h3>`
    
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    const data = await fetch(`${url}`)
    const response = await data.json()
    let definitions = response[0].meanings[0].definitions[0]
    wordContent.innerHTML = `
                <h3 class="title">Word: ${response[0].word}</h3>
                <p class="verb">${response[0].meanings[0].partOfSpeech}</p>
                <p class="meaning"><strong>Meaning:</strong> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
                <p class="example"><strong>Example:</strong> ${definitions.example === undefined ? "Not Found" :  definitions.example}</p>
                
                 
            
                `
                  
                 if(definitions.antonyms.length === 0){
                    wordContent.innerHTML += `<span>Not Found</span>`
                 }else{
                     for(let i=0; i<definitions.antonyms.length; i++){
                         wordContent.innerHTML += `<li>${definitions.antonyms[i]}</li>`
                        }
                    }


                wordContent.innerHTML += `<button class="readMore"><a href="${response[0].sourceUrls} target="_blank">Read More</a></button>`
                

            } catch (error) {
                 wordContent.innerHTML = `<p>Sorry, The word could not be found</p>`
            }
    
}



form.addEventListener("submit", (e) => {
    e.preventDefault()
    getWordInfo(inputButton.value)
})





