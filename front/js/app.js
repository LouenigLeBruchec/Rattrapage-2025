async function checkUser() {
    const idCompte = localStorage.getItem("idCompte");  

    const res = await fetch(`${URL}/me?idCompte=${idCompte}`);
    const data = await res.json();

    switch(data) {
        case 0:
            if (! window.location.href.endsWith("acceuil.html")){
                console.log("redirect");
                window.location.href = "acceuil.html";
            }
            break;
        case 1:
            if (! window.location.href.endsWith("user.html")){
                window.location.href = "user.html";
            }
            break;
        case 2:
            if (! window.location.href.endsWith("adminMenu.html")){
                window.location.href = "adminMenu.html";
            }
            break;
    }
}

document.addEventListener("DOMContentLoaded", checkUser);