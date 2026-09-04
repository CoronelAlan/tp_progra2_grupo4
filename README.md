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
