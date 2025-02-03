<?php
    /*----------------------------------------------------------*/
    /**
     * HTMLComponent Creator Class
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     * @method void __construct()
     * @method array setAttributes()
     * 
     */
    /*----------------------------------------------------------*/
    class HTMLComponent {
        protected $mounted      = false;
        protected $rendered     = false;
        protected $html;
        protected $tagName;
        protected $attributes   = [];
        protected $children     = [];
        protected $data         = [];
        /*----------------------------------------------------------*/
        /**
         * Constructor for HTMLComponent Class
         * 
         * @param mixed ...$args
         *              - Can be json string, or;
         *              - Can be string, array, array, array
         * 
         * @return void
         */
        /*----------------------------------------------------------*/
        public function __construct(...$args){
            /**
             * destructure args and assign properties
             * @uses $this->destructureArgs
             */
            $this->destructureArgs($args);
        }
        /*----------------------------------------------------------*/
        /**
         * destructureArgs
         * @param mixed ...$args
         * 
         * @property string $this->tagName
         * @property array $this->attributes
         * @property array $this->children
         * @property array $this->data
         * 
         * @return void sets object properties
         */
        /*----------------------------------------------------------*/
        protected function destructureArgs($args){
            /**
             * check if json or params
             */
            $json   = isJSONstr($args[0]);
            $isJSON = is_array($json);
            if(is_string($args[0]) && $isJSON){
                /**
                 * validate keys
                 */
                if(arrayHasKeys($json, ['tagName', 'attributes', 'children', 'data'])){
                    /**
                     * validata props
                     * TODO: validate tags
                     * validate arrays
                     * check typeof each required element
                     */
                    if(is_string($json['tagName']) && arrayEvery(
                        [$json['attributes'], $json['children'], $json['data']], function($ele){
                            $res = is_array($ele);
                            if($res != true){
                                throw new TypeError("Invalid Data Type: '$ele' should be an array! Instead it is type: " . getType($ele));
                                return false;
                            } else {
                                return true;
                            }
                        }
                    )){
                        /**
                         * assign props
                         */
                        $this->tagName    = $json['tagName'];
                        $this->attributes = arrayFlatten($json['attributes']);
                        $this->children   = $json['children'];
                        $this->data       = $json['data'];
                    }
                }
            } elseif (is_string($args[0]) && arrayEvery([$args[1], $args[2], $args[3]], function($ele){return is_array($ele);})){
                /**
                 * assign properties
                 */
                $this->tagName      = $args[0];
                $this->attributes   = $args[1];
                $this->children     = $args[2];
                $this->data         = $args[3];
            }
        }
        /*----------------------------------------------------------*/
        /**
         * buildJSFunction
         * 
         * TODO: make sure other scripts are not being overwritten
         * TODO: make sure older func of same name is deleted
         * 
         * @param string $funcName
         * @param string $funcType
         * @param string $funcString
         * 
         * @return string javascript string
         */
        /*----------------------------------------------------------*/
        private function appendJSFunc(string $funcName='', string $funcType='', string $funcString=''){
            /**
             * buildFunc
             * 
             * @param string $funcName
             * @param string $funcString
             * 
             * @return string
             */
            function buildFunc(string $funcName, string $funcString){
                return sprintf('function %s(e){%s}', $funcName, $funcString);
            }
            /**
             * writeFunc
             * 
             * @param string $jsFunc
             * 
             * @property string $GLOBAL['FP_SCRIPTS']
             * @return bool
             */
            function writeFunc(string $jsFunc): bool{
                return file_put_contents($GLOBALS['FP_SCRIPTS'], $jsFunc);
            }
            /**
             * appendHTML
             * 
             * @param string $funcName
             * @param string $funcType
             * 
             * @return string
             */
            function renderHTML(string $funcName, string $funcType){
                return sprintf('%s="%s(event);"', htmlspecialchars($funcType), htmlspecialchars($funcName));
            }
            /**
             * assign params if empty
             */
            if(empty($funcName) && empty($funcType) && empty($funcString)){
                $funcName   = $this->behaviors['funcName'];
                $funcType   = $this->behaviors['funcType'];
                $funcString = $this->behaviors['funcString'];
            }
            /**
             * check if scripts file exists
             */
            if(file_exists($GLOBALS['FP_SCRIPTS'])){
                //console('file exists');
                /**
                 * check if function already exists
                 */
                $contents = file_get_contents($GLOBALS['FP_SCRIPTS']);
                if($contents !== false){
                    //console('has contents');
                    if(!strpos($contents, $this->behaviors['funcString'])){
                        //console('file exists, contents different');
                        /**
                         * build js func
                         * overwrite file
                         */
                        $jsFunc = buildFunc($funcName, $funcString);
                        $res    = writeFunc($jsFunc);
                        /**
                         * update component html tag
                         */
                        return renderHTML($funcName, $funcType);
                    } else {
                        //console('file exists; function same');
                        /**
                         * update component html tag
                         */
                        return renderHTML($funcName, $funcType);
                    }
                } else {
                    //console('could not grab file contents');
                }
            } else {
                //console('file does not exist');
                /**
                 * build js function
                 * create and write file
                 */
                $jsFunc = buildFunc($funcName, $funcString);
                $res    = writeFunc($jsFunc);
                /**
                 * return html
                 */
                return renderHTML($funcName, $funcType);
            }
        }
        /*----------------------------------------------------------*/
        /**
         * setAttribute
         * 
         * @param string $name
         * @param mixed $value
         * 
         * @return array<string,mixed> assigns an attribute to the attribute object
         */
        /*----------------------------------------------------------*/
        public function setAttribute($name, $value){
            /**
             * assign attribute to attributes
             */
            $this->attributes[$name] = $value;
        }
        /*----------------------------------------------------------*/
        /**
         * appendChild
         * 
         * @param object $child
         * 
         * @return void
         */
        /*----------------------------------------------------------*/
        public function appendChild(object $child){
            /**
             * validate that parent is a component
             */
            if($child instanceof HTMLComponent){
                /**
                 * check that this->html exists
                 * add to parent as child
                 */
                if(isset($this->html) && $this->html !== null){
                    /**
                     * find closing tag position
                     * inject child html substring
                     */
                    $tagPos = strpos($this->html, sprintf('</%s>', $this->tagName));
                    if($tagPos !== false){
                        /**
                         * render child
                         * append child html
                         * update this->html
                         */
                        $child->render();
                        $this->html = substr($this->html, 0, $tagPos) . $child->html . substr($this->html, $tagPos);
                    } else {
                        /**
                         * error assigning child
                         */
                        throw new TypeError('Could not append child!');
                    }
                }
            }
        }
        /*----------------------------------------------------------*/
        /**
         * appendSibling
         *
         * @param object $component HTMLComponent
         * @return object
         */
        /*----------------------------------------------------------*/
        public function appendSibling(object $component){
            console($this->html);
        }
        /*----------------------------------------------------------*/
        /**
         * addChild
         * 
         * @param object $child
         * @property array $this->children
         */
        /*----------------------------------------------------------*/
        public function addChild($child){
            /**
             * check that component has not already been mounted
             */
            if($this->mounted === false){
                /**
                 * validate child
                 */
                if(($child instanceof HTMLComponent || isJSON($child))){
                    /**
                     * check that element has not already rendered
                     */
                    if($this->rendered === false){
                        $this->children[] = $child;
                    } elseif($this->rendered === true){
                        /**
                         * add child
                         * re-render component
                         */
                        $this->children[] = $child;
                        $this->render();
                    }
                } else {
                    throw new TypeError('Child element supplied must be a json string or instance of HTMLComponent');
                }
            } else {
                throw new Error('Component has already been mounted! Cannot add children');
            }
        }
        /*----------------------------------------------------------*/
        /**
         * render
         * 
         * @property string $tag
         * @property array $this->attributes
         * 
         * TODO:    Add callback param for adding button behaviors
         * 
         * @return void
         */
        /*----------------------------------------------------------*/
        public function render(){
            /**
             * check if component is mounted
             */
            if($this->mounted === false){
                /**
                 * define opening of tag
                 */
                $tag = "<{$this->tagName}";
                /**
                 * validate array has values
                 * loop attributes and inject
                 */
                if(count($this->attributes) > 0){
                    /**
                     * loop props
                     */
                    foreach($this->attributes as $key=>$prop){
                        /**
                         * append to tag opening
                         * use htmlspecialchars to format and protect value injection
                         */
                        $tag .= " {$key}=\"" . htmlspecialchars($prop) . "\"";
                    }
                }
                /**
                 * check for behaviors property: buttons
                 */
                if(property_exists($this, 'behaviors')){
                    /**
                     * TODO: append func to html string
                     * TODO: write script to javascript file
                     */
                    $res = $this->appendJSFunc();
                    if(!empty($res)){
                        $tag .= $res;
                    }
                }
                /**
                 * close opening tag
                 */
                $tag .= ">";
                /**
                 * check if component is a table
                 */
                if($this->tagName === 'table' && property_exists($this, 'tableData')){
                    $this->renderTable($this->title, $this->tableData);
                }
                /**
                 * check if component is a list
                 */
                if(property_exists($this, 'listData') && ($this->tagName == 'ol' || $this->tagName === 'ul')){
                    $this->renderList($this->listData);
                }
                /**
                 * destructure data array of arrays
                 * inject text if present in data array
                 */
                $textContent = arrayGetValueRecursive($this->data, 'textContent');
                if(isset($textContent)){
                    $tag .= htmlspecialchars($textContent);
                }
                /**
                 * complete ending tag
                 */
                $tag .= "</{$this->tagName}>";
                /**
                 * assign to self html property
                 */
                $this->html = $tag;
                /**
                 * validate children array has values
                 * append children if present
                 */
                if(count($this->children) > 0){
                    /**
                     * loop children and inject into html element
                     */
                    foreach($this->children as $child){
                        /**
                         * validate isHTMLComponent Object
                         * render child component
                         * append to tag
                         */
                        if($child instanceof HTMLComponent){
                            $this->appendChild($child);
                        } else {
                            /**
                             * convert child object back to json for __construct to parse
                             * create element
                             */
                            $child = new HTMLComponent(json_encode($child));
                            $this->appendChild($child);
                        }
                    }
                }
                /**
                 * set rendered
                 */
                $this->rendered = true;
            } else {
                /**
                 * Component already mounted
                 */
                throw new Error('Component has already been mounted! Cannot re-render component');
            }
        }
        /*----------------------------------------------------------*/
        /**
         * mount
         * 
         * @property string $tag
         * @property string $this->html
         * @property bool $this->rendered
         * @property array $this->mounted
         * 
         * @return void
         */
        /*----------------------------------------------------------*/
        public function mount(){
            /**
             * check that this->html is set
             * check that element has not already been mounted
             */
            if(isset($this->html) && $this->mounted === false && $this->rendered === true){
                /**
                 * set mounted
                 * print html to dom
                 */
                $this->mounted = true;
                echo $this->html;
            } else {
                throw new Error('Component has already been mounted to the DOM and cannot be updated!');
                return null;
            }
        }
    };
?>

