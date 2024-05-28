var clientNames = ['Microsoft', 'Google', 'Amazon', 'Facebook', 'Apple', 'IBM', 'Oracle', 'Intel', 'Netflix', 'Tesla'];

var itemsPerPage = 3;
var currentPage = 0;

function fetchAndDisplayLogo(name, index) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/logo?name=' + name,
        headers: { 'X-Api-Key': 'mHS82xq53zKLnqQbCCUr0xbTrS0i6o7vEu17UDRK' },
        contentType: 'application/json',
        success: function (result) {
            if (result.length > 0) {
                var logoUrl = result[0].image;
                var img = $('<img>').attr('src', logoUrl).addClass(index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage ? 'active' : '');
                $('#gallery').append(img);
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function showPage(page) {
    currentPage = page;
    var images = $('#gallery img');
    images.removeClass('active');
    images.each(function (index) {
        if (index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage) {
            $(this).addClass('active');
        }
    });
}

function showPrevImage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

function showNextImage() {
    var totalPages = Math.ceil(clientNames.length / itemsPerPage);
    if (currentPage < totalPages - 1) {
        showPage(currentPage + 1);
    }
}

clientNames.forEach(function (name, index) {
    fetchAndDisplayLogo(name, index);
});

$('.prev').click(showPrevImage);
$('.next').click(showNextImage);

$(document).ready(function () {
    showPage(0);
});