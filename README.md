<br />
<p align="center">
 

  <h3 align="center">Restaurante</h3>

  <p align="center">
    Sistema básico de reservas en restaurantes . 
    <br />
    
  </p>
</p>

![imagen home](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/home.PNG)


## Acerca del proyecto
Sistema básico de reserva en restaurantes  hecho con NodeJS, Express,Express Validator MySQL, Ejs.

## Consideraciones
Antes de levantar el servidor local hay que crear las tablas en MySQL.
### Tabla Restaurantes
![imagen crud restaurantes](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/bdRestaurantes.PNG)

### Tabla Reservas
![imagen crud restaurantes](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/bdReservas.PNG)

## CRUD modulo restaurantes
![imagen crud restaurantes](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/crudRestaurantes.PNG)

### Vista de los restaurantes registrados
En esta vista para cada restaurante se tiene dos acciones editar y borrar el restaurante.
![imagen crud restaurantes](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/indexRestaurantes.PNG)

###  Vista creación de restaurante
Todos los campos son requeridos (excepto la imagen) validación realizada del lado del servidor con express validator.
![imagen crud restaurantes](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/crearRestaurantes.PNG)

### Vista edición campos del restaurante
Validación realizada del lado del cliente (todos los campos requeridos menos la imagen).
![imagen crud restaurantes](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/editarRestaurante.PNG)

## CRUD modulo reservas
![imagen crud reservas](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/crudReservas.PNG)

### Vista creación de reserva
Al dar click en crear reserva se redirige a la vista de restaurantes disponibles (restaurantes con reservas menores a 15), todos los campos son requeridos (validación del lado del cliente, fechas anteriores a la actual no son validadas).
![imagen crud reservas](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/indexReserva.PNG)
![imagen crud reservas](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/crearReserva.PNG)
![imagen crud reservas](https://github.com/cristianc2ga/Restaurante/blob/master/public/images/imagenesReadme/disponibles.PNG)