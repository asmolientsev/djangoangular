from rest_framework.permissions import BasePermission
from .models import Post

class IsOwner(BasePermission):
    """Custom permission class to allow only bucketlist owners to edit them."""

    def has_object_permission(self, request, view, obj):
        """Return True if permission is granted to the bucketlist owner."""
        if isinstance(obj, Post):
            return obj.owner == request.user
        return obj.owner == request.user

class IsStaff(BasePermission):

	def has_object_permission(self, request, view, obj):
		if self.request.method == 'POST':
			return True
		else:
			return request.user.is_staff

class IsChangeOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        if self.request.method == 'GET':
            return True
        else:
            return request.is_authenticate and obj.owner == request.user