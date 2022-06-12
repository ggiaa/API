function getAll(){
    $('.list').html('')

    $.ajax({
        url: 'https://api-football-standings.azharimm.site/leagues',
        type: 'get',
        dataType: 'json',        

        success: function(result){
            if(result.status == true){

                let data = result.data 
                
                $.each(data, function(i, data){
                    $('.list').append(`
                    <div class="card">
                        <div class="tumb">
                            <img src="`+data.logos['light']+`" alt="" width="70%">
                        </div>
                        <div class="details">
                            <h4><p>`+data.name+`</p></h4>
                            <div class="bottom-details">
                                <a href"#" class="detail-link" data-id="`+data.id+`">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `)
                })
            }
        },
        error: function(){
            $('.list').html(`
                <h1>Kata Tidak Ditemukan.</h1>
            `)
        }
    })
}

getAll()



// get seasons list
$('.list').on('click', '.detail-link', function(){

    $('.modal').css('visibility', 'visible');
    $('body').css('overflow', 'hidden')


    var ligaId = $(this).data('id')

    $.ajax({
        url : 'https://api-football-standings.azharimm.site/leagues/' + ligaId + '/seasons',
        type : 'get',
        dataType : 'json',
    
        success: function(result){
            let seasons = result['data']['seasons'] 
            
            $('.modal-card').append(
                $('<div />', {'class' : 'name'}).append(
                    $('<p />', {text : result['data']['desc']})
                    ),
                    
                    $('<div />', {'class' : 'table'}),
                    $('<div />', {'class' : 'close'}).append(`
                        <p>Close</p>
                    `)
                    )        
                    
                    
                $.each(seasons, function(i, data){
                $('.table').append(`
                    <div>
                        <p>`+data.displayName+`</P>
                        <a href"#" class="detail-standings" data-id="`+ ligaId +`" data-season="`+data.year+`">See Detail</a>
                    </div>
                    `)
                })            

        },
        error: function(){}
    })
})


// get standings
$('.modal-card').on('click', '.detail-standings' ,function(){
    $('.modal-standings').css('visibility', 'visible')
    $('body').css('overflow', 'hidden')
    
    $.ajax({
        url : 'https://api-football-standings.azharimm.site/leagues/'+ $(this).data('id') +'/standings',
        type : 'get',
        dataType : 'json',
        data : {
            'season' : $(this).data('season'),
            'sort' : $(this).data('asc'),
        },

        success: function(result){

            $('.modal-card-standings').append(`
                <div class="standing-head">
                    <p class="standing-title">`+result[`data`][`name`]+`</p>
                    <p class="standing-year">`+result[`data`][`seasonDisplay`]+`</p>
                </div>
                <div class="standing-table">
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Team</th>
                            <th>MP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                    </table>
                </div>
                <div class="close-standing-div">
                    <p class="close-standing">Close<p>
                </div>
            `)

            let standings = result['data']['standings']

            $.each(standings, function(i, data){
                $('table').append(`
                    <tr>
                        <td>` + data['stats'][8]['displayValue'] + `</td>
                        <td><img src="` + data['team']['logos'][0]['href'] + `" alt="" width="25"> <span>`+data['team']['displayName']+`</span></td>
                        <td>` + data['stats'][3]['displayValue'] + `</td>
                        <td>` + data['stats'][0]['displayValue'] + `</td>
                        <td>` + data['stats'][1]['displayValue'] + `</td>
                        <td>` + data['stats'][2]['displayValue'] + `</td>
                        <td>` + data['stats'][6]['displayValue'] + `</td>
                        <td>` + data['stats'][4]['displayValue'] + `</td>
                        <td>` + data['stats'][5]['displayValue'] + `</td>
                        <td>` + data['stats'][9]['displayValue'] + `</td>
                    </tr>
                `)
            })
        },
        error: function(){

        }
    })
})

$('.modal-card').on('click', '.close', function(){
    $('.modal').css('visibility', 'hidden');
    $('.modal-card').html('');
    $('body').css('overflow', 'auto')
})

$('.modal-card-standings').on('click', '.close-standing', function(){
    $('.modal-standings').css('visibility', 'hidden');
    $('.modal-card-standings').html('');
})