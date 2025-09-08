import { AbrigoAnimais } from "./abrigo-animais.js";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve rejeitar brinquedo duplicado da pessoa 1', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'NOVELO', 'Rex,Bola');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar brinquedo duplicado da pessoa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO', 'NOVELO,NOVELO', 'Rex,Bola');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar com animal inexistente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,SKATE', 'BOLA,NOVELO', 'AVELAM');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve lidar com brinquedos de pessoas indefinidos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(undefined, undefined, 'Rex,Bola');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista[1]).toBe('Bola - abrigo');
    expect(resultado.erro).toBeNull();
  });

  test('Gato não divide brinquedo: se ambos têm condições, fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,LASER', 'BOLA,RATO,LASER', 'Fofo,Mimi');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeNull();
  });

  test('Deve rejeitar animal duplicado em ambas pessoas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'NOVELO,CAIXA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve rejeitar animal duplicado', () => {
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
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Rex - pessoa 1');
    expect(resultado.lista[1]).toBe('Fofo - abrigo');
    expect(resultado.erro).toBeNull();
  });

  test('Deve rejeitar brinquedo duplicado entre as pessoas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA,BOLA', 'Rex,Bola');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar quando ordem de animais tem um nome inexistente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo,Lulu');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Se nenhum brinquedo é dado, todos ficam no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('', '', 'Rex,Fofo,Mimi,Loco');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - abrigo');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco pode ser adotado se a pessoa tiver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,NOVELO,RATO,BOLA,SKATE', '', 'Bola,Loco');
    expect(resultado.lista[0]).toBe('Bola - pessoa 1');
    expect(resultado.lista[1]).toBe('Loco - pessoa 1');
    expect(resultado.erro).toBeNull();
  });

  test('Loco não pode ser adotado se a pessoa não adotou um antes', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO,BOLA', 'NOVELO,BOLA', 'Loco,Mimi');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.erro).toBeNull();
  });

  test('Se ambos quiserem adotar o Loco, nenhum pode', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'SKATE,RATO', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,SKATE,RATO', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola,Loco');
    expect(resultado.lista[0]).toBe('Mimi - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Rex - abrigo');
    expect(resultado.lista[3]).toBe('Bola - abrigo');
    expect(resultado.lista[4]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(5);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve lidar com ordemAnimais undefined', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA', '', undefined);
    expect(resultado.lista).toEqual([]);
    expect(resultado.erro).toBeNull();
  });

  test('Deve lidar com ordemAnimais vazio', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA', '', '');
    expect(resultado.lista).toEqual([]);
    expect(resultado.erro).toBeNull();
  });

});