from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


class PostDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "title", "content", "author_name", "created_at"]

    def get_author_name(self, obj):
        return obj.author.userName


class PostListSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "title", "author_name", "created_at"]

    def get_author_name(self, obj):
        return obj.author.userName


class PostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Post
        fields = "__all__"

    def validate(self, attrs):
        title = attrs.get("title")
        content = attrs.get("content")

        if not (len(title) > 0 and len(content) > 0):
            msg = "제목 및 글 내용 오류"
            raise serializers.ValidationError(msg, code="content")

        return attrs

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)

        return post
