from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .util import getAllPostes, postDetailData
from django.http import JsonResponse
from .models import Post
import json

######################### GET -- Retreive && POST -- Create && PUT -- update #########################
# Get All Posts Or Create New Post
@csrf_exempt
def postsView(request):
    posts = getAllPostes() # Check util.py
    if request.method == 'POST':
        data = json.loads(request.body)
        new_post = Post.objects.create(title=data.get('title', None),
                                       content=data.get('content', None),
                                       image=data.get('image', None))
        posts = getAllPostes()
        return JsonResponse(posts, safe=False)
    return JsonResponse(posts, safe=False)



# Get One Post Or Update Specific Post
@csrf_exempt
def postDetailView(request, id):
    post = get_object_or_404(Post, id=id)
    data = postDetailData(post) # Check util.py
    if request.method == 'PUT':
        data = json.loads(request.body)
        Post.objects.filter(id=id).update(title=data.get('title', None),
                                          content=data.get('content', None),
                                          image=data.get('image', None))
    return JsonResponse(data, safe=False)

#################################### DELETE -- Delete ####################################
@csrf_exempt
def deletePost(request, id):
    post = get_object_or_404(Post, id=id)
    post.delete()
    return redirect('api:posts')
