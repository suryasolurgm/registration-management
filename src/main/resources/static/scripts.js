document.addEventListener('DOMContentLoaded', function() {
    loadRegistrations();
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;

    const data = {
        name: name,
        email: email,
        dateOfBirth: dateOfBirth
    };

    fetch('/api/registrations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = 'Registration successful!';
        loadRegistrations();
    })
    .catch(error => {
        document.getElementById('response').innerText = 'Error: ' + error.message;
    });
});

function loadRegistrations() {
    fetch('/api/registrations')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('registrationsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        data.forEach(registration => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = registration.id;
            row.insertCell(1).innerText = registration.name;
            row.insertCell(2).innerText = registration.email;
            row.insertCell(3).innerText = registration.dateOfBirth;
            const actionsCell = row.insertCell(4);
            actionsCell.innerHTML = `
                <button onclick="editRegistration(${registration.id})">Edit</button>
                <button onclick="deleteRegistration(${registration.id})">Delete</button>
            `;
        });
    });
}

function editRegistration(id) {
    fetch(`/api/registrations/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('dateOfBirth').value = data.dateOfBirth;
        document.getElementById('registrationForm').dataset.id = id;
    });
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('registrationForm').dataset.id;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;

    const data = {
        name: name,
        email: email,
        dateOfBirth: dateOfBirth
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/registrations/${id}` : '/api/registrations';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
    })
    .then(data => {
        document.getElementById('response').innerText = id ? 'Registration updated!' : 'Registration successful!';
        loadRegistrations();
        document.getElementById('registrationForm').reset();
        delete document.getElementById('registrationForm').dataset.id;
    })
    .catch(error => {
        document.getElementById('response').innerText = 'Error: ' + error.message;
    });
});

function deleteRegistration(id) {
    fetch(`/api/registrations/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        document.getElementById('response').innerText = 'Registration deleted!';
        loadRegistrations();
    })
    .catch(error => {
        document.getElementById('response').innerText = 'Error: ' + error.message;
    });
}