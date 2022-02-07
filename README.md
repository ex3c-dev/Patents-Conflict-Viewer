# infoviz - Group 16

**Website link:**
http://infoviz-team16.ex3c.de

Note: Project is optimized for chromium-based browsers

**Introduction Team:**

- Julia Glöß 
- Johanna Carolina Gerhardt (powerkarrot)
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
- Zoom and moving functionality
- Zoom tool
- Filtering sidebar
- Timeline filtering
- “On-Map-Clicking”
- Tooltip information when hovering pie chart clusters
- turn layers on and off in collapsible  Layer Settings drawer
- collapse Map Legend drawer

**Current Feature List:**
- Zoom and moving functionality
- Patent and conflict data visualization
  - individually
  - in clusters with pie chart (patent data) and heat map (conflict data)
- visualization layers: show/hide individual data points from both datasets
- Patent and conflict data filtering
- Dynamic map interactions
- Timeline and histogram
- Dynamic legend
- Collapsible filter bar

**Known Issues:**
- some patents are missing patent type information
- not all patents are fetched from database, therefore the pie charts only show a subset of the dataset. This results from a server-side issue
- Individual patent data rendering:
  - VueLayers and javascript is not suited to render millions of data points. One solution would be to recreate the map library in rust and webassembly for better performance.
  At the moment this issue is mitigated by having the individual patent point rendering turned off by default in the Layer Settings drawer.

**Nice-to-have features**
- Popup: Dynamic image loading for locations
- Make country names more visible in colored countries

**Results:**
- altough conflict dataset does not show conflicts in western countries prior to 2014, where the patent database ends, we can still infer some interesting points:
  - Countries that are historically more stable and developed also have more registered patents
  - All first-world countries have patents registered
  - many third-world countries and countries that have been in conflict over an extended period of time have no patents registered
  - However, a high conflict incidence does not always correlate to the number of registered patents. 
    - A good example for this is India
    - Many more external factors outside the scope of this project come into play as well
    - It is also important to keep in mind that the time range of the conflicts is not directly readable from the heat map prior to filtering

## Project setups

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
