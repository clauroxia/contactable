export function renderHeader(title, link) {

  let a = `<a href="#" class = "link js-logout">Logout</a>`
  if(link == "none") {
    a = ``
  }
  return `
  <div class="header">
    <h1 class="heading title--sm header__title gray">${title}</h1>
    ${a}
  </div>
  `;
}