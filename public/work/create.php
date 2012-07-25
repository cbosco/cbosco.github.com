<html>
<body>

<form action="insert.php" method="post">
<div>
Title: <input style="width: 500px;" type="text" name="project_title" />
Year: <input type="text" name="project_year" />
</div>
<div>
URL: <input style="width: 300px;" type="text" name="project_url" />
</div>
<div>
Images: <input style="width: 600px;" type="text" name="project_images" />
</div>
<div>
Summary:
<textarea rows="10" cols="100" name="project_summary">
</textarea>
</div>


Body:
<textarea rows="30" cols="100" name="project_body">
</textarea>

<h2>Roles:</h2>
<?php for($i = 0; $i < 8; $i++) {?>
<div>
<Input type = 'Radio' Name ='role_type_<?php echo  $i ?>' value= '1' checked="checked">
Design

<Input type = 'Radio' Name ='role_type_<?php echo  $i ?>' value= '2'>
Client side dev

<Input type = 'Radio' Name ='role_type_<?php echo  $i ?>' value= '3'>
Server side dev

<textarea cols="100" name="role_body_<?php echo  $i ?>"></textarea>
</div>
<?php  } ?>

<h2>Related Posts:</h2>
<?php for($i = 0; $i < 4; $i++) {?>
<div>
Title: <input style="width: 500px;" type="text" name="related_title_<?php echo $i ?>" />
</div>
<div>
Url: <input style="width: 500px;" type="text" name="related_url_<?php echo $i ?>" />
</div><br />
<?php  } ?>

<input type="submit" />
</form>

</body>
</html>