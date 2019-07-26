let firssearchflag = true;

function searchpage() {
    document.querySelector("#repo1").className = "none";
    document.querySelector("#container1").className = "container";
}

function cteateUsersList(res) {
    let userdiv;
    let container = document.querySelector('#userdetails');
    if (!firssearchflag) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    let userslen = res.items.length;
    for (let i = 0; i < userslen && i < 30; i++) {
        let text;
        //for user data
        userdiv = document.createElement('div');
        userdiv.className = "userdiv";
        //for the name
        let h2 = document.createElement('H2');
        text = res.items[i].login;
        h2.innerHTML = text;
        userdiv.appendChild(h2);
        //div for img and div with buttons
        let datadiv = document.createElement('div');
        datadiv.className = "datadiv";
        userdiv.appendChild(datadiv);
        //users img
        let img = document.createElement("img");
        img.src = res.items[i].avatar_url;
        datadiv.appendChild(img);
        //div for the buttons
        let buttondiv = document.createElement('div');
        buttondiv.className = "buttondiv";
        datadiv.appendChild(buttondiv);
        //button to repositories list
        let button = document.createElement("input");
        button.type = "button";
        button.value = "repositories";
        button.addEventListener('click', () => {
            showRepo(res.items[i].repos_url)
        })
        buttondiv.appendChild(button);

        let button2 = document.createElement("input");
        button2.type = "button";
        button2.value = "GitHub profile";
        button2.addEventListener('click', () => {
            window.location.href = res.items[i].html_url;
        })
        buttondiv.appendChild(button2);
        //add user to the list
        container.appendChild(userdiv);
    }
    //not first time search
    firssearchflag = false;
    //clear input
    document.querySelector('#inputtext').value = "";
}

function cteateUserrepo(res) {
    document.querySelector("#repo1").className = "repo";
    let container = document.querySelector("#container1");
    container.className = "containeroff";
    let reposdiv = document.querySelector("#repo1");

    let h2 = document.createElement('H2');
    h2.style.textAlign = "center";
    text = res[0].owner.login;
    h2.innerHTML = text;
    reposdiv.appendChild(h2);

    let img = document.createElement("img");
    img.style.width = "10em";
    img.style.marginBottom = "1em";
    img.src = res[0].owner.avatar_url;
    reposdiv.appendChild(img);

    let h3 = document.createElement('H3');
    h3.style.textAlign = "center";
    text = `total number of repositories: ${res.length}`;
    h3.innerHTML = text;
    reposdiv.appendChild(h3);

    for (let i = 0; i < res.length; i++) {
        let repo = document.createElement('div');
        repo.style.width = "70%";
        repo.style.backgroundColor = "rgb(217, 223, 228)";
        repo.style.marginBottom = "1em";
        repo.style.padding = "1em";
        let reponame = document.createElement('H3');
        let flag = document.createElement('H3');
        let forknum = document.createElement('H3');
        let watchersnum = document.createElement('H3');
        let data = `Full repository name: ${res[i].full_name}`;
        let a = document.createElement('a');
        reponame.innerHTML = data;
        repo.appendChild(reponame);

        data = "Private/Public flag: ";
        if (res[i].private === false) {
            data += "Public";
        } else {
            data += "Private";
        }
        flag.innerHTML = data;
        repo.appendChild(flag);

        data = `Number of Forks: ${res[i].forks_count}`;
        forknum.innerHTML = data;
        repo.appendChild(forknum);

        data = `Number of Watchers: ${res[i].watchers_count}`;
        watchersnum.innerHTML = data;
        repo.appendChild(watchersnum);

        a.setAttribute('href', res[i].html_url);
        a.innerHTML = "go to repository page";
        repo.appendChild(a);

        reposdiv.appendChild(repo);
    }
}

function showRepo(repurl) {
    fetch(repurl)
        .then((res) => { //turn the string to jeson object
            return res.json();
        })
        .then((res) => {

            cteateUserrepo(res)
        })
        .catch((val) => {
            alert(val);
        })
}

function searchProfile() {
    let name = document.querySelector('#inputtext').value;
    fetch(`https://api.github.com/search/users?q=${name}`) //get thhe data
        .then((res) => { //turn the string to jeson object
            return res.json();
        })
        .then((res) => {

            cteateUsersList(res)
        })
        .catch((val) => {
            alert(val);
        })

}