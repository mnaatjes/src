/*----------------------------------------------------------*/
/**
 * @file src/js/data/data__orbital.js
 * @author mnaatjes
 * @version 1.0.0
 * @date 11-07-2024
 * @memberof Src.Data
 * @namespace OrbitalElements
 * @description An array of objects representing the eight planets in our solar system.
 * @param {Number} semiMajorAxis The semi-major axis of the planet's orbit (in astronomical units).
 * @param {Number} semiMinorAxis The semi-minor axis of the planet's orbit (in astronomical units).
 * @param {Number} argumentOfPerihelion: The argument of perihelion of the planet's orbit (in degrees).
 * @param {Number} eccentricity The eccentricity of the planet's orbit.
 * @param {Number} inclination The inclination of the planet's orbit (in degrees).
 * @param {Number} longitudeOfAscendingNode The longitude of the ascending node of the planet's orbit (in degrees).
 * @param {Number} meanAnomaly The mean anomaly of the planet's orbit (in degrees).
 * @param {Number} periapsis
 * @param {Number} apoapsis
 */
/*----------------------------------------------------------*/
const orbital_elements = [
    {
        name: "Mercury",
        semiMajorAxis: 0.38709893, // AU
        semiMinorAxis: 0.37070013, // AU
        argumentOfPerihelion: 29.1244604, // degrees
        eccentricity: 0.20563069,
        inclination: 7.00487, // degrees
        longitudeOfAscendingNode: 48.3316705, // degrees
        meanAnomaly: 174.792456, // degrees
        periapsis: 0.307499, // AU
        apoapsis: 0.466798, // AU
        radius: 2440, // km,
        tilt: 0.03, // degrees
        sidereal_period: 87.9 // days
    },
    {
        name: "Venus",
        semiMajorAxis: 0.72333199, // AU
        semiMinorAxis: 0.71844479, // AU
        argumentOfPerihelion: 54.8520643, // degrees
        eccentricity: 0.00677323,
        inclination: 3.394676, // degrees
        longitudeOfAscendingNode: 76.676069, // degrees
        meanAnomaly: 50.115623, // degrees
        periapsis: 0.718441, // AU
        apoapsis: 0.728223, // AU
        radius: 6052, // km
        tilt: 2.64,  // degrees
        sidereal_period: 224.7 // days
    },
    {
        name: "Earth",
        semiMajorAxis: 1.00000011, // AU
        semiMinorAxis: 0.99986392, // AU
        argumentOfPerihelion: 114.20783, // degrees
        eccentricity: 0.01671123,
        inclination: 0.00005, // degrees
        longitudeOfAscendingNode: 0.0, // degrees
        meanAnomaly: 358.60909, // degrees
        periapsis: 0.983285, // AU
        apoapsis: 1.016715, // AU
        radius: 6371, // km
        tilt: 23.44, // degrees
        sidereal_period: 365.2 // days
    },
    {
        name: "Mars",
        semiMajorAxis: 1.52366231, // AU
        semiMinorAxis: 1.51708511, // AU
        argumentOfPerihelion: 286.50167, // degrees
        eccentricity: 0.09341233,
        inclination: 1.85061, // degrees
        longitudeOfAscendingNode: 49.57854, // degrees
        meanAnomaly: 19.37067, // degrees
        periapsis: 1.381497, // AU
        apoapsis: 1.665828, // AU
        radius: 6779, // km
        tilt: 25.19, // degrees
        sidereal_period: 686.9 // days
    },
    {
        name: "Jupiter",
        semiMajorAxis: 5.20336301, // AU
        semiMinorAxis: 5.19090261, // AU
        argumentOfPerihelion: 14.728478, // degrees
        eccentricity: 0.04839266,
        inclination: 1.30530, // degrees
        longitudeOfAscendingNode: 100.46435, // degrees
        meanAnomaly: 203.64489, // degrees
        periapsis: 4.95014, // AU
        apoapsis: 5.456586, // AU
        radius: 69911, // km
        tilt: 3.13, // degrees
        sidereal_period: 4331.8 // days
    },
    {
        name: "Saturn",
        semiMajorAxis: 9.53707032, // AU
        semiMinorAxis: 9.51499252, // AU
        argumentOfPerihelion: 92.431935, // degrees
        eccentricity: 0.05415060,
        inclination: 2.48887, // degrees
        longitudeOfAscendingNode: 113.66559, // degrees
        meanAnomaly: 317.02019, // degrees
        periapsis: 8.97789, // AU
        apoapsis: 10.09625, // AU
        radius: 58232, // km
        tilt: 26.73, // degrees
        sidereal_period: 10738.4 // days
    },
    {
        name: "Uranus",
        semiMajorAxis: 19.18916464, // AU
        semiMinorAxis: 19.16141514, // AU
        argumentOfPerihelion: 170.96424, // degrees
        eccentricity: 0.04717010,
        inclination: 0.77359, // degrees
        longitudeOfAscendingNode: 73.96675, // degrees
        meanAnomaly: 313.23810, // degrees
        periapsis: 18.27259, // AU
        apoapsis: 20.10574, // AU
        radius: 25362, // km
        tilt: 97.77, // degrees
        sidereal_period: 30684.6 // days
    },
    {
        name: "Neptune",
        semiMajorAxis: 30.0689637, // AU
        semiMinorAxis: 29.9766283, // AU
        argumentOfPerihelion: 276.34035, // degrees
        eccentricity: 0.00858587,
        inclination: 1.76917, // degrees
        longitudeOfAscendingNode: 131.78422, // degrees
        meanAnomaly: 304.22260, // degrees
        periapsis: 29.80922, // AU
        apoapsis: 30.32871, // AU
        radius: 24622, // km
        tilt: 28.32, // degrees
        sidereal_period: 60189.5 // days
    },
];