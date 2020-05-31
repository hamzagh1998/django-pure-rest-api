// Templates
const postCard = document.getElementById('post')
const createTemp = document.getElementById('create')

const postContainer = document.querySelector('.post-container')
const fetchBtn = document.getElementById('fetch-btn')
const CreateNewPost = document.getElementById('create-new-post')
let postElm = document.importNode(postCard.content, true)
let newPostElm = document.importNode(postCard.content, true)

function onDelete(id) {
  fetchHandler(`http://127.0.0.1:8000/api/posts/delete/${id}/`, 'DELETE')
    .then(fetchPosts())
  }

function onUpdate(id) {
    fetchHandler(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then(data =>
        postContainer.innerHTML = `
        <form>
        <div class="form-group">
        <label for="title">Title</label>
        <input id="title" class="form-control" type="text" name="title" value=${data.title} required>
        <label for="image">Image URL</label>
        <input id="image" class="form-control" type="text" name="image" value=${data.image} accept="image/*" >
        <br>
        <label for="content">content</label>
        <textarea id="content" class="form-control" name="content" rows="8" required>${data.content}</textarea>
        <input class="btn btn-primary mt-1" type="submit" name="save" value="Save">
        </div>
        </form>
        `
      ).then(() => {
        const form = document.querySelector('form')
        form.addEventListener('submit', event => {
          event.preventDefault()
          const title = form.querySelector('#title')
          const image = form.querySelector('#image')
          const content = form.querySelector('#content')

          const data = {
            'title': title.value,
            'image': image.value,
            'content': content.value
          }
          fetchHandler(`http://127.0.0.1:8000/api/posts/${id}/`, 'PUT', data)
            .then(fetchPosts())
          })
        })
      }
// ====================================== GET && DELETE ======================================//

// Fetch
function fetchHandler(url, method, data) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {'Content-Type':'application/json',
              'X-CSRFToken':csrftoken}
  }).then(response => response.json()).catch(error => alert(`Request failed: ${error.message}`))
}

// Display all Pots
async function fetchPosts() {
  try {
    const postList = await fetchHandler('http://127.0.0.1:8000/api/posts/', 'GET')
    postContainer.innerHTML = ''
    postList.forEach(post => fetchHelper(post.id, post.title, post.image, post.content, post.date_posted, slice=true));
  } catch (e) {
    alert('Ther is no post at this moment, please reload this page!')
  }
}


// Display one post
postContainer.addEventListener('click', event => {
  if (event.target.textContent === 'Detail') {
    postContainer.innerHTML = ''
    const postId = event.target.closest('ul').id // Post id
    fetchHandler(`http://127.0.0.1:8000/api/posts/${postId}/`, 'GET') // Fetch data
      .then(data => fetchHelper(data.id, data.title, data.image, data.content, data.date_posted))
  } else if (event.target.textContent === 'Update') {

  } else if (event.target.tagName === 'A'){
      fetchPosts()
  }
})
fetchBtn.removeEventListener('click', fetchPosts)
fetchBtn.addEventListener('click', fetchPosts)
CreateNewPost.addEventListener('click', displayForm)
