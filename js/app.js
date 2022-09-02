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
          <h5 class="card-title">${viewNews.title}</h5>
          <p class="card-text text-justify">${viewNews.details}</p>
          <div class="d-flex justify-content-between">
          <div class="mt-4 d-flex">
          <img src="${viewNews.author.img}" class="rounded-circle author-image" alt="" />
          <div class="ms-3">
          <p class="fw-bold mb-0">${viewNews.author.name?viewNews.author.name:`not found`}</p>
          <span class="">${viewNews.author.published_date?viewNews.author.published_date:`not found`}</span>
          </div>
          </div>
          <div class="mt-4 d-flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          <div class="ms-3">
          <p class="fw-bold mb-0"></p>
          <span class="">${viewNews.total_view?viewNews.total_view:`not found`}</span>
          </div>
          </div>
          <div class="mt-4">
          <button class="btn btn-info">Details</button>                   
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

categories();
