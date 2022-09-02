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
    const listLink = document.createElement("a");        
    listLink.classList.add("nav-link");    
    listLink.classList.add("text-secondary");    
    listLink.classList.add("fs-4");    
    listLink.innerText=`${categories.category_name}`;
    categoriesList.appendChild(listLink);
  });
};
categories();
