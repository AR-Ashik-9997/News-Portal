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
    listLink.innerHTML = `<button class="btn btn-link fs-4 text-decoration-none text-secondary" onclick="loadNews('${categories.category_id}')">${categories.category_name}</button>`;
    categoriesList.appendChild(listLink);
  });
};
const loadNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data);
};

const displayNews = async (news) => {
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
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  </div>
    `;
    Newsdisplay.appendChild(cardColumn);
  });
};

categories();
