$(document).ready(function() {
	var xml_url = "feed://thissongissick.com/blog/feed/";
	var url = "http://pipes.yahoo.com/pipes/pipe.run?_id=2FV68p9G3BGVbc7IdLq02Q&_render=json&feedcount=20&feedurl=feed%3A%2F%2Fthissongissick.com%2Fblog%2Ffeed%2F";
	var url2 = "http://www.blastcasta.com/feed-to-json.aspx?feedurl=feed%3A%2F%2Fthissongissick.com%2Fblog%2Ffeed%2F";
	
	$.getJSON(url, function(data) {
		var count = data.count;
		var posts = data.value.items;
		for(i=0; i<count; i++) {
		    /*var soundclouds = $('embed[type="application/x-shockwave-flash"]');
		    soundclouds.each(function(item) {
		        var src = item.attr('src');
		        var params = url.split("?")[1];
		        var url = params.split("&amp;")[0];
		        var embed = 
		            '<iframe width="100%" height="166" scrolling="no" frameborder="no" ' +
		            'src="' + url + '&amp;auto_play=false&amp;show_artwork=true&amp;color=ff7700">' +
		            '</iframe>';
		        item.replaceWith(embed);
		    });*/
		    
		    var full_title = posts[i].title;
		    var titles = full_title.split(":");
		    var maintitle = titles[0];
		    var subtitle = titles[1];
		    var content = posts[i]["content:encoded"];
			$('body').append(
			'<div data-role="page" data-theme="b" id="post-'+i+'" data-url="post-'+i+'">' + 
				'<header data-role="header">' +
				    '<a href="#" data-rel="back" data-role="button" data-icon="arrow-l">Back</a>' +
					'<h3 style="white-space: normal !important;">'+maintitle+'</h3>' +
				'</header>' + 
				'<div data-role="content">'+
					'<p>'+content+'</p>' + 
				'</div>' +
			'</div>'	
			);
			$('#list').append(
				'<li>' + 
					'<img style="float: left; max-width: 80px; max-height: 80px; margin: 5px;" src="'+$(posts[i]["content:encoded"]).find('img').first().attr('src')+'" />' +
					'<a href=\"#post-'+i+'\">' +
						'<h3 style="white-space: normal !important;">' + maintitle + '</h3>' + 
						'<p style="white-space: normal !important;">' + subtitle /*posts[i].description*/ + '</p>' + 
					'</a>' + 
					'<div style="clear: left;"></div>' + 
				'</li>'
			);
		}
		$('#list').listview('refresh');
		$('embed').remove(); //remove flash from mobile site
	});
	
});