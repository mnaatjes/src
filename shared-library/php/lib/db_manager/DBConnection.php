<?php
    /*----------------------------------------------------------*/
    /**
     * Database Connection Class
     * - Object representing a connection to the DataBase
     * 
     * @version 1.0.0
     * @since 4/19/2025
     * TODO: Integrate Errors object
     * 
     */
    /*----------------------------------------------------------*/
    class DBConnection {
        /**
         * The hostname or IP address of the database server.
         *
         * @var string
         */
        private $host;
        /**
         * The port for sql db.
         *
         * @var int
         */
        private $port;
        /**
         * The type of sql database. e.g. 'mysql'
         * @var string
         */
        private $driver;
        /**
         * The username for connecting to the database.
         *
         * @var string
         */
        private $username;
        /**
         * The password for the database user.
         *
         * @var string
         */
        private $password;
        /**
         * The name of the database to connect to.
         *
         * @var string
         */
        private $database;
        /**
         * The character set encoding.
         * @var string Default 'utf8mb4'
         */
        protected string $charset;
        /**
         * An array of PDO connection options.
         *
         * @var array|null|
         */
        private $options = [];
        /**
         * @var string $DSN Data Source Name used for database connection. Includes:
         * - type, 
         * - host, 
         * - port,
         * - database
         * Example: 'mysql:host=localhost;port=3306;dbname=mydatabase'
         */
        private string $dsn;
        /**
         * @var object|null $pdo
         */
        private ?PDO $pdo = null;
        /**
         * @var object Errors object
         */
        protected object $errors;
        /**
         * A boolean indicating whether the connection is currently established.
         *
         * @var bool
         */
        private $isConnected = false;
        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * - Sets properties from default
         * - Generates DSN for connection
         * 
         * @param array{
         *      $driver: string,
         *      $host: string,
         *      $port: int,
         *      $database: string,
         *      $username: string,
         *      $password: string,
         *      $charset: string,
         *      $options: array
         * } $config
         */
        /*----------------------------------------------------------*/
        public function __construct(array $config=[]){
            /**
             * Init Errors object
             */
            $this->errors = new Errors();
            /**
             * Set object properties
             */
            if($this->setProperties($config)){
                /**
                 * Set DSN
                 */
                $this->dsn = $this->renderDSN();
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Parse Config
         * @param array $config
         * @return bool True on success
         */
        /*----------------------------------------------------------*/
        private function setProperties(array $config): bool{
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
                $this->driver   = isset($config['driver']) ? $config['driver'] : 'mysql';
                $this->host     = isset($config['host']) ? $config['host'] : 'localhost';
                $this->port     = isset($config['port']) ? $config['port'] : 3306;
                $this->database = $config['database'];
                $this->username = $config['username'];
                $this->password = $config['password'];
                $this->charset  = isset($config['charset']) ? $config['charset'] : 'utf8mb4';
                /**
                 * Set Options
                 */
                $this->options = isset($config['options']) ? $config['options'] : [
                    PDO::MYSQL_ATTR_INIT_COMMAND    => sprintf("SET NAMES '%s' COLLATE 'utf8mb4_unicode_ci'", $this->charset),
                    PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
                ];
                /**
                 * Return success!
                 */
                return true;
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
                $this->driver,
                $this->host,
                $this->port,
                $this->database,
                $this->charset
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
         * @return self Assigns PDO property
         */
        /*----------------------------------------------------------*/
        public function connect(): self{
            /**
             * Check for existing connection
             */
            if(is_null($this->pdo)){
                /**
                 * Validate DSN
                 */
                if(!isset($this->dsn)){
                    // Cannot continue!
                    return $this;
                }
                /**
                 * Attempt to connect
                 */
                try {
                    /**
                     * Assign PDO
                     */
                    $this->pdo = new PDO($this->dsn, $this->username, $this->password, $this->options);
                } catch (PDOException $error){
                    $this->errors->add('exception', $error);
                }
            }
            /**
             * Validate
             * Set isConnected
             */
            if(!is_null($this->pdo) && is_object($this->pdo)){
                $this->isConnected = true;
            }
            /**
             * Return Default
             */
            return $this;
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
        /*----------------------------------------------------------*/
        /**
         * Returns pdo
         * @param void
         * @return object|null
         */
        /*----------------------------------------------------------*/
        protected function getPDO(){ return $this->pdo;}
        /*----------------------------------------------------------*/
        /**
         * Get status of isConnected
         * @param void
         * @return bool
         */
        /*----------------------------------------------------------*/
        public function isConnected(){return $this->isConnected;}
    }
?>