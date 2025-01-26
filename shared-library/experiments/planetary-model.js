/*----------------------------------------------------------*/
/**
 * @file src/js/models/model__planet.js
 * @author mnaatjes
 * @version 1.0.0
 * @date 11-07-2024
 * 
 * @memberof Src.Models
 * @namespace Planet
 */
/*----------------------------------------------------------*/
class Planet {
    constructor(data, planet_name){
        console.log(planet_name);
        /**
         * @name data
         * @type {Object}
         * @memberof Planet
         * @description orbital elements for calcualtions / facts to display
         */
        this.data = this.formatData(data);
        /**
         * @name orbital__plane
         * @type {HTMLElement}
         * @memberof Planet
         * @description
         */
        this.orbital_plane = document.getElementById(`orbital__plane--${planet_name.toLowerCase()}`);
        /**
         * @name orbital__plane
         * @type {HTMLElement}
         * @memberof Planet
         * @description
         */
        this.planetary_body = document.getElementById(`planetary__body--${planet_name.toLowerCase()}`);
        /**
         * @name ele_info
         * @type {Object} HTML DOMElement instance
         * @implements {DOMElement}
         * @memberof Planet
         * @description
         */
        this.ele_info = new DOMElement(`info__${planet_name.toLowerCase()}`);
        this.test_ele = document.getElementById('test__item');
        /**
         * @name angle
         * @type {Number} 
         * @memberof Planet
         * @description
         */
        this.angle = 0.0;
        /**
         * @implements {initOrbitalPlane}
         * @description sets style variables for element and begins simulation
         */
        this.initOrbit();
        /**
         * test
         */
        this.calcPosition();
        //this.animate(this.data.a, this.data.b);
        /**
         * track
         */
        //this.trackRotation();
    }
    /*----------------------------------------------------------*/
    /**
     * @name formatData
     * @type {Method}
     * @memberof Planet
     * @namespace formatData
     * @param {Object} data orbital elements from array data
     * @returns {Object} formatted data
     */
    /*----------------------------------------------------------*/
    formatData(data){
        /**
         * @name result
         * @type {Object}
         * @memberof formatData
         * @description format data to be more user friendly and accurate
         * @property {Number} a semi-major axis
         * @property {Number} b semi-minor axis
         * @property {Number} c focal distance: distance from origin to foci
         * @property {Number} e eccentricity: shape of elliptical orbit
         * @property {Number} Q apoapsis: longest distance from focus to vertex
         * @property {Number} q periapsis: shortest distance from focus to vertex
         * @property {Number} i inclination: tilt of orbiting object relative to reference plane (ecliptic)
         * @property {Number} w argument of periapsis (w = omega): defines orientation of ellipse in orbital plane
         * @property {Number} v true anomaly: represents angle from plane-of-ellipse between P (periapsis point) and position (x,y,z) of orbiting body
         * @property {Number} Mo mean anomaly: mean anomaly at t0
         * @property {Number} O longitude of ascending node (O = Omega)
         * @property {Number} t epoch specific time defining position of orbiting body
         * @property {Number} radius planetary radius: in kilometers
         * @property {Number} P orbital period / sidereal period
         * @property {Number} n mean motion: (degrees/day) angular speed to complete one full orbit
         * @returns {Object} result object of formatted data
         */
        let result = {
            a: parseFloat(data.semiMajorAxis.toFixed(4)),
            b: this.calcSemiMinorAxis(data.semiMajorAxis, data.eccentricity),
            e: parseFloat(data.eccentricity.toFixed(4)),
            c: this.focalDistance(data.semiMajorAxis, this.calcSemiMinorAxis(data.semiMajorAxis, data.eccentricity)),
            Q: parseFloat(data.apoapsis.toFixed(4)),
            q: parseFloat(data.periapsis.toFixed(4)),
            i: parseFloat(data.inclination.toFixed(4)),
            w: parseFloat(data.argumentOfPerihelion.toFixed(4)),
            radius: data.radius,
            tilt: data.tilt,
            P: data.sidereal_period,
            n: this.calcMeanMotion(data.sidereal_period),
            Mo: parseFloat(data.meanAnomaly.toFixed(4))
        };
        /**
         * return data object
         */
        console.log(result);
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name initOrbit
     * @type {Method}
     * @memberof Planet
     * @namespace initOrbit
     */
    /*----------------------------------------------------------*/
    initOrbit(){
        this.keplersEquation(this.data.Mo, this.data.e);
        /**
         * set scale
         */
        this.factor = 200;
        /**
         * set orbit width and height
         * set inclination
         * set focal distance
         */
        //this.orbital_plane.style.setProperty('--semi-major-axis', this.scaleUnits(this.data.a, 'px'));
        //this.orbital_plane.style.setProperty('--semi-minor-axis', this.scaleUnits(this.data.b, 'px'));
        //this.orbital_plane.style.setProperty('--inclination', `${this.data.i}deg`);
        this.orbital_plane.style.setProperty('--inclination', `${0}deg`);
        //this.orbital_plane.style.setProperty('--focal-distance', this.scaleUnits(this.data.c, 'px'));
        /**
         * set planetary body parameters
         * offset parameters
         * diameter and radius of planet
         * axial tilt
         * CSS VARS:
         * --planet-radius
         * --planet-diameter
         * --axial-tilt
         */
        this.planetary_body.style.setProperty('--planet-radius', `${this.scaleRadius()}px`);
        this.planetary_body.style.setProperty('--planet-diameter', `${this.scaleRadius() * 2}px`);
        this.planetary_body.style.setProperty('--axial-tilt', `${this.data.tilt}deg`);
    }
    /*----------------------------------------------------------*/
    /**
     * @name calcSemiMinorAxis
     * @type {Function}
     * @memberof Planet
     * @param {Number} a semi-major axis
     * @param {Number} e eccentricity
     * @description
     * @returns {Number} b = semi-minor axis
     */
    /*----------------------------------------------------------*/
    calcSemiMinorAxis(a, e){return parseFloat((a * Math.sqrt(1 - Math.pow(e, 2))).toFixed(4));}
    /*----------------------------------------------------------*/
    /**
     * @name focalDistance
     * @type {Function}
     * @memberof Planet
     * @param {Number} a semi-major axis
     * @param {Number} b semi-minor axis
     * @description calculates the distance of the foci from the center of 
     *              an elliptical orbit
     *              for (h,k) --> F (c, o) and (-c, o) = (h + c, k) and (h - c, k)
     * @returns {Number} c distance from (h, k) to foci
     */
    /*----------------------------------------------------------*/
    focalDistance(a, b){return parseFloat((Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2)).toFixed(4)));}
    /*----------------------------------------------------------*/
    /**
     * @name scaleUnits
     * @type {Function}
     * @memberof Planet
     * @param {Number} num
     * @param {String} units deg, px
     * @property {Number} factor
     * @description
     * @returns {String}
     */
    /*----------------------------------------------------------*/
    scaleUnits(num, units){return (num * this.factor) + units;}
    /*----------------------------------------------------------*/
    /**
     * @name scaleRadius
     * @type {Function}
     * @memberof Planet
     * @property {Number} data.radius
     * @property {Number} factor
     * @description
     * @returns {Number} scaled number
    /*----------------------------------------------------------*/
    scaleRadius(){return parseFloat((this.data.radius / 150).toFixed(2));}
    /*----------------------------------------------------------*/
    /**
     * @name calcMeanMotion
     * @type {Function}
     * @memberof Planet
     * @param {Number} orbital_period orbital / sidereal period or sidereal year
     * @description
     * @returns {Number} mean motion (n) in degrees / days
    /*----------------------------------------------------------*/
    calcMeanMotion(orbital_period){return (360 / orbital_period);}
    /*----------------------------------------------------------*/
    /**
     * @name keplersEquation
     * @type {Function}
     * @memberof Planet
     * @param {Number} M mean anomaly
     * @param {Number} e eccentricity
     * @param {Number} tolerance default: 1e-8
     * @description kepler's equation M (mean anomaly) = E (eccentric anomaly) - e * sineE
     *              tolerance is set to 1e-8 until convergance
     *              uses Newton-Raphson iteration to refine value of E
     *              continues until deltaE becomes smaller than tolerance 1e-8
     * @returns {Number} Eccentric Anomaly: value under tolerance in radians / unit of time or deg / t
    /*----------------------------------------------------------*/
    keplersEquation(M, e, tolerance=1e-8){
        /**
         * set Eccentric anomaly as M to start
         */
        let E = M;
        /**
         * Newton-Raphson iterator
         * iterate until convergance under tolerance
         */
        while(true){
            /**
             * change in E
             */
            let deltaE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E));
            /**
             * add delta E to E
             */
            E += deltaE;
            /**
             * break conditions
             * convergance met
             */
            if(Math.abs(deltaE) < tolerance){break;}
        }
        /**
         * return E
         */
        return E;
    }
    /*----------------------------------------------------------*/
    /**
     * @name calcEccentricAnomaly
     * @type {Function}
     * @memberof Planet
     * @param {Number} 
     * @description an angle that defines the position of a body moving along an orbit
     *              measured from the center of the ellipse to body's position
     * @returns {Number} 
    /*----------------------------------------------------------*/
    calcEccentricAnomaly(){}
    /*----------------------------------------------------------*/
    /**
     * @name calcMeanAnomaly
     * @type {Function}
     * @memberof Planet
     * @namespace calcMeanAnomaly
     * @param {Number} Mo mean anomaly at t0
     * @param {Number} n mean motion
     * @param {Number} t time elapsed since reference time
     * @description calculates the mean anomaly 
     * @returns {Number} (angle in degrees) M(t) mean anomaly (M) at time (t)
    /*----------------------------------------------------------*/
    calcMeanAnomaly(Mo, n, t){return Mo + n * t;}
    /*----------------------------------------------------------*/
    /**
     * @name calcPosition
     * @type {Function}
     * @memberof Planet
     * @namespace CalculatePosition
     * @param {Number} time // animation frame timestamp in ms
     * @description 
    /*----------------------------------------------------------*/
    calcPosition(time){
        /**
         * get center
         * @implements {findCenter}
         */
        let orbit  = findCenter(this.orbital_plane);
        let planet = findCenter(this.planetary_body);
        console.log(Math.PI / 2);
        console.log(radToDeg(Math.PI / 2));
        console.log(degToRad(90));
        let theta = Math.atan((planet.cy/planet.cx));
        let slope = Math.atan(planet.cy / planet.cx);
        /**
         * bind this
         */
        this.calcPosition = this.calcPosition.bind(this);
        /**
         * get animation frame
         */
        //requestAnimationFrame(this.calcPosition);
    }
    /*----------------------------------------------------------*/
    /**
     * @name animate
     * @type {Function}
     * @memberof Planet
     * @namespace Animate
     * @param {Number} time // animation frame timestamp in ms
     * @description 
    /*----------------------------------------------------------*/
    animate(time=0){
        /**
         * TODO: define period within object, not in css
         * define properties
         */
        let period  = 12000; // 12.0sec in milliseconds
        let radians = (2 * Math.PI * time) / period;
        let angle   = radians * (180 / Math.PI);
        let reverse = -angle + 90; // counter-rotation angle
        /**
         * reset angle each orbit
         */
        while(angle > 360){
            angle -= 360;
        }
        console.log(angle);
        /**
         * set css rotateY
         */
        this.planetary_body.style.transform = `rotateX(${90}deg) rotateY(${reverse}deg)`;
        /**
         * bind this
         */
        this.animate = this.animate.bind(this);
        /**
         * request animation frame
         */
        requestAnimationFrame(this.animate);
    }
}