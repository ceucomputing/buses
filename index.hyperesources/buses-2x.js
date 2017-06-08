
var model = {
	readMode: true,
	readAddress: 0,
	writeData: [ true, true, true, true, true, true, true, true ],
	writeAddress: 0
};

var addressXY = [
	[419, 343],		// At address 0
	[419, 363],		// At address 1
	[419, 384],		// At address 2
	[419, 404],		// At address 3
	[419, 425],		// At address 4
	[419, 445],		// At address 5
	[419, 467],		// At address 6
	[419, 487],		// At address 7
	[601, 343],		// At address 8
	[601, 363],		// At address 9
	[601, 384],		// At address 10
	[601, 404],		// At address 11
	[601, 425],		// At address 12
	[601, 445],		// At address 13
	[601, 467],		// At address 14
	[601, 487],		// At address 15
	[504, 280]		// At entry/exit
];

var dataXY = [
	[458, 343],		// At address 0
	[458, 363],		// At address 1
	[458, 384],		// At address 2
	[458, 404],		// At address 3
	[458, 425],		// At address 4
	[458, 445],		// At address 5
	[458, 467],		// At address 6
	[458, 487],		// At address 7
	[640, 343],		// At address 8
	[640, 363],		// At address 9
	[640, 384],		// At address 10
	[640, 404],		// At address 11
	[640, 425],		// At address 12
	[640, 445],		// At address 13
	[640, 467],		// At address 14
	[640, 487],		// At address 15
	[543, 280]		// At entry/exit
];

var hypeDocument = null;

var helpVisible = false;

var toByte = function(data) {
	var result = '';
	for (var i = 0; i < 8; ++i) {
		result += (data[i] ? '1' : '0') + ' ';
	}
	return result.slice(0, -1);
}

var randomByte = function() {
	var result = '';
	for (var i = 0; i < 8; ++i) {
		result += (Math.random() < 0.5 ? '1' : '0') + ' ';
	}
	return result.slice(0, -1);
}

var ready = function(doc) {
	hypeDocument = doc;

	$('#write-form').hide();

	$('#mode').on('change', function() {
		model.readMode = !model.readMode;
		$('#read-form').toggle();
		$('#write-form').toggle();
	});

	$('#read-address').on('change', function() {
		model.readAddress = parseInt(this.value);
	});

	$('#write-address').on('change', function() {
		model.writeAddress = parseInt(this.value);
	});

	var i;

	for (i = 0; i < 8; ++i) {
		$('#write-data-' + i).on('change', function() {
			var index = parseInt(this.id.slice(-1));
			model.writeData[index] = !model.writeData[index];
		});
	}

	var digits = '0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1'
	for (i = 0; i < 8; ++i) {
		hypeDocument.getElementById('memory-' + i).innerHTML = digits.slice(i * 2, i * 2 + 15);
		hypeDocument.getElementById('memory-' + (i + 8)).innerHTML = digits.slice(digits.length - i * 2 - 15, digits.length - i * 2);
	}
};

var move = function(id, XY, address, duration) {
	var element = hypeDocument.getElementById(id);
	var targetXY = XY[address];
	hypeDocument.setElementProperty(element, 'left', targetXY[0], duration);
	hypeDocument.setElementProperty(element, 'top', targetXY[1], duration);
}

var disable = function() {
	$('select').prop('disabled', true);
};

var enable = function() {
	$('select').prop('disabled', false);
};

var read = function() {
	hypeDocument.getElementById('address-down-text').innerHTML = model.readAddress;
	hypeDocument.getElementById('address-box-text').innerHTML = model.readAddress;
	hypeDocument.getElementById('data-box-text').innerHTML = hypeDocument.getElementById('memory-' + model.readAddress).innerHTML;
	hypeDocument.getElementById('data-up-text').innerHTML = hypeDocument.getElementById('memory-' + model.readAddress).innerHTML;
	hypeDocument.getElementById('simulator-read-1-address').innerHTML = model.readAddress;
	hypeDocument.getElementById('simulator-read-2-data').innerHTML = hypeDocument.getElementById('memory-' + model.readAddress).innerHTML;
};

var write = function() {
	hypeDocument.getElementById('address-down-text').innerHTML = model.writeAddress;
	hypeDocument.getElementById('address-box-text').innerHTML = model.writeAddress;
	hypeDocument.getElementById('data-down-text').innerHTML = toByte(model.writeData);
	hypeDocument.getElementById('data-box-text').innerHTML = toByte(model.writeData);
	hypeDocument.getElementById('simulator-write-1-address').innerHTML = model.writeAddress;
	hypeDocument.getElementById('simulator-write-1-data').innerHTML = toByte(model.writeData);
};

var completeWrite = function() {
	hypeDocument.getElementById('memory-' + model.writeAddress).innerHTML = toByte(model.writeData);
}

var send = function() {
	if (model.readMode) {
		read();
		hypeDocument.startTimelineNamed('Read', hypeDocument.kDirectionForward);
	} else {
		write();
		hypeDocument.startTimelineNamed('Write', hypeDocument.kDirectionForward);
	}
};
