<?php
    /*----------------------------------------------------------*/
    /**
     * Object that contains the connection with the Database
     * @version 2.1.0
     * 
     * @param array $config
     */
    /*----------------------------------------------------------*/
    class DatabaseConnection {
        /**
         * @var string $DSN Data Source Name used for database connection.
         */
        private ?string $dsn = null;
        /**
         * @var PDO Instance
         */
        private ?PDO $pdo = null;
        /**
         * @var array Configuration array
         */
        private array $config;
        /**
         * @var bool Returns connection status
         */
        public bool $isConnected = false;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(array $config){
            /**
             * Validate Configuration
             * Parse Configuration
             * Render DSN for Connection
             */
            if($this->parseConfig($config)){
                $this->dsn = $this->renderDSN();
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Validate and Parse DB Configuration
         * @param array
         * @return bool True on success; Sets $this->config
         */
        /*----------------------------------------------------------*/
        private function parseConfig(array $config){
            /**
             * Validate config
             */
            if(empty($config)){
                // Error
                return false;
            }
            /**
             * Validate Required
             */
            $required   = ['database', 'username', 'password'];
            $diff       = array_diff($required, array_keys($config));
            if(!empty($diff)){
                // Missing required
                return false;
            } else {
                /**
                 * Set properties
                 */
                $this->config['driver']   = isset($config['driver']) ? $config['driver'] : 'mysql';
                $this->config['host']     = isset($config['host']) ? $config['host'] : 'localhost';
                $this->config['port']     = isset($config['port']) ? $config['port'] : 3306;
                $this->config['database'] = $config['database'];
                $this->config['username'] = $config['username'];
                $this->config['password'] = $config['password'];
                $this->config['charset']  = isset($config['charset']) ? $config['charset'] : 'utf8mb4';
                /**
                 * Set Options
                 */
                $this->config['options'] = isset($config['options']) ? $config['options'] : [
                    PDO::MYSQL_ATTR_INIT_COMMAND    => sprintf("SET NAMES '%s' COLLATE 'utf8mb4_unicode_ci'", $this->config['charset']),
                    PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
                ];
                /**
                 * Validate config and return 
                 */
                return count($this->config) > 7;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Assemble DSN string from connection properties.
         * @param void
         * @return string|null
         */
        /*----------------------------------------------------------*/
        private function renderDSN(): ?string{
            /**
             * Generate string
             */
            $dsn = sprintf(
                '%s:host=%s;port=%s;dbname=%s;charset=%s',
                $this->config['driver'],
                $this->config['host'],
                $this->config['port'],
                $this->config['database'],
                $this->config['charset']
            );
            /**
             * Return DSN
             */
            return $dsn;
        }
        /*----------------------------------------------------------*/
        /**
         * Connects to DB from Config parameters
         * @param void
         * @return ?PDO|null PDO Connection instance; Null on failure
         */
        /*----------------------------------------------------------*/
        public function connect(){
            /**
             * Check for existing connection
             */
            if(is_null($this->pdo)){
                /**
                 * Validate DSN
                 */
                if(!isset($this->dsn)){
                    // Cannot continue!
                    return null;
                }
                /**
                 * Attempt to connect
                 */
                try {
                    /**
                     * Assign PDO
                     */
                    $this->pdo = new PDO($this->dsn, $this->config['username'], $this->config['password'], $this->config['options']);
                } catch (PDOException $error){
                    /**
                     * Failure to Connect
                     */
                    return null;
                }
            }
            /**
             * Validate
             * Set isConnected
             * Return PDO Instance
             */
            if(!is_null($this->pdo) && is_object($this->pdo)){
                $this->isConnected = true;
                return $this->pdo;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Disconnects from the database
         * @param void
         * @return void
         */
        /*----------------------------------------------------------*/
        public function disconnect(){
            /**
             * Disconnect
             */
            $this->pdo = null;
            /**
             * Set isConnected
             */
            $this->isConnected = false;
        }

    }
?>