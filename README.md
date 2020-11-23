# API Assignment (Warehouse Listing App)
demo: https://caruy-api-assignment.herokuapp.com

This web application provides a simple product listing UI for warehouse workers at a hypothetical clothing brand.
It prioritises ease of use by allowing fast and intuitive switching between product categories, 
and the ability to filter products in a given category using search inputs. 

![App page](https://i.ibb.co/kmTzn4r/assignment-screenshot-1.jpg)

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
### Easy page selection
Users can easily switch between product categories at any time with sticky navigation buttons at the top of the page. The highlighted button indicates the current product category that the user is viewing.

<a href="https://i.ibb.co/kmTzn4r"><img src="https://i.ibb.co/kmTzn4r/assignment-screenshot-1.jpg" alt="page-screenshot" width="400" border="0"></a>
<a href="https://ibb.co/q7jPvR6"><img src="https://i.ibb.co/QpQ1460/page-screenshot.png" alt="page-screenshot" width="400" border="0"></a>

### Color coded product availability
Products are directly listed in table format showing:
* Name
* ID
* Manufacturer
* Price
* Color
* Availability

The availability of a product is indicated with text and background colors: INSTOCK in green, LESSTHAN10 in yellow, and OUTOFSTOCK in red.

### Pagination
100 products are shown per page. A simple pagination UI is included to show the maximum pages per products, it allows users to easily increment or decrement pages, or directly enter the page number they want to go to.

### Filter and search multiple product info types
Users can search for a specific product or group of products by intering information at the top of the product lists. An input box is provided for each category of information, so users can search using multiple information columns or a single column.

Search inputs persist through product category changes, so users can easily and quickly check with the same filters across the categories (jackets, shirts, accessories). For instance, a user can check which jackets from the manufacturer "Derp" is OUTOFSTOCK, and then easily check the same for shirts and accessories without re-entering the same search input. 

<a href="https://ibb.co/ScVf7ms"><img src="https://i.ibb.co/tzYLP2m/filter-screenshot-1.png" alt="filter-screenshot-1" width="270" border="0"></a>
<a href="https://ibb.co/Jd2bnnD"><img src="https://i.ibb.co/Qcnq99y/filter-screenshot-2.png" alt="filter-screenshot-2" width="270" border="0"></a>
<a href="https://ibb.co/vZ50s8p"><img src="https://i.ibb.co/2g2G8Bx/filter-screenshot-3.png" alt="filter-screenshot-3" width="270" border="0"></a>

Caveat: Searching with availability information takes slightly longer to compute than for other columns. However, the results for current search inputs are cached for a product once it is opened. So subsequent product category switches with the same search inputs load faster. 

#### Search auto-complete
Each product search input provides a auto-complete dropdown list that updates with the user's input. This allows users to type in partial information and perform quicker look ups.

<a href="https://ibb.co/dG1Q28G"><img src="https://i.ibb.co/ChNn7Rh/search-screenshot-1.png" alt="search-screenshot-1" width="400" border="0"></a>
<a href="https://ibb.co/R6XFm2S"><img src="https://i.ibb.co/rpBjSkt/search-screenshot-2.png" alt="search-screenshot-2" width="400" border="0"></a>

#### Basic price filtering
In addition to searching for specific prices, basic numeric filtering options are available. Users are able to filter prices based on:
* Greater than: `>`
* Less than: `<`
* Greater than or equal to: `>=`
* Less than or equal to: `<=`
* Equal to: `==`
* Not equal to: `!=`

Users can also filter with up to 2 conditions using the logical & and | inputs.

### Auto data refresh
This app assumes that availability information may change over the course of a working day. To continuously display up-to-date information, the app refreshes availability information in the background every 5 minutes (accounting for the API's internal cache of 5 minutes). It will automatically render the new availability information without needing to refresh the page.