const token = localStorage.getItem('token');
if (!token) {
    alert('Please login to access this page');
    window.location.href = 'login.html';
}

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    fetch('http://localhost:3000/user/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('bookForm').reset();
        fetchUserRecommendations();
    });
});

function fetchUserRecommendations() {
    fetch('http://localhost:3000/user/user-recommendations', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('userRecommendations');
        list.innerHTML = '';
        data.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editRecommendation(book.id, book.title, book.author));
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteRecommendation(book.id));
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            list.appendChild(li);
        });
    });
}

function editRecommendation(id, title, author) {
    const newTitle = prompt('Enter new title:', title);
    const newAuthor = prompt('Enter new author:', author);
    if (newTitle && newAuthor) {
        fetch('http://localhost:3000/user/update-recommendation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id, title: newTitle, author: newAuthor })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchUserRecommendations();
        });
    }
}

function deleteRecommendation(id) {
    if (confirm('Are you sure you want to delete this recommendation?')) {
        fetch('http://localhost:3000/user/delete-recommendation', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchUserRecommendations();
        });
    }
}

fetch('http://localhost:3000/user/approved', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {
    const list = document.getElementById('approvedList');
    data.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        list.appendChild(li);
    });
});

fetchUserRecommendations();

document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});
