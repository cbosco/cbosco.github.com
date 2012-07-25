<?php
class DbConn{
    private $cred_local = array("localhost","root","abc123");
    private $cred_prod = array("mysql.chrisbosco.com","boscochr","4030yoshi");
	
    private $con;
    private function get_result($sql) {
    	$result = mysql_query($sql,$this->con);
      if (!$result) {
        die('Error: ' . mysql_error());
        return null;
      }
      return $result;    	
    }
    
    public function __construct(){
    	$cred = $this->cred_local;
			$this->con = mysql_connect($cred[0], $cred[1], $cred[2]);
			if (!$this->con)
			  {
  			  die('Could not connect: ' . mysql_error());
			  }
			  mysql_select_db("chrisbosco", $this->con);  
    }
    public function __destruct(){
        mysql_close($this->con);
        unset($this->con);
    }
    
    public function get_all_projects() {
		  $sql = "SELECT * FROM project ORDER BY year";
		  return $this->get_result($sql);
		}
		public function get_related_posts($project_id) {
			$sql = "SELECT * FROM related WHERE project_id='" . $project_id . "'";
			return $this->get_result($sql);
		}
    public function get_roles($project_id) {
      $sql = "SELECT * FROM role WHERE project_id='" . $project_id . "'";
      return $this->get_result($sql);
    }		
}


?> 