var app = angular.module("weatherapp", []);
app.factory('weatherservice', [ '$http', function($http) {
    var getForecastForCity = function(nameofcity) {
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
        return $http.get(url + nameofcity);    
    };
    
    return {
        getForecastForCity: getForecastForCity
    };
}]);
app.controller('citycontroller', [ '$scope', 'weatherservice', function($scope, weatherservice) {
    $scope.cities = [{ name: "London" }, { name: "New York"}, { name: "Abu Dhabi"} , { name: "Kathmandu"}, { name: "Rome"}, {name:"Paris"}];
    $scope.newCityName = "Amsterdam, Antwerp, Brussels, Berlin, Moscow";
    
    $scope.addCity = function(name) {
        var nameContainsMultipleCities = name.indexOf(',') > 0;
        if(nameContainsMultipleCities) {
            name.split(',').forEach(function(n) {
                $scope.cities.push({ name: n, forecast: null });
            })
        } else {        
            var city = { name: name, forecast: null };
            $scope.cities.push(city);   
        }
        $scope.updateCityForecast();
    };
    
    $scope.updateCityForecast = function() {
        var citiesWithoutForecast = $scope.cities.filter(function(item) { return !item.forecast; });
        citiesWithoutForecast.forEach(function(city) {
                weatherservice.getForecastForCity(city.name).success(function(data) {
                    city.forecast = data;
                });
        });
    };
    $scope.refreshAll = function() {
        $scope.cities.forEach(function(item) { item.forecast = false; });
        $scope.updateCityForecast();
    };
}]);
    
