// Step 3: Defining XMLHttpRequest object and variables
var xhr = new XMLHttpRequest();  // Create a new XMLHttpRequest object
var url = './health_article.json';  // Define the JSON file URL

// Step 4: Setup GET request
xhr.open('GET', url, true);  // Open a GET request in asynchronous mode

// Step 5: Specify response type as JSON
xhr.responseType = 'json';

// Step 6: Handling the 'onload' event
xhr.onload = function() {
    if (xhr.status === 200) {  // Check if the request was successful
        var response = xhr.response;  // Retrieve the JSON response
        var articles = response.articles;  // Extract the articles array
        var articlesDiv = document.getElementById('articles');  // Get the target div

        // Clear previous content if needed
        articlesDiv.innerHTML = "";

        // Step 7: Iterate through articles and construct HTML dynamically
        articles.forEach(function(article) {
            var articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            var title = document.createElement('h2');
            title.textContent = article.title;

            var description = document.createElement('p');
            description.textContent = article.description;

            // Ways to Achieve Section
            var waysHeader = document.createElement('h3');
            waysHeader.textContent = 'Ways to Achieve:';
            var waysList = document.createElement('ul');

            article.ways_to_achieve.forEach(function(way) {
                var listItem = document.createElement('li');
                listItem.textContent = way;
                waysList.appendChild(listItem);
            });

            // Benefits Section
            var benefitsHeader = document.createElement('h3');
            benefitsHeader.textContent = 'Benefits:';
            var benefitsList = document.createElement('ul');

            article.benefits.forEach(function(benefit) {
                var listItem = document.createElement('li');
                listItem.textContent = benefit;
                benefitsList.appendChild(listItem);
            });

            // Append elements to articleDiv
            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(waysHeader);
            articleDiv.appendChild(waysList);
            articleDiv.appendChild(benefitsHeader);
            articleDiv.appendChild(benefitsList);

            // Append articleDiv to articlesDiv
            articlesDiv.appendChild(articleDiv);
        });
    } else {
        document.getElementById("articles").innerHTML = "Failed to load articles.";
        console.error("Failed to load data: " + xhr.status);
    }
};

// Handle network errors
xhr.onerror = function() {
    document.getElementById("articles").innerHTML = "Error fetching data.";
    console.error("Request failed.");
};

// Step 8: Send the request
xhr.send();
