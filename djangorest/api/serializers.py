from rest_framework import serializers
from models import Post, Topic
from django.contrib.auth.models import User

class PostSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Post
        fields = ('id', 'name', 'owner', 'owner_id', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified', 'owner')

class UserSerializer(serializers.ModelSerializer):
    """A user serializer to aid in authentication and authorization."""

    # posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        """Map this serializer to the default django user model."""
        model = User
        fields = ('id', 'username', 'email', 'password')        
        write_only_fields = ('password',)
        # read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)
 
class TopicSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    # posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Topic
        fields = ('id', 'name', 'date_created')
        read_only_fields = ('date_created',)