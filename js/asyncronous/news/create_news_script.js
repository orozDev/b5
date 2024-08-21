const launch  = async () => {

    const loadSelectOptions = async (url, select,  name) => {
        const res = await fetch(url)

        if (res.status === 200) {
            const data = await res.json()
            for (const item of data['results']) {
                const option = document.createElement('option')
                option.value = item.id
                option.innerText = item.name
                select.appendChild(option)
            }
        } else {
            alert(`Cannot get ${name}`)
        }
    }

    const categorySelect = document.querySelector('#categorySelect')
    const tagsSelect = document.querySelector('#tagsSelect')


    await loadSelectOptions(
        'https://news-api.prolabagency.com/api/v1/categories/',
        categorySelect,
        'categories',
    )

    await loadSelectOptions(
        'https://news-api.prolabagency.com/api/v1/tags/',
        tagsSelect,
        'tags',
    )


    const createNewsForm = document.forms.createNews
    createNewsForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const token = prompt('Enter token', 'bc64dde3eabb532f5e588771de56db8066b2f9d7')

        // const body = new FormData()
        // body.append('name', createNewsForm.name.value)
        // body.append('image', createNewsForm.image.files[0])
        // body.append('description', createNewsForm.description.value)
        // body.append('content', createNewsForm.content.value)
        // body.append('category', createNewsForm.category.value)

        const body = new FormData(createNewsForm)

        const res = await fetch('https://news-api.prolabagency.com/api/v1/news/', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body,
        })

        if (res.status !== 201) {
            alert('Error')
            console.log(await res.json())
        }
        else alert('News created')

    })
}

launch()