$(function () {

	$('#load').on('click', loadImage);


	function getUrl(method, params) {
		if (!method) throw new Error('Не указан метод');
		params = params || {};
		params['access_token'] = '9290a921954eb7bd30c71f4235e73640512c93c6a726cbe2aa32aef990246aab26ec71eb776e113e1f8ee';
		return 'https://api.vk.com/method/' + method +'?' + $.param(params);
	}

	function sendRequest(method, params, func) {
		$.ajax ({
			url: getUrl(method, params),
			method: 'GET',
			dataType: 'JSONP',
			success: func
		});
	}

	function loadImage() {
		sendRequest('photos.get', {count: 10, owner_id: 32952099, album_id: 241494853, extended: 1}, function (data) {
			drawImage(data.response);
		});
	}

	function drawImage(image) {
		var html = '';
		var list = $('#img__list');

		for (i=0; i<image.length;i++) {
			var elem = image[i];

			html += '<li><img src="'+elem.src+'"/><div><p>Количество лайков : '+elem.likes.count+'</p><p>Количество комментариев : '+elem.comments.count+'</p><p>Количество репостов : '+elem.reposts.count+'</p></div></li>';
		}

		list.html(html);
	}

});
