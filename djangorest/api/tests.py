# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from models import Post

from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

# Create your tests here.
class ModelTestCase(TestCase):
    """This class defines the test suite for the post model."""
    def setUp(self):
        """Define the test client and other test variable'"""
        user = User.objects.create(username="nerd")
        self.post_name = 'name1'
        self.post = Post(name=self.post_name, owner=user)
        
    def test_model_can_create_a_post(self):
        """test the post model can create apostlist."""
        old_count = Post.objects.count()
        self.post.save()
        new_count = Post.objects.count()
        self.assertNotEqual(old_count, new_count)

class ViewTestCase(TestCase):
    """Test suite for api views."""
    def setUp(self):
        """Define the test client and other test variables."""
        user = User.objects.create(username="nerd")
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        self.post_data = {'name':'Go to Ibiza', 'owner': user.id}
        self.response = self.client.post(
            reverse('create'),
            self.post_data,
            format="json")

    def test_api_can_create_a_post(self):
        """Test the api has post createtion capability"""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED) 

    def test_authorization_is_enforced(self):
        """Test that the api has user authorization."""
        new_client = APIClient()
        response = new_client.get('/posts/', kwargs={'pk': 3}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_api_can_get_a_post(self):
        """Test the api can get a given post"""
        post = Post.objects.get()
        response = self.client.get(
            '/posts/',
            kwargs={'pk':post.id},
            format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, post)

    def test_api_can_update_post(self):
        """Test the api can update a given post."""
        post = Post.objects.get()
        change_post = {'name': 'Something new'}
        response = self.client.put(
            reverse('details', kwargs={'pk': post.id}),
            change_post, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_can_delete_post(self):
        """Test the api can delete a post."""
        post = Post.objects.get()
        response = self.client.delete(
            reverse('details', kwargs={'pk': post.id}),
            format='json',
            follow=True)

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)