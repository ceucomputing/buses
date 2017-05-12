
var model = {
	readMode: true,
	readAddress: 0,
	writeData: [ true, true, true, true, true, true, true, true ],
	writeAddress: 0
};

var addressXY = [
	[289, 242],		// At address 0
	[289, 257],		// At address 1
	[289, 273],		// At address 2
	[289, 288],		// At address 3
	[289, 304],		// At address 4
	[289, 319],		// At address 5
	[289, 335],		// At address 6
	[289, 350],		// At address 7
	[425, 242],		// At address 8
	[425, 257],		// At address 9
	[425, 273],		// At address 10
	[425, 288],		// At address 11
	[425, 304],		// At address 12
	[425, 319],		// At address 13
	[425, 335],		// At address 14
	[425, 350],		// At address 15
	[355, 196]		// At entry/exit
];

var dataXY = [
	[258, 242],		// At address 0
	[258, 257],		// At address 1
	[258, 273],		// At address 2
	[258, 288],		// At address 3
	[258, 304],		// At address 4
	[258, 319],		// At address 5
	[258, 335],		// At address 6
	[258, 350],		// At address 7
	[395, 242],		// At address 8
	[395, 257],		// At address 9
	[395, 273],		// At address 10
	[395, 288],		// At address 11
	[395, 304],		// At address 12
	[395, 319],		// At address 13
	[395, 335],		// At address 14
	[395, 350],		// At address 15
	[321, 196]		// At entry/exit
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

	for (i = 0; i < 16; ++i) {
		hypeDocument.getElementById('memory-' + i).innerHTML = '0 0 0 0 0 0 0 0';
	}
};

var move = function(id, XY, address, duration) {
	var element = hypeDocument.getElementById(id);
	var targetXY = XY[address];
	hypeDocument.setElementProperty(element, 'left', 140 + targetXY[0], duration);
	hypeDocument.setElementProperty(element, 'top', 330 + targetXY[1], duration);
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
