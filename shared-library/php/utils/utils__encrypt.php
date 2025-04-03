<?php
    /*----------------------------------------------------------*/
    /**
     * Encrypt json string or array as json string
     *
     * @param string|array $data - Data (array or json) to be encrypted
     * @param bool [$assoc] - Default(true) returns assoc array | False returns PHP object
     * @return string - Encrypted array or json string as json string
     * 
     * TODO: Check PHP memory limit for handling large json strings!!!
     */
    /*----------------------------------------------------------*/
    function encrypt_json($data, bool $assoc=true): string{
        /**
         * Validate $data is either an array or a json string
         */
        if(!is_array($data) && !is_string($data)){
            throw new TypeError('Argument supplied must be either a STRING or an ARRAY!');
        }
        /**
         * Check if $data is a string:
         * Test if already json string
         */
        if(is_string($data)){
            // attempt to decode data
            json_decode($data, $assoc);
            // perform test
            $test = json_last_error() == JSON_ERROR_NONE;
        }
        /**
         * Determine if array
         * Convert to json string
         */
        $json = is_array($data) ? json_encode($data, $assoc) : (isset($test) && $test === true ? $data : json_encode($data, $assoc));
        /**
         * Send to encrypt_string and return value
         */
        return encrypt_string($json);
    }
    /*----------------------------------------------------------*/
    /**
     * Decrypt a JSON string into an array or a string
     *
     * @param $json - json string to decrypt
     * @param bool [$assoc] - Default(true) returns assoc array | False returns PHP object
     * @return mixed|false - Decrypted data; likely an array or object | Failed return false
     */
    /*----------------------------------------------------------*/
    function decrypt_json(string $str, bool $assoc=true){
        /**
         * Validate is a json string
         */
        if(!is_string($str)){
            throw new TypeError('Argument supplied must be a STRING!');
        }
        $json = decrypt_string($str);
        /**
         * Validate decoded string is json
         */
        $result = json_decode($json, $assoc);
        if(json_last_error() !== JSON_ERROR_NONE){
            throw new Exception('JSON decoding error: ' . json_last_error_msg());
        }
        /**
         * Success: Return Mixed
         */
        return $result;
    }
    /*----------------------------------------------------------*/
    /**
     * encryptData
     * @param array $arr - array of data to supply
     * @return array - encrypted array of data
     */
    /*----------------------------------------------------------*/
    function encrypt_data($arr){
        /**
         * Generate an AES 256bit string in Cipher Block Chaining mode (requires Initialization Vector)
         */
        if(is_null(OPEN_SSL_METHOD)){
            throw new Error('Cannot Encrypt Data!!! Check "utils/utils__constants.php" for valid OpenSSL method!');
        }
        /**
         * Get key and init vector
         */
        $key = OPEN_SSL_KEY;
        $iv  = OPEN_SSL_IV;
        /**
         * Loop array and encrypt elements
         */
        $res = [];
        foreach($arr as $k => $val){
            // check if value is an array
            if(is_array($val)){
                $res[$k] = encrypt_data($val);
            } else {
                // encrypt string values
                $res[$k] = encrypt_string($val, $key, $iv);
            }
        }
        /**
         * Return Array
         */
        return $res;
    }
    /*----------------------------------------------------------*/
    /**
     * Encrypt data-type of string and return encrypted string
     * @param string $str
     * @param string $key
     * @param string $iv
     * @return string - encrypted string
     */
    /*----------------------------------------------------------*/
    function encrypt_string($str, $key=null, $iv=null){
        /**
         * Check if $key and $iv exist
         */
        if(is_null($key) && is_null($iv)){
            /**
             * Generate an AES 256bit string in Cipher Block Chaining mode (requires Initialization Vector)
             */
            if(is_null(OPEN_SSL_METHOD)){
                throw new Error('Cannot Encrypt Data!!! Check "utils/utils__constants.php" for valid OpenSSL method!');
            }
            /**
             * Get key and init vector
             */
            $key = OPEN_SSL_KEY;
            $iv  = OPEN_SSL_IV;
        }
        /**
         * Encrypt and validate string encryption
         */
        $encrypt = openssl_encrypt($str, OPEN_SSL_METHOD, $key, OPENSSL_RAW_DATA, $iv);
        if($encrypt === false){
            throw new Error('Unable to properly encrypt string!!!');
        }
        /**
         * Base 64 encode and return
         */
        return base64_encode($encrypt);
    }
    /*----------------------------------------------------------*/
    /**
     * decryptData
     * @param array $arr - array of data to supply
     * @return array - decrypted array of data
     */
    /*----------------------------------------------------------*/
    function decrypt_data($arr){
        /**
         * Generate an AES 256bit string in Cipher Block Chaining mode (requires Initialization Vector)
         */
        if(is_null(OPEN_SSL_METHOD)){
            throw new Error('Cannot Encrypt Data!!! Check "utils/utils__constants.php" for valid OpenSSL method!');
        }
        /**
         * Get key and init vector
         */
        $key = OPEN_SSL_KEY;
        $iv  = OPEN_SSL_IV;
        /**
         * Declare $result array
         * Loop through array key, values
         */
        $res = [];
        foreach($arr as $k => $val){
            // check if value is an array
            if(is_array($val)){
                $res[$k] = decrypt_data($val);
            } else {
                // encrypt string values
                $res[$k] = decrypt_string($val, $key, $iv);
            }
        }
        /**
         * Return Array
         */
        return $res;
    }
    /*----------------------------------------------------------*/
    /**
     * decryptString
     *
     * @param string $str - string to decrypt
     * @param string $key
     * @param string $iv
     * @return string
     */
    /*----------------------------------------------------------*/
    function decrypt_string($str, $key=null, $iv=null){
        /**
         * Check if $key and $iv exist
         */
        if(is_null($key) && is_null($iv)){
            /**
             * Generate an AES 256bit string in Cipher Block Chaining mode (requires Initialization Vector)
             */
            if(is_null(OPEN_SSL_METHOD)){
                throw new Error('Cannot Encrypt Data!!! Check "utils/utils__constants.php" for valid OpenSSL method!');
            }
            /**
             * Get key and init vector
             */
            $key = OPEN_SSL_KEY;
            $iv  = OPEN_SSL_IV;
        }
        /**
         * Base64 decode
         */
        $str = base64_decode($str);
        $decrypt = openssl_decrypt($str, OPEN_SSL_METHOD, $key, OPENSSL_RAW_DATA, $iv);
        return $decrypt;
    }
    /*----------------------------------------------------------*/
    /**
     * validateSSLMethod
     * @param string $method - openssl cipher method
     * @property object $parts - object of cipher method constituents
     * @property array - cypher methods from algorithm in openSSL $methods array
     * @return bool - found $method in openSSL cypher methods $arr
     */
    /*----------------------------------------------------------*/
    function validateSSLMethod($method){
        /**
         * Split methods into constituents
         * @property object{
         *      @property string algo - algorithm string
         *      @property string size - size cipher requires in bits
         *      @property string mode - mode of cipher
         * } $parts - object split from cipher method string
         */
        $parts = (object) array_combine(
            ['algo', 'size', 'mode'],
            array_map('strtolower', explode('-', $method))
        );
        /**
         * Grab openSSL array by $algo entries
         * Shrink search array based on $method
         * Check if methods array includes $method
         */
        return in_array(strtolower($method), array_filter(
            openssl_get_cipher_methods(),
            function($str) use($parts){
                return strpos($str, $parts->algo) === 0 && count(explode('-', $str)) === count(get_object_vars($parts));
            }
        ));
    }
    /*----------------------------------------------------------*/
    /**
     * getCipherProps
     * @property string OPEN_SSL_METHOD
     * @return array properties for cipher method
     */
    /*----------------------------------------------------------*/
    function getCipherProps(){
        /**
         * Validate open ssl method
         * Check for cipher_length methods
         * Return Assoc Array
         */
        if(gettype(OPEN_SSL_METHOD) === 'string'){
                $iv_len  = function_exists('openssl_cipher_iv_length') ? openssl_cipher_iv_length(OPEN_SSL_METHOD) : null;
            return [
                'key_len' => getOpenSSLKeyLen(),
                'iv_len' => $iv_len,
                'block_size' => !is_null($iv_len) && $iv_len > 0 ? $iv_len : null
            ];
        } else {
            return null;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * getOpenSSLKeyLen
     * @property string OPEN_SSL_METHOD
     * @return int - length value in bytes
     */
    /*----------------------------------------------------------*/
    function getOpenSSLKeyLen(){
        /**
         * Validate method
         */
        if(is_null(OPEN_SSL_METHOD)){
            throw new Error('OPEN_SSL_METHOD is not set; value === null');
        }
        if(function_exists('openssl_cipher_key_length')){
            return openssl_cipher_key_length(OPEN_SSL_METHOD);
        } else {
            /**
             * Calculate key length by extracting numeric value if existant
             */
            $len = intval(
                implode('', array_filter(
                    explode('-', OPEN_SSL_METHOD), 'is_numeric'
                )
            ));
            /**
             * Return values
             */
            if(is_numeric($len)){
                return intval(ceil($len / 8));
            } else {
                throw new Error('Could not evaluate OPEN SSL Key Length in bytes');
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * generateKey - generates random key for encryption
     * @property array OPEN_SSL_PROPS
     * @return string - encryption key in bytes
     */
    /*----------------------------------------------------------*/
    function generateKey(){
        $len = OPEN_SSL_PROPS['key_len'];
        /**
         * Generate random pseudobytes if function exists
         */
        //$key = function_exists('openssl_random_pseudo_bytes') ? openssl_random_pseudo_bytes($len) : null;
        $key = 'hereisasandwhich';
        /**
         * Validate key
         * If failed, generate key based on length
         */
        if(is_null($key)){
            // reset key
            $key = '';
            for($i = 0; $i < $len; $i++){
                // append values (single bite string) to key string
                $key .= chr(random_int(0, 255));
            }
        }
        /**
         * Hash the key and Return
         */
        return substr(hash(HASH_ALGO, $key, true), 0, $len);
    }
    /*----------------------------------------------------------*/
    /**
     * generateInitVector - generate random bytes from cipher method length (in bytes)
     * @param void
     * @return string
     */
    /*----------------------------------------------------------*/
    function generateInitVector(){
        /**
         * Generate iv string
         */
        $len = OPEN_SSL_PROPS['iv_len'];
        $iv  = random_bytes($len);
        /**
         * Hash iv string and return
         */
        return substr(hash(HASH_ALGO, $iv, true), 0, $len);
    }
?>