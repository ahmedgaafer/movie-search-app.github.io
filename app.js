const api = "https://www.omdbapi.com/?i=tt3896198&apikey=742643c8&"

/* Manullal binds */

window.onload = function(){
  $('.ui.dropdown').dropdown();
};

$('.ui.dropdown.plot')
  .dropdown({
    values: [
      {
        name: 'Short',
        value: 'short',
        selected : true
      },
      {
        name     : 'Full',
        value    : 'full', 
      }
    ]
  })
;

$('.ui.dropdown.type')
  .dropdown({
    values: [
      {
        name: 'Movie',
        value: 'movie',
        selected : true
      },
      {
        name     : 'Series',
        value    : 'series', 
      },
      {
        name: 'Episode',
        value: 'episode',
      }
    ]
  })
;

/* params */


const card = document.getElementById('card');
$('#reset').click(() => {
  $('#title').val('');
  $('#year').val('');
  $('.ui.dropdown.plot').dropdown('restore default text');
  $('.ui.dropdown.type').dropdown('restore default text');
  card.classList.add('hidden')
})


$('#search').click(() =>{
  const plot  = $('#plot').dropdown('get value');
  const type  = $('#type').dropdown('get value');
  const title = $('#title').val();
  const year  = $('#year').val();
  

  if((!isNaN(Number(year)) && year > 1950 && title !== "") || (year === "" && title !== "")){
    const url = `${api}t=${title}&y=${year}&plot=${plot}&type=${type}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.Response === "False"){
        alert('Movie Not found!');
      }
      else{
        (data.Poster !== 'N/A')?$('#poster').attr('src', data.Poster):false;
        $('#ttitle').text(data.Title);
        $('#release').text(`Released: ${data.Released}`)
        $('#genre').text(`Genre: ${data.Genre}`);
        $('#pplot').text(`Plot: ${data.Plot}`);
        $('#production').text(`Production: ${data.Production}`);
        $('#runtime').text(`Runtime: ${data.Runtime}`)
        card.classList.remove('hidden')
      }
    })
  }
  else{
    alert("Please enter a valid year after 1950. and a valid movie title")
  }

})