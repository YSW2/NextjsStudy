from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


# 사용자 매니저 정의
class UserManager(BaseUserManager):
    def create_user(self, userId, password=None, **extra_fields):
        if not userId:
            raise ValueError("Users must have an userId")
        user = self.model(userId=userId, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userId, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(userId, password, **extra_fields)


# 사용자 정의 사용자 모델
class User(AbstractBaseUser):
    userId = models.CharField(max_length=20, unique=True)
    userName = models.CharField(max_length=20)
    userEmail = models.CharField(max_length=50)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # 관리자 사이트 접근 권한

    objects = UserManager()

    USERNAME_FIELD = "userId"
    REQUIRED_FIELDS = ["userName", "userEmail"]

    def __str__(self):
        return self.userId

    def has_perm(self, perm, obj=None):
        # 사용자에게 특정 권한이 있는지 확인 (여기서는 모든 권한을 가지고 있다고 가정)
        return True

    def has_module_perms(self, app_label):
        # 사용자가 주어진 app_label에 대한 권한을 가지고 있는지 확인 (여기서는 모든 권한을 가지고 있다고 가정)
        return True
