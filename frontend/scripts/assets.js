function fetchHelper(id, title, img, content, date_posted, slice=false) {
  postElm.querySelector('ul').id = id
  postElm.querySelector('h1').textContent = title
  postElm.querySelector('img').src = img || ''
  postElm.querySelector('span').textContent = date_posted
  if (slice) {
    postElm.querySelector('p').textContent = content.slice(0, 100)+'...'
  } else {
    postElm.querySelector('p').textContent = content
    let detailBtn = postElm.lastElementChild
    while (true) {
      if (detailBtn.textContent === 'Detail') {
        detailBtn.remove(); // remove Detail button
        break;
      }
      detailBtn = detailBtn.lastElementChild;
    }
    // Delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn btn-danger mr-2'
    deleteBtn.textContent = 'DELETE'
    postElm.firstElementChild.insertAdjacentElement('beforeend',deleteBtn)
    // const deleteHandler = onDelete.bind(this, id)
    // deleteBtn.removeEventListener('click', deleteHandler)
    deleteBtn.addEventListener('click', onDelete.bind(this, id))
    // Update button
    const updateBtn = document.createElement('button')
    updateBtn.className = 'btn btn-warning'
    updateBtn.textContent = 'UPDATE'
    postElm.firstElementChild.insertAdjacentElement('beforeend',updateBtn)
    // const updateHandler = onUpdate.bind(this, id)
    // updateBtn.removeEventListener('click', updateHandler)
    updateBtn.addEventListener('click', onUpdate.bind(this, id))
  }
  postContainer.append(postElm)
  postElm = document.importNode(postCard.content, true)
}

function displayForm() {
  postContainer.innerHTML = `
        <form>
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" class="form-control" type="text" name="title" value="" required>
            <label for="image">Image</label>
            <input id="image" class="form-control" type="text" name="image" value="" accept="image/*" >
            <br>
            <label for="content">content</label>
            <textarea id="content" class="form-control" name="content" rows="8" required></textarea>
            <input class="btn btn-primary mt-1" type="submit" name="save" value="Save">
          </div>
        </form>
  `
  const form = document.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    const title = event.currentTarget.querySelector('#title')
    const image = event.currentTarget.querySelector('#image')
    const content = event.currentTarget.querySelector('#content')

    const data = {
      'title': title.value,
      'image': image.value,
      'content': content.value
    }
    title.value = ''
    image.value = ''
    content.value = ''

    fetchHandler('http://127.0.0.1:8000/api/posts/', 'POST', data)
  })
}
