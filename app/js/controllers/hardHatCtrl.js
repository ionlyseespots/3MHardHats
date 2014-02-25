four51.app.controller('HardHatCtrl', function ($scope, Product, ProductDisplayService, Variant) {
	$scope.LineItem = {};
	$scope.LineItem.Variant = {};
	$scope.LineItem.Product = {};

	ProductDisplayService.getProductAndVariant('HH', null, function(data){
		$scope.LineItem.Product = data.product;

		$scope.LineItem.Variant.ProductInteropID = $scope.LineItem.Product.InteropID;
		$scope.LineItem.Variant.Specs = {};
		angular.forEach($scope.LineItem.Product.Specs, function(item){
			if(!item.CanSetForLineItem)
			{
				$scope.LineItem.Variant.Specs[item.Name] = item;
			}
		});

		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.setAddToOrderErrors();
	});

	$scope.save = function() {
		Variant.save($scope.LineItem.Variant, function(data){
			$scope.LineItem.Variant = data;
		});
	};
});
