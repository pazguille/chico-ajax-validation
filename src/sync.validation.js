(function (window){

    // Creates a required validation
    var sync = $('#zip_sync')
        .required()
        .and()

        // Creates a custom validation wich will make an ajax call syncr.
        .custom('sync', function (value) {

            // This flag will be returned by custom validation after ajax call finishes.
            var ok;

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

        }, 'Please, enter a valid zip code.');
}(this));