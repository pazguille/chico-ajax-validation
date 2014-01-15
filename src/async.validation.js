(function (window) {

    // Defines some flags and globals variables.
    var ok = true,
        ongoing = true,
        submit = false,
        form,
        async;

    function prevent(eve) {
        eve.preventDefault();
    }

    function validateAgain(validate) {
        ok = validate;
        async.validate();
        ongoing = true;
    }

    function customAsync(value) {

        if (ongoing) {
            ongoing = false;

            $.ajax({
                'url': 'https://api.mercadolibre.com/countries/BR/zip_codes/' + value,
                'dataType': 'json',
                'type': 'GET',
                'async': true
            })
            .done(function () {
                validateAgain(true);
                if (submit) {
                    form.off('success', prevent);
                    form._el.submit();
                }
            })
            .error(function () {
                setTimeout(function () {
                    validateAgain(false);
                }, 100);
            });
        }

        return ok;
    }

    form = $('#async-form')
        .on('submit', function () {
            submit = true;
        })
        .form()
            .on('success', prevent);

    async = $('#zip_async')
        .required()
        .and()
        .custom('async', customAsync, 'Please, enter a valid zip code.')
        .on('error', function () {
            submit = false;
        });

}(this));