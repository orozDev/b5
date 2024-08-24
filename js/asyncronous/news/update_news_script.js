const loadSelectOptions = async (url, select,  name, items = []) => {
    const res = await fetch(url)

    if (res.status === 200) {
        const data = await res.json()
        for (const item of data['results']) {
            const option = document.createElement('option')
            if (items.map(i => i.id).includes(item.id)) option.selected = true
            option.value = item.id
            option.innerText = item.name
            select.appendChild(option)
        }
    } else {
        alert(`Cannot get ${name}`)
    }
}


const launch  = async () => {
    const params = Object.fromEntries(new URLSearchParams(location.search).entries())
    const newsId = params.news_id

    const res = await fetch(`https://news-api.prolabagency.com/api/v1/news/${newsId}/`)

    if (res.status === 200) {
        const news = await res.json()
        console.log(news)

        const categorySelect = document.querySelector('#categorySelect')
        const tagsSelect = document.querySelector('#tagsSelect')


        await loadSelectOptions(
            'https://news-api.prolabagency.com/api/v1/categories/',
            categorySelect,
            'categories',
            news.categories
        )

        await loadSelectOptions(
            'https://news-api.prolabagency.com/api/v1/tags/',
            tagsSelect,
            'tags',
            news.tags
        )

        const createNewsForm = document.forms.createNewsForm

        createNewsForm.name.value = news.name
        createNewsForm.description.value = news.description
        createNewsForm.content.value = news.content
        createNewsForm.is_published.checked = news.is_published

        createNewsForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            const submitButton = document.querySelector(`form[name='createNewsForm'] button[type='submit']`)
            submitButton.innerHTML = '<img src="https://i.gifer.com/ZZ5H.gif" width="20px"/>'

            const token = prompt('Enter token', '4741681abd2cc25d21897d5e3fbc55cf082d46c3')

            const body = new FormData(createNewsForm)

            if (createNewsForm.image.files.length === 0) body.delete('image')

            const res = await fetch(`https://news-api.prolabagency.com/api/v1/news/${news.id}/`, {
                method: 'PATCH',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body,
            })

            if (res.status !== 200) {
                alert('Error')
                console.log(await res.json())
            }
            else alert('News upadted')

            submitButton.innerHTML = 'Create'

        })
    } else {
        alert('News was not found (404)')
    }
}

launch()