$(function() {
    var name,
        company,
        email,
        score,
        value

    function closeModal() {
        $('.scoreAdd').hide(300);
        $('.scoreAdd__modal__form__name').val('');
        $('.scoreAdd__modal__form__company').val('');
        $('.scoreAdd__modal__form__email').val('');
        $('.scoreAdd__modal__form__score').val('');    
    }

    //open add score modal on "new score" click
    $('.newScore').click(function (e) { 
        e.preventDefault();
        $('.scoreAdd').show(300);
    });

    //Save new score submission to localstorage
    $('.scoreAdd__modal__form__img').click(function (e) { 
        e.preventDefault();

        name = $('.scoreAdd__modal__form__name').val();
        company = $('.scoreAdd__modal__form__company').val();
        email = $('.scoreAdd__modal__form__email').val();
        score = $('.scoreAdd__modal__form__score').val();
        
        value = { 'name': name, 'company': company, 'email': email, 'score': score };
        console.log(value);
        localStorage.setItem(email, JSON.stringify(value));
       
        //Hide new score modal overlay & reset inputs
        closeModal();
        location.reload();
    });

    // close score modal on ESC key
    $(document).keyup(function(e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            closeModal();
        }
    });

    //generate leaderboard from localstorage
    for (var i = 0; i < localStorage.length; i++) {
        // set iteration key name
        var key = localStorage.key(i);
        // use key name to retrieve the corresponding value
        var lsvalue = localStorage.getItem(key);
        // console.log the iteration key and value
        var lsdata = JSON.parse(lsvalue);

        $('.leaderboard').append('<li class="leaderboard__result" data-score=' + lsdata.score + '><div class="leaderboard__result__wrapper"><div class="leaderboard__result__name">' + lsdata.name + '</div> <div class="leaderboard__result__company">' + lsdata.company + '</div> <div class="leaderboard__result__score">' + lsdata.score + '</div></div></li>');
        $(".leaderboard.autosort").each(function(){
            $(this).html($(this).children('li').sort(function(a, b){
                return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;
            }));
        });
    }

    $(".leaderboard.autosort").each(function(){
        $(this).html($(this).children('li').sort(function(a, b){
            return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;
        }));
    });

});