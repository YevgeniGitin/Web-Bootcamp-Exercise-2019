function cteateUsersList(res) {
    let userdiv;
    let container = document.querySelector('#userdetails');
    let userslen = res.items.length;
    for (let i = 0; i < userslen && i < 30; i++) {
        let text;
        userdiv = document.createElement('div');
        userdiv.style.display = "flex";
        userdiv.style.flexDirection = "column";
        userdiv.style.alignItems = "center";

        let h2 = document.createElement('H2');
        h2.style.textAlign = "center";
        text = res.items[i].login;
        h2.innerHTML = text;
        userdiv.appendChild(h2);

        let img = document.createElement("img");
        img.style.width = "10em";
        img.style.marginBottom = "1em";
        img.src = res.items[i].avatar_url;
        userdiv.appendChild(img);

        let button = document.createElement("input");
        button.type = "button";
        button.value = "view the users repositories";
        button.style.width = "10em";
        button.addEventListener('click', () => {
            showRepo(res.items[i].repos_url)
        })
        userdiv.appendChild(button);

        a = document.createElement('a');
        a.setAttribute('href', res.items[i].html_url);
        a.innerHTML = "view the users full profile";
        userdiv.appendChild(a);
        container.appendChild(userdiv);
    }
}

function cteateUserrepo(res) {
    let container = document.querySelector("#container1");
    container.className = "containeroff";
    let reposdiv = document.querySelector("#repo1");

    let h2 = document.createElement('H2');
    h2.style.textAlign = "center";
    h2.style.textShadow = "text-shadow: 2px 2px 8px red;"
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