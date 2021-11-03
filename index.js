$(function() {
    $("body").css("background-image", "url(backgrounds/" + (Math.floor(Math.random() * 38)+1) + ".png)");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "100% auto");
	var umboard = document.getElementById("umboard");
	
	alert("This is a WIP site. Please come back later.");
	getUMData().then((um) => {
		for(let replay of um[0].values){
			let row = umboard.insertRow();
			
			for(let data in replay){
				let cell = row.insertCell(-1);
				cell.innerHTML = replay[data];
			}
		};
	});
});

async function getDatabase(){
	const SQL = await initSqlJs();
    const fetched = await fetch("truescore.db");
    const buf = await fetched.arrayBuffer();
	const db = new SQL.Database(new Uint8Array(buf));
    return db;
}

async function getUMData(){
	db = await getDatabase();
	return db.exec("SELECT * from um;");
}