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
    
class Dispositivos_Metodo(APIView):
    def post(self, request):
        # Datos que va a tomar mediante POST
        nombre = request.data['nombre']
        unidad = request.data['unidad']
        ubicacion_id = request.data['ubicacion_id']

        # Creación
        Dispositivos.objects.create(nombre=nombre, ubicacion_id=ubicacion_id, unidad=unidad)

        return Response(status=status.HTTP_201_CREATED)
    
    def get(self, request, id):
        # Se obtienen los registros
        dispositivos = Dispositivos.objects.filter(ubicacion_id=id)
        
        # Aquí se almacenará los datos
        listaDispositivos = []

        # Serialización rápida de los datos
        listaDispositivos = DispositivosSerializador(dispositivos, many=True).data

        return Response({"error": False, "datos": listaDispositivos}, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        # Se consulta en la tabla
        dispositivo = Dispositivos.objects.get(id=id)
        
        # Se asigna el valor en cada campo
        dispositivo.nombre = request.data['nombre']
        
        # Se guardan cambios
        dispositivo.save()

        return Response(status=status.HTTP_200_OK)
    
    def delete(self, request, id):
        dispositivo = Dispositivos.objects.get(id=id)
        dispositivo.delete()

        return Response(status=status.HTTP_200_OK)
    
class Puntos_Metodo(APIView):
    def post(self, request):
        # Datos que va a tomar mediante POST
        valor = request.data['valor']
        dispositivo_id = request.data['dispositivo_id']

        # Creación
        Puntos.objects.create(valor=valor, dispositivo_id=dispositivo_id)

        return Response(status=status.HTTP_201_CREATED)
    
    def get(self, request, id):
        # Se obtienen los registros
        puntos = Puntos.objects.filter(id=id)
        
        # Aquí se almacenará los datos
        listaPuntos = []

        # Serialización rápida de los datos
        listaPuntos = PuntosSerializador(puntos, many=True).data

        return Response({"error": False, "datos": listaPuntos}, status=status.HTTP_200_OK)
    
    def delete(self, request, id):
        punto = Puntos.objects.get(id=id)
        punto.delete()

        return Response(status=status.HTTP_200_OK)