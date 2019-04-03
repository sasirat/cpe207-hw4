checkDocs();
fetchDocs();


// event
document.querySelector('#my-contact').addEventListener('submit', addContact);

function addContact(e){
    e.preventDefault();
    
    let subject = document.querySelector('#subject').value;
    let massage = document.querySelector('#massage').value;
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let male = document.querySelector('#male').checked;
    let female = document.querySelector('#female').checked;
    let phone = document.querySelector('#phone').value;
    let gender = (male == true) ? 'male' : ((female == true) ? 'female' : null); 

    var doc = {
        subject: subject,
        massage: massage,
        name: name,
        gender: gender,
        email: email,
        phone: phone
    }

    document.querySelector('#subject').value = '';
    document.querySelector('#massage').value = '';
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#male').checked = '';
    document.querySelector('#female').checked = '';
    document.querySelector('#phone').value = '';

    var docs = getDocs();
    docs.push(doc);
    localStorage.setItem('docs', JSON.stringify(docs));

    fetchDocs();
}

function checkDocs(){
    if (localStorage.getItem('docs') === null) {
        var docs = [];
        localStorage.setItem('docs', JSON.stringify(docs));
    }
}

function getDocs(){
    return JSON.parse(localStorage.getItem('docs'));
}

function deleteDoc(name){
    var docs = getDocs();
   for(var i=0 ; i<docs.length ; i++){
    if(docs[i].name === name){
        docs.splice(i,1);
    }
   }

    localStorage.setItem('docs', JSON.stringify(docs));
    fetchDocs();
}

function fetchDocs(){
    var docs = getDocs();
    var docsresult = document.querySelector('#docsresult');
    docsresult.innerHTML = '';

    var str = '';

    for (let i=0 ; i<docs.length ; i++){
        var subject = docs[i].subject;
        var massage = docs[i].massage;
        var name = docs[i].name;
        var gender = docs[i].gender;
        var email = docs[i].email;
        var phone = docs[i].phone;

        str += '<div class="card-header my-2">'
            + `<div class="card-body">`
            + `<h5 class="card-title">${subject}</h5>`
            + `<p class="card-text">${massage}</p>`
            + `<p class="card-text">Name: ${name}</br>Gender: ${gender}</br>Email: ${email}</br>Phone: ${phone}</p>`
            + `<a onclick="deleteDoc('${name}')" class="btn btn-danger" href="#">Delete</a>`
            + '</div></div>'
    }
    

    docsresult.innerHTML = str;
}