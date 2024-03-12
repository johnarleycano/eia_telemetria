from django.urls import path

from . import views

urlpatterns = [
    path("ubicaciones", views.Ubicaciones_Metodo.as_view(), name="Ubicaciones"),
    path("ubicaciones/<int:id>", views.Ubicaciones_Metodo.as_view(), name="Ubicacion"),
]