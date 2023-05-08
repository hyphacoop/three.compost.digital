// generate list of folders
const folderArray = Array.from({ length: 36 }, (_, i) => String(i + 1).padStart(3, '0'));


// Create the previous button
const prevButton = document.createElement('button');
prevButton.setAttribute('id', 'prev-button');
prevButton.innerHTML = '&#8249;'; 
prevButton.addEventListener('click', goToPreviousTransmission);

// Create the next button
const nextButton = document.createElement('button');
nextButton.setAttribute('id', 'next-button');
nextButton.innerHTML = '&#8250;';
nextButton.addEventListener('click', goToNextTransmission);


// Events for prev + next buttons
function goToPrevious() {
    const urlParams = new URLSearchParams(window.location.search);
    let transmission = urlParams.get('transmission');
    
    if (transmission) {
      transmission = parseInt(transmission, 10);
      if (transmission > 1) {
        transmission -= 1;
        urlParams.set('transmission', String(transmission).padStart(3, '0'));
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.location.href = newUrl;
        updateButtonVisibility();
      }
    }
  }
  
  function goToNext() {
    const urlParams = new URLSearchParams(window.location.search);
    let transmission = urlParams.get('transmission') || '001';
    transmission = parseInt(transmission, 10);
 
    if (transmission < folderArray.length) {
        transmission++;
      } else {
        transmission = 1;
      }
      
      const paddedTransmission = String(transmission).padStart(3, '0');
      urlParams.set('transmission', paddedTransmission);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.location.href = newUrl;
      updateButtonVisibility();
  }

  function updateButtonVisibility() {
    const prevButton = document.getElementById('prev-button');
    const urlParams = new URLSearchParams(window.location.search);
    let transmission = urlParams.get('transmission');
    
    if (!transmission || transmission === '001') {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'inline-block';
    }
  }

  function insertButtonsInsideMarkdownBody() {
    const markdownBody = document.querySelector('#md-content .markdown-body');
    if (markdownBody) {
      markdownBody.appendChild(prevButton);
      markdownBody.appendChild(nextButton);
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    insertButtonsInsideMarkdownBody();
    updateButtonVisibility();
  });

  

// init validDay
const validDays = [];

// Create an SVG container
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");


// fetch all markdown files
const fetchAllMarkdown = async () => {
    const promises = folderArray.map(async (folder) => {

        const response = await fetch(`assets/flux/${folder}/index.md`);

        if (!response.ok) {
            console.error(`Error fetching index.md from folder ${folder}`);
            return null;
        }
        // bring content into a string
        let content = await response.text();
        // split content into lines
        const lines = content.split('\n');


        // get the timestamp
        const timestamp = lines[0];

        // split the timestamp into parts
        const parts = timestamp.split(" ");
        // get the day's number
        const date = parseInt(parts[2], 10);

        // Check if date is valid
        if (!isNaN(date)) {
            // Find the last valid day in the validDays array
            const lastValidDay = validDays.length > 0 ? Math.max(...validDays) : 0;
            if (date === 971) {
                validDays.push(790);
            } else if (date === 5491) {
                validDays.push(900);
            } else if (date > lastValidDay) {
                // If date is greater than the last valid day, add it to the validDays array
                validDays.push(parseInt(date));
            } else {
                // If date is not greater than the last valid day, increment the last valid day and add it to the validDays array
                validDays.push(parseInt(lastValidDay + 20));
            }
        } else {
            // If date is not valid, increment the last valid day and add it to the validDays array
            const lastValidDay = validDays.length > 0 ? Math.max(...validDays) : 0;
            validDays.push(lastValidDay + 10);
        }

        // Use the last element in the validDays array as the current valid day
        const validDay = validDays[validDays.length - 1];
        return { folder, content, validDay };
    });

    const results = await Promise.all(promises);

    const folderContentMap = results.reduce((acc, result) => {
        if (result) {
            acc[result.folder] = result.content;
        }
        return acc;
    }, {});

    return folderContentMap;
};

const updateSvg = (newDay, folderNumber) => {
    
                    // Regenerate the SVG with updated colors
                    const circles = document.querySelectorAll("circle");
                    // init circles before loop
                    const startCircle = circles[0];
                    let endCircle = circles[0];


                    // Remove all previous path elements
                    const paths = document.querySelectorAll("path");
                    paths.forEach((path) => {
                        path.parentNode.removeChild(path);
                    });

                    circles.forEach((circle, i) => {

                        if (i == 0) {
                            circle.setAttribute('fill', 'darkblue');
                            circle.setAttribute('r', 10);
                        } else if (i == newDay) {
                            circle.setAttribute('fill', 'darkblue');
                            circle.setAttribute('r', 10);
                            endCircle = circle;
                        } else if (i < newDay) {
                            circle.setAttribute('fill', 'blue');
                            circle.setAttribute('r', 5);
                        } else {
                            circle.setAttribute('fill', 'gray');
                            circle.setAttribute('r', 5);
                        }

                    });
                    const startX = Number(startCircle.getAttribute("cx"));
                    const startY = Number(startCircle.getAttribute("cy"));
                    const endX = Number(endCircle.getAttribute("cx"));
                    const endY = Number(endCircle.getAttribute("cy"));
                    
                    // Get the cx and cy attribute for the last circle in the circles array
                    const lastCircle = circles[circles.length - 1];
                    const lastCircleX = Number(lastCircle.getAttribute("cx"));
                    const lastCircleY = Number(lastCircle.getAttribute("cy"));


                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", `M${startX},${startY} L${endX},${endY}`);
                    path.setAttribute("stroke", "blue");
                    path.setAttribute("stroke-width", "2");

                    const futurePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    futurePath.setAttribute("d", `M${endX},${endY} L${lastCircleX},${lastCircleY}`);
                    futurePath.setAttribute("stroke", "gray");
                    futurePath.setAttribute("stroke-width", "2");
                    futurePath.setAttribute("stroke-dasharray", "5,5");

                    // Append the path to the SVG container first, then append the circles
                    svg.appendChild(futurePath);
                    svg.appendChild(path);
                    circles.forEach(circle => {
                        svg.appendChild(circle);

                    });
                };


fetchAllMarkdown()
    .then((folderContentMap) => {

        // get the content parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const contentParam = urlParams.get('transmission');

        // Get the container element
        const svgContainer = document.getElementById('svg-container')
        const theContainer = document.getElementById('maincont')
        const containerWidth = theContainer.clientWidth;

        // Get the screen's width
        let screenWidth = containerWidth - 50;
        let screenHeight = window.innerHeight;

        // Get the highest valid day number to scale to the screen size
        const maxDay = validDays[validDays.length - 1] + 25;


        // calculate the current day based on the content parameter
        const currentDay = folderArray.findIndex(folder => folder === contentParam) + 1;


        // Set the initial layout based on the screen width
        if (screenWidth < 700) {
            svgContainer.classList.add('vertical');
            svg.setAttribute("width", 50);
            svg.setAttribute("height", screenHeight * 1.5);

            // Calculate the position of each date based on the screen height
            // and create circles at the corresponding positions

            validDays.forEach((validDay, index) => {
                // remove horizontal class
                svgContainer.classList.remove('horizontal');

                // Scale the position based on the screen height and the number of days

                const margin = index === 0 ? 10 : 75;
                const positionX = 25; 
                const positionY = (screenHeight / (maxDay + 10)) * validDay + margin;

                // Create an SVG circle
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", positionX);
                circle.setAttribute("cy", positionY);
                circle.setAttribute("r", 8); 

                // Get the folder number associated with the circle
                const folderNumber = String(index + 1).padStart(3, "0");

   
                // set the circle style based on the current day
                if (index == 0) {
                    circle.setAttribute('fill', 'blue');
                } else if (folderNumber == currentDay) {
   
                    circle.setAttribute('fill', 'darkblue');
                    circle.setAttribute('r', 15);
                } else if (folderNumber < currentDay) {

                    circle.setAttribute('fill', 'blue');
                    circle.setAttribute('r', 5);
                } else {

                    circle.setAttribute('fill', 'gray');
                }

                circle.addEventListener("click", () => {
                
                    // Set the src attribute of #md-content
                    document.getElementById("md-content").src = `assets/flux/${folderNumber}/index.md`;

                    // Update the current day
                    const newDay = folderNumber - 1;

                    // Update the URL parameter
                    const urlParams = new URLSearchParams(window.location.search);
                    urlParams.set('transmission', folderNumber);
                    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
                    window.history.pushState({}, '', newUrl);

                    updateSvg(newDay, folderNumber);

                });

                // Append the circle to the SVG container
                svg.appendChild(circle);
            });

        } else {
            document.getElementById('maincont').classList.add('dir-col');
            svgContainer.classList.add('horizontal');



            svg.setAttribute("width", screenWidth);
            svg.setAttribute("height", 100);

            // Calculate the position of each date based on the screen width
            // and create circles at the corresponding positions
            validDays.forEach((validDay, index) => {
                // smaller margin if the first index 
                const margin = index === 0 ? 10 : 25;
                // Scale the position based on the screen width and the number of days
                const positionX = (screenWidth / (maxDay + 1)) * validDay + margin;

                const positionY = 50; // Set an arbitrary Y position for simplicity

                // Create an SVG circle
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", positionX);
                circle.setAttribute("cy", positionY);


                // Get the folder number associated with the circle
                const folderNumber = String(index + 1).padStart(3, "0");

                // set the circle style based on the current day
                if (index == 0) {
                    circle.setAttribute('fill', 'blue');
                } else if (folderNumber == currentDay) {
                    circle.setAttribute('fill', 'darkblue');
                    circle.setAttribute('r', 15);
                } else if (folderNumber < currentDay) {
                    circle.setAttribute('fill', 'blue');
                    circle.setAttribute('r', 7);
                } else {
                    circle.setAttribute('fill', 'gray');
                }

                circle.addEventListener("click", () => {

                    // Set the src attribute of #md-content
                    document.getElementById("md-content").src = `assets/flux/${folderNumber}/index.md`;

                    // Update the current day
                    const newDay = folderNumber - 1;

                    // Update the URL parameter
                    const urlParams = new URLSearchParams(window.location.search);
                    urlParams.set('transmission', folderNumber);
                    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
                    window.history.pushState({}, '', newUrl);

                    updateSvg(newDay, folderNumber);


                });

                // Append the circle to the SVG container
                svg.appendChild(circle);
            });
        };

        // Append the SVG container to the document body
        svgContainer.appendChild(svg);

        // Update the SVG path and circle colors on page load
        updateSvg(currentDay - 1);  

        // Check the screen width on window resize and toggle the "vertical" class accordingly
        window.addEventListener('resize', () => {
            if (window.innerWidth < 700) {
                svgContainer.classList.add('vertical');
                svgContainer.classList.remove('horizontal');
            } else {
                svgContainer.classList.remove('vertical');
                svgContainer.classList.add('horizontal');
            }
        });
        if (contentParam) {
        document.getElementById('md-content').src = `assets/flux/${contentParam}/index.md`;
        } else {
            document.getElementById('md-content').src = `assets/flux/001/index.md`;
        }


    })
    .catch((error) => {
        console.error('Error fetching all markdown files:', error);
    });


