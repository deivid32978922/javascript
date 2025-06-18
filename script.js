document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleMode');
  let detalhado = true;

  // Toggle entre modo detalhado e resumido
  toggleBtn.addEventListener('click', () => {
    detalhado = !detalhado;
    document.querySelectorAll('.capitulo').forEach(sec => {
      sec.setAttribute('data-detalhado', detalhado);
    });
    toggleBtn.textContent = detalhado ? 'Modo Resumido' : 'Modo Detalhado';
  });

  // Animação inicial dos capítulos
  document.querySelectorAll('.capitulo').forEach((sec, i) => {
    sec.style.animationDelay = (i * 0.2) + 's';
  });

  // ===== CAPÍTULO 6: Manipulação do DOM =====
  const demoBtn = document.getElementById('demoBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', function() {
      const area = document.getElementById('demoArea');
      const hora = new Date().toLocaleTimeString();
      
      area.innerHTML = `
        <h4>Demonstração DOM</h4>
        <p>Hora atual: ${hora}</p>
        <button onclick="this.style.background='#ff6b6b'; this.textContent='Cor alterada!'">
          Mudar Cor
        </button>
        <button onclick="this.parentElement.innerHTML='<p>Conteúdo removido dinamicamente!</p>'">
          Remover Conteúdo
        </button>
      `;
    });
  }

  // ===== CAPÍTULO 7: Eventos =====
  const eventBtn = document.getElementById('eventBtn');
  const eventInput = document.getElementById('eventInput');
  const eventDemo = document.getElementById('eventDemo');

  if (eventBtn) {
    eventBtn.addEventListener('click', function(e) {
      const info = document.createElement('div');
      info.innerHTML = `<p>Clique detectado em: ${e.clientX}, ${e.clientY}</p>`;
      eventDemo.appendChild(info);
      
      setTimeout(() => {
        info.style.opacity = '0';
        setTimeout(() => info.remove(), 500);
      }, 2000);
    });

    eventBtn.addEventListener('mouseover', function() {
      this.style.background = '#ff6b6b';
      this.style.transform = 'scale(1.05)';
    });

    eventBtn.addEventListener('mouseout', function() {
      this.style.background = '#6fa3ef';
      this.style.transform = 'scale(1)';
    });
  }

  if (eventInput) {
    eventInput.addEventListener('input', function(e) {
      const valor = e.target.value;
      const info = eventDemo.querySelector('p');
      if (info) {
        info.textContent = `Digitando: "${valor}" (${valor.length} caracteres)`;
      }
    });

    eventInput.addEventListener('focus', function() {
      this.style.borderColor = '#6fa3ef';
      this.style.boxShadow = '0 0 5px #6fa3ef';
    });

    eventInput.addEventListener('blur', function() {
      this.style.borderColor = '#ccc';
      this.style.boxShadow = 'none';
    });
  }

  // ===== CAPÍTULO 8: Promises =====
  const promiseBtn = document.getElementById('promiseBtn');
  if (promiseBtn) {
    promiseBtn.addEventListener('click', async function() {
      const resultArea = document.getElementById('promiseResult');
      resultArea.innerHTML = '<p>Iniciando demonstração de Promises...</p>';

      // Função para simular requisição
      function simularRequisicao(dados, tempo = 1000) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.1) {
              resolve(`✅ Dados recebidos: ${dados}`);
            } else {
              reject(`❌ Erro na requisição: ${dados}`);
            }
          }, tempo);
        });
      }

      try {
        resultArea.innerHTML += '<p>🔄 Fazendo primeira requisição...</p>';
        const resultado1 = await simularRequisicao('usuário123', 1500);
        resultArea.innerHTML += `<p>${resultado1}</p>`;

        resultArea.innerHTML += '<p>🔄 Fazendo segunda requisição...</p>';
        const resultado2 = await simularRequisicao('detalhes', 1000);
        resultArea.innerHTML += `<p>${resultado2}</p>`;

        resultArea.innerHTML += '<p>🎉 Todas as requisições completadas!</p>';
      } catch (erro) {
        resultArea.innerHTML += `<p style="color: #ff6b6b;">${erro}</p>`;
      }
    });
  }

  // ===== CAPÍTULO 10: Animações =====
  const animarQuadradoBtn = document.getElementById('animarQuadrado');
  const animarTextoBtn = document.getElementById('animarTexto');
  const animarCorBtn = document.getElementById('animarCor');
  const quadrado = document.getElementById('quadrado');
  const textoAnimado = document.getElementById('textoAnimado');

  if (animarQuadradoBtn && quadrado) {
    animarQuadradoBtn.addEventListener('click', function() {
      const posicaoAtual = quadrado.style.left;
      
      if (posicaoAtual === '200px') {
        quadrado.style.left = '0px';
        quadrado.style.transform = 'rotate(0deg) scale(1)';
        quadrado.style.borderRadius = '8px';
      } else {
        quadrado.style.left = '200px';
        quadrado.style.transform = 'rotate(360deg) scale(1.2)';
        quadrado.style.borderRadius = '50%';
      }
    });
  }

  if (animarTextoBtn && textoAnimado) {
    animarTextoBtn.addEventListener('click', function() {
      let opacidade = 0;
      let escala = 0.5;
      let rotacao = 0;
      
      textoAnimado.style.opacity = '0';
      textoAnimado.style.transform = 'scale(0.5) rotate(0deg)';
      
      function animar() {
        opacidade += 0.05;
        escala += 0.05;
        rotacao += 10;
        
        textoAnimado.style.opacity = opacidade;
        textoAnimado.style.transform = `scale(${escala}) rotate(${rotacao}deg)`;
        
        if (opacidade < 1) {
          requestAnimationFrame(animar);
        } else {
          // Reset após animação
          setTimeout(() => {
            textoAnimado.style.transform = 'scale(1) rotate(0deg)';
          }, 500);
        }
      }
      
      animar();
    });
  }

  if (animarCorBtn && quadrado) {
    let animacaoCorAtiva = false;
    let intervaloCor;
    
    animarCorBtn.addEventListener('click', function() {
      if (animacaoCorAtiva) {
        clearInterval(intervaloCor);
        animacaoCorAtiva = false;
        this.textContent = 'Animar Cor';
        quadrado.style.backgroundColor = '#6fa3ef';
      } else {
        const cores = ['#6fa3ef', '#ff6b6b', '#51cf66', '#ffd43b', '#ae3ec9', '#fd7e14'];
        let indice = 0;
        
        intervaloCor = setInterval(() => {
          quadrado.style.backgroundColor = cores[indice];
          indice = (indice + 1) % cores.length;
        }, 500);
        
        animacaoCorAtiva = true;
        this.textContent = 'Parar Cor';
      }
    });
  }

  // ===== EFEITOS GERAIS =====
  
  // Efeito de hover nos capítulos
  document.querySelectorAll('.capitulo').forEach(capitulo => {
    capitulo.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    capitulo.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Detectar teclas pressionadas globalmente
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      console.log('Tecla Escape pressionada!');
    }
    
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      console.log('Ctrl+S pressionado - Salvando...');
    }
  });

  // Console log inicial
  console.log('🚀 Livro Interativo de JavaScript carregado!');
  console.log('💡 Dica: Abra o console para ver logs e experimentar com JavaScript!');
}); 