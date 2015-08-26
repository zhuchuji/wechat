var wechat = angular.module("wechat", ["ngRoute", "ngAnimate"]);

wechat.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'home.html',
		controller: 'HomeCtrl',
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

wechat.controller("MainCtrl", ['$scope', '$http', function($scope,
	$http){

	$scope.init = function(){
		$scope.loadMain = true;
	}

	$scope.$on("showContent", function(event, msg){
		$scope.loadMain = false;
	})

	$scope.init();
}]);

wechat.controller("HomeCtrl", ['$scope', '$http', '$timeout', function(
	$scope, $http, $timeout){

	$scope.init = function(){
		var mySwiper = new Swiper ('.swiper-container', {
    		direction: 'horizontal',
    		pagination: '.wechat-home-navbar',
    		paginationClickable: true,
    		paginationBulletRender: function(index, className){
    			switch(index){
    				case 0:
    					return '<div class="' + className + 
    						'"><img src="../img/icon/ala.png"></img><p>微信</p></div>';
						break;
					case 1:
						return '<div class="' + className + 
							'"><img src="../img/icon/al9.png"></img><p>通讯录</p></div>';
						break;
					case 2:
						return '<div class="' + className + 
							'"><img src="../img/icon/alc.png"></img><p>发现</p></div>';
						break;
					case 3:
						return '<div class="' + className + 
							'"><img src="../img/icon/ale.png"></img><p>我</p></div>';
						break;
    			}
    		}
    	});
		$http({ url: '../../data/wechat_home.json',
			method: 'GET'
		}).success(function(data, status, headers, config){
			$scope.weixin_list = data.msg['weixin'];
			$scope.contact_list = data.msg['contact'];
			$timeout(function(){
				$scope.$emit("showContent");
			}, 1000);
		}).error(function(data, status, headers, config){

		});  
	}

	$scope.init();

}]);