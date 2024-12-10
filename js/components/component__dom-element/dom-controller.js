/*----------------------------------------------------------*/
/**
 * @file src/js/components/dom-controller.js
 * @author mnaatjes
 * @version 1.0.0
 * @date 11-07-2024
 * 
 * @name DOMController
 * @type {Class}
 * @memberof Src.Components
 * @namespace DOMController
 * 
 * @property {HTMLElement} node
 * @property {Object} state
 */
/*----------------------------------------------------------*/
class DOMController {
    constructor(node){
        /**
         * @name node
         * @type {HTMLElement}
         * @memberof DOMController
         */
        this.node = node;
        /**
         * @name events
         * @type {Array}
         * @memberof ElementState
         * @desciption
         */
        this.node.events = [];
        /**
         * @name state
         * @type {Object}
         * @memberof DOMController
         */
        this.state = new ElementState(this.node);
        /**
         * @name 
         * @type {}
         * @memberof DOMController
         */
        /**
         * @implements {initDOMController}
         */
        this.#initDOMController();
        /**
         * debugging
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name initDOMController
     * @type {Method}
     * @memberof DOMController
     * @private
     * @description
     */
    /*----------------------------------------------------------*/
    #initDOMController(){
        /**
         * initialize listener methods
         */
        this.#initListeners();
    }
    /*----------------------------------------------------------*/
    /**
     * @name initListeners
     * @property {Array} eventListeners
     */
    /*----------------------------------------------------------*/
    #initListeners(){
        let eventListeners = [
            { type: 'abort', methodName: 'onAbort' },
            { type: 'animationcancel', methodName: 'onAnimationCancel' },
            { type: 'animationend', methodName: 'onAnimationEnd' },
            { type: 'animationiteration', methodName: 'onAnimationIteration' },
            { type: 'animationstart', methodName: 'onAnimationStart' },
            { type: 'audioprocess', methodName: 'onAudioProcess' },
            { type: 'autocomplete', methodName: 'onAutoComplete' },
            { type: 'autocompleteerror', methodName: 'onAutoCompleteError' },
            { type: 'beforeinput', methodName: 'onBeforeInput' },
            { type: 'blur', methodName: 'onBlur' },
            { type: 'canplay', methodName: 'onCanPlay' },
            { type: 'canplaythrough', methodName: 'onCanPlayThrough' },
            { type: 'change', methodName: 'onChange' },
            { type: 'click', methodName: 'onClick' },
            { type: 'close', methodName: 'onClose' },
            { type: 'compositionend', methodName: 'onCompositionEnd' },
            { type: 'compositionstart', methodName: 'onCompositionStart' },
            { type: 'compositionupdate', methodName: 'onCompositionUpdate' },
            { type: 'contextmenu', methodName: 'onContextMenu' },
            { type: 'copy', methodName: 'onCopy' },
            { type: 'cut', methodName: 'onCut' },
            { type: 'dblclick', methodName: 'onDblClick' },
            { type: 'drag', methodName: 'onDrag' },
            { type: 'dragend', methodName: 'onDragEnd' },
            { type: 'dragenter', methodName: 'onDragEnter' },
            { type: 'dragexit', methodName: 'onDragExit' },
            { type: 'dragleave', methodName: 'onDragLeave' },
            { type: 'dragover', methodName: 'onDragOver' },
            { type: 'dragstart', methodName: 'onDragStart' },
            { type: 'drop', methodName: 'onDrop' },
            { type: 'durationchange', methodName: 'onDurationChange' },
            { type: 'emptied', methodName: 'onEmptied' },
            { type: 'ended', methodName: 'onEnded' },
            { type: 'error', methodName: 'onError' },
            { type: 'focus', methodName: 'onFocus' },
            { type: 'focusin', methodName: 'onFocusIn' },
            { type: 'focusout', methodName: 'onFocusOut' },
            { type: 'formdata', methodName: 'onFormData' },
            { type: 'fullscreenchange', methodName: 'onFullScreenChange' },
            { type: 'fullscreenerror', methodName: 'onFullScreenError' },
            { type: 'gamepadconnected', methodName: 'onGamepadConnected' },
            { type: 'gamepaddisconnected', methodName: 'onGamepadDisconnected' },
            { type: 'gotpointercapture', methodName: 'onGotPointerCapture' },
            { type: 'input', methodName: 'onInput' },
            { type: 'invalid', methodName: 'onInvalid' },
            { type: 'keydown', methodName: 'onKeyDown' },
            { type: 'keypress', methodName: 'onKeyPress' },
            { type: 'keyup', methodName: 'onKeyUp' },
            { type: 'load', methodName: 'onLoad' },
            { type: 'loadeddata', methodName: 'onLoadedData' },
            { type: 'loadedmetadata', methodName: 'onLoadedMetadata' },
            { type: 'loadend', methodName: 'onLoadEnd' },
            { type: 'loadstart', methodName: 'onLoadStart' },
            { type: 'lostpointercapture', methodName: 'onLostPointerCapture' },
            { type: 'mousedown', methodName: 'onMouseDown' },
            { type: 'mouseenter', methodName: 'onMouseEnter' },
            { type: 'mouseleave', methodName: 'onMouseLeave' },
            { type: 'mousemove', methodName: 'onMouseMove' },
            { type: 'mouseout', methodName: 'onMouseOut' },
            { type: 'mouseover', methodName: 'onMouseOver' },
            { type: 'mouseup', methodName: 'onMouseUp' },
            { type: 'paste', methodName: 'onPaste' },
            { type: 'pause', methodName: 'onPause' },
            { type: 'play', methodName: 'onPlay' },
            { type: 'playing', methodName: 'onPlaying' },
            { type: 'pointercancel', methodName: 'onPointerCancel' },
            { type: 'pointerdown', methodName: 'onPointerDown' },
            { type: 'pointerenter', methodName: 'onPointerEnter' },
            { type: 'pointerleave', methodName: 'onPointerLeave' },
            { type: 'pointermove', methodName: 'onPointerMove' },
            { type: 'pointerout', methodName: 'onPointerOut' },
            { type: 'pointerover', methodName: 'onPointerOver' },
            { type: 'pointerup', methodName: 'onPointerUp' },
            { type: 'progress', methodName: 'onProgress' },
            { type: 'ratechange', methodName: 'onRateChange' },
            { type: 'readystatechange', methodName: 'onReadyStateChange' },
            { type: 'reset', methodName: 'onReset' },
            { type: 'resize', methodName: 'onResize' },
            { type: 'scroll', methodName: 'onScroll' },
            { type: 'seeked', methodName: 'onSeeked' },
            { type: 'seeking', methodName: 'onSeeking' },
            { type: 'select', methodName: 'onSelect' },
            { type: 'selectstart', methodName: 'onSelectStart' },
            { type: 'show', methodName: 'onShow' },
            { type: 'stalled', methodName: 'onStalled' },
            { type: 'submit', methodName: 'onSubmit' },
            { type: 'suspend', methodName: 'onSuspend' },
            { type: 'timeupdate', methodName: 'onTimeUpdate' },
            { type: 'toggle', methodName: 'onToggle' },
            { type: 'touchcancel', methodName: 'onTouchCancel' },
            { type: 'touchend', methodName: 'onTouchEnd' },
            { type: 'touchmove', methodName: 'onTouchMove' },
            { type: 'touchstart', methodName: 'onTouchStart' },
            { type: 'transitioncancel', methodName: 'onTransitionCancel' },
            { type: 'transitionend', methodName: 'onTransitionEnd' },
            { type: 'transitionrun', methodName: 'onTransitionRun' },
            { type: 'transitionstart', methodName: 'onTransitionStart' },
            { type: 'volumechange', methodName: 'onVolumeChange' },
            { type: 'waiting', methodName: 'onWaiting' },
            { type: 'wheel', methodName: 'onWheel' }
        ];
        /**
         * loop event listeners array
         */
        eventListeners.forEach(listener => {
            /**
             * Assign ListenerMethods
             * assign method name to Class
             * declare method name as function
             */
            DOMController.prototype[listener.methodName] = function(callback, options=undefined){
                /**
                 * @implements {#listen}
                 * invoke listen method
                 */
                this.#listen(listener.type, function(e){callback(e);}, options);
            }
            /**
             * Assign Remove Listener Methods
             * capitalize first letter
             */
            let fChar   = listener.methodName.charAt(0).toUpperCase();
            let word    = listener.methodName.slice(1);
            let removeMethodName = 'remove' + fChar + word;
            /**
             * Assign Remove Listener Method
             */
            DOMController.prototype[removeMethodName] = function(){
                /**
                 * @implements {#removeListener}
                 * invoke remove listener method
                 */
                this.#removeListener(listener.type);
            }
        });
    }
    /*----------------------------------------------------------*/
    /**
     * @name listen
     * @type {Method}
     * @memberof DOMController
     * @private
     * @description
     */
    /*----------------------------------------------------------*/
    #listen(type, listener, options){
        /**
         * @name search
         * @type {Boolean}
         * @memberof #listen
         * @description search boolean for event
         */
        let search = false;
        /**
         * search events array for previous click event
         */
        if(this.node.events.length > 0){
            if(this.node.events.find(item => item.type === type)){
                search = true;
            }
        }
        /**
         * check if event already exists
         */
        if(search){
            console.error(`${type.toUpperCase()} already exists in ${this.constructor.name}`);
            return;
        } else {
            /**
             * execute addEventListener
             */
            this.node.addEventListener(type, listener, options);
            /**
             * push data to events array
             */
            this.node.events.push({type: type, listener: listener});
            /**
             * TODO: Update State#listening
             */
        }
        
    }
    /*----------------------------------------------------------*/
    /**
     * @name removeListener
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {String} type
     * @description
     */
    /*----------------------------------------------------------*/
    #removeListener(type){
        /**
         * @name search
         * @type {Boolean}
         * @memberof #removeListener
         * @description search boolean for event
         */
        let search = false;
        /**
         * @name entry
         * @type {Object}
         * @memberof #removeListener
         * @description entry data of specific event
         */
        let entry;
        /**
         * @name index
         * @type {Object}
         * @memberof #removeListener
         * @description entry index in events array
         */
        let index;
        /**
         * search events array for previous click event
         */
        if(this.node.events.length > 0){
            /**
             * find events entry for 'click'
             */
            entry = this.node.events.find(item => item.type === type);
            if(entry){
                /**
                 * set search
                 */
                search = true;
                /**
                 * set index
                 */
                index = this.node.events.indexOf(entry);
            }
        }
        /**
         * if seach true --> event exists
         * remove event
         */
        if(search){
            /**
             * remove listener
             */
            this.node.removeEventListener(entry.type, entry.listener);
            /**
             * remove events array entry
             */
            this.node.events.splice(index, 1);
            /**
             * TODO: Update State#listening
             */
        /**
         * event does NOT exist and cannot be removed
         * display error
         */
        } else {
            console.error(`${type.toUpperCase()} does not exists and cannot be removed`);
            return;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name 
     * @type {Method}
     * @memberof DOMController
     * @description
     */
    /*----------------------------------------------------------*/
}