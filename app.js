const input = document.getElementById("input");
const saveLink = document.getElementById("saveLink");
const saveTab = document.getElementById("saveTab");
const deleteAllLinks = document.getElementById("deleteAllLinks");
const saveLinks = document.getElementById("saveLinks");
const link = document.getElementById("link");

let allList = JSON.parse(localStorage.getItem("links")) || [];

// Function to display the links on the DOM
const displayLinks = () => {
  link.innerHTML = "";
  allList.forEach(item => {
    link.innerHTML += `
        <li> <a href="${item}" target="_blank">${item}</a> </li> 
    `;
  }); 
};



// Initialize by displaying saved links
displayLinks();
saveLink.addEventListener("click", () => {
  const inputItem = input.value.trim();
  if (inputItem === "") {
    alert("Please input a link.");
    return;
  }
  allList.push(inputItem);
  localStorage.setItem("links", JSON.stringify(allList));
  displayLinks();
  input.value = ""; 
});

// Save the current tab's URL
saveTab.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let activeTab = tabs[0];
    if (activeTab) {
      let activeTabURL = activeTab.url;
      allList.push(activeTabURL);
      localStorage.setItem("links", JSON.stringify(allList));
      displayLinks(); 
    } else {
      alert("Could not retrieve the active tab URL.");
    }
  });
});


// Delete All links
deleteAllLinks.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all links?")) {
    allList = [];
    localStorage.setItem("links", JSON.stringify(allList));
    displayLinks();
  }
});












// document.addEventListener("DOMContentLoaded", () => {
//   const input = document.getElementById("input");
//   const saveLinkButton = document.getElementById("saveLink");
//   const saveTabButton = document.getElementById("saveTab");
//   const deleteAllLinksButton = document.getElementById("deleteAllLinks");
//   const linkList = document.querySelector(".save-links ol");

//   saveLinkButton.addEventListener("click", () => {
//     const link = input.value.trim();
//     if (link) {
//       const li = document.createElement("li");
//       li.textContent = link;
//       linkList.appendChild(li);
//       input.value = ""; // Clear the input field
//     }
//   });

//   saveTabButton.addEventListener("click", () => {
//     // This requires more advanced JavaScript to get the current tab URL
//     // Placeholder functionality:
//     alert("Save Tab button clicked");
//   });

//   deleteAllLinksButton.addEventListener("click", () => {
//     linkList.innerHTML = ""; // Clear all links
//   });
// });
