// Variables
const searchField = document.getElementById('search-field'); // Search Bar
const searchButton = document.getElementById('search-btn'); // Search Button
const searchResults = document.getElementById('search-list'); // Search Results as columns
// Variables

// Search Field
searchButton.addEventListener
('click', () =>
    {
        const searched = searchField.value;
        bookList(searched);
    }
)
// Books URL
const bookList = (searchText) => 
{
    const booksURL = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(booksURL)
        .then((res) => res.json())
        .then((data) => 
        {
            const results = data.docs;
            bookFormat(results);
        });
}
// Search Field

// Search Results
const bookFormat = (result) =>
{
    result.forEach(item =>{
        const div = document.createElement('div');
        div.classList.add('col-md-2');
        div.innerHTML = `
        <div class="">
          <img src="https://covers.openlibrary.org/b/id/${item.id_librarything}-L.jpg" class="w-100" alt="">
        </div>
        <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
          <h1>${item.title}</h1>
          <p>${item.author_name}</p>
          <p class="text-wrap">${item.publish_date}</p>
          <button onclick="showDetails('$')" class="btn btn-dark">Details</button>
        </div>
        `
        searchResults.appendChild(div);
    });
}

// cover URL
const coverLinks = (coverID) => 
{
    const coverURL = `https://covers.openlibrary.org/b/id/554106-M.jpg`
    fetch(coverURL)
    .then((res) => res.json())
    .then((data) => console.log(data))
}