<?php
    /**
     * @function minimax simple function to implement node
     * @param Node $node
     * @param callable $callback Terminal condition function; Passes up $node->state;
     * @param int $depth; Starts at deepest level and works up
     * @param bool $is_maxing
     * @return mixed Value of node
     */
    function minimax(Node $node, callable $callback, int $depth, bool $is_maxing){
        /**
         * @var mixed $terminal - Result of callback terminal condition function
         */
        $terminal = $callback($node->getState());
    }

?>