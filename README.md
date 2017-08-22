# travlr
Travel smarter by saving the places you want to go. [Demo](https://justinchi.me/travlr)

![travlr gif 3](https://user-images.githubusercontent.com/1195698/29548165-a9e6146a-86b3-11e7-873b-d4a2d816f1f6.gif)

### App Requirements:

This app took about 40-hours to build for an interview assignment. I learned lots along the way. Below were the given instructions:
 
Create a web app (desktop or mobile) that provides a query box and a search button and then calls the Places Library for Google Maps (https://developers.google.com/maps/documentation/javascript/places). Format the results to give a good user experience. 
 
Your app must include:
A map with location markers/pins
A list of locations (Some interactivity is expected between the two).
You should implement at least one of your own features to show off your abilities (for example a build system, tests, user accounts / cloud storage, in addition to other cool features... the sky is the limit!).

Use whatever libraries, documentation, tutorials, or frameworks you consider necessary. This should be a client-side app, with little or no server code.

### How to Run
1. run `npm install`
2. run `npm start` to spool up `webpack-dev-server`
3. run `npm build` to build a production copy into the `/dist` folder

### Features
- hovering over a place on the list bounces that place's marker on the map
- clicking on a marker on the map opens that place's details in list view
- save your favorite places by labeling them
- view your labeled locations with 1-click by clicking an existing label below the search bar
- indiviually view each of your saved locations sorted by label by clicking the bookmarks icon at the top right
- stores and syncs saved places to localStorage
- search results biased towards the area you see on the map
- sharing your geolocation pans map bounds to your area
- map's viewport smoothly transitions between places list and place details view to fit markers within view.

<br />

__[Live Demo](https://justinchi.me/travlr/)__

__Libraries:__ React, Redux, redux-logger, redux-thunk, spinkit, Google Places API

__Tools:__ webpack, npm
