

const img = document.querySelector('img')
fetch('https://api.giphy.com/v1/gifs/translate?api_key=fY3qzxOJE2mP6rWv4JMTa6wVCXAntCdF&s=jordanpeterson', {mode:'cors'})
.then(function(response) {
  // Successful response :)
  return response.json()
}).then((response)=>{
    console.log(response)
    img.src = response.data.images.original.url;
    return response
})
.catch(function(err) {
  // Error :(
  console.log(err)
});
