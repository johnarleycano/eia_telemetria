from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import *
from api.serializadores import *

class Ubicaciones_Metodo(APIView):
    def post(self, request):
        # Datos que va a tomar mediante POST
        nombre = request.data['nombre']
        usuario_id = request.data['usuario_id']

        # Creación
        Ubicaciones.objects.create(nombre = nombre, usuario_id = usuario_id)

        return Response(status=status.HTTP_201_CREATED)
    
    def get(self, request, id):
        # Se obtienen todas las ubicaciones
        ubicaciones = Ubicaciones.objects.filter(usuario_id=id)
        
        # Aquí se almacenará los datos
        listaUbicaciones = []

        # # Serialización manual de los datos
        # for i in ubicaciones:
        #     listaUbicaciones.append({
        #         "id": i.id,
        #         "nombre": i.nombre,
        #         "usuario_id": i.usuario_id,
        #     })

        # Serialización rápida de los datos
        listaUbicaciones = UbicacionesSerializador(ubicaciones, many=True).data

        return Response({"error": False, "datos": listaUbicaciones}, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        # Se consulta en la tabla
        ubicacion = Ubicaciones.objects.get(id=id)
        
        # Se asigna el valor en cada campo
        ubicacion.nombre = request.data['nombre']
        
        # Se guardan cambios
        ubicacion.save()

        return Response(status=status.HTTP_200_OK)
    
    def delete(self, request, id):
        ubicacion = Ubicaciones.objects.get(id=id)
        ubicacion.delete()

        return Response(status=status.HTTP_200_OK)