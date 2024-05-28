      // Lista de nomes de clientes
      var clientNames = ['Microsoft', 'Google', 'Amazon', 'Facebook', 'Apple', 'IBM', 'Oracle', 'Intel', 'Netflix', 'Tesla'];

      // Configurações de paginação
      var itemsPerPage = 3;
      var currentPage = 0;

      // Função para obter e exibir o logo de um cliente
      function fetchAndDisplayLogo(name, index) {
          $.ajax({
              method: 'GET',
              url: 'https://api.api-ninjas.com/v1/logo?name=' + name,
              headers: { 'X-Api-Key': 'mHS82xq53zKLnqQbCCUr0xbTrS0i6o7vEu17UDRK' },
              contentType: 'application/json',
              success: function(result) {
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

      // Função para mostrar a página específica
      function showPage(page) {
          currentPage = page;
          var images = $('#gallery img');
          images.removeClass('active');
          images.each(function(index) {
              if (index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage) {
                  $(this).addClass('active');
              }
          });
      }

      // Função para mostrar a imagem anterior
      function showPrevImage() {
          if (currentPage > 0) {
              showPage(currentPage - 1);
          }
      }

      // Função para mostrar a próxima imagem
      function showNextImage() {
          var totalPages = Math.ceil(clientNames.length / itemsPerPage);
          if (currentPage < totalPages - 1) {
              showPage(currentPage + 1);
          }
      }

      // Itera sobre a lista de nomes de clientes e busca os logos
      clientNames.forEach(function(name, index) {
          fetchAndDisplayLogo(name, index);
      });

      // Eventos de clique para os botões de navegação
      $('.prev').click(showPrevImage);
      $('.next').click(showNextImage);

      // Inicializa a paginação
      $(document).ready(function() {
          showPage(0);
      });