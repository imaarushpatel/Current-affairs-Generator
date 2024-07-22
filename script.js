// script.js
document.getElementById('fetchButton').addEventListener('click', getCurrentAffairs);
document.getElementById('refreshButton').addEventListener('click', refreshPage);

function getCurrentAffairs() {
    const apiKey = '94a3c57222ea44059d50efe02878e8cc'; // Provided News API key
    const timestamp = new Date().getTime(); // Add timestamp to prevent caching
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${apiKey}&_=${timestamp}`;

    console.log('Fetching current affairs from API...');
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.articles || data.articles.length === 0) {
                throw new Error('No articles found in the API response.');
            }
            const shuffledArticles = shuffleArray(data.articles);
            displayCurrentAffairs(shuffledArticles);
        })
        .catch(error => {
            console.error('Error fetching current affairs:', error);
            alert('Failed to fetch current affairs. Please try again later.');
        });
}

function displayCurrentAffairs(articles) {
    const currentAffairsDiv = document.getElementById('currentAffairs');
    currentAffairsDiv.innerHTML = '';

    articles.forEach(article => {
        const affairDiv = document.createElement('div');
        affairDiv.className = 'affair';

        const title = document.createElement('h2');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description;

        affairDiv.appendChild(title);
        affairDiv.appendChild(description);
        currentAffairsDiv.appendChild(affairDiv);
    });

    console.log('Displayed current affairs:', articles);
}

function refreshPage() {
    location.reload();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
