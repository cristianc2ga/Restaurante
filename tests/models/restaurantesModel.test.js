const { expect } = require('chai');
const sinon = require('sinon');
const restauranteModel = require('../../model/restaurante'); // Ajusta la ruta

describe('Modelo de Restaurantes', function () {
  describe('insertar', function () {
    it('debería insertar un restaurante correctamente', async function () {
      const datosRestaurante = {
        nombre: 'Restaurante Prueba2',
        descripcion: 'Descripción de prueba',
        direccion: 'Dirección de prueba',
        ciudad: 'Ciudad de prueba',
      };
      const archivos = { filename: 'imagen.jpg' };
      const userId = 12;

      const idRestauranteCreado = await restauranteModel.insertar(
        datosRestaurante,
        archivos,
        userId
      );

      expect(idRestauranteCreado).to.exist;
    });
  });

  describe('retornarDatosId', function () {
    it('debería obtener los datos de un restaurante por su ID', async function () {
      const idRestaurante = 1;

      const restauranteEncontrado = await restauranteModel.retornarDatosId(idRestaurante);

      expect(restauranteEncontrado).to.exist;
      expect(restauranteEncontrado.id).to.equal(idRestaurante);
    });

    it('debería retornar null si no encuentra un restaurante por el ID', async function () {
      const idRestaurante = 999;

      const restauranteEncontrado = await restauranteModel.retornarDatosId(idRestaurante);

      expect(restauranteEncontrado).to.be.null;
    });
  });
});
