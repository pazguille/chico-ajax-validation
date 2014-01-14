(function (window){
    // SYNC
    var sync = $('#zip_sync').required().and().custom('sync', function (value) {
        var ok;

        //ZIP CODE: 90040060
        $.ajax({
            'url': 'https://api.mercadolibre.com/countries/BR/zip_codes/' + value,
            'dataType': 'json',
            'type': 'GET',
            'async': false
        })
        .done(function () {
            ok = true;
        })
        .error(function () {
            ok = false;
        });

        return ok;

    }, 'Message Sync.');
}(this));