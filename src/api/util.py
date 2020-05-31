from .models import Post

def getAllPostes():
    post_list = []
    posts = Post.objects.all()
    if posts:
        for post in posts:
            data = {
                "id":post.id,
                "title":post.title,
                "content":post.content,
                "image":post.image,
                "date_posted":post.date_posted,
                "date_updated":post.date_updated
            }
            post_list.append(data)
    return post_list if posts else None

def postDetailData(post=None):
    post = {
        "id":post.id,
        "title":post.title,
        "content":post.content,
        "image":post.image,
        "date_posted":post.date_posted,
        "date_updated":post.date_updated
    }

    return post
