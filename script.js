(function() {

	var candidateID = "5b443a21-0175-4832-8421-b4f15f6d0f23";

	function animalGetRequest(url) {
		return new Promise(function(resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', url + '?candidateID=' + candidateID, true);
			request.onerror = reject;
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			request.onreadystatechange = function () {
				if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
					resolve(JSON.parse(request.responseText));
				} else {

				}
			};
			request.send();	
		});
		
	};

	animalGetRequest('https://animalrestapi.azurewebsites.net/Animal/List').then(function(result) {
		console.log(result);
		var animals = result.list;
	      for (var i = 0; i < animals.length; i++) {
	      	var appendMe = document.createElement("div");
	      	appendMe.classList.add("animal");
	      	appendMe.dataset.id = animals[i].id;
	      	appendMe.addEventListener("click", getAnimalInfo, false);
	      	appendMe.innerHTML = "<div class=\"animal-name\">" + animals[i].commonName + "</div><div class=\"more-info\"></div>";

	    		document.getElementsByClassName("animals-container")[0].append(appendMe);
	      } 
	});

	function getAnimalInfo() {
		console.log(this.dataset.id);
		var url = 'https://animalrestapi.azurewebsites.net/Animal/Id/' + this.dataset.id;
		animalGetRequest(url).then(function(result) {
			document.getElementsByClassName("animal-image")[0].innerHTML = "<img src=\"" + result.animal.imageURL + "\">"; 

			var appendMe = "<h3>" + result.animal.commonName + "</h3>";
			appendMe += "<p><strong>Family:</strong> " + result.animal.family + "</p>";
			appendMe += "<p><strong>Scientific Name:</strong> " + result.animal.scientificName + "</p>";

			if (!(result.animal.id < 4)) {
				appendMe += "<form class=\"remove-animal\" action=\"http://animalrestapi.azurewebsites.net/Animal/Delete?candidateID=5b443a21-0175-4832-8421-b4f15f6d0f23\" method=\"post\">";
				appendMe += "<input name=\"id\" style=\"display:none;\" value=\"" + result.animal.id + "\">"; 
				appendMe += "<button type=\"submit\" class=\"btn btn-default\">Delete Animal</button>";
				appendMe += "</form>";
			}
			
			document.getElementsByClassName("animal-text")[0].innerHTML = appendMe;

		});
	};
	

})();
