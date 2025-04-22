<?php
    /*----------------------------------------------------------*/
    /**
     * Controller Base Class utilizing __invoke() magic method.
     */
    /*----------------------------------------------------------*/
    class InvokeController {
        /**
         * @var object model
         */
        protected object $model;
        /**
         * @var object $errors
         */
        protected object $errors;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(){
            /**
             * Invoke Model
             */
            /**
             * Set errors
             */
            $this->errors = new Errors();
        }
        /*----------------------------------------------------------*/
        /**
         * Invoke Magic Method
         * - Routes class method by REQUEST_METHOD
         * - Implements CRUD 
         */
        /*----------------------------------------------------------*/
        public function __invoke(Request $req, Response $res, array $args=[]){
            /**
             * Grab method
             * Switch statement for REQUEST_METHOD
             */
            switch(strtoupper($req->getMethod())){
                /**
                 * POST - Create: Store()
                 */
                case 'POST':
                    return $this->store($req, $res, $args);
                /**
                 * GET - Read: Index(), Show()
                 */
                case 'GET':
                    if(empty($args)){
                        return $this->index($req, $res);
                    } else {
                        return $this->show($req, $res, $args);
                    }
                /**
                 * PUT - Update: edit()
                 */
                case 'PUT':
                    return $this->edit($req, $res, $args);
                /**
                 * DELETE - Delete: destroy() 
                 */
                case 'DELETE':
                    return $this->destroy($req, $res, $args);
                /**
                 * Default
                 * Error
                 */
                default:
                    return $this->onError($req, $res);
            }
        }
        /*----------------------------------------------------------*/
        /**
         * POST Store Method
         * @param object $req HTTP Request Object
         * @param object $res HTTP Response Object
         * @param array $args Assoc Array of Arguments: params, etc. from Router()
         */
        /*----------------------------------------------------------*/
        protected function store(Request $req, Response $res, array $args=[]){
            
        }
        /*----------------------------------------------------------*/
        /**
         * GET Read Method for all records
         * @param object $req HTTP Request Object
         * @param object $res HTTP Response Object
         */
        /*----------------------------------------------------------*/
        protected function index(Request $req, Response $res){
            /**
             * Grab user data
             */
            $content = file_get_contents('../test/data/users.json');
            /**
             * Format response and send
             */
            $res->setContentType('application/json');
            $res->setStatus(200);
            $res->setBody($content);
            $res->send();
        }
        /*----------------------------------------------------------*/
        /**
         * GET Read Method for specific record(s)
         * @param object $req HTTP Request Object
         * @param object $res HTTP Response Object
         * @param array $args Assoc Array of Arguments: params, etc. from Router()
         */
        /*----------------------------------------------------------*/
        protected function show(Request $req, Response $res, array $args){
        }
        /*----------------------------------------------------------*/
        /**
         * PUT Read Method to update / edit a specific resource
         * @param object $req HTTP Request Object
         * @param object $res HTTP Response Object
         * @param array $args Assoc Array of Arguments: params, etc. from Router()
         */
        /*----------------------------------------------------------*/
        protected function edit(Request $req, Response $res, array $args){
        }
        /*----------------------------------------------------------*/
        /**
         * DELETE method to delete / destroy a specific record
         * @param object $req HTTP Request Object
         * @param object $res HTTP Response Object
         * @param array $args Assoc Array of Arguments: params, etc. from Router()
         */
        /*----------------------------------------------------------*/
        protected function destroy(Request $req, Response $res, array $args){
        }
        /*----------------------------------------------------------*/
        /**
         * Default: On Error condition
         * @param object $req HTTP Request Object
         * @param object $res HTTP Response Object
         */
        /*----------------------------------------------------------*/
        protected function onError(Request $req, Response $res){

        }
    }
?>