const updateBtn = document.querySelector('#updateBtn')
updateBtn.addEventListener('click', function(){
    //fetch API returns a promise hence .then but add another .then bc fetch is special
    fetch('/poems',{
        method: 'put',
        headers : {'Content-Type':'application/json'},
        body:JSON.stringify({
            title: 'Lets do this again',
            poem: 'adding sth new'
        })
        //receiving response from server
        .then(res =>{
            if (res.ok) return res.json()
        })
        .then(response =>{
            console.log(response)
        })
    })
})