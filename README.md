<h1 align=center>Práctica de fundamentos de Backend con Node.js</h1>

### Guía de inicio rápido

Para ejecutar la aplicación habrá que tener instalado [Node JS](https://nodejs.org/) e instalar las dependencias usando el siguiente comando:

```
npm install
```

`.env` es el archivo que se utiliza para almacenar las variables de entorno, que son las que se utilizan para configurar el comportamiento de la aplicación. Como se suelen utilizar para almacenar información confidencial, como contraseñas de bbdd o claves de API, este fichero se encuentra includo en el `.gitignore` y puedes utilizar el tuyo propio.

Para arrancar la base de datos con los anuncios iniciales, simplemente utiliza el comando

```
node init-db.js
```

Y se responderá a la pregunta de si se desea eliminar la base de datos existente.

Para inicializar el proyecto se debe utilizar el comando

```
npm run start:dev
```

Finalmente, para recibir una lista de anuncios filtrada, la llamada debe realizarse de la siguiente manera:

```
http://localhost:3000/ads/search?[...]
```

Algunos ejemplos:

- Para filtrar productos cuyo género sea "fantasy" `http://localhost:3000/ads/search?tags=fantasy` (2), o cuyo género sea "ensayo" `http://localhost:3000/ads/search?tags=essay` (2), o sean una trilogía `http://localhost:3000/ads/search?tags=trilogy` (1).

- Para buscar los productos que están en venta `http://localhost:3000/ads/search?sale=true` (3) o se buscan `http://localhost:3000/ads/search?sale=false` (2).

- Para filtrar productos que incluyan la palabra "la" en su nombre `http://localhost:3000/ads/search?name=la` (3) o "house" `http://localhost:3000/ads/search?name=house` (1).

- Para buscar productos cuyo precio sea inferior a 100 `http://localhost:3000/ads/search?price=-100` (4) o exactamente 35 `http://localhost:3000/ads/search?price=35` (1).

- O combinarlos juntos, por ejemplo para encontrar un producto de fantasía con el artículo "la" en su nombre, que se busque en un rango de precio inferior a 100 `http://localhost:3000/ads/search?tags=fantasy&sale=false&name=la&price=-100&start=0&limit=2&sort=price`.

<div align=center>
<img src="public\images\combined-filters.PNG" width="775px" alt="filtered-search-example">
</div>

## Enunciado

<p align=justify>Imaginemos que un cliente nos pasa el siguiente <i>briefing</i> para que le hagamos este trabajo:</p>

<p align=justify>Desarrollar el API que se ejecutará en el servidor de un servicio de venta de artículos de segunda mano llamado <b>Nodepop</b>. Hazte a la idea que esta API que vas a construir sería utilizado por otros desarrolladores de iOS o Android.</p>

<p align=justify>El servicio mantiene anuncios de compra o venta de artículos y permite buscar como poner filtros por varios criterios, por tanto la API a desarrollar deberá proveer los métodos necesarios para esto.</p>

<p align=justify>Cada anuncio tiene los siguientes datos:</p>

- Nombre del artículo. Un anuncio siempre tendrá un solo artículo.
- Si el artículo se _vende_ o _se busca_.
- Precio. Será el precio del artículo en caso de ser una oferta de venta. En caso de que sea un anuncio de _se busca_ será el precio que el solicitante estaría dispuesto a pagar.
- Foto del artículo. Cada anuncio tendrá solo una foto.
- _Tags_ del anuncio. Podrá contener uno o varios de estos cuatro: _work_, _lifestyle_, _motor_ y _mobile_.

### Operaciones que debe realizar el API a crear:

- Lista de anuncios con posibilidad de paginación. Con filtros por _tag_, tipo de anuncio (venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo (que empiece por el dato buscado).
- Lista de tags existentes.
- Creación de anuncios (este requisito es **opcional**).

<p align=justify>Los sistemas donde se desplegará el API utilizan bases de datos <a href="https://www.mongodb.com/">MongoDB</a>.</p>

<p align=justify>Se solicita que el entregable venga acompañado de una mínima documentación y el código
del API esté bien formateado para facilitar su mantenimiento. En esta fase, ya que se desea probar si el modelo de negocio va a funcionar, no serán  necesarios ni tests unitarios ni de integración.</p>

<p align=right><sub><sup>Gracias a <a href="https://github.com/RodrigoCalvo">Rodrigo</a> por la paciencia, la ayuda y la base de datos.</sup></sub></p>
