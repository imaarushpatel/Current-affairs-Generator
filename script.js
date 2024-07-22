
document.getElementById('fetchButton').addEventListener('click', getCurrentAffairs);
document.getElementById('refreshButton').addEventListener('click', refreshPage);

function getCurrentAffairs() {
    const apiKey = '94a3c57222ea44059d50efe02878e8cc'; 
    const timestamp = new Date().getTime(); 
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${apiKey}&_=${timestamp}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentAffairs(data.articles);
        })
        .catch(error => {
            console.error('Error fetching current affairs:', error);
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
}

function refreshPage() {
    location.reload();
}
