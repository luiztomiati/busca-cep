function pesquisarApi() {
  const formularioRetorno = document.forms.resultadoPesquisa.elements;
  const containerModal = document.querySelector('[data-modal="container"]');
  const form = document.getElementById('formId');
  const formData = new FormData(form);
  const dados = Object.fromEntries(formData.entries());
  const fechar = document.querySelector('[data-modal="fechar"]');
  if (dados.CEP) {
    const url = `https://viacep.com.br/ws/${dados.CEP}/json/`;

    fechar.addEventListener('click', () => {
      containerModal.classList.remove('ativo');
    });
    containerModal.addEventListener('click', (event) => {
      if (event.target === containerModal) {
        containerModal.classList.remove('ativo');
      }
    });
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao acessar a API ' + response.status);
        }
        return response.json();
      })
      .then((cep) => {
        if (cep.erro) {
          exibeModalCepNaoEncontrado();
        } else {
          formularioRetorno.idEndereco.value = cep.logradouro;
          formularioRetorno.idComplemento.value = cep.complemento;
          formularioRetorno.idBairro.value = cep.bairro;
          formularioRetorno.idEstado.value = cep.estado;
          formularioRetorno.idLocalidade.value = cep.localidade;
          containerModal.classList.add('ativo');
        }
      })
      .catch((error) => {
        console.error(error.mesage);
      });
  }
}

function exibeModalCepNaoEncontrado() {
  const CepNaoEncontrado = document.querySelector(
    '[data-modal="container-nao-encontrado"]',
  );
  CepNaoEncontrado.classList.add('ativo');
  const fecharAviso = document.querySelector('[data-modal="fechar-aviso"]');
  fecharAviso.addEventListener('click', () => {
    CepNaoEncontrado.classList.remove('ativo');
  });

  CepNaoEncontrado.addEventListener('click', (event) => {
    if (event.target === CepNaoEncontrado) {
      CepNaoEncontrado.classList.remove('ativo');
    }
  });
}

const inputCep = document.querySelector('#idCep');
inputCep.addEventListener('blur', () => {
  let valor = inputCep.value.replace(/\D/g, '');
  if (valor.length !== 8) {
    inputCep.value = '';
    return;
  }
  inputCep.value = valor.replace(/^(\d{5})(\d{3})$/, '$1-$2');
});
