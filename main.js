

// set this to true to use only javascript, false if will be using backend
var standalone = false;

var facing = 'north';
var posX = 'a';
var posY = '1'
var moves = [
    'north',
    'east',
    'south',
    'west'
]

var letters = [
    'a',
    'b',
    'c',
    'd',
    'e'
]

function place() {
    if(standalone) {
        $('.robot').appendTo(`._${posY} .${posX}`);
        updateFacing();
        $('.place').attr('disabled', true);
        $('.move, .left, .right').attr('disabled', false);
    } else {
        callAPI('place', () => {
            $('.place').attr('disabled', true);
            $('.move, .left, .right').attr('disabled', false);
        })
        callAPI('place', () => {
            $('.place').attr('disabled', true);
            $('.move, .left, .right').attr('disabled', false);
        })
    }
}

function moveLeft() {
    if(standalone) {
        var _i = moves.indexOf(facing);
        facing = _i - 1 < 0 ? moves[moves.length-1] : moves[_i-1];
        updateFacing();
    } else {
        callAPI('moveLeft');
    }
    
}

function moveRight() {
    if(standalone) {
        var _i = moves.indexOf(facing);
        facing = _i + 1 == moves.length ? moves[0] : moves[_i+1];
        updateFacing();
    } else {
        callAPI('moveRight');
    }
}

function moveForward() {
    if(standalone) {
        if(facing == 'north') {
            if(posY < 5) {
                posY++;
            }
        } else if (facing == 'south') {
            if(posY > 1) {
                posY--;
            }
        } else if (facing == 'east') {
            var _i = letters.indexOf(posX)+1
            if(_i < 5) {
                posX = letters[_i];
            }
        } else if (facing == 'west') {
            var _i = letters.indexOf(posX)+1
            if(_i > 1) {
                posX = letters[_i-2];
            }
        }
        $('.robot').appendTo(`._${posY} .${posX}`);
    } else {
        callAPI('moveForward');
    }
}

function updateFacing() {
    $('.robot').removeClass('north').removeClass('east').removeClass('south').removeClass('west');
    $('.robot').addClass(facing);
}

function callAPI(action, callback) {
    $.post('/api.php', {action: action})
    .done(_return => {
        posX = _return.posX;
        posY = _return.posY;
        facing = _return.facing;
        updateFacing();
        $('.robot').appendTo(`._${posY} .${posX}`);
        if(typeof callback != 'undefined') {
            callback();
        }
    });
}

