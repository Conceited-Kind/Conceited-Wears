from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, stk_push, mpesa_callback

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stk-push/', stk_push, name='stk-push'),
     path('mpesa/callback/', mpesa_callback, name='mpesa-callback'),
]