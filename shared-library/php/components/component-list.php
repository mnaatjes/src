<?php
/*----------------------------------------------------------*/
/**
 * ListComponent
 * 
 * @package component
 * @author Michael Naatjes <michael.naatjes87@email.com>
 * 
 * @method void __construct()
 * @method array setAttributes()
 * 
 */
/*----------------------------------------------------------*/
class ListComponent extends HTMLComponent {
    protected $isJSONData = false;
    protected $listData = [];
    /*----------------------------------------------------------*/
    /**
     * Constructor for HTMLComponent Class
     * 
     * **Overrides parent class __construct
     * 
     * @param string tableTitle
     * @param array tableData
     * @param array $attributes optional
     * 
     * @property string $tagName == 'button'
     * @property array $children == empty
     * @property array $data == 'textContent'=>$btnName
     * 
     * @return void
     */
    /*----------------------------------------------------------*/
    public function __construct($listData, bool $ordered=false, array $attributes=[]){
        /**
         * TODO: Remove DIV container
         *          Just do UL or OL
         * TODO: Remove title
         * TODO: Remove pkey requirement
         * TODO: Validate Data and data format
         *          Determine how to nest data if:
         *              indexed
         *              assoc
         *              nested indexed
         *              nested assoc
         */
        $this->tagName      = $ordered == false ? 'ul' : 'ol';
        $this->attributes   = $attributes;
        $this->children     = [];
        $this->data         = [];
        $this->listData     = $this->validateListData($listData);
    }
    /*----------------------------------------------------------*/
    /**
     * validateListData
     * 
     * @param string|array $listData
     * @return array|null
     */
    /*----------------------------------------------------------*/
    protected function validateListData($listData){
        /**
         *  Data schema:
         *      Indexed Array
         *          string | number
         *          Nested Indexed
         *          Nested Assoc
         *          value == array: *recursive
         *      Assoc Array
         *          string | number
         *          Nested Indexed
         *          Nested Assoc
         *          value == array: *recursive
         * 
         *  *Carry over currDepth to determine recursive
         */
        /**
         * parse data
         * check if json or array
         * set json to listData if present
         */
        $json               = isJSONstr($listData);
        $this->isJSONData   = is_array($json);
        if($this->isJSONData){
            $listData = $json;
        }
        $flag = true;
        if(!$flag) {
            throw new TypeError('Table Data is not an associative array or json string!');
            return null;
        } else {
            return $listData;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * renderList
     * 
     * sets $this->children property based on $this->listData
     * 
     * @property array $this->listData
     * @property array $this->children
     * @return array 
     */
    /*----------------------------------------------------------*/
    protected function renderList(array $data){
        /**
         * check data depth
         * for each layer, check if indexed or assoc
         */
        $depth = arrayDepth($data);
        if(is_array($data) && $depth === 1){
            /**
             * check array type
             */
            $indexed = array_every($data, function($k, $v, $i){return $i === $k;});
            if($indexed === true){
                foreach($data as $item){
                    $this->addChild(
                        new HTMLComponent('li', [], [], ['textContent'=>$item])
                    );
                }
            } else {
                foreach($data as $key=>$value){
                    /**
                     * beautify key
                     */
                    $key = ucwords(strtolower(str_replace('_', ' ', $key)));
                    $textContent = sprintf('%s: %s', $key, $value);
                    $this->addChild(
                        new HTMLComponent('li', [], [], ['textContent'=>$textContent])
                    );
                }
            }
        } else {
            /**
             * error!
             */
            throw new Error('Unable to parse list data!');
        }
    }
}

?>