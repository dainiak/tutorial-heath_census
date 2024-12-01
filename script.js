let travelData = null;

async function loadTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        travelData = await response.json();
    } catch (error) {
        console.error('Error loading travel data:', error);
    }
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (!searchTerm) {
        searchResults.style.display = 'none';
        return;
    }

    const results = [];

    travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchTerm)) {
            results.push({
                name: country.name,
                type: 'Country',
                description: `Country with cities like ${country.cities.map(city => city.name.split(',')[0]).join(', ')}`
            });
        }

        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchTerm)) {
                results.push({
                    name: city.name,
                    type: 'City',
                    description: city.description
                });
            }
        });
    });

    travelData.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchTerm)) {
            results.push({
                name: temple.name,
                type: 'Temple',
                description: temple.description
            });
        }
    });

   travelData.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchTerm)) {
            results.push({
                name: beach.name,
                type: 'Beach',
                description: beach.description
            });
        }
    });

    displayResults(results);
}


function displayResults(results) {
    const searchResults = document.getElementById('searchResults');

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="result-item"><p>No results found</p></div>';
        searchResults.style.display = 'block';
        return;
    }

    const resultsHtml = results.map(result => `
        <div class="result-item">
            <h5>${result.name} <small class="text-muted">(${result.type})</small></h5>
            <p>${result.description}</p>
        </div>
    `).join('');

    searchResults.innerHTML = resultsHtml;
    searchResults.style.display = 'block';
}


function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.value = '';
    searchResults.style.display = 'none';
}

document.getElementById('searchInput').addEventListener('input', handleSearch);
document.addEventListener('DOMContentLoaded', loadTravelData);