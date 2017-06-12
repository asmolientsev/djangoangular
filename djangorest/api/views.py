# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from rest_framework import generics
from .permissions import IsOwner,IsStaff, IsChangeOwner
from .serializers import PostSerializer, UserSerializer, TopicSerializer
from .models import Post, Topic
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated
# from .authentication import WithoutAuthentication
from rest_framework import authentication

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


# Create your views here.
class PostView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    # queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,IsChangeOwner,)

    def perform_create(self, serializer):
        """Save the post data when creating a new Post."""
        serializer.save(owner=self.request.user, topic_id=self.kwargs['topic_id'])

    def get_queryset(self):
        return Post.objects.filter(topic_id=self.kwargs['topic_id'])

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Post.objects.all()
    serializer_class = PostSerializer       
    permission_classes = (IsAuthenticated, IsOwner)

class UserView(generics.ListCreateAPIView):
    """View to list the user queryset."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsStaff,)
    # def get_permissions(self):
    #     # allow non-authenticated user to create via POST
    #     return (AllowAny if self.request.method == 'POST' else IsStaff)

    def perform_create(self, serializer):
        """Save the user data when creating a new Post."""
        serializer.save()


class UserDetailsView(generics.RetrieveAPIView):
    """View to retrieve a user instance."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

class TopicView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    # authentication_classes = (WithoutAuthentication, )
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (IsChangeOwner,)

    def perform_create(self, serializer):
        """Save the post data when creating a new Post."""
        serializer.save()

class TopicDetailsView(generics.RetrieveAPIView):
    """View to retrieve a user instance."""
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (IsAuthenticated,)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})        