<?php
    /*----------------------------------------------------------*/
    /**
     * TableComponent
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     * @method void __construct()
     * @method array setAttributes()
     * 
     */
    /*----------------------------------------------------------*/
    class TableComponent extends HTMLComponent {
        protected $title;
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
        public function __construct(string $tableTitle='', $tableData, array $attributes=[]){
            /**
             * TODO: Parse Data
             */
            $this->tagName      = 'table';
            $this->title        = $tableTitle;
            $this->attributes   = $attributes;
            $this->children     = [];
            $this->data         = [];
            $this->tableData    = $this->validateTableData($tableData);
        }
        /*----------------------------------------------------------*/
        /**
         * validateTableData
         * 
         * @param string|array $tableData
         * @return array|null
         */
        /*----------------------------------------------------------*/
        protected function validateTableData($tableData){
            if(is_string($tableData) && isJSON($tableData)){
                return json_decode($tableData, true);
            } else if (is_array($tableData) && isAssocArray($tableData)){
                return $tableData;
            } else {
                throw new TypeError('Table Data is not an associative array or json string!');
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * renderTable
         * 
         * @param string $title
         * @param array $data
         * 
         * @property string $html
         * @property array $this->children
         * @return string html string
         */
        /*----------------------------------------------------------*/
        protected function renderTable(string $title, array $tableData){
            /**
             * generate caption
             */
            array_push($this->children, $this->renderTitle($title));
            /**
             * render thead
             */
            array_push($this->children, $this->renderGroup(array_values($tableData), 'thead'));
            /**
             * render tbody
             */
            array_push($this->children, $this->renderGroup(array_values($tableData), 'tbody'));
        }
        /*----------------------------------------------------------*/
        /**
         * formatTableData
         * 
         * render children (thead:tr,th; tbody:tr, td)
         * render child-attributes (styles)
         * render child-data (textContent)
         * 
         * @property string $thead
         * @property string $tbody
         */
        /*----------------------------------------------------------*/
        protected function formatTableData(){}
        /*----------------------------------------------------------*/
        /**
         * render title
         * 
         * @param array $data
         * 
         * @return object HTMLComponent
         */
        /*----------------------------------------------------------*/
        protected function renderTitle (string $title){
            return new HTMLComponent('caption', [], [], ['textContent'=>htmlspecialchars($title)]);
        }
        /*----------------------------------------------------------*/
        /**
         * render thead
         * 
         * @param array $data
         * 
         * @return object new HTMLComponent thead
         */
        /*----------------------------------------------------------*/
        protected function renderGroup(array $values=[], string $tagName='tbody'){
            return new HTMLComponent($tagName, [], $this->renderCols($values, $tagName), []);
        }
        /*----------------------------------------------------------*/
        /**
         * renderCols
         *
         * @param array $data
         * @param string $type
         * 
         * @return array tr cols
         */
        /*----------------------------------------------------------*/
        private function renderCols(array $values, string $type='tbody'){
            /**
             * declare collector prop
             */
            $columns = [];
            /**
             * set width and height
             */
            $width  = arrayWidth($values);
            $height = ($type === 'tbody') ? objectHeight($values) : objectHeight($values[0]);
            /**
             * loop columns by height
             */
            for($i = 0; $i < $height; $i++){
                /**
                 * declare col data
                 * build columns
                 * define data and attribute properties
                 */
                $rowTag  = ($type === 'tbody') ? 'td' : 'th';
                $colData = ($type === 'tbody') ? $values[$i] : array_map('ucfirst', array_keys($values[$i]));
                /**
                 * render cols
                 * children = rows
                 */
                array_push($columns, new HTMLComponent('tr', [], $this->renderRows($colData, $rowTag), []));
            }
            /**
             * return cols
             */
            return $columns;
        }
        /*----------------------------------------------------------*/
        /**
         * render row
         * 
         * @param array $data
         * @param string $type default=tbody
         * 
         * @return string html string for tr, td rows
         */
        /*----------------------------------------------------------*/
        protected function renderRows(array $colData=[], string $tagName='td'){
            /**
             * declare accumulator prop
             */
            $rows = [];
            /**
             * loop data and build tags
             */
            foreach($colData as $rowData){
                /**
                 * format data
                 */
                $textContent = ($tagName === 'td') ? $rowData : ucfirst($rowData);
                /**
                 * instantiate child
                 */
                array_push($rows, new HTMLComponent($tagName, [], [], ['textContent'=>htmlspecialchars($textContent)]));
            }
            /**
             * return rows
             */
            return $rows;
        }
    }
?>