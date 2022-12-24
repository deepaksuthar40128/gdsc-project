let img_data = 'img/blank_male.png', old_img_data = 'img/blank_male.png';

function alluser(queryString) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryString, true);
    xhr.getResponseHeader('Content-type', 'application/json');
    xhr.onload = function () {
        let allIds = JSON.parse(this.responseText);
        runarray(allIds);
    }
    xhr.send();
}


function runarray(Ids) {
    if (Ids.length == 0) console.log('none');
    else {
        Ids.forEach(id => {
            getdata(id._id);
        })
    }
}


function getdata(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `/user/${id}`, true);
    xhr.getResponseHeader('Content-type', 'application/json');
    xhr.onload = function () {
        data = JSON.parse(this.responseText);
        showData(data);
    };
    xhr.send();
}


function showData(data) {
    document.getElementsByClassName('main')[0].innerHTML += `
    <div>
        <form id="${data._id}" class="myform" action="#">
            <label for="userimg">
                <div class="userprofile">
                    <img src="${data.userimg}" alt="${data.username}">
                    <input disabled hidden type="file" name="userimg" id="userimg">
                </div>
            </label>
            <div class="other">
                <input disabled type="text" name="username" id="username" placeholder="${data.username}">
                <input disabled type="email" name="email" id="email" placeholder="${data.email}">
                <input disabled type="text" name="rollNo" id="rollNo" placeholder="${data.rollNo}">
                <button disabled style="background-color: green;" type = "submit">Update</button>
                <button disabled style="background-color: red;" type="reset">Reset</button>
            </div>
        </form>
                <hr>
        <div class="sub-btns">
                <button onclick="edit('${data._id}')" style="background-color: #4f5cbf;">Edit Data</button>
                <button onclick="removeAcc('${data._id}')" style="background-color: red;" type="reset">Delete</button>
         </div>
                <hr>
    </div>`
}

function addLoader(id) {
    document.getElementById(id).parentNode.innerHTML = `<div id=${id} class="loading rotateme">
            <div class="circle rotateme"><i class="fa fa-spinner" aria-hidden="true"></i></div>
        </div>`
}

function removeLoader(data) {
    document.getElementById(data._id).parentNode.innerHTML = `
    <div>
        <form id="${data._id}" class="myform" action="#">
            <label for="userimg">
                <div class="userprofile">
                    <img src="${data.userimg}" alt="${data.username}">
                    <input disabled hidden type="file" name="userimg" id="userimg">
                </div>
            </label>
            <div class="other">
                <input disabled type="text" name="username" id="username" placeholder="${data.username}">
                <input disabled type="email" name="email" id="email" placeholder="${data.email}">
                <input disabled type="text" name="rollNo" id="rollNo" placeholder="${data.rollNo}">
                <button disabled style="background-color: green;" type = "submit">Update</button>
                <button disabled style="background-color: red;" type="reset">Reset</button>
            </div>
        </form>
                <hr>
        <div class="sub-btns">
                <button onclick="edit('${data._id}')" style="background-color: #4f5cbf;">Edit Data</button>
                <button onclick="removeAcc('${data._id}')" style="background-color: red;" type="reset">Delete</button>
         </div>
                <hr>
    </div>`
}


setTimeout(() => {
    alluser('/allids');
}, 2000);


function edit(id) {
    handleForm(id);
    userprofile = document.getElementById(id).children[0].children[0];
    old_img_data = userprofile.children[0].getAttribute('src');
    userprofile.children[1].removeAttribute('disabled');
    Array.from(document.getElementById(id).children[1].children).forEach(ele => {
        ele.removeAttribute('disabled');
    })
    userprofile.children[1].addEventListener('change', () => {
        let file = userprofile.children[1].files[0];
        var filereader = new FileReader();
        filereader.readAsDataURL(file);
        filereader.onload = function (event) {
            img_data = event.target.result;
            userprofile.children[0].setAttribute('src', img_data);
        }
    })
}


function removeAcc(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `/delete/${id}`, true);
    xhr.getResponseHeader('Content-type', 'application/json');
    xhr.onload = function () {
        document.getElementById(id).parentNode.remove();
    };
    xhr.send();
}


function handleForm(id) {
    myform = document.getElementById(id);
    myform.addEventListener('reset', () => {
        myform.children[0].children[0].children[0].setAttribute('src', old_img_data);
    })


    myform.addEventListener('submit', (e) => {
        e.preventDefault();
        addLoader(id);
        let data = {};
        let helper = myform.children[1].children;
        data["username"] = helper[0].value == '' ? helper[0].placeholder : helper[0].value;
        data["email"] = helper[1].value == '' ? helper[1].placeholder : helper[1].value;
        data["rollNo"] = helper[2].value == '' ? helper[2].placeholder : helper[2].value;
        data["userimg"] = img_data == old_img_data ? -1 : img_data;
        // show_loader();
        console.log(data);
        var request = {
            "url": `/updatedata/${id}`,
            "method": "POST",
            "data": data
        }
        $.ajax(request).done(function (response) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `/user/${id}`, true);
            xhr.getResponseHeader('Content-type', 'application/json');
            xhr.onload = function () {
                newdata = JSON.parse(this.responseText);
                removeLoader(newdata);
            };
            xhr.send();
        })
    })

}