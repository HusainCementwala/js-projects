const accessKey = 'LXQyoQthXsAH_FGeFS0XJRAGD4gZJncfWHgAAdWXjrg';

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

//      LXQyoQthXsAH_FGeFS0XJRAGD4gZJncfWHgAAdWXjrg


let keyword = "";
let page = 1;

async function searchImage() {

  keyword = searchBox.value; //tore the value from the input field
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

if(page === 1){

  searchResult.innerHTML = ""; //clear the reseults of previous search
}

  const results = data.results;


  results.map((result)=>{

    const image = document.createElement("img");
    image.src = result.urls.small; //small is the tag in object og the API
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html; //link in 'a' tag
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);

  });

  showMoreBtn.style.display = "block";
  
}

searchForm.addEventListener("submit",(e)=>{

  e.preventDefault();
  page=1;
  searchImage();
})


showMoreBtn.addEventListener("click",()=>{

  page++;//page should turn to next images 
  searchImage();


});



