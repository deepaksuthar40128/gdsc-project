let myform = document.getElementsByClassName('myform')[0];
let userimg = document.getElementsByClassName('userprofile')[0].children[1];
let img_data = '*';


userimg.addEventListener('change', () => {
    let file = userimg.files[0];
    var filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = function (event) {
        img_data = event.target.result;
        userimg.parentElement.children[0].setAttribute('src', img_data);
    }
})


myform.addEventListener('reset', () => {
    userimg.parentElement.children[0].setAttribute('src', 'img/blank_male.png');
    img_data = '*';
})


myform.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = {};
    let helper = myform.children[1].children;
    data["username"] = helper[0].value;
    data["email"] = helper[1].value;
    data["rollNo"] = helper[2].value;
    data["userimg"] = img_data;
    show_loader();
    var request = {
        "url": `/savedata`,
        "method": "POST",
        "data": data
    }
    $.ajax(request).done(function (response) {
        document.getElementById('myform').parentElement.children[1].innerHTML = "Data Added Sucessfully!"
    })
})


function show_loader(){
    document.getElementById('myform').parentElement.children[1].classList.add('rotateme');
    document.getElementById('myform').style.display = 'none';
}