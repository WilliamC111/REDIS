# Comparación de Implementaciones con y sin RedisMysql
Este proyecto contiene dos implementaciones  conectada a una base de datos MySQL que administra información de actores.
Una de las implementaciones utiliza Redis como sistema de caché para optimizar el acceso a los datos más consultados,
mientras que la otra no, permitiendo observar la diferencia en el rendimiento.

### Búsqueda de actores por nombre.
Visualización de detalles completos de cada actor.
Eliminación de registros.
Gestión del caché (en la versión con Redis).

### Tecnologías Utilizadas
* Node.js con Express para el backend.
* MySQL como base de datos principal.
* Redis como sistema de caché en una de las implementaciones.
* Bootstrap para el diseño y la interfaz gráfica.
* HTML/CSS personalizados para los estilos visuales.

**Integrantes**
1. Andrés Leonardo Maldonado
2. Esteban Peña Coronado
3. William Cely López
