const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
const categories = async () => {
  const database = await loadData();
  const { data } = database;
  const categoriesList = document.getElementById("Catagory-list");
  data.news_category.forEach((categories) => {
    const listLink = document.createElement("div");
    listLink.innerHTML = `<button class="btn btn-link fs-4 text-decoration-none text-secondary" onclick="loadNews('${categories.category_id}','${categories.category_name}')">${categories.category_name}</button>`;
    categoriesList.appendChild(listLink);
  });
};
const loadNews = async (id, name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data, name);
};

const newsCounter = async (count, catagoryName) => {
  const counter = await count;
  const newsCount = document.getElementById("news-count");
  newsCount.textContent = ``;
  const viewCount = document.createElement("p");
  viewCount.classList.add("fs-4");
  viewCount.innerText = `${
    counter.length
      ? counter.length + " " + `items found for category of ${catagoryName}`
      : `No News Found for category of ${catagoryName}`
  }`;
  newsCount.appendChild(viewCount);
};

const displayNews = async (news, name) => {
  const { data } = news;
  const Newsdisplay = document.getElementById("news");
  Newsdisplay.textContent = ``;
  data.forEach((viewNews) => {
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col-lg-12");
    cardColumn.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-2">
        <img src="${viewNews.thumbnail_url}" class="img-fluid w-full" alt="" />
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <h4 class="card-title">${viewNews.title}</h4>
          <p class="card-text text-justify">${viewNews.details}</p>
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
          <div class="mt-4 d-flex">
          <p><i class="bi bi-eye fs-4"></i><span class="fs-4 ms-2">${
            viewNews.total_view ? viewNews.total_view : `no data available`
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
    Newsdisplay.appendChild(cardColumn);
  });
  newsCounter(data, name);
};

const detailsModal = async (detailsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${detailsId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetailsModal(data);
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
    <p><i class="bi bi-eye fs-4"></i><span class="fs-4 ms-2">${
      viewModal.total_view ? viewModal.total_view : `no data available`
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

categories();
