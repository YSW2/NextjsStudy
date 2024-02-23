from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        "user.User", on_delete=models.CASCADE, related_name="posts"
    )

    def __str__(self):
        return self.title
