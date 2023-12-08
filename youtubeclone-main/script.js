// ------sidebar----------
const menuIcon=document.querySelector(".menu-icon");
const sidebar=document.querySelector(".sidebar");
const container=document.querySelector(".container");
const loader=document.getElementById('loader');

loader.style.display='block';


menuIcon.onclick=function(){ 
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

// --------Display video---------    
const videoCardContainer = document.querySelector('.list-container');
let api_key = "AIzaSyCXWD9-ETJDoajkWY78EPL0wz0EOFXYqds";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    setTimeout(()=>{
        loader.style.display="none";
        data.items.forEach(item => {
            getChannelIcon(item);
        },1000)
    })
    
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
}
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="vid-list">
        <a href='https://youtube.com/watch?v=${data.id}'>
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail"/></a>

        <div class="flex-div">
            <img src="${data.channelThumbnail}" class="channel-icon"/>
                <div class="vid-info">
                  <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                    <p>15k &bull; views</p>
                </div>
        </div>
    </div>
    `;
}
// search bar
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})
