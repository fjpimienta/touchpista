[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

![Maintained][maintained-badge]
[![Make a pull request][prs-badge]][prs]
[![License][license-badge]](LICENSE.md)

[![Linux Build][linux-build-badge]][linux-build]
[![MacOS Build][macos-build-badge]][macos-build]
[![Windows Build][windows-build-badge]][windows-build]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# Introducción

Bootstrap y empaqueta tu proyecto con Angular 17 y Electron 30 (Typescript + SASS + Hot Reload) para crear aplicaciones de escritorio.

Actualmente se ejecuta con:

- Angular v17.3.6
- Electron v30.0.1

Con este ejemplo, puedes:

- Ejecutar tu aplicación en un entorno de desarrollo local con Electron y Hot reload
- Ejecutar tu aplicación en un entorno de producción
- Ejecutar tus pruebas con Jest y Playwright (E2E)
- Empaquetar tu aplicación en un archivo ejecutable para Linux, Windows y Mac

/!\ Hot reload solo se aplica al proceso de renderizado. El proceso principal de Electron no puede ser recargado en caliente, solo reiniciado.

/!\ Angular CLI y Electron Builder necesitan Node 18.10 o posterior para funcionar correctamente.

## Comenzando

*Clona este repositorio localmente:*

```bash
git clone https://github.com/maximegris/angular-electron.git
```

*Instala las dependencias con npm (usado por el proceso de renderizado de Electron):*

```bash
npm install
```

Hay un problema con `yarn` y `node_modules` cuando la aplicación es construida por el empaquetador. Por favor, usa `npm` como gestor de dependencias.

Si deseas generar componentes de Angular con Angular-cli, **DEBES** instalar `@angular/cli` en el contexto global de npm.
Por favor, sigue la [documentación de Angular-cli](https://github.com/angular/angular-cli) si habías instalado una versión anterior de `angular-cli`.

```bash
npm install -g @angular/cli
```

*Instala las dependencias de NodeJS con npm (usado por el proceso principal de Electron):*

```bash
cd app/
npm install
```

¿Por qué dos package.json? Este proyecto sigue la [estructura de dos package.json de Electron Builder](https://www.electron.build/tutorials/two-package-structure) para optimizar el paquete final y aún poder usar la característica `ng add` de Angular.

## Para construir para desarrollo

- **en una ventana de terminal** -> npm start

¡Voila! Puedes usar tu aplicación Angular + Electron en un entorno de desarrollo local con recarga en caliente.

El código de la aplicación es gestionado por `app/main.ts`. En este ejemplo, la aplicación se ejecuta con una simple aplicación Angular (http://localhost:4200) y una ventana de Electron. \
El componente Angular contiene un ejemplo de importación de librerías nativas de Electron y NodeJS. \
Puedes deshabilitar "Developer Tools" comentando `win.webContents.openDevTools();` en `app/main.ts`.

## Estructura del proyecto

| Carpeta | Descripción                                      |
|---------|--------------------------------------------------|
| app     | Carpeta del proceso principal de Electron (NodeJS) |
| src     | Carpeta del proceso de renderizado de Electron (Web / Angular) |

## Cómo importar librerías de terceros

Este proyecto de ejemplo se ejecuta en ambos modos (web y electron). Para que esto funcione, **debes importar tus dependencias de la manera correcta**. \

Hay dos tipos de librerías de terceros:
- Las de NodeJS - Usan el módulo core de NodeJS (crypto, fs, util...)
    - Sugiero que agregues este tipo de librerías en `dependencies` de ambos `app/package.json` y `package.json (carpeta raíz)` para que funcione en ambos procesos de Electron (principal y de renderizado).

Por favor, revisa `providers/electron.service.ts` para ver cómo se debe hacer la importación condicional de librerías cuando se usan librerías de NodeJS / terceros en el contexto de renderizado (es decir, Angular).

- Las de Web (como bootstrap, material, tailwind...)
    - Deben ser agregadas en `dependencies` de `package.json (carpeta raíz)`

## Agregar una dependencia con ng-add

Puedes encontrar algunas dificultades con `ng-add` porque este proyecto no usa los `@angular-builders` por defecto. \
Por ejemplo, puedes encontrar [aquí](HOW_TO.md) cómo instalar Angular-Material con `ng-add`.

## Modo navegador

¿Tal vez solo quieres ejecutar la aplicación en el navegador con recarga en caliente? Solo ejecuta `npm run ng:serve:web`.

## Comandos incluidos

| Comando                  | Descripción                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| `npm run ng:serve`       | Ejecuta la aplicación en el navegador web (modo DEV)                                                  |
| `npm run web:build`      | Construye la aplicación que puede ser usada directamente en el navegador web. Tus archivos construidos están en la carpeta /dist. |
| `npm run electron:local` | Construye tu aplicación y ejecuta electron localmente                                                 |
| `npm run electron:build` | Construye tu aplicación y crea una aplicación consumible basada en tu sistema operativo                |

**Tu aplicación está optimizada. Solo la carpeta /dist y las dependencias de NodeJS están incluidas en el paquete final.**

## ¿Quieres usar una librería específica (como rxjs) en el hilo principal de electron?

¡SÍ! Puedes hacerlo. Solo importa tu librería en la sección de dependencias de `app/package.json` con `npm install --save XXXXX`. \
Será cargada por electron durante la fase de construcción y agregada a tu paquete final. \
Luego usa tu librería importándola en el archivo `app/main.ts`. Bastante simple, ¿no?

## Pruebas E2E

Los scripts de prueba E2E se pueden encontrar en la carpeta `e2e`.

| Comando       | Descripción               |
|---------------|---------------------------|
| `npm run e2e` | Ejecuta pruebas end to end |

Nota: Para que funcione detrás de un proxy, puedes agregar esta excepción de proxy en tu terminal  
`export {no_proxy,NO_PROXY}="127.0.0.1,localhost"`

## Depuración con VsCode

¡La configuración de depuración de [VsCode](https://code.visualstudio.com/) está disponible! Para usarla, necesitas la extensión [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

Luego establece algunos puntos de interrupción en el código fuente de tu aplicación.

Finalmente, desde VsCode presiona **Ctrl+Shift+D** y selecciona **Application Debug** y presiona **F5**.

Ten en cuenta que la recarga en caliente solo está disponible en el proceso de renderizado.

## ¿Quieres usar Angular Material? ¿Ngx-Bootstrap?

Por favor, consulta el [archivo HOW_TO](./HOW_TO.md)

## Rama y versión de paquetes

- Angular 4 & Electron 1 : Rama [angular4](https://github.com/maximegris/angular-electron/tree/angular4)
- Angular 5 & Electron 1 : Rama [angular5](https://github.com/maximegris/angular-electron/tree/angular5)
- Angular 6 & Electron 3 : Rama [angular6](https://github.com/maximegris/angular-electron/tree/angular6)
- Angular 7 & Electron 3 : Rama [angular7](https://github.com/maximegris/angular-electron/tree/angular7)
- Angular 8 & Electron 7 : Rama [angular8](https://github.com/maximegris/angular-electron/tree/angular8)
- Angular 9 & Electron 7 : Rama [angular9](https://github.com/maximegris/angular-electron/tree/angular9)
- Angular 10 & Electron 9 : Rama [angular10](https://github.com/maximegris/angular-electron/tree/angular10)
- Angular 11 & Electron 12 : Rama [angular11](https://github.com/maximegris/angular-electron/tree/angular11)
- Angular 12 & Electron 16 : Rama [angular12](https://github.com/maximegris/angular-electron/tree/angular12)
- Angular 13 & Electron 18 : Rama [angular13](https://github.com/maximegris/angular-electron/tree/angular13)
- Angular 14 & Electron 21 : Rama [angular14](https://github.com/maximegris/angular-electron/tree/angular14)
- Angular 15 & Electron 24 : Rama [angular15](https://github.com/maximegris/angular-electron/tree/angular15)
- Angular 16 & Electron 25 : Rama [angular16](https://github.com/maximegris/angular-electron/tree/angular16)
- Angular 17 & Electron 30 : (main)

[maintained-badge]: https://img.shields.io/badge/maintained-yes-brightgreen
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/maximegris/angular-electron/blob/main/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-red.svg
[prs]: http://makeapullrequest.com

[linux-build-badge]: https://github.com/maximegris/angular-electron/workflows/Linux%20Build/badge.svg
[linux-build]: https://github.com/maximegris/angular-electron/actions?query=workflow%3A%22Linux+Build%22
[macos-build-badge]: https://github.com/maximegris/angular-electron/workflows/MacOS%20Build/badge.svg
[macos-build]: https://github.com/maximegris/angular-electron/actions?query=workflow%3A%22MacOS+Build%22
[windows-build-badge]: https://github.com/maximegris/angular-electron/workflows/Windows%20Build/badge.svg
[windows-build]: https://github.com/maximegris/angular-electron/actions?query=workflow%3A%22Windows+Build%22

[github-watch-badge]: https://img.shields.io/github/watchers/maximegris/angular-electron.svg?style=social
[github-watch]: https://github.com/maximegris/angular-electron/watchers
[github-star-badge]: https://img.shields.io/github/stars/maximegris/angular-electron.svg?style=social
[github-star]: https://github.com/maximegris/angular-electron/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20angular-electron!%20https://github.com/maximegris/angular-electron%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/maximegris/angular-electron.svg?style=social
