(function (window) {

    function prevent(eve) {
        eve.preventDefault();
    }

    var ok = true,
        ongoing = true,
        submit = false,
        form = $('#async-form').on('submit', function () {
                submit = true;
            })
            .form()
            .on('success', prevent),

        async = $('#zip_async').required().and().custom('async', function (value) {

            if (ongoing) {
                ongoing = false;

                //ZIP CODE: 90040060
                $.ajax({
                    'url': 'https://api.mercadolibre.com/countries/BR/zip_codes/' + value,
                    'dataType': 'json',
                    'type': 'GET',
                    'async': true
                })
                .done(function () {
                    ok = true;
                    async.validate();
                    ongoing = true;

                    if (submit) {
                        form.off('success', prevent);
                        form._el.submit();
                    }

                })
                .error(function () {
                    submit = false;
                    ok = false;
                    setTimeout(function () {
                        form.once('success', prevent);
                        async.validate();
                        ongoing = true;
                    }, 100);

                });
            }

            return ok;

        }, 'Message async.');
}(this));