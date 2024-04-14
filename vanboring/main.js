$(document).ready(function () {

    function sendAjax(action, callback) {
        $.ajax({
            type: 'POST',
            url: 'index.php', // AJAX handler URL
            data: { action: action },
            dataType: 'json',
            success: function (response) {
                callback(response);
            },
            error: function ( jqXHR, textStatus, errorThrown) {
                // console.error('Error in AJAX request');
                console.error(jqXHR);
                console.error(textStatus);
                console.error(errorThrown);
            }
        });
    }
    

    // We bind a click event to the whole document and handle "everything"
    $(document).on('click', function (e) {
        // if there is no data-post attribute we return
        if (!e.target.hasAttribute('data-post')) {
            return;
        }
        // Before we write the stuff we test it with a console.log
        console.log(e.target);
        // We get the value of the data-post attribute
        var action = e.target.getAttribute('data-post');
        console.log(action)
        // We get the value of the data-target attribute
        var targetQuery = e.target.getAttribute('data-target');
        // if there is no target we return
        if (!targetQuery) {
            console.error('Target not found');
            return;
        }
        // We call the sendAjax function with the action and a callback function
        sendAjax(action, function (response) {
            // We get the target element
            var target = $(targetQuery);
            // if there is no target in the DOM we return
            if (!target.length) {
                console.error('Target not found');
                return;
            }
            console.log(target)
            // We write the response to the target element
            console.log(response)
            // if the response is successful we write the content to the target
            if (response.success) {
                target.html(response.content);
            } else {
                // if the response is not successful we write the error to console
                console.error(response.message);
            }
            
        });
    });
    function handleLoadables(index, element) {
        // We get the value of the data-post attribute
        var action = element.getAttribute('data-post');
        // We get the value of the data-target attribute
        var targetQuery = element.getAttribute('data-target');
        // We call the sendAjax function with the action and a callback function
        sendAjax(action, function (response) {
            // We get the target element
            var target = $(targetQuery);
            // if there is no target we return
            if (!target.length) {
                console.error('Target not found');
                return;
            }
            // We write the response to the target element
            target.html(response.content);
            // remove the data-load attribute
            $(element).removeAttr('data-load');
        });
    }
    // on load we search for elements with the data-load attribute
    $('[data-load]').each(handleLoadables);

});
