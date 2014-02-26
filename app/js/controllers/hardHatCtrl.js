four51.app.controller('HardHatCtrl', function ($scope, $location, Product, ProductDisplayService, Variant, Order, User) {
	$scope.Order = {};
	$scope.Order.LineItems = [];
	$scope.LineItem = {};
	$scope.LineItem.Variant = {};
	$scope.LineItem.Product = {};

	var guid = function() {
		var cache = '?cache=' + (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		return cache;
	}

	ProductDisplayService.getProductAndVariant('HH', null, function(data){
		$scope.LineItem.Product = data.product;
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		$scope.LineItem.Variant.ProductInteropID = $scope.LineItem.Product.InteropID;
		$scope.LineItem.Variant.Specs = {};
		$scope.LineItem.Variant.PreviewUrl += guid();
		angular.forEach($scope.LineItem.Product.Specs, function(item){
			if(!item.CanSetForLineItem)
				$scope.LineItem.Variant.Specs[item.Name] = item;
		});
		$scope.setAddToOrderErrors();
	});

	$scope.save = function() {
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	};

	$scope.change = function() {
		Variant.save($scope.LineItem.Variant, function(data) {
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
			ProductDisplayService.calculateLineTotal($scope.LineItem);
		});
	};

	$scope.calcVariantLineItems = function(){
		$scope.variantLineItemsOrderTotal = $scope.LineItem.LineTotal;
	};

	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}

		Variant.save($scope.LineItem.Variant, function(data){
			$scope.LineItem.Variant = data;
			$scope.Order.LineItems.push($scope.LineItem);
			Order.save($scope.Order,
				function(o){
					$scope.currentOrder = o;
					$scope.user.CurrentOrderID = o.ID;
					User.save($scope.user, function(u) {
						$location.path('/cart');
					});
				},
				function(ex) {
					$scope.addToOrderIndicator = false;
					$scope.addToOrderError = ex.Message;
				}
			);
		});
	}

	$scope.changeOrient = function(step) {
		var index = 0;
		angular.forEach($scope.LineItem.Variant.Specs.Orientation.Options, function(o, i) {
			if (o.Selected) index = i;
			o.Selected = false;
		});
		var stepped = 0;
		if (index == 3 && step == 1)
			stepped = 0;
		else if (index == 0 && step == -1)
			stepped = 3;
		else
			stepped = index + step;

		var option = $scope.LineItem.Variant.Specs.Orientation.Options[stepped];
		option.Selected = true;
		$scope.LineItem.Variant.Specs.Orientation.Value = option.Value;
		$scope.LineItem.Variant.Specs.Orientation.SelectedOptionID = option.ID;
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	};

	$scope.changeColor = function(index) {
		angular.forEach($scope.LineItem.Variant.Specs.Color.Options, function(o, i) {
			if (index == i) {
				$scope.LineItem.Variant.Specs.Color.SelectedOptionID = o.ID
				$scope.LineItem.Variant.Specs.Color.Value = o.Value;
				o.Selected = true;
			}
			else
				o.Selected = false;
		});
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	}
	$scope.$watch('LineItem.Variant.Specs.LogoLeft.Value', function(n,o) {
		if (n === null || n === undefined) return;
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	});
	$scope.$watch('LineItem.Variant.Specs.LogoFront.Value', function(n,o) {
		if (n === null || n === undefined) return;
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	});
	$scope.$watch('LineItem.Variant.Specs.LogoBack.Value', function(n,o) {
		if (n === null || n === undefined) return;
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	});
	$scope.$watch('LineItem.Variant.Specs.LogoRight.Value', function(n,o) {
		if (n === null || n === undefined) return;
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	});
	$scope.$watch('LineItem.Variant.Specs.CustomerName.Value', function(n,o) {
		Variant.save($scope.LineItem.Variant, function(data){
			data.PreviewUrl += guid();
			$scope.LineItem.Variant = data;
		});
	});
});
