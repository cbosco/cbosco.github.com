<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en-US" dir="ltr" class="ie6 no-js"> <![endif]-->
<!--[if IE 7 ]> <html lang="en-US" dir="ltr" class="ie7 no-js"> <![endif]-->
<!--[if IE 8 ]> <html lang="en-US" dir="ltr" class="ie8 no-js"> <![endif]-->
<!--[if !(IE)]><!--> <html lang="en-US" dir="ltr" class="no-js"> <!--<![endif]-->

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <!-- Mobile viewport optimized: j.mp/bplateviewport -->
  <meta name="viewport" content="width=device-width; initial-scale=1.0">

  <title>Sample Work - Chris Bosco - Web App Development &amp; Design</title>
  <meta name="author" content="Chris Bosco">
  <meta name="description" content="Sample development and design work of Chris Bosco, front-end developer.  Professional and Experimental.">
  <meta name="keywords" content="chris bosco, chrisbosco, cbsides, cbosco, web, web app, designer, developer, portfolio, css, javascript, html, html5, user interface, ui, user experience, ux, experience design, interaction design">
  <meta name="copyright" content="copyright 2007-20011 chrisbosco.com">  
  
  <link rel="stylesheet" href="../css/base.css" media="screen" />
  <link rel="stylesheet" href="../css/default.css" media="screen" />
  <link rel="stylesheet" href="../css/desktop.css" media="screen and (min-device-width:1024px)" />
  

 
  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->

  <script src="../javascript/lib/modernizr-1.5.min.js"></script>
  <script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-4850138-1']);
    _gaq.push(['_trackPageview']);
  
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  
  </script>
  
</head>

<?php include '_dbconn.php'; ?>
<?php include '_model.php'; ?>
<body class="work">
  <div id="page" class="constrain">
    <header>
        <h1><a href="/">Chris Bosco</a><span>Work</span></h1>
    </header>
    <aside class="contact">
        <a class="contact" href="mailto:contact@chrisbosco.com">
          contact@chrisbosco.com
        </a>
    </aside>
    <div id="tray">
      <nav>
      <?php foreach ($projects as $project) { ?>
        <a 
          href="#/explore/<?php echo $project['title-url']; ?>" 
          title="<?php echo $project['title']; ?>"
          data-summary="<?php echo $project['summary']; ?>" 
          data-year="<?php echo $project['year']; ?>"
          <?php 
            $roles = '';
            if (count($project['roles']['design']) > 0) {
              $roles .= ",Design";
            }
            if (count($project['roles']['front-end']) > 0) {
          	  $roles .= ",Client-side development";
            }
            if (count($project['roles']['back-end']) > 0) {
          	  $roles .= ",Server-side development";
            } 
            ?>
          data-roles="<?php echo $roles; ?>"
        >
          <img src="../images/work/<?php echo $project['thumbnail-img']; ?>" />
        </a>
      <?php } ?>
      <a class="random" title="Random Project" data-roles="" data-year="" data-summary="">
        <img src="../images/work/random-box.png" />
      </a>
    </nav>

  </div>
  <footer>
    <small>
      &copy; 2007-2011 <a href="mailto:contact@chrisbosco.com">Chris Bosco</a>
    </small>
  </footer>

<div id="slide-viewport">  
<div id="strip">
<a class="prev strip-nav">&laquo;</a>

<?php foreach ($projects as $project) { ?>
<div class="slide" id="<?php echo $project['title-url']; ?>">
    <div class="detail">

        <h2>
            <?php echo $project['year']; ?> |
          <span class="title"> 
            <?php echo $project['title']; ?>
          </span>
          <?php if ($project['url']) { ?>
            | <em><a title="View the <?php echo $project['title']; ?> site" href="<?php echo $project['url'] ?>">visit &rarr;</a></em>    
          <?php } ?>
        </h2>
        <div class="media column">
          <div class="media-showcase">
            <ul>
              <?php foreach ($project['images'] as $image) { ?>
              <li>
                <img src="../images/work/<?php echo $image; ?>" />
              </li>
              <?php } ?>
            </ul>
          </div>
            <ul class="roles">
              
              <?php if (count($project['roles']['design']) > 0) { ?>
                <li class="has-role design role">
                  <h3>Design</h3>
                  <ul>
                    <?php foreach ($project['roles']['design'] as $role) { ?>
                      <li><?php echo $role; ?></li>
                    <?php } ?>
                  </ul>
                </li>
              <?php } else { ?>
                <li class="design role"></li>
              <?php } ?>
              
              <?php if (count($project['roles']['front-end']) > 0) { ?>
                <li class="has-role client-side role">  
                  <h3>Client-side development</h3>
                  <ul>
                    <?php foreach ($project['roles']['front-end'] as $role) { ?>
                      <li><?php echo $role; ?></li>
                    <?php } ?>
                  </ul>
                </li>
              <?php } else { ?>
                <li class="client-side role"></li>
              <?php } ?>
              
              <?php if (count($project['roles']['back-end']) > 0) { ?>
                <li class="has-role server-side role">  
                  <h3>Server-side development</h3>
                  <ul>
                    <?php foreach ($project['roles']['back-end'] as $role) { ?>
                      <li><?php echo $role; ?></li>
                    <?php } ?>
                  </ul>
                </li>
              <?php } else { ?>
                <li class="server-side role"></li>
              <?php } ?>
		              
		          <?php if (count($project['related_posts']) > 0) { ?>
		            <li class="related-posts role">
			            <h3>
			                Related Blog Posts
			            </h3>
			            <ul>
			              <?php foreach ($project['related_posts'] as $related_post) { ?>
			                <li>
			                   <a href="<?php echo $related_post['url'] ?>">
			                    <?php echo $related_post['title']; ?>
		                     </a>
			                </li>
			              <?php } ?>
			            </ul>
		            </li>
		          <?php } ?>
          
            </ul>
        </div>

        <div class="narrative column">
          <p class="summary">
            <?php echo $project['summary']; ?>
          </p>
          <?php echo $project['body']; ?>
          
          <?php if ($project['url']) { ?>
            <p>
              <a href="<?php echo $project['url'] ?>">View <?php echo $project['title'] ?> &rarr;</a>
            </p>    
          <?php } ?>
                    
        </div>
        <a class="access-top" href="#top">Back to top</a>
    </div>
</div>
<!-- end slide  -->
<?php } ?>

<a class="next strip-nav">&raquo;</a>
</div><!-- end #strip -->
</div><!-- end #slide-viewport-->

  </div>
  <script>
    var cb = {};
  </script>
  
  <!-- Grab Google CDN's jQuery. fall back to local if necessary -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
  <script>!window.jQuery && document.write('<script src="../javascript/lib/jquery-1.4.4.min.js"><\/script>')</script>
  <script src="../javascript/lib/jquery.ba-bbq.min.js"></script>
  <script src="../javascript/lib/jquery.easing.1.3.js"></script>  
  
  <script src="../javascript/media.js"></script>
  <script src="../javascript/route.js"></script>
  <script src="../javascript/strip.js"></script>
  <script src="../javascript/tray.js"></script>
  <script src="../javascript/explore.js"></script>

  
  <!--[if lt IE 7 ]>
    <script src="../javascript/lib/dd_belatedpng.js"></script>
    <script>DD_belatedPNG.fix('#logo a');</script>
  <![endif]-->
  
</body>

</html>