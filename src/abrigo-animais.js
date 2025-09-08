import { animais } from "./Pets.js";

const aptidao = (brinquedosPessoa, animal) => {
  const pessoa = Array.isArray(brinquedosPessoa) ? brinquedosPessoa.map(b => b && b.trim()) : [];
  const brinquedosAnimal = Array.isArray(animal.brinquedos) ? animal.brinquedos.map(b => b && b.trim()) : [];
  if (animal.nome === 'Loco') {
    const brinquedosCompletos = brinquedosAnimal.every(toy => pessoa.includes(toy));
    return brinquedosCompletos;
  }
  let contador = 0;
  for (const brinquedos of pessoa) {
    if (brinquedos === brinquedosAnimal[contador]) contador++;
    if (contador === brinquedosAnimal.length) return true;
  }
  return false;
};

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoa1 = brinquedosPessoa1 ? brinquedosPessoa1.split(',') : [];
    const pessoa2 = brinquedosPessoa2 ? brinquedosPessoa2.split(',') : [];
    const listaAnimais = ordemAnimais ? ordemAnimais.split(',') : [];

    const possiveisAnimais = new Set();

    for (const nome of listaAnimais) {
      if (!animais[nome] || possiveisAnimais.has(nome)) {
        return { erro: 'Animal inválido', lista: null };
      }
      possiveisAnimais.add(nome);
    }

    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
      return { erro: 'Brinquedo inválido', lista: null };
    }

    const adotarAnimais = listaAnimais.map(nome => ({ nome, ...animais[nome] }));

    const adotadosPorPessoa1 = [];
    const adotadosPorPessoa2 = [];
    const resultadoFinal = [];

    for (const animal of adotarAnimais) {
      let adotaPetP1 = false, adotaPetP2 = false;

      if (animal.nome === 'Loco') {
        adotaPetP1 = adotadosPorPessoa1.length > 0 && aptidao(pessoa1, animal, adotadosPorPessoa1);
        adotaPetP2 = adotadosPorPessoa2.length > 0 && aptidao(pessoa2, animal, adotadosPorPessoa2);
      } else {
        adotaPetP1 = adotadosPorPessoa1.length < 3 && aptidao(pessoa1, animal, adotadosPorPessoa1);
        adotaPetP2 = adotadosPorPessoa2.length < 3 && aptidao(pessoa2, animal, adotadosPorPessoa2);
      }

      let dono = 'abrigo';
      if (adotaPetP1 && !adotaPetP2) {
        dono = 'pessoa 1';
        adotadosPorPessoa1.push(animal.nome);
      } else if (adotaPetP2 && !adotaPetP1) {
        dono = 'pessoa 2';
        adotadosPorPessoa2.push(animal.nome);
      }

      resultadoFinal.push(`${animal.nome} - ${dono}`);
    }

    return { lista: resultadoFinal, erro: null };
  }
}
export { AbrigoAnimais as AbrigoAnimais };