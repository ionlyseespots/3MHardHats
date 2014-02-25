four51.app.controller('HardHatCtrl', function ($scope, Product, ProductDisplayService) {
	$scope.LineItem = {};

	ProductDisplayService.getProductAndVariant('HH',null, function(data){
		$scope.LineItem.Product = data.product;
		$scope.LineItem.Variant = data.variant;
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.$broadcast('ProductGetComplete');
		$scope.loadingIndicator = false;
		$scope.setAddToOrderErrors();
	});
});
