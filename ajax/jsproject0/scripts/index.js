//getting from url
let url = 'https://jsonplaceholder.typicode.com/users';
let loadBtn = document.querySelector("#loadbtn");
let p = document.querySelector("#output");
//posting in url
let postURL = 'https://jsonplaceholder.typicode.com/posts';
let postBtn = document.querySelector("#postbtn");
//putting
let putURL = 'https://jsonplaceholder.typicode.com/posts/1';
let upBtn = document.querySelector("#upbtn");


//get request
loadBtn.addEventListener('click', () => {

    fetch(url)
        .then( res => res.json() )
        .then( data => {
            data.forEach( user => {
                p.innerHTML = `${p.innerHTML}<br>Name: ${user.name}, Username: ${user.username}`;
            });
        })
        .catch( err => alert(err));
});

//post request
postBtn.addEventListener('click', () => {
    let firstname;
    let lastname;
    fetch(postURL,{
        method: 'POST',
        body: JSON.stringify({
            fname: `${ firstname = document.querySelector("#fname").value }`,
            lname: `${ lastname = document.querySelector("#lname").value }`,
            userId: 1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then( res => res.json() )
        .then( data => {
           p.innerHTML = `${ p.innerHTML }<br> First name: ${ data.fname }, Last Name: ${ data.lname }`
        })
       
        // .catch( err => alert(err));
});

// update request

upBtn.addEventListener('click', () => {
    let firstname;
    let lastname;
    fetch(putURL,{
        method: 'PUT',
        body: JSON.stringify({
            fname: `${ firstname = document.querySelector("#upfname").value }`,
            lname: `${ lastname = document.querySelector("#uplname").value }`,
            userId: 1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then( res => res.json() )
        .then( data => {
           p.innerHTML = `${ p.innerHTML }<br> UpFirst name: ${ data.fname }, UpLast Name: ${ data.lname }`
        })
       
        // .catch( err => alert(err));
});
