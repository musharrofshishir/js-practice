
//getting from url
let BASE_URL = 'http://localhost:3000/contacts';

let tab = document.querySelector(".table");
let parentElement = document.querySelector("#tBody");
//posting in url
// let postURL = 'http://localhost:3000/contacts';
let postbtn = document.querySelector("#postBtn");
//putting
// let putURL = '';

let delBtn = document.querySelector(".btn-danger");




window.onload = () => {
    //GETting data when window loads
    // fetch(BASE_URL)
    //     .then(res => res.json())
    //     .then(data => {
    //         data.forEach(user => createTd(user, parentElement))
    //     })

    //     .catch(err => console.log(err))


    // GET method with axios
    axios.get(BASE_URL)
    .then( res => {
        res.data.forEach( user => createTd(user,parentElement))
    })
    .catch( err => console.log(err))
    //POSTing data
    postbtn.addEventListener("click", () => {
        save();
        // let username = document.querySelector("#userName");
        // let phone = document.querySelector("#phone");
        // let email = document.querySelector("#email");
        // fetch(BASE_URL,{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: `${username.value}`,
        //         phone: `${phone.value}`,
        //         email: `${email.value}`
        //         // userId: 1
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        // .then( res =>  {
        //      let tbody = document.querySelector("#tBody");
        //      createTd(res.data,tbody);
        // })
        // // .then( data => {
        // //     data.forEach( user => {
        // //         createTd(user,parentElement);
        // //     })
        // // } )
        // .catch( err => console.log(err))
// IF want to post without declaring any function
        
    });
}

// Create new contact: POST method
const save = () => {
    let username = document.querySelector("#userName");
    let phone = document.querySelector("#phone");
    let email = document.querySelector("#email");

    // for axios
    let contact = {
        name: username.value,
        phone: phone.value,
        email: email.value
    }

    // fetch(BASE_URL, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: `${username.value}`,
    //             phone: `${phone.value}`,
    //             email: `${email.value}`
    //         }),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     })
    //     .then(res => {
    //         let tbody = document.querySelector("#tBody");
    //         createTd(res.data, tbody);
    //         username.value = "";
    //         phone.value = "";
    //         email.value = "";
    //     })
    //     .catch(err => console.log(err))

    // POST using Axios
    axios.post(BASE_URL, contact)
    .then( res => {
        let tbody = document.querySelector("#tBody");
        createTd(res.data, tbody);
        username.value = "";
        phone.value = "";
        email.value = "";
    })
    .catch(err => console.log(err))    
}


//creating dynamic td of table
const createTd = (contact, parentElement) => {
    //Creating Table row and appending
    const tBody = parentElement;
    const TR = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.innerHTML = contact.name;
    TR.appendChild(tdName);

    const tdPhone = document.createElement("td");
    tdPhone.innerHTML = contact.phone ? contact.phone : "N/A";
    TR.appendChild(tdPhone);

    const tdEmail = document.createElement("td");
    tdEmail.innerHTML = contact.email ? contact.email : "N/A";
    TR.appendChild(tdEmail);

    const tdAction = document.createElement("td");


    const tdEdit = document.createElement("button");
    tdEdit.className = "btn btn-warning m-2";
    tdEdit.innerHTML = "Edit";
    tdEdit.addEventListener("click", () => {

        let mainModal = $("#contactEditModal");
        mainModal.modal('toggle');

        let editName = document.querySelector("#editName");
        let editPhone = document.querySelector("#editPhone");
        let editEmail = document.querySelector("#editEmail");

        editName.value = contact.name;
        editPhone.value = contact.phone?contact.phone:"N/A";
        editEmail.value = contact.email?contact.email:"N/A";

        // let updateContact = {
        //     name: editName.value,
        //     phone: editPhone.value,
        //     email: editEmail.value
        // }

        let updateBtn = document.querySelector("#saveContact");
        updateBtn.addEventListener("click", () => {
            
            axios.put(`${BASE_URL}/${contact.id}`,{
                name: editName.value,
                phone: editPhone.value,
                email: editEmail.value
            })
            .then( res => {
                tdName.innerHTML = res.data.name;
                tdPhone.innerHTML = res.data.phone;
                tdEmail.innerHTML = res.data.email;
            })
            .catch( err => console.log(err))

            mainModal.modal('hide');
        });
    })
    tdAction.appendChild(tdEdit);

    const tdDelete = document.createElement("button");
    tdDelete.className = "btn btn-danger";
    tdDelete.innerHTML = "Delete";
    //DELETE Data
    tdDelete.addEventListener("click", () => {
        // fetch(`${BASE_URL}/${contact.id}`, {
        //         method: 'DELETE'
        //     })
        //     .then(res => {
        //         tBody.removeChild(TR);
        //     })
        //     .catch(err => console.log(err))

        //Axios -->
        axios.delete(`${BASE_URL}/${contact.id}`)
        .then( res => {
            tBody.removeChild(TR);
        })
        .catch( err => console.log(err))
    })
    tdAction.appendChild(tdDelete);

    TR.appendChild(tdAction);

    tBody.appendChild(TR);

};
//get request
// loadBtn.addEventListener('click', () => {


// });

// axios.get(url)
//     .then( res => res.json() )
//     .then( data => {
//         data.forEach( user => {


//         });
//     })
//     .catch( err => alert(err));

// fetch(BASE_URL)
// .then( res => res.json() )
// // .then( contact => {
// //     data.forEach( user => {


// //     });
// // })
// .then(data => {
//     createTd(data);
// })
// .catch( err => alert(err));