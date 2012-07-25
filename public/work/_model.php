<?php

$db = new DbConn();

$projects = array();
$i = 0;


$project_result = $db->get_all_projects();

while ($project_row = mysql_fetch_array($project_result)) {
	$projects[$i] = array(
    'title' =>  $project_row['title'],
    'title-url'   =>  strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $project_row['title']), '-')),
	  'year'  =>  $project_row['year'],
	  'summary'  =>  $project_row['summary'],
	  'body'  =>  $project_row['body'],
	  'url'   =>  $project_row['url']	  
	);
	
	// build images
	$images = explode(',', $project_row['images']);
	$projects[$i]['thumbnail-img'] = array_shift($images);
	$projects[$i]['images'] = $images;
	
	// related posts
	$related_post_result = $db->get_related_posts($project_row['id']);
	$projects[$i]['related_posts'] = array();
	while ($related_post_row = mysql_fetch_array($related_post_result)) {
		array_push($projects[$i]['related_posts'], $related_post_row); 
	}
	
	// roles
	$role_result = $db->get_roles($project_row['id']);
  $projects[$i]['roles'] = array(
    'design'  =>  array(),
    'front-end' =>  array(),
    'back-end'  =>  array()
  );
  while ($role_row = mysql_fetch_array($role_result)) {
  	switch($role_row['type']) {
  		case '3': // back end
  			array_push($projects[$i]['roles']['back-end'], $role_row['body']);
        break;
  		case '2': // front end
  			array_push($projects[$i]['roles']['front-end'], $role_row['body']);
  			break;
  		case '1': // design
  		default:
  	   array_push($projects[$i]['roles']['design'], $role_row['body']);
  	   break;		
  	}
  }
  
	$i++;
	
}

?> 