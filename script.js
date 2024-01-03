document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('stickyHeader');
  const hoverArea = document.getElementById('hoverArea');

  // Handle hovering to show/hide header
  hoverArea.addEventListener('mouseenter', function() {
    header.style.top = '0';
  });

  hoverArea.addEventListener('mouseleave', function() {
    header.style.top = '-50px';
  });

  // Handle scrolling to show/hide header
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Scrolling down, hide the header
      header.style.top = '-50px';
    } else {
      // Scrolling up, show the header
      header.style.top = '0';
    }
    lastScrollTop = scrollTop;
  });
});


		let data;
	  let armyData;
		// Fetch The JSON data
		fetch('diplo.json')
			.then(response => response.json())
			.then(jsonData => {
				data = jsonData;

				// Get the datalist and populate it with nation names
				const nationList = document.getElementById('nationList');
				Object.keys(data).forEach(nationName => {
					const option = document.createElement('option');
					option.value = nationName;
					nationList.appendChild(option);
				});
			})
			.catch(error => console.error('Error loading JSON:', error));

		// Fetch the army JSON data
		fetch('army.json')
			.then(response => response.json())
			.then(armyJsonData => {
				armyData = armyJsonData;
			})
			.catch(error => console.error('Error loading army JSON:', error));

		// Function to filter nations based on user input
		function filterNations() {
			const input = document.getElementById('nationDropdown').value.toLowerCase();
			const filteredNations = Object.keys(data).filter(nationName => nationName.toLowerCase().includes(input));

			// Update the datalist with filtered nations
			const nationList = document.getElementById('nationList');
			nationList.innerHTML = '';
			filteredNations.forEach(nationName => {
				const option = document.createElement('option');
				option.value = nationName;
				nationList.appendChild(option);
			});
		    readyDisplayNationDetails();
		}

function readyDisplayNationDetails() {
			const selectedNationName = document.getElementById('nationDropdown').value;
			const nationDetails = document.getElementById('nationDetails');
			const armyDetails = document.getElementById('armyDetails');

			// Find the selected nation in the JSON data
    const selectedNationData = data[selectedNationName];
    displayNationDetails(selectedNationData);
			// Display the details in the HTML
			// nationDetails.innerHTML = '<pre>' + JSON.stringify(selectedNationData, null, 2) + '</pre>';
		}
function displayNationDetails(nationData) {
    
}
