app.controller('myCtrlAll', function ($http, $scope, MyService, $filter, $window, _) {
	MyService.fdata().then(function (data) {
		//-this is where all the data from the database is sent
		$scope.myData = data;



		//-making a new array to parse the myData to the selected item list
		$scope.myData2 = new Array();

		$scope.add = function (x) {
			var index = $scope.myData2.indexOf(x);
			if (index < 0) {
				$scope.myData2.push(x);
			} else $scope.myData2.splice(index, 1);
		};

		//-to show the selected data onto the console
		$scope.printToConsole = function () {
			$scope.child = angular.copy($scope.myData2);
			var myJsonString = JSON.stringify($scope.child);
			console.log(myJsonString);
		};

		///-making a new maintenance list push to repairlist collection on db
		$scope.MTitem = { text: '' }; //this is to get text from input
		$scope.checkContent = function () {
			if ($scope.MTitem.length === 0 || typeof $scope.MTitem === 'undefined') {
				alert("Please enter list name");
			}
		};

		//this scope is to extract all the id of parts
		$scope.getIDs = function () {
			$scope.dataID = new Array();
			//this is to select only the id of the object
			angular.forEach($scope.myData2, function (value, key) {
				$scope.dataID.push(value._id);
			});

			$scope.child = angular.copy($scope.dataID);

			const data2 = JSON.stringify({
				maintenanceModel: $scope.myData2[0].Model,
				maintenanceItem: $scope.MTitem.text,
				parts: $scope.child
			}); //push the text input to the maintenanceItem
			//stringtify the object so the data can be parse through http post

			//console.log(data2);



			///using if to check the text not empty, and data only sent until ok button is click!
			if ($scope.MTitem.text.length === 0 || typeof $scope.MTitem.text === 'undefined') {
				alert("Please enter new list name!");
			} else if (
				window.confirm(
					'Click "OK" to add "' + $scope.MTitem.text + '" to the ' + $scope.myData2[0].Model + ' maintenance list!\n'
				)
			) {
				// They clicked Yes
				//post this data to http?
				//send the data to the url mention >>> go to the index.js file
				$http({
					method: 'POST',
					url: '/api/repairlist',
					data: data2
				})
					.then(function (response) {
						console.log('posted successfully');
						$window.location.href = '/main/' + $scope.myData2[0].Model; // goes to this page after click "ok"
					})
					.catch(function (response) {
						console.error('error in posting');
					});

			} else {
				// They clicked no, nothing will happen.
			};

		};
		// this is used to select which data in the list of maintenance
		$scope.selectData = function (selected) {
			// console.log(selected);
			// console.log(selected.maintenanceItem);

			$scope.modelData = new String;
			$scope.modelData = selected.maintenanceModel


			//getting the title of the maintenance
			$scope.titleData = new String;
			$scope.titleData = selected.maintenanceItem;

			//getting the parts list 
			$scope.newData = new Array();
			$scope.newData = selected.parts;
			// console.log(selected.parts);
		};

		//function to send the filter model list
		//modelfilter is declare on top of the code
		$scope.filterFn = function (maintenance) {
			return maintenance.maintenanceModel == modelfilter;
		};

		//new function **To edit the parts list**
		// only edit the one in the controller not original data
		// $scope.editingData = {};

		// for (var i = 0, length = $scope.myData2.length; i < length; i++) {
		// 	$scope.editingData[$scope.myData2[i]._id] = false;
		// }
		// $scope.modify = function (x2) {
		// 	$scope.editingData[x2._id] = true;
		// };
		// $scope.update = function (x2) {
		// 	$scope.editingData[x2._id] = false;
		// };


		// $scope.gGroups = new Array();
		// var ggroups = _.groupBy($scope.myData, "Group");
		// $scope.gGroups = ggroups;

		//This is used to return the data in a nested Group so it can be display "Group" 
		//as the header. Also this is to avoid any repetiton on the data loop which crash/slow the 
		//search process
		var grouped = _.chain($scope.myData).groupBy("Group").map(function (Parts, Group) {
			// can use ._omit to remove any data u want for eg group but i dont intent to
			//insted clean parts is returning "it" which is the data itself to the parts.
			var cleanParts = _.map(Parts, function (it) {
				return (it);
			});

			return {
				Group: Group,
				Parts: cleanParts
			};
		}).value();
		$scope.gGroups = grouped

		// console.log(grouped);
		// console.log($scope.myData);
		// console.log($scope.myData2);


		//export to excel file
		$scope.downloadReports_xlsx = function () {
			$scope.child = angular.copy($scope.myData2);
			var filename = 'Suggested_spare_' + $scope.myData2[0].Model + '.xls';
			alasql(
				'SELECT DrawingNo,PartName,PartNo,Quantity,Remarks INTO XLSX("' + filename + '",{headers:true}) FROM ?',
				[$scope.child]
			);
		};

		//export maintenance part
		$scope.downloadMainParts_xlsx = function () {
			$scope.child = angular.copy($scope.newData);
			var filename = $scope.titleData + '-' + $scope.modelData + '.xls';
			alasql(
				'SELECT DrawingNo,PartName,PartNo,Quantity,Remarks INTO XLSX("' + filename + '",{headers:true}) FROM ?',
				[$scope.child]
			);
		};

	}); //-end of myService
}); //-end of controller

