const loadData = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const categories = async () => {  
  const database = await loadData();
  const { data } = database;
  const categoriesList = document.getElementById("Catagory-list");
  data.news_category.forEach((categories) => {
    const listLink = document.createElement("div");
    listLink.innerHTML = `<button class="btn btn-link fs-4 text-decoration-none  text-secondary" onclick="loadNews('${categories.category_id}','${categories.category_name}')">${categories.category_name}</button>`;
    categoriesList.appendChild(listLink);
  });
};
const loadNews = async (id, name) => {
  try {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data, name);
  } catch (error) {
    console.log(error);
  }
};

const newsCounter = async (count, catagoryName) => {
  const counter = await count;
  const newsCount = document.getElementById("news-count");
  newsCount.textContent = ``;
  const viewCount = document.createElement("p");
  viewCount.classList.add("fs-4");
  viewCount.classList.add("text-center");

  viewCount.innerText = `${
    counter.length
      ? counter.length + " " + `items found for the category of ${catagoryName}`
      : `No News Found for the category of ${catagoryName}`
  }`;
  newsCount.appendChild(viewCount);
  toggleSpinner(false);
};

const displayNews = async (news, name) => {
  const { data } = news;
  data.sort((view1, view2) =>
    view1.total_view < view2.total_view
      ? 1
      : view1.total_view > view2.total_view
      ? -1
      : 0
  );
  const newsDisplay = document.getElementById("news");
  newsDisplay.textContent = ``;
  data.forEach((viewNews) => {
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col-lg-12");
    cardColumn.classList.add("col-sm-12");
    cardColumn.innerHTML = `
      <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-2">
          <img src="${
            viewNews.thumbnail_url
          }" class="img-fluid p-2 mx-auto d-block" alt="" />
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h4 class="card-title">${viewNews.title}</h4>
            <p class="card-text text-justify">${
              viewNews.details.length <= 900
                ? viewNews.details
                : viewNews.details.slice(0, 900) + "......"
            }</p>
            <div class="d-flex justify-content-between">
            <div class="mt-4 d-flex">
            <img src="${
              viewNews.author.img
            }" class="rounded-circle author-image" alt="" />
            <div class="ms-3">
            <p class="fw-bold mb-0">${
              viewNews.author.name ? viewNews.author.name : `no data available`
            }</p>
            <span class="">${
              viewNews.author.published_date
                ? viewNews.author.published_date.slice(0, 10)
                : `no data available`
            }</span>
            </div>
            </div>
            <div class="mt-4 d-flex d-sm-none d-none d-lg-block d-md-block">
            <p><i class="bi bi-eye fs-5"></i><span class="fs-5 fw-bold ms-2">${
              viewNews.total_view
                ? viewNews.total_view + "" + "M"
                : `no data available`
            }</span></p>         
            </div>
            <div class="mt-4">
            <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="detailsModal('${
              viewNews._id
            }')">Details</button>                   
            </div>         
            </div>          
          </div>
        </div>
      </div>
    </div>
      `;
    newsDisplay.appendChild(cardColumn);
    toggleSpinner(false);
  });
  newsCounter(data, name);
  bannerImage(data);
  sortedlist();
};

const detailsModal = async (detailsId) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${detailsId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsModal(data);
  } catch (error) {
    console.log(error);
  }
};

const displayDetailsModal = async (details) => {
  const { data } = details;
  const modalBody = document.getElementById("modal-body");
  modalBody.textContent = ``;
  data.forEach((viewModal) => {
    const modalTitle = document.getElementById("staticBackdropLabel");
    modalTitle.innerText = `${viewModal.title}`;
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
    <div class="d-flex justify-content-center">
    <img src="${
      viewModal.author.img
    }" class="img-fluid rounded-circle modal-image mx-auto" alt="">
    </div>
    
    <h4 class="text-center mt-4">${viewModal.author.name}</h4> 
    <div class="d-flex justify-content-around mt-4">
    <p class="fs-4">${
      viewModal.author.published_date
        ? viewModal.author.published_date.slice(0, 10)
        : `no data available`
    }</p>   
    <p><i class="bi bi-eye fs-4"></i><span class="fs-4 fw-bold ms-2">${
      viewModal.total_view
        ? viewModal.total_view + "" + "M"
        : `no data available`
    }</span></p> 
    <div class="d-flex">          
          <div>
          <p class="fs-4 mb-0 text-center">${
            viewModal.rating.number
              ? viewModal.rating.number
              : "no data available"
          }</p>
          <p class="fs-4">${
            viewModal.rating.badge
              ? viewModal.rating.badge
              : `no data available`
          }</p>
          </div>
          </div>   
    </div>     
        
    `;
    modalBody.appendChild(modalDiv);
  });
};

const sortedlist = async () => {
  const sort = document.getElementById("sort");
  sort.textContent = ``;
  const sortDiv = document.createElement("div");
  sortDiv.classList.add("d-flex");
  sortDiv.innerHTML = `
<h4>Sort By View:</h4>
<select class="form-select ms-4 sort-selection" aria-label="Default select example">          
<option value="any">Default</option>
</select>
`;
  sort.appendChild(sortDiv);
};
const bannerImage = async (database) => {
  const data = await database;
  const image = document.getElementById("img");
  image.innerHTML = `<img src="${data[0].author.img}" class="img-fluid rounded-circle author-image" alt=""/>`;
};
const defaultView = async () => {
  const id = "01";
  const name = "Breaking News";
  loadNews(id, name);
  toggleSpinner(true);
};
const newsPage = () => {
  const newsButton = document.getElementById("news-btn");
  newsButton.classList.add("active");
};
document.getElementById("blog").addEventListener("click", function () {
  window.location.href = `./blog.html`;
  toggleSpinner(true);
});

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('spinner');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}
newsPage();
categories();
defaultView();
