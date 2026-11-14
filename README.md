Fogón del Barrio - TP Programación II - Grupo 4
Integrantes: Tobias Causevic y Federico Gomez
Fogón del Barrio – Sistema de Gestión de Pedidos en un Restaurante
Fogón del Barrio es un sistema desarrollado en TypeScript para administrar los pedidos de un restaurante, desde la selección de productos hasta su preparación en cocina y el cálculo del importe a cobrar.

El sistema permite trabajar con distintas modalidades de pedido, platos individuales y combos, estaciones de cocina, estados de preparación, medios de pago y descuentos.
Características principales
Gestión de pedidos
- Pedidos en salón, con una mesa asociada.
- Pedidos para retirar, con un horario de retiro.
- Pedidos con envío propio, con una dirección y un costo adicional.
- Agregado y eliminación de productos mientras el pedido está en construcción.
- Deshacer la última modificación antes de confirmar el pedido.
- Confirmación del pedido y distribución de sus platos a cocina.
Menú, platos y combos
- Registro de platos individuales con nombre, precio y categoría.
- Creación de combos formados por varios platos.
- Cálculo del beneficio de un combo mediante un descuento porcentual o un precio fijo.
- Cálculo del precio total del pedido respetando el valor de los combos.
Preparación en cocina
El sistema cuenta con cuatro estaciones:
- Parrilla.
- Cocina fría.
- Barra de bebidas.
- Cocina dulce.
Cada plato se deriva a la estación correspondiente según su categoría. Las estaciones mantienen el orden de llegada de sus platos (FIFO) y registran los estados Pendiente, En preparación y Listo.

Un pedido no puede facturarse hasta estar confirmado y tener todos sus platos listos.
Medios de pago y descuentos
- Efectivo.
- Tarjeta de crédito.
- Billetera virtual.
- Descuento por pago en efectivo.
- Descuento especial según el día de la semana.
Cuando corresponde más de un descuento, el sistema utiliza únicamente el más beneficioso para el cliente.
Historial de pedidos
Permite registrar pedidos finalizados, consultar los pedidos almacenados y buscarlos por modalidad.
Patrones de diseño utilizados (Parte B)
State — Patrón de comportamiento
Problema: las operaciones permitidas cambian según el estado del pedido o del plato. Por ejemplo, un pedido confirmado no puede corregirse y un plato en preparación no puede cancelarse.

Participantes: Pedido y PlatoPedido son los contextos; IEstadoPedido e IEstadoPlatoPedido definen los contratos; PedidoEnConstruccion, PedidoConfirmado, EstadoPendientePlato, EstadoEnPreparacionPlato y EstadoListoPlato representan los estados concretos.

Ventaja: las reglas de cada estado quedan en su propia clase y no en condicionales repetidos. Costo: se necesitan varias clases para representar los estados y mantener sus transiciones.

Diagrama: State. Tests: pedidoenconstruccion.test.ts, pedidoconfirmado.test.ts, estadopendienteplato.test.ts, estadoenpreparacionplato.test.ts y estadolistoplato.test.ts.
Strategy — Patrón de comportamiento
Problema: los combos pueden calcular su precio especial de distintas maneras y, al cobrar, pueden existir varias políticas de descuento.

Participantes: Combo utiliza IEstrategiaBeneficio, implementada por DescuentoPorcentual y PrecioFijoCombo. CalculadoraCobro utiliza IEstrategiaDeDescuento, implementada por DescuentoEfectivo y DescuentoDiaEspecial.

Ventaja: permite agregar nuevas formas de calcular beneficios o descuentos sin modificar el cálculo principal. Costo: cada estrategia requiere su propia implementación.

Diagrama: Strategy. Tests: combo.test.ts, descuentoporcentual.test.ts, preciofijocombo.test.ts, calcularcobro.test.ts, descuentoefectivo.test.ts y descuentoespecial.test.ts.
Chain of Responsibility — Patrón de comportamiento
Problema: un mismo pedido puede tener platos que correspondan a distintas estaciones de cocina, y agregar estaciones nuevas no debería obligar a cambiar la lógica de Pedido.

Participantes: RegistroEstaciones inicia la derivación; EstacionCocina define el comportamiento común y el enlace con la siguiente estación; Parrilla, CocinaFria, BarraBebidas y CocinaDulce son los manejadores concretos.

Ventaja: cada estación decide si procesa el plato o lo deriva a la siguiente, sin que el pedido conozca todas las categorías. Costo: es necesario configurar correctamente la cadena y recorrerla hasta encontrar una estación que pueda recibir el plato.

Diagrama: Chain of Responsibility. Tests: registroestaciones.test.ts, estacioncocina.test.ts, parrilla.test.ts, cocinafria.test.ts, barrabebidas.test.ts y cocinadulce.test.ts.

Arquitectura general
- Pedido: administra los productos pedidos, el historial de modificaciones, el estado y el total.
- IPlatoMenu, Plato y Combo: representan los productos del menú.
- ITipoPedido: permite trabajar con pedidos de salón, retiro y envío.
- RegistroEstaciones y EstacionCocina: distribuyen y preparan los platos.
- CalculadoraCobro: calcula el importe final aplicando el descuento más conveniente.
- MedioDePago: define el procesamiento según la forma de pago.
- HistorialPedidos: registra y consulta los pedidos finalizados.
Instalación y compilación
Se necesita tener instalados Node.js y npm. Desde la carpeta principal del proyecto, ejecutar:
npm install

npm run build

Para ejecutar las pruebas unitarias:
npm run test


Flujo de funcionamiento del sistema
1. Se crea un pedido en la modalidad correspondiente: salón, retiro o envío.
2. Se agregan platos individuales o combos. Antes de confirmar, se pueden quitar productos o deshacer la última modificación.
3. Al confirmar, el sistema valida que las estaciones puedan recibir todos los platos.
4. Cada plato se deriva a la estación de cocina correspondiente.
5. La estación prepara los platos según su orden de llegada y actualiza sus estados.
6. Cuando todos los platos están listos, el pedido puede facturarse.
7. Se calcula el total y se aplica el descuento más beneficioso según el día y el medio de pago.
8. El pedido finalizado puede registrarse en el historial.
Diagramas y documentación

- Los métodos y clases del código fuente están documentados mediante JSDoc.



# Configuración del entorno de desarrollo para Programación 2

Vamos a comentar cómo instalar todos los componentes necesarios sobre la máquina host.

## Instalar NodeJs

1. Ingresar a [NodeJs - Descargas](https://nodejs.org/en/download/) y seleccionar según la plataforma en la que nos encontremos el instalador que mejor se adapte a nuestro sistema operativo.

👉 En el caso de Windows, seleccionar los instaladores que se encuentran en la pestaña "Prebuilt Installer"



👉 En el caso de MacOs o Linux, seleccionar la pestaña "Package Manager" y seleccionar "NVM" en el último combo. Luego copiar y ejecutar en una terminal los comandos que se muestran.



⚠️ **En todos los casos seleccionar alguna versión estable (LTS)**

## Directorio de trabajo

Una vez instalado node, debemos crear el directorio en el cual vamos a desarrollar.
Crear un directorio, que será el directorio del proyecto a utilizar y dentro del mismo descomprimir el archivo 📦 *bootstrap.zip*.

Este archivo contiene lo siguiente:

📂/

- 📂 src: directorio donde crearemos todos los archivos typescript (\*.ts)
  - 📄 index.ts: archivo de prueba. A futuro será nuestro punto de entrada.
- 📂 tests: directorio donde crearemos las pruebas unitarias 
- 📄 package.json: este archivo contiene los comandos a utilizar en el desarrollo y los paquetes necesarios para construir nuestra solución.
- 📄 tsconfig.json: este archivo contiene la configuración utilizada en el proceso de "compilación"
- 📄 jest.config.js: este archivo contiene la configuración utilizada durante la ejecución de las pruebas unitarias.
- 📄 README.md: este archivo.

## Instalar las dependencias

Desde una terminal, ingresar al directorio de trabajo creado y ejecutar el siguiente comando: 

```bash
# comando que permite instalar los paquetes especificados en el archivo package.json
user@host:~$ npm i
```

## Compilar el proyecto

Desde una terminal, ingresar al directorio de trabajo creado y ejecutar el siguiente comando: 

```bash
# comando que permite compilar la solución.
user@host:~$ npm run build
```

## Configurar VisualCode (IDE)

Instalar los siguientes complementos:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
* [JEST](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
* [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)
* [Test Adapter Converter](https://marketplace.visualstudio.com/items?itemName=ms-vscode.test-adapter-converter)
* [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer)

# Reglas de estilo de código (ESLint)

El proyecto incluye una configuración de ESLint (`eslint.config.js`) que estandariza el código. Para verificarla ejecutar:

```bash
# revisa el código en src/ y reporta errores
user@host:~$ npm run lint

# revisa el código y corrige automáticamente lo que se pueda
user@host:~$ npm run lint-fix
```

A continuación se muestran ejemplos de cada regla configurada.

## Nombres de clases, interfaces y tipos (PascalCase)

| ❌ Incorrecto        | ✅ Correcto          |
| ------------------- | ------------------- |
| `class persona { }` | `class Persona { }` |

## Nombres de constantes globales (UPPER_CASE)

| ❌ Incorrecto             | ✅ Correcto                |
| ------------------------ | ------------------------- |
| `const maxIntentos = 3;` | `const MAX_INTENTOS = 3;` |

## Nombres de variables y funciones (camelCase)

| ❌ Incorrecto                  | ✅ Correcto                   |
| ----------------------------- | ---------------------------- |
| `let Nombre_Usuario = "Ana";` | `let nombreUsuario = "Ana";` |

## Nombres de métodos de clase (camelCase)

| ❌ Incorrecto                 | ✅ Correcto                   |
| ---------------------------- | ---------------------------- |
| `public Saludar(): void { }` | `public saludar(): void { }` |

## Longitud mínima de los nombres (mínimo 4 caracteres)

Se exceptúan los contadores de bucles `i`, `j` y `k`.

| ❌ Incorrecto    | ✅ Correcto          |
| --------------- | ------------------- |
| `const n = 10;` | `const total = 10;` |

## Números mágicos

Los números "sueltos" dentro de una expresión deben reemplazarse por una constante con nombre (los índices de arreglo, como `arr[0]`, están permitidos).

| ❌ Incorrecto                       | ✅ Correcto                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `for (let i = 0; i < 10; i++) { }` | `const MAX_INTENTOS = 10;`<br>`for (let i = 0; i < MAX_INTENTOS; i++) { }` |

## Longitud máxima de un método (40 líneas)

| ❌ Incorrecto                                                                                                     | ✅ Correcto                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `public calcular(): number {`<br>`  // ... 45 líneas de código`<br>`  // todo mezclado en un solo método`<br>`}` | `public calcular(): number {`<br>`  const datos = this.obtenerDatos();`<br>`  return this.procesar(datos);`<br>`}` |

## Longitud máxima de línea (120 caracteres)

| ❌ Incorrecto                                                                                                                 | ✅ Correcto                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `const mensaje = "un texto larguísimo que supera ampliamente los 120 caracteres permitidos en una sola línea de código...";` | `const mensaje =`<br>`  "un texto largo " +`<br>`  "separado en varias líneas.";` |

## Llaves obligatorias en `if`/`else`/`for`/`while`

| ❌ Incorrecto                       | ✅ Correcto                                         |
| ---------------------------------- | -------------------------------------------------- |
| `if (activo) console.log("Hola");` | `if (activo) {`<br>`  console.log("Hola");`<br>`}` |

## Espaciado en estructuras de control

Espacio después de la palabra clave (`if`, `for`, `while`) y antes del `(`; sin espacios pegados a `(` o `)`; espacio antes de `{`.

| ❌ Incorrecto                                     | ✅ Correcto                                         |
| ------------------------------------------------ | -------------------------------------------------- |
| `if(activo){`<br>`  console.log("Hola");`<br>`}` | `if (activo) {`<br>`  console.log("Hola");`<br>`}` |

## Modificadores de acceso explícitos

Todo campo o método de una clase debe declarar `public`, `private` o `protected`.

| ❌ Incorrecto                                    | ✅ Correcto                                              |
| ----------------------------------------------- | ------------------------------------------------------- |
| `class Persona {`<br>`  nombre: string;`<br>`}` | `class Persona {`<br>`  private nombre: string;`<br>`}` |

## Métodos que no usan `this`

Si un método no usa `this`, probablemente debería ser `static`.

| ❌ Incorrecto                                                                                                                             | ✅ Correcto                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `class Calculadora {`<br>`  public sumar(primero: number, segundo: number): number {`<br>`    return primero + segundo;`<br>`  }`<br>`}` | `class Calculadora {`<br>`  public static sumar(primero: number, segundo: number): number {`<br>`    return primero + segundo;`<br>`  }`<br>`}` |

## Una sola clase por archivo

| ❌ Incorrecto                                              | ✅ Correcto                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `// animal.ts`<br>`class Animal { }`<br>`class Perro { }` | `// animal.ts`<br>`class Animal { }`<br><br>`// perro.ts`<br>`class Perro { }` |

## Sin métodos o funciones vacías

| ❌ Incorrecto                    | ✅ Correcto                                                       |
| ------------------------------- | ---------------------------------------------------------------- |
| `public constructor() {`<br>`}` | `public constructor() {`<br>`  this.inicializado = true;`<br>`}` |

## Tipo de retorno explícito

| ❌ Incorrecto                                                 | ✅ Correcto                                                           |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `public obtenerNombre() {`<br>`  return this.nombre;`<br>`}` | `public obtenerNombre(): string {`<br>`  return this.nombre;`<br>`}` |
