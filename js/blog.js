const loadData = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(url);
    const data = await res.json();
    bannerImage(data);
  } catch (error) {
    console.log(error);
  }
};
const bannerImage = async (database) => {
  const { data } = await database;
  const image = document.getElementById("img");
  image.innerHTML = `<img src="${data[0].author.img}" class="img-fluid rounded-circle author-image" alt=""/>`;
};

const blogPage = () => {
  const blogButton = document.getElementById("blog");
  blogButton.classList.add("active");
};
document.getElementById("news-btn").addEventListener("click", function () {
  window.location.href = `./index.html`;
});
loadData();
blogPage();
