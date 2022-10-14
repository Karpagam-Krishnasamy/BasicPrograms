const { contains, values } = require("@laufire/utils/collection");

const distances = [
  {
    start: 'chennai',
    end: 'viluppuram',
    distance: 166,
  },
  {
    start: 'viluppuram',
    end: 'trichy',
    distance: 165,
  },
  {
    start: 'trichy',
    end: 'madurai',
    distance: 138,
  },
  {
    start: 'madurai',
    end: 'tirunelveli',
    distance: 171,
  },
  {
    start: 'tirunelveli',
    end: 'kanyakumari',
    distance: 85,

  },
  {
    start: 'karur',
    end: 'trichy',
    distance: 83,
  },
];

const routes = [
  {
    route: 'chennai-trichy',
    stops: [
      { start: 'chennai', end: 'viluppuram' },
      { start: 'viluppuram', end: 'trichy' },
    ],
  },
  {
    route: 'chennai-karur',
    stops: [
      { start: 'chennai', end: 'viluppuram' },
      { start: 'viluppuram', end: 'trichy' },
      { start: 'trichy', end: 'karur' },
    ]
  },
  {
    route: 'trichy-tirunelveli',
    stops: [
      { start: 'trichy', end: 'madurai' },
      { start: 'madurai', end: 'tirunelveli' },
    ]
  },
  {
    route: 'karur-viluppuram',
    stops: [
      { start: 'karur', end: 'trichy' },
      { start: 'trichy', end: 'viluppuram' },
    ]
  },
];

// const checkRoute = (distance, stop) => contains(distance, stop);

const checkRoute = (distance, stop) =>
  contains(values(distance), values(stop)) ||
  contains(values(distance), (values(stop)).reverse());

const getTotalDistance = ({ stops }, distances) =>
  stops.reduce((acc, c) =>
    distances.find(distance =>
      checkRoute(distance, c)).distance + acc, 0)

const main = (routes, distances) =>
  routes.map(route => (
    {
      ...route,
      totalDistance: getTotalDistance(route, distances)
    }
  ));

console.log(main(routes, distances));