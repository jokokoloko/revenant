// Refactor to ES6

// ID
export function filterByID(array, id) {
    const objects = array.filter((object) => object.id === id); // scans whole array and can return multiple objects
    if (objects.length > 0) return objects; // returns a new array containing all the matching objects
    return []; // returns an empty array if no matches
}

export function findByID(array, id) {
    const object = array.find((object) => object.id === id); // scans array until it finds an exact match and then stops, ignoring any remaining objects in the array
    if (object) return object; // only returns one object
    return {}; // returns an empty object if no match
}

export function findIndexByID(array, id) {
    const index = array.findIndex((object) => object.id === id);
    return index; // returns the index number of the object within the array or -1 if no match
}

// Key
export function filterByKey(array, key) {
    const objects = array.filter((object) => object.key === key); // scans whole array and can return multiple objects
    if (objects.length > 0) return objects; // returns a new array containing all the matching objects
    return []; // returns an empty array if no matches
}

export function findByKey(array, key) {
    const object = array.find((object) => object.key === key); // scans array until it finds an exact match and then stops, ignoring any remaining objects in the array
    if (object) return object; // only returns one object
    return {}; // returns an empty object if no match
}

export function findIndexByKey(array, key) {
    const index = array.findIndex((object) => object.key === key);
    return index; // returns the index number of the object within the array or -1 if no match
}
