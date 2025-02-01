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
    protected $pkey;
    protected $title;
    protected $listType;
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
    public function __construct(string $listTitle, $listData, string $pkey, bool $ordered=false, array $attributes=[]){
        /**
         * TODO: Parse Data
         */
        $this->tagName      = 'div';
        $this->listType     = $ordered ? 'ol' : 'ul';
        $this->title        = $listTitle;
        $this->attributes   = $attributes;
        $this->children     = [];
        $this->data         = [];
        $this->listData     = $this->validateListData($listData);
        $this->pkey         = $pkey;
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
        if(is_string($listData) && isJSON($listData)){
            return json_decode($listData, true);
        } else if (is_array($listData) && isAssocArray($listData)){
            return $listData;
        } else {
            throw new TypeError('Table Data is not an associative array or json string!');
            return null;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * renderList
     * 
     * @param string $title
     * @param array $data
     * 
     * @property string $html
     * @property array $this->children
     * @return string html string
     */
    /*----------------------------------------------------------*/
    protected function renderList(string $title, array $listData){
        /**
         * generate caption
         */
        array_push($this->children, $this->renderListTitle($title));
        /**
         * render ul / ol
         */
        $this->children = array_merge($this->children, $this->renderListContainers(array_values($listData), $this->listType));
    }
    /*----------------------------------------------------------*/
    /**
     * renderListTitle
     * 
     * @return object
     */
    /*----------------------------------------------------------*/
    private function renderListTitle(string $title){
        return new HTMLComponent('h2', [], [], ['textContent'=>$title]);
    }
    /*----------------------------------------------------------*/
    /**
     * renderListContainer
     * 
     * ul / ol
     * 
     * @return object
     */
    /*----------------------------------------------------------*/
    private function renderListContainers(array $listData, string $listType='ul'){
        /**
         * declare acc array
         */
        $containers = [];
        foreach($listData as $itemData){
            /**
             * check if nested
             */
            if(is_array($itemData)){
                array_push($containers, new HTMLComponent($listType, ['class'=>'list-group'], $this->renderListItems($itemData), []));
            } else {
                console($itemData);
            }
        }
        /**
         * return ul/ol
         */
        return $containers;
    }
    /*----------------------------------------------------------*/
    /**
     * renderListItem
     * 
     * @return object
     */
    /*----------------------------------------------------------*/
    private function renderListItems(array $itemData){
        /**
         * declare accumulator
         */
        $items = [];
        /**
         * loop item data
         */
        foreach($itemData as $key=>$value){
            array_push($items, new HTMLComponent('li', [], [], ['textContent'=>htmlspecialchars($value)]));
        }
        //console($items);
        /**
         * debugging
         */
        return $items;
    }
}

?>