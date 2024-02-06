
const perPage = 10;
let currentPage = 1;

async function searchImages() {

        let response = await fetch('https://pixabay.com/api/?key=42120369-518a5150ea74169b8d67a807d' +
        '&q=' + searchTerm +
        '&image_type=photo' +
        '&colors=' + selectedColor +
        '&per_page=' + perPage +
        '&page=' + currentPage);

        let data = await response.json();

        displayImages(data.hits);
        updatePagination(data.totalHits);
}

function submitSearch() {
    searchTerm = document.getElementById('searchInput').value;
    const colorSelect = document.getElementById('colorSelect');
    selectedColor = colorSelect.value;
    currentPage = 1;
    searchImages();
}

function displayImages(images) {
    let container = document.getElementById('imageContainer');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    images.forEach(image => {
        let imageElement = document.createElement('img');
        imageElement.src = image.webformatURL;

        let tagsParagraph = document.createElement('tag');
        tagsParagraph.textContent = ` ${image.tags}`;

        let photographerParagraph = document.createElement('takenby');
        photographerParagraph.textContent = `taken by: ${image.user}`;

        let imageDiv = document.createElement('div');
        imageDiv.className = "image-div";
        imageDiv.appendChild(imageElement);
        imageDiv.appendChild(tagsParagraph);
        imageDiv.appendChild(photographerParagraph);

        container.appendChild(imageDiv);
    });
}

function updatePagination(totalHits) {
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');
    previousButton.style.display = "flex";
    nextButton.style.display = "flex";

    const currentPageElement = document.getElementById('currentPage');

    const totalPages = Math.ceil(totalHits / perPage);
    currentPageElement.textContent = `Page ${currentPage}`;

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function nextPage() {
    currentPage++;
    searchImages();
}

function previousPage() {
    currentPage--;
    searchImages();
}
