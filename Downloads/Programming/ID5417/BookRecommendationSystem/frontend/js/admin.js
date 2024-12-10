const token = localStorage.getItem('token');
if (!token) {
    alert('Please login to access this page');
    window.location.href = 'login.html';
}

fetch('http://localhost:3000/admin/pending', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {
    const list = document.getElementById('pendingList');
    data.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        const approveButton = document.createElement('button');
        approveButton.textContent = 'Approve';
        approveButton.addEventListener('click', () => updateStatus(book.id, 'approved'));
        const rejectButton = document.createElement('button');
        rejectButton.textContent = 'Reject';
        rejectButton.addEventListener('click', () => updateStatus(book.id, 'rejected'));
        li.appendChild(approveButton);
        li.appendChild(rejectButton);
        list.appendChild(li);
    });
});

function updateStatus(id, status) {
    fetch('http://localhost:3000/admin/update-status', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload();
    });
}

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
