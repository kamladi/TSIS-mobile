/*
TODO:
	- add capability to convert all flash-based soundcloud embeds to
		SoundCloud's new HTML5 audio player
*/
$(document).ready(function() {
	var original_link = 'http://thissongissick.com/blog/feed/';
	var yql_link = "http://query.yahooapis.com/v1/public/yql"+
		"?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fthissongissick.com%2Fblog%2Ffeed%2F'"+
		"&format=json&diagnostics=true&callback=jsonCallback";
	console.log("requesting rss feed: \n" + yql_link);
	$.ajax({
		url: yql_link,
		success: function() {
			console.log('data successfully retrieved');
		}
	});
	
	function jsonCallback(data) {
		console.log('hello');
		var count = data.query.count;
		$(data.query.results.item).each(function(index) {
			var title = this.title; 
				//console.log('title: '+title);
				var titles = title.split(":");
			    var maintitle = titles[0];
			    var subtitle = titles[1];
			var link = this.link; 
				//console.log('link: '+link);
			var description = this.description; 
				//console.log('description: '+description);
			var content = this.encoded;
			
			//build homepage listview
			$('#list').append(
				'<li>' + 
					//'<img style="float: left; max-width: 80px; max-height: 80px; margin: 5px;" src="'+$(content).find('img').first().attr('src')+'" />' +
					'<a href=\"#post-'+index+'\">' +
						'<h3 style="white-space: normal !important;">' + maintitle + '</h3>' + 
						'<p style="white-space: normal !important;">' + subtitle + '</p>' + 
					'</a>' + 
					'<div style="clear: left;"></div>' + 
				'</li>'
			);
			
			//build indiv page
			$('body').append(
			'<div data-role="page" data-theme="b" id="post-'+index+'" data-url="post-'+index+'">' + 
				'<header data-role="header">' +
				    '<a href="#" data-rel="back" data-role="button" data-icon="arrow-l">Back</a>' +
					'<h3 style="white-space: normal !important;">'+maintitle+'</h3>' +
				'</header>' + 
				'<div data-role="content">'+
					'<p>'+content+'</p>' + 
				'</div>' +
			'</div>'	
			);
		});
		
		//refresh homepage
		$('#home').page();
	}
});