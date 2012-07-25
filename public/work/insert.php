

<?php
//$con = mysql_connect("localhost","root","abc123");
$con = mysql_connect("mysql.chrisbosco.com","boscochr","4030yoshi");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("chrisbosco", $con);

$sql="INSERT INTO project (title, summary, images, url, body, year)
VALUES
('" . $_POST['project_title'] . "','".
$_POST['project_summary']."','". 
$_POST['project_images']."','". 
$_POST['project_url']."','".
str_replace("'", "\'", $_POST['project_body']) . "'," . 
$_POST['project_year'] . ")";


if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "1 record added";

$query = "SELECT id FROM project ORDER BY id DESC LIMIT 1";

  // get project_id
  $result = mysql_query($query, $con);
  
  $proj_id = mysql_result($result, 0, 'id');

for($i = 0; $i < 8; $i++) {
	
	if ($_POST['role_body_' . $i]) {
		$sql2="INSERT INTO role (project_id, type, body)
		VALUES
		(" . $proj_id . ",'" . $_POST['role_type_' . $i] . "','" . $_POST['role_body_' . $i] . "')";
		
		if (!mysql_query($sql2,$con))
		  {
		  die('Error: ' . mysql_error());
		  }
		echo "1 record added";
				
		
	}

}

for($i = 0; $i < 4; $i++) {
  
  if ($_POST['related_title_' . $i]) {
    $sql3="INSERT INTO related (project_id, title, url)
    VALUES
    (" . $proj_id . ",'" . $_POST['related_title_' . $i] . "','" . $_POST['related_url_' . $i] . "')";
    
    if (!mysql_query($sql3,$con))
      {
      die('Error: ' . mysql_error());
      }
    echo "1 record added";
        
    
  }

}

mysql_close($con)
?> 