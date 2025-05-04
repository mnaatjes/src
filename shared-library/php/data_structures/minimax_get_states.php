<?php
    /**
     * Collects states and assigns nodes from a given 2d array
     * @param array $arr 2d array on which to implement minimax
     * @param string $symbol e.g. player symbol (X) in tictactoe
     * @return array Collection of nodes with states set
     */
    function minimax_get_states(array $arr, $symbol='X'){
        /**
         * Validate 2d array
         */
        $states = [];
        /*
        for($y = 0; $y < count($body['grid']); $y++){
            for($x = 0; $x < count($body['grid'][$y]); $x++){
                if(is_null($body[$y][$x])){
                    $next = $body['grid'];
                    $next[$y][$x] = 'O';
                    $move = [
                        'x' => $x,
                        'y' => $y
                    ];
                    $states[] = new Node($next, $move);
                }
            }
        }
        */
        return $states;
    }
?>