function searchMovie(){
    $('.list').html('')

    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '65c90494',
            's': $('.search-input').val()
        },

        success: function(result){
            if(result.Response == 'True'){
                let movies = result.Search

                $.each(movies, function(i, data){
                    $('.list').append(`
                    <div class="card">
                        <img src="`+data.Poster+`" alt="">
                        <div class="details">
                            <h4><p>`+data.Title+`</p></h4>
                            <span class="year">`+data.Year+`</span>
                            <div class="bottom-details">
                                <a href"#" class="detail-link" data-id="`+data.imdbID+`">Lihat Detail</a>
                            </div>
                        </div>
                    </div>
                    `)
                })
                
            }else{
                $('.list').html(`
                    <h1 class="notfound">Not found</h1>
                `)
            }
        }
    })
}

$('.search-button').on('click', function(){
    searchMovie()
})

$('.search-input').on('keyup', function(e){
    if(e.keyCode === 13){
        searchMovie()
    }
})

$('.list').on('click', '.detail-link', function(){
    $('.modal').css('visibility', 'visible')
    $('body').css('overflow', 'hidden')

    $.ajax({
        url : 'https://www.omdbapi.com/',
        dataType : 'json',
        type : 'get',
        data : {
            'apikey' : '65c90494',
            'i' : $(this).data('id')
        },

        success: function(result){
            if(result.Response === "True"){
                $('.modal-card').html(`
                    <div class="table-data">
                        <div class="icon">
                            <i class="fa fa-chevron-left"></i>
                        </div>
                        <table>
                            <tr>
                                <th>Title</th>
                                <td>`+result.Title+`</td>
                            </tr>                    
                            <tr>
                                <th>Year</th>
                                <td>`+result.Year+`</td>
                            </tr>                    
                            <tr>
                                <th>Released</th>
                                <td>`+result.Released+`</td>
                            </tr>                    
                            <tr>
                                <th>Runtime</th>
                                <td>`+result.Runtime+`</td>
                            </tr>                    
                            <tr>
                                <th>Genre</th>
                                <td>`+result.Genre+`</td>
                            </tr>                    
                            <tr>
                                <th>Director</th>
                                <td>`+result.Director+`</td>
                            </tr>                    
                            <tr>
                                <th>Actors</th>
                                <td>`+result.Actors+`</td>
                            </tr>                    
                            <tr>
                                <th>Rating</th>
                                <td>`+result.imdbRating+`</td>
                            </tr>                    
                            <tr>
                                <th>Plot</th>
                                <td>`+result.Plot+`</td>
                            </tr>                    
                        </table>
                    </div>

                    <div class="tabel-image">
                        <img src="`+result.Poster+`" class="w-full">
                    </div>
                `)
            }
        }
    })
})

$('.modal').on('click', '.icon', function(){
    $('.modal').css('visibility', 'hidden')
    $('body').css('overflow', 'auto')
})
