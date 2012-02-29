/*
* returns a value for a url parameter 
*/
function getParam( url, sname )
{
  var params = url.substr(url.indexOf("?")+1);
  var sval = "";
  params = params.split("&");
    // split param and value into individual pieces
    for (var i=0; i<params.length; i++)
       {
         temp = params[i].split("=");
         if ( [temp[0]] == sname ) { sval = temp[1]; }
       }
  return sval;
}


$(function($) {
	
	var app = {
		init: function(config) {
			this.url = config.url;
			this.listItemTemplate = Handlebars.compile(config.listItemTemplate);
			this.pageTemplate = Handlebars.compile(config.pageTemplate);
			this.listContainer = config.listContainer;
			$.mobile.showPageLoadingMsg();
			this.getData();
		},
		
		render: function() {
			this.listContainer.append(this.listItemTemplate(this.posts));
			this.listContainer.listview('refresh');
			$.mobile.hidePageLoadingMsg();
			$('body').append(this.pageTemplate(this.posts));
			$('.post-page').each(function(page) {
				page.page();
			})
		},
		
		getData: function() {
			var self = this;
			$.getJSON(this.url, function(data) {
				console.log('json data retrieved:');
				console.log(data);
				self.posts = $.map(data.query.results.item, function(post, index) {
					var titles = post.title.split(':');
					return {
						index: index,
						maintitle: titles[0],
						subtitle: titles[1],
						link: post.link,
						description: post.description,
						imgsrc: $(post.encoded).find('img').first().attr('src'),
						content: post.encoded,
						tags: post.category 
					};
				});
				console.log('posts array mapped:');
				console.log(self.posts);
				self.render();
			})
		}
	};	
	
	//START APP
	var blog_link = 'http://thissongissick.com/blog/feed/';
	var query = "select * from rss where url='" + blog_link + "'";
	var url = 'http://query.yahooapis.com/v1/public/yql?q='+
		encodeURIComponent(query)+
		'&format=json&callback=?';
	console.log("requesting rss feed: \n" + url);
	var tsis = app.init({
		url: url,
		listItemTemplate: $('#list-item-template').html(),
		pageTemplate: $('#page-template').html(),
		listContainer: $('ul#list')
	});
	
});

/*
$.getJSON(url, function(data) {
	
	$.each(posts, function(index, post) {
		//build homepage list item
		$('#list').append(
			'<li>' + 
				'<img style="float: left; max-width: 80px; max-height: 80px; margin: 5px;" src="'+post.imgsrc+'" />' +
				'<a href=\"#post-'+index+'\">' +
					'<h3 style="white-space: normal !important;">' + post.maintitle + '</h3>' + 
					'<p style="white-space: normal !important;">' + post.subtitle + '</p>' + 
				'</a>' + 
				'<div style="clear: left;"></div>' + 
			'</li>'
		);
		
		//build indiv page
		$('body').append(
		'<div data-role="page" data-theme="b" id="post-'+index+'" class="post-page" data-url="post-'+index+'">' + 
			'<header data-role="header">' +
			    '<a href="#" data-rel="back" data-role="button" data-icon="arrow-l">Back</a>' +
				'<h3 style="white-space: normal !important;">'+post.maintitle+'</h3>' +
			'</header>' + 
			'<div data-role="content" class="post-content">'+
				'<p>'+post.content+'</p>' + 
			'</div>' +
		'</div>'	
		);

		//converting flash coundcloud objects to html5 players
		$('object param[name=src]').each(function(index, object) {
			var src = object.getAttribute('value');
			var decodedsrc = decodeURI(src);
			var url = unescape(getParam(decodedsrc,'url'));
			console.log(url);
			var iframe_string = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="http://w.soundcloud.com/player/?url='+url+'&amp;auto_play=false&amp;show_artwork=false&amp;color=ff7700"></iframe>';
			$(object).parent().replaceWith(iframe_string);
		});
	});

	//strip width formatting for youtube embeds
	$('.post-content embed').attr('width', '').attr('height', '');



	//refresh home page
	$('#list').listview('refresh');
});
*/