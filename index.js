$(function() {
    $("body").css("background-image", "url(backgrounds/" + (Math.floor(Math.random() * 38)+1) + ".png)");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "100% auto");
	
	const db = getDatabase();
    //const contents = db.exec("SELECT * FROM my_table");
});

async function getDatabase(){
	const SQL = await initSqlJs();
    const fetched = await fetch("truescore.db");
    const buf = await fetched.arrayBuffer();
    return new SQL.Database(new Uint8Array(buf));
}