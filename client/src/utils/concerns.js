// Calculate the top concerns

const CRIME_CATEGORIES = [
  'Arson',
  'Assault',
  'Bike Theft',
  'Burglary',
  'Disturbing the Peace',
  'DUI/Reckless Driving',
  'Homicide',
  'Pickpocketing/Purse-Snatching',
  'Robbery',
  'Sex Crimes',
  'Theft/Larceny',
  'Vandalism',
  'Vehicle Break-In',
  'Vehicle Theft'
];

export default (data) => {
  const concerns = data.Concerns;

  console.log(concerns);

  // Create items array
  const items = Object.keys(concerns).map(function(key) {
    return [key, concerns[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1].length - first[1].length;
  });

  // Create a new array with only the first 3 items
  return items.slice(0, 3);
}
