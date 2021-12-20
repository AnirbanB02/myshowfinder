const form = document.querySelector('#searchQuery'),
  imgDiv = document.querySelector('#imagesHere');
let cardDiv = document.createElement('div');
cardDiv.setAttribute('id', 'cardsHere');
const regx = /<\/p>/


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  imgDiv.innerHTML = ""
  cardDiv.innerHTML = ""
  let shows = await makeRequest(form);
  addImages(shows);
})

const makeRequest = async (form) => {
  // console.log("request Made")
  let q = form.elements.query.value
  let res = await axios.get(`http://api.tvmaze.com/search/shows?q=${q}`);
  // console.log(res.data[0].show.image.medium)
  let h4 = document.createElement('h4');
  h4.innerHTML = `Search Results for "${q}" <br>`;
  h4.className = 'dispSearched'
  imgDiv.appendChild(h4);
  imgDiv.appendChild(cardDiv);
  return res.data
}

const addImages = async (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      // console.log(result.show.image.medium)
      let card = document.createElement('div');
      card.className = 'showCard';
      let image = document.createElement('img');
      let showTitle = document.createElement('h4');
      let summary = document.createElement('p');
      image.src = result.show.image.medium;
      showTitle.innerHTML = result.show.name;
      let reqSummaryIndex = result.show.summary.match(regx).index;
      let reqSummary;
      if (reqSummaryIndex > 200) {
        reqSummary = result.show.summary.substring(3, 200) + "...";
      }
      else {
        reqSummary = result.show.summary.substring(0, reqSummaryIndex + 4);
      }
      summary.innerHTML = reqSummary;
      card.appendChild(image);
      card.appendChild(showTitle);
      card.appendChild(summary);
      cardDiv.appendChild(card);
    }
  }
}