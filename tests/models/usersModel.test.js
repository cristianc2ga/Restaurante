const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const userModel = require('../../model/user'); // Ajusta la ruta

describe('Modelo de Usuarios', function () {
  describe('insertar', function () {
    it('debería insertar un usuario correctamente', async function () {
      const datosUsuario = {
        nombre: 'usuario3',
        email: 'usuario3@example.com',
        password: 'contrasena123',
        confirmPassword: 'contrasena123',
        userType: 'cliente',
      };
      const idUsuarioCreado = await userModel.insertar(datosUsuario);
      expect(idUsuarioCreado).to.exist;
    });
    it('debería rechazar la inserción si las contraseñas no coinciden', async function () {
      const datosUsuario = {
        nombre: 'usuario4',
        email: 'usuario4@example.com',
        password: 'contrasena123',
        confirmPassword: 'contrasena456', // Contraseña diferente
        userType: 'cliente',
      };
      try {
        await userModel.insertar(datosUsuario);
        throw new Error('La inserción debería haber sido rechazada');
      } catch (error) {
        expect(error.message).to.equal('Las contraseñas no coinciden');
      }
    });
  });
  describe('buscarPorEmail', function () {
    it('debería buscar un usuario por su correo electrónico', async function () {
      const email = 'usuario2@example.com';
      const usuarioEncontrado = await userModel.buscarPorEmail(email);
      expect(usuarioEncontrado).to.exist;
      expect(usuarioEncontrado.correo).to.equal(email);
    });
    it('debería retornar null si no encuentra un usuario por el correo electrónico', async function () {
      const email = 'usuario_no_existente@example.com';

      const usuarioEncontrado = await userModel.buscarPorEmail(email);

      expect(usuarioEncontrado).to.be.null;
    });
  });
});
