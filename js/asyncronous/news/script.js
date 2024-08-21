// const launch = () => {
//
//     const newsContainer = document.querySelector('#news_container')
//
//     const response = fetch('https://news-api.prolabagency.com/api/v1/news/')
//     response.then((res) => res.json()).then((data) => {
//         for (const news of data.results) {
//             newsContainer.innerHTML += `
//             <div class="col-3">
//                 <div class="card" >
//                     <img src="${news.image}" class="card-img-top" >
//                     <div class="card-body">
//                         <h5 class="card-title">${news.name}</h5>
//                         <p class="card-text">${news.description}</p>
//                         <a href="#" class="btn btn-primary">View</a>
//                     </div>
//                 </div>
//             </div>
//             `
//         }
//     })
// }
//
// launch()


const launch = async () => {

    const newsContainer = document.querySelector('#news_container')
    try {
        const response = await fetch('https://news-api.prolabagency.com/api/v1/news/')
        if (response.status === 200) {
            const data = await response.json()
            for (const news of data['results']) {
                newsContainer.innerHTML += `
            <div class="col-3">
                <div class="card">
                    <img src="${news.image}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${news.name}</h5>
                        <p class="card-text">${news.description}</p>
                        <a href="#" class="btn btn-primary">View</a>
                    </div>
                </div>
            </div>
        `
            }
        } else {
            console.log('Something went wrong!')
            console.log(response)
        }

    } catch (e) {console.log(e)} finally {}

}


launch()