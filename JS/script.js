// Variables
const searchField = document.getElementById('search-field'); // Search Bar
const searchButton = document.getElementById('search-btn'); // Search Button
const searchResults = document.getElementById('search-list'); // Search Results as columns
const totalResults = document.getElementById('total'); // Total Results
const errors = document.getElementById('error'); // Search errors
const spinning = document.getElementById('spinner'); // spinner
const detailBtn = document.getElementById('detailbtn'); // detail btn
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
            totalResults.innerText = data.numFound;
            bookFormat(results); // results
        });
}
// Search Field

// Search Results
const bookFormat = (result) =>
{
    // totalResults.innerText = result.length;
    result.slice(0, 20).forEach(item =>{
        const div = document.createElement('div');
        div.classList.add('col-md-2');
        div.innerHTML = `
        <div class= "card mb-4 border rounded border-secondary shadow-sm"">
        <div class="w-100">
          <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="w-100" alt="">
        </div>
        <div class="card-body py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
          <h2 class="text-wrap text-break">${item.title}</h2>
          <p> <span class="fst-italic">Author:</span> ${item.author_name}</p>
          <p class="text-wrap"><span class="fst-italic">Published in:</span> ${item.first_publish_year}</p>
          <button id="detailbtn" onclick="bookDetails(${item.key})" class="btn btn-dark">Details</button>
        </div>
        </div>
        `
        searchResults.appendChild(div);
    });
    showSpinner('none');
}
// Search Results