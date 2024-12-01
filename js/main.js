let bookmarkName = document.getElementById("bookmarkName");
let websiteUrl = document.getElementById("websiteUrl");
let addBtn = document.getElementById("addBtn");
let linksHolder = document.getElementById("linksHolder");
let errorBox = document.getElementById("errorBox");
let btnClose = document.getElementById("btnClose");
let errorDisplay = document.getElementById("errorDisplay");

let linksContainer = [];

if (JSON.parse(localStorage.getItem("links"))) {
  linksContainer = JSON.parse(localStorage.getItem("links"));
  displayLinks();
}

addBtn.addEventListener("click", addLink);

function addLink() {
  if (validateLink(bookmarkName)) {
    if (validateLink(websiteUrl)) {
      if (checkUsed() === false) {
        let link = {
          bookmarkName: bookmarkName.value,
          websiteUrl: websiteUrl.value,
        };
        linksContainer.push(link);
        localStorage.setItem("links", JSON.stringify(linksContainer));
        clearInput();
        displayLinks();
        bookmarkName.classList.remove("is-valid");
        websiteUrl.classList.remove("is-valid");
      } else {
        errorDisplay.innerHTML = `<li>
                <i class="fa-regular fa-circle-right p-2"></i>
                Site name is used before
              </li>`;
        errorBox.classList.replace("d-none", "d-flex");
      }
    } else {
      errorDisplay.innerHTML = `<li>
                <i class="fa-regular fa-circle-right p-2"></i>
                Site URL must be a valid one
              </li>
              <li>
                <i class="fa-regular fa-circle-right p-2"></i>
                Site URL must start with http or https
              </li>`;
      errorBox.classList.replace("d-none", "d-flex");
    }
  } else {
    errorDisplay.innerHTML = `<li>
              <i class="fa-regular fa-circle-right p-2"></i>
              Site name must contain at least 3 characters
            </li>`;
    errorBox.classList.replace("d-none", "d-flex");
  }
}

function clearInput() {
  bookmarkName.value = "";
  websiteUrl.value = "";
}

function displayLinks() {
  let blackbox = ``;
  for (let i = 0; i < linksContainer.length; i++) {
    blackbox += `<tr>
              <td class="text-capitalize">${i + 1}</td>
              <td class="text-capitalize"> ${
                linksContainer[i].bookmarkName
              } </td>
              <td class="text-capitalize">
                <a target="_blank" href="${
                  linksContainer[i].websiteUrl
                }" class="btn btn-visit">
                  <i class="fa-solid fa-eye fa-fw pe-2"></i>
                  Visit
                </a>
              </td>
              <td class="text-capitalize">
                <button onclick="deleteLink(${i})" class="btn btn-delete">
                  <i class="fa-solid fa-trash fa-fw pe-2"></i>
                  Delete
                </button>
              </td>
            </tr>`;
  }
  linksHolder.innerHTML = blackbox;
}

function deleteLink(index) {
  linksContainer.splice(index, 1);
  localStorage.setItem("links", JSON.stringify(linksContainer));
  displayLinks();
}

function validateLink(ele) {
  let regex = {
    bookmarkName: /^\w{3,}$/,
    websiteUrl: /^(https?:\/\/)((www|WWW)\.)?(\w)+\.\w{2,6}(\/\w+)?$/,
  };

  let isValid = regex[ele.id].test(ele.value);

  if (isValid) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
  }

  return isValid;
}

function checkUsed() {
  let used = false;
  for (let i = 0; i < linksContainer.length; i++) {
    if (linksContainer[i].bookmarkName === bookmarkName.value) {
      used = true;
    }
  }

  return used;
}

btnClose.addEventListener("click", function () {
  errorBox.classList.replace("d-flex", "d-none");
});
