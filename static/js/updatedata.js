function edit(id) {
    handleForm(id);
    userprofile = document.getElementById(id).children[0].children[0];
    old_img_data = userprofile.children[0].getAttribute('src');
    img_data = old_img_data;
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
        img_data = old_img_data;
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
            "data": data,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        document.getElementById("progressPercent").innerHTML = `${percentComplete}% updated`;
                    }
                }, false);
                return xhr;
            },
        }
        $.ajax(request).done(function (response) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `/user/${id}`, true);
            xhr.getResponseHeader('Content-type', 'application/json');
            xhr.onload = function () {
                newdata = JSON.parse(this.responseText);
                removeLoader(newdata);
                img_data = 'img/blank_male.png', old_img_data = 'img/blank_male.png';
            };
            xhr.send();
        })
    })

}


function searchUser() {
    username = document.getElementById('search').value;
    querystring = "/allids?username=" + username;
    if (username.length == 0)
        querystring = "/allids";
    document.getElementsByClassName('main')[0].innerHTML = '';
    alluser(querystring);
}