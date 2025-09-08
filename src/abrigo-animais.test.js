import { AbrigoAnimais } from "./abrigo-animais.js";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve rejeitar brinquedo duplicado da pessooa 1', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'NOVELO,CAIXA', 'Rex,Bola');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar brinquedo duplicado da pessooa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'NOVELO,NOVELO', 'Rex,Bola');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve lidar com brinquedos de pessoa indefinidos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(undefined, 'Bola', 'Rex,Bola');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista[1]).toBe('Bola - abrigo');
    expect(resultado.erro).toBeNull();
  });

  test('Deve rejeitar animal duplicado em ambas pessoas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'NOVELO,CAIXA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve rejeitar animal duplicado na ordem de brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'NOVELO,CAIXA', 'Zero,Zero');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve lidar com brinquedos vazios', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('', '', 'Rex,Bola');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista[1]).toBe('Bola - abrigo');
    expect(resultado.erro).toBeNull();
  });
  
  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');

      expect(resultado.lista[0]).toBe('Rex - pessoa 1');
      expect(resultado.lista[1]).toBe('Fofo - abrigo');
      expect(resultado.erro).toBeNull();
  });

  test('Deve rejeitar brinquedo duplicado entre as pessoas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO', 'BOLA,BOLA', 'Rex,Bola');

      expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar quando ordem de animais tem um nome inexistente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo,Lulu');

      expect(resultado.erro).toBe('Animal inválido');
  });

  test('Se nenhum brinquedo é dado, todos ficam no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      '', '', 'Rex,Fofo,Mimi,Loco');

      expect(resultado.lista[0]).toBe('Rex - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - abrigo');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Loco - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Se ambos quiserem adotar o Loco, nenhum pode', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'SKATE,RATO', 'Loco');

      expect(resultado.lista[0]).toBe('Loco - abrigo');
      expect(resultado.lista.length).toBe(1);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,SKATE,RATO',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola,Loco');
     
      expect(resultado.lista[0]).toBe('Mimi - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Rex - abrigo');
      expect(resultado.lista[3]).toBe('Bola - abrigo');
      expect(resultado.lista[4]).toBe('Loco - abrigo');
      expect(resultado.lista.length).toBe(5);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve lidar com brinquedosPessoa undefined', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(undefined, 'BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeNull();
  });

  test('Deve rejeitar animal inexistente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA', '', 'Inexistente');
    expect(resultado.erro).toBe('Animal inválido');
  });

});