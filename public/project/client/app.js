/**
 * Created by akash on 2/23/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup",['ngRoute','ui.bootstrap','angularSpinner','ui.sortable','ui.grid', 'ui.grid.pagination','siyfion.sfTypeahead','djds4rce.angular-socialshare']).run(function($FB){
        $FB.init('1077257479013987');
    });

})();
