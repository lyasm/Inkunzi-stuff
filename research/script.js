let NationData;
let techData;
// Fetch The JSON data
fetch('../research.json')
    .then(response => response.json())
    .then(jsonData => {
	NationData = jsonData;

	// Get the datalist and populate it with nation names
	const nationList = document.getElementById('nationList');
	Object.keys(NationData).forEach(nationName => {
	    const option = document.createElement('option');
	    option.value = nationName;
	    nationList.appendChild(option);
	});
    })
    .catch(error => console.error('Error loading JSON:', error));

// // Fetch the tech JSON data
// fetch('../tech.json')
//     .then(response => response.json())
//     .then(techJsonData => {
// 	techData = techJsonData;
//     })
//     .catch(error => console.error('Error loading tech JSON:', error));
// Load tech data asynchronously
fetch('../tech.json')
    .then(response => response.json())
    .then(techJsonData => {
        // Initialize Cytoscape after loading tech data
        initializeCytoscape(techJsonData);
    })
    .catch(error => console.error('Error loading tech JSON:', error));

// Function to initialize Cytoscape
function initializeCytoscape(techData) {
    // Create nodes and edges based on tech data
    const elements = [];
    for (const key in techData) {
        const tech = techData[key];
        elements.push({ data: { id: key, label: `${key}\n(${tech.Type})` } });

        // Add edges for requirements
        for (let i = 1; i <= 4; i++) {
            const reqKey = `Req ${i}`;
            const reqValue = tech[reqKey];

            if (reqValue) {
                elements.push({ data: { id: `${key}-${reqValue}`, source: key, target: reqValue } });
            }
        }
    }

    // Initialize Cytoscape
    var cy = cytoscape({
        container: document.getElementById('cy'), // container to render in
        elements: elements,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(label)',
                    'text-wrap': 'wrap',
                    'text-max-width': '150px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ],
        layout: {
            name: 'grid',
            rows: 1
        }
    });
}

// Function to filter nations based on user input
function filterNations() {
    const input = document.getElementById('nationDropdown').value.toLowerCase();
    const filteredNations = Object.keys(NationData).filter(nationName => nationName.toLowerCase().includes(input));

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

    const selectedNationData = NationData[selectedNationName];
    console.log(selectedNationData);
}


// Load tech data asynchronously
fetch('../tech.json')
    .then(response => response.json())
    .then(techJsonData => {
        // Initialize Cytoscape after loading tech data
        initializeCytoscape(techJsonData);
    })
    .catch(error => console.error('Error loading tech JSON:', error));

function initializeCytoscape(techData) {
    // Create nodes and edges based on tech data
    const elements = [];
    const types = {};
    console.log(techData);

    for (const key in techData) {
        const tech = techData[key];

        // Create a node for each technology
        elements.push({ data: { id: key, label: `${key}\n(${tech.Type})`, age:  `${tech.Age}`, type: `${tech.Type}`,  req: `${tech["Req 1"] != null}`} });
	console.log(elements);
        // Add edges for requirements
        for (let i = 1; i <= 4; i++) {
            const reqKey = `Req ${i}`;
            const reqValue = tech[reqKey];

            if (reqValue) {
                elements.push({ data: { id: `${key}-${reqValue}`, source: reqValue, target: key } });
            }
        }
        // Group technologies by type
        if (!types[tech.Type]) {
            types[tech.Type] = [];
        }
        types[tech.Type].push(key);
    }

    console.log(techData);
    // Initialize Cytoscape with a custom layout
    var cy = cytoscape({
        container: document.getElementById('cy'), // container to render in
        elements: elements,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(label)',
                    'text-wrap': 'wrap',
                    'color': '#ffffff',
                    'text-max-width': '150px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'taxi'
                }
            }
        ],
	layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10,
	fit: true,
            roots: elements[req=false],
        spacingFactor: 1.75, // Adjust as needed
            avoidOverlap: true,
        depthSort: function (a, b) {
            // Sorting nodes based on 'Age' property
            var ageOrder = {
                'Cultural': 1,
                'Agriculture': 2,
                'Warfare': 3,
                'Infrastructure': 4,
                'Industrial': 5
            };

            return ageOrder[a.data('type')] - ageOrder[b.data('type')];
        }
	}
    });
var types_l = ['Cultural', 'Agriculture', 'Warfare', 'Infrastructure', 'Industrial'];
var boundingBoxWidth = 200;
function filterByType(type) {
    return function (item) {
        return item.type === type;
    };
}

    types_l.forEach(function (type, index) {
	console.log(index);
	console.log(elements.filter(filterByType(type)));
	var typeNodes = elements.filter(filterByType(type));
	var boundingBoxX = boundingBoxWidth * index;

function filterByType(type) {
    return function (item) {
        return item.type === type;
    };
}

    cy.add({
        group: 'nodes',
        data: {
            id: 'boundingBox_' + type,
            label: type
        },
        position: {
            x: boundingBoxX,
            y: 0
        },
        style: {
            'background-opacity': 0,
            'border-width': 1,
            'border-color': '#999',
            'shape': 'roundrectangle',
            'width': boundingBoxWidth,
            'height': 100
        }
    });

    typeNodes.positions(function (node) {
        return {
            x: node.position().x + boundingBoxX,
            y: node.position().y
        };
    });
});
}
