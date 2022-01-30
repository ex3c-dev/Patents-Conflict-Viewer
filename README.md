# infoviz - Group 16

**Website link:**
http://infoviz-team16.ex3c.de

**Introduction Team:**

- Julia Glöß 
- Johanna Carolina Gerhardt
- Tobias Theus
- Nina Wüst

**Goals:**

- Visualize occurrence and frequency of patent registrations by location
- Finding relationships and correlations between locations and patent types (i.e. silicon valley for technological patents) 
- Exploring trends of patent registrations over time in certain locations
- Combine data set with other social-geographic aspects such as conflict zones
- Combine conflict databases to visualize how conflict can affect patent registration and patent class

**Research Questions:**

- Is there a link between conflicts and patent registration and patent classes?
- Are patent registrations linked with innovation and technological development?
- Are there any connections of areas that are ripe with conflict, especially over longer period of time, with the amount of patent registrations?
- Do conflicts inhibit infrastructure development, which in turn inhibit patent development in certain ipc classes that rely the existence of a more complex infrastructure?
- Are there any potential relationships between countries that initiate conflict and weapon related patents?

**Planned Visualiziations:**
- Map with  juxtaposition of data and tools for filtering/manipulation

_Interactions:_
- Zoom functionality
- Map filters
- Moving tool
- Timeline
- “On-Map-Clicking”
- Buttons / Clusters

**Current Feature List:**
- Zoom and moving functionality
- Patent and conflict data visualization
- Patent and conflict data filtering
- Dynamic map interactions
- Timeline and histogram
- Dynamic legend


**Known Issues:**
- Response paging not yet implemented
- Clusters not yet implemented 
- Issue when filtering while a popup is open

**Planned features**
- Implement response paging
- Implement patent cluster visualization
- Finish popup on map interaction with informations about patents, events and countries.
- Spread event points over the country
- Better differentiation between individual patents and events


**Nice-to-have features**
- Collapsible filter bar
- Popup: Dynamic image loading for locations
- Divide patent type into subcategories
- Make country names more visible in colored countries
- Filter Histogram








**Results:**

## Project setup

Install node.js version 16.13.0. Clone project & install dependencies with the following command.

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
