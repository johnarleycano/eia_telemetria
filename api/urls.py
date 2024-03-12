from django.urls import path

from . import views

urlpatterns = [
    path("ubicaciones", views.Ubicaciones_Metodo.as_view(), name="Ubicaciones"),
    path("ubicaciones/<int:id>", views.Ubicaciones_Metodo.as_view(), name="Ubicacion"),

    path("dispositivos", views.Dispositivos_Metodo.as_view(), name="Dispositivos"),
    path("dispositivos/<int:id>", views.Dispositivos_Metodo.as_view(), name="Dispositivo"),

    path("puntos", views.Puntos_Metodo.as_view(), name="Puntos"),
    path("puntos/<int:id>", views.Puntos_Metodo.as_view(), name="Punto")
]