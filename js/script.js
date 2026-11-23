const githubUsername = 'miguelmoret81-create';
const container = document.getElementById('repos-container');
const btnTopo = document.getElementById('btn-topo');

async function carregarProjetos() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Erro na requisição');

        const repos = await response.json();
        container.innerHTML = '';

        const meusProjetos = repos.filter(repo => !repo.fork);

        if (meusProjetos.length === 0) {
            container.innerHTML = '<p>Nenhum projeto público encontrado.</p>';
            return;
        }

        meusProjetos.forEach(repo => {
            const linguagem = repo.language ? repo.language : 'Não especificada';
            const descricao = repo.description ? repo.description : 'Sem descrição disponível.';
            
            const nomeFormatado = repo.name.replace(/-/g, ' ').replace(/_/g, ' ');

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <span class="card-tag">GITHUB · REPOSITÓRIO</span>
                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>
                <div class="techs" style="margin-bottom: 15px;">
                    <span>${linguagem}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn-outline" style="padding: 10px 20px; font-size: 0.9rem;">Ver Código <i class="fas fa-external-link-alt"></i></a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Não foi possível carregar os repositórios no momento. Verifique sua conexão.</p>';
    }
}

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

btnTopo.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    carregarProjetos();
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
