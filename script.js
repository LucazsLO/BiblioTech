// Dados da aplicação
const allBooks = [ // Centralized all book data here
    {
        id: 1,
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        category: "Tecnologia",
        available: true,
        rating: 4.8,
        description: "Guia essencial para escrever código limpo e manutenível",
        cover: "images/Clean Code.jpg",
        isFavorited: false,
        isPopular: true,
        isNewAcquisition: false
    },
    {
        id: 2,
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        author: "Gang of Four",
        category: "Tecnologia",
        available: true,
        rating: 4.6,
        description: "Padrões fundamentais de design em programação orientada a objetos",
        cover: "images/Design Patterns.jpg",
        isFavorited: false,
        isPopular: true,
        isNewAcquisition: false
    },
    {
        id: 3,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        category: "Tecnologia",
        available: true,
        rating: 4.7,
        description: "Sua jornada para a maestria em programação",
        cover: "images/The Good Parts.jpg", // This cover might be incorrect based on your original comment
        isFavorited: false,
        isPopular: false,
        isNewAcquisition: true
    },
    {
        id: 4,
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        category: "Programação",
        available: false,
        rating: 4.5,
        description: "Explorando as melhores características do JavaScript",
        cover: "images/The Pragmatic.jpg", // This cover might be incorrect based on your original comment
        isFavorited: true,
        isPopular: true,
        isNewAcquisition: false
    },
    {
        id: 5,
        title: "Refactoring: Improving the Design of Existing Code",
        author: "Martin Fowler",
        category: "Tecnologia",
        available: true, // Set to true if it's back
        rating: 4.7,
        description: "Técnicas para refatorar código existente e melhorar seu design.",
        cover: "images/Refactoring.jpg",
        isFavorited: false,
        isPopular: false,
        isNewAcquisition: true
    },
    {
        id: 6,
        title: "The Mythical Man-Month",
        author: "Frederick Brooks Jr.",
        category: "Gestão de Projetos",
        available: true,
        rating: 4.2,
        description: "Ensaios sobre engenharia de software e gerenciamento de projetos.",
        cover: "images/The Mythical Man-Month.jpg",
        isFavorited: false, // Updated to false by default for better management
        isPopular: true,
        isNewAcquisition: false
    },
    {
        id: 7,
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        category: "Programação",
        available: true,
        rating: 4.4,
        description: "Uma introdução abrangente ao JavaScript moderno.",
        cover: "images/Eloquent JavaScript.jpg",
        isFavorited: false, // Updated to false by default for better management
        isPopular: false,
        isNewAcquisition: true
    },
    {
        id: 8,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "Psicologia",
        available: true,
        rating: 4.9,
        description: "Explora os dois sistemas que impulsionam nosso pensamento.",
        cover: "images/Thinking Fast and Slow.jpg",
        isFavorited: false,
        isPopular: true,
        isNewAcquisition: false
    },
    {
        id: 9,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "História",
        available: true,
        rating: 4.7,
        description: "Uma visão abrangente da história da humanidade.",
        cover: "images/Sapiens.jpg",
        isFavorited: false,
        isPopular: true,
        isNewAcquisition: true
    }
];

// User-specific data (initially empty or loaded from storage)
let userLoans = [
    // Example: A book that was borrowed
    allBooks.find(b => b.id === 5) ? { ...allBooks.find(b => b.id === 5), dueDate: "2025-06-15" } : null
].filter(Boolean); // Filter out any nulls if book id not found

let userWishlist = [
    // Example: A book added to wishlist
    allBooks.find(b => b.id === 4) ? { ...allBooks.find(b => b.id === 4), isFavorited: true } : null,
    allBooks.find(b => b.id === 6) ? { ...allBooks.find(b => b.id === 6), isFavorited: true } : null
].filter(Boolean);


const userActions = {
    student: [
        {
            icon: "fas fa-book-reader",
            title: "Meus Empréstimos",
            description: "Visualize seus livros emprestados e prazos",
            section: "my-loans"
        },
        {
            icon: "fas fa-heart",
            title: "Lista de Desejos",
            description: "Seus livros favoritos e lista de espera",
            section: "wishlist"
        },
        {
            icon: "fas fa-user-circle",
            title: "Meu Perfil",
            description: "Gerencie suas informações pessoais",
            section: "my-profile"
        }
    ],
    librarian: [
        {
            icon: "fas fa-book-medical",
            title: "Gerenciar Acervo",
            description: "Adicionar, editar e remover livros"
        },
        {
            icon: "fas fa-exchange-alt",
            title: "Empréstimos Ativos",
            description: "Controlar empréstimos e devoluções"
        },
        {
            icon: "fas fa-chart-line",
            title: "Relatórios",
            description: "Estatísticas de uso da biblioteca"
        }
    ],
    admin: [
        {
            icon: "fas fa-cogs",
            title: "Configurações do Sistema",
            description: "Configurar o sistema e permissões de usuários"
        },
        {
            icon: "fas fa-user-shield",
            title: "Gerenciar Usuários",
            description: "Adicionar, editar e remover usuários"
        },
        {
            icon: "fas fa-analytics",
            title: "Analytics do Sistema",
            description: "Métricas detalhadas e desempenho do sistema"
        }
    ]
};

// Elementos DOM
const userTypeSelect = document.getElementById('userType');
const userInitial = document.getElementById('userInitial');
const userLabel = document.getElementById('userLabel');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const booksGrid = document.getElementById('booksGrid'); // Now for Featured Books
const actionsGrid = document.getElementById('actionsGrid');
const loadingFeaturedBooksMessage = document.getElementById('loadingFeaturedBooks');
const sidebarNavItems = document.querySelectorAll('.nav-item');

// New section elements
const homeSection = document.getElementById('home-section');
const myLoansSection = document.getElementById('my-loans-section');
const wishlistSection = document.getElementById('wishlist-section');
const myProfileSection = document.getElementById('my-profile-section');

const popularBooksGrid = document.getElementById('popularBooksGrid');
const latestAcquisitionsGrid = document.getElementById('latestAcquisitionsGrid');
const recommendedBooksGrid = document.getElementById('recommendedBooksGrid');

const loansGrid = document.getElementById('loansGrid');
const wishlistGrid = document.getElementById('wishlistGrid');

const emptyLoansMessage = document.getElementById('emptyLoans');
const emptyWishlistMessage = document.getElementById('emptyWishlist');

const profileUserInitial = document.getElementById('profileUserInitial');
const profileUserName = document.getElementById('profileUserName');
const profileUserEmail = document.getElementById('profileUserEmail');
const profileUserType = document.getElementById('profileUserType');
const profileUserMatricula = document.getElementById('profileUserMatricula');


// --- Funções Auxiliares ---
/**
 * Retorna o rótulo do tipo de usuário em português.
 * @param {string} userType - O tipo de usuário (e.g., 'student', 'librarian').
 * @returns {string} O rótulo traduzido.
 */
function getUserTypeLabel(userType) {
    const labels = {
        'student': 'Estudante',
        'librarian': 'Bibliotecário',
        'admin': 'Administrador'
    };
    return labels[userType] || 'Usuário';
}

/**
 * Cria o HTML para um card de livro.
 * @param {object} book - O objeto do livro.
 * @param {boolean} isLoan - Indica se é um livro emprestado (para exibir data de devolução).
 * @returns {string} O HTML do card do livro.
 */
function createBookCard(book, isLoan = false) {
    const coverHtml = book.cover
        ? `<img src="${book.cover}" alt="Capa do livro ${book.title}">`
        : `<i class="fas fa-book"></i>`;

    const loanInfo = isLoan && book.dueDate ? `<p class="loan-due-date">Devolver até: ${book.dueDate}</p>` : '';
    const buttonText = isLoan ? 'Devolver' : (book.available ? 'Emprestar' : 'Lista de Espera');
    const buttonClass = isLoan ? 'return' : (book.available ? 'available' : 'unavailable');
    const buttonAriaLabel = isLoan ? 'Devolver livro' : (book.available ? 'Emprestar livro' : 'Entrar na lista de espera');

    return `
        <div class="book-card" data-id="${book.id}" tabindex="0" role="link" aria-label="Ver detalhes do livro ${book.title}">
            <div class="book-header">
                <div class="book-cover">
                    ${coverHtml}
                </div>
                <div class="book-badges">
                    <span class="badge ${book.available && !isLoan ? 'available' : 'unavailable'}">
                        ${book.available && !isLoan ? 'Disponível' : (isLoan ? 'Emprestado' : 'Indisponível')}
                    </span>
                    <i class="fas fa-heart heart-icon ${book.isFavorited ? 'favorited' : ''}" data-book-id="${book.id}" role="button" aria-label="${book.isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"></i>
                </div>
            </div>
            <div class="book-content">
                <h4 class="book-title">${book.title}</h4>
                <p class="book-author">por ${book.author}</p>
                <p class="book-description">${book.description}</p>
                ${loanInfo}
                <div class="book-footer">
                    <span class="badge category">${book.category}</span>
                    <div class="rating">
                        <i class="fas fa-star rating-star"></i>
                        <span class="rating-value">${book.rating}</span>
                    </div>
                </div>
                <button class="book-btn ${buttonClass}"
                        ${isLoan ? '' : (book.available ? '' : 'disabled')}
                        data-book-id="${book.id}" data-available="${book.available}" data-is-loan="${isLoan}"
                        aria-label="${buttonAriaLabel}">
                    ${buttonText}
                </button>
            </div>
        </div>
    `;
}

/**
 * Cria o HTML para um card de ação.
 * @param {object} action - O objeto da ação.
 * @returns {string} O HTML do card de ação.
 */
function createActionCard(action) {
    return `
        <div class="action-card" data-action-title="${action.title}" data-section="${action.section}" tabindex="0" role="link" aria-label="Ir para ${action.title}">
            <div class="action-title">
                <i class="${action.icon}"></i>
                ${action.title}
            </div>
            <p class="action-description">${action.description}</p>
        </div>
    `;
}

/**
 * Exibe uma mensagem toast temporária.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - Tipo da mensagem (info, success, error).
 * @param {number} duration - Duração em milissegundos.
 */
function showToast(message, type = 'info', duration = 2500) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }

    let toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.textContent = message;
    toast.style.opacity = '0'; // Começa invisível
    document.body.appendChild(toast);

    // Força reflow para garantir a transição
    void toast.offsetWidth;
    toast.style.opacity = '0.95'; // Faz o fade-in

    setTimeout(() => {
        toast.style.opacity = '0'; // Fade-out
        toast.addEventListener('transitionend', () => toast.remove());
        setTimeout(() => {
            if (document.body.contains(toast)) toast.remove();
        }, 1000);
    }, duration);
}

// --- Funções de Carregamento de Conteúdo ---
/**
 * Carrega e exibe os livros em destaque no grid.
 */
function loadFeaturedBooks() {
    if (loadingFeaturedBooksMessage) {
        loadingFeaturedBooksMessage.style.display = 'block';
    }

    setTimeout(() => {
        const featured = allBooks.filter(book => book.rating >= 4.7); // Example filter
        if (booksGrid) {
            booksGrid.innerHTML = featured.map(book => createBookCard(book)).join('');
        }
        if (loadingFeaturedBooksMessage) {
            loadingFeaturedBooksMessage.style.display = 'none';
        }
    }, 500);
}

/**
 * Carrega e exibe os livros populares no grid.
 */
function loadPopularBooks() {
    const loadingMessage = popularBooksGrid.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.style.display = 'block';
    }
    setTimeout(() => {
        const popular = allBooks.filter(book => book.isPopular);
        if (popularBooksGrid) {
            popularBooksGrid.innerHTML = popular.map(book => createBookCard(book)).join('');
        }
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
    }, 500);
}

/**
 * Carrega e exibe as últimas aquisições no grid.
 */
function loadLatestAcquisitions() {
    const loadingMessage = latestAcquisitionsGrid.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.style.display = 'block';
    }
    setTimeout(() => {
        const latest = allBooks.filter(book => book.isNewAcquisition);
        if (latestAcquisitionsGrid) {
            latestAcquisitionsGrid.innerHTML = latest.map(book => createBookCard(book)).join('');
        }
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
    }, 500);
}

/**
 * Carrega e exibe as recomendações personalizadas no grid.
 * (Para este exemplo, será uma seleção aleatória ou de alta avaliação)
 */
function loadRecommendedBooks() {
    const loadingMessage = recommendedBooksGrid.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.style.display = 'block';
    }
    setTimeout(() => {
        // Simple recommendation logic: top-rated or random
        const recommendations = allBooks.filter(book => book.rating >= 4.5 && !book.isFavorited).slice(0, 3);
        if (recommendedBooksGrid) {
            recommendedBooksGrid.innerHTML = recommendations.map(book => createBookCard(book)).join('');
        }
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
    }, 500);
}


/**
 * Carrega e exibe as ações disponíveis para o tipo de usuário especificado.
 * @param {string} userType - O tipo de usuário.
 */
function loadUserActions(userType) {
    const actions = userActions[userType] || [];
    if (actionsGrid) {
        actionsGrid.innerHTML = actions.map(action => createActionCard(action)).join('');
    }
}

/**
 * Atualiza a interface do usuário com base no tipo de usuário selecionado.
 * @param {string} userType - O tipo de usuário.
 */
function updateUserInterface(userType) {
    const label = getUserTypeLabel(userType);
    userLabel.textContent = label;
    userInitial.textContent = label.charAt(0);
    profileUserInitial.textContent = label.charAt(0);
    profileUserType.textContent = label;
    loadUserActions(userType);
    // When user type changes, go back to home
    renderSection('home');
}

/**
 * Renderiza o conteúdo da seção "Meus Empréstimos".
 */
function renderMyLoans() {
    if (userLoans.length === 0) {
        loansGrid.innerHTML = `<p class="empty-state-message">Você não possui livros emprestados no momento.</p>`;
    } else {
        loansGrid.innerHTML = userLoans.map(book => createBookCard(book, true)).join('');
    }
}

/**
 * Renderiza o conteúdo da seção "Lista de Desejos".
 */
function renderWishlist() {
    if (userWishlist.length === 0) {
        wishlistGrid.innerHTML = `<p class="empty-state-message">Sua lista de desejos está vazia.</p>`;
    } else {
        wishlistGrid.innerHTML = userWishlist.map(book => createBookCard(book)).join('');
    }
}

/**
 * Renderiza o conteúdo da seção "Meu Perfil".
 */
function renderMyProfile() {
    // Current user type is already handled by updateUserInterface
    // Mock user data for profile (could come from an API in a real app)
    profileUserName.textContent = 'Estudante Exemplo';
    profileUserEmail.textContent = 'estudante@example.com';
    profileUserMatricula.textContent = '123456789';
}

/**
 * Mostra a seção especificada e esconde as outras.
 * Atualiza o estado da navegação lateral.
 * @param {string} sectionId - O ID da seção a ser mostrada (e.g., 'home', 'my-loans').
 */
function renderSection(sectionId) {
    const allContentSections = document.querySelectorAll('.content-section');
    allContentSections.forEach(section => {
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update active state in sidebar
    sidebarNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });

    // Call specific render functions for dynamic content
    if (sectionId === 'home') {
        loadFeaturedBooks();
        loadPopularBooks();
        loadLatestAcquisitions();
        loadRecommendedBooks();
    } else if (sectionId === 'my-loans') {
        renderMyLoans();
    } else if (sectionId === 'wishlist') {
        renderWishlist();
    } else if (sectionId === 'my-profile') {
        renderMyProfile();
    }
}


// --- Manipuladores de Eventos ---
/**
 * Lida com a funcionalidade de busca.
 */
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        console.log('Buscando por:', searchTerm);
        showToast(`Buscando por: "${searchTerm}"`, 'info');
        // Lógica de busca real seria implementada aqui (filtrar allBooks, etc.)
    } else {
        showToast('Por favor, digite um termo para buscar.', 'error');
    }
}

/**
 * Lida com o clique no card do livro (para mostrar detalhes).
 * @param {number} bookId - O ID do livro.
 */
function handleBookDetailsClick(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (book) {
        showToast(`Detalhes do livro: ${book.title}`, 'info');
        // Lógica para exibir modal de detalhes do livro, etc.
    }
}

/**
 * Lida com o clique no ícone de coração (favoritar/desfavoritar).
 * @param {Event} event - O objeto do evento de clique.
 */
function handleHeartClick(event) {
    event.stopPropagation();
    const bookId = Number(event.target.dataset.bookId);

    // Find the book in allBooks to modify its original state
    const book = allBooks.find(b => b.id === bookId);

    if (book) {
        book.isFavorited = !book.isFavorited; // Toggle favorite status
        event.target.classList.toggle('favorited', book.isFavorited); // Update heart icon

        // Update userWishlist based on favorite status
        if (book.isFavorited) {
            if (!userWishlist.some(b => b.id === book.id)) {
                userWishlist.push(book);
            }
        } else {
            userWishlist = userWishlist.filter(b => b.id !== book.id);
        }

        const message = book.isFavorited ?
            `${book.title} adicionado aos favoritos!` :
            `${book.title} removido dos favoritos.`;
        showToast(message, 'success');

        // Re-render relevant sections if they are currently visible
        if (!homeSection.classList.contains('hidden')) {
            loadFeaturedBooks(); // To update favorite icons on home
            loadPopularBooks();
            loadLatestAcquisitions();
            loadRecommendedBooks();
        }
        if (!wishlistSection.classList.contains('hidden')) {
            renderWishlist();
        }
    }
}

/**
 * Lida com o clique no botão de empréstimo/lista de espera/devolver.
 * @param {Event} event - O objeto do evento de clique.
 */
function handleBookActionButtonClick(event) {
    event.stopPropagation();
    const bookId = Number(event.target.dataset.bookId);
    const isLoanAction = event.target.dataset.isLoan === 'true'; // Check if it's a return action

    const book = allBooks.find(b => b.id === bookId);

    if (book) {
        if (isLoanAction) { // Handle return
            userLoans = userLoans.filter(loan => loan.id !== book.id);
            book.available = true; // Make book available again in main data
            showToast(`${book.title} foi devolvido!`, 'success');
        } else if (book.available) { // Handle loan
            book.available = false; // Mark as unavailable in main data
            // Add to user loans with a due date (mocked for now)
            userLoans.push({ ...book, dueDate: "2025-06-30" });
            showToast(`${book.title} foi emprestado!`, 'success');
        } else { // Handle wishlist (if not available for loan)
            if (!userWishlist.some(b => b.id === book.id)) {
                userWishlist.push({ ...book, isFavorited: true }); // Add to wishlist and mark as favorited
                showToast(`${book.title} adicionado à lista de espera!`, 'success');
                // Update favorite icon on relevant cards
                const heartIcon = document.querySelector(`.heart-icon[data-book-id="${book.id}"]`);
                if (heartIcon) heartIcon.classList.add('favorited');
            } else {
                showToast(`${book.title} já está na sua lista de espera.`, 'info');
            }
        }
        // Re-render all sections that might be affected
        if (!homeSection.classList.contains('hidden')) {
            loadFeaturedBooks();
            loadPopularBooks();
            loadLatestAcquisitions();
            loadRecommendedBooks();
        }
        if (!myLoansSection.classList.contains('hidden')) {
            renderMyLoans();
        }
        if (!wishlistSection.classList.contains('hidden')) {
            renderWishlist();
        }
    }
}


/**
 * Lida com o clique em um card de ação.
 * @param {Event} event - O objeto do evento de clique.
 */
function handleActionCardClick(event) {
    const actionCard = event.target.closest('.action-card');
    if (actionCard) {
        const actionTitle = actionCard.dataset.actionTitle;
        const sectionId = actionCard.dataset.section;

        if (sectionId) {
            renderSection(sectionId);
            showToast(`Navegando para: ${actionTitle}`, 'info');
        } else {
            console.log('Ação clicada:', actionTitle);
            showToast(`Ação: "${actionTitle}" (Funcionalidade a ser implementada)`, 'info');
            // Lógica para navegar para a página correspondente à ação (para ações não-seção)
        }
    }
}

/**
 * Lida com o clique nos itens de navegação da sidebar.
 * @param {Event} event - O objeto do evento de clique.
 */
function handleSidebarNavigation(event) {
    const navItem = event.target.closest('.nav-item');
    if (navItem) {
        const sectionId = navItem.dataset.section;
        renderSection(sectionId);
    }
}

// --- Event Listeners ---
userTypeSelect.addEventListener('change', (e) => {
    updateUserInterface(e.target.value);
});

searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Delegação de eventos para os cards de livro (em todas as grids que usam book-card)
// We attach to document because book-cards can exist in multiple dynamically loaded sections
document.addEventListener('click', (e) => {
    // Check if the click is within a book-card
    const card = e.target.closest('.book-card');
    if (card) {
        // Check for heart icon
        if (e.target.classList.contains('heart-icon')) {
            handleHeartClick(e);
            return;
        }
        // Check for book action button
        if (e.target.classList.contains('book-btn')) {
            handleBookActionButtonClick(e);
            return;
        }
        // If not specific interactive elements, handle card details click
        const bookId = Number(card.dataset.id);
        handleBookDetailsClick(bookId);
    }
});


// Delegação de eventos para os cards de ação
actionsGrid.addEventListener('click', (e) => {
    handleActionCardClick(e);
});

// Event listener para os itens de navegação da sidebar
sidebarNavItems.forEach(item => {
    item.addEventListener('click', handleSidebarNavigation);
});

// --- Inicialização da Aplicação ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    updateUserInterface('student'); // Set initial user type
    renderSection('home'); // Display the home section initially
});