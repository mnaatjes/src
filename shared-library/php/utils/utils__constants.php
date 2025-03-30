<?php
    /**
     * @property string OPEN_SSL_METHOD - string value of cypher method
     */
    define('OPEN_SSL_METHOD', validateSSLMethod('AES-256-CBC') ? 'AES-256-CBC' : null);
    /**
     * @property string OPEN_SSL_PROPS - properties (length and size values) for key, iv, and block
     */
    define('OPEN_SSL_PROPS', getCipherProps());
    /**
     * @property string HASH_ALGO - hash algorithm to be used
     */
    define('HASH_ALGO', 'sha256');

?>