function submitForm(){
	var config = {
		apiKey: "AIzaSyBn74jhplvHf_7axtUV4fci5rwTNtypK84",
		authDomain: "bptestsolution.firebaseapp.com",
		databaseURL: "https://bptestsolution.firebaseio.com",
		projectId: "bptestsolution",
		storageBucket: "bptestsolution.appspot.com",
		messagingSenderId: "787429526363"
	};
	  
	firebase.initializeApp(config);
	
	var database = firebase.database();
	var auth = firebase.auth();

	var validEmail = false;
	var validZip = false;
	var regE = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/;
	var regZ = /^\d{5}(?:[-\s]\d{4})?$/;
	var email = document.getElementById("emailIn").value;
	var zip = document.getElementById("zipIn").value.toString();
	
	if(regE.test(email)==true){
		validEmail = true;
		console.log("email is true");
		document.getElementById("emailIn").style.outline = "1px solid #A9A9A9";
		document.getElementById("emailIn").style.backgroundColor = "#FFFFFF";
	}else{
		console.log("email is false");
		document.getElementById("emailIn").style.outline = "1px solid #FF5A5A";
		document.getElementById("emailIn").style.backgroundColor = "#FFD0D0";
	}
	
	if(regZ.test(zip)==true){
		validZip = true;
		console.log("zip is true");
		document.getElementById("zipIn").style.outline = "1px solid #A9A9A9";
		document.getElementById("zipIn").style.backgroundColor = "#FFFFFF";
	}else{
		console.log("zip is false");
		document.getElementById("zipIn").style.outline = "1px solid #FF5A5A";
		document.getElementById("zipIn").style.backgroundColor = "#FFD0D0";
	}
	
	if(validEmail===false || validZip===false){
		console.log("form invalid");
		document.getElementById("message").innerHTML = "Form not submitted. Invalid input";
		document.getElementById("message").style.color = "#FF5A5A";
		setTimeout(function(){
			document.getElementById("message").innerHTML = "Sign up to recieve the latest campaign updates.";
			document.getElementById("message").style.color = "#000000";
		}, 3000);
	}
	else if(validEmail===true && validZip===true){
		console.log("form submitted");
		var payload = [email, zip];
		var ref = database.ref('submissions');
		ref.push(payload);
		document.getElementById("message").innerHTML = "Form submitted. Thank you for your support!";
		document.getElementById("message").style.color = "green";
		setTimeout(function(){
			document.getElementById("message").innerHTML = "Sign up to recieve the latest campaign updates.";
			document.getElementById("message").style.color = "#000000";
		}, 3000);
	}
	
	zip = "";
	email = "";
	document.getElementById("zipIn").value = "";
	document.getElementById("emailIn").value = "";
}