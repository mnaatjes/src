class TestComponent extends HTMLElement {
    constructor(styles){
        super();
        /**
         * @type {ShadowRoot}
         * @description Enable shadow dom for custom element
         *              Encapsulates custom element from document
         *              Open: shadow DOM ele can be accessed from JS outside of the component
         */
        this.shadow = this.attachShadow({mode: 'open'});
        /**
         * @member {HTMLTemplateElement}
         * @description Template element is used for rendering the component's content and structure
         */
        /*
        this.template = document.createElement('template');
        this.template.innerHTML = `
        :host {border: 1px solid green;}
            <div>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione voluptates eaque rerum?
                </p>
            </div>
        `;
        this.templateContent = this.template.content.cloneNode(true);
        this.applyStyles(styles);
        this.shadow.appendChild(this.templateContent);
        */
       this.#loadTemplate()
            .then(templateContent => {
                this.shadow.appendChild(templateContent.cloneNode(true));
            })
            .catch(error => {
                console.error('Something went wrong!', error);
            });
    }
    /**
     * @private
     * @method loadTemplate
     */
    async #loadTemplate(){
        try {
            const res = await fetch('../templates/test.html');
            if(!res.ok){
                throw new Error(`HTTP Connection Error: ${res.status}`);
            }
            /**
             * grab text
             * create template element
             * inject text
             * return template.content
             */
            const text          = await res.text();
            const template      = document.createElement('template');
            template.innerHTML  = text;
            return template.content;
        } catch(err){
            console.error('Error loading template: ', err);
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @file src/packages/ui-components/core/test-components.js
 * File for main ui-component class
 * 
 * @extends HTMLElement
 */
/*----------------------------------------------------------*/
export class TestUIComponent extends HTMLElement {
    /*----------------------------------------------------------*/
    /**
     * @constructor
     * 
     * @param 
     */
    /*----------------------------------------------------------*/
    constructor(title, paragraph, url, isbn) {
        super();
        /**
         * @type {ShadowRoot}
         * @description Enable shadow dom for custom element
         *              Encapsulates custom element from document
         *              Open: shadow DOM ele can be accessed from JS outside of the component
         */
        this.shadow = this.attachShadow({mode: 'open'});
        /**
         * @member {HTMLTemplateElement}
         * @description Template element is used for rendering the component's content and structure
         * @todo 1) Check that template exists in DOM
         * @todo 2) If does not exist, generate template
         * @todo 3) Otherwise, throw Error: Template not found / could not be instantiated
         */
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                :host([checked="true"]) div{
                /*
                    user-select: none;
                    color: orange;
                */
                }
                :host {
                    box-sizing: border-box;
                    display: block;
                    margin: 2.25rem;
                    padding: 2rem;
                    border: 1px solid #666;
                    border-radius: 1rem;
                    line-height: 2.0;
                    color: green;
                    font-size: 24px;
                }
                small[name="desc"] {
                    font-style: italic;
                    color: cornflowerblue;
                }
                p {display:block;}
                input {
                    display: inline-block;
                    width: 2rem;
                    height: 2rem;
                }
            </style>
            <h2>${title}</h2>
            <small name="desc">
                ${paragraph}
            </small>
            <a href="${url}" target="_blank">${isbn}</a>
            <input type="checkbox" name="check" value="none"/>
        `;
        /**
         * @property templateContent
         * @description Clone template content and append to Shadow DOM
         *              It is the cloned-copy that is appended, not the element itself!
         */
        this.templateContent = this.template.content.cloneNode(true);
        this.shadow.appendChild(this.templateContent);
        /**
         * define commonly used elements within component
         */
        this.checkbox = this.shadow.querySelector('input[type="checkbox"]');
    }
    /*----------------------------------------------------------*/
    /**
     * Gets the observedAttributes
     * @returns {String}
     */
    /*----------------------------------------------------------*/
    static get observedAttributes(){
        /**
         * array of all attributes to check for
         */
        return ['checked', 'disabled'];
    }
    /*----------------------------------------------------------*/
    /**
     * @method attributeChangedCallback
     */
    /*----------------------------------------------------------*/
    attributeChangedCallback(name, oldVal, newVal){
        /**
         * debugging
         */
        console.log(name, oldVal, newVal);
        /**
         * trigger check
         */
        if(name === 'checked'){
            this.updateChecked(newVal);
        }
        /**
         * trigger style change
         */
        if(name === 'disabled'){
            console.log('Element is disabled!');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @description Every time a new element is added to the DOM this method is called
     */
    /*----------------------------------------------------------*/
    connectedCallback(){
        console.log('DOM Element Connected!');
    }
    /*----------------------------------------------------------*/
    /**
     * update checked attribute change
     */
    /*----------------------------------------------------------*/
    updateChecked(value){
        this.checkbox.checked = value != null && value !== 'false';
    }
}