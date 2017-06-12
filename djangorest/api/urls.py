from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PostView, DetailsView, TopicView, TopicDetailsView
from .views import UserView, UserDetailsView, CustomObtainAuthToken
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = {
	url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
	url(r'^topics/$', TopicView.as_view(), name="topics"),
    url(r'^topics/(?P<topic_id>[0-9]+)/posts/$', PostView.as_view(), name="posts"),
    url(r'^topics/(?P<pk>[0-9]+)/$', TopicDetailsView.as_view(), name="posts"),
	url(r'^posts/(?P<pk>[0-9]+)/$',
        DetailsView.as_view(), name="details"),
	url(r'^users/$', UserView.as_view(), name="users"),
    url(r'users/(?P<pk>[0-9]+)/$', UserDetailsView.as_view(), name="user_details"),
    url(r'^get-token/', CustomObtainAuthToken.as_view()), # Add this line
}

urlpatterns = format_suffix_patterns(urlpatterns)