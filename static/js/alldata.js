let img_data = 'img/blank_male.png', old_img_data = 'img/blank_male.png';

function alluser(queryString) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryString, true);
    xhr.getResponseHeader('Content-type', 'application/json');
    xhr.onload = function () {
        let allIds = JSON.parse(this.responseText);
        if (allIds.length)
            runarray(allIds);
        else alert("No Account Exist");
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
    document.getElementById(id).parentNode.innerHTML = `<div id=${id} class="loading" style="display:flex">
            <div class="circle rotateme"><i class="fa fa-spinner" aria-hidden="true"></i></div>
            <div id="progressPercent">0% Uploaded</div>
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