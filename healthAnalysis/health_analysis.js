// Task 3: Defining variables
const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

// Task 4: Function to add patient details
function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
        patients.push({ name, gender: gender.value, age, condition });
        resetForm();
        generateReport();
    } else {
        alert("Please fill all fields.");
    }
}

// Task 5: Function to reset form values
function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
}

// Task 6: Function to generate reports
function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 };
    const genderConditionsCount = {
        Male: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 },
        Female: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 }
    };

    patients.forEach(patient => {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    });

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }
}

// Task 7: Function for searching health conditions
function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
        .then(response => response.json())
        .then(data => {
            const condition = data.conditions.find(item => item.name.toLowerCase() === input);
            if (condition) {
                resultDiv.innerHTML = `<h2>${condition.name}</h2>`;
                resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${condition.symptoms.join(', ')}</p>`;
                resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${condition.prevention.join(', ')}</p>`;
            } else {
                resultDiv.innerHTML = 'Condition not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

// Event Listeners
addPatientButton.addEventListener("click", addPatient);
btnSearch.addEventListener('click', searchCondition);
