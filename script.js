    // Funciones para interactuar con la API
    async function fetchRanking() {
        try {
            const response = await fetch('https://api.example.com/ranking');
            const data = await response.json();
            console.log('Ranking from API:', data);
            return data;
        } catch (error) {
            console.error('Error fetching ranking:', error);
        }
    }

    async function saveUserToAPI(user) {
        try {
            const response = await fetch('https://api.example.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log('User saved to API:', data);
        } catch (error) {
            console.error('Error saving user to API:', error);
        }
    }

    // Actualizar el ranking en línea y local
    async function updateOnlineLeaderboard() {
        const leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = '<p>Cargando ranking...</p>';
        const data = await fetchRanking();
        if (data) {
            leaderboard.innerHTML = '';
            data.forEach(user => {
                const entry = document.createElement('div');
                entry.className = 'leaderboard-entry';
                entry.innerHTML = `
                    <span>${user.name}</span>
                    <span>${user.balance} OD</span>
                `;
                leaderboard.appendChild(entry);
            });
        } else {
            leaderboard.innerHTML = '<p>Error al cargar el ranking.</p>';
        }
    }

    // Guardar usuario localmente y en la API
    function saveUser(user) {
        // Guardar en localStorage
        users[user.name] = { password: user.password, money: user.balance, avatar: user.avatar };
        saveUsers();

        // Guardar en la API
        saveUserToAPI(user);
    }

    // Sobrescribir la función de actualización de balance para incluir la API
    function updateBalance(amount) {
        balance += amount;
        if (balance < 0) balance = 0;
        users[currentUser].money = balance;
        document.getElementById('userBalance').innerText = `${balance} OD`;
        saveUsers();

        // Guardar el usuario actualizado en la API
        saveUserToAPI({
            name: currentUser,
            balance: balance,
            avatar: users[currentUser].avatar,
        });

        // Actualizar el ranking en línea
        updateOnlineLeaderboard();
    }

    // Llamar a la función para cargar el ranking al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        updateOnlineLeaderboard();
    });
