
const mobile_menu = document.querySelector('.mobile_menu')
const menuIcon = document.querySelector('.menuIcon')

menuIcon.addEventListener('click', ()=>{
    menuIcon.classList.toggle('change')
    mobile_menu.classList.toggle('toggle')
})
// Todo

// 1 Accept url from user through our form
// 2 Display errror if input is empty
// 3 Make a POST request to the API
// 4 Save the return result to local storage
// 5. Show data to users


const form = document.querySelector('form')
const errorElement = document.querySelector('.error')

form.addEventListener('submit', handleSubmit)

async function handleSubmit(event){

    event.preventDefault()

    let userLink = event.currentTarget.url.value
    //Validate input
    if(!userLink){
        errorElement.innerHTML = " Input can not be empty"
        setTimeout(()=> {
            errorElement.style.display="none"
            location.reload()
         
        }, 3000)
        return;
    }

    let url = { url: userLink }
  
    let baseUrl  =  `https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten`
  
   let header =  {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(url)
    }
    let res = await fetch(baseUrl,header );
    let data = await res.json();
    const {result_url} = data
    console.log(res)

    let shortenLink = {
        id: Math.ceil(Math.random() * 10000),
        url: userLink,
        result_url

    }
 
    let storeData = []

    if(localStorage.getItem('shortLink') !== null){
            
        storeData = JSON.parse(localStorage.getItem('shortLink'));
    }
        
    storeData.push(shortenLink);
    localStorage.setItem('shortLink', JSON.stringify(storeData ))
        
    Toastify({
        text: "Url submitted successfully",
        className: "info",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    
      form.reset()
      location.reload()
    }
    getLinks()



   function getLinks(){
    let readData = localStorage.getItem('shortLink')
    let parsedData = JSON.parse(readData)
    
    const shortend_links = document.querySelector('.shortend_links')

    let elem = ""
    parsedData.forEach(data => {

        elem += `
        <!--link strat-->
        <div class="link">
            <div class="left">
                <p>${data.url}</p>
            </div>
            <div class="right">
                <div><p>${data.result_url}</p></div>
               <div> <button data-newLink=${data.result_url}>Copy</button></div>
            </div>
        </div>
        <!--link end-->
        
        `;

    })
    shortend_links.innerHTML = elem
   }


const buttons = document.querySelectorAll('.shortend_links .right button')
buttons.forEach( button => {
        button.addEventListener('click', function(event){
            let newUrl = event.currentTarget.dataset.newlink;
           navigator.clipboard.writeText(newUrl)
        
            Toastify({
                text: "Url copied",
                className: "info",
                position: "center",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
        })
})




































