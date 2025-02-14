/**
 * @class MyTestComponent
 */
export class MyTestComponent {
    constructor(htmlElement){
        /**
         * This creates and initializes a new custom Component
         * @constructor
         * @param {}
         */
        /*
        this.shadow     = htmlElement.attachShadow({mode: 'open'});
        this.template   = this.initTemplate();
        this.template.innerHTML = `
            <link rel="stylesheet" href="../../../shared-library/styles/css/main.css">
            <div>
                <small id="banana">
                    I Am A Banana!
                </small>
                <br>
                <button>
                    Click Me!
                </button>
            </div>        
        `;
        this.templateContent = this.template.content.cloneNode(true);
        this.shadow.appendChild(this.templateContent);
        this.banana = this.shadow.getElementById('banana');
        */
        /*
        this.template       = document.createElement('template');
        this.template.innerHTML = `
            <link rel="stylesheet" href="../../../shared-library/styles/css/main.css">
            <div>
                <button>
                    Click Me!
                </button>
            </div>
        `;
        this.templateContent = this.template.content.cloneNode(true);
        this.shadow.appendChild(this.templateContent);
        */
       //this.render();
    }
    /**
     * @param {String} path
     */
    initTemplate(path){
        return document.createElement('template');
    }
    /**
     * Override "render" method from UIComponent
     * @override
     */
    render(){
        /**
         * check if shadow attached
         */
        /**
         * call "createElement" which returns a DOM element
         * call "updateContent" and supply it the new DOM element
         */
        /**
         * call "updateContent" and to initialize / render changes
         */
        //this.updateContent(ele);
    }
    createElement(tag){
        return document.createElement(tag);
    }
    updateContent(content){
        /**
         * clear existing content
         */
        this.htmlElement.innerHTML = '';
        /**
         * check if content supplied is an HTML Element
         */
        if(typeof content === 'string'){
            content.innerHTML = 'Click Me!';
            this.htmlElement.appendChild(content);
            console.log(this.htmlElement);
        }
    }
    updateBanana(){console.log('Banana!');}
}