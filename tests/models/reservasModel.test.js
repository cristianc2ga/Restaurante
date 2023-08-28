const { expect } = require('chai');
const sinon = require('sinon');
const reservaModel = require('../../model/reserva');

describe('Modelo de Reservas', function () {
  describe('insertar', function () {
    it('debería insertar una reserva correctamente', async function () {
      const datosReserva = {
        nombre: 'Nombre Prueba',
        apellido: 'Apellido Prueba',
        fecha: '2023-08-30',
        hora: '18:00:00',
        mesa: 5,
        personas: 4,
        idRestaurante: 4,
        restaurante: 'Restaurante Prueba',
      };
      const userId = 12;

      const idReservaCreada = await reservaModel.insertar(datosReserva, userId);

      expect(idReservaCreada).to.exist;
    });
  });

  describe('retornarDatosId', function () {
    it('debería obtener los datos de una reserva por su ID', async function () {
      const idReserva = 5;

      const reservaEncontrada = await reservaModel.retornarDatosId(idReserva);

      expect(reservaEncontrada).to.exist;
      expect(reservaEncontrada.id).to.equal(idReserva);
    });

    it('debería retornar null si no encuentra una reserva por el ID', async function () {
      const idReserva = 999;

      const reservaEncontrada = await reservaModel.retornarDatosId(idReserva);

      expect(reservaEncontrada).to.be.null;
    });
  });

});
