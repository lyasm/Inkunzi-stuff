let data;
let techData;
// Fetch The JSON data
fetch('../research.json')
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

// Fetch the tech JSON data
fetch('../tech.json')
    .then(response => response.json())
    .then(techJsonData => {
	techData = techJsonData;
    })
    .catch(error => console.error('Error loading tech JSON:', error));

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
    DisplayNationDetails();
}

function DisplayNationDetails() {
    const selectedNationName = document.getElementById('nationDropdown').value;
    const nationDetails = document.getElementById('nationDetails');
    const techDetails = document.getElementById('techDetails');

    const selectedNationData = data[selectedNationName];
    console.log(selectedNationData);
}
