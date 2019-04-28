const acc = document.getElementsByClassName('headerCart');

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener('click', function() {
            const $panel = document.querySelector('.panel');
              $panel.classList.toggle('active');
              
              if ($panel.style.maxHeight){
                $panel.style.maxHeight = null;
              } else {
                $panel.style.maxHeight = $panel.scrollHeight + 'px';
              } 
            });
          }
          


