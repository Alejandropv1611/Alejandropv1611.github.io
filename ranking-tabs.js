var tabs = document.querySelectorAll(".lboard_tabs ul li");
var today = document.querySelector(".today");
var weekly = document.querySelector(".weekly");
var month = document.querySelector(".month");
var items = document.querySelectorAll(".lboard_item");

tabs.forEach(function(tab){
	tab.addEventListener("click", function(){
		var currenttab = tab.getAttribute("data-li");
		
		tabs.forEach(function(tab){
			tab.classList.remove("active");
		})

		tab.classList.add("active");

		items.forEach(function(item){
			item.style.display = "none";
		})

		if(currenttab == "today"){
			today.style.display = "block";
		}
		else if(currenttab == "weekly"){
			weekly.style.display = "block";
		}
		else{
			month.style.display = "block";
		}

	})
})

