import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        mode: '1',
        groupSize: 2,
        dif2: 1
    } 

    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var mode = $('#mode');
    var groupSize = $('#groupSize');
    var dif2 = $('#dif2');
    
    var savedOptions = localStorage.options && JSON.parse(localStorage.options);
    var options = Object.create(default_options);

    if (savedOptions && savedOptions.pairs)
        options.pairs = savedOptions.pairs;
    if (savedOptions && savedOptions.difficulty)
        options.difficulty = savedOptions.difficulty;
    if (savedOptions && savedOptions.mode)
        options.mode = savedOptions.mode;
    if (savedOptions && savedOptions.groupSize)
        options.groupSize = savedOptions.groupSize;
    if (savedOptions && savedOptions.dif2)
        options.dif2 = savedOptions.dif2;

    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    mode.val(options.mode);
    groupSize.val(options.groupSize);
    dif2.val(options.dif2);

    pairs.on('change', function (){
        options.pairs = pairs.val();
    });

    difficulty.on('change', function (){
        options.difficulty = difficulty.val();
    });

    mode.on('change', function (){
        options.mode = mode.val();
        refrescarMode();
    });

    groupSize.on('change', function (){
        options.groupSize = parseInt(groupSize.val());
    });

    dif2.on('change', function (){
        options.dif2 = parseInt(dif2.val());
    });

    function refrescarMode(){
        if (mode.val() === '1'){
            $('#opcs-mode1').show();
            $('#opcs-mode2').hide();
        } else {
            $('#opcs-mode1').hide();
            $('#opcs-mode2').show();
        }
    }

    return {
        applyChanges: function(){
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            options.mode = default_options.mode;
            options.groupSize = default_options.groupSize;
            options.dif2 = default_options.dif2;
            mode.val(options.mode);
            groupSize.val(options.groupSize);
            dif2.val(options.dif2);
            refrescarMode();
        }
    }
}();

$('#default').on('click', function(){
    options.defaultValues();
})

$('#apply').on('click', function(){
    options.applyChanges();
    location.assign("../");
});