# API Assignment (Warehouse Listing App)
link: https://caruy-api-assignment.herokuapp.com

This web application provides a simple product listing UI for warehouse workers at a hypothetical clothing brand.
It prioritises ease of use by allowing fast and intuitive switching between product categories, 
and the ability to filter products in a given category using search inputs. 

![App page](https://ibb.co/rdhqPxL)

This app uses 2 API endpoints running at: https://bad-api-assignment.reaktor.com, which is provided by [Reaktor](https://www.reaktor.com "Reaktor"):
* `GET /products/:category` - returns a list of products in a given category (jackets, shirts, accessories).
* `GET /availability/:manufacturer` - returns a list of availability information.

Built using:
* Vue-CLI
* Vuex
* Vue-router
* Axios
* Express

## Features
###

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
