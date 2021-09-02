// Variables
const searchField = document.getElementById('search-field'); // Search Bar
const searchButton = document.getElementById('search-btn'); // Search Button
const searchResults = document.getElementById('search-list'); // Search Results as columns
const errors = document.getElementById('error'); // Search Results as columns
const spinning = document.getElementById('spinner'); // Search Results as columns

// Variables

// Search Field
searchButton.addEventListener
('click', () =>
    {
        const searched = searchField.value;
        //searchField.value = '';
        searchResults.textContent = '';
        bookList(searched);
        showSpinner('block');
    }
)

// spinner
let showSpinner = styles =>
{
    spinning.style.display = styles;
}
// Books URL
const bookList = (searchText) => 
{
    const booksURL = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(booksURL)
        .then((res) => res.json())
        .then((data) => 
        {
            if (data.q === "")
            {
                errors.innerText = "Please type something";
            }
            else if (data.numFound === 0)
            {
                errors.innerText = "No Books Found"
            }
            else
            {
                errors.innerText = "";
            }
            const results = data.docs;
            bookFormat(results);
        });
}
// Search Field

// Search Results
const bookFormat = (result) =>
{
    result.slice(0, 20).forEach(item =>{
        const div = document.createElement('div');
        div.classList.add('col-md-2');
        div.innerHTML = `
        <div class= "container mb-4">
        <div class="w-100">
          <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="w-100" alt="">
        </div>
        <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
          <h2 class="text-wrap">${item.title}</h2>
          <p> Author: ${item.author_name}</p>
          <p class="text-wrap">Published in: ${item.first_publish_year}</p>
          <button onclick="" class="btn btn-dark">Details</button>
        </div>
        </div>
        `
        searchResults.appendChild(div);
        
    });
    showSpinner('none');
}
// Search Results