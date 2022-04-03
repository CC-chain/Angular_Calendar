# Angular Dynamic Reservation Program
---
Our overall purpose in this project is to develop a fully dynamic, customizable reservation program. 

Tree Structure
------
```
  .
  ├── media
  └── src
      ├── app
      │   ├── core
      │   ├── data
      │   ├── layout
      │   ├── module
      │   └── shared
      └── styles
```
- **media** : The media directory is used to store supporting files for the application. Things like requirement documentation, text outlines, etc. 
    - **src**: Source files for the root-level application project.
      - **styles**: The styles directory is used to store scss style sheets for the application. It can contain themes, Bootstrap, Angular Material, and any other styles.
      - **app**: Contains the component files in which your application logic and data are defined. 
          - **core**: This module is for classes used by app.module. Resources which are always loaded such as route guards, HTTP interceptors, and application level services.
          - **data**: The data module is a top level directory and holds the types (models/entities) and services (repositories) for data consumed by the application.
          - **layout**: The layout directory contains one or more components which act as a layout or are parts of a layout such as a Header, Nav, Footer, etc.
          - **module**: The modules directory contains a collection of modules which are each independent of each other. This allows Angular to load only the module it requires to display the request thereby saving bandwidth and speeding the entire application.
          - **shared**: The shared module contains classes and resources which are used in more than one dynamically loaded module. By always loading with the application the shared components are ready whenever a module requests them.
