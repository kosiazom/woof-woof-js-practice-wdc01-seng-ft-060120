const BASE_URL = "http://localhost:3000/pups"



document.addEventListener('DOMContentLoaded', function(e){


    function fetchDogs(){
        fetch(BASE_URL)
        .then(resp => resp.json())
        .then(pupObjects => renderSpanDogs(pupObjects))
    }

    function renderSpanDogs(pupObjects){
        pupObjects.forEach(pup => renderAPup(pup)
        )};

        function renderAPup(pup) {//add dogs to the bar with names
            //then add dogs individually onto the dog-info bar
            let divBar = document.getElementById('dog-bar')
            let span = document.createElement('span')
            span.textContent = `${pup.name}`
            span.id = `${pup.id}`
            divBar.append(span)

             span.addEventListener('click', ()=> showPup(pup) )
            //added eventlistener right after  makes sense
                //so when it hears the click it wants to show a dog
                //in the info section
            
        }
        
            function showPup(pup) {
            //once dog is clicked from the bar it will appear with the dog Details
            let dogDivInfo = document.getElementById('dog-info')
            dogDivInfo.innerHTML = "" // this clears it out and resets it and runs line 37 all the way down
            let img = document.createElement('img')
            img.src = `${pup.image}`

            let h2 = document.createElement('h2')
            h2.innerText = `${pup.name}`

            let button = document.createElement('button')
            button.className = "GoodBad"
            button.textContent = `${pup.isGoodDog}`
            
                if (pup.isGoodDog === true ){
                    button.textContent = "Good Dog"
                } else  {
                    button.textContent = "Bad Dog"
                 }
            dogDivInfo.append(img)
            dogDivInfo.append(h2)
            dogDivInfo.append(button)

            //toggle
            button.addEventListener('click', function(e) {
                if (e.target.innerText === "Bad Dog"){
                    e.target.innerText = "Good Dog"

                } else {
                    e.target.innerText = "Bad Dog"
                }

                fetch(BASE_URL +`/${pup.id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json'
                    },
                    body: JSON.stringify({
                        isGoodDog: !pup.isGoodDog
                    })
                })
                .then(res => res.json())
                .then(pup => changeButtonStatus(pup, button))
                
            })
        }

        function changeButtonStatus(pup, button) {
        
             if (pup.isGoodDog === true ){
                button.textContent = "Good Dog"
            } else  {
               button.textContent = "Bad Dog"
             }
        }
            
        //filterDogs
          

    fetchDogs()
});//DOMContent

   






















































